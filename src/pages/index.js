import React from "react";

const Home = React.lazy(() => import("./home/home"));
const AuthPage = React.lazy(() => import("./auth/authPage"));

export { Home, AuthPage };
