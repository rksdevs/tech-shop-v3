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
        <CarouselContent className="-ml-1 h-[43vh] md:h-[43vh] pt-5">
          {trimmedProductsByBrand?.map((product, index) => (
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
        <CarouselPrevious className="left-[-15px] top-[200px]" />
        <CarouselNext className="right-[-15px] top-[200px]" />
      </Carousel>
    </div>
  );
};

export default SameBrandProducts;
