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
  useLoginMutation,
  useOtpGenerateMutation,
  useOtpVerificationMutation,
  useUpdatePasswordMutation,
  useValidateUserMutation,
} from "../Features/usersApiSlice";
import { useEffect, useState } from "react";
import { setCredentials } from "../Features/authSlice";
import { useToast } from "../components/ui/use-toast";
import GoogleAuthLogin from "../components/GoogleAuthLogin";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../components/ui/input-otp";

const ForgotPassword = () => {
  const [recoveryStep, setRecoveryStep] = useState("Account Retreival");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userId, setUserId] = useState("");
  const [emailEnd, setEmailEnd] = useState("");
  const [proceed, setProceed] = useState(false);
  const [proceedToReset, setProceedToReset] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordCnf, setNewPasswordCnf] = useState("");
  const [disableOtpBtn, setDisableOtpBtn] = useState(false);
  const [remainingOtpRequestCount, setRemainingOtpRequestCount] = useState(0);
  const [resendOtpCounter, setResendOtpCounter] = useState(60);
  const [counterState, setCounterState] = useState("");

  //validateEmail
  const [validateEmail] = useValidateUserMutation();

  //generate opt
  const [
    generateOtp,
    { isLoading: generateOtpLoading, error: generateOtpError },
  ] = useOtpGenerateMutation();

  //verify otp
  const [verifyOtp, { isLoading: verifyOtpLoading, error: verifyOtpError }] =
    useOtpVerificationMutation();

  //update Password
  const [
    updatePassword,
    { isLoading: updatePasswordLoading, error: updatePasswordError },
  ] = useUpdatePasswordMutation();

  const handleValidateUser = async (e) => {
    e.preventDefault();
    try {
      const res = await validateEmail({ emailToValidate: email }).unwrap();
      setUserId(res?.userId);
      setEmailEnd(res?.emailEnd);
      setRemainingOtpRequestCount(3 - res?.otpRequestCount);
      setRecoveryStep("Generate OTP");
    } catch (error) {
      toast({
        title: error?.message || error?.data?.message,
        variant: "destructive",
      });
    }
  };

  const handleSendOtp = async () => {
    try {
      const res = await generateOtp({ userId }).unwrap();
      setProceed(res.proceed);
      setDisableOtpBtn(true);
      setRemainingOtpRequestCount(3 - res?.otpRequestCount);
      setRecoveryStep("OTP Verification");
      setCounterState("started");
    } catch (error) {
      toast({
        title: error?.message || error?.data?.message,
        variant: "destructive",
      });
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await verifyOtp({ otp, userId }).unwrap();
      if (res.proceed) {
        setProceedToReset(true);
        setRecoveryStep("Update Password");
      } else {
        toast({
          title: "Failed to verify OTP",
          description: res?.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: error?.message || error?.data?.message,
        variant: "destructive",
      });
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      if (newPassword !== newPasswordCnf) {
        toast({
          title: "Password do not match!",
          variant: "destructive",
        });
        return;
      } else {
        await updatePassword({ userId, newPassword });
        navigate("/login");
        toast({
          title: "Password reset successfull, please login!",
        });
      }
    } catch (error) {
      toast({
        title: error?.message || error?.data?.message,
        variant: "destructive",
      });
    }
  };

  //counter for resending the OTP
  useEffect(() => {
    if (counterState === "started") {
      const timer = setInterval(() => {
        setResendOtpCounter((prevstate) => Number(prevstate) - 1);
      }, 1000);

      if (resendOtpCounter === 0) {
        clearInterval(timer);
        setCounterState("completed");
        setResendOtpCounter(60);
      }
      //clear subscription
      return () => clearInterval(timer);
    }
  }, [resendOtpCounter, counterState]);

  return (
    <div className="flex flex-col w-full justify-center min-h-[63vh]">
      <Container>
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl tracking-wide">
              {" "}
              Password Recovery
            </CardTitle>
            <CardDescription>
              Enter your email below begin password recovery
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4 flex-col">
            <Card className="p-2">
              <CardTitle className="tracking-wide">{recoveryStep}</CardTitle>
            </Card>
            <form
              className={`grid gap-4 ${
                recoveryStep !== "Account Retreival" ? "hidden" : ""
              }`}
              onSubmit={(e) => handleValidateUser(e)}
            >
              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className={`w-full ${userId ? "hidden" : ""}`}
              >
                Proceed
              </Button>
            </form>
            {userId && emailEnd && (
              <div className={`flex gap-2 flex-col `}>
                {/* <h3 className=" font-medium p-4 pt-0 pb-0">SEND OTP</h3> */}
                <p className="text-muted-foreground text-sm pb-4">
                  Send OTP to your email address ending with{" "}
                  <span className="font-medium italic">{emailEnd}</span>
                </p>
                <p className="text-xs">
                  Remaining attempts to send OTP:{" "}
                  <span className="text-primary font-medium">
                    {remainingOtpRequestCount}
                  </span>
                </p>
                {remainingOtpRequestCount < 3 &&
                  (counterState === "started" ? (
                    <p className="text-xs font-medium">
                      Resend OTP in{" "}
                      <span className="text-primary font-medium">
                        {Number(resendOtpCounter)}
                      </span>{" "}
                      seconds
                    </p>
                  ) : (
                    <p className="text-xs font-medium">Resend OTP now</p>
                  ))}
                <Button
                  onClick={handleSendOtp}
                  disabled={counterState === "started"}
                >
                  {remainingOtpRequestCount < 3 ? "Resend OTP" : "Send OTP"}
                </Button>
              </div>
            )}
            {userId && emailEnd && proceed && (
              <form
                className={`grid gap-4 ${
                  recoveryStep !== "OTP Verification" ? "hidden" : ""
                }`}
                onSubmit={(e) => handleVerifyOtp(e)}
              >
                <div className="grid gap-2 mb-2">
                  <Label htmlFor="otp" className="text-lg">
                    One-Time Password
                  </Label>
                  <div className="space-y-2 flex items-center justify-center flex-col">
                    <InputOTP
                      maxLength={6}
                      value={otp}
                      onChange={(value) => setOtp(value)}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Verify OTP
                </Button>
              </form>
            )}

            {userId && emailEnd && proceed && proceedToReset && (
              <form
                className={`grid gap-4 ${
                  recoveryStep !== "Update Password" ? "hidden" : ""
                }`}
                onSubmit={(e) => handlePasswordReset(e)}
              >
                <div className="grid gap-2">
                  <Label htmlFor="new-pass">New Password</Label>
                  <Input
                    id="new-pass"
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="new-pass-cnf">Confirm New Password</Label>
                  <Input
                    id="new-pass-cnf"
                    type="password"
                    placeholder="Confirm new password"
                    value={newPasswordCnf}
                    onChange={(e) => {
                      setNewPasswordCnf(e.target.value);
                    }}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Proceed
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default ForgotPassword;
