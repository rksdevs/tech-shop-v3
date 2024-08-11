import Container from "../components/Container";
import { Link, useLocation, useParams } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Truck, Clock, Upload, Download, Mail } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../components/ui/card";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  useCancelOrderByUserMutation,
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useInitiateRazorpayPaymentMutation,
  usePayOrderMutation,
  useShipOrderMutation,
  useUpdateOrderWithBillMutation,
  useUploadBillMutation,
} from "../Features/orderApiSlice";
import { useToast } from "../components/ui/use-toast";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";

const PlaceOrderScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { id: orderId } = useParams();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [courierService, setCourierService] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [orderInfo, setOrderInfo] = useState("");
  const [open, setOpen] = useState(false);

  const {
    data: orderData,
    isLoading,
    error,
    refetch,
  } = useGetOrderDetailsQuery(orderId);

  const [orderBill, setOrderBill] = useState("");
  const [updateOrderBtn, setUpdateOrderBtn] = useState(false);
  const [selectedBillFile, setSelectedBillFile] = useState(null);

  const [uploadBillFunc, { isLoading: uploadLoading, error: uploadError }] =
    useUploadBillMutation();

  const [
    updateOrderWithBill,
    { isLoading: updateLoading, error: updateError },
  ] = useUpdateOrderWithBillMutation();

  const handleFileChange = (event) => {
    setSelectedBillFile(event.target.files[0]);
  };

  const handleBillUpload = async (e) => {
    e.preventDefault();
    if (!selectedBillFile) return;

    const formData = new FormData();
    formData.append("bill", selectedBillFile);

    try {
      const res = await uploadBillFunc(formData).unwrap();
      setOrderBill(res.data);
      // console.log(res.data);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateOrderWithBill = async (e) => {
    e.preventDefault();
    if (!orderBill) {
      return;
    }

    try {
      await updateOrderWithBill({
        orderId,
        orderBill,
      }).unwrap();
      toast({
        title: "Uploaded bill to the order!",
      });
      refetch();
    } catch (error) {
      toast({
        title: "Failed to mark as delivered",
        description: error?.data?.message || error?.message,
        variant: "destructive",
      });
    }
  };

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const [shipOrder, { isLoading: loadingShipping }] = useShipOrderMutation();
  const [cancelOrder] = useCancelOrderByUserMutation();

  const handleOrderDeliver = async (e) => {
    e.preventDefault();
    try {
      await deliverOrder(orderId);
      refetch();
      toast({
        title: "Marked order as Delivered",
      });
    } catch (error) {
      toast({
        title: "Failed to mark as delivered",
        description: error?.data?.message || error?.message,
        variant: "destructive",
      });
    }
  };

  const handleOrderCancellation = async (e) => {
    e.preventDefault();
    try {
      const res = await cancelOrder({ orderId }).unwrap();
      toast({
        title: "Cancelled Order Succefully",
        description: res?.message,
      });
      refetch();
    } catch (error) {
      toast({
        title: "Failed to cancel order",
        description: error?.data?.message || error?.message,
        variant: "destructive",
      });
    }
  };

  const handleOrderShipped = async (e) => {
    e.preventDefault();
    try {
      await shipOrder({ orderId, courierService, trackingNumber });
      refetch();
      toast({
        title: "Marked order as Shipped",
      });
    } catch (error) {
      toast({
        title: "Failed to mark as shipped",
        description: error?.data?.message || error?.message,
        variant: "destructive",
      });
    }
  };

  const [
    initiatePayment,
    { isLoading: rzpPaymentLoading, error: rzpPaymentInitiateError },
  ] = useInitiateRazorpayPaymentMutation();

  const [confirmPayment] = usePayOrderMutation();

  //rzp script for instance window
  const loadScript = async (url) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = url;
      script.async = true;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const handleRzpPayment = async () => {
    try {
      if (process.env.REACT_APP_RAZORPAY_TEST_KEY) {
        const paymentData = await initiatePayment({
          amount: parseFloat(orderData.totalPrice).toFixed(2),
          currency: "INR",
          receipt: "test-receipt",
          notes: {
            user: userInfo.name,
            email: userInfo.email,
          },
        }).unwrap();
        console.log("payment data", paymentData);
        // After receiving payment data from the server, proceed with Razorpay payment initialization
        const res = await loadScript(
          "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
          toast.error(
            "Razorpay SDK failed to load, please check your connection."
          );
          return;
        }
        const options = {
          key: process.env.REACT_APP_RAZORPAY_TEST_KEY,
          amount: paymentData.amount, // Amount in paise (100 paise = 1 INR)
          currency: paymentData.currency,
          name: "Computer Makers",
          description: "Test Payment", // URL of your logo
          order_id: paymentData.orderId, // Razorpay order ID
          handler: async (response) => {
            try {
              const paymentConfirmation = await confirmPayment({
                orderId,
                details: {
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpayOrderId: response.razorpay_order_id,
                  razorpaySignature: response.razorpay_signature,
                },
              });
              toast({
                title: "Payment Confirmed",
              });
              refetch();
              console.log("Payment confirmation:", paymentConfirmation.data);
              // Handle payment confirmation success
            } catch (error) {
              console.error("Error confirming payment:", error);
              toast({
                title: "Error Confirming payment",
                description: error?.message || error?.data?.message,
                variant: "destructive",
              });
            }
          },
          prefill: {
            name: "John Doe",
            email: "john.doe@example.com",
            contact: "+919876543210",
          },
          notes: {
            // Additional notes, if any
          },
          theme: {
            color: "#3399cc", // Theme color
          },
        };

        // Initialize Razorpay payment
        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (error) {
      toast.error("An error occurred while confirming your payment: ", error);
    }
  };

  const handleDownloadBill = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (orderData?._id) {
      // console.log(orderData);
      setOrderInfo(orderData?._id);
    }
    if (orderData?.orderBill) {
      setOrderBill(orderData?.orderBill);
    }
  }, [orderData, userInfo]);
  return (
    <div className="flex w-full flex-col gap-8">
      <Container className="flex flex-col gap-4 px-0">
        <div
          className={`bread-crumb mt-4 ${
            location?.pathname?.includes("viewOrder") ||
            location?.pathname?.includes("editOrder")
              ? "hidden"
              : ""
          }`}
        >
          <Breadcrumbs />
        </div>
        <div className="flex flex-col">
          <div
            className={`section-heading flex flex-col items-start ${
              location?.pathname?.includes("editOrder") ||
              location?.pathname?.includes("viewOrder")
                ? "justify-start pl-8 mt-4"
                : "justify-center"
            }`}
          >
            <h1 className={`text-l md:text-[28px] font-extrabold`}>
              {location?.pathname?.includes("editOrder")
                ? `Edit Order: ${
                    orderData?._id?.length > 15
                      ? `${orderData?._id.substring(0, 10)}...`
                      : orderData?._id
                  }`
                : location?.pathname?.includes("viewOrder")
                ? `View Order: ${
                    orderData?._id?.length > 15
                      ? `${orderData?._id.substring(0, 10)}...`
                      : orderData?._id
                  }`
                : "Place Order"}
            </h1>
            {userInfo?.isAdmin && orderData?.orderType && (
              <h2 className="text-sm font-medium text-muted-foreground">
                Order Type: {orderData?.orderType}
              </h2>
            )}
          </div>
          <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 md:gap-8 lg:grid-cols-2">
              <Card
                x-chunk="dashboard-01-chunk-0"
                className="flex flex-col justify-between"
              >
                <CardHeader className="flex rounded-t-lg flex-row items-center justify-between space-y-0 pb-4 bg-muted/50">
                  <CardTitle className="text-l font-bold ">
                    Shipping Details
                  </CardTitle>
                  <Truck className="h-6 w-6 text-muted-foreground" />
                </CardHeader>
                <CardContent className="text-left text-sm">
                  <ul className="grid gap-3 pt-6">
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
                  </ul>
                </CardContent>
                <CardFooter className="flex rounded-b-lg w-full flex-row items-center border-t bg-muted/50 px-6 py-3 justify-between">
                  <div className="text-xs text-muted-foreground flex gap-2 md:gap-8">
                    Created:{" "}
                    <time dateTime="2023-11-23">
                      {orderData?.createdAt.substring(0, 10)}
                    </time>
                  </div>
                  {userInfo.isAdmin && (
                    <Button
                      size="sm"
                      onClick={() =>
                        navigate(`/admin/orderUpdate/shiprocket/${orderId}`)
                      }
                      disabled={orderData?.isCancelled}
                    >
                      Configure Shiprocket
                    </Button>
                  )}
                </CardFooter>
              </Card>
              <Card
                x-chunk="dashboard-01-chunk-1"
                className={`relative flex flex-col ${
                  userInfo?.isAdmin ? "justify-between" : "justify-between"
                }`}
              >
                <CardHeader className="flex rounded-t-lg flex-row items-center justify-between space-y-0 pb-4 bg-muted/50">
                  <CardTitle className="text-l font-bold ">
                    Order Status
                  </CardTitle>
                  <Clock className="h-6 w-6 text-muted-foreground" />
                </CardHeader>
                <CardContent className="text-left text-sm">
                  <div className="flex flex-col gap-2 pt-6">
                    <div className="rounded-md border px-4 py-1 font-mono text-sm bg-muted shadow-sm flex gap-4">
                      <span className="font-bold text-muted-foreground">
                        Payment:
                      </span>{" "}
                      <span className="pl-2">
                        {orderData?.isPaid ? "Paid" : "Pending"}
                        {userInfo?.isAdmin && orderData?.isPaid && (
                          <span className="ml-4 font-semibold text-primary">
                            Rzp: {orderData?.paymentDetails.paymentId}
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="rounded-md bg-muted border px-4 py-1 font-mono text-sm shadow-sm flex gap-4">
                      <span className="font-bold text-muted-foreground">
                        Shipping:
                      </span>{" "}
                      <span>
                        {orderData?.isShipped
                          ? `${orderData?.trackingDetails?.courierService} : ${orderData?.trackingDetails?.trackingNumber} `
                          : "Pending"}
                      </span>
                    </div>
                    <div className="rounded-md bg-muted border px-4 py-1 font-mono text-sm shadow-sm flex gap-4">
                      <span className="font-bold text-muted-foreground">
                        Delivery:
                      </span>{" "}
                      <span>
                        {orderData?.isDelivered
                          ? `Delivered on: ${orderData.deliveredAt.substring(
                              0,
                              10
                            )}`
                          : "Pending"}
                      </span>
                    </div>
                    <div
                      className={`rounded-md border px-4 py-1 font-mono text-sm shadow-sm flex gap-4 items-center ${
                        orderData?.isCancelled ? "bg-primary" : "bg-muted"
                      }`}
                    >
                      <span className={`font-bold text-muted-foreground`}>
                        Cancel Status:
                      </span>{" "}
                      <span>
                        {orderData?.isCancelled
                          ? `Order Cancelled`
                          : orderData?.isPaid
                          ? "Can not cancel order, call us for for support"
                          : "Cancellable"}
                      </span>
                    </div>
                  </div>
                </CardContent>
                {userInfo && userInfo?.isAdmin ? (
                  <CardFooter className="flex rounded-b-lg w-full flex-row justify-center items-center border-t bg-muted/50 px-6 py-3">
                    <div className="text-xs text-muted-foreground w-full flex flex-col md:flex-row gap-2 md:gap-8 justify-center md:justify-between">
                      {!orderData?.isShipped && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              disabled={orderData?.isCancelled}
                            >
                              Mark as Shipped
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="w-[380px] sm:max-w-[400px]">
                            <DialogHeader>
                              <DialogTitle>Shipping Details</DialogTitle>
                              <DialogDescription>
                                Update shipping details below
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="courierService"
                                  className="text-right"
                                >
                                  Courier
                                </Label>
                                <Input
                                  id="courierService"
                                  value={courierService}
                                  className="col-span-3"
                                  onChange={(e) =>
                                    setCourierService(e.target.value)
                                  }
                                  placeholder="Enter courier name"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="trackingNumber"
                                  className="text-right"
                                >
                                  Tracking No
                                </Label>
                                <Input
                                  id="trackingNumber"
                                  value={trackingNumber}
                                  className="col-span-3"
                                  onChange={(e) =>
                                    setTrackingNumber(e.target.value)
                                  }
                                  placeholder="Enter tracking no"
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button
                                type="submit"
                                onClick={(e) => handleOrderShipped(e)}
                              >
                                Shipped
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}
                      {!orderData?.isDelivered && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              disabled={orderData?.isCancelled}
                            >
                              Mark as Delivered
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="w-[380px] sm:max-w-[400px]">
                            <DialogHeader>
                              <DialogTitle>Delivery</DialogTitle>
                              <DialogDescription>
                                Update order to delivered
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <p>Mark as delivered below</p>
                            </div>
                            <DialogFooter>
                              <Button
                                type="submit"
                                onClick={(e) => handleOrderDeliver(e)}
                              >
                                Delivered
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}
                      {orderData?.isDelivered && orderData?.isShipped && (
                        <p>Shipment Status</p>
                      )}
                    </div>
                  </CardFooter>
                ) : (
                  <CardFooter className="flex rounded-b-lg w-full flex-row items-center border-t bg-muted/50 px-6 py-3">
                    <div className="text-xs text-muted-foreground flex gap-8">
                      <p>
                        Shipment Status:{" "}
                        {orderData?.shiprocketDetails
                          ?.shiprocketStatusForCustomer
                          ? orderData?.shiprocketDetails
                              ?.shiprocketStatusForCustomer
                          : "NA"}{" "}
                      </p>
                    </div>
                  </CardFooter>
                )}
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
                  {!orderData?.isPaid && (
                    <Button
                      onClick={handleRzpPayment}
                      disabled={!orderInfo || orderData?.isCancelled}
                    >
                      Pay Now
                    </Button>
                  )}
                  {orderData?.orderBill && orderData?.isPaid ? (
                    <Link
                      to={orderBill}
                      download={`Bill-order-no-${orderData?._id}`}
                    >
                      <Button
                        // onClick={(e) => handleDownloadBill(e)}
                        disabled={!orderInfo}
                        className="w-full"
                      >
                        Download Bill <Download className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  ) : (
                    <Button disabled variant="outline">
                      Bill Not Available
                    </Button>
                  )}
                  {userInfo?.isAdmin && (
                    <>
                      <div className="flex gap-2">
                        <Input
                          type="file"
                          onChange={handleFileChange}
                          className="hover:cursor-pointer"
                        />
                        <Button
                          onClick={(e) => handleBillUpload(e)}
                          disabled={!orderData?.isPaid}
                        >
                          <Upload className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        onClick={(e) => handleUpdateOrderWithBill(e)}
                        disabled={!orderBill && !orderData?.isPaid}
                      >
                        Update Order
                      </Button>
                    </>
                  )}
                  {!orderData?.isPaid && (
                    <Button
                      onClick={(e) => handleOrderCancellation(e)}
                      disabled={orderData?.isPaid || orderData?.isCancelled}
                    >
                      Cancel Order
                    </Button>
                  )}
                  {userInfo?.isAdmin && (
                    <Button
                      onClick={(e) => handleOrderCancellation(e)}
                      disabled={orderData?.isCancelled}
                    >
                      Cancel Order By Admin
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PlaceOrderScreen;
