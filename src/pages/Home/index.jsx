import React from "react";

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
  );
}

export default Home;
