import React, { useState } from "react";
import { IoEyeOutline, IoEye } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { serverUrl } from "../App";
import { toast } from "react-toastify";
import { setUserData } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { auth, provider } from "../../utils/firebase";
import { signInWithPopup } from "firebase/auth";
import { FaArrowLeftLong } from "react-icons/fa6";

function Login() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data));
      toast.success("Login Successful");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
    setLoading(false);
  };

  const googleLogin = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      let user = response.user;

      const result = await axios.post(
        serverUrl + "/api/auth/googleauth",
        { name: user.displayName, email: user.email, role: "" },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data));
      navigate("/");
      toast.success("Logged In Successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Google login failed");
    }
  };

  return (
    <div className="bg-gray-100 w-screen h-screen flex items-center justify-center p-3">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="relative w-[95%] md:w-[750px] min-h-[500px] bg-white shadow-xl rounded-3xl flex overflow-hidden"
      >
        <FaArrowLeftLong
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 w-6 h-6 cursor-pointer text-teal-600 hover:text-teal-700 transition"
        />

        {/* LEFT */}
        <div className="md:w-[50%] w-full h-full flex flex-col items-center justify-center gap-4 p-6">
          <div className="text-center">
            <h1 className="font-bold text-gray-900 text-3xl">Welcome Back</h1>
            <p className="text-gray-500 text-[16px]">Log in to your account</p>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1 w-[90%]">
            <label className="font-medium">Email</label>
            <input
              type="text"
              className="border border-gray-300 rounded-lg h-11 px-4 focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col relative gap-1 w-[90%]">
            <label className="font-medium">Password</label>
            <input
              type={show ? "text" : "password"}
              className="border border-gray-300 rounded-lg h-11 px-4 focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {show ? (
              <IoEye
                onClick={() => setShow(false)}
                className="absolute right-3 bottom-3 w-5 h-5 cursor-pointer text-gray-500"
              />
            ) : (
              <IoEyeOutline
                onClick={() => setShow(true)}
                className="absolute right-3 bottom-3 w-5 h-5 cursor-pointer text-gray-500"
              />
            )}
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-[90%] h-11 bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow-md transition flex items-center justify-center"
          >
            {loading ? <ClipLoader size={25} color="white" /> : "Login"}
          </button>

          <span
            onClick={() => navigate("/forget")}
            className="text-sm cursor-pointer text-teal-600"
          >
            Forgot password?
          </span>

          {/* OR section */}
          <div className="w-[90%] flex items-center gap-3">
            <div className="flex-1 h-[1px] bg-gray-300"></div>
            <span className="text-gray-500">or continue with</span>
            <div className="flex-1 h-[1px] bg-gray-300"></div>
          </div>

          {/* Google Login */}
          <div
            onClick={googleLogin}
            className="w-[90%] h-11 border border-teal-600 rounded-xl flex items-center justify-center gap-2 cursor-pointer hover:bg-teal-50 transition"
          >
            <img src="/assets/google.jpg" className="w-[24px]" />
            <span className="text-gray-600 text-lg">Google</span>
          </div>

          {/* Signup Link */}
          <p className="text-gray-600">
            New here?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-teal-600 underline cursor-pointer"
            >
              Create account
            </span>
          </p>
        </div>

        {/* RIGHT */}
        <div className="hidden md:flex w-[50%] bg-teal-600 text-white items-center justify-center flex-col p-10">
          <img src="/assets/logo.jpg" className="w-32 rounded-xl shadow-lg" />
          <h1 className="text-3xl mt-3 font-semibold">MENTORA</h1>
          <p className="text-center mt-2 opacity-90">
            Smarter Learning. Faster Growth.
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
