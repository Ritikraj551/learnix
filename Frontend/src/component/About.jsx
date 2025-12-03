import React from "react";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { BsFillPatchCheckFill } from "react-icons/bs";

function About() {
  return (
    <div className="w-screen lg:h-[75vh] min-h-[55vh] flex flex-wrap items-center justify-center gap-6 mb-10 px-4">
      
      {/* Left — Image + Video */}
      <div className="lg:w-[40%] md:w-[80%] w-full h-full flex items-center justify-center relative">
        <img
          src="/assets/about.jpg"
          className="w-[85%] h-[90%] object-cover rounded-3xl shadow-lg"
        />
        <div className="max-w-[320px] p-3 absolute top-[58%] left-[50%] -translate-x-1/2 -translate-y-1/2">
          <video
            controls
            autoPlay
            loop
            src="/assets/video.mp4"
            className="w-full rounded-xl shadow-xl border border-white"
          />
        </div>
      </div>

      {/* Right — Text */}
      <div className="lg:w-[50%] md:w-[75%] w-full flex flex-col gap-5 px-6 md:px-20">
        
        <div className="flex items-center gap-4 text-lg font-medium">
          <span>About Us</span>
          <TfiLayoutLineSolid className="w-8 h-8" />
        </div>

        <h1 className="text-[32px] md:text-[44px] font-bold leading-tight">
          We Will Maximize Your Learning Growth
        </h1>

        <p className="text-[16px] text-gray-700 leading-relaxed">
          We provide a modern Learning Management System to simplify online
          education, track progress, and enhance student-instructor collaboration
          efficiently.
        </p>

        {/* Feature List */}
        <div className="w-full lg:w-[70%] space-y-6 mt-4">
          <div className="flex items-center justify-between">
            <Feature label="Simplified Learning" />
            <Feature label="Expert Trainers" />
          </div>

          <div className="flex items-center justify-between">
            <Feature label="Greater Experience" />
            <Feature label="Lifetime Access" />
          </div>
        </div>

      </div>
    </div>
  );
}

const Feature = ({ label }) => (
  <div className="flex items-center gap-2 text-gray-800 text-[15px] md:text-[16px]">
    <BsFillPatchCheckFill className="w-5 h-5 text-green-600" />
    {label}
  </div>
);

export default About;
