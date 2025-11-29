import axios from "axios";
import React, { useEffect } from "react";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setCreatorCourseData } from "../redux/courseSlice";
import { toast } from "react-toastify";

const getCreatorCourse = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  useEffect(() => {
    if (!userData) return;
    const creatorCourses = async () => {
      try {
        const result = await axios.get(serverUrl + "/api/course/creator", {
          withCredentials: true,
        });
        console.log(result.data);
        dispatch(setCreatorCourseData(result.data.courses || []));
      } catch (error) {
        console.log(error);
        dispatch(setCreatorCourseData([]));
      }
    };
    creatorCourses();
  }, [userData, dispatch]);
};

export default getCreatorCourse;
