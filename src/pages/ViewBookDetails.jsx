import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaHeart } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

const ViewBookDetails = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const { id } = useParams();
  const [data, setData] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [itemQuantity, setItemQuantity] = useState(1);

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/v1/get-book-by-id/${id}`
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };
    fetch();
  }, [id]);

  useEffect(() => {
    dispatch(authActions.changeBookEdit({ id: "", isEdit: false }));
  }, [id, dispatch]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const handleFavourites = async () => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/v1/add-book-to-favourite`,
        {},
        { headers }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error adding book to favourites:", error);
      alert("Failed to add book to favourites.");
    }
  };

  const handleAddToCart = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/add-book-to-cart`,
        { itemQuantity },
        { headers }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error adding book to cart:", error);
      alert("Failed to add book to cart.");
    }
  };

  const handleBookDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/api/v1/delete-book`, { headers });
      navigate("/all-books");
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Failed to delete book.");
    }
  };

  const handleBookEdit = () => {
    setIsEdit(true);
    dispatch(authActions.changeBookEdit({ id, isEdit: true }));
    navigate("/profile");
  };

  const handleQuantityIncrease = () => {
    if (itemQuantity < data.quantity) {
      setItemQuantity((prev) => prev + 1);
    }
  };

  return (
    <>
      {data ? (
        <div className="bg-zinc-900 h-auto py-8 px-8 md:px-12 text-white gap-8 flex flex-col md:flex-row">
          <div className="bg-zinc-800 p-4 w-full lg:w-3/6">
            <div className="flex justify-around bg-zinc-800 py-4 md:py-6 rounded gap-7 md:gap-1 flex-col md:flex-row">
              <img
                src={`${API_BASE_URL}/uploads/${data.url}`}
                alt=""
                className="h-[30vh] lg:h-[70vh]"
              />
              {isLoggedIn && role === "user" && (
                <div className="flex gap-3 items-center justify-around lg:justify-start md:flex-col">
                  <button
                    className="text-white rounded-full w-fit md:w-full text-1xl gap-2 md:text-3xl p-3 md:p-4 mt-4 bg-blue-600 flex items-center justify-center"
                    onClick={handleAddToCart}
                  >
                    <FaCartShopping />{" "}
                    <span className="lg:hidden">Add to Cart</span>
                  </button>
                  <button
                    className="bg-white rounded-full w-fit md:w-full text-1xl gap-2 md:text-3xl p-3 md:p-4 mt-4 text-red-600 flex items-center justify-center"
                    onClick={handleFavourites}
                  >
                    <FaHeart /> <span className="lg:hidden">Favourites</span>
                  </button>
                </div>
              )}
              {isLoggedIn && role === "admin" && (
                <div className="flex gap-3 items-center justify-around lg:justify-start md:flex-col">
                  <button
                    className="text-white rounded-full w-fit md:w-full text-1xl gap-2 md:text-3xl p-3 md:p-4 mt-4 bg-blue-600 flex items-center justify-center"
                    onClick={handleBookEdit}
                  >
                    <FaEdit /> <span className="lg:hidden">Edit</span>
                  </button>
                  <button
                    className="bg-white rounded-full w-fit md:w-full text-1xl gap-2 md:text-3xl p-3 md:p-4 mt-4 text-red-600 flex items-center justify-center"
                    onClick={handleBookDelete}
                  >
                    <MdDelete /> <span className="lg:hidden">Delete</span>
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="p-4 w-full lg:w-3/6">
            <h2 className="text-2xl md:text-4xl text-zinc-300 font-semibold">
              {data.title}
            </h2>
            <p className="text-zinc-400 mt-1">By {data.author}</p>
            <p className="text-zinc-500 mt-4 text-xl">{data.desc}</p>
            <p className="flex mt-4 items-center justify-start text-zinc-400">
              {data.language}
            </p>
            <p className="mt-4 text-zinc-100 text-lg md:text-3xl font-semibold">
              Price: $ {data.price}
            </p>
            {role === "user" && (
              <div className="mt-4">
                <button
                  className="btn btn-circle"
                  onClick={() => {
                    itemQuantity > 1 && setItemQuantity((prev) => prev - 1);
                  }}
                >
                  <FaMinus />
                </button>
                <span className="bg-gray-800 text-3xl px-6 rounded-lg py-1 mx-4">
                  {itemQuantity}
                </span>
                <button
                  className="btn btn-circle"
                  onClick={handleQuantityIncrease}
                >
                  <FaPlus />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center my-8 h-[88vh] w-full bg-zinc-900">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;
