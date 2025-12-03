import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../../App";
import { ClipLoader } from "react-spinners";
import { setLectureData } from "../../redux/lectureSlice";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";

function CreateLecture() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [lectureTitle, setLectureTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { lectureData } = useSelector((state) => state.lecture);

  const handleCreateLecture = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + `/api/lecture/create/${courseId}`,
        { lectureTitle },
        { withCredentials: true }
      );
      console.log(result.data);
      dispatch(setLectureData([...lectureData, result.data.lecture]));
      setLoading(false);
      toast.success("Lecture Added");
      setLectureTitle("");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const getCourseLecture = async () => {
      try {
        const result = await axios.get(
          serverUrl + `/api/lecture/courselecture/${courseId}`,
          { withCredentials: true }
        );
        console.log(result.data);
        dispatch(setLectureData(result.data.lectures));
      } catch (error) {
        console.log(error);
      }
    };
    getCourseLecture();
  }, [courseId]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
  <div className="bg-white shadow-xl rounded-2xl w-full max-w-2xl p-6">
    {/* Header */}
    <div className="mb-6 border-b pb-4 border-gray-200">
      <h1 className="text-2xl sm:text-3xl font-semibold text-teal-600 mb-1">
        Let's Add a Lecture
      </h1>
      <p className="text-sm text-gray-500">
        Enter the title and add your video lectures to enhance your course content.
      </p>
    </div>

    {/* Input */}
    <input
      onChange={(e) => setLectureTitle(e.target.value)}
      value={lectureTitle}
      type="text"
      className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all mb-4"
      placeholder="e.g. Introduction to MERN Stack"
    />

    {/* Buttons */}
    <div className="flex gap-4 mb-6">
      <button
        onClick={() => navigate(`/editcourse/${courseId}`)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-teal-600 hover:bg-teal-50 transition-all text-sm font-medium"
      >
        <FaArrowLeftLong />
        Back to Course
      </button>
      <button
        disabled={loading}
        onClick={handleCreateLecture}
        className="px-5 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-all text-sm font-medium shadow flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? <ClipLoader size={30} color="white" /> : "+ Create Lecture"}
      </button>
    </div>

    {/* Lecture List */}
    <div className="space-y-2 max-h-96 overflow-y-auto">
      {lectureData?.map((lecture, index) => (
        <div
          key={lecture._id}
          className="bg-gray-50 rounded-lg flex justify-between items-center p-3 text-sm font-medium text-gray-700 shadow-sm hover:shadow-md transition-all"
        >
          <span>
            Lecture - {index + 1} : {lecture.lectureTitle}
          </span>

          <FaEdit
            onClick={() =>
              navigate(`/editlecture/${courseId}/${lecture._id}`)
            }
            className="text-teal-500 hover:text-teal-700 cursor-pointer"
          />
        </div>
      ))}
    </div>
  </div>
</div>

  );
}

export default CreateLecture;
