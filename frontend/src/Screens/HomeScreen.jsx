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

const HomeScreen = () => {
  const { theme } = useSelector((state) => state.theme);
  const { keyword, pageNumber } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const [subscriber, setSubscriber] = useState("");
  const [themeBasedClass, setThemeBasedClass] = useState("");

  const {
    data: topProducts,
    isLoading: topProductsLoading,
    error: topProductsError,
  } = useGetTopProductsQuery();

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
    <div className="flex w-full flex-col gap-8 overflow-hidden">
      <div className="banner relative flex flex-col lg:flex-row bg-muted max-w-full max-h-[40vh] mt-4 py-4 rounded-md overflow-hidden">
        <div className="relative content flex flex-col gap-4 flex-1 p-4 lg:px-[5vw] lg:py-[3vh] items-start text-left z-10 pt-10 md:pt-4 flex-shrink">
          <h2
            className={`tracking-[0.025rem] font-[700] text-[1.5rem] lg:text-[2vw] leading-[1.75rem] lg:leading-[2.5vw] text-[#ea580c] lg:text-black ${
              theme === "dark" ? "lg:text-white" : "lg:text-black"
            }`}
          >
            Your Favorite Computer Market
          </h2>
          <p
            className={`font-medium text-muted-foreground ${
              theme === "dark" ? "text-muted-foreground" : "text-muted"
            } md:text-muted-foreground lg:text-[1.2vw]`}
          >
            Now with the powers of AI{" "}
            <span className="italic font-bold tracking-[0.075rem] text-[3.5vw] lg:text-[1.3vw] text-primary">
              HALO
            </span>
          </p>
          <Link to="/allproducts">
            <Button className="lg:text-[1vw] lg:px-[2vw] lg:py-[1vh] flex-shrink">
              Shop Now
            </Button>
          </Link>
        </div>
        <div className="image lg:relative absolute inset-0 lg:inset-auto flex-1 lg:flex-none lg:w-[390px]">
          <div className="w-full h-full absolute inset-0 bg-black opacity-25 lg:opacity-0 block lg:hidden"></div>
          <img
            src={bannerOne}
            alt="banner"
            className="w-full h-full object-cover lg:object-contain relative lg:absolute left-[7em]"
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
      <div className="top-rated flex flex-col gap-4">
        <div className="flex w-full justify-between items-center">
          <div>
            <h3 className="text-[18px] font-[700]">Top Rated Products</h3>
          </div>
          <Link to="/allproducts">
            <Button>View All</Button>
          </Link>
        </div>
        <Carousel className="w-full overflow-x-hidden">
          <CarouselContent className="-ml-1 pt-5 md:pt-0">
            {topProducts?.map((product, index) => (
              <CarouselItem
                key={index}
                className="pl-1 basis-1/2 md:basis-1/5 lg:basis-1/5 p-1"
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
          <CarouselPrevious className="flex left-0 top-[9rem]" />
          <CarouselNext className="flex right-0 top-[9rem]" />
        </Carousel>
      </div>
      <div className="latest flex flex-col gap-6">
        <div className="flex w-full justify-between items-center">
          <div>
            <h3 className="text-[18px] font-[700]">Latest Products</h3>
          </div>
          <Link to="/allproducts">
            <Button>View All</Button>
          </Link>
        </div>
        <Carousel className="w-full overflow-x-hidden">
          <CarouselContent className="-ml-1 pt-5 md:pt-0">
            {latestProducts?.map((product, index) => (
              <CarouselItem
                key={index}
                className="pl-1 basis-1/2 md:basis-1/5 lg:basis-1/5 p-1"
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
          <CarouselPrevious className="flex left-0 top-[9rem]" />
          <CarouselNext className="flex right-0 top-[9rem]" />
        </Carousel>
      </div>
      <div className="banner flex flex-col max-w-full rounded-md gap-4">
        <div className="relative flex flex-col lg:flex-row h-full w-full bg-muted rounded-md overflow-hidden">
          <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col gap-2 lg:gap-4 max-w-md text-left p-4 lg:p-[3.5rem]">
              <h2 className="font-[700] text-[1.25rem] lg:text-[2.5rem] leading-[1.25rem] lg:leading-[2.5rem]">
                New Day, New Offer!
              </h2>
              <p className="font-medium text-[10px] lg:text-[14px] text-muted-foreground">
                All jaw dropping offers just a click away! Explore all offers
                now.
              </p>
              <Link to="/allOffers" className="max-w-[10rem]">
                <Button>Check Offers</Button>
              </Link>
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
        <div className="flex flex-col lg:flex-row gap-2 lg:max-h-[25vh]">
          <div className="custom-pc-one flex bg-muted rounded-md lg:w-1/2 max-h-[25vh]">
            <div className="content flex flex-col gap-4 w-1/2 p-[1rem] lg:p-[2vw] pt-[3vh] lg:pt-[3vh] items-start text-left flex-shrink">
              <h2 className="font-[600] text-[1rem] leading-[1rem] lg:tracking-[0.015rem] lg:font-[700] lg:text-[1.2vw] lg:leading-[1.2vw]">
                Pre-built Custom PCs
              </h2>
              <p className="font-medium text-[10px] lg:text-[14px] text-muted-foreground">
                Choose from wide ranges of pre-built PCs.
              </p>
              <Link
                to="/prebuilt-pc"
                className="min-w-[75px] flex-shrink lg:flex-shrink-0"
              >
                <Button className="text-[14px] px-[2em] lg:px-[1vw] py-[0.5vh] flex-shrink lg:flex-shrink-0">
                  Check Now
                </Button>
              </Link>
            </div>
            <div className="image w-1/2">
              <img
                src={customPcImgTwo}
                alt="banner"
                className="w-full h-full rounded-r-md object-cover"
              />
            </div>
          </div>
          <div className="custom-pc-two flex bg-muted rounded-md lg:w-1/2 max-h-[25vh]">
            <div className="content flex flex-col gap-4 w-1/2 p-[1rem] lg:p-[2vw] pt-[3vh] lg:pt-[3vh] items-start text-left flex-shrink">
              <h2 className="font-[600] text-[1rem] leading-[1rem] lg:tracking-[0.015rem] lg:font-[700] lg:text-[1.2vw] lg:leading-[1.2vw]">
                AI Powered PC Builder
              </h2>
              <p className="font-medium text-[10px] lg:text-[14px] text-muted-foreground">
                Build your PC, with the help of our AI!
              </p>
              <Link
                to="/buildcustompc"
                className="min-w-[7rem] flex-shrink lg:flex-shrink-0"
              >
                <Button className="text-[14px] px-[2em] lg:px-[1vw] py-[0.5vh] flex-shrink lg:flex-shrink-0">
                  Try Now
                </Button>
              </Link>
            </div>
            <div className="image w-1/2">
              <img
                src={customPcImg}
                alt="banner"
                className="w-full h-full rounded-r-md object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="featured-brands flex flex-col gap-6">
        <div className="flex w-full justify-between items-center">
          <div>
            <h3 className="text-[18px] font-[700]">Featured Brands</h3>
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
      <div className="banner flex bg-muted max-w-full max-h-[30vh] lg:max-h-[inherit] rounded-md overflow-hidden">
        <div className="image hidden lg:flex flex-1 rounded-l-md">
          <img
            src={saleTwo}
            alt="banner"
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

export default HomeScreen;
