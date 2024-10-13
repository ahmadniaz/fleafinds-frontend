import React from "react";
import { HomeNav, MainNav } from "./components";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <div>
      {location.pathname === "/" || location.pathname === "/auth" ? (
        <HomeNav />
      ) : (
        <MainNav />
      )}
    </div>
  );
};

export default Navbar;
