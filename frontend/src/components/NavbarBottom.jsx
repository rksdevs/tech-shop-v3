import { Link, useNavigate } from "react-router-dom";
import { CircleUser, Menu, Package2, Search } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Container from "./Container";
import { useGetAllCategoriesQuery } from "../Features/productApiSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAllCategoryFilters,
  removeCategoryFilter,
  setCategoryFilter,
  setPrimaryCategoryFilter,
} from "../Features/filterSlice";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

export function NavbarBottom() {
  const { categoryFilter } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data: allCategories,
    isLoading: categoryLoading,
    error: categoryError,
  } = useGetAllCategoriesQuery();
  const [categoryToFilter, setCategoryToFilter] = useState("");

  const handleCategorySelect = (e) => {
    dispatch(clearAllCategoryFilters());
    dispatch(setCategoryFilter(e));
    // dispatch(setPrimaryCategoryFilter(true));
    navigate("/allProducts");
  };

  return (
    <div className="flex w-full flex-col">
      <header className="sticky justify-center top-0 flex h-12 items-center bg-primary border-b px-4 md:px-6">
        <Container className="flex w-full items-center justify-between mx-0 px-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <div className="flex gap-2">
                  <Menu className="h-5 w-5 " />
                  <span className="sr-only">Toggle categories</span>
                  <span>All Categories</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <ScrollArea className="h-[35vh] md:h-[40vh] w-40 ">
                <div className="p-2">
                  {allCategories?.map((category, index) => (
                    <div key={index}>
                      <DropdownMenuItem
                        value={category}
                        onClick={() => handleCategorySelect(category)}
                        className="hover:cursor-pointer"
                      >
                        {category}
                      </DropdownMenuItem>
                      <Separator className="my-1" />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </DropdownMenuContent>
          </DropdownMenu>

          <nav className="flex-1 hidden md:flex justify-center gap-5 lg:gap-6  font-medium">
            <Link
              to="/allproducts"
              className="text-background transition-colors hover:text-foreground text-sm"
            >
              All Products
            </Link>
            <Link
              to="/allOffers"
              className="text-background transition-colors hover:text-foreground text-sm"
            >
              Offers Section
            </Link>
            <Link
              to="/prebuilt-pc"
              className="text-background transition-colors hover:text-foreground text-sm"
            >
              Pre-built PC
            </Link>
            <Link
              to="/buildcustompc"
              className="relative text-background transition-colors hover:text-foreground text-sm"
            >
              AI Powered Custom PC
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4 md:gap-2 lg:gap-4">
            <Link
              to="/aboutus"
              className="text-background transition-colors hover:text-foreground text-sm"
            >
              About Us
            </Link>
            <Link
              to="/contactus"
              className="text-background transition-colors hover:text-foreground text-sm"
            >
              Contact Us
            </Link>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden bg-primary"
              >
                <Menu className="h-5 w-5 text-white" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Pages</SheetTitle>
                <SheetDescription>Explore other pages</SheetDescription>
              </SheetHeader>
              <nav className="grid gap-6 text-sm font-medium justify-center pt-6 pr-10">
                <SheetTrigger asChild>
                  <Link
                    to="/allproducts"
                    className="flex items-center gap-2 text-sm font-semibold"
                  >
                    All Products
                  </Link>
                </SheetTrigger>
                <SheetTrigger asChild>
                  <Link
                    to="/allOffers"
                    className="flex items-center gap-2 text-sm font-semibold"
                  >
                    Offers Section
                  </Link>
                </SheetTrigger>
                <SheetTrigger asChild>
                  <Link
                    to="/prebuilt-pc"
                    className="flex items-center gap-2 text-sm font-semibold"
                  >
                    Prebuilt PCs
                  </Link>
                </SheetTrigger>
                <SheetTrigger asChild>
                  <Link
                    to="/buildcustompc"
                    className="flex items-center gap-2 text-sm font-semibold"
                  >
                    AI Powered Custom PCs
                  </Link>
                </SheetTrigger>
                <SheetTrigger asChild>
                  <Link
                    to="/aboutus"
                    className="flex items-center gap-2 text-sm font-semibold"
                  >
                    About Us
                  </Link>
                </SheetTrigger>
                <SheetTrigger asChild>
                  <Link
                    to="/contactus"
                    className="flex items-center gap-2 text-sm font-semibold"
                  >
                    Contact Us
                  </Link>
                </SheetTrigger>
              </nav>
            </SheetContent>
          </Sheet>
        </Container>
      </header>
    </div>
  );
}
