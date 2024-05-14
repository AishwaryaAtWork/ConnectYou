import FAQAnimation from "@/components/FAQAnimation";
import Navbar from "@/components/Navbar";

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
