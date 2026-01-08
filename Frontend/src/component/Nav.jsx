import React, { useState } from "react";
import { IoPersonCircle } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { GiSplitCross } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { toast } from "react-toastify";

function Nav() {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showHam, setShowHam] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      toast.success("Logout Successful");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout Failed");
    }
  };

  return (
    <div className="fixed top-0 w-full z-50 shadow-md bg-gradient-to-r from-black/80 to-gray-900/70 backdrop-blur-sm">
      <div className="flex items-center justify-between h-[70px] px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/assets/logo.jpg"
            alt="logo"
            className="w-14 h-14 rounded-md border-2 border-white"
          />
          <span className="text-white font-bold text-xl hidden lg:block">
            Learnix
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-4">
          {!userData && (
            <IoPersonCircle
              onClick={() => setShow((prev) => !prev)}
              className="w-12 h-12 fill-white cursor-pointer hover:scale-110 transition"
            />
          )}

          {userData && (
            <>
              {userData.photoUrl ? (
                <img
                  onClick={() => setShow((prev) => !prev)}
                  src={userData.photoUrl}
                  className="w-12 h-12 rounded-full border-2 border-white cursor-pointer hover:scale-105 transition"
                />
              ) : (
                <div
                  onClick={() => setShow((prev) => !prev)}
                  className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-800 text-white font-semibold text-lg border-2 border-white cursor-pointer hover:scale-105 transition"
                >
                  {userData.name?.charAt(0).toUpperCase()}
                </div>
              )}
            </>
          )}

          {userData?.role === "educator" && (
            <button
              onClick={() => navigate("/dashboard")}
              className="px-5 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-500 transition"
            >
              Dashboard
            </button>
          )}

          {!userData ? (
            <button
              onClick={() => navigate("/login")}
              className="px-5 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-black transition"
            >
              Login
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition"
            >
              Logout
            </button>
          )}

          {show && (
            <div className="absolute top-[70px] right-20 bg-white shadow-lg rounded-lg flex flex-col py-2 w-44">
              <button
                onClick={() => navigate("/profile")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-t-lg"
              >
                My Profile
              </button>
              <button
                onClick={() => navigate("/mycourses")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-b-lg"
              >
                My Courses
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <RxHamburgerMenu
          onClick={() => setShowHam((prev) => !prev)}
          className="w-10 h-10 text-white lg:hidden cursor-pointer"
        />

        {/* Mobile Fullscreen Menu */}
        {showHam && (
          <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center gap-6 z-50 transition-all">
            <GiSplitCross
              onClick={() => setShowHam(false)}
              className="w-10 h-10 fill-white absolute top-6 right-6 cursor-pointer"
            />

            {!userData && <IoPersonCircle className="w-14 h-14 fill-white" />}

            {userData && (
              <>
                {userData.photoUrl ? (
                  <img
                    src={userData.photoUrl}
                    className="w-14 h-14 rounded-full border-2 border-white"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full flex items-center justify-center bg-gray-800 text-white font-semibold text-lg border-2 border-white">
                    {userData.name?.charAt(0).toUpperCase()}
                  </div>
                )}
              </>
            )}

            <button
              onClick={() => navigate("/profile")}
              className="w-48 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-500 transition"
            >
              My Profile
            </button>
            <button
              onClick={() => navigate("/mycourses")}
              className="w-48 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-500 transition"
            >
              My Courses
            </button>
            {userData?.role === "educator" && (
              <button
                onClick={() => navigate("/dashboard")}
                className="w-48 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-500 transition"
              >
                Dashboard
              </button>
            )}
            {!userData ? (
              <button
                onClick={() => navigate("/login")}
                className="w-48 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition"
              >
                Login
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="w-48 py-3 bg-red-600 text-white rounded-lg hover:bg-red-500 transition"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Nav;
