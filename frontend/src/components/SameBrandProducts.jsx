import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import ProductCard from "./ProductCard";
import { useGetProductsByBrandQuery } from "../Features/productApiSlice";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

const SameBrandProducts = ({ brand }) => {
  const [trimmedProductsByBrand, setTrimmedProductsByBrand] = useState([]);
  const navigate = useNavigate();
  const {
    data: productsByBrand,
    isLoading: productsByBrandLoading,
    error: productsByBrandError,
  } = useGetProductsByBrandQuery(brand);

  useEffect(() => {
    if (productsByBrand?.products?.length) {
      setTrimmedProductsByBrand(productsByBrand?.products?.slice(0, 15));
    }
  }, [productsByBrand]);
  return (
    <div className="related-products flex flex-col gap-8">
      <div className="flex w-full justify-between items-center">
        <div>
          <h3 className="text-[18px] font-[700]">More Products From {brand}</h3>
        </div>
        <Link to="/allproducts">
          <Button>View All</Button>
        </Link>
      </div>
      <Carousel className="w-full">
        <CarouselContent className="-ml-1 pt-5 md:pt-0">
          {productsByBrandLoading
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
            : trimmedProductsByBrand?.map((product, index) => (
                <CarouselItem
                  key={index}
                  className="pl-1 basis-1/2 lg:basis-1/5 p-1"
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
                      productSlug={product?.slug}
                    />
                  </div>
                </CarouselItem>
              ))}
        </CarouselContent>
        <CarouselPrevious className="left-[-15px] top-[150px]" />
        <CarouselNext className="right-[-15px] top-[150px]" />
      </Carousel>
    </div>
  );
};

export default SameBrandProducts;
