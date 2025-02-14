import { Button } from "../components/ui/button";
import bannerOne from "../components/assets/images/banner-4.png";
import saleOne from "../components/assets/images/sale-3.jpg";
import saleTwo from "../components/assets/images/sale-1.jpg";
import saleThree from "../components/assets/images/sale-7.jpg";
import customPcImg from "../components/assets/images/pc-build-1.jpg";
import customPcImgTwo from "../components/assets/images/pc-build-9.jpg";
import appleLogo from "../components/assets/images/apple-logo.png";
import asusLogo from "../components/assets/images/Asus.png";
import AmdRyzenLogo from "../components/assets/images/Ryzen.png";
import NvidiaLogo from "../components/assets/images/Nvidia.png";
import IntelLogo from "../components/assets/images/intel.png";
import React, { useEffect, useState } from "react";
import { Input } from "../components/ui/input";
import { Headset, ShieldCheck, Truck, IndianRupee } from "lucide-react";
import {
  useGetLatestProductsQuery,
  useGetProductsOnDiscountQuery,
  useGetTopProductsQuery,
} from "../Features/productApiSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useSubscribeToNewsLetterMutation } from "../Features/newsLetterApiSlice";
import { useToast } from "../components/ui/use-toast";
import {
  clearAllCategoryFilters,
  setBrandFilter,
  setPrimaryCategoryFilter,
} from "../Features/filterSlice";
import { useGetAllOffersQuery } from "../Features/offersApiSlice";
import OfferComponent from "../components/OfferComponent";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";

