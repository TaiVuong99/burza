import React from "react";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";
import Banner from "./components/Banner";

function Home(props) {
  return (
    <>
      <Banner />
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias
        explicabo nisi tempora porro officia ipsam voluptate sapiente, ipsum
        rem. Soluta vitae ratione officiis iusto beatae temporibus accusantium
        veritatis architecto suscipit.
      </div>
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
