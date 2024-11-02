import Container from "../components/Container";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../Features/cartSlice";
import { Separator } from "../components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Skeleton } from "../components/ui/skeleton";
import ProcessorTable from "../components/TableComponentsCustomPc/ProcessorTable";
import MotherboardTable from "../components/TableComponentsCustomPc/MotherboardTable";
import GraphicsCardTable from "../components/TableComponentsCustomPc/GraphicsCardTable";
import RAMTable from "../components/TableComponentsCustomPc/RAMTable";
import MemorySSDTable from "../components/TableComponentsCustomPc/MemorySSDTable";
import MemoryHDDTable from "../components/TableComponentsCustomPc/MemoryHDDTable";
import PowerSupplyTable from "../components/TableComponentsCustomPc/PowerSupplyTable";
import CPUCoolerTable from "../components/TableComponentsCustomPc/CPUCoolerTable";
import CabinetTable from "../components/TableComponentsCustomPc/CabinetTable";
import { SidebarNav } from "../components/SideNavbar";
import MonitorTable from "../components/TableComponentsCustomPc/MonitorTable";
import KeyboardTable from "../components/TableComponentsCustomPc/KeyboardTable";
import MouseTable from "../components/TableComponentsCustomPc/MouseTable";
import MousepadTable from "../components/TableComponentsCustomPc/MousepadTable";
import HeadsetTable from "../components/TableComponentsCustomPc/HeadsetTable";
import {
  clearAllBuild,
  deleteCurrentSelection,
} from "../Features/pcBuilderSlice";
import {
  useCalculatePerformanceMutation,
  useGetCompatibilityMutation,
  useGetSuitablePrebuiltPcMutation,
} from "../../src/Features/performanceCalculatorSlice";
import { useToast } from "../components/ui/use-toast";
import {
  Cpu,
  Eye,
  GalleryThumbnails,
  Gamepad2,
  IndianRupee,
  Menu,
  MoreHorizontal,
  RefreshCcw,
  Section,
  Trash2,
} from "lucide-react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import customPcImg from "../components/assets/images/pc-build-4.jpg";
import { useGetAllPrebuiltPcsQuery } from "../Features/pcConfigureApiSlice";
import { Textarea } from "../components/ui/textarea";
import { useProfileQuery } from "../Features/usersApiSlice";
import { setOrderType } from "../Features/orderTypeSlice";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { addConfigureCpu } from "../Features/pcConfigureSlice";
import CustomPcComponentCard from "../components/CustomPcComponentCard";
import CustomPcSelectionTableCard from "../components/CustomPcSelectionTableCard";
import placeholderimg from "../components/assets/images/place-hold-2.jpg";
import { Playground } from "../components/Playground";

const BuildCustomPCScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const {
    cpu,
    motherboard,
    coolingSystem,
    ram,
    ssd,
    hdd,
    gpu,
    psu,
    monitor,
    keyboard,
    mouse,
    mousepad,
    headphone,
    cabinet,
    totalBuildPrice,
  } = useSelector((state) => state.customPc);
  const customPcItems = useSelector((state) => state.customPc);
  const { data: userData, refetch } = useProfileQuery();

  const [section, setSection] = useState("Processor");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [performanceInsights, setPerformanceInsights] = useState([]);
  const [games, setGames] = useState("");
  const [displaySettings, setDisplaySettings] = useState("");
  const [gameSettings, setGameSettings] = useState("");
  const [merlinsLimit, setMerlinsLimit] = useState(3);
  const [gameSettingsPrediction, setGameSettingsPrediction] = useState("");
  const [displaySettingsPrediction, setDisplaySettingsPrediction] =
    useState("");
  const [gamesPrediction, setGamesPrediction] = useState("");
  const [budgetPrediction, setBudgetPrediction] = useState(0);
  const [prebuiltPcSuggestion, setPrebuiltPcSuggestion] = useState("");
  const [suggestedPcName, setSuggestedPcName] = useState("");
  const [prebuiltPc, setPrebuiltPc] = useState(null);
  const [remainingGptRequestCount, setRemainingGptRequestCount] = useState(0);
  const [merlinResetDate, setMerlinResetDate] = useState("");
  const [checkCompatibilityDialog, setCheckCompatibilityDialog] =
    useState(false);
  const [compatiblityPrediction, setCompatibilityPrediction] = useState("");
  const [guidedDialogOpen, setGuidedDialogOpen] = useState(false);
  const [tableActionDropdownOpen, setTableActionDropdownOpen] = useState(false);

  function formatDate(dateString) {
    const date = new Date(dateString);

    // Get year, month, day, hours, and minutes
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    // Return the formatted date string
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  const [
    calculatePerformance,
    {
      isLoading: calculatePerformanceLoading,
      error: calculatePerformanceError,
    },
  ] = useCalculatePerformanceMutation();

  const { data: allPrebuiltPCs } = useGetAllPrebuiltPcsQuery();

  const [getSuitablePrebuiltPC] = useGetSuitablePrebuiltPcMutation();

  const [checkCompatibility] = useGetCompatibilityMutation();

  const handleAddAllToCart = (e, orderType) => {
    e.preventDefault();

    if (orderType === "customPc") {
      let customBuildItems = Object.values(customPcItems);
      customBuildItems.pop();
      customBuildItems.forEach((item) => {
        if (Object.keys(item).length > 0) {
          dispatch(addToCart(item));
        }
        dispatch(setOrderType("Custom PC"));
        navigate("/cart");
      });
      dispatch(clearAllBuild());
    } else if (orderType === "prebuiltPC") {
      let prebuiltPcItems = Object.values(prebuiltPc?.pcComponents);
      let refinedPcItems = prebuiltPcItems.filter((item) =>
        item.hasOwnProperty("name")
      );
      refinedPcItems.forEach((item) => {
        dispatch(addToCart({ ...item, qty: 1 }));
      });
      dispatch(setOrderType("Prebuilt PC"));
      navigate("/cart");
    }
  };

  const sidebarNavItems = [
    {
      title: "Processor",
      section: "Processor",
    },
    {
      title: "Motherboard",
      section: "Motherboard",
    },
    {
      title: "Graphics Card",
      section: "Graphics Card",
    },
    {
      title: "RAM",
      section: "RAM",
    },
    {
      title: "Memory SSD",
      section: "Memory SSD",
    },
    {
      title: "Memory HDD",
      section: "Memory HDD",
    },
    {
      title: "Power Supply",
      section: "Power Supply",
    },
    {
      title: "CPU Cooler",
      section: "CPU Cooler",
    },
    {
      title: "Cabinet",
      section: "Cabinet",
    },
    {
      title: "Monitor",
      section: "Monitor",
    },
    {
      title: "Keyboard",
      section: "Keyboard",
    },
    {
      title: "Mouse",
      section: "Mouse",
    },
    {
      title: "Mousepad",
      section: "Mousepad",
    },
    {
      title: "Headset",
      section: "Headset",
    },
  ];

  const handleMerlinQuery = async (e) => {
    e.preventDefault();
    if (
      !games ||
      !gameSettings ||
      !displaySettings ||
      !cpu?.name ||
      !motherboard?.name
    ) {
      toast({
        title: "Insufficient data to measure performance",
        variant: "destructive",
      });
      return;
    } else {
      setPerformanceInsights("");
      try {
        const payload = {
          game: games,
          settings: gameSettings,
          display: displaySettings,
          configuration: {
            cpu: cpu?.name,
            motherboard: motherboard?.name,
            gpu: gpu?.name,
            ram: ram?.name,
            coolingSystem: coolingSystem?.name,
          },
        };
        const res = await calculatePerformance(payload).unwrap();
        setPerformanceInsights(res?.data?.split("\n"));
        setRemainingGptRequestCount(Number(res?.gptRequestCount));
        refetch();
      } catch (error) {
        console.log(error);
        toast({
          title: error?.message || error?.data?.message,
          variant: "destructive",
        });
      }
    }
  };

  const handleMerlinPredictionQuery = async (e) => {
    e.preventDefault();
    if (
      !gamesPrediction ||
      !gameSettingsPrediction ||
      !displaySettingsPrediction ||
      !budgetPrediction
    ) {
      toast({
        title: "Insufficient data to get suggestions",
        variant: "destructive",
      });
      return;
    } else {
      setPrebuiltPcSuggestion("");
      setSuggestedPcName("");
      try {
        const payload = {
          game: gamesPrediction,
          settings: gameSettingsPrediction,
          display: displaySettingsPrediction,
          budget: budgetPrediction,
        };
        const res = await getSuitablePrebuiltPC(payload).unwrap();
        setPrebuiltPcSuggestion(res?.performanceDetails?.split("\n"));
        setSuggestedPcName(res?.pcName);
        setRemainingGptRequestCount(Number(res?.gptRequestCount));
        refetch();
      } catch (error) {
        console.log(error);
        toast({
          title: "Something went wrong, please try again!",
          variant: "destructive",
        });
      }
    }
  };

  const handleCompatibilityCheck = async (e) => {
    e.preventDefault();
    const payload = {
      processor: cpu?.name,
      motherboard: motherboard?.name,
      graphicsCard: gpu?.name,
      RAM: ram?.name,
      storage: ssd?.name || hdd?.name,
      powerSupply: psu?.name,
      cabinet: cabinet?.name,
      coolingSystem: coolingSystem?.name,
    };
    if (!payload?.processor || !payload?.motherboard) {
      toast({
        title: "Insufficient Data!",
        variant: "destructive",
      });
      return;
    }
    setCheckCompatibilityDialog(true);
    setCompatibilityPrediction("");
    try {
      const res = await checkCompatibility(payload).unwrap();
      let processedResponse = res?.compatibilityDetails
        ?.split("\n")
        .map((line) => line.replace(/^- \s*\*\*|\*\*\s*:\s*/, ""))
        .filter((line) => line.trim() !== "")
        .join("\n");
      setCompatibilityPrediction(processedResponse?.split("\n"));
      setRemainingGptRequestCount(Number(res?.gptRequestCount));
      refetch();
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong, please try again!",
        variant: "destructive",
      });
    }
  };

  const handleDeleteSelection = (item) => {
    dispatch(deleteCurrentSelection(item));
  };

  const displaySelectedPc = (e) => {
    e.preventDefault();
    if (allPrebuiltPCs.length) {
      console.log(
        allPrebuiltPCs.filter((pc) => pc?.pcName === suggestedPcName)[0]
      );
      let chosenPc = allPrebuiltPCs.filter(
        (pc) => pc?.pcName === suggestedPcName
      )[0];
      setPrebuiltPc({ ...chosenPc });
    }
  };

  useEffect(() => {
    if (userData) {
      setRemainingGptRequestCount(Number(userData?.gptRequestCount));

      // Parse the date string to a Date object
      let date = new Date(
        userData?.gptLastRequest ? userData?.gptLastRequest : Date.now()
      );
      // console.log(date);
      // Add 30 days to the date
      date.setDate(date.getDate() + 30);

      // Format the date back to the desired string format
      let updatedDateString = date.toISOString();

      setMerlinResetDate(formatDate(updatedDateString));
    }
  }, [userData]);

  useEffect(() => {
    if (prebuiltPc) {
      console.log(prebuiltPc);
    }
  }, [prebuiltPc]);

  return (
    <div className="flex w-full flex-col gap-8">
      <Container className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div className="section-heading flex justify-center mt-4">
            <h1 className="text-[28px] font-extrabold">
              Build Your Custom PC With Our AI -{" "}
              <span className="italic font-bold tracking-[0.075rem] text-primary">
                HALO
              </span>
            </h1>
          </div>
          <Separator className="hidden" />
          <Tabs defaultValue="customPC" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="customPC">
                <span className="text-wrap">Build PC With AI</span>
              </TabsTrigger>
              <TabsTrigger value="suggestPC">
                <span className="text-wrap">Find PC With AI</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="customPC" className="flex flex-col gap-6">
              <Card>
                <CardHeader className="bg-muted rounded-t-lg">
                  <CardTitle>Customize and build your own PC</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Choose Components</CardTitle>
                      <CardDescription>
                        Please select the components for your PC below.
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="p-6 py-12">
                      <Carousel
                        opts={{
                          align: "start",
                        }}
                        orientation="vertical"
                        className="w-full"
                      >
                        <CarouselContent className="-mt-1 h-[450px] md:h-[550px] overflow-y-auto scrollbar">
                          <CarouselItem className="pt-1 basis-1 md:basis-1/2">
                            <div className="p-1">
                              {cpu?.name ? (
                                <CustomPcComponentCard
                                  component={cpu}
                                  section={section}
                                  setSection={setSection}
                                  setGuidedDialogOpen={setGuidedDialogOpen}
                                  guidedDialogOpen={guidedDialogOpen}
                                  category="Processor"
                                  tableActionDropdownOpen={
                                    tableActionDropdownOpen
                                  }
                                  setTableActionDropdownOpen={
                                    setTableActionDropdownOpen
                                  }
                                />
                              ) : (
                                <CustomPcSelectionTableCard
                                  section={section}
                                  setSection={setSection}
                                  setGuidedDialogOpen={setGuidedDialogOpen}
                                  guidedDialogOpen={guidedDialogOpen}
                                  category="Processor"
                                  tableActionDropdownOpen={
                                    tableActionDropdownOpen
                                  }
                                  setTableActionDropdownOpen={
                                    setTableActionDropdownOpen
                                  }
                                />
                              )}
                            </div>
                          </CarouselItem>
                          <CarouselItem className="pt-1 basis-1 md:basis-1/2">
                            <div className="p-1">
                              {motherboard?.name ? (
                                <CustomPcComponentCard
                                  component={motherboard}
                                  section={section}
                                  setSection={setSection}
                                  setGuidedDialogOpen={setGuidedDialogOpen}
                                  guidedDialogOpen={guidedDialogOpen}
                                  category="Motherboard"
                                />
                              ) : (
                                <CustomPcSelectionTableCard
                                  section={section}
                                  setSection={setSection}
                                  setGuidedDialogOpen={setGuidedDialogOpen}
                                  guidedDialogOpen={guidedDialogOpen}
                                  category="Motherboard"
                                />
                              )}
                            </div>
                          </CarouselItem>
                          <CarouselItem className="pt-1 basis-1 md:basis-1/2">
                            <div className="p-1">
                              {gpu?.name ? (
                                <CustomPcComponentCard
                                  component={gpu}
                                  section={section}
                                  setSection={setSection}
                                  setGuidedDialogOpen={setGuidedDialogOpen}
                                  guidedDialogOpen={guidedDialogOpen}
                                  category="Graphics Card"
                                />
                              ) : (
                                <CustomPcSelectionTableCard
                                  section={section}
                                  setSection={setSection}
                                  setGuidedDialogOpen={setGuidedDialogOpen}
                                  guidedDialogOpen={guidedDialogOpen}
                                  category="Graphics Card"
                                />
                              )}
                            </div>
                          </CarouselItem>
                          <CarouselItem className="pt-1 basis-1 md:basis-1/2">
                            <div className="p-1">
                              {ram?.name ? (
                                <CustomPcComponentCard
                                  component={ram}
                                  section={section}
                                  setSection={setSection}
                                  setGuidedDialogOpen={setGuidedDialogOpen}
                                  guidedDialogOpen={guidedDialogOpen}
                                  category="RAM"
                                />
                              ) : (
                                <CustomPcSelectionTableCard
                                  section={section}
                                  setSection={setSection}
                                  setGuidedDialogOpen={setGuidedDialogOpen}
                                  guidedDialogOpen={guidedDialogOpen}
                                  category="RAM"
                                />
                              )}
                            </div>
                          </CarouselItem>
                          <CarouselItem className="pt-1 basis-1 md:basis-1/2">
                            <div className="p-1">
                              {ssd?.name ? (
                                <CustomPcComponentCard
                                  component={ssd}
                                  section={section}
                                  setSection={setSection}
                                  setGuidedDialogOpen={setGuidedDialogOpen}
                                  guidedDialogOpen={guidedDialogOpen}
                                  category="Memory SSD"
                                />
                              ) : (
                                <CustomPcSelectionTableCard
                                  section={section}
                                  setSection={setSection}
                                  setGuidedDialogOpen={setGuidedDialogOpen}
                                  guidedDialogOpen={guidedDialogOpen}
                                  category="Memory SSD"
                                />
                              )}
                            </div>
                          </CarouselItem>
                          <CarouselItem className="pt-1 basis-1 md:basis-1/2">
                            <div className="p-1">
                              {hdd?.name ? (
                                <CustomPcComponentCard
                                  component={hdd}
                                  section={section}
                                  setSection={setSection}
                                  setGuidedDialogOpen={setGuidedDialogOpen}
                                  guidedDialogOpen={guidedDialogOpen}
                                  category="Memory HDD"
                                />
                              ) : (
                                <CustomPcSelectionTableCard
                                  section={section}
                                  setSection={setSection}
                                  setGuidedDialogOpen={setGuidedDialogOpen}
                                  guidedDialogOpen={guidedDialogOpen}
                                  category="Memory HDD"
                                />
                              )}
                            </div>
                          </CarouselItem>
                          <CarouselItem className="pt-1 basis-1 md:basis-1/2">
                            <div className="p-1">
                              {coolingSystem?.name ? (
                                <CustomPcComponentCard
                                  component={coolingSystem}
                                  section={section}
                                  setSection={setSection}
                                  setGuidedDialogOpen={setGuidedDialogOpen}
                                  guidedDialogOpen={guidedDialogOpen}
                                  category="CPU Cooler"
                                />
                              ) : (
                                <CustomPcSelectionTableCard
                                  section={section}
                                  setSection={setSection}
                                  setGuidedDialogOpen={setGuidedDialogOpen}
                                  guidedDialogOpen={guidedDialogOpen}
                                  category="CPU Cooler"
                                />
                              )}
                            </div>
                          </CarouselItem>
                          <CarouselItem className="pt-1 basis-1 md:basis-1/2">
                            <div className="p-1">
                              {cabinet?.name ? (
                                <CustomPcComponentCard
                                  component={cabinet}
                                  section={section}
                                  setSection={setSection}
                                  setGuidedDialogOpen={setGuidedDialogOpen}
                                  guidedDialogOpen={guidedDialogOpen}
                                  category="Cabinet"
                                />
                              ) : (
                                <CustomPcSelectionTableCard
                                  section={section}
                                  setSection={setSection}
                                  setGuidedDialogOpen={setGuidedDialogOpen}
                                  guidedDialogOpen={guidedDialogOpen}
                                  category="Cabinet"
                                />
                              )}
                            </div>
                          </CarouselItem>
                          <CarouselItem className="pt-1 basis-1 md:basis-1/2">
                            <div className="p-1">
                              {psu?.name ? (
                                <CustomPcComponentCard
                                  component={psu}
                                  section={section}
                                  setSection={setSection}
                                  setGuidedDialogOpen={setGuidedDialogOpen}
                                  guidedDialogOpen={guidedDialogOpen}
                                  category="Power Supply"
                                />
                              ) : (
                                <CustomPcSelectionTableCard
                                  section={section}
                                  setSection={setSection}
                                  setGuidedDialogOpen={setGuidedDialogOpen}
                                  guidedDialogOpen={guidedDialogOpen}
                                  category="Power Supply"
                                />
                              )}
                            </div>
                          </CarouselItem>
                          <CarouselItem className="pt-1 basis-1 md:basis-1/2">
                            <div className="p-1">
                              {monitor?.name ? (
                                <CustomPcComponentCard
                                  component={monitor}
                                  section={section}
                                  setSection={setSection}
                                  setGuidedDialogOpen={setGuidedDialogOpen}
                                  guidedDialogOpen={guidedDialogOpen}
                                  category="Monitor"
                                />
                              ) : (
                                <CustomPcSelectionTableCard
                                  section={section}
                                  setSection={setSection}
                                  setGuidedDialogOpen={setGuidedDialogOpen}
                                  guidedDialogOpen={guidedDialogOpen}
                                  category="Monitor"
                                />
                              )}
                            </div>
                          </CarouselItem>
                          <CarouselItem className="pt-1 basis-1 md:basis-1/2">
                            <div className="p-1">
                              {keyboard?.name ? (
                                <CustomPcComponentCard
                                  component={keyboard}
                                  section={section}
                                  setSection={setSection}
                                  setGuidedDialogOpen={setGuidedDialogOpen}
                                  guidedDialogOpen={guidedDialogOpen}
                                  category="Keyboard"
                                />
                              ) : (
                                <CustomPcSelectionTableCard
                                  section={section}
                                  setSection={setSection}
                                  setGuidedDialogOpen={setGuidedDialogOpen}
                                  guidedDialogOpen={guidedDialogOpen}
                                  category="Keyboard"
                                />
                              )}
                            </div>
                          </CarouselItem>
                          <CarouselItem className="pt-1 basis-1 md:basis-1/2">
                            <div className="p-1">
                              {mousepad?.name ? (
                                <CustomPcComponentCard
                                  component={mousepad}
                                  section={section}
                                  setSection={setSection}
                                  setGuidedDialogOpen={setGuidedDialogOpen}
                                  guidedDialogOpen={guidedDialogOpen}
                                  category="Mousepad"
                                />
                              ) : (
                                <CustomPcSelectionTableCard
                                  section={section}
                                  setSection={setSection}
                                  setGuidedDialogOpen={setGuidedDialogOpen}
                                  guidedDialogOpen={guidedDialogOpen}
                                  category="Mousepad"
                                />
                              )}
                            </div>
                          </CarouselItem>
                          <CarouselItem className="pt-1 basis-1 md:basis-1/2">
                            <div className="p-1">
                              {mouse?.name ? (
                                <CustomPcComponentCard
                                  component={mouse}
                                  section={section}
                                  setSection={setSection}
                                  setGuidedDialogOpen={setGuidedDialogOpen}
                                  guidedDialogOpen={guidedDialogOpen}
                                  category="Mouse"
                                />
                              ) : (
                                <CustomPcSelectionTableCard
                                  section={section}
                                  setSection={setSection}
                                  setGuidedDialogOpen={setGuidedDialogOpen}
                                  guidedDialogOpen={guidedDialogOpen}
                                  category="Mouse"
                                />
                              )}
                            </div>
                          </CarouselItem>
                          <CarouselItem className="pt-1 basis-1 md:basis-1/2">
                            <div className="p-1">
                              {headphone?.name ? (
                                <CustomPcComponentCard
                                  component={headphone}
                                  section={section}
                                  setSection={setSection}
                                  setGuidedDialogOpen={setGuidedDialogOpen}
                                  guidedDialogOpen={guidedDialogOpen}
                                  category="Headset"
                                />
                              ) : (
                                <CustomPcSelectionTableCard
                                  section={section}
                                  setSection={setSection}
                                  setGuidedDialogOpen={setGuidedDialogOpen}
                                  guidedDialogOpen={guidedDialogOpen}
                                  category="Headset"
                                />
                              )}
                            </div>
                          </CarouselItem>
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                      </Carousel>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="bg-muted rounded-t-lg">
                  <CardTitle>PC Details & Performance Predictor</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <div className="col-span-1">
                    <fieldset className="flex flex-col gap-4 rounded-lg border p-4">
                      <legend className="-ml-1 px-1 text-sm font-medium">
                        Your Custom PC
                      </legend>
                      <CardContent className="p-4 pt-2 text-sm">
                        <div className="grid gap-3">
                          <ul className="grid gap-3">
                            <li className="flex items-center justify-between">
                              <span className="text-muted-foreground text-left">
                                Processor
                              </span>
                              <span className="text-right text-xs font-semibold flex gap-2 items-center">
                                {cpu?.name
                                  ? cpu?.name?.length > 40
                                    ? `${cpu?.name
                                        ?.split(" ")
                                        .slice(0, 5)
                                        .join(" ")}...`
                                    : cpu?.name
                                  : "Not Selected"}
                                {cpu?.name && (
                                  <span>
                                    {" "}
                                    <Trash2
                                      className="h-3 w-3 text-primary hover:cursor-pointer"
                                      onClick={() =>
                                        handleDeleteSelection("cpu")
                                      }
                                    />
                                  </span>
                                )}
                              </span>
                            </li>
                            <li className="flex items-center justify-between">
                              <span className="text-muted-foreground text-left">
                                Motherboard
                              </span>
                              <span className="text-right text-xs font-semibold flex gap-2 items-center">
                                {motherboard?.name
                                  ? motherboard?.name?.length > 40
                                    ? `${motherboard?.name
                                        ?.split(" ")
                                        .slice(0, 5)
                                        .join(" ")}...`
                                    : motherboard?.name
                                  : "Not Selected"}
                                {motherboard?.name && (
                                  <span>
                                    {" "}
                                    <Trash2
                                      className="h-3 w-3 text-primary hover:cursor-pointer"
                                      onClick={() =>
                                        handleDeleteSelection("motherboard")
                                      }
                                    />
                                  </span>
                                )}
                              </span>
                            </li>
                            <li className="flex items-center justify-between">
                              <span className="text-muted-foreground text-left">
                                Graphics
                              </span>
                              <span className="text-right text-xs font-semibold flex gap-2 items-center">
                                {gpu?.name
                                  ? gpu?.name?.length > 40
                                    ? `${gpu?.name
                                        ?.split(" ")
                                        .slice(0, 5)
                                        .join(" ")}...`
                                    : gpu?.name
                                  : "Not Selected"}
                                {gpu?.name && (
                                  <span>
                                    {" "}
                                    <Trash2
                                      className="h-3 w-3 text-primary hover:cursor-pointer"
                                      onClick={() =>
                                        handleDeleteSelection("gpu")
                                      }
                                    />
                                  </span>
                                )}
                              </span>
                            </li>
                            <li className="flex items-center justify-between">
                              <span className="text-muted-foreground text-left">
                                RAM
                              </span>
                              <span className="text-right text-xs font-semibold flex gap-2 items-center">
                                {ram?.name
                                  ? ram?.name?.length > 40
                                    ? `${ram?.name
                                        ?.split(" ")
                                        .slice(0, 5)
                                        .join(" ")}...`
                                    : ram?.name
                                  : "Not Selected"}
                                {ram?.name && (
                                  <span>
                                    {" "}
                                    <Trash2
                                      className="h-3 w-3 text-primary hover:cursor-pointer"
                                      onClick={() =>
                                        handleDeleteSelection("ram")
                                      }
                                    />
                                  </span>
                                )}
                              </span>
                            </li>
                            <li className="flex items-center justify-between">
                              <span className="text-muted-foreground text-left">
                                Memory SSD
                              </span>
                              <span className="text-right text-xs font-semibold flex gap-2 items-center">
                                {ssd?.name
                                  ? ssd?.name?.length > 40
                                    ? `${ssd?.name
                                        ?.split(" ")
                                        .slice(0, 5)
                                        .join(" ")}...`
                                    : ssd?.name
                                  : "Not Selected"}
                                {ssd?.name && (
                                  <span>
                                    {" "}
                                    <Trash2
                                      className="h-3 w-3 text-primary hover:cursor-pointer"
                                      onClick={() =>
                                        handleDeleteSelection("ssd")
                                      }
                                    />
                                  </span>
                                )}
                              </span>
                            </li>
                            <li className="flex items-center justify-between">
                              <span className="text-muted-foreground text-left">
                                Memory HDD
                              </span>
                              <span className="text-right text-xs font-semibold flex gap-2 items-center">
                                {hdd?.name
                                  ? hdd?.name?.length > 40
                                    ? `${hdd?.name
                                        ?.split(" ")
                                        .slice(0, 5)
                                        .join(" ")}...`
                                    : hdd?.name
                                  : "Not Selected"}
                                {hdd?.name && (
                                  <span>
                                    {" "}
                                    <Trash2
                                      className="h-3 w-3 text-primary hover:cursor-pointer"
                                      onClick={() =>
                                        handleDeleteSelection("hdd")
                                      }
                                    />
                                  </span>
                                )}
                              </span>
                            </li>
                            <li className="flex items-center justify-between">
                              <span className="text-muted-foreground text-left">
                                Cpu Cooler
                              </span>
                              <span className="text-right text-xs font-semibold flex gap-2 items-center">
                                {coolingSystem?.name
                                  ? coolingSystem?.name?.length > 40
                                    ? `${coolingSystem?.name
                                        ?.split(" ")
                                        .slice(0, 5)
                                        .join(" ")}...`
                                    : coolingSystem?.name
                                  : "Not Selected"}
                                {coolingSystem?.name && (
                                  <span>
                                    {" "}
                                    <Trash2
                                      className="h-3 w-3 text-primary hover:cursor-pointer"
                                      onClick={() =>
                                        handleDeleteSelection("coolingSystem")
                                      }
                                    />
                                  </span>
                                )}
                              </span>
                            </li>
                            <li className="flex items-center justify-between">
                              <span className="text-muted-foreground text-left">
                                Cabinet
                              </span>
                              <span className="text-right text-xs font-semibold flex gap-2 items-center">
                                {cabinet?.name
                                  ? cabinet?.name?.length > 40
                                    ? `${cabinet?.name
                                        ?.split(" ")
                                        .slice(0, 5)
                                        .join(" ")}...`
                                    : cabinet?.name
                                  : "Not Selected"}
                                {cabinet?.name && (
                                  <span>
                                    {" "}
                                    <Trash2
                                      className="h-3 w-3 text-primary hover:cursor-pointer"
                                      onClick={() =>
                                        handleDeleteSelection("cabinet")
                                      }
                                    />
                                  </span>
                                )}
                              </span>
                            </li>
                            <li className="flex items-center justify-between">
                              <span className="text-muted-foreground text-left">
                                Power Supply
                              </span>
                              <span className="text-right text-xs font-semibold flex gap-2 items-center">
                                {psu?.name
                                  ? psu?.name?.length > 40
                                    ? `${psu?.name
                                        ?.split(" ")
                                        .slice(0, 5)
                                        .join(" ")}...`
                                    : psu?.name
                                  : "Not Selected"}
                                {psu?.name && (
                                  <span>
                                    {" "}
                                    <Trash2
                                      className="h-3 w-3 text-primary hover:cursor-pointer"
                                      onClick={() =>
                                        handleDeleteSelection("psu")
                                      }
                                    />
                                  </span>
                                )}
                              </span>
                            </li>
                            <li className="flex items-center justify-between">
                              <span className="text-muted-foreground text-left">
                                Monitor
                              </span>
                              <span className="text-right text-xs font-semibold flex gap-2 items-center">
                                {monitor?.name
                                  ? monitor?.name?.length > 40
                                    ? `${monitor?.name
                                        ?.split(" ")
                                        .slice(0, 5)
                                        .join(" ")}...`
                                    : monitor?.name
                                  : "Not Selected"}
                                {monitor?.name && (
                                  <span>
                                    {" "}
                                    <Trash2
                                      className="h-3 w-3 text-primary hover:cursor-pointer"
                                      onClick={() =>
                                        handleDeleteSelection("monitor")
                                      }
                                    />
                                  </span>
                                )}
                              </span>
                            </li>
                            <li className="flex items-center justify-between">
                              <span className="text-muted-foreground text-left">
                                Keyboard
                              </span>
                              <span className="text-right text-xs font-semibold flex gap-2 items-center">
                                {keyboard?.name
                                  ? keyboard?.name?.length > 40
                                    ? `${keyboard?.name
                                        ?.split(" ")
                                        .slice(0, 5)
                                        .join(" ")}...`
                                    : keyboard?.name
                                  : "Not Selected"}
                                {keyboard?.name && (
                                  <span>
                                    {" "}
                                    <Trash2
                                      className="h-3 w-3 text-primary hover:cursor-pointer"
                                      onClick={() =>
                                        handleDeleteSelection("keyboard")
                                      }
                                    />
                                  </span>
                                )}
                              </span>
                            </li>
                            <li className="flex items-center justify-between">
                              <span className="text-muted-foreground text-left">
                                Mouse
                              </span>
                              <span className="text-right text-xs font-semibold flex gap-2 items-center">
                                {mouse?.name
                                  ? mouse?.name?.length > 40
                                    ? `${mouse?.name
                                        ?.split(" ")
                                        .slice(0, 5)
                                        .join(" ")}...`
                                    : mouse?.name
                                  : "Not Selected"}
                                {mouse?.name && (
                                  <span>
                                    {" "}
                                    <Trash2
                                      className="h-3 w-3 text-primary hover:cursor-pointer"
                                      onClick={() =>
                                        handleDeleteSelection("mouse")
                                      }
                                    />
                                  </span>
                                )}
                              </span>
                            </li>
                            <li className="flex items-center justify-between">
                              <span className="text-muted-foreground text-left">
                                Headphone
                              </span>
                              <span className="text-right text-xs font-semibold flex gap-2 items-center">
                                {headphone?.name
                                  ? headphone?.name?.length > 40
                                    ? `${headphone?.name
                                        ?.split(" ")
                                        .slice(0, 5)
                                        .join(" ")}...`
                                    : headphone?.name
                                  : "Not Selected"}
                                {headphone?.name && (
                                  <span>
                                    {" "}
                                    <Trash2
                                      className="h-3 w-3 text-primary hover:cursor-pointer"
                                      onClick={() =>
                                        handleDeleteSelection("headphone")
                                      }
                                    />
                                  </span>
                                )}
                              </span>
                            </li>
                            <li className="flex items-center justify-between">
                              <span className="text-muted-foreground text-left">
                                Mousepad
                              </span>
                              <span className="text-right text-xs font-semibold flex gap-2 items-center">
                                {mousepad?.name
                                  ? mousepad?.name?.length > 40
                                    ? `${mousepad?.name
                                        ?.split(" ")
                                        .slice(0, 5)
                                        .join(" ")}...`
                                    : mousepad?.name
                                  : "Not Selected"}
                                {mousepad?.name && (
                                  <span>
                                    {" "}
                                    <Trash2
                                      className="h-3 w-3 text-primary hover:cursor-pointer"
                                      onClick={() =>
                                        handleDeleteSelection("mousepad")
                                      }
                                    />
                                  </span>
                                )}
                              </span>
                            </li>
                          </ul>

                          <Separator className="my-2" />
                          <ul className="grid gap-3">
                            <li className="flex items-center justify-between">
                              <span className="text-muted-foreground">
                                Subtotal
                              </span>
                              <span>
                                ₹{" "}
                                {Number(
                                  totalBuildPrice - totalBuildPrice * 0.18
                                ).toFixed(2)}
                              </span>
                            </li>
                            <li className="flex items-center justify-between">
                              <span className="text-muted-foreground">Tax</span>
                              <span>
                                ₹ {Number(totalBuildPrice * 0.18).toFixed(2)}
                              </span>
                            </li>
                            <li className="flex items-center justify-between font-semibold">
                              <span className="text-muted-foreground">
                                Total
                              </span>
                              <span>
                                ₹ {Number(totalBuildPrice).toFixed(2)}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </CardContent>
                      <Card className="px-3">
                        <CardHeader className="py-3">
                          <CardTitle>Compatibility Checker</CardTitle>
                          {/* <CardDescription>
                            AI Powered Compatibility Checker. This is for an
                            overall idea, but for accurate compatibility
                            confirmation please call us.
                          </CardDescription> */}
                        </CardHeader>
                        <CardContent className="py-3">
                          <Dialog
                            open={checkCompatibilityDialog}
                            onOpenChange={setCheckCompatibilityDialog}
                          >
                            <DialogTrigger asChild>
                              <Button
                                className="w-full"
                                size="sm"
                                onClick={handleCompatibilityCheck}
                              >
                                Check Compatibility
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader className="col-span-3">
                                <DialogTitle>
                                  AI Powered Compatibility Checker
                                </DialogTitle>
                                <DialogDescription>
                                  AI predictions can be{" "}
                                  <span className="text-primary">
                                    inaccurate
                                  </span>
                                  , please call us to confirm compatibility
                                  before purchase. Remaining attempts (resets
                                  after 30 days):{" "}
                                  <span className="text-primary font-bold">
                                    {remainingGptRequestCount}
                                  </span>
                                </DialogDescription>
                              </DialogHeader>
                              <fieldset className="flex flex-col gap-4 rounded-lg border p-4 col-span-3">
                                <legend className="-ml-1 px-1 text-sm font-medium">
                                  HALO
                                </legend>
                                <Card className="h-[410px]">
                                  {" "}
                                  {/* Set a fixed height for the Card */}
                                  <CardHeader className="rounded-t-xl bg-muted/50">
                                    <CardTitle>HALO's Prediction</CardTitle>
                                  </CardHeader>
                                  <CardContent className="pt-4 text-sm overflow-y-auto max-h-[75%] scrollbar">
                                    {" "}
                                    {/* Make content scrollable */}
                                    <div className="grid gap-3">
                                      {!compatiblityPrediction?.length ? (
                                        <div className="flex flex-col space-y-3">
                                          <Skeleton className="h-[130px] md:h-[160px] w-[65vw] md:w-[380px] rounded-xl" />
                                          {/* <Skeleton className="h-[170px] w-[380px] rounded-xl" /> */}

                                          <div className="space-y-2">
                                            <Skeleton className="h-3 w-[65vw] md:w-[380px]" />
                                            <Skeleton className="h-3 w-[65vw] md:w-[380px]" />
                                            <Skeleton className="h-3 w-[65vw] md:w-[380px]" />
                                            <Skeleton className="h-3 w-[60vw] md:w-[200px]" />
                                          </div>
                                        </div>
                                      ) : (
                                        <div className="flex flex-col justify-between gap-4">
                                          {compatiblityPrediction?.map(
                                            (item, index) => (
                                              <p
                                                key={index}
                                                className="text-left"
                                              >
                                                {item}
                                              </p>
                                            )
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  </CardContent>
                                </Card>
                              </fieldset>
                              <DialogFooter>
                                <Button
                                  onClick={() =>
                                    setCheckCompatibilityDialog(false)
                                  }
                                >
                                  Close
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </CardContent>
                      </Card>
                      <div className="px-3">
                        <Button
                          className="w-full"
                          onClick={(e) => handleAddAllToCart(e, "customPc")}
                        >
                          Add all to Cart
                        </Button>
                      </div>
                    </fieldset>
                  </div>
                  <div className="col-span-1">
                    <fieldset className="flex flex-col gap-4 rounded-lg border p-4">
                      <legend className="-ml-1 px-1 text-sm font-medium">
                        Ask Our AI
                      </legend>
                      <CardContent className="p-4 pb-2 pt-2 text-sm">
                        <div className="grid gap-3">
                          <form className="flex flex-col gap-4">
                            <div className="flex flex-col md:flex-row items-center gap-3">
                              <Label
                                htmlFor="resolution"
                                className="w-full md:w-1/4 text-center md:text-left"
                              >
                                Resolution
                              </Label>
                              <Select
                                className="w-full md:w-3/4"
                                onValueChange={(e) =>
                                  setDisplaySettings(`${e} pixels`)
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select resolution" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1080">
                                    1080 Pixels - 1K Resolution
                                  </SelectItem>
                                  <SelectItem value="1440">
                                    1440 Pixels - 2K Resolution
                                  </SelectItem>
                                  <SelectItem value="2160">
                                    2160 Pixels - 4K Resolution
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex flex-col md:flex-row items-center gap-3">
                              <Label
                                htmlFor="settings"
                                className="w-full md:w-1/4 text-center md:text-left"
                              >
                                Display
                              </Label>
                              <Select
                                className="w-full md:w-3/4"
                                onValueChange={(e) => setGameSettings(e)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Game display settings" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="ultra">
                                    Ultra High Settings
                                  </SelectItem>
                                  <SelectItem value="high">
                                    High Settings
                                  </SelectItem>
                                  <SelectItem value="medium">
                                    Medium Settings
                                  </SelectItem>
                                  <SelectItem value="low">
                                    Low Settings
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex flex-col md:flex-row items-center gap-3">
                              <Label
                                htmlFor="games"
                                className="w-full md:w-1/5 text-center md:text-left"
                              >
                                Games or Software
                              </Label>
                              <Input
                                id="games"
                                placeholder="Enter games or softwares..."
                                className="w-full md:w-4/5"
                                value={games}
                                onChange={(e) => setGames(e.target.value)}
                              />
                            </div>
                            <Card className="flex flex-col gap-2 items-center justify-center">
                              <CardHeader className="p-4 md:p-6">
                                <CardTitle>
                                  Remaining attempts (resets after 30 days):{" "}
                                  <span className="text-primary font-bold">
                                    {remainingGptRequestCount}
                                  </span>
                                </CardTitle>
                                <CardDescription>
                                  Reset Date: {merlinResetDate}
                                </CardDescription>
                              </CardHeader>
                            </Card>
                            {userInfo ? (
                              <Button
                                className="mt-2"
                                onClick={(e) => handleMerlinQuery(e)}
                              >
                                Ask HALO
                              </Button>
                            ) : (
                              <Button
                                className="mt-2"
                                onClick={() => navigate("/login")}
                              >
                                Login To Access AI
                              </Button>
                            )}
                          </form>
                        </div>
                      </CardContent>
                    </fieldset>
                    <fieldset className="flex flex-col gap-4 rounded-lg border p-4">
                      <legend className="-ml-1 px-1 text-sm font-medium">
                        HALO
                      </legend>
                      <Card className="h-[370px]">
                        {" "}
                        {/* Set a fixed height for the Card */}
                        <CardHeader className="rounded-t-xl bg-muted/50">
                          <CardTitle>HALO's Prediction</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4 text-sm overflow-y-auto">
                          {" "}
                          {/* Make content scrollable */}
                          <div className="grid gap-3 overflow-y-auto max-h-[26vh] scrollbar">
                            {!performanceInsights?.length ? (
                              <div className="flex flex-col space-y-3">
                                <Skeleton className="h-[130px] md:h-[160px] w-[60vw] md:w-[380px] rounded-xl" />
                                {/* <Skeleton className="h-[170px] w-[380px] rounded-xl" /> */}

                                <div className="space-y-2">
                                  <Skeleton className="h-3 w-[60vw] md:w-[380px]" />
                                  <Skeleton className="h-3 w-[60vw] md:w-[380px]" />
                                  <Skeleton className="h-3 w-[60vw] md:w-[380px]" />
                                  <Skeleton className="h-3 w-[55vw] md:w-[300px]" />
                                </div>
                              </div>
                            ) : (
                              performanceInsights?.map((item, index) => (
                                <p key={index} className="text-left">
                                  {item}
                                </p>
                              ))
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </fieldset>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="suggestPC" className="flex flex-col gap-4">
              <Playground
                remainingGptRequestCount={remainingGptRequestCount}
                merlinResetDate={merlinResetDate}
                setRemainingGptRequestCount={setRemainingGptRequestCount}
              />
            </TabsContent>
          </Tabs>
        </div>
      </Container>
    </div>
  );
};

export default BuildCustomPCScreen;
