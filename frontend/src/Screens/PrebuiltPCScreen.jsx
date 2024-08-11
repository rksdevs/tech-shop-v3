import Container from "../components/Container";
import { Breadcrumbs } from "../components/Breadcrumbs";
import customPcImg from "../components/assets/images/pc-build-4.jpg";
import {
  Cpu,
  GalleryThumbnails,
  Gamepad2,
  Eye,
  IndianRupee,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { useGetAllPrebuiltPcsQuery } from "../Features/pcConfigureApiSlice";
import { useEffect } from "react";
import { addToCart } from "../Features/cartSlice";
import { setOrderType } from "../Features/orderTypeSlice";

const PrebuiltPCScreen = () => {
  const cart = useSelector((state) => state.cart);
  const {
    data: allPrebuiltPcs,
    isLoading: allPrebuiltPcsLoading,
    error: allPrebuiltPcsError,
  } = useGetAllPrebuiltPcsQuery();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddAllToCart = (e, prebuiltPc) => {
    e.preventDefault();
    let prebuiltPcItems = Object.values(prebuiltPc?.pcComponents);
    let refinedPcItems = prebuiltPcItems.filter((item) =>
      item.hasOwnProperty("name")
    );
    refinedPcItems.forEach((item) => {
      dispatch(addToCart({ ...item, qty: 1 }));
    });
    dispatch(setOrderType("Prebuilt PC"));
    navigate("/cart");
  };

  return (
    <div className="flex w-full flex-col gap-8">
      <Container className="flex flex-col gap-4">
        <div className="bread-crumb mt-4">
          <Breadcrumbs />
        </div>
        <div className="flex flex-col gap-4">
          <div className="section-heading flex justify-center">
            <h1 className="text-[28px] font-extrabold">Prebuilt PCs</h1>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {allPrebuiltPcs?.map((prebuiltPc) => (
              <Card className="h-fit" key={prebuiltPc?._id}>
                <CardHeader className="items-center border-b p-4">
                  <img
                    src={
                      prebuiltPc?.pcImage === "/images/sample.jpg"
                        ? customPcImg
                        : prebuiltPc?.pcImage
                    }
                    alt="custom pc"
                    className="w-[250px] h-[250px]"
                  />
                  <CardTitle>{prebuiltPc?.pcName}</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div>
                    <div className="flex gap-4 items-start pb-4 last:mb-0 last:pb-0">
                      <Cpu />
                      <div className="space-y-1 text-left">
                        <p className="text-sm font-medium leading-none">
                          Platform
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Based on {prebuiltPc?.platform} Platform
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start pb-4 last:mb-0 last:pb-0">
                      <GalleryThumbnails />
                      <div className="space-y-1 text-left">
                        <p className="text-sm font-medium leading-none">
                          Category
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {prebuiltPc?.pcCategory}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start pb-4 last:mb-0 last:pb-0">
                      <Gamepad2 />
                      <div className="space-y-1 text-left">
                        <p className="text-sm font-medium leading-none">
                          Recommended Uses
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {prebuiltPc?.pcUses}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start pb-4 last:mb-0 last:pb-0">
                      <IndianRupee />
                      <div className="space-y-1 text-left">
                        <p className="text-sm font-medium leading-none">
                          Budget
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Between ₹ {prebuiltPc?.pcTotalPrice}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button className="flex gap-2 mt-4 w-full">
                        <span>Preview</span>
                        <Eye />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300] md:w-[450px]">
                      <Card className="overflow-hidden w-full">
                        <CardHeader className="flex flex-row items-start bg-muted/50 p-5">
                          <div className="grid gap-0.5">
                            <CardTitle className="group flex items-center gap-2 text-lg">
                              Specifications
                            </CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="p-6 text-sm">
                          <div className="grid gap-3">
                            <ul className="grid gap-3">
                              <li className="flex items-center justify-between border p-1 rounded">
                                <span className="text-muted-foreground">
                                  Processor
                                </span>
                                <span>
                                  {prebuiltPc?.pcComponents?.cpu?.name
                                    ?.split(" ")
                                    .slice(0, 5)
                                    .join(" ") || "NA"}
                                </span>
                              </li>
                              <li className="flex items-center justify-between border p-1 rounded">
                                <span className="text-muted-foreground">
                                  Motherboard
                                </span>
                                <span>
                                  {prebuiltPc?.pcComponents?.motherboard?.name
                                    ?.split(" ")
                                    .slice(0, 5)
                                    .join(" ") || "NA"}
                                </span>
                              </li>
                              <li className="flex items-center justify-between border p-1 rounded">
                                <span className="text-muted-foreground">
                                  Graphics
                                </span>
                                <span>
                                  {prebuiltPc?.pcComponents?.gpu?.name
                                    ?.split(" ")
                                    .slice(0, 5)
                                    .join(" ") || "NA"}
                                </span>
                              </li>
                              <li className="flex items-center justify-between border p-1 rounded">
                                <span className="text-muted-foreground">
                                  RAM
                                </span>
                                <span>
                                  {prebuiltPc?.pcComponents?.ram?.name
                                    ?.split(" ")
                                    .slice(0, 5)
                                    .join(" ") || "NA"}
                                </span>
                              </li>
                              <li className="flex items-center justify-between border p-1 rounded">
                                <span className="text-muted-foreground">
                                  Memory SSD
                                </span>
                                <span>
                                  {prebuiltPc?.pcComponents?.ssd?.name
                                    ?.split(" ")
                                    .slice(0, 5)
                                    .join(" ") || "NA"}
                                </span>
                              </li>
                              <li className="flex items-center justify-between border p-1 rounded">
                                <span className="text-muted-foreground">
                                  Memory HDD
                                </span>
                                <span>
                                  {prebuiltPc?.pcComponents?.hdd?.name
                                    ?.split(" ")
                                    .slice(0, 5)
                                    .join(" ") || "NA"}
                                </span>
                              </li>
                              <li className="flex items-center justify-between border p-1 rounded">
                                <span className="text-muted-foreground">
                                  Cooler
                                </span>
                                <span>
                                  {prebuiltPc?.pcComponents?.coolingSystem?.name
                                    ?.split(" ")
                                    .slice(0, 5)
                                    .join(" ") || "NA"}
                                </span>
                              </li>
                              <li className="flex items-center justify-between border p-1 rounded">
                                <span className="text-muted-foreground">
                                  Power Supply
                                </span>
                                <span>
                                  {prebuiltPc?.pcComponents?.psu?.name
                                    ?.split(" ")
                                    .slice(0, 5)
                                    .join(" ") || "NA"}
                                </span>
                              </li>
                              <li className="flex items-center justify-between border p-1 rounded">
                                <span className="text-muted-foreground">
                                  Cabinet
                                </span>
                                <span>
                                  {prebuiltPc?.pcComponents?.cabinet?.name
                                    ?.split(" ")
                                    .slice(0, 5)
                                    .join(" ") || "NA"}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center border-t bg-muted/50 px-6 py-3">
                          <span className="text-xl font-bold text-primary">
                            ₹ {prebuiltPc?.pcTotalPrice || "NA"}
                          </span>
                          <Button
                            onClick={(e) => handleAddAllToCart(e, prebuiltPc)}
                          >
                            Add to Cart
                          </Button>
                        </CardFooter>
                      </Card>
                    </PopoverContent>
                  </Popover>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PrebuiltPCScreen;
