import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { RefreshCcw, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { addConfigureCpu } from "../Features/pcConfigureSlice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import ProcessorTable from "./TableComponentsCustomPc/ProcessorTable";
import MotherboardTable from "./TableComponentsCustomPc/MotherboardTable";
import GraphicsCardTable from "./TableComponentsCustomPc/GraphicsCardTable";
import RAMTable from "./TableComponentsCustomPc/RAMTable";
import MemorySSDTable from "./TableComponentsCustomPc/MemorySSDTable";
import MemoryHDDTable from "./TableComponentsCustomPc/MemoryHDDTable";
import PowerSupplyTable from "./TableComponentsCustomPc/PowerSupplyTable";
import CPUCoolerTable from "./TableComponentsCustomPc/CPUCoolerTable";
import CabinetTable from "./TableComponentsCustomPc/CabinetTable";
import MonitorTable from "./TableComponentsCustomPc/MonitorTable";
import KeyboardTable from "./TableComponentsCustomPc/KeyboardTable";
import MouseTable from "./TableComponentsCustomPc/MouseTable";
import MousepadTable from "./TableComponentsCustomPc/MousepadTable";
import HeadsetTable from "./TableComponentsCustomPc/HeadsetTable";
import { deleteCurrentSelection } from "../Features/pcBuilderSlice";

const CustomPcComponentCard = ({
  component,
  section,
  setSection,
  setGuidedDialogOpen,
  guidedDialogOpen,
  category,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deletePayload, setDeletePayload] = useState("");

  useEffect(() => {
    if (component) {
      switch (component?.category) {
        case "CPU":
          setDeletePayload("cpu");
          break;
        case "Motherboard":
          setDeletePayload("motherboard");
          break;
        case "CPU COOLER":
          setDeletePayload("coolingSystem");
          break;
        case "RAM":
          setDeletePayload("ram");
          break;
        case "SSD":
          setDeletePayload("ssd");
          break;
        case "HDD":
          setDeletePayload("hdd");
          break;
        case "GPU":
          setDeletePayload("gpu");
          break;
        case "PSU":
          setDeletePayload("psu");
          break;
        case "Cabinet":
          setDeletePayload("cabinet");
          break;
        case "Monitor":
          setDeletePayload("monitor");
          break;
        case "Keyboard":
          setDeletePayload("keyboard");
          break;
        case "Mouse":
          setDeletePayload("mouse");
          break;
        case "Mousepad":
          setDeletePayload("mousepad");
          break;
        case "Headset":
          setDeletePayload("headphone");
          break;
        default:
          break;
      }
    }
  }, [component]);

  const handleDeleteSelection = () => {
    dispatch(deleteCurrentSelection(deletePayload));
  };
  return (
    <Card>
      <CardHeader className="bg-muted rounded-t-lg">
        <CardTitle>{category}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row items-center justify-between p-6 py-4 gap-4">
        <Link to={`/product/${component?._id}`}>
          <img
            src={component?.image}
            alt="processor"
            className="h-[175px] w-[175px]"
          />
        </Link>
        <div className="flex flex-col gap-2 w-full md:w-1/2">
          <div className="flex justify-center items-center gap-2">
            <Input value={component?.name} readOnly />
          </div>
          <div className="hidden md:flex justify-center items-center gap-2">
            <p className="p-2 border rounded-lg text-left">
              {component?.description?.length > 100
                ? `${component?.description?.substring(0, 100)}...`
                : component?.description}
            </p>
          </div>
        </div>
        <div className="text-primary font-medium">
          ₹ {component?.currentPrice}
        </div>
        <div className="flex gap-2">
          <Dialog
            open={guidedDialogOpen}
            onOpenChange={setGuidedDialogOpen}
            modal={false}
          >
            <DialogTrigger asChild>
              <Button
                onClick={() =>
                  setSection(
                    category === "Cooling System" ? "CPU Cooler" : category
                  )
                }
                variant="outline"
              >
                <RefreshCcw className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent
              className="sm:max-w-[425px] md:max-w-[600px]"
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <DialogHeader>
                <DialogTitle>{section}</DialogTitle>
                <DialogDescription>Select {section}</DialogDescription>
              </DialogHeader>
              <div className="flex-1 lg:max-w-2xl">
                {section === "Processor" && (
                  <ProcessorTable closeDialog={setGuidedDialogOpen} />
                )}
                {section === "Motherboard" && (
                  <MotherboardTable closeDialog={setGuidedDialogOpen} />
                )}
                {section === "Graphics Card" && (
                  <GraphicsCardTable closeDialog={setGuidedDialogOpen} />
                )}
                {section === "RAM" && (
                  <RAMTable closeDialog={setGuidedDialogOpen} />
                )}
                {section === "Memory SSD" && (
                  <MemorySSDTable closeDialog={setGuidedDialogOpen} />
                )}
                {section === "Memory HDD" && (
                  <MemoryHDDTable closeDialog={setGuidedDialogOpen} />
                )}
                {section === "Power Supply" && (
                  <PowerSupplyTable closeDialog={setGuidedDialogOpen} />
                )}
                {section === "CPU Cooler" && (
                  <CPUCoolerTable closeDialog={setGuidedDialogOpen} />
                )}
                {section === "Cabinet" && (
                  <CabinetTable closeDialog={setGuidedDialogOpen} />
                )}
                {section === "Monitor" && (
                  <MonitorTable closeDialog={setGuidedDialogOpen} />
                )}
                {section === "Keyboard" && (
                  <KeyboardTable closeDialog={setGuidedDialogOpen} />
                )}
                {section === "Mouse" && (
                  <MouseTable closeDialog={setGuidedDialogOpen} />
                )}
                {section === "Mousepad" && (
                  <MousepadTable closeDialog={setGuidedDialogOpen} />
                )}
                {section === "Headset" && (
                  <HeadsetTable closeDialog={setGuidedDialogOpen} />
                )}
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline" onClick={handleDeleteSelection}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomPcComponentCard;
