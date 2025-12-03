import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setSelectedCourse } from "../redux/courseSlice";
import { FaStar } from "react-icons/fa";
import { FaPlayCircle } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import axios from "axios";
import { serverUrl } from "../App";
import Card from "../component/Card";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

function ViewCourse() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { courseData } = useSelector((state) => state.course);
  const { selectedCourse } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [creatorData, setCreatorData] = useState(null);
  const [creatorCourses, setCreatorCourses] = useState([]);
  const { userData } = useSelector((state) => state.user);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCourseData = () => {
    const found = courseData.find((c) => c._id === courseId);
    if (found) {
      dispatch(setSelectedCourse(found));
    }
  };

  const checkEnrollment = () => {
    const verify = userData?.enrolledCourses?.some(
      (c) => (typeof c === "string" ? c : c._id).toString() === courseId
    );

    if (verify) {
      setIsEnrolled(true);
    }
  };

  useEffect(() => {
    fetchCourseData();
    checkEnrollment();
  }, [courseData, courseId, userData]);

  useEffect(() => {
    const handleCreator = async () => {
      if (selectedCourse?.creator) {
        try {
          const creatorId =
            typeof selectedCourse?.creator === "string"
              ? selectedCourse.creator
              : selectedCourse?.creator?._id;
          const result = await axios.get(
            serverUrl + `/api/user/creator/${creatorId}`,
            {
              withCredentials: true,
            }
          );
          console.log(result.data);
          setCreatorData(result.data.user);
        } catch (error) {
          console.log(error);
        }
      }
    };
    handleCreator();
  }, [selectedCourse]);

  useEffect(() => {
    if (creatorData?._id && courseData.length > 0) {
      const creatorCourse = courseData.filter((c) => {
        const creatorId =
          typeof c.creator === "string" ? c.creator : c.creator?._id;

        return creatorId === creatorData?._id && c._id !== courseId;
      });

      setCreatorCourses(creatorCourse);
    }
  }, [creatorData, courseData]);

  const handleEnroll = async (userId, courseId) => {
    try {
      const orderData = await axios.post(
        serverUrl + "/api/payment/create-order",
        { userId, courseId },
        { withCredentials: true }
      );
      console.log(orderData);
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.data.amount,
        currency: "INR",
        name: "MENTORA",
        description: "COURSE ENROLLMENT PAYMENT",
        order_id: orderData.data.id,
        handler: async function (response) {
          console.log("Razorpay Response", response);
          try {
            const verifyPayment = await axios.post(
              serverUrl + "/api/payment/verifypayment",
              {
                ...response,
                courseId,
                userId,
              },
              { withCredentials: true }
            );
            setIsEnrolled(true);
            toast.success(verifyPayment.data.message);
          } catch (error) {
            toast.error(error.response.data.message);
          }
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while enrolling.");
    }
  };

  const handleReview = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/review/createreview",
        { rating, comments: comment, courseId },
        { withCredentials: true }
      );

      setLoading(false);
      toast.success("Review Added");
      console.log(result.data);
      setRating(0);
      setComment("");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.message);
      setRating(0);
      setComment("");
    }
  };

  const calculateAvgReview = (reviews) => {
    if (!reviews || reviews.length === 0) {
      return 0;
    }
    const total = reviews.reduce(
      (sum, review) => sum + Number(review.rating || 0),
      0
    );
    return (total / reviews.length).toFixed(1);
  };

  const avgRating = calculateAvgReview(selectedCourse?.reviews);

  return (
  <div className="min-h-screen bg-[#0b0f12] p-6 text-gray-200">
  <div className="max-w-6xl mx-auto bg-[#1c1f23] shadow-lg rounded-2xl p-6 space-y-6 relative border border-gray-700">

    {/* Top Section */}
    <div className="flex flex-col md:flex-row gap-6">
      {/* Thumbnail */}
      <div className="w-full md:w-1/2 relative">
        <FaArrowLeftLong
          onClick={() => navigate("/")}
          className="text-white w-[22px] -mt-2 mb-2 h-[22px] cursor-pointer"
        />
        <img
          className="rounded-xl w-full object-cover"
          src={selectedCourse?.thumbnail || "/assets/empty.jpg"}
        />
      </div>

      {/* Course Info */}
      <div className="flex-1 space-y-2 mt-5">
        <h2 className="text-2xl font-bold text-white">{selectedCourse?.title}</h2>
        <p className="text-gray-400">{selectedCourse?.subTitle}</p>

        <div className="flex flex-col gap-3 mt-3">
          <div className="flex items-center gap-2 text-yellow-400 font-medium">
            <span className="flex items-center gap-1">
              <FaStar />
              {avgRating}
            </span>
            <span className="text-gray-500">(1200 Reviews)</span>
          </div>
          <div>
            <span className="text-xl font-semibold text-white">₹{selectedCourse?.price}</span>
            <span className="line-through text-sm text-gray-500 ml-2">₹599</span>
          </div>
          <ul className="text-sm text-gray-400 space-y-1 pt-2">
            <li>10+ hours of video content</li>
            <li>Lifetime access to course</li>
          </ul>

          {!isEnrolled ? (
            <button
              onClick={() => handleEnroll(userData._id, courseId)}
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 mt-3 cursor-pointer"
            >
              Enroll Now
            </button>
          ) : (
            <button
              onClick={() => navigate(`/viewlecture/${courseId}`)}
              className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-600 mt-3 cursor-pointer"
            >
              Watch Now
            </button>
          )}
        </div>
      </div>
    </div>

    {/* Learning & Audience Sections */}
    <div>
      <h2 className="text-xl font-semibold mb-2 text-white">What you'll Learn</h2>
      <ul className="list-disc pl-6 text-gray-400 space-y-1">
        <li>Learn {selectedCourse?.category} from Beginning</li>
      </ul>
    </div>

    <div>
      <h2 className="text-xl font-semibold mb-2 text-white">Who This Course is For</h2>
      <p className="text-gray-400">
        Beginners, aspiring developers, and professionals looking to upgrade skills.
      </p>
    </div>

    {/* Curriculum & Video Preview */}
    <div className="flex flex-col md:flex-row gap-6">
      <div className="bg-[#0f1215] w-full md:w-2/5 p-6 rounded-2xl shadow-md border border-gray-700">
        <h2 className="text-xl font-bold mb-1 text-white">Course Curriculum</h2>
        <p className="text-sm text-gray-400 mb-4">{(selectedCourse?.lectures || []).length} Lectures</p>
        <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto">
          {selectedCourse?.lectures?.map((lecture, index) => (
            <button
              disabled={!lecture.isPreviewFree}
              key={index}
              onClick={() => lecture.isPreviewFree && setSelectedLecture(lecture)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-200 text-left ${
                lecture.isPreviewFree
                  ? "hover:bg-gray-800 cursor-pointer border-gray-600"
                  : "cursor-not-allowed opacity-50 border-gray-700"
              } ${selectedLecture?.lectureTitle === lecture?.lectureTitle ? "bg-gray-800 border-gray-500" : ""}`}
            >
              <span className="text-lg text-gray-200">{lecture.isPreviewFree ? <FaPlayCircle /> : <FaLock />}</span>
              <span className="text-sm font-medium text-white">{lecture.lectureTitle}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#0f1215] w-full md:w-3/5 p-6 rounded-2xl shadow-md border border-gray-700">
        <div className="aspect-video w-full rounded-lg overflow-hidden bg-black flex items-center justify-center">
          {selectedLecture?.videoUrl ? (
            <video
              src={selectedLecture?.videoUrl}
              controls
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-400 text-sm">
              Select a preview lecture to watch
            </span>
          )}
        </div>
      </div>
    </div>

    {/* Reviews */}
    <div className="mt-8 border-t border-gray-700 pt-6">
      <h2 className="text-xl font-semibold mb-2 text-white">Write a Review</h2>
      <div className="mb-4">
        <div className="flex gap-1 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              onClick={() => setRating(star)}
              className={star <= rating ? "fill-yellow-400 cursor-pointer" : "fill-gray-600 cursor-pointer"}
            />
          ))}
        </div>
        <textarea
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          rows={3}
          placeholder="Write your reviews here..."
          className="w-full border border-gray-700 bg-[#1c1f23] rounded-lg p-2 text-gray-200 placeholder-gray-400"
        />
        <button
          disabled={loading}
          onClick={handleReview}
          className="bg-black text-white mt-3 px-4 py-2 rounded hover:bg-gray-800"
        >
          {loading ? <ClipLoader size={30} color="white" /> : "Submit Review"}
        </button>
      </div>
    </div>

    {/* Creator Info */}
    <div className="flex items-center gap-4 pt-4 border-t border-gray-700">
      <img
        src={creatorData?.photoUrl || "/assets/empty.jpg"}
        className="border border-gray-600 w-16 h-16 rounded-full object-cover"
      />
      <div>
        <h2 className="text-lg font-semibold text-white">{creatorData?.name}</h2>
        <p className="text-sm text-gray-400">{creatorData?.description}</p>
        <p className="text-sm text-gray-400">{creatorData?.email}</p>
      </div>
    </div>

    {/* Other Courses */}
    <div>
      <p className="text-xl font-semibold mb-2 text-white">
        Other Published Courses by the Educator -
      </p>
    </div>
    <div className="w-full transition-all duration-300 py-5 flex items-start justify-center lg:justify-start flex-wrap gap-6 lg:px-20">
      {creatorCourses?.map((course, index) => (
        <Card
          key={index}
          thumbnail={course.thumbnail}
          id={course._id}
          prices={course.price}
          title={course.title}
          category={course.category}
        />
      ))}
    </div>
  </div>
</div>

  );
}

export default ViewCourse;
