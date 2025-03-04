import React from "react";
import ContactPageContent from "./component/pageContent";
import { Footer } from "../../layout/components";
import Navbar from "../../layout/components/header/header";
import { useLanguage } from "../../context/LanguageContext";

const ContactUs = () => {
  return (
    <>
      <Navbar />
      <ContactPageContent />
      <Footer />
    </>
  );
};

export default ContactUs;
