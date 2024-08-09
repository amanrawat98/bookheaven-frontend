import React from "react";
import { Link } from "react-router-dom";


const Hero = () => {
  return (
    <div className="h-[75vh] flex flex-col lg:flex-row items-center justify-center">
      <div className="w-full mb-12 md:mb-0 lg:w-3/6 flex flex-col items-center lg:items-start justify-center">
        {" "}
        <h2 className="text-4xl lg:6xl text-yellow-100">
          Discover Your Next Greate read
        </h2>
        <p className="mt-4 text-lg lg:text-xl text-zinc-300 text-center lg:text-left">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero
          voluptatum consequatur maxime soluta magni nihil ipsa expedita
          perspiciatis unde reprehenderit
        </p>
        <div className="mt-6">
          <Link to='/all-books' className="text-yellow-100  font-semibold border border-yellow px-10 text-xl lg:text2xl">
            Discover Books
          </Link>  
        </div>
      </div>
      <div className="w-full lg:w-3/6 h-auto lg:h-[80%] flex items-center justify-center">
        <img src="/hero.png" alt="" className="lg:w-[80%]" />
      </div>
    </div>
  );
};

export default Hero;
