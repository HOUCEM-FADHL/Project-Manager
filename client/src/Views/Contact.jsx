import React from "react";
import NavComponent from "../Components/NavComponent";

const Contact = () => {
  const idx = window.localStorage.getItem("userId");
  return (
    <div>
      <NavComponent home={idx?false:true} />
      <h1 className="text-center mb-5">Contact Us</h1>
      <div className="container mx-auto w-auto">
        <h5>
          Please feel free to reach out to us with any questions or feedback.
        </h5>
        <h5>
          <span className="text-light-emphasis fw-normal">Email: </span>
          Houcem.Fadhl@gmail.com
        </h5>
        <h5>
          <span className="text-light-emphasis fw-normal">Github: </span>
          HOUCEM-FADHL
        </h5>
      </div>
    </div>
  );
};

export default Contact;
