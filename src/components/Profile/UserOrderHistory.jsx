import axios from "axios";
import React, { useEffect, useState } from "react";

// Assuming the REACT_APP_API_BASE_URL is set in your .env file

const UserOrderHistory = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [userOrderHistory, setUserOrderHistory] = useState([]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const fetch = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/get-order-history`,
        { headers }
      );

      console.log("response", response.data.data);
      setUserOrderHistory(response.data.data);
    } catch (error) {
      console.error("Error fetching order history:", error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="h-screen bg-zinc-900 p-1 md:p-2 ">
      <h2 className="text-lg text-center md:text-2xl mb-4"> Order History </h2>

      <div className="bg-zinc-700 grid grid-cols-7 px-3 py-3">
        <div className="col-span-1 mt-3 text-sm md:text-xl font-semibold">No.</div>
        <div className="col-span-1 text-start mt-3 text-sm md:text-xl font-semibold">Books</div>
        <div className="col-span-2 mt-3 text-sm md:text-xl font-semibold ">Description</div>
        <div className="col-span-1 mt-3 text-sm md:text-xl font-semibold">Price</div>
        <div className="col-span-2 mt-3 text-sm md:text-xl font-semibold text-center">Status Placed</div>

        {userOrderHistory &&
          userOrderHistory.length > 0 &&
          userOrderHistory.map((item, i) => {
            return (
              <>
                <div className="col-span-1 text-sm md:text-lg mt-3">{i + 1}</div>
                <div className="col-span-1 text-start text-sm break-words md:text-lg mt-3">{item.book.title}</div>
                <div className="col-span-2 text-sm md:text-lg break-words mt-3">{item.book.desc.slice(0, 100)}</div>
                <div className="col-span-1 text-sm md:text-lg break-words mt-3">${item.book.price}</div>
                {item.status === 'Delivered' ? (
                <div className="col-span-2 text-sm md:text-lg mt-3 break-words text-center text-green-500">{item.status}</div>
              ) : item.status === 'Canceled' ? (
                <div className="col-span-2 text-sm md:text-lg mt-3 text-center text-red-500">{item.status}</div>
              ) : (
                <div className="col-span-2 text-sm md:text-lg mt-3 text-center text-white">{item.status}</div>
              )}

              </>
            );
          })}
      </div>
    </div>
  );
};

export default UserOrderHistory;
