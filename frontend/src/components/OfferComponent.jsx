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
            height="90"
            width="90"
            className="flex w-[90vw] max-h-[25vh] object-cover border rounded-md"
          />
        </div>
      </div>
      <Carousel className="w-full">
        <CarouselContent className="-ml-1 pt-5 md:pt-0">
          {products?.productData?.map((product, index) => (
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
      {/* <Carousel className="w-full overflow-x-hidden">
        <CarouselContent className="-ml-1 pt-5 md:pt-0">
          {products?.productData?.map((product, index) => (
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
        <CarouselPrevious className="flex left-0 top-[12rem]" />
        <CarouselNext className="flex right-0 top-[12rem]" />
      </Carousel> */}
    </div>
  );
};

export default OfferComponent;
