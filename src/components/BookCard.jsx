import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";


const BookCard = ({ data, favourites, latestfavouritevalue }) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };

  const handleRemoveFavourites = async () => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/v1/delete-book-to-favourite`,
        {},
        { headers }
      );
      latestfavouritevalue();
      alert(response.data.message);
    } catch (error) {
      console.error("Error removing from favourites:", error);
    }
  };


  return (
    <div className="bg-zinc-800 rounded p-4 flex flex-col">
      <Link to={`/get-book-by-id/${data._id}`}>
        <div className="bg-zinc-800 p-4 rounded flex flex-col ">
          <div className="bg-zinc-900 flex items-center justify-center rounded ">
            <img src={data.url} alt="img" className="h-[35vh]" />
          </div>

          <h2 className="mt-4 text-lg  font-semibold text-zinc-100">
            {data.title}
          </h2>
          <p className="mt-2 text-zinc-400 font-semibold ">By {data.author}</p>
          <p className="mt-2 text-zinc-200 font-semibold  text-xl">
            ${data.price}
          </p>
        </div>
      </Link>

      {favourites && (
        <button
          className="bg-yellow-50 text-sm p-4 py-2 mt-4 rounded border-yellow-500 text-yellow-500"
          onClick={handleRemoveFavourites}
        >
          Remove from Favourites
        </button>
      )}
    </div>
  );
};

export default BookCard;
