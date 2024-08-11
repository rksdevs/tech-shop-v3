import Container from "../components/Container";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Trash2, Share2, CopyIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import ProductImg from "../components/assets/images/Designer.png";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../components/ui/input";
import { addToCart, removeFromCart } from "../Features/cartSlice";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../components/ui/use-toast";
import TopProducts from "../components/TopProducts";
import { Separator } from "../components/ui/separator";

const CartScreen = () => {
  const { cartItems, totalPrice } = useSelector((state) => state.cart);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCopyLinkToClipboard = async (e, id) => {
    e.preventDefault();
    const baseUrl = window?.location?.href.split("/");
    baseUrl.pop();
    const text = `${baseUrl.join("/")}/product/${id}`;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast({
          title: "Link Copied!",
        });
      })
      .catch((err) => {
        toast({
          title: "Something went wrong!",
          variant: "destructive",
        });
      });
  };

  const handleAddToCart = (qty, item) => {
    dispatch(addToCart({ ...item, qty }));
  };

  return (
    <div className="flex w-full flex-col gap-8">
      <Container className="flex flex-col gap-4">
        <div className="bread-crumb mt-4">
          <Breadcrumbs />
        </div>
        <div className={`flex flex-col gap-4`}>
          <div className="section-heading flex">
            <h1 className="text-l md:text-[28px] font-extrabold">Your Cart</h1>
          </div>
          <div
            className={`${
              cartItems?.length ? "hidden" : ""
            } flex flex-col gap-8`}
          >
            <Card className="h-[20vh] flex flex-col gap-4 justify-center items-center">
              <CardTitle>No items in your cart!</CardTitle>
              <CardContent className="flex">
                <Button onClick={() => navigate("/allproducts")}>
                  Continue Shopping
                </Button>
              </CardContent>
            </Card>
            <TopProducts />
          </div>
          <div
            className={`hidden md:flex flex-col gap-2 min-h-[45vh] ${
              !cartItems?.length ? "hidden" : ""
            }`}
          >
            <div className="cart-heading hidden md:flex p-4 bg-muted rounded-lg gap-4 ">
              <div className="w-1/2 font-bold text-left">Product</div>
              <div className="flex flex-grow flex-1">
                <div className="w-full font-bold">Price</div>
                <div className="w-full font-bold">Quantity</div>
                <div className="w-full font-bold">Total</div>
                <div className="w-full font-bold">Actions</div>
              </div>
            </div>
            {cartItems?.map((item) => (
              <div className="cart-content" key={item?._id}>
                <Card className="flex">
                  <CardHeader className="flex w-1/2 flex-row text-left">
                    <div className="product-img">
                      <img
                        src={ProductImg}
                        alt="Product img"
                        className="w-[100px] h-[100px]"
                      />
                    </div>
                    <Link
                      className="product-name flex flex-col"
                      to={`/product/${item?._id}`}
                    >
                      <p className="px-8 font-bold text-muted-foreground">
                        {item?.category}
                      </p>
                      <h3 className="px-8 font-extrabold text-l">
                        {item?.name.split(" ").length > 10
                          ? `${item?.name.split(" ").slice(0, 10).join(" ")}...`
                          : item?.name}{" "}
                      </h3>
                    </Link>
                  </CardHeader>
                  <CardContent className="flex flex-grow flex-1 justify-center items-center">
                    <div className="product-price w-full font-bold">
                      ₹ {Number(item?.currentPrice).toFixed(0)}
                    </div>
                    <div className="product-qty w-full flex gap-2 justify-center items-center">
                      <Select onValueChange={(e) => handleAddToCart(e, item)}>
                        <SelectTrigger className="w-[75px]">
                          <SelectValue
                            defaultValue={item?.qty}
                            placeholder={item?.qty}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: item?.countInStock }).map(
                            (_, index) => (
                              <SelectItem
                                key={index}
                                value={index + 1}
                                className="w-[75px]"
                              >
                                {index + 1}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="product-total w-full font-bold">
                      ₹ {Number(item?.qty * item?.currentPrice).toFixed(0)}
                    </div>
                    <div className="product-actions w-full">
                      <div className="flex justify-center gap-4">
                        <Trash2
                          className="hover:cursor-pointer hover:text-primary"
                          onClick={() => dispatch(removeFromCart(item?._id))}
                        />
                        <Dialog>
                          <DialogTrigger asChild>
                            <Share2 className="hover:cursor-pointer hover:text-primary" />
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>Share link</DialogTitle>
                              <DialogDescription>
                                Anyone who has this link will be able to view
                                this.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="flex items-center space-x-2">
                              <div className="grid flex-1 gap-2">
                                <Label htmlFor="link" className="sr-only">
                                  Link
                                </Label>
                                <Input
                                  id="link"
                                  defaultValue={`http://${window.location?.host}/product/${item?._id}`}
                                  readOnly
                                />
                              </div>
                              <Button
                                type="submit"
                                size="sm"
                                className="px-3"
                                onClick={(e) =>
                                  handleCopyLinkToClipboard(e, item?._id)
                                }
                              >
                                <span className="sr-only">Copy</span>
                                <CopyIcon className="h-4 w-4" />
                              </Button>
                            </div>
                            <DialogFooter className="sm:justify-start">
                              <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                  Close
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
        <Card className="flex flex-col overflow-hidden w-full md:hidden relative">
          <CardHeader className="flex flex-row items-start bg-muted/50">
            <div className="grid gap-0.5">
              <CardTitle className="group flex items-center gap-2 text-lg">
                Cart Summary
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex-grow p-6 text-sm">
            <div className="grid gap-3">
              <div className="grid grid-cols-5 gap-3 justify-between place-items-baseline">
                <span className="col-span-2">Item Name</span>
                <span className="col-span-1">Quantity</span>
                <span className="col-span-1">Price Per Item</span>
                <span className="col-span-1">Delete</span>
              </div>
              <Separator className="my-2" />
              <ul className="grid gap-3">
                {cartItems?.map((item, index) => (
                  <li
                    key={index}
                    className="grid grid-cols-5 gap-3 items-center place-items-baseline"
                  >
                    <span className="text-muted-foreground col-span-2">
                      {item?.name.split(" ").length > 5
                        ? item?.name.split(" ").slice(0, 5).join(" ")
                        : item?.name}{" "}
                    </span>
                    <div className="col-span-1 product-qty w-full flex gap-2 justify-center items-center">
                      <Select onValueChange={(e) => handleAddToCart(e, item)}>
                        <SelectTrigger className="w-[75px]">
                          <SelectValue
                            defaultValue={item?.qty}
                            placeholder={item?.qty}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: item?.countInStock }).map(
                            (_, index) => (
                              <SelectItem
                                key={index}
                                value={index + 1}
                                className="w-[75px]"
                              >
                                {index + 1}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                    <span className="col-span-1">
                      ₹{Number(item?.currentPrice).toFixed(0)}
                    </span>
                    <div className="col-span-1 flex justify-center w-[50px]">
                      <Trash2
                        className="w-3 h-3"
                        onClick={() => dispatch(removeFromCart(item?._id))}
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <Separator className="my-2" />
              <ul className="grid gap-3">
                <li className="flex items-center justify-between font-semibold">
                  <span className="text-muted-foreground">Total</span>
                  <span>₹{Number(cart?.totalPrice).toFixed(0)}</span>
                </li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="mt-auto flex w-full flex-row justify-between items-center border-t bg-muted/50 px-6 py-3">
            <Button variant="outline" onClick={() => navigate("/allproducts")}>
              Continue Shopping
            </Button>
            <Button onClick={() => navigate("/checkout")}>
              Proceed to Buy
            </Button>
          </CardFooter>
        </Card>

        {cartItems.length ? (
          <div className="total-container hidden md:flex flex-col md:flex-row gap-4 items-center justify-between py-4 px-2 bg-muted rounded-lg">
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="email" placeholder="Enter coupon" />
              <Button type="submit">Apply Coupon</Button>
            </div>
            <div className="flex w-full gap-2 items-center">
              <Label className="text-l font-bold w-1/2">Total</Label>
              <Input
                className="text-l font-bold bg-primary  w-1/2"
                placeholder={`₹ ${Number(totalPrice).toFixed(0)}`}
                readOnly
              />
            </div>
            <div className="flex gap-1">
              <Button
                variant="outline"
                onClick={() => navigate("/allproducts")}
              >
                Continue Shopping
              </Button>
              <Button onClick={() => navigate("/checkout")}>
                Proceed to Buy
              </Button>
            </div>
          </div>
        ) : (
          ""
        )}
      </Container>
    </div>
  );
};

export default CartScreen;
