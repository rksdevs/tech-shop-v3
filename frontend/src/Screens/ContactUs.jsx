import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import Container from "../components/Container";
import { Clock3, Mail, Mailbox, MapPin, Phone, PhoneCall } from "lucide-react";
import { Link } from "react-router-dom";
import shop2 from "../components/assets/images/shop2.jpeg";
import { Helmet } from "react-helmet-async";

const ContactUs = () => {
  return (
    <div className="flex w-full flex-col gap-8">
      <Helmet>
        <title>Contact Us</title>
        <meta
          name="description"
          content="Contact us using phone, email or mail. Find our contact details here."
        />
        <link rel="canonical" href="/contactus" />
      </Helmet>
      <Container className="flex flex-col gap-4 mt-2">
        <div className="flex flex-col gap-4">
          <div className="section-heading flex justify-center">
            <h1 className="text-[28px] font-extrabold">Contact Us</h1>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="col-span-1">
              <CardHeader className="text-left">
                <CardDescription>Call us on:</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4 justify-between p-0">
                <div className="flex gap-2 text-[28px] font-semibold items-center">
                  <Phone className="w-6 h-6" />
                  <span>9876543210</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end pt-8">
                <div className="text-muted-foreground">for any enquiries</div>
              </CardFooter>
            </Card>
            <Card className="col-span-1">
              <CardHeader className="text-left">
                <CardDescription>Write us at:</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 justify-between p-4">
                <div className="flex gap-2 text-l font-semibold items-center">
                  <Mail className="w-6 h-6" />
                  <span>support@computermakers.in</span>
                </div>
                <CardFooter className="flex justify-end p-0 pt-4">
                  <div className="text-muted-foreground">for any enquiries</div>
                </CardFooter>
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader className="text-left">
                <CardDescription>Meet us at:</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4 justify-between">
                <div className="flex gap-2 text-sm font-semibold items-start flex-col justify-start">
                  <span className="flex gap-2 items-center">
                    {" "}
                    <Mailbox className="w-4 h-4" /> No.136
                  </span>
                  <span>Amar Radio Building</span>
                  <span>Sadar Patrappa Rd</span>
                  <span>Bengaluru, Karnataka 560002</span>
                </div>
              </CardContent>
            </Card>
          </div>
          <fieldset className="w-full flex flex-col gap-4 rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">
              Visit Our Shops
            </legend>
            <div className="flex flex-col-reverse md:flex-row gap-6">
              <Card className="max-w-full lg:max-w-[25vw]">
                <CardHeader className="bg-muted/50 text-left pb-1 gap-3">
                  <CardTitle>BANGALORE</CardTitle>
                  <CardDescription>
                    No.136, Amar Radio Building Sadar Patrappa Rd Bengaluru,
                    Karnataka 560002
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 p-4">
                  <div className="flex gap-4 p-2">
                    <Clock3 />
                    <span>10:00 AM - 9:00 PM</span>
                  </div>
                  <div className="flex gap-4 p-2">
                    <PhoneCall />
                    <span>9876543210</span>
                  </div>
                  <div className="flex gap-4 p-2">
                    <Mail />
                    <span>support@computermakers.in</span>
                  </div>
                  <div className="flex gap-4 p-2">
                    <MapPin />
                    <Link
                      to="https://maps.app.goo.gl/gHNXnQUScsJK38pbA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium"
                    >
                      Check us out on Google Map
                    </Link>
                  </div>
                </CardContent>
              </Card>
              <img
                src={shop2}
                alt="shop"
                height="300"
                width="300"
                className="col-span-3 w-full h-full md:h-[350px] md:w-[530px] rounded-lg object-contain lg:object-cover"
              />
            </div>
          </fieldset>
        </div>
      </Container>
    </div>
  );
};

export default ContactUs;
