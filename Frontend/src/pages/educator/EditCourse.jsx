import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { serverUrl } from "../../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { setCourseData } from "../../redux/courseSlice";

const EditCourse = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const thumb = useRef(null);
  const [isPublished, setIsPublished] = useState(false);
  const [selectCourse, setSelectCourse] = useState(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState("");
  const [frontendImage, setFrontendImage] = useState("/assets/empty.jpg");
  const [backendImage, setBackendImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const dispatch = useDispatch();
  const { courseData } = useSelector((state) => state.course);

  const handleThumbnail = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const getCourseById = async () => {
    try {
      const result = await axios.get(
        serverUrl + `/api/course/getcourse/${courseId}`,
        { withCredentials: true }
      );
      setSelectCourse(result.data.course);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectCourse) {
      setTitle(selectCourse.title || "");
      setSubTitle(selectCourse.subTitle || "");
      setDescription(selectCourse.description || "");
      setCategory(selectCourse.category || "");
      setLevel(selectCourse.level || "");
      setPrice(selectCourse.price || "");
      setFrontendImage(selectCourse.thumbnail || "/assets/empty.jpg");
      setIsPublished(selectCourse?.isPublished);
    }
  }, [selectCourse]);

  useEffect(() => {
    getCourseById();
  }, [courseId]);

  const handleEditCourse = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("subTitle", subTitle);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("level", level);
    formData.append("price", price);
    if (backendImage) {
      formData.append("thumbnail", backendImage);
    }
    formData.append("isPublished", isPublished);

    try {
      const result = await axios.post(
        serverUrl + `/api/course/editcourse/${courseId}`,
        formData,
        { withCredentials: true }
      );
      const updateData = result.data.course;
      if (updateData.isPublished) {
        const updateCourses = courseData.map((c) =>
          c._id === courseId ? updateData : c
        );
        if (!courseData.some((c) => c._id === courseId)) {
          updateCourses.push(updateData);
        }
        dispatch(setCourseData(updateCourses));
      } else {
        const filterCourse = courseData.filter((c) => c._id !== courseId);
        dispatch(setCourseData(filterCourse));
      }
      setLoading(false);
      navigate("/courses");
      toast.success("Course Updated");
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const handleRemoveCourse = async () => {
    setLoading1(true);
    try {
      await axios.delete(serverUrl + `/api/course/remove/${courseId}`, {
        withCredentials: true,
      });
      const filterCourse = courseData.filter((c) => c._id !== courseId);
      dispatch(setCourseData(filterCourse));
      setLoading1(false);
      toast.success("Course Removed");
      navigate("/courses");
    } catch (error) {
      setLoading1(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 bg-white rounded-xl shadow-md border border-[#dff5ef]">
      
      {/* Top Bar */}
      <div className="flex items-center gap-5 mb-6 flex-col md:flex-row">
        <FaArrowLeftLong
          onClick={() => navigate("/courses")}
          className="w-6 h-6 cursor-pointer text-[#0b433a]"
        />
        <h2 className="text-2xl font-semibold text-[#0b433a] flex-1 text-center md:text-left">
          Edit Course — Add Detailed Course Information
        </h2>

        <button
          disabled={!selectCourse}
          onClick={() => navigate(`/createlecture/${selectCourse?._id}`)}
          className="
            px-4 py-2 rounded-md text-white 
            bg-[#0b433a] hover:bg-[#096155] transition
          "
        >
          Go to lectures page
        </button>
      </div>

      {/* Form Section */}
      <div className="bg-[#f5fffc] p-6 rounded-xl border border-[#dff5ef]">
        <h2 className="text-lg font-medium mb-4 text-[#0b433a]">
          Basic Course Information
        </h2>

        <div className="flex items-center space-x-3 mb-4">
          {!isPublished ? (
            <button
              onClick={() => setIsPublished((prev) => !prev)}
              className="bg-green-200 text-[#0b433a] border border-green-600 px-4 py-2 rounded-md"
            >
              Click to Publish
            </button>
          ) : (
            <button
              onClick={() => setIsPublished((prev) => !prev)}
              className="bg-red-100 text-red-600 border px-4 py-2 rounded-md"
            >
              Click to Unpublish
            </button>
          )}

          <button
            onClick={handleRemoveCourse}
            className="bg-red-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            {loading1 ? <ClipLoader size={18} color="white" /> : "Remove Course"}
          </button>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          
          {/* Inputs */}
          <div>
            <label className="text-sm font-medium text-[#0b433a]">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="
                w-full px-4 py-2 border border-[#c7f4e8] rounded-md 
                focus:ring-2 focus:ring-[#0b433a] focus:outline-none
              "
            />
          </div>

          <div>
            <label className="text-sm font-medium text-[#0b433a]">Subtitle</label>
            <input
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
              className="
                w-full px-4 py-2 border border-[#c7f4e8] rounded-md 
                focus:ring-2 focus:ring-[#0b433a]
              "
            />
          </div>

          <div>
            <label className="text-sm font-medium text-[#0b433a]">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="
                w-full px-4 py-2 border border-[#c7f4e8] rounded-md 
                h-24 resize-none focus:ring-2 focus:ring-[#0b433a]
              "
            />
          </div>

          {/* Grid Fields */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium text-[#0b433a]">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-[#c7f4e8] rounded-md bg-white"
              >
                <option value="">Select category</option>
                <option value="App Development">App Development</option>
                <option value="AI/ML">AI/ML</option>
                <option value="AI Tools">AI Tools</option>
                <option value="Data Science">Data Science</option>
                <option value="Data Analytics">Data Analytics</option>
                <option value="Ethical Hacking">Ethical Hacking</option>
                <option value="UI UX Designing">UI UX Designing</option>
                <option value="Web Development">Web Development</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="text-sm font-medium text-[#0b433a]">
                Level
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full px-4 py-2 border border-[#c7f4e8] rounded-md bg-white"
              >
                <option value="">Select level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="text-sm font-medium text-[#0b433a]">
                Price (INR)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-2 border border-[#c7f4e8] rounded-md"
              />
            </div>
          </div>

          {/* Thumbnail */}
          <div>
            <label className="text-sm font-medium text-[#0b433a]">
              Course Thumbnail
            </label>

            <input
              hidden
              ref={thumb}
              type="file"
              accept="image/*"
              onChange={handleThumbnail}
            />

            <div className="relative w-[300px] h-[170px] mt-2">
              <img
                src={frontendImage}
                onClick={() => thumb.current.click()}
                className="
                  w-full h-full object-cover rounded-md border border-[#c7f4e8]
                  cursor-pointer
                "
              />
              <FaEdit
                onClick={() => thumb.current.click()}
                className="
                  absolute top-2 right-2 bg-white p-1 border rounded cursor-pointer
                "
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => navigate("/courses")}
              className="
                px-4 py-2 rounded-md border 
                bg-[#e0faf4] text-[#0b433a] border-[#b6eee1]
                hover:bg-[#c6f4e9]
              "
            >
              Cancel
            </button>

            <button
              onClick={handleEditCourse}
              className="
                px-7 py-2 rounded-md text-white 
                bg-[#0b433a] hover:bg-[#096155] transition
              "
            >
              {loading ? <ClipLoader size={30} color="white" /> : "Save"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditCourse;
