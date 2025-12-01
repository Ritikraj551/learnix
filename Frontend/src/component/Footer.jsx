import React from "react";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="bg-black text-gray-300 py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 lg:items-start">
        <div className="lg:w-1/3 w-full">
          <img
            src="/assets/logo.jpg"
            alt="Mentora logo"
            className="h-10 mb-3 rounded"
          />
          <h2 className="text-xl font-bold text-white mb-3">Mentora</h2>
          <p className="text-sm">
            AI Powered learning platform to help you grow smarter. Learn
            anything, anytime, anywhere.
          </p>
        </div>

        <div className="lg:w-2/3 w-full flex gap-8">
          <div className="flex-1">
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <ul className="text-sm space-y-2">
              <li
                onClick={() => navigate("/")}
                className="hover:text-white cursor-pointer"
              >
                Home
              </li>
              <li
                onClick={() => navigate("/allcourses")}
                className="hover:text-white cursor-pointer"
              >
                All Courses
              </li>
              <li
                onClick={() => navigate("/login")}
                className="hover:text-white cursor-pointer"
              >
                Login
              </li>
              <li
                onClick={() => navigate("/profile")}
                className="hover:text-white cursor-pointer"
              >
                My Profile
              </li>
            </ul>
          </div>

          <div className="flex-1">
            <h3 className="text-white font-semibold mb-3">Categories</h3>
            <ul className="text-sm space-y-2">
              <li className="hover:text-white cursor-pointer">
                Web Development
              </li>
              <li className="hover:text-white cursor-pointer">
                App Development
              </li>
              <li className="hover:text-white cursor-pointer">AI/ML</li>
              <li className="hover:text-white cursor-pointer">
                UI/UX Designing
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-5 text-sm text-center text-gray-500">
        © {new Date().getFullYear()} Mentora. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
