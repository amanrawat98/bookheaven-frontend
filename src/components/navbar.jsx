import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { useSelector } from "react-redux";
import { FaBeer } from 'react-icons/fa'; 


const Navbar = ({ data }) => {
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const role = useSelector((state) => state?.auth?.role);
  const { MobileNav, setMobileNav } = data;

  console.log(isLoggedIn);

  const navlinks = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "All Books",
      link: "/all-books",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
  ];

  if (isLoggedIn === false) {
    navlinks.splice(2, 2);
  }

  if (isLoggedIn === true && role === "admin") {
    navlinks.splice(2, 1);
  }

  return (
    <>
      <nav className="bg-zinc-800 text-white px-8 py-4 flex items-center justify-between relative z-50">
        <Link to={"/"}>
          <div className="flex items-center gap-2 ">
            <img src="/book.png" alt="book" width={40} height={40} />
            <h2>BookHeaver</h2>
          </div>
        </Link>

        <div className="nav-links-bookheaven flex gap-4 text-white items-center">
          <div className="gap-3 hidden md:flex ">
            {navlinks.map((items, i) => {
              return (
                <Link
                  to={items.link}
                  className="hover:text-blue-500 transition-all duration-300 cursor-pointer"
                  key={i}
                >
                  {items.title}
                </Link>
              );
            })}
          </div>
          {!isLoggedIn && (
            <div className="gap-3 hidden md:flex">
              <Link
                to={"sign-in"}
                className="px-4 py-2 border-blue-400 border hover:bg-white hover:text-zinc-800 transition-all duration-300"
              >
                Sign In
              </Link>
              <Link
                to={"sign-up"}
                className="px-4 py-2 bg-blue-600 rounded border hover:bg-blue-600"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile */}

          <button
            className=" text-2xl hover:text-zinc-400 text-white md:hidden cursor-pointer"
            onClick={() => {
              setMobileNav(!MobileNav);
            }}
          >
            {" "}
            {!MobileNav ? <FaGripLines /> : <ImCross size={25} />}
          </button>
        </div>
      </nav>

      {MobileNav && (
        <div
          className={`bg-zinc-800  w-full min-h-full h-screen absolute top-0 left-0 z-40 flex flex-col justify-center items-center `}
        >
          {navlinks.map((items, i) => {
            return (
              <Link
                onClick={() => setMobileNav(false)}
                to={items.link}
                className="text-white text-3xl font-semibold hover:text-blue-500 transition-all duration-300 cursor-pointer mb-5"
                key={i}
              >
                {items.title}
              </Link>
            );
          })}

          {!isLoggedIn && (
            <>
              {" "}
              <Link
                to={"sign-in"}
                className="px-5 py-3 border-blue-400 border hover:bg-white hover:text-zinc-800 transition-all duration-300 text-white mb-5"
                onClick={() => setMobileNav(false)}
              >
                Sign In
              </Link>
              <Link
                to={"sign-up"}
                className="px-5 py-3 bg-blue-600 rounded border hover:bg-zinc-800"
                onClick={() => setMobileNav(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
