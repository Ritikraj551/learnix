import React from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Card({ thumbnail, title, category, price, id, reviews }) {
  const navigate = useNavigate();

  const calculateAvgReview = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const avgRating = calculateAvgReview(reviews);

  return (
    <div
      onClick={() => navigate(`/viewcourse/${id}`)}
      className="w-full max-w-sm bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 cursor-pointer flex flex-col"
    >
      {/* Thumbnail */}
      <img
        src={thumbnail || "/assets/empty.jpg"}
        alt={title}
        className="w-full h-48 object-cover rounded-t-2xl"
      />

      {/* Content */}
      <div className="p-5 flex flex-col gap-2">
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900 line-clamp-2">{title}</h2>

        {/* Category */}
        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm capitalize">
          {category}
        </span>

        {/* Price & Rating */}
        <div className="flex justify-between items-center mt-3 text-gray-800 font-medium">
          <span className="text-teal-600 text-lg font-semibold">₹{price}</span>
          <span className="flex items-center gap-1 text-yellow-500">
            <FaStar /> {avgRating}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;
