import React from "react";
import Layout from "../../layout/layout";
import { OwnerRegistration, CitiesList } from "./components";
import { Grid2 } from "@mui/material";

const Header = () => {
  return (
    <div>
      <Layout />
      <Grid2
        container
        mt={3}
        // direction="row"
        flexWrap="nowrap"
        justifyContent="space-between"
      >
        <Grid2 item xs={4}>
          <OwnerRegistration />
        </Grid2>
        <Grid2 item xs={8}>
          <CitiesList />
        </Grid2>
      </Grid2>
    </div>
  );
};

export default Header;
