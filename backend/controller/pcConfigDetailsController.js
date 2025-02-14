import OpenAI from "openai";
import asyncHandler from "../middlewares/asyncHandler.js";
import PrebuiltPC from "../models/preBuiltPcModel.js";
import User from "../models/userModel.js";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_SECRET_KEY,
});

export const getPerformanceEstimate = asyncHandler(async (req, res) => {
  const { configuration, game, settings, display } = req.body;

  const user = await User.findById(req.user?._id);
  const now = new Date();

  // Check if the user is locked
  if (user.gptLockUntil && user.gptLockUntil > now) {
    return res
      .status(429)
      .json({ message: "Too many requests. Please try again later." });
  }

  // Reset the request count if the last request was more than an 30 days
  if (
    user.gptLastRequest &&
    now - user.gptLastRequest > 30 * 24 * 60 * 60 * 1000
  ) {
    user.gptRequestCount = 15;
  }

  //Decrease the request count for non-admin users
  if (!user?.isAdmin) {
    user.gptRequestCount = (user.gptRequestCount || 15) - 1;
    user.gptLastRequest = now;
  }

  // Lock the user if they have exceeded the limit
  if (user.gptRequestCount === 0) {
    user.gptLockUntil = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // Lock for 30 days
    await user.save();
    return res
      .status(429)
      .json({ message: "Too many requests. Please try again later." });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a knowledgeable assistant that provides gaming or software performance estimates based on computer configurations.",
        },
        {
          role: "user",
          content: `Here's the computer configuration:

          CPU: ${configuration.cpu}
          Motherboard: ${configuration.motherboard}
          Cooling System: ${configuration.coolingSystem}
          RAM: ${configuration.ram}
          GPU: ${configuration.gpu}

          Game or Software: ${game}
          Settings: ${settings}
          Display: ${display}

          Based on this configuration, what gaming performance can I expect?
          The response needs to be structured in the following way
          1st paragraph that is separated by new line - Overall insight of the current configuration in around 30 words.

          2nd paragraph that is separated by new line - Overall insight of the performance for the above game and display settings in around 30 words.

          3rd paragraph that is separated by new line - If it is a game, then an expected average approximate FPS in not more than 10 words otherwise just FPS: NA.
          
          4th paragraph that is separated by new line - An expected overall performance on a scale of 1 to 10, 10 being the highest in not more than 10 words`,
        },
      ],
      max_tokens: 150,
    });
    await user.save();
    res.status(200).json({
      data: response.choices[0].message.content,
      gptRequestCount: user?.gptRequestCount,
    });
  } catch (error) {
    console.error("Error fetching the performance estimate:", error);
    res.status(400).json({
      error: "An error occurred while fetching the performance estimate.",
    });
  }
});

