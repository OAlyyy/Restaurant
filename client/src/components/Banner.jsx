
// Step number #2 Change Banner Img
import burgerBanner from "../assets/images/burger-bannner.png";
import Button from "@mui/material/Button";

export const Banner = () => {
  return (
    <div className="banner">
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

      <div className="banner-right-side">
        <div className="bannerImage">
          <img src={burgerBanner} alt="banner" />
        </div>
      </div>
    </div>
  );
};
