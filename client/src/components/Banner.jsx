import Image1 from "../assets/images/Image1.png";
import Image2 from "../assets/images/Image2.png";
import Image3 from "../assets/images/Image3.png";
import Image4 from "../assets/images/Image4.png";
import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";

export const Banner = () => {
  const images = [Image1, Image2, Image3, Image4];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) =>
        prevImage === images.length - 1 ? 0 : prevImage + 1
      );
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [images.length]);

  return (
    <div className="banner" style={{ 
      backgroundImage: `url(${images[currentImage]})`,}}>
      <div className="banner-left-side">
        <div className="bannerRedAlert">Order Now!</div>
        <div>
          <Button
            className="bannerBttn"
            color="secondary"
            style={{ fontWeight: "bold", fontSize: "1.2rem", color: "red" }}
            href="/menu"
          >
            MENU
          </Button>
        </div>
      </div>
    </div>
  );
};
