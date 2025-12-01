import axios from "axios";
import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "../../App";
import { setLectureData } from "../../redux/lectureSlice";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

function EditLecture() {
  const { courseId, lectureId } = useParams();
  const { lectureData } = useSelector((state) => state.lecture);
  const selectedLecture = lectureData.find((lec) => lec._id === lectureId);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [lectureTitle, setLectureTitle] = useState(
    selectedLecture?.lectureTitle || ""
  );
  const [videoUrl, setVideoUrl] = useState(null);
  const [isPreviewFree, setIsPreviewFree] = useState(
    selectedLecture?.isPreviewFree || false
  );
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);

  const handleEditLecture = async () => {
    if (!lectureTitle) return toast.error("Lecture title is required!");

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("lectureTitle", lectureTitle);

      if (videoUrl) formData.append("videoUrl", videoUrl);

      formData.append("isPreviewFree", isPreviewFree);

      const result = await axios.post(
        `${serverUrl}/api/lecture/edit/${lectureId}`,
        formData,
        { withCredentials: true }
      );

      dispatch(
        setLectureData(
          lectureData.map((lec) => (lec._id === lectureId ? result.data : lec))
        )
      );

      toast.success("Lecture Updated");
      navigate("/courses");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating lecture");
    } finally {
      setLoading(false);
    }
  };

  const removeLecture = async () => {
    setLoading1(true);
    try {
      await axios.delete(
        `${serverUrl}/api/lecture/removelecture/${lectureId}`,
        {
          withCredentials: true,
        }
      );

      toast.success("Lecture Removed");
      navigate(`/createlecture/${courseId}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error removing lecture");
    } finally {
      setLoading1(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6 space-y-6">
        <div className="flex items-center gap-2 mb-2">
          <FaArrowLeftLong
            onClick={() => navigate(`/createlecture/${courseId}`)}
            className="text-gray-600 cursor-pointer"
          />
          <h2 className="text-xl font-semibold text-gray-800">
            Update Course Lecture
          </h2>
        </div>

        <button
          disabled={loading1}
          onClick={removeLecture}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all text-sm"
        >
          {loading1 ? <ClipLoader size={30} color="white" /> : "Remove Lecture"}
        </button>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lecture Title *
            </label>
            <input
              onChange={(e) => setLectureTitle(e.target.value)}
              value={lectureTitle}
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Video (optional)
            </label>
            <input
              onChange={(e) => setVideoUrl(e.target.files[0])}
              type="file"
              accept="video/*"
              className="w-full border border-gray-300 rounded-md p-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-gray-700 file:text-white hover:file:bg-gray-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              checked={isPreviewFree}
              onChange={() => setIsPreviewFree((prev) => !prev)}
              id="isFree"
              type="checkbox"
              className="accent-black h-4 w-4"
            />
            <label htmlFor="isFree" className="text-sm text-gray-700">
              Is this video FREE?
            </label>
          </div>

          {loading && <p>Uploading video... Please wait.</p>}
        </div>

        <button
          disabled={loading}
          onClick={handleEditLecture}
          className="w-full bg-black text-white py-3 rounded-md text-sm font-medium hover:bg-gray-700 transition"
        >
          {loading ? <ClipLoader size={30} color="white" /> : "Update Lecture"}
        </button>
      </div>
    </div>
  );
}

export default EditLecture;
