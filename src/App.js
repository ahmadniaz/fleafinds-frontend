import React, { Suspense } from "react";
import {
  Home,
  About,
  AuthPage,
  DashboardPage,
  FleaMarketListing,
  MarketDescription,
} from "./pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingFallback from "./components/loader/loader";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        {/* Define your routes */}
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/markets" element={<FleaMarketListing />} />
            <Route path="/markets/:slug" element={<MarketDescription />} />
            {/* <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} /> */}
            {/* Catch-all route for 404 Not Found */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
