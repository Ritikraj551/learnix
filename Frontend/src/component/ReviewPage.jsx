import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReviewCard from "./ReviewCard";

function ReviewPage() {
  const { reviewData } = useSelector((state) => state.review);
  const [latestReview, setLatestReview] = useState([]);

  useEffect(() => {
    if (Array.isArray(reviewData)) {
      setLatestReview(reviewData.slice(0, 6));
    } else {
      setLatestReview([]);
    }
  }, [reviewData]);

  return (
    <div className="flex flex-col items-center justify-center w-full bg-[#f8fafc] py-14">
      {/* Heading */}
      <h1 className="text-[30px] md:text-[45px] font-bold text-center px-5 leading-tight text-[#03394b]">
        Real Reviews for Real Courses
      </h1>

      {/* Subheading */}
      <p className="mt-4 mb-12 text-center text-[15px] md:text-[17px] text-gray-600 px-5 lg:w-[55%] md:w-[75%] leading-relaxed">
        Discover how our courses are transforming learning experiences through
        real feedback from students and professionals worldwide.
      </p>

      {/* Reviews Grid */}
      <div
        className="w-full flex flex-wrap items-center justify-center gap-8 lg:gap-10 
                      px-3 md:px-8 lg:px-12 mb-10"
      >
        {latestReview.length > 0 ? (
          latestReview.map((review, index) => (
            <ReviewCard
              key={review._id || index}
              comment={review.comment}
              rating={review.rating}
              photoUrl={review.photoUrl || "/assets/empty.jpg"}
              courseTitle={review.courseTitle || "Course"}
              description={review.description || ""}
              name={review.name || "Anonymous User"}
            />
          ))
        ) : (
          <p className="text-gray-500 text-lg">No reviews available yet.</p>
        )}
      </div>
    </div>
  );
}

export default ReviewPage;
