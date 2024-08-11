import Container from "../components/Container";
import {
  useCreateProductReviewMutation,
  useGetProductDetailsQuery,
  useGetProductFeaturesQuery,
  useGetProductsByBrandQuery,
  useGetProductsByCategoryQuery,
} from "../Features/productApiSlice";
import ProductImg from "../components/assets/images/Designer.png";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";
import imageToAdd from "../components/assets/images/Sample-PNG-Image.png";
import { ShieldCheck, Truck, Star, ShoppingCart, Pencil } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { useGetProductsQuery } from "../Features/productApiSlice";
import { addToCart } from "../Features/cartSlice";
import GPUSpecificationTable from "../components/GPUSpecificationTable";
import { useToast } from "../components/ui/use-toast";
import CPUSpecificationTable from "../components/CPUSpecificationTable";
import MoboSpecificationTable from "../components/MoboSpecificationTable";
import RAMSpecificationTable from "../components/RAMSpecificationTable";
import CoolerSpecificationTable from "../components/CoolerSpecificationTable";
import PSUSpecificationTable from "../components/PSUSpecificationTable";
import MemorySpecificationTable from "../components/MemorySpecificationTable";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import SameCategoryProducts from "../components/SameCategoryProducts";
import SameBrandProducts from "../components/SameBrandProducts";
import { Badge } from "../components/ui/badge";
import CommonSpecificationTable from "../components/CommonSpecificationTable";
import CabinetSpecificationTable from "../components/CabinetSpecificationTable";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

