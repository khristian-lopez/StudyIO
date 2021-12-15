import React, {useState, useRef, useEffect}from 'react';
import './slide.scss'

// const pictures = ['assets/001.jpg', 'assets/002.jpg','assets/003.jpg','assets/004.jpg','assets/005.jpg'];

const delay = 2500;
export default function Slide() {

  // const [index, setIndex] = useState(0);
  // const timeoutRef = useRef(null);

  // const resetTimeout= () => {
  //   if(timeoutRef.current) {
  //     clearTimeout(timeoutRef.current);
  //   }
  // }

  // useEffect(() => {
  //   resetTimeout();
  //   timeoutRef.current = setTimeout(
  //     () =>
  //       setIndex((prevIndex) =>
  //         prevIndex === pictures.length - 1 ? 0: prevIndex + 1
  //       ),
  //       delay
  //   );

  //   return () => {
  //     resetTimeout();
  //   }
  // }, [index])
  return (
      <div
        className="slide"
      >
        {/* <div className="slideShow">
          {pictures.map((picture, index) => (
            <img src={picture} alt="" key={index}></img>
          ))}
        </div> */}
         <img src="assets/001.jpg" alt=""></img>
      </div>
  )
}