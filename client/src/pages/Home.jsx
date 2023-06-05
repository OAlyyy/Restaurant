import React from "react";
import { Banner } from "../components/Banner.jsx";
import { ProductsPreview } from "../components/ProductsPreview.jsx";
import { Grid } from "@mui/material";

const Home = () => {
  return (
    <Grid container spacing={0} className="homePage">
      <Grid item xs={12}>
        <Banner/>
      </Grid>
      <Grid item xs={12}>
        <ProductsPreview />
      </Grid>
    </Grid>
  );
};
export default Home;