export const getPredictionFromExistingPc = asyncHandler(async (req, res) => {
  const { budget, game, settings, display } = req.body;

  const extractPCInfo = (pcArray) => {
    const intermediateArrayOfPcs = pcArray.map((pc) => ({
      pcName: pc.pcName,
      price: pc.pcTotalPrice,
      cpuName: pc.pcComponents.cpu.name,
      gpuName: pc.pcComponents.gpu.name,
      ramName: pc.pcComponents.ram.name,
    }));

    return intermediateArrayOfPcs.filter(
      (config) => config.price <= Number(budget) + 20000
    );
  };

  try {
    const preBuiltPcs = await PrebuiltPC.find({});
    const user = await User.findById(req.user?._id);
    if (preBuiltPcs.length) {
      const prebuiltPcDetails = extractPCInfo(preBuiltPcs);

      if (prebuiltPcDetails.length) {
        // console.log(prebuiltPcDetails)
        const now = new Date();
        // Check if the user is locked
        if (user.gptLockUntil && user.gptLockUntil > now) {
          return res
            .status(429)
            .json({ message: "Too many requests. Please try again later." });
        }

        // Reset the request count if the last request was more than an 30 days
        if (
          user.gptLastRequest &&
          now - user.gptLastRequest > 30 * 24 * 60 * 60 * 1000
        ) {
          user.gptRequestCount = 15;
        }

        // Decrement the request count for non-admin users
        if (!user?.isAdmin) {
          user.gptRequestCount = (user.gptRequestCount || 15) - 1;
          user.gptLastRequest = now;
        }

        // Lock the user if they have exceeded the limit
        if (user.gptRequestCount === 0) {
          user.gptLockUntil = new Date(
            now.getTime() + 30 * 24 * 60 * 60 * 1000
          ); // Lock for 30 days
          await user.save();
          return res
            .status(429)
            .json({ message: "Too many requests. Please try again later." });
        }
        const response = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "You are an expert in computer hardware and gaming. You help users select the best computer configuration based on their gaming needs and budget.",
            },
            {
              role: "user",
              content: `Given the following array of PC configurations where each elements price is the cost of configuration in INR, find a configuration that is within the price range of ${
                budget - 20000
              } to ${
                budget + 20000
              } INR. Then suggest the best suitable computer configuration for running ${game} at ${settings} settings and ${display} display settings from the found configurations. Here is the array of PC configurations: ${JSON.stringify(
                prebuiltPcDetails
              )}.

            The response needs to be structured in the following way:
            1st Line separated by new line - Name of the configuration you've chosen i.e. pcName, it should be written as "Recommended Configuration: <pcName>"

            Next two sections are reason for choosing the configuration and comparision to other configuration, each separated by new line i.e. "\n"
            
            Finally in last line that is separated by new line - An expected overall performance on a scale of 1 to 10, 10 being the highest which can be achieved by this chose configuration in not more than 10 words`,
            },
          ],
          max_tokens: 200,
        });

        const extractConfigurationName = (response) => {
          const match = response.match(/Recommended Configuration: (.+?)\n/);
          return match ? match[1].trim() : null;
        };

        const configurationName = extractConfigurationName(
          response.choices[0].message.content
        );
        await user.save();
        res.status(200).json({
          performanceDetails: response.choices[0].message.content,
          pcName: configurationName,
          gptRequestCount: user?.gptRequestCount,
        });
      } else {
        res.status(200).json({
          performanceDetails: `There are no prebuilt configurations available within the selected budget range of ${
            Number(budget) - 20000
          } to ${
            Number(budget) + 20000
          } INR. Please modify your budget for MERLIN to choose the right Prebuilt PC for you.`,
          pcName: "NA",
          gptRequestCount: user?.gptRequestCount,
        });
      }
    } else {
      res
        .status(404)
        .json({ error: "No available pre-built pc, please try again later" });
    }
  } catch (error) {
    console.error("Error fetching the prebuilt pc suggestion:", error);
    res
      .status(400)
      .json({ error: "An error occurred while fetching suggestions." });
  }
});

