import React from "react";
import { Card, CardContent } from "./ui/card";
import imageToAdd from "./assets/images/Sample-PNG-Image.png";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";
import { current } from "@reduxjs/toolkit";

const ProductCard = ({
  image,
  category,
  name,
  rating,
  ratingCount,
  price,
  productId,
  className = "",
  imgClass = "",
  cardContentClass = "",
  categoryClass = "",
  nameClass = "",
  sectionClass = "",
  ratingClass = "",
  numReviewsClass = "",
  priceClass = "",
  productDiscount,
  currentPrice,
  isOnOffer,
  countInStock,
}) => {
  return (
    <Link to={`/product/${productId}`}>
      <Card
        // className={`relative w-50 h-70 min-h-[310px] max-h-[280px] md:min-h-[310px] md:max-h-[310px] flex flex-col rounded-xl bg-card overflow-hidden border transition-transform transform hover:scale-105 hover:border-gray-300 hover:shadow-lg p-2 text-left relative group ${className}`}
        className={`relative w-50 h-auto min-h-[270px] max-h-[calc(100vh-20px)] flex flex-col rounded-xl bg-card overflow-hidden border transition-transform transform hover:scale-105 hover:border-gray-300 p-2 pb-1 text-left relative group ${className}`}
      >
        {isOnOffer && <Badge className="absolute right-3">Offer</Badge>}
        <div className="flex justify-center items-center">
          <img
            src={
              image === "/images/sample.jpg" ||
              image ===
                "https://computer-makers-products-cpu.s3.ap-south-1.amazonaws.com/woocommerce-placeholder-700x700.png"
                ? imageToAdd
                : image
            }
            alt="product"
            className={`h-[138px] object-cover ${imgClass}`}
          />
        </div>
        <Badge
          className={`${
            countInStock === 0 ? "absolute top-2 left-2" : "hidden"
          }`}
        >
          {countInStock === 0 ? "Out of Stock" : ""}
        </Badge>
        <Badge
          className={`${
            isOnOffer && countInStock > 0 ? "absolute top-2 left-2" : "hidden"
          }`}
        >
          {isOnOffer && countInStock > 0 ? "Offer" : ""}
        </Badge>
        <Badge
          className={`${
            !isOnOffer && productDiscount > 0 && countInStock > 0
              ? "absolute top-2 left-2"
              : "hidden"
          }`}
        >
          {!isOnOffer && productDiscount > 0 && countInStock > 0
            ? `${productDiscount.toFixed(0)}% Off`
            : ""}
        </Badge>
        <CardContent
          className={`p-4 py-2 flex flex-col justify-between ${cardContentClass}`}
        >
          <div className="">
            <div>
              <div
                className={`text-xs font-semibold text-gray-500 ${categoryClass}`}
              >
                {category}
              </div>
              <h2
                className={`text-[12px] font-bold transition-colors group-hover:text-primary group-hover:underline ${nameClass}`}
              >
                {name?.length > 17 ? `${name?.substring(0, 17)}...` : name}
              </h2>
            </div>
            <div className={`flex items-center mt-2 ${sectionClass}`}>
              <div className={`flex items-center text-primary`}>
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={index}
                    className={`h-4 w-4 ${ratingClass} ${
                      index < rating ? "fill-current" : ""
                    }`}
                  />
                ))}
              </div>
              {/* <div className={`text-sm text-gray-500 ml-2 ${numReviewsClass}`}>
                ({ratingCount})
              </div> */}
            </div>
          </div>
          {productDiscount ? (
            <div
              className={`text-l font-bold mt-2 flex gap-1 md:gap-2 items-center justify-center ${priceClass} absolute bottom-[14px] md:bottom-[16px]`}
            >
              <span className="text-[12px] md:text-[15px]">
                {/* ₹{Number(currentPrice).toFixed(2)} */}
                {currentPrice === 0
                  ? "Not Available"
                  : `₹ ${Number(currentPrice).toFixed(2)}`}
              </span>{" "}
              <span className="text-[10px] text-muted-foreground line-through pt-1">
                {/* ₹{Number(price).toFixed(2)} */}
                {price === 0
                  ? "Not Available"
                  : `₹ ${Number(price).toFixed(2)}`}
              </span>
            </div>
          ) : (
            <div
              className={`text-sm md:text-l font-bold mt-1 ${priceClass} absolute bottom-[16px]`}
            >
              {price === 0 ? "Not Available" : `₹ ${Number(price).toFixed(2)}`}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
