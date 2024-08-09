import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";


const Cart = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [cartOrders, setCartOrders] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const fetch = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/get-books-from-cart`,
        { headers }
      );
      console.log("response", response.data.data);
      setCartOrders(response.data.data);
    } catch (error) {
      console.error("Error fetching cart orders:", error);
    }
  };

  useEffect(() => {
    let total = 0;

    for (const item of cartOrders) {
      total += item.price;
    }
    setTotalAmount(total);
  }, [cartOrders]);

  const handleDeleteItemFromCart = async (bookid) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/v1/delete-book-from-cart/${bookid}`,
        {},
        { headers }
      );
      console.log("response", response.data.message);
      fetch();
    } catch (error) {
      console.error("Error deleting item from cart:", error);
    }
  };

  const handleOrder = async () => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/v1/place-order`,
        cartOrders,
        { headers }
      );
      console.log("response", response.data);
      fetch();
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="bg-zinc-900 px-12 py-5 space-y-6 h-fit md:h-screen">
      {cartOrders.length === 0 ? (
        <div className="text-4xl md:text-5xl font-semibold text-zinc-500 flex items-center justify-center h-[100%]">
          No books in cart
        </div>
      ) : (
        cartOrders.map((item, i) => (
          <div
            key={i}
            className="w-full flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center"
          >
            <img
              src={item.url}
              alt="/"
              className="h-[25vh] md:h-[12vh] object-cover"
            />
            <div className="w-full md:w-auto">
              <h2 className="text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0">
                {item.title}
              </h2>
              <p className="text-normal text-zinc-300 mt-2 hidden lg:block">
                {item.desc.slice(0, 100)}...
              </p>
              <p className="text-normal text-zinc-300 mt-2 hidden md:block lg:hidden">
                {item.desc.slice(0, 65)}...
              </p>
              <p className="text-normal text-zinc-300 mt-2 block md:hidden">
                {item.desc.slice(0, 100)}...
              </p>
            </div>
            <div className="flex mt-4 w-full md:w-auto items-center justify-between">
              <h2 className="text-zinc-300 text-2xl md:text-3xl font-semibold">
                ${item.price}
              </h2>
              <button
                className="bg-red-100 text-red-700 border border-red-700 p-2 ms-12 rounded-lg"
                onClick={() => handleDeleteItemFromCart(item._id)}
              >
                <MdDelete size={25} />
              </button>
            </div>
          </div>
        ))
      )}

      {cartOrders.length > 0 && (
        <div className="bg-zinc-600 p-4 mt-5 text-3xl text-white w-fit ml-auto">
          <h2>Total Amount</h2>
          <div className="flex">
            <p className="text-lg mt-5">
              Price of {cartOrders.length} items:{" "}
              <span className="text-2xl font-semibold">${totalAmount}</span>
            </p>
          </div>
          <button
            className="bg-yellow-50 text-lg p-4 py-3 mt-4 rounded border-yellow-500 text-black w-full"
            onClick={handleOrder}
          >
            Place Your Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
