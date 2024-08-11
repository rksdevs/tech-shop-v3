import Container from "../components/Container";
import { Breadcrumbs } from "../components/Breadcrumbs";
import saleTwo from "../components/assets/images/sale-1.jpg";
import saleThree from "../components/assets/images/sale-7.jpg";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../components/ui/drawer";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Settings, ListFilter, Filter } from "lucide-react";
import { useParams } from "react-router-dom";
import {
  useFilteredProductListMutation,
  useGetAllBrandsQuery,
  useGetAllCategoriesQuery,
  useGetProductsQuery,
} from "../Features/productApiSlice";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
// import PaginationComponent from "../components/PaginationComponent";
import { BrandsComponent } from "../components/BrandsComponent";
import { CategoriesComponent } from "../components/CategoriesComponent";
import PriceSlider from "../components/PriceSlider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "../components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { setPrimaryCategoryFilter } from "../Features/filterSlice";
import { useSubscribeToNewsLetterMutation } from "../Features/newsLetterApiSlice";
import { useToast } from "../components/ui/use-toast";
import PaginationComponentTest from "../components/PaginationComponentAllProducts";
import EmptyProducts from "../components/EmptyProducts";
import { Checkbox } from "../components/ui/checkbox";

const AllProducts = () => {
  const { keyword, pageNumber } = useParams();
  const {
    brandFilter,
    categoryFilter,
    priceFilter,
    primaryCategoryFilter,
    includeOutOfStock,
  } = useSelector((state) => state.filter);
  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
  } = useGetProductsQuery({
    keyword,
    pageNumber,
  });
  const { toast } = useToast();
  const [filteredProductsData, setFilteredProductsData] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  //client side pagination attempts
  const [productsToDisplay, setProductsToDisplay] = useState([]);
  const [clientSideNoOfPages, setClientSideNoOfPages] = useState(0);
  const [clientSideCurrentPage, setClientSideCurrentPage] = useState(1);
  const [emptyResults, setEmptyResults] = useState(false);
  // const [includeOutOfStock, setIncludeOutOfStock] = useState(true);

  const [subscriber, setSubscriber] = useState("");
  const {
    data: allCategories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useGetAllCategoriesQuery();

  const {
    data: allBrands,
    isLoading: brandsLoading,
    error: brandsError,
  } = useGetAllBrandsQuery();

  const [
    getFilteredProducts,
    { isLoading: filterLoading, error: filterError },
  ] = useFilteredProductListMutation();

  const [subscribeToNewsLetter] = useSubscribeToNewsLetterMutation();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      const res = await subscribeToNewsLetter({ email: subscriber }).unwrap();
      toast({
        title: res?.data?.message || res?.message,
      });
      setSubscriber("");
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to subscribe!",
        description: error?.message || error?.data?.message,
        variant: "destructive",
      });
    }
  };

  const handleDrawerClose = (e) => {
    e.preventDefault();
    setMobileDrawerOpen(false);
  };

  useEffect(() => {
    if (sortBy === "priceHL") {
      const sortedProducts = [...filteredProductsData]?.sort(
        (a, b) => b.price - a.price
      );
      setProductsToDisplay(
        sortedProducts?.slice(
          (clientSideCurrentPage - 1) * 16,
          (clientSideCurrentPage - 1) * 16 + 16
        )
      );
      setClientSideNoOfPages(Math.ceil(sortedProducts?.length / 16));
      // setClientSideCurrentPage(1);
    } else if (sortBy === "rating") {
      const sortedProducts = [...filteredProductsData]?.sort(
        (a, b) => b.rating - a.rating
      );
      setProductsToDisplay(
        sortedProducts?.slice(
          (clientSideCurrentPage - 1) * 16,
          (clientSideCurrentPage - 1) * 16 + 16
        )
      );
      setClientSideNoOfPages(Math.ceil(sortedProducts?.length / 16));
      // setClientSideCurrentPage(1);
    } else if (sortBy === "latest") {
      const sortedProducts = [...filteredProductsData]?.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setProductsToDisplay(
        sortedProducts?.slice(
          (clientSideCurrentPage - 1) * 16,
          (clientSideCurrentPage - 1) * 16 + 16
        )
      );
      setClientSideNoOfPages(Math.ceil(sortedProducts?.length / 16));
      // setClientSideCurrentPage(1);
    } else if (sortBy === "priceLH") {
      const sortedProducts = [...filteredProductsData]?.sort(
        (a, b) => a.price - b.price
      );
      setProductsToDisplay(
        sortedProducts?.slice(
          (clientSideCurrentPage - 1) * 16,
          (clientSideCurrentPage - 1) * 16 + 16
        )
      );
      setClientSideNoOfPages(Math.ceil(sortedProducts?.length / 16));
      // setClientSideCurrentPage(1);
    }
    // if (sortBy === "priceHL") {
    //   const sortedProducts = includeOutOfStock
    //     ? [...filteredProductsData]?.sort((a, b) => b.price - a.price)
    //     : [...filteredProductsData]
    //         .filter((prod) => prod?.countInStock > 0)
    //         ?.sort((a, b) => b.price - a.price);
    //   setProductsToDisplay(
    //     sortedProducts?.slice(
    //       (clientSideCurrentPage - 1) * 16,
    //       (clientSideCurrentPage - 1) * 16 + 16
    //     )
    //   );
    //   setClientSideNoOfPages(Math.ceil(sortedProducts?.length / 16));
    //   // setClientSideCurrentPage(1);
    // } else if (sortBy === "rating") {
    //   const sortedProducts = includeOutOfStock
    //     ? [...filteredProductsData]?.sort((a, b) => b.rating - a.rating)
    //     : [...filteredProductsData]
    //         .filter((prod) => prod?.countInStock > 0)
    //         ?.sort((a, b) => b.rating - a.rating);
    //   setProductsToDisplay(
    //     sortedProducts?.slice(
    //       (clientSideCurrentPage - 1) * 16,
    //       (clientSideCurrentPage - 1) * 16 + 16
    //     )
    //   );
    //   setClientSideNoOfPages(Math.ceil(sortedProducts?.length / 16));
    //   // setClientSideCurrentPage(1);
    // } else if (sortBy === "latest") {
    //   const sortedProducts = includeOutOfStock
    //     ? [...filteredProductsData]?.sort(
    //         (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    //       )
    //     : [...filteredProductsData]
    //         .filter((prod) => prod?.countInStock > 0)
    //         ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    //   setProductsToDisplay(
    //     sortedProducts?.slice(
    //       (clientSideCurrentPage - 1) * 16,
    //       (clientSideCurrentPage - 1) * 16 + 16
    //     )
    //   );
    //   setClientSideNoOfPages(Math.ceil(sortedProducts?.length / 16));
    //   // setClientSideCurrentPage(1);
    // } else if (sortBy === "priceLH") {
    //   const sortedProducts = includeOutOfStock
    //     ? [...filteredProductsData]?.sort((a, b) => a.price - b.price)
    //     : [...filteredProductsData]
    //         .filter((prod) => prod?.countInStock)
    //         ?.sort((a, b) => a.price - b.price);
    //   setProductsToDisplay(
    //     sortedProducts?.slice(
    //       (clientSideCurrentPage - 1) * 16,
    //       (clientSideCurrentPage - 1) * 16 + 16
    //     )
    //   );
    //   setClientSideNoOfPages(Math.ceil(sortedProducts?.length / 16));
    //   // setClientSideCurrentPage(1);
    // }
  }, [
    sortBy,
    filteredProductsData,
    setProductsToDisplay,
    clientSideCurrentPage,
  ]);

  // useEffect(() => {
  //   if (includeOutOfStock) {
  //     const productsToShow = filteredProductsData;

  //     setProductsToDisplay(
  //       productsToShow?.slice(
  //         (clientSideCurrentPage - 1) * 16,
  //         (clientSideCurrentPage - 1) * 16 + 16
  //       )
  //     );
  //     setClientSideNoOfPages(Math.ceil(productsToShow?.length / 16));
  //   } else {
  //     const productsToShow = filteredProductsData.filter(
  //       (prod) => prod?.countInStock > 0
  //     );

  //     setProductsToDisplay(
  //       productsToShow?.slice(
  //         (clientSideCurrentPage - 1) * 16,
  //         (clientSideCurrentPage - 1) * 16 + 16
  //       )
  //     );
  //     setClientSideNoOfPages(Math.ceil(productsToShow?.length / 16));
  //   }
  // }, [
  //   includeOutOfStock,
  //   clientSideCurrentPage,
  //   filteredProductsData,
  //   setProductsToDisplay,
  // ]);

  useEffect(() => {
    if (products?.products?.length) {
      setFilteredProductsData(products?.products);
    }
  }, [products]);

  useEffect(() => {
    const fetchCategoryWiseProducts = async () => {
      const res = await getFilteredProducts({
        brandFilter,
        categoryFilter,
        priceFilter: priceFilter?.[0],
        includeOutOfStock,
      }).unwrap();
      setFilteredProductsData(res?.products);
      setProductsToDisplay(
        res?.products?.slice(
          (clientSideCurrentPage - 1) * 16,
          (clientSideCurrentPage - 1) * 16 + 16
        )
      );
      setClientSideNoOfPages(Math.ceil(res?.products?.length / 16));
    };
    if (
      products ||
      brandFilter ||
      categoryFilter ||
      priceFilter ||
      !includeOutOfStock ||
      includeOutOfStock
    ) {
      fetchCategoryWiseProducts();
    }
    // if (brandFilter?.length || categoryFilter?.length || priceFilter?.length) {
    //   setClientSideCurrentPage(1);
    // }
  }, [
    brandFilter,
    getFilteredProducts,
    clientSideCurrentPage,
    categoryFilter,
    priceFilter,
    products,
    includeOutOfStock,
  ]);

  useEffect(() => {
    if (clientSideCurrentPage > clientSideNoOfPages) {
      setClientSideCurrentPage(1);
    }
  }, [clientSideNoOfPages, clientSideCurrentPage]);

  useEffect(() => {
    if (brandFilter.length || categoryFilter.length || priceFilter.length) {
      if (!productsToDisplay.length) {
        setEmptyResults(true);
      }
    }
    if (productsToDisplay.length) {
      setEmptyResults(false);
    }
  }, [productsToDisplay, categoryFilter, brandFilter, priceFilter]);

  return (
    <div className="flex w-full flex-col gap-8">
      <Container className="flex flex-col gap-8">
        <div className="bread-crumb mt-4">
          <Breadcrumbs />
        </div>
        <div className="flex flex-col">
          <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background md:justify-between lg:justify-between">
            <h1 className="text-xl font-semibold">Products</h1>
            <div className="hidden md:flex flex-row gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 gap-1 text-sm"
                  >
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">Sort</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-45">
                  <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={sortBy}
                    onValueChange={setSortBy}
                  >
                    <DropdownMenuRadioItem value="priceHL">
                      Price High to Low
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="priceLH">
                      Price Low to High
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="rating">
                      Ratings
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="latest">
                      Newest
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <Drawer
                open={mobileDrawerOpen}
                onOpenChange={setMobileDrawerOpen}
              >
                <DrawerTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    onClick={() => setMobileDrawerOpen(true)}
                  >
                    <Filter className="size-4" />
                    <span className="sr-only">Categories</span>
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="max-h-[80vh]">
                  <DrawerHeader>
                    <DrawerTitle>Filters</DrawerTitle>
                    <DrawerDescription>
                      Filter the products based on categories and brands
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
                    <form className="grid w-full items-start gap-6">
                      <fieldset className="grid gap-6 rounded-lg border p-4">
                        <legend className="-ml-1 px-1 text-sm font-medium">
                          Categories
                        </legend>
                        <Button
                          size="sm"
                          variant={`${!categoryFilter.length ? "outline" : ""}`}
                          className="flex justify-evenly"
                          onClick={(e) => handleDrawerClose(e)}
                        >
                          <span className="text-sm">
                            {!categoryFilter.length
                              ? "Filters"
                              : "Apply Filters"}
                          </span>{" "}
                        </Button>
                        {allCategories?.length && (
                          <CategoriesComponent allCategories={allCategories} />
                        )}
                      </fieldset>
                      <fieldset className="grid gap-6 rounded-lg border p-4">
                        <legend className="-ml-1 px-1 text-sm font-medium">
                          Brands
                        </legend>
                        <Button
                          variant={`${!brandFilter.length ? "outline" : ""}`}
                          size="sm"
                          className="flex justify-evenly"
                          onClick={(e) => handleDrawerClose(e)}
                        >
                          <span className="text-sm">
                            {!brandFilter.length ? "Filters" : "Apply Filters"}
                          </span>{" "}
                        </Button>
                        {allBrands?.length && (
                          <BrandsComponent allBrands={allBrands} />
                        )}
                      </fieldset>
                      <fieldset className="grid gap-6 rounded-lg border p-4">
                        <legend className="-ml-1 px-1 text-sm font-medium">
                          Price
                        </legend>
                        <Button
                          variant={`${
                            !priceFilter.length || priceFilter[0] === 0
                              ? "outline"
                              : ""
                          }`}
                          size="sm"
                          className="flex justify-evenly"
                          onClick={(e) => handleDrawerClose(e)}
                        >
                          <span className="text-sm">
                            {!priceFilter.length || priceFilter[0] === 0
                              ? "Filters"
                              : "Apply Filters"}
                          </span>{" "}
                        </Button>
                        <PriceSlider />
                      </fieldset>
                    </form>
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
          </header>
          <main className="grid flex-1 gap-4 overflow-auto py-4 md:grid-cols-5 lg:grid-cols-5">
            <div
              className="relative hidden flex-col items-start gap-8 md:flex md:col-span-1"
              x-chunk="dashboard-03-chunk-0"
            >
              <form className="grid w-full items-start gap-6">
                <fieldset className="grid gap-6 rounded-lg border p-4">
                  <legend className="-ml-1 px-1 text-sm font-medium">
                    Categories
                  </legend>
                  {/* <Button
                    size="sm"
                    variant={`${!categoryFilter.length ? "outline" : ""}`}
                    className="flex justify-evenly"
                    onClick={(e) => handleFilter(e)}
                  >
                    <span className="text-sm">
                      {!categoryFilter.length ? "Filters" : "Click To Apply"}
                    </span>{" "}
                  </Button> */}
                  {allCategories?.length && (
                    <CategoriesComponent allCategories={allCategories} />
                  )}
                </fieldset>
                <fieldset className="grid gap-6 rounded-lg border p-4">
                  <legend className="-ml-1 px-1 text-sm font-medium">
                    Brands
                  </legend>
                  {/* <Button
                    variant={`${!brandFilter.length ? "outline" : ""}`}
                    size="sm"
                    className="flex justify-evenly"
                    onClick={(e) => handleFilter(e)}
                  >
                    <span className="text-sm">
                      {!brandFilter.length ? "Filters" : "Click To Apply"}
                    </span>{" "}
                  </Button> */}
                  {allBrands?.length && (
                    <BrandsComponent allBrands={allBrands} />
                  )}
                </fieldset>
                <fieldset className="grid gap-6 rounded-lg border p-4">
                  <legend className="-ml-1 px-1 text-sm font-medium">
                    Price
                  </legend>
                  {/* <Button
                    variant={`${
                      !priceFilter.length || priceFilter[0] === 0
                        ? "outline"
                        : ""
                    }`}
                    size="sm"
                    className="flex justify-evenly"
                    onClick={(e) => handleFilter(e)}
                  >
                    <span className="text-sm">
                      {!priceFilter.length || priceFilter[0] === 0
                        ? "Filters"
                        : "Click To Apply"}
                    </span>{" "}
                  </Button> */}
                  <PriceSlider />
                </fieldset>
              </form>
            </div>
            <div
              className={`relative grid grid-cols-2 grid-rows-2 md:grid-cols-4 md:grid-rows-4 gap-2 md:gap-4 rounded-xl bg-muted/50 p-1 md:p-4 md:col-span-4 min-h-fit pb-[60px] md:pb-[60px]`}
            >
              {productsToDisplay?.map((product, index) => (
                <div className="p-1" key={index}>
                  <ProductCard
                    category={product?.category}
                    name={product?.name}
                    rating={product?.rating}
                    ratingCount={product?.numReviews}
                    price={product?.price}
                    productId={product?._id}
                    productDiscount={product?.productDiscount}
                    isOnOffer={product?.isOnOffer}
                    currentPrice={product?.currentPrice}
                    image={product?.image}
                    countInStock={product?.countInStock}
                    className="w-[42vw] md:w-[175px]"
                    nameClass="text-[12px] md:text-[14px]"
                    ratingClass="h-2 w-2 md:h-3 md:w-3"
                  />
                </div>
              ))}
              {emptyResults && <EmptyProducts />}
              <div className="col-span-2 md:col-span-4 mt-4 flex justify-center pagination absolute bottom-2 left-12 md:left-0 w-[70%] md:w-full">
                {/* <PaginationComponent
                  currentPage={currentPage}
                  totalPages={totalPages}
                /> */}
                {/* <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    {Array.from({ length: clientSideNoOfPages }, (_, index) => (
                      <PaginationItem key={index}>
                        <Button
                          onClick={() => setClientSideCurrentPage(index + 1)}
                        >
                          {index + 1}
                        </Button>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination> */}
                <PaginationComponentTest
                  currentPage={clientSideCurrentPage}
                  totalPages={clientSideNoOfPages}
                  setCurrentPage={setClientSideCurrentPage}
                />
              </div>
            </div>
          </main>
        </div>
        <div className="banner flex bg-muted max-w-full max-h-[30vh] rounded-md">
          <div className="image hidden lg:flex flex-1 rounded-l-md">
            <img
              src={saleTwo}
              alt="banner"
              className="w-full h-full rounded-l-md"
            />
          </div>
          <div className="content flex flex-col gap-4 flex-1 p-[3.5rem] items-start text-left">
            <h2 className="tracking-[0.025rem] font-[700] text-[2.5rem] leading-[2.5rem]">
              Newsletter
            </h2>
            <p className="font-light text-[12px] text-muted-foreground">
              Subscribe to our letter, get notified about latest offers!
            </p>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                type="email"
                placeholder="Email"
                value={subscriber}
                onChange={(e) => setSubscriber(e.target.value)}
                className="border border-muted-foreground"
              />
              <Button onClick={(e) => handleSubscribe(e)}>Subscribe</Button>
            </div>
          </div>
          <div className="image hidden lg:flex flex-1 rounded-r-md">
            <img
              src={saleThree}
              alt="banner"
              className="w-full h-full rounded-r-md"
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AllProducts;
