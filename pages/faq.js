import React from "react";
import Navbar from "@/components/Navbar";
import FAQAnimation from "@/components/FAQAnimation";

const FAQ = () => {
  return (
    <>
      <Navbar />
      <div className="h-[100vh] flex justify-center items-center bg-c1 mt-12 cursor-default">
        <FAQAnimation />
      </div>
    </>
  );
};

export default FAQ;
