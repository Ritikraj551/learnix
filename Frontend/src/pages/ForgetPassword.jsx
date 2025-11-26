import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const ForgetPassword = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [conpassword, setConpassword] = useState("");
  const [loading, setLoading] = useState(false);

  // for step1
  const sendOtp = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/sendotp",
        { email },
        { withCredentials: true }
      );
      console.log(result.data);
      setLoading(false);
      setStep(2);
      toast.success(result.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  // for step2
  const verifyOTP = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/verifyotp",
        { email, otp },
        { withCredentials: true }
      );
      console.log(result.data);
      setLoading(false);
      setStep(3);
      toast.success(result.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  // for step3
  const resetPassword = async () => {
    setLoading(true);
    try {
      if (newpassword !== conpassword) {
        return toast.error("Passwords do not match");
      }
      const result = await axios.post(
        serverUrl + "/api/auth/resetpassword",
        { email, password: newpassword },
        { withCredentials: true }
      );
      console.log(result.data);
      setLoading(false);
      navigate("/login");
      toast.success(result.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {/* Step 1 */}
      {step === 1 && (
        <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Forget Password
          </h2>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Enter your e-mail address
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                id="email"
                type="text"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="you@example.com"
              />
            </div>
            <button
              onClick={sendOtp}
              disabled={loading}
              className="w-full bg-black hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md font-medium cursor-pointer"
            >
              {loading ? <ClipLoader size={30} /> : "Send OTP"}
            </button>
          </form>
          <div
            onClick={() => navigate("/login")}
            className="text-sm text-center mt-4"
          >
            Back to login
          </div>
        </div>
      )}
      {/* Step 2 */}
      {step === 2 && (
        <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Enter OTP
          </h2>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700"
              >
                Please enter the OTP sent to your email
              </label>
              <input
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
                id="otp"
                type="text"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="* * * *"
              />
            </div>
            <button
              onClick={verifyOTP}
              disabled={loading}
              className="w-full bg-black hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md font-medium cursor-pointer"
            >
              {loading ? <ClipLoader size={30} color="white" /> : "Verify OTP"}
            </button>
          </form>
          <div
            onClick={() => navigate("/login")}
            className="text-sm text-center mt-4"
          >
            Back to login
          </div>
        </div>
      )}
      {/* Step 3 */}
      {step === 3 && (
        <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Reset Your Password
          </h2>
          <p className="text-2xl font-bold mb-6 text-center text-gray-800">
            Enter a new password below to regain access to your account
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                onChange={(e) => setNewPassword(e.target.value)}
                value={newpassword}
                id="password"
                type="text"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="********"
              />
            </div>
            <div>
              <label
                htmlFor="conpassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                onChange={(e) => setConpassword(e.target.value)}
                value={conpassword}
                id="conpassword"
                type="text"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="********"
              />
            </div>
            <button
              disabled={loading}
              onClick={resetPassword}
              className="w-full bg-black hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md font-medium cursor-pointer"
            >
              {loading ? (
                <ClipLoader size={30} color="white" />
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
          <div
            onClick={() => navigate("/login")}
            className="text-sm text-center mt-4"
          >
            Back to login
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;
