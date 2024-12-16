import React from 'react'
import Navbar from '../../components/home/Navbar'
import Hero from '../../components/home/Hero'
import HowItWork from '../../components/home/HowItWork'
import Services from '../../components/home/Services'
const Home = () => {
  return (
    <div className='flex flex-col justify-center items-center font-[Lato] w-full'>
      <Hero />
      <HowItWork />
      <Services />
    </div>
  )
}

export default Home
