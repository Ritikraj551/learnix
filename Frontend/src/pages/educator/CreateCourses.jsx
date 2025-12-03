import axios from "axios";
import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const CreateCourses = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateCourse = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/course/create",
        { title, category },
        { withCredentials: true }
      );
      setLoading(false);
      toast.success("Course created");
      navigate("/courses");
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3fdfb] px-4 py-10">
      <div
        className="
          max-w-xl w-full md:w-[600px] mx-auto 
          bg-white rounded-2xl shadow-xl p-8 relative
          border border-[#d8f5ef]
          bg-gradient-to-br from-[#ffffff] to-[#f2fffc]
        "
      >
        {/* Back Button */}
        <FaArrowLeftLong
          onClick={() => navigate("/courses")}
          className="
            absolute top-6 left-6 text-[#073b33] 
            w-[24px] h-[24px] cursor-pointer 
            hover:text-[#0a544a] transition
          "
        />

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-[#073b33] mb-8">
          Create New Course
        </h2>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          {/* Title Input */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-[#0a544a] mb-2"
            >
              Course Title
            </label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              id="title"
              placeholder="Enter Course Title"
              className="
                w-full border border-[#c8f1e7] bg-white
                rounded-xl px-4 py-3 text-gray-700
                focus:outline-none focus:ring-2 
                focus:ring-[#39c6a5] transition
              "
            />
          </div>

          {/* Category Input */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-semibold text-[#0a544a] mb-2"
            >
              Course Category
            </label>
            <select
              onChange={(e) => setCategory(e.target.value)}
              id="category"
              className="
                w-full border border-[#c8f1e7] bg-white
                rounded-xl px-4 py-3 text-gray-700
                focus:outline-none focus:ring-2 
                focus:ring-[#39c6a5] transition
              "
            >
              <option value="">Select category</option>
              <option value="App Development">App Development</option>
              <option value="AI/ML">AI/ML</option>
              <option value="AI Tools">AI Tools</option>
              <option value="Data Science">Data Science</option>
              <option value="Data Analytics">Data Analytics</option>
              <option value="Ethical Hacking">Ethical Hacking</option>
              <option value="UI/UX Designing">UI UX Designing</option>
              <option value="Web Development">Web Development</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Button */}
          <button
            onClick={handleCreateCourse}
            disabled={loading}
            className="
              w-full py-3 rounded-xl font-semibold text-white
              bg-gradient-to-r from-[#2bb597] to-[#1b8a73]
              hover:opacity-90 active:scale-95 transition
              flex items-center justify-center
            "
          >
            {loading ? <ClipLoader size={28} color="white" /> : "Create Course"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourses;
