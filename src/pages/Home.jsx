import React from 'react'
import Hero from '../Home/Hero';
import RecentlyAdded from '../Home/RecentlyAdded';

const Home = () => {
  return (
    <div className='bg-zinc-900 text-white px-10 py-20'>
      <Hero />
      <RecentlyAdded />
    </div>
  )
}

export default Home;