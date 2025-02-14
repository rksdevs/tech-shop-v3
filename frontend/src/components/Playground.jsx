import {
  Bird,
  Book,
  Bot,
  Code2,
  Computer,
  CornerDownLeft,
  Cpu,
  CreditCard,
  LaptopMinimal,
  LifeBuoy,
  Mic,
  Monitor,
  Paperclip,
  Rabbit,
  Settings,
  Settings2,
  Share,
  SquareTerminal,
  SquareUser,
  Triangle,
  Turtle,
} from "lucide-react";

import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../components/ui/drawer";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useEffect, useRef, useState } from "react";
import { useGetGuidanceMutation } from "../Features/performanceCalculatorSlice";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, deleteMessages } from "../Features/messageSlice";
import MessageComponent from "./MessageComponent";
import React from "react";
import { Skeleton } from "./ui/skeleton";
import { useSendChatToAdminMutation } from "../Features/newsLetterApiSlice";
import { useToast } from "./ui/use-toast";

export const description =
  "An AI playground with a sidebar navigation and a main content area. The playground has a header with a settings drawer and a share button. The sidebar has navigation links and a user menu. The main content area shows a form to configure the model and messages.";

export function Playground({
  remainingGptRequestCount,
  merlinResetDate,
  setRemainingGptRequestCount,
}) {
  const { messageList } = useSelector((state) => state.messages);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [assistantResponses, setAssistantResponses] = useState("");
  const [messageFromUser, setMessageFromUser] = useState("");
  const [threadId, setThreadId] = useState(null); // Track the current thread ID
  const [generatingMerlinResponse, setGeneratingMerlinResponse] =
    useState(false);

  const messageEndRef = useRef(null);

  const [shareChat, { error: shareChatError, isLoading: shareChatLoading }] =
    useSendChatToAdminMutation();
  const { toast } = useToast();

  // Scroll to the bottom whenever a new message is added
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messageList]);

  //function to split the API call for every send message
  const makeApiCall = async (payload) => {
    try {
      const response = await fetch("/api/calculatePerformance/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      // console.log(data);
      //delete local storage for stale scenario like beyond 30 days or no existing thread id
      if (data?.infoToSend?.deleteLocalStorage) {
        // console.log("deleting local storage");
        dispatch(deleteMessages());
      }
      setRemainingGptRequestCount(data?.infoToSend?.gptRequestCount);
      dispatch(addMessage(data?.infoToSend?.content));
      setGeneratingMerlinResponse(false);
      if (response.ok) {
        // console.log(data);
        // Set the threadId if it's a new thread
        if (!threadId) setThreadId(data?.infoToSend?.threadId);

        // Start streaming the response
        getGuidance(data?.infoToSend?.threadId);
      }
    } catch (error) {
      setGeneratingMerlinResponse(false);
      console.error("Error sending message:", error);
    }
  };

  // Function to send message, handles both scenarios
  const sendMessage = async () => {
    setGeneratingMerlinResponse(true);
    setMessageFromUser("");
    const payload = {
      messageFromUser,
      threadId, // Send threadId if it exists
    };
    await makeApiCall(payload);
  };

  // Function to get the response
  const getGuidance = async (threadId) => {
    //need help here
    try {
      setGeneratingMerlinResponse(true);
      const response = await fetch(
        `/api/calculatePerformance/assistant-stream?threadId=${threadId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch assistant response");
      }

      const data = await response.json();
      dispatch(addMessage(data?.content));
      setGeneratingMerlinResponse(false);
      // const cleanMessage = data?.message;
      // Assuming you have a state to store the assistant's response
      // setAssistantResponses(cleanMessage);
    } catch (error) {
      setGeneratingMerlinResponse(false);
      console.error("Error getting assistant response:", error);
    }
  };

  // Function to send the message to the backend
  const handleGetGuidanceCTA = async (e) => {
    e.preventDefault();
    sendMessage();
  };

  const handlePresetOptions = async (option) => {
    let payload = {};
    switch (option) {
      case 1:
        payload.messageFromUser =
          "MERLIN, I want to build my dream pc, help me!";
        payload.threadId = threadId;
        break;
      case 2:
        payload.messageFromUser = "MERLIN, help me buy a programming laptop!";
        payload.threadId = threadId;
        break;
      case 3:
        payload.messageFromUser =
          "MERLIN, pick a 27 inch gaming monitor for me!";
        payload.threadId = threadId;
        break;
      case 4:
        payload.messageFromUser = "Any new graphics cards launched recently?";
        payload.threadId = threadId;
        break;
      default:
        payload.messageFromUser = messageFromUser;
        payload.threadId = threadId;
    }
    setGeneratingMerlinResponse(true);
    setMessageFromUser("");
    await makeApiCall(payload);
  };

  const handleShareChat = async (e) => {
    e.preventDefault();
    const payload = {
      userName: userInfo?.data?.name,
      chatDetails: messageList,
      userContact: userInfo?.data?.contact,
    };
    try {
      console.log(payload);
      await shareChat(payload);
      toast({
        title: "Chat was shared with admin! We will get back to you.",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong, please try again!",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid h-screen w-full">
      <div className="flex flex-col gap-4">
        <div className="relative hidden flex-col items-start md:flex row-span-2">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Welcome, Meet MERLIN</CardTitle>
              <CardDescription>
                MERLIN is our highly intelligent AI, trained to help you with
                your quest to find the best PC or laptop for your needs
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        <div className="relative flex h-[90%] min-h-[70vh] flex-col rounded-xl bg-muted/50 p-4 row-span-5">
          <div className="absolute right-3 top-3 flex gap-2">
            <Badge
              variant="outline"
              className="hover:cursor-pointer hover:bg-muted"
              onClick={(e) => handleShareChat(e)}
            >
              Share chat with admin
            </Badge>
            <Badge variant="outline" className="">
              Remaining attempts:{" "}
              <span className="text-primary ml-2">
                {remainingGptRequestCount}
              </span>
            </Badge>
          </div>

          <div className="flex-1 pt-8">
            <div
              className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring max-h-[60vh] overflow-y-auto scrollbar"
              x-chunk="dashboard-03-chunk-1"
            >
              {messageList?.length > 0 ? (
                <div className="flex flex-col gap-4 p-4">
                  {messageList?.map((item, index) => (
                    <React.Fragment key={index}>
                      <div ref={messageEndRef} />
                      <MessageComponent message={item} />
                    </React.Fragment>
                  ))}
                </div>
              ) : (
                <Card className="min-h-[52vh] border-none">
                  <CardHeader>
                    <CardTitle>MERLIN</CardTitle>
                    <CardDescription>
                      Meet our intelligent AI, who can help you with all your PC
                      needs
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                    <Card
                      className="w-[300px] m-auto hover:bg-muted hover:cursor-pointer"
                      onClick={(e) => {
                        handlePresetOptions(1);
                      }}
                    >
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Looking for a PC
                        </CardTitle>
                        <Computer className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-muted-foreground text-left">
                          MERLIN, I want to build my dream pc, help me!
                        </p>
                      </CardContent>
                    </Card>
                    <Card
                      className="w-[300px] m-auto hover:bg-muted hover:cursor-pointer"
                      onClick={(e) => {
                        handlePresetOptions(2);
                      }}
                    >
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Looking for a Laptop
                        </CardTitle>
                        <LaptopMinimal className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-muted-foreground text-left">
                          MERLIN, help me buy a programming laptop!
                        </p>
                      </CardContent>
                    </Card>
                    <Card
                      className="w-[300px] m-auto hover:bg-muted hover:cursor-pointer"
                      onClick={(e) => {
                        handlePresetOptions(3);
                      }}
                    >
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Looking for a Monitor
                        </CardTitle>
                        <Monitor className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-muted-foreground text-left">
                          MERLIN, pick a 27 inch gaming monitor for me!
                        </p>
                      </CardContent>
                    </Card>
                    <Card
                      className="w-[300px] m-auto hover:bg-muted hover:cursor-pointer"
                      onClick={(e) => {
                        handlePresetOptions(4);
                      }}
                    >
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Looking for new components
                        </CardTitle>
                        <Cpu className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-muted-foreground text-left">
                          Any new graphics cards launched recently?
                        </p>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
          <form
            className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
            x-chunk="dashboard-03-chunk-1"
            onSubmit={(e) => handleGetGuidanceCTA(e)}
          >
            <Label htmlFor="message" className="sr-only">
              Message
            </Label>
            {!generatingMerlinResponse ? (
              <Textarea
                id="message"
                placeholder="Type your own message here..."
                className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0 scrollbar"
                value={messageFromUser}
                onChange={(e) => setMessageFromUser(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault(); // Prevent new line insertion
                    handleGetGuidanceCTA(e); // Submit form
                  }
                }}
              />
            ) : (
              <div className="flex gap-2 flex-col p-2 pl-4">
                <Skeleton className="h-3 w-[65vw] md:w-[650px]" />
                <Skeleton className="h-3 w-[65vw] md:w-[650px]" />
                <Skeleton className="h-3 w-[65vw] md:w-[650px]" />
              </div>
            )}
            <div className="flex items-center p-3 pt-0 pl-4 gap-4">
              <p className="hidden md:flex text-primary text-sm font-extralight">
                {!generatingMerlinResponse
                  ? "MERLIN is ready to help!"
                  : "MERLIN is generating response..."}
              </p>
              <Button
                type="submit"
                size="sm"
                className={`ml-auto gap-1.5 ${
                  generatingMerlinResponse ? "hidden" : ""
                }`}
              >
                Send Message
                <CornerDownLeft className="size-3.5" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
