import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import Container from "../components/Container";
import { useDispatch } from "react-redux";
import {
  useGoogleLoginMutation,
  useRegisterMutation,
} from "../Features/usersApiSlice";
import { useState } from "react";
import { setCredentials } from "../Features/authSlice";
import { useToast } from "../components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import GoogleAuthLogin from "../components/GoogleAuthLogin";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState(0);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [countryCode, setCountrCode] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [register, { error: registerError }] = useRegisterMutation();

  const countries = [
    {
      countryCode: "US",
      countryCodePhoneNumber: "1",
      countryName: "United States",
    },
    { countryCode: "CN", countryCodePhoneNumber: "86", countryName: "China" },
    { countryCode: "IN", countryCodePhoneNumber: "91", countryName: "India" },
    {
      countryCode: "ID",
      countryCodePhoneNumber: "62",
      countryName: "Indonesia",
    },
    { countryCode: "BR", countryCodePhoneNumber: "55", countryName: "Brazil" },
    {
      countryCode: "PK",
      countryCodePhoneNumber: "92",
      countryName: "Pakistan",
    },
    {
      countryCode: "NG",
      countryCodePhoneNumber: "234",
      countryName: "Nigeria",
    },
    {
      countryCode: "BD",
      countryCodePhoneNumber: "880",
      countryName: "Bangladesh",
    },
    { countryCode: "RU", countryCodePhoneNumber: "7", countryName: "Russia" },
    { countryCode: "MX", countryCodePhoneNumber: "52", countryName: "Mexico" },
    { countryCode: "JP", countryCodePhoneNumber: "81", countryName: "Japan" },
    {
      countryCode: "PH",
      countryCodePhoneNumber: "63",
      countryName: "Philippines",
    },
    { countryCode: "EG", countryCodePhoneNumber: "20", countryName: "Egypt" },
    { countryCode: "DE", countryCodePhoneNumber: "49", countryName: "Germany" },
    {
      countryCode: "ET",
      countryCodePhoneNumber: "251",
      countryName: "Ethiopia",
    },
    { countryCode: "TR", countryCodePhoneNumber: "90", countryName: "Turkey" },
    { countryCode: "IR", countryCodePhoneNumber: "98", countryName: "Iran" },
    { countryCode: "VN", countryCodePhoneNumber: "84", countryName: "Vietnam" },
    {
      countryCode: "GB",
      countryCodePhoneNumber: "44",
      countryName: "United Kingdom",
    },
    { countryCode: "FR", countryCodePhoneNumber: "33", countryName: "France" },
  ];

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!contact || !countryCode || contact.length !== 10) {
      toast({
        title: "Missing phone no details",
        variant: "destructive",
      });
      return;
    }

    if (password === confirmPassword) {
      try {
        const contactNumber = `${countryCode}${contact}`;
        const res = await register({
          name,
          email,
          password,
          contactNumber,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/");
        toast({
          title: "Register Success!",
        });
      } catch (error) {
        console.log(error);
        toast({
          title: "Login Failed!",
          description: registerError,
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Passwords do not match!",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col w-full justify-center min-h-[63vh]">
      <Container>
        <Card className="mx-auto max-w-sm mt-4">
          <CardHeader>
            <CardTitle className="text-xl">Register</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="grid gap-4"
              onSubmit={(e) => handleRegisterSubmit(e)}
            >
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Max"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2 grid-cols-5">
                <div className="col-span-2">
                  <Label htmlFor="countryCode">Country Code</Label>
                  <Select
                    value={countryCode}
                    onValueChange={(e) => setCountrCode(e)}
                    required
                  >
                    <SelectTrigger
                      id="countryCode"
                      aria-label="Select Country Code"
                    >
                      <SelectValue placeholder="Country Code" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries?.map((country, index) => (
                        <SelectItem
                          key={index}
                          value={country?.countryCodePhoneNumber}
                        >
                          {country?.countryName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-3">
                  <Label htmlFor="contact">Phone Number</Label>
                  <Input
                    id="contact"
                    type="number"
                    placeholder="contact number"
                    value={contact}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
                      if (value.length <= 10) {
                        setContact(value);
                      }
                    }}
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                Create an account
              </Button>
              <GoogleAuthLogin />
            </form>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default Register;
