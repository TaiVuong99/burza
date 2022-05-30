import React, { useEffect, useRef } from "react";
import { isBrowser } from "react-device-detect";
import { AiFillHeart, AiFillThunderbolt } from "react-icons/ai";
import { GiReceiveMoney } from "react-icons/gi";
import { IoFastFood } from "react-icons/io5";

function OurService() {
  const serviceRef = useRef();

  const onScroll = () => {
    const topRect = serviceRef.current.getBoundingClientRect().top;
    const scrollPos = window.scrollY + window.innerHeight;
    if (topRect * 1.5 <= scrollPos)
      serviceRef.current.classList.add("service-active");
    else {
      serviceRef.current.classList.remove("service-active");
    }
  };

  useEffect(() => {
    if(isBrowser) window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={serviceRef} className="section xl:h-[40vh]">
      <div className="section-title">
        <span className="first-title">Our</span> service
      </div>

      <div className="section-content grid-cols-2 md:grid-cols-4">
        <div className="col-container  lg:hover:opacity-60">
          <div className="icon text-lime-500 border-lime-500">
            <IoFastFood />
          </div>

          <div className="icon-description text-lime-500">
            Fresh food
          </div>
        </div>

        <div className="col-container lg:hover:opacity-60">
          <div className="icon text-red-600 border-red-600">
            <AiFillHeart />
          </div>

          <div className="icon-description text-red-600">favorite store</div>
        </div>

        <div className="col-container lg:hover:opacity-60">
          <div className="icon text-primary border-primary">
            <GiReceiveMoney />
          </div>

          <div className="icon-description text-primary">good price</div>
        </div>

        <div className="col-container lg:hover:opacity-60">
          <div className="icon text-yellow-400 border-yellow-400">
            <AiFillThunderbolt />
          </div>

          <div className="icon-description text-yellow-400">fast delivery</div>
        </div>
      </div>
    </div>
  );
}

export default OurService;
