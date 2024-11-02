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
import { useGetProductsByCategoryQuery } from "../Features/productApiSlice";
import { Link, useNavigate } from "react-router-dom";

const SameCategoryProducts = ({ category }) => {
  const [trimmedProductsByCategory, setTrimmedProductsByCategory] = useState(
    []
  );
  const navigate = useNavigate();

  const {
    data: productsByCategory,
    isLoading: productsByCategoryLoading,
    error: productsByCategoryError,
  } = useGetProductsByCategoryQuery(category);

  useEffect(() => {
    if (productsByCategory?.products?.length) {
      setTrimmedProductsByCategory(productsByCategory?.products?.slice(0, 15));
    }
  }, [productsByCategory]);
  return (
    <div className="related-products flex flex-col gap-8">
      <div className="flex w-full justify-between items-center">
        <div>
          <h3 className="text-[18px] font-[700]">Related Products</h3>
        </div>
        <Link to="/allproducts">
          <Button>View All</Button>
        </Link>
      </div>
      <Carousel className="w-full">
        <CarouselContent className="-ml-1 pt-5 md:pt-0">
          {trimmedProductsByCategory?.map((product, index) => (
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

export default SameCategoryProducts;
