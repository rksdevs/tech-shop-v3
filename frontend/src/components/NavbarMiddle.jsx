import { CircleUser, Search, ShoppingCart, Menu } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import Container from "./Container";
import { Badge } from "./ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLogoutMutation } from "../Features/usersApiSlice";
import { logout } from "../Features/authSlice";
import { useSearchProductsMutation } from "../Features/productApiSlice";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useToast } from "./ui/use-toast";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { setOrderType } from "../Features/orderTypeSlice";

export function NavbarMiddle() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const [keyword, setKeyword] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [logoutApiCall] = useLogoutMutation();
  const [searchProducts, { isLoading: searchLoading, error: searchError }] =
    useSearchProductsMutation();

  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      setOpen(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await searchProducts({ q: keyword }).unwrap();
      setSearchResults(res);
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong!",
        description: error?.message || error?.data?.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (cartItems.length === 0) {
      dispatch(setOrderType("Regular"));
    }
  }, [cartItems, dispatch]);

  useEffect(() => {
    if (keyword === "" || !keyword) {
      setSearchResults([]);
    }
  }, [keyword]);

  return (
    <div className="flex w-full flex-col">
      <header className="sticky top-0 flex h-14 items-center justify-center gap-4 bg-background lg:px-4 md:px-6 sm:px-0">
        <Container className="flex items-center mx-0 px-0">
          <div className="flex w-full items-center flex-row">
            <Link to="/">
              <h2 className="text-[20px] md:text-[24px] font-semibold flex flex-row items-center">
                Tech-Shop
                <div className="text-primary text-[48px] mt-[5px] flex h-[50px] items-end">
                  .
                </div>
              </h2>
            </Link>
          </div>
          <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4 justify-end">
            <form className="hidden md:flex ml-auto flex-1 gap-1">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="sm:w-[300px] md:w-[200px] "
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>
              <Button onClick={(e) => handleSearch(e)}>
                <Search className="h-4 w-4" />
              </Button>
              {searchResults?.length ? (
                <div className="grid gap-3">
                  <Select
                    value={selectedProduct}
                    onValueChange={(e) => navigate(`product/${e}`)}
                  >
                    <SelectTrigger id="brand" aria-label="Select product">
                      <SelectValue placeholder="select product" />
                    </SelectTrigger>
                    <SelectContent>
                      {searchResults?.map((product) => (
                        <SelectItem
                          key={product?._id}
                          value={product?._id}
                          onClick={() => navigate(`product/${product?._id}`)}
                        >
                          {product?.name.length > 15
                            ? `${product?.name
                                .split(" ")
                                .slice(0, 5)
                                .join(" ")}...`
                            : product?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                ""
              )}
            </form>
            {userInfo && userInfo.isAdmin && (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    asChild
                    className="hidden overflow-hidden md:flex"
                  >
                    <Button>
                      <div className="flex gap-2">
                        <Menu className="h-5 w-5 " />
                        <span className="sr-only">Toggle admin</span>
                        <span>Admin Pages</span>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => navigate("/admin/all-products")}
                    >
                      Products
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => navigate("/admin/all-orders")}
                    >
                      Orders
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => navigate("/admin/all-offers")}
                    >
                      Offers
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => navigate("/admin/all-users")}
                    >
                      Users
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => navigate("/admin/edit-admin-details")}
                    >
                      Edit Admin Details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => navigate("/admin/configurePrebuiltPc")}
                    >
                      Configure Prebuilt PCs
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="shrink-0 md:hidden"
                    >
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle>Admin Pages</SheetTitle>
                      <SheetDescription>Explore admin pages</SheetDescription>
                    </SheetHeader>
                    <nav className="grid gap-6 text-sm font-medium justify-center pt-6 pr-10">
                      <DialogTitle aria-describedby={undefined}>
                        <SheetTrigger asChild>
                          <Link
                            to="/admin/all-products"
                            className="flex items-center gap-2 text-sm font-semibold"
                          >
                            <span className="text-md">All Products</span>
                          </Link>
                        </SheetTrigger>
                        <DialogHeader className="hidden">
                          <DialogDescription>
                            Link to all products page
                          </DialogDescription>
                        </DialogHeader>
                      </DialogTitle>
                      <DialogTitle aria-describedby={undefined}>
                        <SheetTrigger asChild>
                          <Link
                            to="/admin/all-orders"
                            className="flex items-center gap-2 text-sm font-semibold"
                          >
                            <span className="text-md">All Orders</span>
                          </Link>
                        </SheetTrigger>
                      </DialogTitle>
                      <DialogTitle aria-describedby={undefined}>
                        <SheetTrigger asChild>
                          <Link
                            to="/admin/all-offers"
                            className="flex items-center gap-2 text-sm font-semibold"
                          >
                            <span className="text-md">Offers</span>
                          </Link>
                        </SheetTrigger>
                      </DialogTitle>
                      <DialogTitle aria-describedby={undefined}>
                        <SheetTrigger asChild>
                          <Link
                            to="/admin/all-users"
                            className="flex items-center gap-2 text-sm font-semibold"
                          >
                            <span className="text-md">All Users</span>
                          </Link>
                        </SheetTrigger>
                      </DialogTitle>
                      <DialogTitle aria-describedby={undefined}>
                        <SheetTrigger asChild>
                          <Link
                            to="/admin/edit-admin-details"
                            className="flex items-center gap-2 text-sm font-semibold"
                          >
                            <span className="text-md">Edit Admin Details</span>
                          </Link>
                        </SheetTrigger>
                      </DialogTitle>
                      <DialogTitle aria-describedby={undefined}>
                        <SheetTrigger asChild>
                          <Link
                            to="/admin/configurePrebuiltPc"
                            className="flex items-center gap-2 text-sm font-semibold"
                          >
                            <span className="text-md">
                              Configure Prebuilt PCs
                            </span>
                          </Link>
                        </SheetTrigger>
                      </DialogTitle>
                    </nav>
                  </SheetContent>
                </Sheet>
              </>
            )}
            <div
              className="flex items-center gap-4 hover:cursor-pointer"
              onClick={() => navigate("/cart")}
            >
              <ShoppingCart className="hidden md:flex h-[28px] w-[28px]" />
              <div className="flex flex-col">
                <span>Cart</span>
                {cartItems?.length > 0 ? (
                  <Badge className="h-[12px]">
                    {cartItems.reduce((sum, item) => sum + item.qty, 0)}
                  </Badge>
                ) : (
                  <Badge className="h-[12px]">0</Badge>
                )}
              </div>
            </div>
            {userInfo ? (
              <div>
                <DropdownMenu
                  open={open}
                  onOpenChange={setOpen}
                  className="relative"
                >
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="overflow-hidden rounded-full relative"
                      onClick={() => setOpen(!open)}
                    >
                      <CircleUser className="h-5 w-5" />
                      <span className="sr-only">Toggle user menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link to="/myaccount" onClick={() => setOpen(false)}>
                        Account
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={(e) => logoutHandler(e)}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Button>
                <Link to="/login">Login</Link>
              </Button>
            )}
          </div>
        </Container>
      </header>
    </div>
  );
}
