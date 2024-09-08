import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Success = () => {
  const bookedit = useSelector((state) => state.auth.bookedit);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: bookedit.bookid,
  };

  useEffect(() => {
    axios
      .post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/payment-success`,
        {},
        { headers }
      )
      .then((item) => {
        console.log("item", item);
      });
  }, [headers]);
  return <div>Success</div>;
};

export default Success;
