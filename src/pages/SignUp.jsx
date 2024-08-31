import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const SignUp = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (
        values.username === "" ||
        values.email === "" ||
        values.password === "" ||
        values.address === ""
      ) {
        alert("All fields are required.");
      } else {
        const response = await axios.post(
          `${API_BASE_URL}/api/v1/sign-up`,
          values
        );
        alert(response.data.message);
        navigate('/sign-in');
      }
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred.");
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <div className="h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center min-h-screen">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-3/6">
        <p className="text-lg font-semibold text-zinc-100">Sign Up</p>

        <form onSubmit={submit} className="space-y-4">
          <div className="mt-4 space-y-3">
            <label htmlFor="username" className="text-zinc-100">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              className="w-full bg-zinc-900 text-zinc-100 p-2 outline-none"
              required
              value={values.username}
              onChange={onChange}
            />
          </div>
          <div className="mt-4 space-y-3">
            <label htmlFor="email" className="text-zinc-100">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@gmail.com"
              className="w-full bg-zinc-900 text-zinc-100 p-2 outline-none"
              required
              value={values.email}
              onChange={onChange}
            />
          </div>
          <div className="mt-4 space-y-3">
            <label htmlFor="password" className="text-zinc-100">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              className="w-full bg-zinc-900 text-zinc-100 p-2 outline-none"
              required
              value={values.password}
              onChange={onChange}
            />
          </div>
          <div className="mt-4 space-y-3">
            <label htmlFor="address" className="text-zinc-100">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              placeholder="Address"
              className="w-full bg-zinc-900 text-zinc-100 p-2 outline-none"
              required
              value={values.address}
              onChange={onChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-700 mt-6"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
