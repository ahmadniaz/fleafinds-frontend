import React from "react";

const NavBar = React.lazy(() => import("./header/header"));
const Footer = React.lazy(() => import("./footer/footer"));

export { NavBar, Footer };
