import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "../App";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaPlayCircle } from "react-icons/fa";

function ViewLectures() {
  const { courseId } = useParams();
  const { courseData } = useSelector((state) => state.course);
  const { userData } = useSelector((state) => state.user);
  const selectedCourse = courseData?.find((course) => course._id === courseId);
  const navigate = useNavigate();
  const [creatorData, setCreatorData] = useState(null);
  const [selectedLecture, setSelectedLecture] = useState(
    selectedCourse?.lectures?.[0] || null
  );
  useEffect(() => {
    const handleCreator = async () => {
      if (selectedCourse?.creator) {
        try {
          const result = await axios.post(
            serverUrl + `/api/course/creator`,
            { userId: selectedCourse?.creator },
            { withCredentials: true }
          );
          console.log(result.data);
          setCreatorData(result.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    handleCreator();
  }, [selectedCourse]);

  return (
     <div className="min-h-screen bg-[#0b0f12] p-6 flex flex-col md:flex-row gap-6 text-gray-200">
      {/* Left Section: Video */}
      <div className="w-full md:w-2/3 bg-[#1c1f23] rounded-2xl shadow-lg p-6 border border-gray-700">
        <div className="mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-5 text-white">
            <FaArrowLeftLong
              onClick={() => navigate(-1)}
              className="w-[22px] h-[22px] cursor-pointer text-white"
            />
            {selectedCourse?.title}
          </h2>
          <div className="mt-2 flex gap-4 text-sm text-gray-400 font-medium">
            <span>Category: {selectedCourse?.category}</span>
            <span>Level: {selectedCourse?.level}</span>
          </div>
        </div>

        {/* Video Player */}
        <div className="aspect-video bg-black rounded-xl overflow-hidden mb-4 border border-gray-700">
          {selectedLecture?.videoUrl ? (
            <video
              src={selectedLecture?.videoUrl}
              controls
              className="w-full h-full object-cover bg-black"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              Select a lecture to start watching
            </div>
          )}
        </div>

        <div className="mt-2">
          <h2 className="text-xl font-semibold text-white">
            {selectedLecture?.lectureTitle}
          </h2>
        </div>
      </div>

      {/* Right Section: Lectures & Educator */}
      <div className="w-full md:w-1/3 bg-[#1c1f23] rounded-2xl shadow-lg p-6 border border-gray-700 h-fit">
        <h2 className="text-xl font-bold mb-4 text-white">All Lectures</h2>
        <div className="flex flex-col gap-3 mb-6 max-h-[500px] overflow-y-auto">
          {selectedCourse?.lectures?.length > 0 ? (
            selectedCourse?.lectures?.map((lecture, index) => (
              <button
                key={index}
                onClick={() => setSelectedLecture(lecture)}
                className={`flex items-center justify-between p-3 rounded-lg border transition text-left ${
                  selectedLecture?._id === lecture._id
                    ? "bg-[#2a2e33] border-gray-500"
                    : "hover:bg-[#292c30] border-gray-600"
                }`}
              >
                <h2 className="text-sm font-semibold text-gray-200">
                  {lecture.lectureTitle}
                </h2>
                <FaPlayCircle className="text-lg text-white" />
              </button>
            ))
          ) : (
            <p className="text-gray-400">No lecture available</p>
          )}
        </div>

        {/* Educator Info */}
        {creatorData && (
          <div className="mt-4 border-t border-gray-700 pt-4">
            <h3 className="text-md font-semibold text-gray-200 mb-3">
              Educator
            </h3>
            <div className="flex items-center gap-4">
              <img
                src={creatorData?.photoUrl}
                className="w-14 h-14 rounded-full object-cover border border-gray-500"
              />
              <div className="flex flex-col">
                <h2 className="text-base font-medium text-white">
                  {creatorData?.name}
                </h2>
                <p className="text-sm text-gray-400">{creatorData?.description}</p>
                <p className="text-sm text-gray-400">{creatorData?.email}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewLectures;
