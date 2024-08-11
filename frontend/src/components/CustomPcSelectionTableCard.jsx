import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
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
import placeholderimg from "../components/assets/images/place-hold-2.jpg";

const CustomPcSelectionTableCard = ({
  section,
  setSection,
  guidedDialogOpen,
  setGuidedDialogOpen,
  category,
  tableActionDropdownOpen,
  setTableActionDropdownOpen,
}) => {
  return (
    <Card>
      <CardHeader className="bg-muted rounded-t-lg">
        <CardTitle>{category}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex gap-3 md:gap-8 items-center justify-center flex-col">
          <p>Select a {category} from the wide range of products.</p>
          <Dialog
            // open={guidedDialogOpen}
            // onOpenChange={setGuidedDialogOpen}
            modal={false}
          >
            <DialogTrigger asChild>
              <Button onClick={() => setSection(category)}>
                Choose {category}
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
                  <ProcessorTable
                    closeDialog={setGuidedDialogOpen}
                    tableActionDropdownOpen={tableActionDropdownOpen}
                    setTableActionDropdownOpen={setTableActionDropdownOpen}
                  />
                )}
                {section === "Motherboard" && (
                  <MotherboardTable
                    closeDialog={setGuidedDialogOpen}
                    tableActionDropdownOpen={tableActionDropdownOpen}
                    setTableActionDropdownOpen={setTableActionDropdownOpen}
                  />
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
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomPcSelectionTableCard;
