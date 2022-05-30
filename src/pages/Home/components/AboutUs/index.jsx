import React, { useEffect, useRef } from "react";
import { isBrowser } from "react-device-detect";

function AboutUs() {
  const aboutRef = useRef();

  const onScroll = () => {
    const topRect = aboutRef.current.getBoundingClientRect().top;
    const scrollPos = window.scrollY + window.innerHeight;

    if (topRect * 1.5 <= scrollPos)
      aboutRef.current.classList.add("about-active");
    else {
      aboutRef.current.classList.remove("about-active");
    }
  };

  useEffect(() => {
    if(isBrowser) window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={aboutRef} className="section">
      <div className="section-title">
        <span className="first-title">about</span> us
      </div>

      <div className="section-content grid-cols-1">
        <div className="col-container justify-start text-xs md:text-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime alias
          asperiores necessitatibus sit unde. Mollitia dolore autem error
          placeat! Ut aut expedita eveniet quisquam accusamus recusandae aliquam
          pariatur commodi excepturi. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Saepe, fugiat recusandae repellat dolores dolorem ad
          ipsam corrupti consequatur! Hic in recusandae libero maxime
          consequatur quos deserunt! A perferendis nobis animi. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Repellat adipisci laborum
          similique dolorem ab tempore, velit ad et reiciendis vitae id,
          voluptate asperiores autem. Possimus, suscipit beatae! Reiciendis,
          sequi dolores!
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
