import React from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./Screens/LandingPages/LandingPage";
import BlogPostOne from "./Components/Blog/BlogPostOne";
import TopNavbar from "./Components/TopNavbar/TopNavbar";
import { Stepper } from "./Components/stepperForSignup/Stepper";
import Allpost from "./Components/Allpost";
import Choosen from "./Components/ChoosenPages/choosen";
import Choosen2 from "./Components/ChoosenPages/choosen2";
import Contact from "./Components/contact-us";
import GalleryPage from "./Components/Gallery/GalleryPage";
import GalleryPageDetails from "./Components/Gallery/GalleryPageDetails";
import { Dashboard } from "./Screens/UserDashboard/Dashboard";
import IsProtected from "./auth/IsProtected";
import { Footer } from "./Components/Footer";
import MyFavouriteArtGallery from "./Screens/UserDashboard/FavouriteArt/MyFavouriteArt";
import Plans from "./Components/Subscription_Plan/Plans";
import Payment from "./Screens/UserDashboard/Payment/UserPayment";
import MusicPage from "./Components/Music/MusicPage";
import Cart from "./Components/Cart/Cart";
import Donate from "./Components/Donate/Donate";
import PayCard from './Components/Paycard/Paycard'

import ReviewStripe from "./Components/Review/ReviewStripe";
import NewPassword from "./Components/Reset Password/ResetPassword";
import Welcome from "./Components/welcome/Welcome";
import SubscriptionThankYou from "./Components/SubscriptionThankYou";
import TersmsAndConditions from "./Components/Terms&Use";
import PrivacyPolicy from "./Components/PrivacyPolicy";

function App() {

  // const navigate = useNavigate();

  // Define a catch-all route that redirects to the landing page
  // const NotFound = () => {
  //   navigate("/");
  //   return null;
  // };
  const location = useLocation();

  // Check if the current route path is "/thankyou"
  const isThankYouRoute = location.pathname === "/thankyou";


  return (
    <div className="" style={{ minHeight: "100vh" ,overflow:'hidden' }}>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard/*" element={<IsProtected Component={Dashboard} />}/>
        {/* <Route path="*" element={<NotFound />} />  */}
      </Routes>

      {/* Move the TopNavbar inside the Routes */}
      <Routes>
        {/* Include all the routes where the TopNavbar should be visible */}
        <Route path="/" element={<TopNavbar />} />
        <Route path="/blog/allpost" element={<TopNavbar />} />
        <Route path="/blog" element={<TopNavbar />} />
        <Route path="/step" element={<TopNavbar />} />
        <Route path="/choose" element={<TopNavbar />} />
        <Route path="/choosefolder" element={<TopNavbar />} />
        <Route path="/contact-us" element={<TopNavbar />} />
        <Route path="/gallery" element={<TopNavbar />} />
        <Route path="/music" element={<TopNavbar />} />
        <Route path="/art-details" element={<TopNavbar />} />
        <Route path="/my-favorite-art-gallery" element={<TopNavbar />} />
        <Route path="/donate" element={<TopNavbar />} />
        <Route path="/checkout" element={<TopNavbar />} />
        <Route path="/Terms&Use" element={<TopNavbar />} />
        <Route path="/privacy-policy" element={<TopNavbar />} />
        {/* <Route path="/forgotpassword/:id/*" element={<TopNavbar />} /> */}
      </Routes>

      <Routes>
        <Route path="/blog/allpost" element={<Allpost />} />
        <Route path="/blog" element={<BlogPostOne />} />
        <Route path="/step" element={<Stepper />} />
        <Route path="/choose" element={<Choosen />} />
        <Route path="/choosefolder" element={<Choosen2 />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/music" element={<MusicPage />} />
        <Route path="/art-details" element={<GalleryPageDetails />} />
        <Route path="/my-favorite-art-gallery" element={<MyFavouriteArtGallery />} />
        <Route path="/payment-plans/:id/*" element={<Plans />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/forgotpassword/:id/*" element={<NewPassword />} />
        <Route path="/checkout" element={<ReviewStripe />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/paycard" element={<PayCard />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/thankyou/:id/*" element={<SubscriptionThankYou />} />
        <Route path="/Terms&Use" element={<TersmsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      

      


      </Routes>

      {!isThankYouRoute && <Footer />}
    </div>
  );
}

export default App;
