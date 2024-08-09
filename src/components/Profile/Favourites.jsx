import axios from "axios";
import React, { useEffect, useState } from "react";
import BookCard from "../BookCard";

const Favourites = () => {
  const [favouriteBooks, setFavouriteBooks] = useState();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const fetch = async () => {
    const response = await axios.get(
      `${API_BASE_URL}/get-favourite-books`,      { headers }
    );

    console.log("response", response.data.data);
    setFavouriteBooks(response.data.data);
  };

  const latestfavouritevalue = () => {
    fetch();
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      {favouriteBooks?.length === 0 && (
        <div className=" mt-5 md:mt- sm:text-center text-2xl md:text-5xl font-semibold text-zinc-500 flex items-center justify-center  h-[100%]">
          {" "}
          No favourite books{" "}
        </div>
      )}
      <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favouriteBooks &&
          favouriteBooks?.map((item, i) => {
            return (
              <BookCard
                data={item}
                key={i}
                favourites={true}
                latestfavouritevalue={latestfavouritevalue}
              />
            );
          })}
      </div>
    </>
  );
};

export default Favourites;
