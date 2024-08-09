import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../components/BookCard";

const RecentlyAdded = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // For Vite
  console.log(API_BASE_URL);

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/get-all-books`);
          setData(response.data.data);
        
      } catch (error) {
        console.error("Error fetching recently added books:", error);
        setError(error.message);
      }
    };

    fetch();
  }, [API_BASE_URL]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="mt-20 md:mt-8 px-4">
      <h4 className="text-3xl text-yellow-300">Recently Added Books</h4>
      {!data.length && (
        <div className="flex justify-center my-8">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
      <div className="my-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((item, i) => (
          <BookCard key={i} data={item} />
        ))}
      </div>
    </div>
  );
};

export default RecentlyAdded;
