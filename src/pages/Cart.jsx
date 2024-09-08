import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { loadStripe } from "@stripe/stripe-js";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

const Cart = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [cartOrders, setCartOrders] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // Loading state for button
  const [isIncrease, setIsIncrease] = useState(false);

  const [bookid, setBookId] = useState("");

  const [itemQuantity, setItemQuantity] = useState(1);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  /*   useEffect(() => {
    const handleBookQuantityUpdate = async () => {
      const response = await axios.put(
        `${API_BASE_URL}/api/v1/update-cart-quantity/${bookid}`,
        { itemQuantity },
        { headers }
      );

      console.log("res is", response.data);
      fetch();
    };

    handleBookQuantityUpdate();
  }, [itemQuantity]); */

  const handleIncreaseQuantity = async (bookid, quantity) => {

    const itemquantity = quantity + 1;

    const response = await axios.put(
      `${API_BASE_URL}/api/v1/update-cart-quantity/${bookid}`,
      { itemquantity },
      { headers }
    );
    fetch();

  };

  const handleDecreaseQuantity = async (bookid, quantity) => {
    console.log(quantity);
    console.log(bookid);
    const itemquantity = quantity - 1;
    console.log("itemQuantity", itemquantity);

    const response = await axios.put(
      `${API_BASE_URL}/api/v1/update-cart-quantity/${bookid}`,
      { itemquantity },
      { headers }
    );

    fetch();
  };

  // Fetch Books From Cart
  const fetch = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/get-books-from-cart`,
        { headers }
      );
      setCartOrders(response.data.userbooks);
    } catch (error) {
      console.error("Error fetching cart orders:", error);
    }
  };

  useEffect(() => {
    let total = 0;

    for (const item of cartOrders) {
      total += item.totalamount;
    }
    setTotalAmount(total);
  }, [cartOrders]);

  // Delete Cart Item From Users Cart

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

  const handleOrder = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PK_KEY);
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/make-payment`,
        cartOrders,
        { headers }
      );
      console.log("response", response.data.id);

      const result = await stripe.redirectToCheckout({
        sessionId: response.data.id,
      });

      console.log("result", result);

      if (result.error) {
        console.log(result.error.message);
      }
    } catch (error) {
      console.error("Error placing order:", error.message);
    } finally {
      setIsLoading(false); // Re-enable button after operation
    }
  }, [cartOrders, headers, isLoading]);

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="bg-zinc-900 px-12 py-5 space-y-6 h-fit md:h-screen">
      {cartOrders?.length === 0 ? (
        <div className="text-4xl md:text-5xl font-semibold text-zinc-500 flex items-center justify-center h-[100%]">
          No books in cart
        </div>
      ) : (
        cartOrders?.map((item, i) => (
          <div
            key={i}
            className="w-full flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center"
          >
            <img
              src={`${API_BASE_URL}/uploads/${item?.book?.url}`}
              alt="/"
              className="h-[25vh] md:h-[12vh] object-cover"
            />
            <div className="w-full md:w-auto">
              <h2 className="text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0">
                {item?.book?.title}
              </h2>
              <p className="text-normal text-zinc-300 mt-2 hidden lg:block">
                {item?.book?.desc.slice(0, 100)}...
              </p>
              <p className="text-normal text-zinc-300 mt-2 hidden md:block lg:hidden">
                {item?.book?.desc.slice(0, 65)}...
              </p>
              <p className="text-normal text-zinc-300 mt-2 block md:hidden">
                {item?.book?.desc.slice(0, 100)}...
              </p>
            </div>
            <div className="mt-4">
              <button
                className="btn btn-circle"
                onClick={() => {
                  item.quantity > 1 &&
                    handleDecreaseQuantity(item.book._id, item.quantity);
                }}
              >
                <FaMinus />
              </button>
              <span className="bg-gray-800 text-white text-3xl px-6 rounded-lg py-1 mx-4">
                {item.quantity}
              </span>
              <button
                className="btn btn-circle"
                onClick={() =>
                  item.quantity < item.book.quantity &&
                  handleIncreaseQuantity(item.book._id, item.quantity)
                }
              >
                <FaPlus />
              </button>
            </div>

            <div className="flex mt-4 w-full md:w-auto items-center justify-between">
              <h2 className="text-zinc-300 text-2xl md:text-3xl font-semibold">
                ${item?.book?.price}
              </h2>
              <button
                className="bg-red-100 text-red-700 border border-red-700 p-2 ms-12 rounded-lg"
                onClick={() => handleDeleteItemFromCart(item?.book?._id)}
              >
                <MdDelete size={25} />
              </button>
            </div>
          </div>
        ))
      )}

      {cartOrders?.length > 0 && (
        <div className="bg-zinc-600 p-6 mt-5 text-3xl text-white w-fit ml-auto">
          <h2>Total Amount</h2>
          <div className="flex">
            <p className="text-lg mt-5">
              {cartOrders.map((item) => {
                return (
                  <div>
                    Price of
                    <span className="font-bold text-lg"> {item.quantity} </span>
                    <span className=""> {item.book.title} </span>
                    is{" "}
                    <span className="font-bold text-xl">
                      {item.totalamount}
                    </span>
                  </div>
                );
              })}
              <span className="text-2xl font-semibold">${totalAmount}</span>
            </p>
          </div>
          <button
            className="bg-yellow-50 text-lg p-4 py-3 mt-4 rounded border-yellow-500 text-black w-full"
            onClick={handleOrder}
            disabled={isLoading}
          >
            Place Your Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
