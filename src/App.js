import React, { Suspense } from "react";
import {
  Home,
  About,
  AuthPage,
  DashboardPage,
  FleaMarketListing,
  MarketDescription,
  FAQPage,
  TermsAndConditionsPage,
  ContactUsPage,
} from "./pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrivateRoute, LoadingFallback } from "./components";
import "./App.css";

function App() {
  return (
    <Router future={{ scrollRestoration: "manual" }}>
      <div>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/markets" element={<FleaMarketListing />} />
            <Route path="/markets/:slug" element={<MarketDescription />} />
            <Route path="/faqs" element={<FAQPage />} />
            <Route path="/terms" element={<TermsAndConditionsPage />} />
            <Route path="/contact" element={<ContactUsPage />} />

            {/* Private Route for Dashboard */}
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
