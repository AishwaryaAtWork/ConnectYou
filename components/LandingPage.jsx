import Link from "next/link";
import Navbar from "./Navbar";
import WelcomeAnimation from "./WelcomeAnimation";
import Feature from "./Feature";

// Define the LandingPage component
const LandingPage = () => {
    return (
        // Main container with background and styling
        <div className="h-[90vh] bg-c1 text-white">
            <Navbar />
            <WelcomeAnimation />
            <Feature />
            {/* <div className="flex flex-col items-center px-4">
        Welcome message
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-bold">
            Welcome to ConnectYou 👋
          </div>
          <div className="mt-3 text-c3">
            Discover a new way to connect and chat with others. Join our vibrant
            community today.
          </div>
        </div>

        Login and Sign Up buttons
        <div className="flex flex-col md:flex-row items-center gap-4 w-full mt-10 mb-5">
          Login button
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full h-14 rounded-md cursor-pointer p-[1px] transition duration-300 transform hover:scale-105">
            <Link href="/login">
              <div className="flex items-center justify-center gap-3 text-white font-semibold bg-c1 w-full h-full rounded-md">
                Log In
              </div>
            </Link>
          </div>

          Spacer for mobile layout
          <div className="w-2 h-2 md:hidden"></div>

          Sign Up button
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full h-14 rounded-md cursor-pointer p-[1px] transition duration-300 transform hover:scale-105">
            <Link href="/register">
              <div className="flex items-center justify-center gap-3 text-white font-semibold bg-c1 w-full h-full rounded-md">
                Sign Up
              </div>
            </Link>
          </div>
        </div>

        Features section
        <div className="mt-8 text-c3">
          <p>Explore our exciting features:</p>
          <ul className="list-disc list-inside">
            <li>Connect with friends and family effortlessly.</li>
            <li>Share your thoughts and ideas with others.</li>
            <li>Discover new friends and connections.</li>
            <li>And many more!</li>
          </ul>
        </div>

        Animated pulse effect
        <div className="w-full h-px mt-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse"></div>

        FAQ button
        <div className="mt-5">
          <Link href="/faq">
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full h-14 rounded-md cursor-pointer p-[1px] transition duration-300 transform hover:scale-105">
              <div className="flex items-center justify-center gap-3 text-white font-semibold bg-c1 w-full h-full rounded-md p-5">
                FAQ
              </div>
            </div>
          </Link>
        </div>
      </div> */}
        </div>
    );
};

// Export the LandingPage component
export default LandingPage;
