import React, { useEffect, useRef } from "react";

function ChooseTeam() {
  const chooseRef = useRef();

  const onScroll = () => {
    const topRect = chooseRef.current.getBoundingClientRect().top;
    const scrollPos = window.scrollY + window.innerHeight;

    if (topRect * 2 <= scrollPos)
      chooseRef.current.classList.add("choose-active");
    else {
      chooseRef.current.classList.remove("choose-active");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={chooseRef} className="section h-[70vh]">
      <div className="section-title">
        <span className="first-title">choose</span> your team
      </div>

      <div className="section-content grid-cols-2">
        <div className="col-container">
          <div className="bg-img bg-cate-1">
            <div className="bg-text">burger team</div>
          </div>
        </div>

        <div className="col-container">
          <div className="bg-img bg-cate-2">
            <div className="bg-text">pizza team</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChooseTeam;
