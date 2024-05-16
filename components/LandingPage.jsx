import Feature from "./Feature";
import LandingFooter from "./LandingFooter";
import Navbar from "./Navbar";
import WelcomeAnimation from "./WelcomeAnimation";

// Define the LandingPage component
const LandingPage = () => {
    return (
        // Main container with background and styling
        <div className="h-[90vh] bg-c1 text-white" id="home">
            <Navbar />
            <WelcomeAnimation />
            <Feature />
            <LandingFooter />
        </div>
    );
};

// Export the LandingPage component
export default LandingPage;
