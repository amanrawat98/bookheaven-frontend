import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";


const AllUsersOrderHistory = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [userOrderHistory, setUserOrderHistory] = useState([]);
  const [orderStatus, setOrderStatus] = useState("Order Placed");
  const [userId, setUserId] = useState("Order Placed");

  const [orderOption, setOrderOption] = useState([
    "Order Placed",
    "Out for Delivery",
    "Delivered",
    "Canceled",
  ]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const fetch = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/get-all-history`,
        { headers }
      );

      console.log("response", response.data.data);
      setUserOrderHistory(response.data.data);
    } catch (error) {
      console.error("Error fetching cart orders:", error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleOrderStatus = async (e, orderId) => {
    const status = e.target.value;
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/v1/update-status/${orderId}`,
        { status },
        { headers }
      );

      console.log(response);

      fetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-auto bg-zinc-900 p- ">
      <h2 className="text-lg md:text-3xl font-semibold mb-4 text-center">
        All Users Order History
      </h2>

      <div className="bg-zinc-700  rounded-lg grid grid-cols-8 md:grid-cols-7 px-3 py-3 md:p-3 overflow-x-hidden">
        <div className="col-span-1 md:col-span-1 mt-3 text-sm md:text-xl font-semibold break-words px-[2px]">
          Sr No.
        </div>
        <div className="col-span-2 md:col-span-1 mt-3 text-sm md:text-xl font-semibold break-words px-[2px]">
          Email
        </div>
        <div className="col-span-2 md:col-span-2 mt-3 text-sm md:text-xl font-semibold break-words px-[2px]">
          User Name
        </div>
        <div className="col-span-2 md:col-span-2 mt-3 text-sm md:text-xl font-semibold break-words px-[2px]">
          Address
        </div>
        <div className="col-span-1 md:col-span-1 mt-3 text-sm md:text-xl font-semibold break-words px-[2px]">
          Status Placed
        </div>
        {userOrderHistory &&
          userOrderHistory.length > 0 &&
          userOrderHistory.map((item, i) => {
            return (
              <React.Fragment key={i}>
                <div className="col-span-1 md:col-span-1 mt-3 text-sm md:text-xl break-words px-[2px]">
                  {i + 1}
                </div>
                <div className="col-span-2 md:col-span-1 mt-3 text-sm md:text-xl break-words px-[2px]">
                  {item?.user?.username}
                </div>
                <div className="col-span-2 md:col-span-2 mt-3 text-sm md:text-xl break-words px-[2px]">
                  {item?.user?.email}
                </div>
                <div className="col-span-2 md:col-span-2 mt-3 text-sm md:text-xl break-words px-[2px]">
                  {item?.user?.address}
                </div>

                <div className="col-span-1 md:col-span-1 mt-3 text-sm md:text-xl text-black w-fit">
                  <select
                    value={item.status}
                    className="w-fit px-1 md:px-0 py-1 md:ps-1"
                    onChange={(e) => handleOrderStatus(e, item._id)}
                  >
                    {orderOption.map((option, index) => (
                      <option key={index}>{option}</option>
                    ))}
                  </select>
                </div>
              </React.Fragment>
            );
          })}
      </div>
    </div>
  );
};

export default AllUsersOrderHistory;
