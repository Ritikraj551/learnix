import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import {
  ResponsiveContainer,
  Bar,
  BarChart,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const Dashboard = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { creatorCourseData } = useSelector((state) => state.course);

  const courseProgressData =
    creatorCourseData?.map((course) => ({
      name: course.title?.slice(0, 10) + "...",
      lectures: course.lectures?.length || 0,
    })) || [];

  const enrollData =
    creatorCourseData?.map((course) => ({
      name: course.title?.slice(0, 10) + "...",
      enrolled: course.enrollStudents?.length || 0,
    })) || [];

  const totalEarning =
    creatorCourseData?.reduce((sum, course) => {
      const studentCount = course.enrolledStudents?.length || 0;
      const courseRevenue = course.price ? course.price * studentCount : 0;
      return sum + courseRevenue;
    }, 0) || 0;

  return (
    <div className="min-h-screen bg-[#ECF8FF] flex relative">
      {/* Back button */}
      <FaArrowLeftLong
        onClick={() => navigate("/")}
        className="w-6 h-6 text-[#195D74] absolute top-6 left-6 cursor-pointer hover:text-[#0E3D4E] transition"
      />

      {/* Main Content */}
      <div className="w-full px-6 py-14 space-y-10">
        {/* Header Card */}
        <div className="max-w-6xl mx-auto bg-linear-to-r from-[#63DDF0] to-[#3398A4] text-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-6 transition-all">
          <img
            className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
            src={userData?.photoUrl || userData?.name.slice(0, 1).toUpperCase()}
            alt="educator"
          />

          <div className="text-center md:text-left space-y-2">
            <h1 className="text-3xl font-semibold drop-shadow-sm">
              Welcome, {userData?.name || "Educator"}
            </h1>
            <h1 className="text-xl font-semibold drop-shadow-sm">
              Total Earnings: ₹{totalEarning.toLocaleString()}
            </h1>
            <p className="text-white/90 text-sm font-light">
              {userData?.description ||
                "Start creating impactful courses for your students."}
            </p>

            <button
              onClick={() => navigate("/courses")}
              className="mt-2 px-6 py-2.5 bg-white text-[#195D74] font-semibold rounded-xl shadow hover:bg-[#F0FEFF] transition"
            >
              Create Courses
            </button>
          </div>
        </div>

        {/* Graph Section */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Lectures Graph */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-[#C7EEF5] hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-[#195D74] mb-4">
              Course Progress (Lectures)
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={courseProgressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#CCE8EE" />
                <XAxis dataKey="name" stroke="#195D74" />
                <YAxis stroke="#195D74" />
                <Tooltip />
                <Bar
                  dataKey="lectures"
                  fill="#4CC3D9"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Enrollment Graph */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-[#C7EEF5] hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-[#195D74] mb-4">
              Students Enrollment
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={enrollData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#CCE8EE" />
                <XAxis dataKey="name" stroke="#195D74" />
                <YAxis stroke="#195D74" />
                <Tooltip />
                <Bar
                  dataKey="enrolled"
                  fill="#63DDF0"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
