import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import getCreatorCourse from "../../customHooks/getCreatorCourse";

const Courses = () => {
  const navigate = useNavigate();
  const { creatorCourseData } = useSelector((state) => state.course);

  getCreatorCourse();

  return (
    <div className="min-h-screen bg-[#ECF8FF] flex">
      <div className="w-full min-h-screen p-5 sm:p-8">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center gap-3 text-[#195D74]">
            <FaArrowLeftLong
              onClick={() => navigate("/dashboard")}
              className="w-[22px] h-[22px] cursor-pointer hover:text-[#0E3D4E]"
            />
            <h1 className="text-3xl font-semibold tracking-wide">
              All Created Courses
            </h1>
          </div>

          <button
            onClick={() => navigate("/createcourse")}
            className="bg-gradient-to-r from-[#63DDF0] to-[#3398A4] text-white px-6 py-2.5 rounded-xl shadow hover:opacity-90 transition"
          >
            + Create Course
          </button>
        </div>

        {/* Large Screen Table */}
        <div className="hidden md:block bg-white rounded-xl shadow-md border border-[#C7EEF5] p-5 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-[#F2FCFF] border-b border-[#CDECF3]">
              <tr className="text-[#195D74]">
                <th className="text-left py-3 px-4 font-semibold">Course</th>
                <th className="text-left py-3 px-4 font-semibold">Price</th>
                <th className="text-left py-3 px-4 font-semibold">Status</th>
                <th className="text-left py-3 px-4 font-semibold">Action</th>
              </tr>
            </thead>

            <tbody>
              {creatorCourseData?.map((course, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-[#F4FDFF] transition"
                >
                  <td className="py-4 px-4 flex items-center gap-4">
                    <img
                      src={course?.thumbnail || "/assets/empty.jpg"}
                      className="w-24 h-14 rounded-lg object-cover shadow-sm border border-[#DCEFF2]"
                    />
                    <span className="font-medium text-[#0E3D4E]">
                      {course?.title}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-[#337B8B] font-semibold">
                    {course?.price ? `₹${course.price}` : "₹ NA"}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        course?.isPublished
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {course?.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <FaEdit
                      onClick={() => navigate(`/editcourse/${course?._id}`)}
                      className="text-[#195D74] hover:text-[#3398A4] cursor-pointer text-lg"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="text-center text-sm text-gray-400 mt-6">
            A list of your courses
          </p>
        </div>

        {/* Mobile View Cards */}
        <div className="md:hidden space-y-4 mt-4">
          {creatorCourseData?.map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-4 border border-[#C7EEF5]"
            >
              <div className="flex gap-4 items-center">
                <img
                  src={course?.thumbnail || "/assets/empty.jpg"}
                  className="w-16 h-16 rounded-lg object-cover border border-[#C7EEF5]"
                />

                <div className="flex-1">
                  <h2 className="font-semibold text-[#195D74] text-sm">
                    {course.title}
                  </h2>
                  <p className="text-[#337B8B] text-xs mt-1">
                    {course?.price ? `₹${course.price}` : "₹ NA"}
                  </p>
                </div>

                <FaEdit
                  onClick={() => navigate(`/editcourse/${course?._id}`)}
                  className="text-[#195D74] hover:text-[#3398A4] cursor-pointer"
                />
              </div>

              <span
                className={`mt-3 inline-block px-3 py-1 text-xs rounded-full font-medium ${
                  course?.isPublished
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {course?.isPublished ? "Published" : "Draft"}
              </span>
            </div>
          ))}

          <p className="text-center text-sm text-gray-400 mt-4">
            A list of your courses
          </p>
        </div>
      </div>
    </div>
  );
};

export default Courses;