export const getCompatibilityPrediction = asyncHandler(async (req, res) => {
  const {
    processor,
    motherboard,
    graphicsCard,
    RAM,
    storage,
    powerSupply,
    cabinet,
    coolingSystem,
  } = req.body;

  try {
    const user = await User.findById(req.user?._id);
    const now = new Date();
    // Check if the user is locked
    if (user.gptLockUntil && user.gptLockUntil > now) {
      return res
        .status(429)
        .json({ message: "Too many requests. Please try again later." });
    }

    // Reset the request count if the last request was more than an 30 days
    if (
      user.gptLastRequest &&
      now - user.gptLastRequest > 30 * 24 * 60 * 60 * 1000
    ) {
      user.gptRequestCount = 15;
    }

    // Decrement the request count for non-admin users
    if (!user?.isAdmin) {
      user.gptRequestCount = (user.gptRequestCount || 15) - 1;
      user.gptLastRequest = now;
    }

    // Lock the user if they have exceeded the limit
    if (user.gptRequestCount === 0) {
      user.gptLockUntil = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // Lock for 30 days
      await user.save();
      return res
        .status(429)
        .json({ message: "Too many requests. Please try again later." });
    }

    const systemMessage = {
      role: "system",
      content: `You are a PC Compatibility Checker. Your task is to predict the compatibility of provided PC components based on their specifications and constraints. Evaluate compatibility based on the following criteria: motherboard socket type, form factor, power requirements, physical dimensions, cooling system support, and connection interfaces.\n\n1. Cabinet:\n   - Check if the motherboard's form factor (ATX, Micro-ATX, Mini-ITX) is supported by the cabinet.\n   - Ensure the graphics card length does not exceed the maximum GPU length supported by the cabinet.\n   - Verify if the cooling system's radiator size is supported by the cabinet (front/top mounting).\n\n2. Cooling System:\n   - Confirm that the cooling system is compatible with the processor's socket type (e.g., AM4).\n   - Ensure the cooling system fits within the cabinet's supported radiator sizes.\n   - Check if the motherboard has necessary headers for the cooling system.\n\n3. Processor:\n   - Ensure the processor's socket type matches the motherboard's socket (e.g., AM4).\n   - Confirm that the motherboard's chipset supports the processor model.\n\n4. Graphics Card:\n   - Check if the graphics card fits within the length constraints of the cabinet.\n   - Verify that the motherboard has a compatible PCIe slot (e.g., PCIe 4.0 x16).\n\n5. Motherboard:\n   - Confirm the motherboard's form factor is supported by the cabinet.\n   - Ensure the motherboard supports the processor's socket type and chipset.\n   - Verify compatibility with the RAM's type and speed (e.g., DDR4 3200MHz).\n   - Ensure the motherboard has an M.2 slot for the SSD and supports the SSD's interface (e.g., NVMe Gen4).\n\n6. Power Supply:\n   - Verify that the power supply provides sufficient wattage for the system's components (consider GPU and CPU power requirements).\n   - Ensure the power supply fits in the cabinet's PSU mounting location.\n   - Confirm the power supply has necessary connectors for the motherboard, graphics card, and cooling system.\n\n7. RAM:\n   - Check if the RAM type (e.g., DDR4) and speed (e.g., 3200MHz) are supported by the motherboard.\n\n8. SSD:\n   - Ensure the SSD's interface (e.g., NVMe Gen4) is supported by the motherboard's M.2 slot.\n\nExample Interaction:\n\n- Input:\n  - Cabinet: \"Nzxt H510I (Matte Black)\"\n  - Cooling system: \"Nzxt Kraken X53 Rgb 240mm Aio Liquid Cooler (RL-KRX53-01)\"\n  - Processor: \"Amd Ryzen 5 3500 Processor (Upto 4.1 Ghz / 16 Mb Cache)\"\n  - Graphics Card: \"Msi Geforce Rtx 3060 Gaming X 12Gb Gddr6 Graphics Card (Lhr)\"\n  - Motherboard: \"Asus Prime B550M-K Motherboard\"\n  - Power Supply: \"Gigabyte B700H Smps - 700 Watt 80 Plus Bronze Certification Psu With Active Pfc\"\n  - RAM: \"GSkill Ripjaws V 16Gb (16Gb X 1) Ddr4 3200Mhz Desktop Ram (F4-3200C16S-16GVK)\"\n  - SSD: \"Gigabyte Aorus 500Gb M.2 Nvme Gen4\"\n\n- Output:\n  - Cabinet: Compatible with ATX, Micro-ATX, and Mini-ITX motherboards. The Asus Prime B550M-K is a Micro-ATX motherboard, so it will fit. Supports GPUs up to 381mm in length. The MSI Geforce RTX 3060 Gaming X is approximately 277mm in length, so it fits. Supports radiators up to 280mm in the front and up to 240mm on the top. The Kraken X53 is a 240mm radiator, so it will fit.\n  - Cooling System: Fits in the Nzxt H510I. Compatible with AMD AM4 sockets. The Ryzen 5 3500 uses an AM4 socket. The Asus Prime B550M-K has an AM4 socket and supports liquid coolers.\n  - Processor: Compatible with AM4 sockets. The Asus Prime B550M-K has an AM4 socket and supports the Ryzen 5 3500.\n  - Graphics Card: Fits within the length constraints. The Asus Prime B550M-K has a PCIe 4.0 x16 slot, which is compatible with the RTX 3060.\n  - Motherboard: Compatible with AM4 socket processors, including the Ryzen 5 3500. Supports DDR4 RAM up to 3200MHz. The GSkill Ripjaws V DDR4 3200MHz is compatible. Has an M.2 slot that supports NVMe drives, including the Gigabyte Aorus 500GB M.2 NVMe Gen4.\n  - Power Supply: The RTX 3060 requires a minimum of a 550W PSU. The 700W PSU provides ample power. Standard ATX power connectors are compatible. Fits in the standard PSU mounting location of the Nzxt H510I.\n  - RAM: Compatible with the Asus Prime B550M-K, which supports DDR4 RAM up to 3200MHz.\n  - SSD: The Asus Prime B550M-K has an M.2 slot that supports NVMe Gen4 SSDs.`,
    };

    const userMessage = {
      role: "user",
      content: `Here are the PC components I want to check for compatibility:\n\n- Cabinet: "${
        cabinet ? cabinet : "Not shared"
      }"\n- Cooling system: "${
        coolingSystem ? coolingSystem : "Not shared"
      }"\n- Processor: "${processor}"\n- Graphics Card: "${
        graphicsCard ? graphicsCard : "Not shared"
      }"\n- Motherboard: "${motherboard}"\n- Power Supply: "${
        powerSupply ? powerSupply : "Not shared"
      }"\n- RAM: "${RAM ? RAM : "Not shared"}"\n- Storage: "${
        storage ? storage : "Not shared"
      }". Also for each component provide a compatibility check description add a phrase called "Verdict: Compatible" or "Verdict: Not Compatible" in the same line, note that you must not share verdict for those component whose values are "Not Shared"`,
    };

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [systemMessage, userMessage],
      max_tokens: 500,
    });

    // const extractConfigurationName = (response) => {
    //   const match = response.match(/Recommended Configuration: (.+?)\n/);
    //   return match ? match[1].trim() : null;
    // };

    // const configurationName = extractConfigurationName(response.choices[0].message.content);
    await user.save();
    res.status(200).json({
      compatibilityDetails: response.choices[0].message.content,
      gptRequestCount: user?.gptRequestCount,
    });
    // if(preBuiltPcs.length) {

    //   if(prebuiltPcDetails.length) {
    //     // console.log(prebuiltPcDetails)

    //   } else {
    //     res.status(200).json({performanceDetails: `There are no prebuilt configurations available within the selected budget range of ${Number(budget) - 20000} to ${Number(budget) + 20000} INR. Please modify your budget for MERLIN to choose the right Prebuilt PC for you.`, pcName: "NA", gptRequestCount: user?.gptRequestCount})
    //   }
    // } else {
    //   res.status(404).json({ error: "No available pre-built pc, please try again later" });
    // }
  } catch (error) {
    console.error("Error fetching the prebuilt pc suggestion:", error);
    res
      .status(400)
      .json({ error: "An error occurred while fetching suggestions." });
  }
});

