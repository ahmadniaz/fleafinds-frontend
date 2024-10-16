import React, { Suspense } from "react";
import { Home, AuthPage, DashboardPage, FleaMarketListing } from "./pages";
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
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/markets-listing" element={<FleaMarketListing />} />
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
