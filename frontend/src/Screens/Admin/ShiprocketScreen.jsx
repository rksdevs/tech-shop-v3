import Container from "../../components/Container";
import { useGetOrderDetailsQuery } from "../../Features/orderApiSlice";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Clock, List, Mail, Truck } from "lucide-react";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";
import {
  useCancelShiprocketOrderMutation,
  useCreateShiprocketOrderMutation,
} from "../../Features/shipRocketApiSlice";
import { useToast } from "../../components/ui/use-toast";

const ShiprocketScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { id: orderId } = useParams();
  const { toast } = useToast();
  const {
    data: orderData,
    isLoading: orderLoading,
    error: orderError,
    refetch,
  } = useGetOrderDetailsQuery(orderId);

  const [createShiprocketOrder] = useCreateShiprocketOrderMutation();
  const [cancelShiprocketOrder] = useCancelShiprocketOrderMutation();

  const [shipRocketPayload, setShipRocketPayload] = useState(null);
  const [shipRocketUpdatePayload, setShipRocketUpdatePayload] = useState(null);

  const [shipmentLength, setShipmentLength] = useState(0);
  const [shipmentBreadth, setShipmentBreadth] = useState(0);
  const [shipmentHeight, setShipmentHeight] = useState(0);
  const [shipmentWeight, setShipmentWeight] = useState(0);

  // const [shipmentUpdateLength, setShipmentUpdateLength] = useState(0);
  // const [shipmentUpdateBreadth, setShipmentUpdateBreadth] = useState(0);
  // const [shipmentUpdateHeight, setShipmentUpdateHeight] = useState(0);
  // const [shipmentUpdateWeight, setShipmentUpdateWeight] = useState(0);

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

  const handleCreateShiprocketOrder = async (e) => {
    e.preventDefault();

    if (
      !orderData ||
      !shipmentLength ||
      !shipmentBreadth ||
      !shipmentHeight ||
      !shipmentWeight
    ) {
      toast({
        title: "Invalid Data",
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await createShiprocketOrder(shipRocketPayload).unwrap();
      console.log(res);
      toast({
        title: "Shiprocket order created!",
        description: "Check your shiprocket account for details",
      });
      refetch();
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to create shiprocket order",
        description: error?.message || error?.data?.message,
        variant: "destructive",
      });
    }
  };

  const handleShiprocketOrderCancel = async (e) => {
    e.preventDefault();
    try {
      const res = await cancelShiprocketOrder({
        ids: orderData?.shiprocketDetails?.shiprocketOrderId,
      }).unwrap();
      toast({
        title: "Shiprocket Order cancelled!",
        description: res?.message || res?.data?.message,
      });
      refetch();
    } catch (error) {
      toast({
        title: "Failed to cancel shiprocket order",
        description: error?.message || error?.data?.message,
        variant: "destructive",
      });
    }
  };
  // const handleShiprocketOrderUpdate = async (e) => {};

  useEffect(() => {
    if (
      orderData &&
      shipmentLength &&
      shipmentBreadth &&
      shipmentHeight &&
      shipmentWeight
    ) {
      //   console.log(orderData?.user?.name);
      setShipRocketPayload({
        order_id: orderData?._id,
        order_date: formatDate(orderData?.createdAt),
        pickup_location: "Primary",
        channel_id: "",
        comment: "Sender: Rakesh Sahu",
        billing_customer_name: orderData?.user?.name,
        billing_last_name: "",
        billing_address: orderData?.shippingAddress?.address,
        billing_address_2: "",
        billing_city: orderData?.shippingAddress?.city,
        billing_pincode: orderData?.shippingAddress?.postalCode,
        billing_state: orderData?.shippingAddress?.state,
        billing_country: orderData?.shippingAddress?.country,
        billing_email: orderData?.user?.email,
        billing_phone: orderData?.shippingAddress?.phone,
        shipping_is_billing: true,
        order_items: orderData?.orderItems?.map((item) => ({
          name: item?.name,
          sku: item?.sku,
          units: item?.qty,
          selling_price: item?.price,
          discount: "",
          tax: "",
          hsn: "",
        })),
        payment_method: "Prepaid",
        shipping_charges: 0,
        giftwrap_charges: 0,
        transaction_charges: 0,
        total_discount: 0,
        sub_total: orderData?.totalPrice,
        length: shipmentLength,
        breadth: shipmentBreadth,
        height: shipmentHeight,
        weight: shipmentWeight,
      });
    }
  }, [
    orderData,
    shipmentLength,
    shipmentBreadth,
    shipmentHeight,
    shipmentWeight,
  ]);

  useEffect(() => {
    if (orderData) {
      console.log(orderData);
    }
  }, [orderData]);
  return (
    <div className="flex w-full flex-col gap-8 mt-4">
      <Container className="flex flex-col gap-4">
        <div className="flex flex-col">
          <div className={`section-heading flex justify-start pl-8`}>
            <h1 className={`text-l md:text-[28px] font-extrabold`}>
              Configure Shiprocket:
              <span className="ml-4">
                {orderData?._id?.length > 15
                  ? `${orderData?._id.substring(0, 10)}...`
                  : orderData?._id}
              </span>
            </h1>
          </div>
          <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-2">
              <Card
                x-chunk="dashboard-01-chunk-0"
                className="flex flex-col justify-between"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 bg-muted/50">
                  <CardTitle className="text-l font-bold ">
                    Shipping Details
                  </CardTitle>
                  <Truck className="h-6 w-6 text-muted-foreground" />
                </CardHeader>
                <CardContent className="text-left text-sm">
                  <ul className="grid gap-3 pt-6">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Customer Name
                      </span>
                      <span>{orderData?.user?.name}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Customer Email
                      </span>
                      <span>{orderData?.user?.email}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Address</span>
                      <span>{orderData?.shippingAddress?.address}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">City</span>
                      <span>{orderData?.shippingAddress?.city}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">State</span>
                      <span>{orderData?.shippingAddress?.state}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Postal Code</span>
                      <span>{orderData?.shippingAddress?.postalCode}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Contact</span>
                      <span>{orderData?.shippingAddress?.phone}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Sender</span>
                      <span>Sagar Computer World</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="flex w-full flex-row items-center border-t bg-muted/50 px-6 py-3 justify-between">
                  <div className="text-xs text-muted-foreground flex gap-8">
                    Created{" "}
                    <time dateTime="2023-11-23">
                      {orderData?.createdAt.substring(0, 10)}
                    </time>
                  </div>
                </CardFooter>
              </Card>
              <Card
                x-chunk="dashboard-01-chunk-1"
                className={`relative flex flex-col ${
                  userInfo?.isAdmin ? "justify-between" : "justify-between"
                }`}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 bg-muted/50">
                  <CardTitle className="text-l font-bold ">
                    Update Shiprocket Details
                  </CardTitle>
                  <List className="h-6 w-6 text-muted-foreground" />
                </CardHeader>
                <CardContent className="text-left text-sm">
                  {!orderData?.shiprocketDetails?.shiprocketOrderId ||
                  orderData?.shiprocketDetails?.shiprocketOrderId === "NA" ? (
                    <div className="flex flex-col gap-2 pt-6">
                      <form className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                          <Label
                            htmlFor="payment-method"
                            className="w-2/5 text-left"
                          >
                            Payment Method
                          </Label>
                          <Input defaultValue="Prepaid" readOnly />
                        </div>
                        <div className="flex items-center gap-3">
                          <Label htmlFor="length" className="w-2/5 text-left">
                            Length (in cms)
                          </Label>
                          <Input
                            id="length"
                            type="number"
                            value={shipmentLength}
                            onChange={(e) => setShipmentLength(e.target.value)}
                          />
                        </div>
                        <div className="flex items-center gap-3">
                          <Label htmlFor="breadth" className="w-2/5 text-left">
                            Breadth (in cms)
                          </Label>
                          <Input
                            id="breadth"
                            type="number"
                            value={shipmentBreadth}
                            onChange={(e) => setShipmentBreadth(e.target.value)}
                          />
                        </div>
                        <div className="flex items-center gap-3">
                          <Label htmlFor="height" className="w-2/5 text-left">
                            Height (in cms)
                          </Label>
                          <Input
                            id="height"
                            type="number"
                            value={shipmentHeight}
                            onChange={(e) => setShipmentHeight(e.target.value)}
                          />
                        </div>
                        <div className="flex items-center gap-3">
                          <Label htmlFor="weight" className="w-2/5 text-left">
                            Weight (in kgs)
                          </Label>
                          <Input
                            id="weight"
                            type="number"
                            value={shipmentWeight}
                            onChange={(e) => setShipmentWeight(e.target.value)}
                          />
                        </div>
                      </form>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2 pt-6">
                      <form className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                          <Label
                            htmlFor="payment-method"
                            className="w-2/5 text-left"
                          >
                            Shiprocket Order Id
                          </Label>
                          <p className="bg-muted w-3/4 p-2 border rounded text-left pl-6">
                            {orderData?.shiprocketDetails?.shiprocketOrderId}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Label
                            htmlFor="payment-method"
                            className="w-2/5 text-left"
                          >
                            Shiprocket Shipment Id
                          </Label>
                          <p className="bg-muted w-3/4 p-2 border rounded text-left pl-6">
                            {orderData?.shiprocketDetails?.shiprocketShipmentId}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Label
                            htmlFor="payment-method"
                            className="w-2/5 text-left"
                          >
                            Customer Order Status
                          </Label>
                          <p className="bg-muted w-3/4 p-2 border rounded text-left pl-6">
                            {
                              orderData?.shiprocketDetails
                                ?.shiprocketStatusForCustomer
                            }
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Label
                            htmlFor="payment-method"
                            className="w-2/5 text-left"
                          >
                            Shiprocket Order Status
                          </Label>
                          <p className="bg-muted w-3/4 p-2 border rounded text-left pl-6">
                            {orderData?.shiprocketDetails?.shiprocketStatus}
                          </p>
                        </div>
                      </form>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex w-full flex-row items-center border-t bg-muted/50 px-6 py-3">
                  <div className="text-xs text-muted-foreground flex gap-8">
                    {!orderData?.shiprocketDetails?.shiprocketOrderId ||
                    orderData?.shiprocketDetails?.shiprocketOrderId === "NA" ? (
                      <Button
                        size="sm"
                        onClick={(e) => handleCreateShiprocketOrder(e)}
                      >
                        Create Shiprocket Order
                      </Button>
                    ) : (
                      <div className="flex gap-3">
                        {/* <Dialog>
                          <DialogTrigger asChild>
                            <Button>Update Shiprocket Order</Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Edit Shiprocket Order</DialogTitle>
                              <DialogDescription>
                                Shiprocket Order No:{" "}
                                {
                                  orderData?.shiprocketDetails
                                    ?.shiprocketOrderId
                                }
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="flex items-center gap-3">
                                <Label
                                  htmlFor="length"
                                  className="w-2/5 text-left"
                                >
                                  Length (in cms)
                                </Label>
                                <Input
                                  id="length"
                                  type="number"
                                  value={shipmentUpdateLength}
                                  onChange={(e) =>
                                    setShipmentUpdateLength(e.target.value)
                                  }
                                />
                              </div>
                              <div className="flex items-center gap-3">
                                <Label
                                  htmlFor="breadth"
                                  className="w-2/5 text-left"
                                >
                                  Breadth (in cms)
                                </Label>
                                <Input
                                  id="breadth"
                                  type="number"
                                  value={shipmentUpdateBreadth}
                                  onChange={(e) =>
                                    setShipmentUpdateBreadth(e.target.value)
                                  }
                                />
                              </div>
                              <div className="flex items-center gap-3">
                                <Label
                                  htmlFor="height"
                                  className="w-2/5 text-left"
                                >
                                  Height (in cms)
                                </Label>
                                <Input
                                  id="height"
                                  type="number"
                                  value={shipmentUpdateHeight}
                                  onChange={(e) =>
                                    setShipmentUpdateHeight(e.target.value)
                                  }
                                />
                              </div>
                              <div className="flex items-center gap-3">
                                <Label
                                  htmlFor="weight"
                                  className="w-2/5 text-left"
                                >
                                  Weight (in kgs)
                                </Label>
                                <Input
                                  id="weight"
                                  type="number"
                                  value={shipmentUpdateWeight}
                                  onChange={(e) =>
                                    setShipmentUpdateWeight(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button
                                type="submit"
                                onClick={(e) => handleShiprocketOrderUpdate(e)}
                              >
                                Save changes
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog> */}
                        <Button onClick={(e) => handleShiprocketOrderCancel(e)}>
                          Cancel Shiprocket Order
                        </Button>
                        {/* <Button>Update Order Status</Button> */}
                      </div>
                    )}
                  </div>
                </CardFooter>
              </Card>
            </div>
            <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
              <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
                <CardHeader className="flex flex-row items-center">
                  <div className="flex flex-col items-start gap-2 ">
                    <CardTitle>Order Items</CardTitle>
                    <CardDescription>
                      Bill Details:{" "}
                      {orderData?.orderBill && orderData?.isPaid
                        ? `${orderData?.orderBill.substring(0, 25)}...`
                        : "Not Available"}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item Name</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orderData?.orderItems?.map((item) => (
                        <TableRow key={item._id}>
                          <TableCell className="text-left">
                            <div className="font-medium">{item.name}</div>
                          </TableCell>
                          <TableCell className="flex pl-4">
                            X {item?.qty}
                          </TableCell>

                          <TableCell className="text-right">
                            ₹{item?.price}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-01-chunk-5">
                <CardHeader className="bg-muted rounded-t-lg flex flex-row items-center gap-8">
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <ul className="grid gap-3 pt-4">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>
                        ₹{orderData?.itemsPrice - orderData?.taxPrice}{" "}
                      </span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>₹{orderData?.shippingPrice}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>₹{orderData?.taxPrice}</span>
                    </li>
                    <li className="flex items-center justify-between font-semibold">
                      <span className="text-muted-foreground">Total</span>
                      <span>₹{orderData?.totalPrice}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ShiprocketScreen;
