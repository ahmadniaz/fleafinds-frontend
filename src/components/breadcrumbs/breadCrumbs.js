import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumbs, Typography } from "@mui/material";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x); // Split the pathname and filter empty parts

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {/* Link to the Home page */}
      <Link to="/">Home</Link>

      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

        const isLast = index === pathnames.length - 1;

        return isLast ? (
          // If it's the last breadcrumb, show as plain text
          <Typography key={to} color="text.primary">
            {value.charAt(0).toUpperCase() + value.slice(1)} {/* Capitalize */}
          </Typography>
        ) : (
          // Otherwise show a link
          <Link key={to} to={to}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