//create assistant
const createAssistant = asyncHandler(async () => {
  const merlin = await openai.beta.assistants.create({
    name: "MERLIN",
    instructions:
      "You are a expert computer enthusiast and your name is MERLIN. You have wide knowledge on computer components, laptops and their uses. Your primary role is to help users by suggesting them computer parts, configurations, laptops based on their needs. You will always show the price based on Indian Rupee currency, and you will always advise the users to get more information from computermakers.in website and strictly mention no other websites.",
    model: "gpt-4o-mini",
  });
  console.log("assistant id:", merlin);
  return merlin;
});

// POST route to send message and initiate the assistant thread
export const sendMessage = asyncHandler(async (req, res) => {
  try {
    const { messageFromUser } = req.body;
    const now = new Date();
    const user = await User.findById(req.user?._id);
    let resetThreadId = false;
    let threadId;
    let thread;
    let deleteLocalStorage = false;
    let message;

    //delete thread
    // const deleteThreadOnce = await openai.beta.threads.del("thread_oYi8Pt8jUThocXHMEriTxpQ8");
    //   console.log(deleteThreadOnce);
    // console.log(user)

    //no thread id in query, user logs in after 30 days assume there is an old threadid

    // Check if the user is locked
    if (user.gptLockUntil && user.gptLockUntil > now) {
      return res
        .status(429)
        .json({ message: "Too many requests. Please try again later." });
    }

    // Reset the request count if the last request was more than an 30 days
    if (
      user.gptLastRequest &&
      now - user.gptLastRequest > 30 * 24 * 60 * 60 * 1000
    ) {
      user.gptRequestCount = 15;
      if (!user.isAdmin && user.threadId) {
        //reset thread Id every 30 days only for non-admin users
        resetThreadId = true;
      }
    }

    // Decrement the request count for non-admin users
    if (!user?.isAdmin) {
      user.gptRequestCount = (user.gptRequestCount || 15) - 1;
      user.gptLastRequest = now;
      console.log("reduced gpt count by 1");
    }

    // Lock the user if they have exceeded the limit
    if (user.gptRequestCount === 0) {
      user.gptLockUntil = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // Lock for 30 days
      user.threadId = "";
      //delete thread
      await openai.beta.threads.del(threadId);
      await user.save();
      return res
        .status(429)
        .json({ message: "Too many requests. Please try again later." });
    }

    if (!threadId) {
      // console.log("here now")
      //reset thread Id every 30 days
      if (resetThreadId) {
        // when resetThreadId is true basically every 30 days
        // console.log("block 1");
        thread = await openai.beta.threads.create();
        threadId = thread.id;
        deleteLocalStorage = true;
      }
      if (!user?.threadId) {
        // No existing thread or user wants to start a new one
        // console.log("block 2");
        thread = await openai.beta.threads.create();
        threadId = thread.id;
        deleteLocalStorage = true;
      } else {
        //check if the existing user's thread id is valid
        threadId = user.threadId;
        // Send the user's message to the assistant thread
        try {
          message = await openai.beta.threads.messages.create(threadId, {
            role: "user",
            content: messageFromUser,
          });
        } catch (error) {
          // console.log("error new", error)
          thread = await openai.beta.threads.create();
          threadId = thread.id;
          deleteLocalStorage = true;
        }
      }
      // Save the new threadId in the user's account
      user.threadId = threadId;
      await user.save();
    }

    //if the message has not yet been created because of the above scenarios create one
    if (!message) {
      message = await openai.beta.threads.messages.create(threadId, {
        role: "user",
        content: messageFromUser,
      });
    }

    let infoToSend = {
      threadId,
      content: {
        role: "user",
        value: messageFromUser,
      },
      deleteLocalStorage,
      gptRequestCount: user?.gptRequestCount,
    };

    // Acknowledge that the message was successfully sent
    res.status(200).json({ message: "Message sent successfully", infoToSend });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});
// GET route to stream the assistant's response
export const getGuidanceOnChat = asyncHandler(async (req, res) => {
  let assistantId = process.env.OPEN_AI_ASSITANT_ID;
  // let assistantId = "";
  // let newAssist = createAssistant();
  // console.log(newAssist)
  // console.log(assistantId);
  let threadId = req.query.threadId;
  let messageToSend;
  let messageList;
  //create the run instance
  try {
    const user = await User.findById(req?.user?._id);

    let run = await openai.beta.threads.runs.createAndPoll(threadId, {
      assistant_id: assistantId,
      instructions: `You are a expert computer enthusiast and your name is MERLIN. You have wide knowledge on computer components, laptops and their uses. Your primary role is to help users by suggesting them computer parts, configurations, laptops based on their needs. You will always show the price based on Indian Rupee currency, and you will always advise the users to get more information from computermakers.in website and strictly mention no other websites. Also please address the user as ${user?.name}`,
    });

    if (run.status === "completed") {
      messageList = await openai.beta.threads.messages.list(run.thread_id);
      for (const message of messageList.data.reverse()) {
        messageToSend = message.content[0].text.value;
      }
    } else {
      console.log(run.status);
    }
    res.status(200).json({
      message: messageToSend,
      content: {
        role: "assistant",
        value: messageToSend,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});
