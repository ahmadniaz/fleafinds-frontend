import React from "react";

const Home = React.lazy(() => import("./home/home"));
const AuthPage = React.lazy(() => import("./auth/authPage"));
const DashboardPage = React.lazy(() => import("./dashboard/dashboard"));

export { Home, AuthPage, DashboardPage };
