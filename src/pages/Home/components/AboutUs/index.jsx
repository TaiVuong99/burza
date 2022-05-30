import React, { useEffect, useLayoutEffect, useRef } from "react";

function AboutUs() {
  const aboutRef = useRef();
  
  const onScroll = () => {
      const topRect = aboutRef.current.getBoundingClientRect().top;
      const scrollPos = window.scrollY + window.innerHeight
    
      if(topRect*1.5 <= scrollPos) aboutRef.current.classList.add('about-active');
      else {
        aboutRef.current.classList.remove('about-active');
      }
  }

  useLayoutEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div ref={aboutRef} className="w-full h-[50vh] px-80 pt-10 flex flex-col items-center">
      <div className="text-4xl font-light uppercase">
        <span className="mb-2 border-b-2 border-red-500 font-medium">about</span> us
      </div>
      
      <div className="text-justify pt-4">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit qui
        quidem consequuntur quos assumenda voluptatum voluptate harum!
        Doloremque consequatur nulla, sunt ea repellat odio error dicta. Iste
        illum sint dolorum. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Eos sed, modi error, provident iste nulla sapiente earum, a natus
        accusantium est corporis explicabo voluptatibus reiciendis. Possimus
        omnis similique itaque obcaecati?Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Laudantium ratione ducimus nulla. Aspernatur quibusdam
        maxime est! Laboriosam accusantium dolores ab natus ullam sint modi
        provident debitis sit assumenda? Exercitationem, modi!Lorem Lorem ipsum,
        dolor sit amet consectetur adipisicing elit. Eaque, aperiam sunt odit
        tenetur qui reiciendis harum id, obcaecati unde nostrum voluptatibus
        soluta expedita animi nisi quasi velit, veniam blanditiis maxime.
      </div>
    </div>
  );
}

export default AboutUs;
