import React from "react";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";
import AboutUs from "./components/AboutUs";
import Banner from "./components/Banner";
import ChooseTeam from "./components/ChooseTeam";
import OurService from "./components/OurService";

function Home(props) {
  return (
    <>
      <Banner />
      <OurService/>
      <AboutUs />
      <ChooseTeam />
    </>
    // <div>
    //   <BrowserView>
    //     <h1>This is rendered only in browser</h1>
    //   </BrowserView>
    //   <MobileView>
    //     <h1>This is rendered only on mobile</h1>
    //   </MobileView>
    // </div>
  );
}

export default Home;
