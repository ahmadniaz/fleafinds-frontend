import React, { useEffect, useRef, useState } from "react";
import {
  CitiesList,
  RegistrationBanner,
  HeroSection,
  LocalTipsAndEvents,
} from "./components";
import NavBar from "../../layout/components/header/header";
import Footer from "../../layout/components/footer/footer";
import { tips } from "../../data/data";
import axios from "axios";

const Home = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const isAuthenticated = localStorage.getItem("token"); // Check if token exists
  const citiesRef = useRef(null);

  useEffect(() => {
    getAllEvents();
  }, []);

  const getAllEvents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL_LOCAL}api/event`
      );
      setAllEvents(response?.data?.events);
    } catch (error) {
      console.log(error, "ERROR");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <NavBar />
      <HeroSection citiesRef={citiesRef} />
      {!isAuthenticated && <RegistrationBanner />}
      <CitiesList citiesRef={citiesRef} />
      <LocalTipsAndEvents tips={tips} events={allEvents} />
      <Footer />
    </div>
  );
};

export default Home;
