import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import axios from "axios";
import Container from "../components/Container";
import { Heart, Instagram, MessageCircle, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Separator } from "../components/ui/separator";
import { ScrollArea, ScrollBar } from "../components/ui/scroll-area";
import {
  useGetInstaProfileDetailsQuery,
  useGetYoutubeVideosQuery,
} from "../Features/performanceCalculatorSlice";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { useGetAboutAdminDetailsQuery } from "../Features/aboutAdminApiSlice";
import instaPic from "../components/assets/images/instaPic.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import { Helmet } from "react-helmet-async";

const AboutUs = () => {
  const {
    data: allvideos,
    isLoading: allvideosLoading,
    error: allvideosError,
  } = useGetYoutubeVideosQuery();

  const {
    data: instaDetails,
    isLoading,
    error,
  } = useGetAboutAdminDetailsQuery();

  return (
    <div className="flex w-full flex-col gap-8">
      <Helmet>
        <title>About Us</title>
        <meta
          name="description"
          content="Know us better and check out our social media handles"
        />
        <link rel="canonical" href="/aboutus" />
      </Helmet>
      <Container className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 mt-2">
          <div className="section-heading flex justify-center">
            <h1 className="text-[28px] font-extrabold">About Us</h1>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="h-fit">
              <CardHeader className="items-center">
                <Avatar className="h-[150px] w-[150px] mb-4">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <CardTitle>Neal Raj</CardTitle>
                <CardDescription>Owner</CardDescription>
              </CardHeader>
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
                <CardTitle>Karan Raj</CardTitle>
                <CardDescription>Co-Owner</CardDescription>
              </CardHeader>
            </Card>
          </div>
          <fieldset className="flex flex-col gap-8 rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">
              Follow us on Social Media
            </legend>
            <div className="w-full">
              <div className="flex items-center gap-8">
                <div className="space-y-1 text-left">
                  <h2 className="flex gap-6">
                    <span className="text-2xl font-semibold tracking-tight">
                      YouTube
                    </span>
                    <Link
                      className="flex gap-2 items-center justify-center"
                      to={`https://www.youtube.com/channel/${process.env.REACT_APP_CHANNEL_ID}?sub_confirmation=1`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        className="flex gap-2 items-center justify-center"
                        size="sm"
                      >
                        <Youtube className="h-5 w-5" />{" "}
                        <span className="pt-1">Subscribe</span>
                      </Button>
                    </Link>
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Check out our videos on YouTube
                  </p>
                </div>
              </div>
              <Separator className="my-4" />
              <ScrollArea className="hidden lg:flex w-[950px] whitespace-nowrap rounded-md border">
                <div className="flex w-max space-x-4 p-4">
                  {allvideos?.map((video) => (
                    <div
                      className="flex flex-col gap-4 justify-start items-start"
                      key={video.id.videoId}
                    >
                      <div key={video.id.videoId} className="video-item">
                        {/* <h3>{video.snippet.title}</h3> */}
                        <iframe
                          width="300"
                          height="300"
                          src={`https://www.youtube.com/embed/${video.id.videoId}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={video.snippet.title}
                          className="rounded-lg object-cover transition-all hover:scale-105"
                        ></iframe>
                      </div>
                      <div className="space-y-1 text-sm text-left">
                        <h3 className="font-medium leading-none">
                          {video.snippet.title?.split("|")[0]}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {video.snippet.channelTitle}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
              <Carousel className="w-full lg:hidden">
                <CarouselContent className="-ml-1 h-[30vh] md:h-[38vh]">
                  {allvideos?.map((video) => (
                    <CarouselItem
                      className="pl-1 basis-1/2 lg:basis-1/5 max-w-[200px]"
                      key={video?.id?.videoId}
                    >
                      <iframe
                        src={`https://www.youtube.com/embed/${video.id.videoId}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={video.snippet.title}
                        className="rounded-lg object-cover w-full h-[200px]"
                      ></iframe>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-[-15px] top-[125px]" />
                <CarouselNext className="right-[-15px] top-[125px] z-100" />
              </Carousel>
            </div>
            <div className="w-full">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                <div className="space-y-1 text-left">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Instagram
                  </h2>
                  <Link
                    className="flex gap-2 items-center justify-center"
                    to={process.env.REACT_APP_INSTAGRAM_PROFILE_PAGE}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      className="flex gap-2 items-center justify-center"
                      size="sm"
                    >
                      <Instagram className="h-5 w-5" />{" "}
                      <span className="pt-1">Follow</span>
                    </Button>
                  </Link>
                </div>
                <Card className="h-fit">
                  <CardHeader className="items-center flex flex-row gap-4 p-2">
                    <Avatar className="h-[80px] w-[80px]">
                      <img
                        // src={instaProfileDetails?.profilePic}
                        src={instaPic}
                        crossOrigin="anonymous"
                        alt="computermakers"
                        className="rounded-[50%]"
                        height="80"
                        width="80"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-4">
                      <CardTitle>{`@computermakers`}</CardTitle>
                      <div className="flex gap-4">
                        <CardDescription className="flex flex-col">
                          <span className="text-sm font-bold text-black">
                            Posts
                          </span>
                          <span className="font-semibold">
                            {instaDetails?.data?.instagramDetails?.posts}
                          </span>
                        </CardDescription>
                        <CardDescription className="flex flex-col">
                          <span className="text-sm font-bold text-black">
                            Followers
                          </span>
                          <span className="font-semibold">
                            {instaDetails?.data?.instagramDetails?.followers}
                          </span>
                        </CardDescription>
                        <CardDescription className="flex flex-col">
                          <span className="text-sm font-bold text-black">
                            Following
                          </span>
                          <span className="font-semibold">
                            {instaDetails?.data?.instagramDetails?.following}
                          </span>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </div>
              <Separator className="my-4" />
              <ScrollArea className="hidden lg:flex w-[950px] whitespace-nowrap rounded-md border">
                <div className="flex w-max space-x-4 p-4">
                  {instaDetails?.data?.instagramPosts?.map((post) => (
                    <Link
                      className="relative group"
                      to={`https://www.instagram.com/p/${post?.postId}/`}
                      key={post?._id}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={`/api/socialMediaDetail/proxy?url=${encodeURIComponent(
                          post?.postImage
                        )}`}
                        alt="post"
                        key={post?._id}
                        height="250"
                        width="250"
                        className="h-[250px] w-[250px] rounded-lg object-cover transition-all hover:scale-105"
                        crossOrigin="anonymous"
                      />
                      <div className="overlay absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                      <div className="likes-comments flex gap-4 absolute bottom-1 left-[95px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="text-white">
                          <MessageCircle />
                          <span>{post?.postComments}</span>
                        </div>
                        <div className="text-white">
                          <Heart />
                          <span>{post?.postLikes}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
              <Carousel className="w-full lg:hidden">
                <CarouselContent className="-ml-1 h-[33vh] pt-3">
                  <div className="flex">
                    {instaDetails?.data?.instagramPosts?.map((post) => (
                      <CarouselItem
                        key={post?._id}
                        className="pl-1 basis-1/2 lg:basis-1/5 max-w-[200px]"
                      >
                        <Link
                          className="relative group"
                          to={`https://www.instagram.com/p/${post?.postId}/`}
                          key={post?._id}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={`/api/socialMediaDetail/proxy?url=${encodeURIComponent(
                              post?.postImage
                            )}`}
                            alt="post"
                            key={post?._id}
                            height="200"
                            width="200"
                            className="h-[200px] w-[200px] rounded-lg object-cover transition-all hover:scale-105"
                            crossOrigin="anonymous"
                          />
                        </Link>
                      </CarouselItem>
                    ))}
                  </div>
                </CarouselContent>
                <CarouselPrevious className="left-[-15px] top-[125px]" />
                <CarouselNext className="right-[-15px] top-[125px] z-100" />
              </Carousel>
            </div>
          </fieldset>
        </div>
      </Container>
    </div>
  );
};

export default AboutUs;
