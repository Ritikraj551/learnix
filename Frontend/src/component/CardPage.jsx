import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "./Card";

function CardPage() {
  const { courseData } = useSelector((state) => state.course);
  const [popularCourses, setPopularCourses] = useState([]);

  useEffect(() => {
    // Display top 6 courses (could sort by popularity if available)
    setPopularCourses(courseData?.slice(0, 6));
  }, [courseData]);

  return (
    <div className="relative flex flex-col items-center justify-center px-5 py-20">
      {/* Heading */}
      <h1 className="text-center text-3xl md:text-5xl font-semibold mt-8">
        Our Popular Courses
      </h1>

      {/* Subtitle */}
      <p className="text-center text-sm md:text-base text-gray-600 mt-4 mb-10 max-w-3xl">
        Explore top-rated courses designed to boost your skills, enhance
        careers, and unlock opportunities in tech, AI, business, and beyond.
      </p>

      {/* Cards Grid */}
      <div className="w-full flex flex-wrap justify-center gap-6 md:gap-10 lg:gap-12">
        {popularCourses?.map((course, index) => (
          <Card
            key={index}
            thumbnail={course.thumbnail}
            title={course.title}
            category={course.category}
            price={course.price}
            id={course._id}
            reviews={course.reviews}
          />
        ))}
      </div>
    </div>
  );
}

export default CardPage;
