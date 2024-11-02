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
import { useLoginMutation } from "../Features/usersApiSlice";
import { useState } from "react";
import { setCredentials } from "../Features/authSlice";
import { useToast } from "../components/ui/use-toast";
import GoogleAuthLogin from "../components/GoogleAuthLogin";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [login, { isLoading: loginLoading, error: loginError }] =
    useLoginMutation();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
      toast({
        title: "Login Success!",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Login Failed!",
        description: error?.message || error?.data?.message,
        variant: "destructive",
      });
    }
  };

  const togglePasswordView = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex flex-col w-full justify-center min-h-[63vh]">
      <Container>
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4" onSubmit={(e) => handleLoginSubmit(e)}>
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
              <div className="grid gap-2 relative">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgotPassword"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type={!showPassword ? "password" : "text"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Eye
                  className={`h-4 w-4 absolute top-[38px] right-[10px] text-primary hover:cursor-pointer ${
                    showPassword ? "hidden" : ""
                  }`}
                  onClick={togglePasswordView}
                />
                <EyeOff
                  className={`h-4 w-4 absolute absolute top-[38px] right-[10px] text-primary hover:cursor-pointer ${
                    !showPassword ? "hidden" : ""
                  }`}
                  onClick={togglePasswordView}
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <GoogleAuthLogin />
            </form>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
