import React from "react";
import Navbar from "@/components/Navbar";
import FAQAnimation from "@/components/FAQAnimation";

const FAQ = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-[100vh] py-10 md:py-auto max-h-auto flex justify-center items-center bg-c1 mt-12 cursor-default">
        <FAQAnimation />
      </div>
    </>
  );
};

export default FAQ;
