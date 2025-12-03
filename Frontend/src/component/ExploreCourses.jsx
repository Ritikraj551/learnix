import React from "react";
import { SiViaplay } from "react-icons/si";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { LiaUikit } from "react-icons/lia";
import { MdAppShortcut } from "react-icons/md";
import { FaHackerrank } from "react-icons/fa";
import { AiFillOpenAI } from "react-icons/ai";
import { SiGoogledataproc } from "react-icons/si";
import { BsClipboard2DataFill } from "react-icons/bs";
import { FaTools } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ExploreCourses() {
  const navigate = useNavigate();

  const cards = [
    { icon: <TbDeviceDesktopAnalytics className="w-[42px] h-[42px]" />, label: "Web Development" },
    { icon: <LiaUikit className="w-[42px] h-[42px]" />, label: "UI / UX Design" },
    { icon: <MdAppShortcut className="w-[42px] h-[42px]" />, label: "App Development" },
    { icon: <FaHackerrank className="w-[42px] h-[42px]" />, label: "Ethical Hacking" },
    { icon: <AiFillOpenAI className="w-[42px] h-[42px]" />, label: "AI & ML" },
    { icon: <SiGoogledataproc className="w-[42px] h-[42px]" />, label: "Data Science" },
    { icon: <BsClipboard2DataFill className="w-[42px] h-[42px]" />, label: "Data Analytics" },
    { icon: <FaTools className="w-[42px] h-[42px]" />, label: "AI Tools" },
  ];

  return (
    <div className="w-screen min-h-[50vh] lg:h-[50vh] flex flex-col lg:flex-row items-center justify-center gap-4 px-[30px]">

      {/* Left Section */}
      <div className="w-full lg:w-[350px] lg:h-full h-[400px] flex flex-col items-start justify-center gap-2 md:px-10 px-5">
        <span className="text-[38px] font-semibold bg-gradient-to-r from-[#1fa487] to-[#29d7c3] text-transparent bg-clip-text">
          Explore
        </span>
        <span className="text-[38px] font-semibold bg-gradient-to-r from-[#29d7c3] to-[#1fa487] text-transparent bg-clip-text">
          Our Courses
        </span>

        <p className="text-[16px] text-gray-600 leading-relaxed">
          Unlock a wide range of curated, industry-ready courses designed to sharpen
          your skills and elevate your career. Learn by doing, and grow with expert guidance.
        </p>

        <button
          onClick={() => navigate("/allcourses")}
          className="
            cursor-pointer px-6 py-2.5 rounded-xl text-[18px] font-light mt-8 
            flex gap-2 items-center border border-[#1fa487]
            bg-[#1fa487] text-white hover:bg-[#168e71]
            transition-all duration-300
          "
        >
          Explore Courses
          <SiViaplay className="w-[28px] h-[28px] fill-white" />
        </button>
      </div>

      {/* Right Section */}
      <div className="w-[720px] max-w-[90%] lg:h-[300px] md:min-h-[300px] flex items-center justify-center lg:gap-[55px] gap-[45px] flex-wrap mb-[50px] lg:mb-0">

        {cards.map((item, index) => (
          <div
            key={index}
            className="
              w-[100px] h-[130px] text-[13px] font-medium text-center 
              flex flex-col gap-3 cursor-pointer
              hover:scale-105 transition-all duration-300
            "
          >
            <div
              className="
                w-[100px] h-[90px] rounded-xl flex items-center justify-center shadow-sm
                bg-gradient-to-br from-[#e0faf4] to-[#f0fffd]
                border border-[#c7f4e8]
                hover:shadow-md
              "
            >
              <span className="text-[#0b433a]">{item.icon}</span>
            </div>

            <span className="text-[#0b433a]">{item.label}</span>
          </div>
        ))}

      </div>
    </div>
  );
}

export default ExploreCourses;
