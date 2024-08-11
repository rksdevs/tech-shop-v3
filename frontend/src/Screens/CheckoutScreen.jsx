import Container from "../components/Container";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Truck } from "lucide-react";
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Label } from "../components/ui/label";
import { useNavigate } from "react-router-dom";
import { clearCart, saveShippingAddress } from "../Features/cartSlice";
import { Separator } from "../components/ui/separator";
import { useCreateOrderMutation } from "../Features/orderApiSlice";
import { useToast } from "../components/ui/use-toast";

const CheckoutScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { orderType } = useSelector((state) => state.orderType);
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, cartItems } = cart;
  const [today, setToday] = useState(new Date(Date.now()).toDateString());
  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [state, setState] = useState(shippingAddress?.state || "");
  const [phone, setPhone] = useState(shippingAddress?.phone || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress?.country || "");
  const [activeTab, setActiveTab] = useState("shipping");

  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createOrder, { isLoading: orderLoading, error: orderError }] =
    useCreateOrderMutation();

  const handleShippingAddress = (e) => {
    e.preventDefault();
    setActiveTab("placeOrder");
    dispatch(
      saveShippingAddress({ address, city, postalCode, country, phone, state })
    );
  };

  const changeTab = (tabname) => {
    setActiveTab(tabname);
  };

  const handleCreateOrder = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart?.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
        orderType,
      }).unwrap();
      dispatch(clearCart());
      navigate(`/order/${res?._id}`);
      toast({
        title: "Order Created!",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to create order!",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex w-full flex-col gap-8">
      <Container className="flex flex-col gap-4">
        <div className="bread-crumb mt-4">
          <Breadcrumbs />
        </div>
        <div className="flex flex-col gap-4">
          <div className="section-heading flex justify-center">
            <h1 className="text-l md:text-[28px] font-extrabold">Checkout</h1>
          </div>
          <div className="flex flex-col gap-2">
            <Tabs
              defaultValue="shipping"
              className="w-full"
              value={activeTab}
              onValueChange={changeTab}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="shipping">Shipping Details</TabsTrigger>
                <TabsTrigger value="placeOrder">Place Order</TabsTrigger>
              </TabsList>
              <TabsContent
                value="shipping"
                className="flex flex-col-reverse md:flex-row gap-6 md:gap-16"
              >
                <form
                  className="grid gap-4 w-full md:w-[60%] text-left"
                  onSubmit={(e) => handleShippingAddress(e)}
                >
                  <div className="grid gap-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      placeholder="Enter your address"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      placeholder="Enter your city"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      placeholder="Enter your State"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="postal">Postal Code</Label>
                    <Input
                      id="postal"
                      placeholder="Enter your pin code"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      placeholder="Phone Number"
                      type="number"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      placeholder="Enter your country"
                      required
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={
                      !address ||
                      !city ||
                      !postalCode ||
                      !country ||
                      !phone ||
                      !state ||
                      cartItems.length < 1
                    }
                  >
                    Proceed
                  </Button>
                </form>
                <Card className="overflow-hidden w-full md:w-1/3">
                  <CardHeader className="flex flex-row items-start bg-muted/50">
                    <div className="grid gap-0.5">
                      <CardTitle className="group flex items-center gap-2 text-lg">
                        Cart Summary
                      </CardTitle>
                      <CardDescription>Date: {today}</CardDescription>
                    </div>
                    <div className="hidden ml-auto flex items-center gap-1">
                      <Button size="sm" variant="outline" className="h-8 gap-1">
                        <Truck className="h-3.5 w-3.5" />
                        <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                          Track Order
                        </span>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 text-sm">
                    <div className="grid gap-3">
                      <div className="font-semibold">Order Details</div>
                      <ul className="grid gap-3">
                        {cartItems?.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-center justify-between"
                          >
                            <span className="text-muted-foreground">
                              {item?.name.split(" ").length > 4
                                ? item?.name.split(" ").slice(0, 4).join(" ")
                                : item?.name}{" "}
                              x <span>{item?.qty}</span>
                            </span>
                            <span>
                              ₹{Number(item?.currentPrice).toFixed(0)}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <Separator className="my-2" />
                      <ul className="grid gap-3">
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Subtotal
                          </span>
                          <span>
                            ₹
                            {Number(cart?.itemsPrice - cart?.taxPrice).toFixed(
                              0
                            )}
                          </span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Shipping
                          </span>
                          <span>₹{Number(cart?.shippingPrice).toFixed(0)}</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">Tax</span>
                          <span>₹{Number(cart?.taxPrice).toFixed(0)}</span>
                        </li>
                        <li className="flex items-center justify-between font-semibold">
                          <span className="text-muted-foreground">Total</span>
                          <span>₹{Number(cart?.totalPrice).toFixed(0)}</span>
                        </li>
                      </ul>
                    </div>
                    <Separator className="my-4" />
                    <div className="grid gap-3">
                      <div className="font-semibold">Customer Information</div>
                      <dl className="grid gap-3">
                        <div className="flex items-center justify-between">
                          <dt className="text-muted-foreground">Customer</dt>
                          <dd>{userInfo?.name}</dd>
                        </div>
                        <div className="flex items-center justify-between">
                          <dt className="text-muted-foreground">Email</dt>
                          <dd>
                            <a href="mailto:">{userInfo?.email}</a>
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                    <div className="text-xs text-muted-foreground">
                      Status: <time dateTime="2023-11-23">fresh order</time>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent
                value="placeOrder"
                className="flex flex-col md:flex-row gap-4"
              >
                <Card className="overflow-hidden w-full md:w-1/2 relative">
                  <CardHeader className="flex flex-row items-start bg-muted/50">
                    <div className="grid gap-0.5">
                      <CardTitle className="group flex items-center gap-2 text-lg">
                        Items Summary
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 text-sm">
                    <div className="grid gap-3">
                      <div className="font-semibold">Item Details</div>
                      <ul className="grid gap-3">
                        {cartItems?.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-center justify-between"
                          >
                            <span className="text-muted-foreground">
                              {item?.name.split(" ").length > 5
                                ? item?.name.split(" ").slice(0, 5).join(" ")
                                : item?.name}{" "}
                              x <span>{item?.qty}</span>
                            </span>
                            <span>
                              ₹{Number(item?.currentPrice).toFixed(0)}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <Separator className="my-2" />
                      <ul className="grid gap-3">
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Subtotal
                          </span>
                          <span>
                            ₹
                            {Number(cart?.itemsPrice - cart?.taxPrice).toFixed(
                              0
                            )}
                          </span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Shipping
                          </span>
                          <span>₹{Number(cart?.shippingPrice).toFixed(0)}</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">Tax</span>
                          <span>₹{Number(cart?.taxPrice).toFixed(0)}</span>
                        </li>
                        <li className="flex items-center justify-between font-semibold">
                          <span className="text-muted-foreground">Total</span>
                          <span>₹{Number(cart?.totalPrice).toFixed(0)}</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="flex absolute bottom-0 w-full flex-row items-center border-t bg-muted/50 px-6 py-3">
                    <div className="text-xs text-muted-foreground">
                      Created: <time dateTime="2023-11-23">{today}</time>
                    </div>
                  </CardFooter>
                </Card>
                <Card className="overflow-hidden w-full md:w-1/2">
                  <CardHeader className="flex flex-row items-start bg-muted/50">
                    <div className="grid gap-0.5">
                      <CardTitle className="group flex items-center gap-2 text-lg">
                        Shipping Details
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 text-sm">
                    <div className="grid gap-3">
                      <div className="font-semibold">Shipping Information</div>
                      <ul className="grid gap-3">
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">Address</span>
                          <span>{shippingAddress?.address}</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">City</span>
                          <span>{shippingAddress?.city}</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">State</span>
                          <span>{shippingAddress?.state}</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Postal Code
                          </span>
                          <span>{shippingAddress?.postalCode}</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">Contact</span>
                          <span>{shippingAddress?.phone}</span>
                        </li>
                      </ul>
                    </div>
                    <Separator className="my-4" />
                    <div className="grid gap-3">
                      <div className="font-semibold">Customer Information</div>
                      <dl className="grid gap-3">
                        <div className="flex items-center justify-between">
                          <dt className="text-muted-foreground">Customer</dt>
                          <dd>{userInfo?.name}</dd>
                        </div>
                        <div className="flex items-center justify-between">
                          <dt className="text-muted-foreground">Email</dt>
                          <dd>
                            <a href="mailto:">{userInfo?.email}</a>
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-row items-center justify-between gap-6 border-t bg-muted/50 px-6 py-3">
                    <Button
                      variant="outline"
                      onClick={() => setActiveTab("shipping")}
                    >
                      Edit Details
                    </Button>
                    <Button
                      onClick={handleCreateOrder}
                      disabled={
                        !address ||
                        !city ||
                        !postalCode ||
                        !country ||
                        !phone ||
                        !state ||
                        cartItems.length < 1
                      }
                    >
                      Confirm & Checkout
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CheckoutScreen;
