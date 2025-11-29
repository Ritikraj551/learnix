import axios from "axios";
import React, { useEffect } from "react";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setCourseData } from "../redux/courseSlice";

const getPublishedCourse = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getCourseData = async () => {
      try {
        const result = await axios.get(serverUrl + "/api/course/published", {
          withCredentials: true,
        });
        dispatch(setCourseData(result.data.courses || []));
        console.log(result.data);
      } catch (error) {
        console.log(error);
        dispatch(setCourseData([]));
      }
    };
    getCourseData();
  }, [dispatch]);
};

export default getPublishedCourse;
