import { Button } from "./ui/button";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../Features/usersApiSlice";
import { setCredentials } from "../Features/authSlice";

const GoogleAuthLogin = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth(app);

  const [registerUser] = useRegisterMutation();
  const [loginUser] = useLoginMutation();

  const handleGoogleAuthSignUp = async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);

      const token = await resultsFromGoogle.user.getIdToken();
      const googleId = resultsFromGoogle?.user?.uid;

      const userPayload = {
        name: resultsFromGoogle?.user?.displayName,
        email: resultsFromGoogle?.user?.email,
        contactNumber: resultsFromGoogle?.user?.phoneNumber || 0,
        googleId: googleId, // Send googleId instead of password
      };

      const registerPayload = { ...userPayload };
      const loginPayload = {
        email: resultsFromGoogle?.user?.email,
        googleToken: token,
      };

      if (location.pathname.includes("register")) {
        try {
          const res = await registerUser(registerPayload);
          dispatch(setCredentials({ ...res }));
          navigate("/");
        } catch (error) {
          console.log(error);
          navigate("/register");
        }
      } else if (location.pathname.includes("login")) {
        try {
          const res = await loginUser(loginPayload);
          dispatch(setCredentials({ ...res }));
          navigate("/");
        } catch (error) {
          console.log(error);
          navigate("/login");
        }
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={(e) => handleGoogleAuthSignUp(e)}
    >
      {location.pathname.includes("register") ? "Sign up" : "Login"} with Google
    </Button>
  );
};

export default GoogleAuthLogin;
