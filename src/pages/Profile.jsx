import React, { useEffect, useState } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Profile/Sidebar";


const Profile = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/v1/get-user-information`,
          { headers }
        );
        setProfile(response.data);
      } catch (err) {
        setError("Failed to fetch profile information.");
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [headers]);

  if (loading) {
    return (
      <div className="bg-zinc-900 text-white px-4 md:px-12 flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-zinc-900 text-white px-4 md:px-12 flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 text-white px-4 md:px-12 flex min-h-screen gap-4">
      {profile ? (
        <>
          <div className="w-full md:w-1/6 h-[50%] md:h-[100%] mt-3">
            <Sidebar data={profile} />
          </div>
          <div className="w-full md:w-5/6 mt-3">
            <Outlet />
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-[88vh] w-full bg-zinc-900">
          <p className="text-zinc-500">No profile data available</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
