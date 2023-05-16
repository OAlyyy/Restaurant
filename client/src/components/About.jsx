import aboutImage from "../assets/images/about-image.png";
import React from "react";

export const About = () => {
  return (
    <div className="aboutContainer">
      <div className="aboutContainer-leftside">
        <h2 className="aboutTitle">About Us</h2>

        <p className="openingHours">
          Opening Hours <br />
          <br />
          Monday: 11:00 AM - 10:00 PM <br />
          Tuesday: 11:00 AM - 10:00 PM <br />
          Wednesday: 11:00 AM - 10:00 PM <br />
          Thursday: 11:00 AM - 10:00 PM <br />
          Friday: 11:00 AM - 10:00 PM <br />
          Saturday: 11:00 AM - 10:00 PM <br />
          Sunday: 11:00 AM - 10:00 PM <br />
          <br />
          <br />
        </p>
      </div>

      <div className="aboutContainer-rightside">
        <div className="aboutImage">
          <img src={aboutImage} alt=" aboutImage" />
        </div>
      </div>
    </div>
  );
};
