import axios from "axios";
import React, { useEffect } from "react";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setReviewData } from "../redux/reviewSlice";

const getAllReviews = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const allReviews = async () => {
      try {
        const result = await axios.get(serverUrl + "/api/review/getreviews", {
          withCredentials: true,
        });
        dispatch(setReviewData(result.data.reviews));
        console.log(result.data);
      } catch (error) {
        console.log(error);
         dispatch(setReviewData([]));
      }
    };
    allReviews();
  }, [dispatch]);
};

export default getAllReviews;
