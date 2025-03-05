import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Breadcrumbs, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLanguage } from "../../context/LanguageContext";

const Breadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const { translations } = useLanguage();

  const handleBack = () => {
    navigate(-1); // Navigates to the previous page
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {/* Back button with icon */}
      <IconButton onClick={handleBack} aria-label="back">
        <ArrowBackIcon />
      </IconButton>

      {/* Breadcrumbs navigation */}
      <Breadcrumbs aria-label="breadcrumb">
        {/* Home link */}
        <Link to="/">{translations.NAVBAR.HOME}</Link>

        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return isLast ? (
            // If it's the last breadcrumb, show as plain text
            <Typography key={to} color="text.primary">
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </Typography>
          ) : (
            // Otherwise, show as a link
            <Link key={to} to={to}>
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

export default Breadcrumb;
