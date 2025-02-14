import { Button } from "../../components/ui/button";
import Container from "../../components/Container";
import React, { useEffect, useState } from "react";
import {
  ChevronLeft,
  Heart,
  MessageCircle,
  Trash2,
  Upload,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  useAddInstaPostsMutation,
  useDeleteInstaPostMutation,
  useGetAboutAdminDetailsQuery,
  useUpdateAdminDetailsMutation,
  useUpdateInstaPostMutation,
  useUploadPostImageMutation,
} from "../../Features/aboutAdminApiSlice";
import placeHolderImg from "../../components/assets/images/placeholder.svg";
import { useToast } from "../../components/ui/use-toast";
import { useGetAllOffersQuery } from "../../Features/offersApiSlice";
import {
  useDeleteOneSubscriberMutation,
  useGetAllSubscribersQuery,
  useSendOffersToSubscribersMutation,
  useSendProductToSubscribersMutation,
} from "../../Features/newsLetterApiSlice";
import sampleImg from "../../components/assets/images/placeholder.svg";
import { Helmet } from "react-helmet-async";

const EditAdminDetails = () => {
  const [ownerName, setOwnerName] = useState("");
  const [ownerImg, setOwnerImg] = useState("");
  const [coOwnerName, setCoOwnerName] = useState("");
  const [coOwnerImg, setCoOwnerImg] = useState("");
  const [productExpertName, setProductExpertName] = useState("");
  const [productExpertImg, setProductExpertImg] = useState("");
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [instagramPostsNumber, setInstagramPostsNumber] = useState(0);
  const [instagramFollowers, setInstagramFollowers] = useState(0);
  const [instagramFollowing, setInstagramFollowing] = useState(0);
  const [selectedPostToEdit, setSelectedPostToEdit] = useState("");
  const [selectedPostImg, setSelectedPostImg] = useState("");
  const [postDetailsToEdit, setPostDetailsToEdit] = useState({
    postLikes: null,
    postComments: null,
    postImage: null,
    postId: null,
    _id: null,
  });

  const [updatedPostId, setUpdatedPostId] = useState("");
  const [updatedPostLikes, setUpdatedPostLikes] = useState(0);
  const [updatedPostComments, setUpdatedPostComments] = useState(0);

  const [offerName, setOfferName] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [selectedSubscriber, setSelectedSubscriber] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const {
    data: aboutAdminDetails,
    isLoading: aboutAdminDetailsLoading,
    error: aboutAdminDetailsError,
    refetch,
  } = useGetAboutAdminDetailsQuery();

  const [deletePost] = useDeleteInstaPostMutation();
  const [uploadPostImage] = useUploadPostImageMutation();
  const [updatePost] = useUpdateInstaPostMutation();
  const [addPost] = useAddInstaPostsMutation();
  const [updateAdminDetails] = useUpdateAdminDetailsMutation();
  const [sendOffersToSubs] = useSendOffersToSubscribersMutation();
  const [sendProductsToSubs] = useSendProductToSubscribersMutation();
  const { data: allSubscribers, refetch: refetchSubscribers } =
    useGetAllSubscribersQuery();
  const [deleteSubscriber] = useDeleteOneSubscriberMutation();

  const {
    data: allOffers,
    isLoading: allOffersLoading,
    error: allOffersError,
  } = useGetAllOffersQuery();

  const handleFileChange = (event) => {
    setSelectedImageFile(event.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!selectedImageFile) return;

    const formData = new FormData();
    formData.append("image", selectedImageFile);

    try {
      const res = await uploadPostImage(formData).unwrap();
      setSelectedPostImg(res.data);
      // console.log(res.data);
    } catch (error) {
      console.log(error);
      toast({
        title: "Can not update image",
        description: error?.message || error?.data?.message,
        variant: "destructive",
      });
    }
  };

  const handleDeletePost = async (e) => {
    e.preventDefault();
    try {
      await deletePost(postDetailsToEdit?._id);
      toast({ title: "Post deleted successfully!" });
      refetch();
      setPostDetailsToEdit({
        postLikes: null,
        postComments: null,
        postImage: null,
        postId: null,
        _id: null,
      });
      setSelectedImageFile(null);
      setSelectedPostImg("");
    } catch (error) {
      toast({
        title: "Can not delete post",
        description: error?.message || error?.data?.message,
        variant: "destructive",
      });
    }
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    try {
      if (
        updatedPostId === "" &&
        updatedPostComments === 0 &&
        updatedPostLikes === 0 &&
        selectedPostImg === ""
      ) {
        toast({
          title: "Missing details to update",
          variant: "destructive",
        });
        return;
      }
      const payload = {
        postParamId: postDetailsToEdit?._id,
        updateData: {
          postId: updatedPostId || postDetailsToEdit?.postId,
          postImage: selectedPostImg || postDetailsToEdit?.postImage,
          postLikes: updatedPostLikes || postDetailsToEdit?.postLikes,
          postComments: updatedPostComments || postDetailsToEdit?.postComments,
        },
      };
      await updatePost(payload).unwrap();
      toast({
        title: "Post Updated successfully",
      });
      refetch();
    } catch (error) {
      toast({
        title: "Can not update post",
        description: error?.message || error?.data?.message,
        variant: "destructive",
      });
    }
  };

  const handleAddnewPost = async (e) => {
    e.preventDefault();
    try {
      const res = await addPost().unwrap();
      toast({
        title: res?.message,
      });
      refetch();
    } catch (error) {
      toast({
        title: "Can not update post",
        description: error?.message || error?.data?.message,
        variant: "destructive",
      });
    }
  };

  const handleUpdateAdminDetails = async (e) => {
    e.preventDefault();
    const payload = {
      owner: {
        name: ownerName,
        image: ownerImg,
      },
      coOwner: {
        name: coOwnerName,
        image: coOwnerImg,
      },
      productExpert: {
        name: productExpertName,
        image: productExpertImg,
      },
      instagramDetails: {
        posts: instagramPostsNumber,
        followers: instagramFollowers,
        following: instagramFollowing,
      },
    };
    try {
      await updateAdminDetails(payload).unwrap();
      toast({
        title: "Admin details updated",
      });
      //   console.log(res);
    } catch (error) {
      toast({
        title: "Can not admin details!",
        description: error?.message || error?.data?.message,
        variant: "destructive",
      });
    }
  };

  const handleSendOffersToSubs = async (e) => {
    e.preventDefault();
    try {
      const res = await sendOffersToSubs({ offerName }).unwrap();
      toast({
        title: res?.data?.message || res?.message,
      });
      setOfferName("");
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to send emails!",
        description: error?.message || error?.data?.message,
        variant: "destructive",
      });
    }
  };

  const handleSendProductsToSubs = async (e) => {
    e.preventDefault();
    try {
      const res = await sendProductsToSubs({ productDetails }).unwrap();
      toast({
        title: res?.data?.message || res?.message,
      });
      setProductDetails("");
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to send emails!",
        description: error?.message || error?.data?.message,
        variant: "destructive",
      });
    }
  };

  const handleUnsubscribe = async (e) => {
    e.preventDefault();
    try {
      const res = await deleteSubscriber({
        email: selectedSubscriber,
      }).unwrap();
      toast({
        title: res?.data?.message || res?.message,
      });
      refetchSubscribers();
      setSelectedSubscriber("");
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to delete subscriber!",
        description: error?.message || error?.data?.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (aboutAdminDetails) {
      //   console.log(aboutAdminDetails);
      setCoOwnerImg(aboutAdminDetails?.data?.coOwner?.image);
      setCoOwnerName(aboutAdminDetails?.data?.coOwner?.name);
      setOwnerName(aboutAdminDetails?.data?.owner?.name);
      setOwnerImg(aboutAdminDetails?.data?.owner?.image);
      setProductExpertName(aboutAdminDetails?.data?.productExpert?.name);
      setProductExpertImg(aboutAdminDetails?.data?.productExpert?.image);
      setInstagramFollowers(
        aboutAdminDetails?.data?.instagramDetails?.followers
      );
      setInstagramFollowing(
        aboutAdminDetails?.data?.instagramDetails?.following
      );
      setInstagramPostsNumber(aboutAdminDetails?.data?.instagramDetails?.posts);
    }
  }, [aboutAdminDetails]);

  useEffect(() => {
    if (selectedPostToEdit) {
      const post = aboutAdminDetails?.data?.instagramPosts?.filter(
        (post) => post?.postId === selectedPostToEdit
      );
      setPostDetailsToEdit(...post);
    }
  }, [selectedPostToEdit, aboutAdminDetails]);

  return (
    <div className="flex w-full flex-col gap-8">
      <Helmet>
        <title>Edit Admin Details</title>
        <meta
          name="description"
          content="Edit Admin details to update the About Us page information"
        />
        <link rel="canonical" href="/admin/edit-admin-details" />
      </Helmet>
      <Container className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 mt-2">
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 text-left">
            <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => navigate(-1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Back</span>
                </Button>
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                  Edit Admin Details
                </h1>
                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                  <Button
                    variant="outline"
                    size="sm"
                    className="pt-1"
                    onClick={() => navigate(-1)}
                  >
                    Discard
                  </Button>
                  <Button
                    size="sm"
                    className="pt-1"
                    onClick={(e) => handleUpdateAdminDetails(e)}
                  >
                    Save
                  </Button>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                  <Button onClick={(e) => handleAddnewPost(e)}>
                    Add New Empty Post
                  </Button>
                  <Card>
                    <CardHeader>
                      <CardTitle>Send Offer</CardTitle>
                      <CardDescription>
                        Send offers to all subscribers
                      </CardDescription>
                      <CardContent className="flex flex-col justify-center items-center gap-4">
                        <div className="flex flex-col w-full justify-center items-center mt-2">
                          <Label htmlFor="offer" className="mb-2">
                            Select Offer
                          </Label>
                          <Select
                            value={offerName}
                            onValueChange={(e) => setOfferName(e)}
                          >
                            <SelectTrigger id="offer" aria-label="Select offer">
                              <SelectValue placeholder="Select offer" />
                            </SelectTrigger>
                            <SelectContent>
                              {allOffers?.map((offer, index) => (
                                <SelectItem
                                  key={index}
                                  value={offer?.offerName}
                                >
                                  {offer?.offerName}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <Button
                          className="w-full"
                          onClick={(e) => handleSendOffersToSubs(e)}
                        >
                          Send Offers
                        </Button>
                      </CardContent>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Send New Product</CardTitle>
                      <CardDescription>
                        Send new products details to all subscribers
                      </CardDescription>
                      <CardContent className="flex flex-col justify-center items-center gap-4">
                        <div className="flex flex-col w-full justify-center items-center mt-2">
                          <Label htmlFor="productDetails" className="mb-2">
                            New Product Details
                          </Label>
                          <Input
                            id="productDetails"
                            type="text"
                            placeholder="Product details..."
                            value={productDetails}
                            onChange={(e) => setProductDetails(e.target.value)}
                          />
                        </div>
                        <Button
                          className="w-full"
                          onClick={(e) => handleSendProductsToSubs(e)}
                        >
                          Send Products
                        </Button>
                      </CardContent>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Delete Subscriber</CardTitle>
                      <CardDescription>
                        Remove a suscriber from database
                      </CardDescription>
                      <CardContent className="flex flex-col justify-center items-center gap-4">
                        <div className="flex flex-col w-full justify-center items-center mt-2">
                          <Label htmlFor="subscribers" className="mb-2">
                            Select Subscriber To Delete
                          </Label>
                          <Select
                            value={selectedSubscriber}
                            onValueChange={(e) => setSelectedSubscriber(e)}
                          >
                            <SelectTrigger
                              id="subscribers"
                              aria-label="Select offer"
                            >
                              <SelectValue placeholder="Select offer" />
                            </SelectTrigger>
                            <SelectContent>
                              {allSubscribers?.map((subscriber) => (
                                <SelectItem
                                  key={subscriber?._id}
                                  value={subscriber?.email}
                                >
                                  {subscriber?.email}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <Button
                          className="w-full"
                          onClick={(e) => handleUnsubscribe(e)}
                        >
                          Delete Subscriber
                        </Button>
                      </CardContent>
                    </CardHeader>
                  </Card>
                  <Card x-chunk="dashboard-07-chunk-0">
                    <CardHeader>
                      <CardTitle>Admin Details</CardTitle>
                      <CardDescription>
                        Owner details are given below
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-2">
                        <Card className="h-fit">
                          <CardHeader className="items-center">
                            <Avatar className="h-[150px] w-[150px] mb-4">
                              <AvatarImage
                                src="https://github.com/shadcn.png"
                                alt="@shadcn"
                              />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <CardTitle>{ownerName}</CardTitle>
                            <CardDescription>Owner</CardDescription>
                          </CardHeader>
                          <CardFooter className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2 items-center">
                              <Label htmlFor="name">Update Name</Label>
                              <Input
                                id="name"
                                type="text"
                                className="w-full"
                                placeholder=""
                                value={ownerName}
                                onChange={(e) => setOwnerName(e.target.value)}
                              />
                            </div>
                            <div className="flex flex-col gap-2 hidden">
                              <Input type="file" disabled />
                              <Button>
                                <Upload className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardFooter>
                        </Card>
                        <Card className="h-fit">
                          <CardHeader className="items-center">
                            <Avatar className="h-[150px] w-[150px] mb-4">
                              <AvatarImage
                                src="https://github.com/shadcn.png"
                                alt="@shadcn"
                              />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <CardTitle>{coOwnerName}</CardTitle>
                            <CardDescription>Co-Owner</CardDescription>
                          </CardHeader>
                          <CardFooter className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2 items-center">
                              <Label htmlFor="name">Update Name</Label>
                              <Input
                                id="name"
                                type="text"
                                className="w-full"
                                placeholder=""
                                value={coOwnerName}
                                onChange={(e) => setCoOwnerName(e.target.value)}
                              />
                            </div>
                            <div className="flex flex-col gap-2 hidden">
                              <Input type="file" disabled />
                              <Button>
                                <Upload className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardFooter>
                        </Card>
                        <Card className="h-fit">
                          <CardHeader className="items-center">
                            <Avatar className="h-[150px] w-[150px] mb-4">
                              <AvatarImage
                                src="https://github.com/shadcn.png"
                                alt="@shadcn"
                              />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <CardTitle>{productExpertName}</CardTitle>
                            <CardDescription>Product Expert</CardDescription>
                          </CardHeader>
                          <CardFooter className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2 items-center">
                              <Label htmlFor="name">Update Name</Label>
                              <Input
                                id="name"
                                type="text"
                                className="w-full"
                                placeholder=""
                                value={productExpertName}
                                onChange={(e) =>
                                  setProductExpertName(e.target.value)
                                }
                              />
                            </div>
                            <div className="flex flex-col gap-2 hidden">
                              <Input type="file" disabled />
                              <Button>
                                <Upload className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardFooter>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                  <Card x-chunk="dashboard-07-chunk-1">
                    <CardHeader>
                      <CardTitle>Instagram Account Details</CardTitle>
                      <CardDescription>
                        Update Instagram account details below
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="pl-3">Field</TableHead>
                            <TableHead className="pl-3">Value</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="">
                              <Label htmlFor="posts" className="">
                                Instagram Total Posts
                              </Label>
                            </TableCell>
                            <TableCell>
                              <Input
                                id="posts"
                                type="number"
                                placeholder={instagramPostsNumber}
                                value={instagramPostsNumber}
                                onChange={(e) =>
                                  setInstagramPostsNumber(e.target.value)
                                }
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="">
                              <Label htmlFor="followers" className="">
                                Instagram Total Followers
                              </Label>
                            </TableCell>
                            <TableCell>
                              <Input
                                id="followers"
                                type="number"
                                placeholder={instagramFollowers}
                                value={instagramFollowers}
                                onChange={(e) =>
                                  setInstagramFollowers(e.target.value)
                                }
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="">
                              <Label htmlFor="following" className="">
                                Instagram Total Following
                              </Label>
                            </TableCell>
                            <TableCell>
                              <Input
                                id="following"
                                type="number"
                                placeholder={instagramFollowing}
                                value={instagramFollowing}
                                onChange={(e) =>
                                  setInstagramFollowing(e.target.value)
                                }
                              />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                  <Card x-chunk="dashboard-07-chunk-3">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        Edit Posts{" "}
                      </CardTitle>
                      <CardDescription>
                        <Label htmlFor="category">Select Posts</Label>
                        <Select
                          value={selectedPostToEdit}
                          onValueChange={(e) => setSelectedPostToEdit(e)}
                        >
                          <SelectTrigger
                            id="category"
                            aria-label="Select posts to edit"
                          >
                            <SelectValue placeholder="Select post to edit" />
                          </SelectTrigger>
                          <SelectContent>
                            {aboutAdminDetails?.data?.instagramPosts?.map(
                              (post, index) => (
                                <SelectItem key={index} value={post?.postId}>
                                  {post?.postId}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </CardDescription>
                    </CardHeader>
                  </Card>
                  {postDetailsToEdit?.postId && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex justify-between">
                          Selected Post
                          <span>
                            <Trash2
                              className="w-4 h-4 hover:cursor-pointer hover:text-primary"
                              onClick={handleDeletePost}
                            />
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="relative group ">
                        <img
                          src={`/api/socialMediaDetail/proxy?url=${encodeURIComponent(
                            postDetailsToEdit?.postImage
                          )}`}
                          // src={
                          //   postDetailsToEdit.postImage === "/images/sample.jpg"
                          //     ? placeHolderImg
                          //     : postDetailsToEdit.postImage
                          // }
                          alt="post"
                          key={postDetailsToEdit?._id}
                          height="250"
                          width="250"
                          className="h-[250px] w-[250px] rounded-lg object-cover transition-all hover:scale-105"
                          crossOrigin="anonymous"
                        />
                        {/* <div className="overlay absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div> */}
                        <div className="likes-comments flex gap-4 absolute bottom-5 left-[105px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="text-white">
                            <MessageCircle />
                            <span>{postDetailsToEdit?.postComments}</span>
                          </div>
                          <div className="text-white">
                            <Heart />
                            <span>{postDetailsToEdit?.postLikes}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  <Card
                    className="overflow-hidden"
                    x-chunk="dashboard-07-chunk-4"
                  >
                    <CardHeader>
                      <CardTitle className="mb-4">
                        Post Details To Edit{" "}
                      </CardTitle>
                      <CardDescription className="flex gap-6 items-end">
                        <Input type="file" onChange={handleFileChange} />
                        <Button onClick={handleImageUpload}>
                          <Upload className="h-4 w-4" />
                        </Button>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                      <div className="grid gap-2">
                        <img
                          src={
                            selectedPostImg ===
                              "https://github.com/shadcn.png" ||
                            selectedPostImg === ""
                              ? placeHolderImg
                              : selectedPostImg
                          }
                          alt="upload sample img"
                          height="120"
                          width="120"
                          className="aspect-square w-full h-[120px] rounded-md object-cover"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <Label htmlFor="postLikes" className="w-2/3">
                          Likes Count
                        </Label>
                        <Input
                          id="postLikes"
                          type="Number"
                          className="w-1/3"
                          placeholder="Post like count"
                          value={updatedPostLikes}
                          onChange={(e) => setUpdatedPostLikes(e.target.value)}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Label htmlFor="postComments" className="w-2/3">
                          Comments Count
                        </Label>
                        <Input
                          id="postComments"
                          type="number"
                          className="w-1/3"
                          placeholder="Post comment count"
                          value={updatedPostComments}
                          onChange={(e) =>
                            setUpdatedPostComments(e.target.value)
                          }
                        />
                      </div>
                      <div className="flex gap-2 items-center">
                        <Label htmlFor="postId" className="w-1/3">
                          Post Id
                        </Label>
                        <Input
                          className="w-2/3"
                          id="postId"
                          type="text"
                          placeholder="new post Id"
                          value={updatedPostId}
                          onChange={(e) => setUpdatedPostId(e.target.value)}
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full"
                        onClick={(e) => handleUpdatePost(e)}
                      >
                        Update Post
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 md:hidden">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(-1)}
                >
                  Discard
                </Button>
                <Button size="sm" onClick={(e) => handleUpdateAdminDetails(e)}>
                  Save Product
                </Button>
              </div>
            </div>
          </main>
        </div>
      </Container>
    </div>
  );
};

export default EditAdminDetails;
