import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../components/BookCard";

const AllBooks = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/v1/get-all-books`
        );

        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching all books:", error);
      }
    };

    fetch();
  }, []);

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  return (
    <div className=" bg-zinc-900 h-auto py-8 px-12">
      <h4 className="text-3xl text-yellow-300">All Books</h4>
      {!data && (
        <div className="flex justify-center my-8 ">
          <span className="loading loading-spinner loading-lg "></span>
        </div>
      )}
      <div className="my-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data &&
          data.map((item, i) => {
            return <BookCard key={i} data={item} />;
          })}
      </div>
    </div>
  );
};

export default AllBooks;
