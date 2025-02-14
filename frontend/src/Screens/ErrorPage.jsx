import { OctagonX } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useNavigate, useRouteError } from "react-router-dom";
import errorgif from "../components/assets/images/error-gif.gif";
import { Button } from "../components/ui/button";
import { Helmet } from "react-helmet-async";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  return (
    <Card className="flex justify-center items-center flex-col mt-4 h-[61vh]">
      <Helmet>
        <title>Error Page</title>
        <meta
          name="description"
          content="Oops something went wrong, you are on the error page."
        />
        <link rel="canonical" href="/error" />
      </Helmet>
      <CardHeader>
        <CardTitle className="text-2xl">
          Dang! Something went wrong...
        </CardTitle>
      </CardHeader>
      <CardContent className="flex gap-6 flex-col items-center justify-center">
        <p className="flex gap-4">
          Sorry, this page is doesn't exist{" "}
          <span>
            <OctagonX />
          </span>
        </p>
        <img
          src={errorgif}
          alt="error-oops!"
          height="400"
          width="400"
          className="w-[400] h-[400]"
        />
        <p>
          <i>{error?.statusText || error?.message || error?.data?.message}</i>
        </p>
        <Button className="bg-destructive" onClick={() => navigate(-1)}>
          Go Back ☠️
        </Button>
      </CardContent>
    </Card>
  );
};

export default ErrorPage;
