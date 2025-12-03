import React from "react";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#0b0f12] text-gray-300 pt-14 pb-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">

        {/* Brand Section */}
        <div className="lg:w-1/3 w-full">
          <img
            src="/assets/logo.jpg"
            alt="Mentora logo"
            className="h-12 mb-4 rounded-lg shadow-md"
          />

          <h2 className="text-2xl font-bold text-white tracking-wide">
            Mentora
          </h2>

          <p className="text-sm mt-3 leading-relaxed text-gray-400">
            Your AI-powered learning companion.  
            Empower your growth with expert-led courses, smart recommendations,
            and personalized learning experiences.
          </p>
        </div>

        {/* Links Section */}
        <div className="lg:w-2/3 w-full flex flex-wrap gap-10">

          {/* Quick Links */}
          <div className="flex-1 min-w-[150px]">
            <h3 className="text-white text-lg font-semibold mb-4 tracking-wide">
              Quick Links
            </h3>
            <ul className="text-sm space-y-3">
              <li
                onClick={() => navigate("/")}
                className="hover:text-white hover:translate-x-1 transition-all cursor-pointer"
              >
                Home
              </li>
              <li
                onClick={() => navigate("/allcourses")}
                className="hover:text-white hover:translate-x-1 transition-all cursor-pointer"
              >
                All Courses
              </li>
              <li
                onClick={() => navigate("/login")}
                className="hover:text-white hover:translate-x-1 transition-all cursor-pointer"
              >
                Login
              </li>
              <li
                onClick={() => navigate("/profile")}
                className="hover:text-white hover:translate-x-1 transition-all cursor-pointer"
              >
                My Profile
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="flex-1 min-w-[150px]">
            <h3 className="text-white text-lg font-semibold mb-4 tracking-wide">
              Categories
            </h3>
            <ul className="text-sm space-y-3">
              <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                Web Development
              </li>
              <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                App Development
              </li>
              <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                AI / Machine Learning
              </li>
              <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                UI / UX Design
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="border-t border-gray-700 mt-12 pt-5 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Mentora — Built for learners, by innovators.
      </div>
    </footer>
  );
}

export default Footer;