const ProductScreen = () => {
  const { toast } = useToast();
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [currentRating, setCurrentRating] = useState(0);
  const [hasSpecifications, setHasSpecifications] = useState(false);

  const {
    data: product,
    isLoading: productLoading,
    error: productError,
    refetch,
  } = useGetProductDetailsQuery(productId);

  const {
    data: productsByCategory,
    isLoading: productsByCategoryLoading,
    error: productsByCategoryError,
  } = useGetProductsByCategoryQuery(product?.category);

  const {
    data: productsByBrand,
    isLoading: productsByBrandLoading,
    error: productsByBrandError,
  } = useGetProductsByBrandQuery(product?.brand);

  const {
    data: productFeatures,
    isLoading: featuresLoading,
    error: featuresError,
  } = useGetProductFeaturesQuery(productId);

  const [addReview, { isLoading: addReviewLoading, error: addReviewError }] =
    useCreateProductReviewMutation();

  const { keyword, pageNumber } = useParams();
  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
  } = useGetProductsQuery({
    keyword,
    pageNumber,
  });
  const { userInfo } = useSelector((state) => state.auth);
  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart({ ...product, qty }));
    toast({
      title: "Item added to cart!",
    });
  };

  const handleBuyNow = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const handleRequestFeature = () => {
    if (userInfo?.isAdmin) {
      navigate(`/admin/allproducts/editProduct/${productId}`);
    }
    toast({
      title: "Features requested!",
      description:
        "Please call or message us on: 1234567890 for product details! We will update product soon!",
    });
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (userInfo?.name) {
      try {
        await addReview({ productId, comment, rating }).unwrap();
        refetch();
        setComment("");
        setRating(0);
        toast({
          title: "Review Added!",
        });
      } catch (error) {
        toast({
          title: "Failed to add review",
          description: error?.message || error?.data?.message,
          variant: "destructive",
        });
      }
    } else {
      navigate("/login");
    }
  };

  const hasTruthyValue = (obj) => {
    return Object.values(obj).some((value) =>
      Array.isArray(value) ? value.length > 0 : Boolean(value)
    );
  };

  useEffect(() => {
    if (product) {
      setHasSpecifications(hasTruthyValue(product?.specificationDetails));
      setCurrentRating(product?.rating);
    }

    if (product?.name) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [product]);
  return (
    <div className="flex w-full flex-col gap-8">
      <Container className="flex flex-col gap-8">
        <div className="bread-crumb mt-4">
          <Breadcrumbs />
        </div>
        <div className="product-section flex flex-col md:flex-row gap-8 my-4">
          <div className="product-image-section flex flex-col gap-8 flex-1">
            <div className="product-image relative">
              <Dialog>
                <DialogTrigger asChild>
                  <div>
                    <img
                      src={
                        product?.image === "/images/sample.jpg" ||
                        product?.image ===
                          "https://computer-makers-products-cpu.s3.ap-south-1.amazonaws.com/woocommerce-placeholder-700x700.png"
                          ? imageToAdd
                          : product?.image
                      }
                      alt="product-img"
                      className="w-[500px] h-auto md:h-[350px] cursor-pointer"
                    />
                    <Badge
                      className={`${
                        product?.countInStock === 0
                          ? "absolute top-0 left-0"
                          : "hidden"
                      }`}
                    >
                      {product?.countInStock === 0 ? "Out of Stock" : ""}
                    </Badge>
                    <Badge
                      className={`${
                        product?.isOnOffer && product?.countInStock > 0
                          ? "absolute top-0 left-0"
                          : "hidden"
                      }`}
                    >
                      {product?.isOnOffer && product?.countInStock > 0
                        ? "Offer"
                        : ""}
                    </Badge>
                    <Badge
                      className={`${
                        !product?.isOnOffer &&
                        product?.productDiscount > 0 &&
                        product?.countInStock > 0
                          ? "absolute top-0 left-0"
                          : "hidden"
                      }`}
                    >
                      {!product?.isOnOffer &&
                      product?.productDiscount > 0 &&
                      product?.countInStock > 0
                        ? "Discount"
                        : ""}
                    </Badge>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <div className="flex items-center space-x-2">
                    <img
                      src={
                        product?.image === "/images/sample.jpg"
                          ? imageToAdd
                          : product?.image
                      }
                      alt="product-img"
                      className="w-[500px] h-auto md:h-[350px]"
                    />
                  </div>
                  <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Close
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              {/* <img
                src={
                  product?.image === "/images/sample.jpg"
                    ? imageToAdd
                    : product?.image
                }
                alt="product-img"
                className="w-[500px] h-auto md:h-[350px]"
              />
              <Badge
                className={`${
                  product?.countInStock === 0
                    ? "absolute top-0 left-0"
                    : "hidden"
                }`}
              >
                {product?.countInStock === 0 ? "Out of Stock" : ""}
              </Badge>
              <Badge
                className={`${
                  product?.isOnOffer && product?.countInStock > 0
                    ? "absolute top-0 left-0"
                    : "hidden"
                }`}
              >
                {product?.isOnOffer && product?.countInStock > 0 ? "Offer" : ""}
              </Badge>
              <Badge
                className={`${
                  !product?.isOnOffer &&
                  product?.productDiscount > 0 &&
                  product?.countInStock > 0
                    ? "absolute top-0 left-0"
                    : "hidden"
                }`}
              >
                {!product?.isOnOffer &&
                product?.productDiscount > 0 &&
                product?.countInStock > 0
                  ? "Discount"
                  : ""}
              </Badge> */}
            </div>
            <div className="product-services flex justify-between">
              <div className="flex items-start gap-4 text-left">
                <ShieldCheck className="hidden h-6 w-6 sm:flex" />
                <div className="grid gap-1">
                  <p className="text-xs font-medium leading-none">Secure</p>
                  <p className="text-xs text-muted-foreground">
                    Certified marketplace since 2010
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 text-left">
                <Truck className="hidden h-6 w-6 sm:flex" />
                <div className="grid gap-1">
                  <p className="text-xs font-medium leading-none">Shipping</p>
                  <p className="text-xs text-muted-foreground">
                    Shipping all over India
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="product-price-section items-center md:items-start flex-1 flex flex-col justify-between">
            <div className="w-full md:w-[80%]">
              <div className="flex items-center mt-2">
                <div className="flex items-center text-yellow-500">
                  {Array.from({ length: 5 }, (product, index) => (
                    <div key={index}>
                      <Star
                        key={index}
                        className={`h-4 w-4 ${
                          index < currentRating ? "fill-current" : ""
                        }`}
                      />
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-500 ml-2">
                  ({product?.numReviews})
                </div>
              </div>
              <div className="flex items-center mt-2 font-bold text-l text-left pb-2 border-b">
                {product?.name}
              </div>
              {product?.productDiscount ? (
                <div className="flex items-center mt-2 font-extrabold text-left text-[2rem] pt-2 text-primary flex gap-4">
                  {product?.currentPrice === 0
                    ? "Not Available"
                    : `₹ ${product?.currentPrice}`}
                  <span className="font-semibold text-muted-foreground text-base line-through pt-4">
                    {" "}
                    {product?.price === 0
                      ? "Not Available"
                      : `₹ ${product?.price}`}
                  </span>
                </div>
              ) : (
                <div className="flex items-center mt-2 font-extrabold text-left text-[2rem] pt-2 text-primary flex gap-4">
                  {product?.price === 0
                    ? "Not Available"
                    : `₹ ${product?.price}`}
                </div>
              )}
              <div className="item-details flex gap-24 justify-start pl-6 md:pl-0 mt-4">
                <div className="flex flex-col gap-8 justify-between">
                  <div className="item-details-heading text-left font-semibold">
                    Brand
                  </div>
                  <div className="font-semibold item-details-heading text-left">
                    Category
                  </div>
                  <div className="font-semibold item-details-heading text-left">
                    Condition
                  </div>
                  <div className="font-semibold item-details-heading text-left">
                    Shipping
                  </div>
                </div>
                <div className="flex flex-col gap-8 justify-between">
                  <div className="item-details-content text-left">
                    {product?.brand}
                  </div>
                  <div className="item-details-content text-left">
                    {product?.category}
                  </div>
                  <div className="item-details-content text-left">
                    Brand New
                  </div>
                  <div className="item-details-content text-left">
                    All over India
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-[80%] cart-section flex justify-evenly gap-8 mt-8 md:mt-4">
              <div className="count-section flex gap-4 justify-center items-center">
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-3xl"
                  disabled={qty === 1}
                  onClick={() => setQty(qty - 1)}
                >
                  -
                </Button>
                {qty}
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => setQty(qty + 1)}
                  className="rounded-3xl"
                  disabled={qty === product?.countInStock}
                >
                  +
                </Button>
              </div>
              <div className="buy-section flex gap-4 items-center">
                {userInfo?.isAdmin ? (
                  <Button
                    onClick={() =>
                      navigate(`/admin/allproducts/editProduct/${productId}`)
                    }
                    className="flex items-center gap-2"
                  >
                    <Pencil className="w-3 h-3" />
                    Edit
                  </Button>
                ) : (
                  <Button
                    onClick={handleBuyNow}
                    disabled={product?.countInStock === 0}
                  >
                    Buy Now
                  </Button>
                )}
                <Button
                  size="icon"
                  variant="outline"
                  className="p-2 border border-solid border-primary"
                  disabled={product?.countInStock === 0}
                  onClick={(e) => handleAddToCart(e)}
                >
                  <ShoppingCart className="text-primary" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="product-details-section flex">
          {(product?.category === "CPU" ||
            product?.category === "GPU" ||
            product?.category === "PSU" ||
            product?.category === "RAM" ||
            product?.category === "Motherboard" ||
            product?.category === "CPU COOLER" ||
            product?.category === "Cabinet" ||
            product?.category === "SSD" ||
            product?.category === "HDD") && (
            <Tabs defaultValue="description" className="w-full">
              <TabsList className={`grid w-full grid-cols-4`}>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specification">Specification</TabsTrigger>
                <TabsTrigger value="returns">Warranty</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent
                value="description"
                className="flex flex-col text-left"
              >
                <h3 className="font-bold text-xl my-4">Features & Overview</h3>
                <p className="font-bold text-xl my-2 text-muted-foreground">
                  {product?.name}
                </p>
                {!productFeatures?.length && !product?.otherFeatures?.length ? (
                  <Card className="h-[20vh] mt-2 flex flex-col justify-center items-center gap-2">
                    <div className="text-xl font-bold">
                      Features are yet to be added!
                    </div>
                    <Button onClick={handleRequestFeature}>
                      {userInfo?.isAdmin ? "Edit Product" : "Request Feature"}
                    </Button>
                  </Card>
                ) : (
                  <ul className="list-inside list-disc px-2 text-sm">
                    {productFeatures?.map((item, index) => (
                      <li key={index} className="my-1">
                        {item}
                      </li>
                    ))}
                    {product?.otherFeatures
                      ?.filter((item) => item !== "")
                      .map((item, index) => (
                        <li key={index} className="my-1">
                          {item}
                        </li>
                      ))}
                  </ul>
                )}
              </TabsContent>
              <TabsContent value="specification">
                {!product?.otherSpecifications?.length && !hasSpecifications ? (
                  <Card className="h-[20vh] mt-2 flex flex-col justify-center items-center gap-2">
                    <div className="text-xl font-bold">
                      Specifications are yet to be added!
                    </div>
                    <Button onClick={handleRequestFeature}>
                      {userInfo?.isAdmin ? "Edit Product" : "Request Feature"}
                    </Button>
                  </Card>
                ) : (
                  <>
                    {product?.category === "GPU" && (
                      <GPUSpecificationTable product={product} />
                    )}
                    {product?.category === "CPU" && (
                      <CPUSpecificationTable product={product} />
                    )}
                    {product?.category === "Motherboard" && (
                      <MoboSpecificationTable product={product} />
                    )}
                    {product?.category === "RAM" && (
                      <RAMSpecificationTable product={product} />
                    )}
                    {product?.category === "CPU COOLER" && (
                      <CoolerSpecificationTable product={product} />
                    )}
                    {product?.category === "PSU" && (
                      <PSUSpecificationTable product={product} />
                    )}
                    {product?.category === "Cabinet" && (
                      <CabinetSpecificationTable product={product} />
                    )}
                    {(product?.category === "SSD" ||
                      product?.category === "HDD") && (
                      <MemorySpecificationTable product={product} />
                    )}
                  </>
                )}
              </TabsContent>
              <TabsContent value="returns">
                <Card className="text-left">
                  <CardHeader>
                    <CardTitle>Warraty & Returns</CardTitle>
                    <CardDescription>
                      Below listed is the warranty and returns policy
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                      <Card>
                        <CardHeader>
                          <CardTitle>Name</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-muted-foreground">
                            {product?.name}
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle>Warranty</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm text-muted-foreground">
                            Standard{" "}
                            {product?.warrantyDetails?.warrantyPeriod || "1"}{" "}
                            Years warranty. Physical damage is not covered
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle>Returns</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm text-muted-foreground">
                            {product?.warrantyDetails?.returnPeriod || "7"} days
                            return policy if the product seal is not broken or
                            product is not used.
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="reviews">
                <Card className="text-left">
                  <CardHeader>
                    <CardTitle>Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 mb-8">
                      <div className="grid gap-3">
                        <Label htmlFor="category">Rating</Label>
                        <Select
                          value={rating}
                          onValueChange={(e) => setRating(e)}
                        >
                          <SelectTrigger
                            id="category"
                            aria-label="Select category"
                          >
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 - Poor</SelectItem>
                            <SelectItem value="2">2 - Fair...</SelectItem>
                            <SelectItem value="3">3 - Good...</SelectItem>
                            <SelectItem value="4">4 - Very Good...</SelectItem>
                            <SelectItem value="5">5 - Excellent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="comment">Write Review</Label>
                        <Textarea
                          id="comment"
                          placeholder="Your review here ..."
                          className="min-h-32"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </div>
                      <div>
                        <Button onClick={(e) => handleSubmitReview(e)}>
                          Add Review
                        </Button>
                      </div>
                    </div>
                    <div>
                      {product?.reviews?.length
                        ? product?.reviews.map((item, index) => (
                            <button
                              key={index}
                              className="w-full flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent my-1"
                            >
                              <div className="flex w-full flex-col gap-1">
                                <div className="flex items-center">
                                  <div className="flex items-center gap-2">
                                    <div className="font-semibold">
                                      {item?.name === "Admin User"
                                        ? "Verified User"
                                        : item?.name}
                                    </div>
                                  </div>
                                </div>
                                <div className="text-xs font-medium">
                                  <div className="flex items-center text-primary">
                                    {Array.from({ length: 5 }, (_, index) => (
                                      <Star
                                        key={index}
                                        className={`h-4 w-4 ${
                                          index < item?.rating
                                            ? "fill-current"
                                            : ""
                                        }`}
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className="line-clamp-2 text-xs text-muted-foreground">
                                {item?.comment?.substring(0, 300)}
                              </div>
                            </button>
                          ))
                        : ""}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
          {product?.category !== "CPU" &&
            product?.category !== "GPU" &&
            product?.category !== "PSU" &&
            product?.category !== "RAM" &&
            product?.category !== "Motherboard" &&
            product?.category !== "CPU COOLER" &&
            product?.category !== "Cabinet" &&
            product?.category !== "SSD" &&
            product?.category !== "HDD" && (
              <Tabs defaultValue="description" className="w-full">
                <TabsList className={`grid w-full grid-cols-4`}>
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="specification">Specification</TabsTrigger>
                  <TabsTrigger value="returns">Warranty</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                {/* <TabsContent
                  value="description"
                  className="flex flex-col text-left"
                >
                  <h3 className="font-bold text-xl my-4">
                    Features & Overview
                  </h3>
                  <p className="font-bold text-xl my-2 text-muted-foreground">
                    {product?.name}
                  </p>
                  {!productFeatures?.length &&
                  !product?.otherFeatures?.length ? (
                    <Card className="h-[20vh] mt-2 flex flex-col justify-center items-center gap-2">
                      <div className="text-xl font-bold">
                        Features are yet to be added!
                      </div>
                      <Button onClick={handleRequestFeature}>
                        {userInfo?.isAdmin ? "Edit Product" : "Request Feature"}
                      </Button>
                    </Card>
                  ) : productFeatures?.length ? (
                    <ul className="list-inside list-disc px-2 text-sm">
                      {productFeatures?.map((item, index) => (
                        <li key={index} className="my-1">
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul className="list-inside list-disc px-2 text-sm">
                      {product?.otherFeatures?.map((item, index) => (
                        <li key={index} className="my-1">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </TabsContent> */}
                <TabsContent
                  value="description"
                  className="flex flex-col text-left"
                >
                  <h3 className="font-bold text-xl my-4">
                    Features & Overview
                  </h3>
                  <p className="font-bold text-xl my-2 text-muted-foreground">
                    {product?.name}
                  </p>
                  {!productFeatures?.length &&
                  !product?.otherFeatures?.length ? (
                    <Card className="h-[20vh] mt-2 flex flex-col justify-center items-center gap-2">
                      <div className="text-xl font-bold">
                        Features are yet to be added!
                      </div>
                      <Button onClick={handleRequestFeature}>
                        {userInfo?.isAdmin ? "Edit Product" : "Request Feature"}
                      </Button>
                    </Card>
                  ) : (
                    <ul className="list-inside list-disc px-2 text-sm">
                      {productFeatures?.map((item, index) => (
                        <li key={index} className="my-1">
                          {item}
                        </li>
                      ))}
                      {product?.otherFeatures
                        ?.filter((item) => item !== "")
                        .map((item, index) => (
                          <li key={index} className="my-1">
                            {item}
                          </li>
                        ))}
                    </ul>
                  )}
                </TabsContent>
                <TabsContent value="specification">
                  {!product?.otherSpecifications?.length &&
                  !hasSpecifications ? (
                    <Card className="h-[20vh] mt-2 flex flex-col justify-center items-center gap-2">
                      <div className="text-xl font-bold">
                        Specifications are yet to be added!
                      </div>
                      <Button onClick={handleRequestFeature}>
                        {userInfo?.isAdmin ? "Edit Product" : "Request Feature"}
                      </Button>
                    </Card>
                  ) : (
                    <CommonSpecificationTable product={product} />
                  )}
                </TabsContent>
                <TabsContent value="returns">
                  <Card className="text-left">
                    <CardHeader>
                      <CardTitle>Warraty & Returns</CardTitle>
                      <CardDescription>
                        Below listed is the warranty and returns policy
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-2">
                        <Card>
                          <CardHeader>
                            <CardTitle>Name</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-muted-foreground">
                              {product?.name}
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle>Warranty</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-sm text-muted-foreground">
                              Standard{" "}
                              {product?.warrantyDetails?.warrantyPeriod || "1"}{" "}
                              Years warranty. Physical damage is not covered
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle>Returns</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-sm text-muted-foreground">
                              {product?.warrantyDetails?.returnPeriod || "7"}{" "}
                              days return policy if the product seal is not
                              broken or product is not used.
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="reviews">
                  <Card className="text-left">
                    <CardHeader>
                      <CardTitle>Reviews</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6 mb-8">
                        <div className="grid gap-3">
                          <Label htmlFor="category">Rating</Label>
                          <Select
                            value={rating}
                            onValueChange={(e) => setRating(e)}
                          >
                            <SelectTrigger
                              id="category"
                              aria-label="Select category"
                            >
                              <SelectValue placeholder="Add Rating" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 - Poor</SelectItem>
                              <SelectItem value="2">2 - Fair...</SelectItem>
                              <SelectItem value="3">3 - Good...</SelectItem>
                              <SelectItem value="4">
                                4 - Very Good...
                              </SelectItem>
                              <SelectItem value="5">5 - Excellent</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="comment">Write Review</Label>
                          <Textarea
                            id="comment"
                            placeholder="Your review here ..."
                            className="min-h-32"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          />
                        </div>
                        <div>
                          <Button onClick={(e) => handleSubmitReview(e)}>
                            Add Review
                          </Button>
                        </div>
                      </div>
                      <div>
                        {product?.reviews?.length
                          ? product?.reviews.map((item, index) => (
                              <button
                                key={index}
                                className="w-full flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent my-1"
                              >
                                <div className="flex w-full flex-col gap-1">
                                  <div className="flex items-center">
                                    <div className="flex items-center gap-2">
                                      <div className="font-semibold">
                                        {item?.name === "Admin User"
                                          ? "Verified User"
                                          : item?.name}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text-xs font-medium">
                                    <div className="flex items-center text-primary">
                                      {Array.from({ length: 5 }, (_, index) => (
                                        <Star
                                          key={index}
                                          className={`h-4 w-4 ${
                                            index < item?.rating
                                              ? "fill-current"
                                              : ""
                                          }`}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <div className="line-clamp-2 text-xs text-muted-foreground">
                                  {item?.comment?.substring(0, 300)}
                                </div>
                              </button>
                            ))
                          : ""}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
        </div>
        <SameCategoryProducts category={product?.category} />
        <SameBrandProducts brand={product?.brand} />
      </Container>
    </div>
  );
};

export default ProductScreen;
