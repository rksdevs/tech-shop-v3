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
import { useNavigate, useParams } from "react-router-dom";
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

const AllOfferScreen = () => {
  const { theme } = useSelector((state) => state.theme);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const [subscriber, setSubscriber] = useState("");

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

  return (
    <div className="flex w-full flex-col gap-6 overflow-hidden mt-4">
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
              Certified marketplace since 2010
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
      <div className="top-rated flex flex-col gap-4">
        <div className="flex w-full justify-between items-center">
          <div>
            <h3 className="text-[24px] font-[700]">Products On Discounts</h3>
          </div>
        </div>
        <Carousel className="w-full">
          <CarouselContent className="-ml-1 h-[38vh] md:h-[43vh] pt-5">
            {productsOnDiscount?.map((product, index) => (
              <CarouselItem
                key={index}
                className="pl-1 basis-1/2 md:basis-1/5 lg:basis-1/5"
              >
                <div className="p-1">
                  <ProductCard
                    category={product?.category}
                    countInStock={product?.countInStock}
                    name={product?.name}
                    rating={product?.rating}
                    ratingCount={product?.numReviews}
                    price={product?.price}
                    productId={product?._id}
                    productDiscount={product?.productDiscount}
                    isOnOffer={product?.isOnOffer}
                    currentPrice={product?.currentPrice}
                    image={product?.image}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-[-15px]" />
          <CarouselNext className="right-[-15px]" />
        </Carousel>
      </div>
      {allOffers?.length &&
        allOffers?.map((offer) => (
          <OfferComponent key={offer?._id} offer={offer?._id} />
        ))}
      <div className="latest flex flex-col gap-6">
        <div className="flex w-full justify-between items-center">
          <div>
            <h3 className="text-[24px] font-[700]">Latest Products</h3>
          </div>
        </div>
        <Carousel className="w-full">
          <CarouselContent className="-ml-1 h-[38vh] md:h-[38vh] pt-5">
            {latestProducts?.map((product, index) => (
              <CarouselItem
                key={index}
                className="pl-1 basis-1/2 md:basis-1/5 lg:basis-1/5"
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
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-[-15px]" />
          <CarouselNext className="right-[-15px]" />
        </Carousel>
      </div>
      <div className="featured-brands flex flex-col gap-6 mb-6">
        <div className="flex w-full justify-between items-center">
          <div>
            <h3 className="text-[24px] font-[700]">Featured Brands</h3>
          </div>
          <div>
            <Button onClick={() => navigate("/allproducts")}>View All</Button>
          </div>
        </div>
        <div
          className={`all-featured-brands flex justify-between items-center ${
            theme === "dark" && "bg-muted-foreground rounded-md"
          }`}
        >
          <div
            className="brand flex justify-center items-center w-[18%] h-[20%] hover:cursor-pointer"
            onClick={() => handleBrandCta("Asus")}
          >
            <img src={asusLogo} alt="Asus" className="brand-img w-1/2 h-1/2" />
          </div>
          <div
            className="brand flex justify-center items-center w-[18%] h-[20%] hover:cursor-pointer"
            onClick={() => handleBrandCta("AMD")}
          >
            <img src={AmdRyzenLogo} alt="Ryzen" className="brand-img" />
          </div>
          <div
            className="brand flex justify-center items-center w-[18%] h-[20%] hover:cursor-pointer"
            onClick={() => handleBrandCta("Intel")}
          >
            <img src={IntelLogo} alt="Intel" className="brand-img" />
          </div>
          <div
            className="brand flex justify-center items-center w-[18%] h-[20%] hover:cursor-pointer"
            onClick={() => handleBrandCta("Nvidia")}
          >
            <img src={NvidiaLogo} alt="Nvidia" className="brand-img" />
          </div>
        </div>
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
    </div>
  );
};

export default AllOfferScreen;
