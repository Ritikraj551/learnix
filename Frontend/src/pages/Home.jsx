import React from "react";
import Nav from "../component/Nav";
import { SiViaplay } from "react-icons/si";
import Logos from "../component/Logos";
import ExploreCourses from "../component/ExploreCourses";
import CardPage from "../component/CardPage";
import { useNavigate } from "react-router-dom";
import About from "../component/About";
import Footer from "../component/Footer";
import ReviewPage from "../component/ReviewPage";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full overflow-hidden">
      <div className="w-full lg:h-[140vh] h-[70vh] relative">
  <Nav />
  
  {/* Hero Image with dark overlay */}
  <div className="absolute inset-0">
    <img
      src="/assets/home1.jpg"
      className="w-full h-full object-cover"
      alt="Hero"
    />
    <div className="absolute inset-0 bg-black/50"></div> {/* dark overlay */}
  </div>

  {/* Hero Content */}
  <div className="absolute top-[10%] lg:top-[10%] w-full flex flex-col items-center text-center px-5">
    <h1 className="text-white font-bold text-[20px] md:text-[40px] lg:text-[70px] leading-tight drop-shadow-lg">
      Grow Your Skills to Advance <br /> Your Career Path
    </h1>

    <p className="text-gray-300 text-sm md:text-lg mt-4 max-w-2xl">
      Explore top courses designed to boost your skills, enhance careers, 
      and unlock opportunities in tech, AI, business, and beyond.
    </p>

    <div className="mt-6 flex flex-wrap justify-center gap-3">
      <button
        onClick={() => navigate("/allcourses")}
        className="px-5 py-2.5 border-2 lg:border-white border-black lg:text-white text-black rounded-[10px] text-[18px] font-light flex gap-2 items-center hover:bg-teal-200/50 hover:text-black transition-colors duration-300"
      >
        View All Courses
        <SiViaplay className="w-[30px] h-[30px] lg:fill-white fill-black" />
      </button>

      <button
        onClick={() => navigate("/search")}
        className="px-5 py-2.5 lg:bg-white bg-black border-2 lg:border-white border-black lg:text-black text-white rounded-[10px] text-[18px] font-light flex gap-2 items-center hover:bg-teal-400/50 hover:text-white transition-colors duration-300"
      >
        Search With AI
        <img
          src="/assets/ai.png"
          className="w-[30px] h-[30px] rounded-full hidden lg:block"
          alt="AI"
        />
        <img
          src="/assets/SearchAi.png"
          className="w-[35px] h-[35px] rounded-full lg:hidden"
          alt="AI"
        />
      </button>
    </div>
  </div>
</div>


      <Logos />
      <ExploreCourses />
      <CardPage />
      <About />
      <ReviewPage />
      <Footer />
    </div>
  );
};

export default Home;
