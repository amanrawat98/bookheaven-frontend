import axios from "axios";
import React, { useEffect, useState } from "react";

// Assuming the REACT_APP_API_BASE_URL is set in your .env file

const Setting = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [profile, setProfile] = useState();
  const [address, setAddress] = useState("");

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/get-user-information`,
          { headers }
        );
        setProfile(response.data);
        setAddress(response.data.address);
        console.log("data is", response.data);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetch();
  }, []);

  const changeAddress = async () => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/update-address`,
        { address },
        { headers }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  return (
    <div className="px-4 md:px-8 py-4 bg-zinc-800 text-white space-y-6">
      <div>
        <h2 className="text-lg md:text-3xl font-semibold bg-zinc-500 p-3 rounded-lg">
          Name:{" "}
          <span className="text-lg font-normal"> {profile?.username} </span>
        </h2>
      </div>

      <div>
        <h2 className="text-lg md:text-3xl font-semibold mt-3 bg-zinc-500 p-3 rounded-lg">
          Email: <span className="text-lg font-normal"> {profile?.email} </span>
        </h2>
      </div>

      <div className="flex flex-col md:flex-row gap-5">
        <textarea
          name="address"
          id=""
          placeholder=""
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="px-3 py-2 border text-lg md:text-2xl rounded-md focus:outline-none focus:ring focus:border-blue-300 text-black w-full lg:w-[90%]"
        ></textarea>
        <button
          className="bg-blue-600 hover:bg-blue-800 rounded-md w-full lg:w-[10%] mt-4 lg:mt-0 text-white font-semibold flex items-center cursor-pointer justify-center gap-2 py-4 px-4"
          onClick={changeAddress}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default Setting;
