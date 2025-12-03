import React from "react";
import { MdCastForEducation } from "react-icons/md";
import { SiOpenaccess } from "react-icons/si";
import { FaSackDollar } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";

function Logos() {
  const items = [
    {
      icon: <MdCastForEducation className="w-[32px] h-[32px]" />,
      text: "Learn From 20k+ Courses",
    },
    {
      icon: <SiOpenaccess className="w-[32px] h-[32px]" />,
      text: "Unlimited Lifetime Access",
    },
    {
      icon: <FaSackDollar className="w-[32px] h-[32px]" />,
      text: "Affordable & Worth Every Penny",
    },
    {
      icon: <BiSupport className="w-[32px] h-[32px]" />,
      text: "24/7 Dedicated Support",
    },
    {
      icon: <FaUsers className="w-[32px] h-[32px]" />,
      text: "Active Learner Community",
    },
  ];

  return (
    <div className="w-screen min-h-[90px] flex flex-wrap items-center justify-center gap-4 md:mb-[50px] px-3 py-8">
      {items.map((item, index) => (
        <div
          key={index}
          className="
            flex items-center justify-center gap-3 
            px-6 py-3 rounded-3xl cursor-pointer
            bg-gradient-to-r from-[#1fa487]/20 to-[#29d7c3]/20
            text-[#0b433a] font-medium backdrop-blur-xl
            hover:scale-105 transition-all duration-300
            shadow-sm hover:shadow-md
          "
        >
          <span className="text-[#0b433a]">{item.icon}</span>
          <span className="text-[15px] md:text-[16px]">{item.text}</span>
        </div>
      ))}
    </div>
  );
}

export default Logos;
