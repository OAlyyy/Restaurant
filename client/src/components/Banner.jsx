import burgerBanner from "../assets/images/bannerphoto.png";
import Button from '@mui/material/Button';



export const Banner = () => {
   

    return (
        <div className="banner">
            <div className="banner-left-side">
                <h2 className="bannerTitle">
                    Food Ordering Made Easy
                </h2>
                <p className="bannerRedAlert">
                    Get Started Today!
                </p>
                <div >
                <Button color="secondary" style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'red'  }} href="/menu">Order NOW </Button>
                </div>
            </div>
            <div className="banner-right-side">
            <div className="bannerImage">
                <img src={burgerBanner} alt="banner"/>
            </div>
            </div>
        </div>
    )
}