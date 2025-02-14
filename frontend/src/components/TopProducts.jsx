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
import {
  useGetProductsByBrandQuery,
  useGetTopProductsQuery,
} from "../Features/productApiSlice";
import { useNavigate } from "react-router-dom";

const TopProducts = ({ brand }) => {
  const [trimmedTopProducts, setTrimmedTopProducts] = useState([]);
  const navigate = useNavigate();

  const {
    data: topProducts,
    isLoading: topProductsLoading,
    error: topProductsError,
  } = useGetTopProductsQuery();

  useEffect(() => {
    if (topProducts?.length) {
      setTrimmedTopProducts(topProducts?.slice(0, 10));
    }
  }, [topProducts]);
  return (
    <div className="related-products flex flex-col gap-8 mt-6">
      <div className="flex w-full justify-between items-center">
        <div>
          <h3 className="text-[18px] font-[700]">More Products From {brand}</h3>
        </div>
        <div>
          <Button onClick={() => navigate("/allproducts")}>View All</Button>
        </div>
      </div>
      <Carousel className="w-full">
        <CarouselContent className="-ml-1 h-[43vh] md:h-[43vh] pt-5">
          {trimmedTopProducts?.map((product, index) => (
            <CarouselItem key={index} className="pl-1 basis-1/2 md:basis-1/5">
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
        <CarouselPrevious className="left-[-15px]" />
        <CarouselNext className="right-[-15px]" />
      </Carousel>
    </div>
  );
};

export default TopProducts;
