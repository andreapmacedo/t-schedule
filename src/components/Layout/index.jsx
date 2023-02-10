import React from "react";
import { Grid } from "./styles";
import MainHeader from "../MainHeader";
import Aside from "../Aside";
import Content from "../Content";

const Layout = () => {
  return (
    
    <Grid>
      <MainHeader />
      <Aside />
      <Content />
    </Grid>
    
  );
}

export default Layout;