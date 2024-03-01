import React from 'react'
import NavComponent from '../Components/NavComponent'

const About = () => {
  const idx = window.localStorage.getItem("userId");
  return (
    <div>
        <NavComponent home={idx?false:true} />
      <div className="container mx-auto w-auto">
        <h1 className="text-center mb-5">About Us</h1>
        <h5>Get to know more about the team maintaining PROJECT MANAGER. Learn a little history of how, why and when the project started and how you can be a part of it.</h5>
        
    </div>
    </div>
  )
}

export default About