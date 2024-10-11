import React from "react";

const HomeNav = React.lazy(() => import("./homeNav/homePageNav"));
const MainNav = React.lazy(() => import("./mainNav/mainNav"));

export { HomeNav, MainNav };
