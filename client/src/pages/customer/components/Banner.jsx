import Image1 from "../../../assets/images/1.png";
import Image2 from "../../../assets/images/2.png";
import Image3 from "../../../assets/images/3.png";
import Image4 from "../../../assets/images/4.png";
import Image5 from "../../../assets/images/5.png";
import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";

export const Banner = () => {
  const images = [Image1, Image2, Image3, Image4, Image5];
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
       {/*  <div className="bannerRedAlert">Order Now!</div> */}
        <div>
          <Button
          variant="contained"
            className="bannerBttn"
            style={{ fontWeight: "bold", fontSize: "1.2rem", color: "white" , backgroundColor:"#CC8721"}}
            href="/menu"
          >
            MENU
          </Button>
        </div>
      </div>
    </div>
  );
};
