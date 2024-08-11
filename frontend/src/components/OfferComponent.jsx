import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import ProductCard from "./ProductCard";
import { useGetProductsByOffernameQuery } from "../Features/productApiSlice";

const OfferComponent = ({ offer }) => {
  const { data: products } = useGetProductsByOffernameQuery(offer);

  return (
    <div className="latest flex flex-col gap-2">
      <div className="relative flex w-full justify-between items-center md:min-h-[30vh]">
        <div className="z-10">
          <h3 className="pl-4 text-[24px] font-[700] text-white">
            {products?.offerName}
          </h3>
        </div>
        <div className="absolute hidden lg:flex flex-1">
          <img
            src={products?.offerImg}
            alt="banner"
            className="flex w-[90vw] max-h-[25vh] object-cover border rounded-md"
          />
        </div>
      </div>
      <Carousel className="w-full">
        <CarouselContent className="-ml-1 h-[38vh] md:h-[43vh] pt-5">
          {products?.productData?.map((product, index) => (
            <CarouselItem key={index} className="pl-1 basis-1/2 lg:basis-1/5">
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
  );
};

export default OfferComponent;