const AllOfferScreen = () => {
  const { theme } = useSelector((state) => state.theme);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const [subscriber, setSubscriber] = useState("");
  const [themeBasedClass, setThemeBasedClass] = useState("");

  const {
    data: allOffers,
    isLoading: allOffersLoading,
    error: allOffersError,
  } = useGetAllOffersQuery();

  const {
    data: productsOnDiscount,
    isLoading: productsOnDiscountLoading,
    error: productsOnDiscountError,
  } = useGetProductsOnDiscountQuery();

  const {
    data: latestProducts,
    isLoading: latestProductsLoading,
    error: latestProductsError,
  } = useGetLatestProductsQuery();

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

  const handleBrandCta = (e) => {
    dispatch(clearAllCategoryFilters());
    dispatch(setBrandFilter(e));
    // dispatch(setPrimaryCategoryFilter(true));
    navigate("/allProducts");
  };

  useEffect(() => {
    if (theme === "dark" || theme === "system") {
      setThemeBasedClass("bg-muted-foreground rounded-md");
    } else {
      setThemeBasedClass("");
    }
  }, [theme]);

  return (
    <div className="flex w-full flex-col gap-6 overflow-hidden mt-4">
      <Helmet>
        <title>Offers</title>
        <meta
          name="description"
          content="Checkout all the offers and new products here"
        />
        <link rel="canonical" href="/allOffers" />
      </Helmet>
      <div className="relative flex flex-col lg:flex-row h-full w-full bg-muted rounded-md mb-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col gap-4 max-w-md text-left p-12 md:p-4">
            <h2 className="font-[700] text-[1.5rem] lg:text-[2.5rem] leading-[1.5rem] lg:leading-[2.5rem]">
              New Day, New Offer!
            </h2>
            <p className="font-medium text-muted-foreground">
              All jaw dropping offers just a click away! Explore all offers now.
            </p>
          </div>
        </div>
        <div className="hidden lg:flex flex-1">
          <img
            src={saleOne}
            alt="banner"
            height="80"
            width="80"
            className="w-full h-full object-cover rounded-r-md"
          />
        </div>
      </div>
      <div className="hidden about-service md:flex justify-between">
        <div className="flex items-start gap-4 text-left">
          <Headset className="hidden h-8 w-8 sm:flex" />
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">Reliable</p>
            <p className="text-sm text-muted-foreground">
              Reliable support on Hotline
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 text-left">
          <ShieldCheck className="hidden h-8 w-8 sm:flex" />
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">Secure</p>
            <p className="text-sm text-muted-foreground">
              Certified marketplace since 2007
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 text-left">
          <Truck className="hidden h-8 w-8 sm:flex" />
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">Shipping</p>
            <p className="text-sm text-muted-foreground">
              Shipping all over India
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 text-left">
          <IndianRupee className="hidden h-8 w-8 sm:flex" />
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">Payment</p>
            <p className="text-sm text-muted-foreground">
              Safe and secure payments
            </p>
          </div>
        </div>
      </div>
      {allOffers?.length &&
        allOffers
          ?.filter((offer) => offer.status !== "Inactive")
          ?.map((offer) => (
            <OfferComponent key={offer?._id} offer={offer?._id} />
          ))}
      <div className="latest flex flex-col gap-6">
        <div className="flex w-full justify-between items-center">
          <div>
            <h3 className="text-[24px] font-[700]">Products On Discounts</h3>
          </div>
          <Link to="/allproducts">
            <Button>View All</Button>
          </Link>
        </div>
        <Carousel className="w-full overflow-x-hidden">
          <CarouselContent className="-ml-1 pt-5 md:pt-0">
            {productsOnDiscountLoading
              ? Array.from({ length: 5 }, (_, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-1 basis-1/2 md:basis-1/5 lg:basis-1/5 p-1"
                  >
                    <div className="p-1">
                      <Card
                        className={`relative w-50 h-auto min-h-[270px] max-h-[calc(100vh-20px)] flex flex-col rounded-xl bg-card overflow-hidden border transition-transform transform hover:scale-105 hover:border-gray-300 p-2 pb-1 text-left relative group`}
                      >
                        <div className="flex justify-center items-center space-y-2 ">
                          <div>
                            <Skeleton className="h-[138px] w-[138px] rounded" />
                          </div>
                        </div>
                        <CardContent className="p-4 py-2 flex flex-col justify-between space-y-2">
                          <Skeleton className="h-4 w-[138px]" />
                          <Skeleton className="h-4 w-[138px]" />
                          <Skeleton className="h-3.5 w-[120px]" />
                          <Skeleton className="h-3 w-[110px]" />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))
              : productsOnDiscount?.map((product, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-1 basis-1/2 md:basis-1/5 lg:basis-1/5 p-1"
                  >
                    <div className="p-1">
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
                        productSlug={product?.slug}
                      />
                    </div>
                  </CarouselItem>
                ))}
          </CarouselContent>
          <CarouselPrevious className="flex left-0 top-[9.5rem]" />
          <CarouselNext className="flex right-0 top-[9.5rem]" />
        </Carousel>
      </div>
      <div className="latest flex flex-col gap-6">
        <div className="flex w-full justify-between items-center">
          <div>
            <h3 className="text-[24px] font-[700]">Latest Products</h3>
          </div>
        </div>
        <Carousel className="w-full">
          <CarouselContent className="-ml-1 pt-5 md:pt-0">
            {latestProducts?.map((product, index) => (
              <CarouselItem
                key={index}
                className="pl-1 basis-1/2 md:basis-1/5 lg:basis-1/5 p-1"
              >
                <div className="p-1">
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
                    productSlug={product?.slug}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-[-15px]" />
          <CarouselNext className="right-[-15px]" />
        </Carousel>
      </div>
      <div className="featured-brands flex flex-col gap-6">
        <div className="flex w-full justify-between items-center">
          <div>
            <h3 className="text-[24px] font-[700]">Featured Brands</h3>
          </div>
          <Link to="/allproducts">
            <Button>View All</Button>
          </Link>
        </div>
        <div
          className={`all-featured-brands flex justify-between items-center ${themeBasedClass}`}
        >
          <div
            className="brand flex justify-center items-center w-[18%] h-[20%] hover:cursor-pointer"
            onClick={() => handleBrandCta("Asus")}
          >
            <img
              src={asusLogo}
              alt="Asus"
              height="80"
              width="80"
              className="brand-img w-3/4 h-3/4"
            />
          </div>
          <div
            className="brand flex justify-center items-center w-[18%] h-[20%] hover:cursor-pointer"
            onClick={() => handleBrandCta("AMD")}
          >
            <img
              src={AmdRyzenLogo}
              alt="Ryzen"
              height="80"
              width="80"
              className="brand-img w-3/4 h-3/4"
            />
          </div>
          <div
            className="brand flex justify-center items-center w-[18%] h-[20%] hover:cursor-pointer"
            onClick={() => handleBrandCta("Intel")}
          >
            <img
              src={IntelLogo}
              alt="Intel"
              height="80"
              width="80"
              className="brand-img w-3/4 h-3/4"
            />
          </div>
          <div
            className="brand flex justify-center items-center w-[18%] h-[20%] hover:cursor-pointer"
            onClick={() => handleBrandCta("Nvidia")}
          >
            <img
              src={NvidiaLogo}
              alt="Nvidia"
              height="80"
              width="80"
              className="brand-img w-3/4 h-3/4"
            />
          </div>
        </div>
      </div>
      <div className="banner flex bg-muted max-w-full max-h-[30vh] lg:max-h-[inherit] rounded-md overflow-hidden">
        <div className="image hidden lg:flex flex-1 rounded-l-md">
          <img
            src={saleTwo}
            alt="banner"
            height="80"
            width="80"
            className="w-full h-full rounded-l-md"
          />
        </div>

        <div className="content flex flex-col gap-2 flex-1 p-4 lg:p-[3.5rem] items-start text-left overflow-hidden">
          <h2 className="tracking-[0.025rem] font-[700] text-[1.5rem] lg:text-[2.5rem] leading-[1.75rem] lg:leading-[2.5rem]">
            Newsletter
          </h2>
          <p className="font-light text-[10px] lg:text-[12px] text-muted-foreground">
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
    </div>
  );
};

export default AllOfferScreen;
