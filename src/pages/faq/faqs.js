import React from "react";
import FaqComponent from "./component/faqComponent";
import Navbar from "../../layout/components/header/header";
import Footer from "../../layout/components/footer/footer";

const FAQPage = () => {
  return (
    <>
      <Navbar />
      <FaqComponent />
      <Footer />
    </>
  );
};

export default FAQPage;
