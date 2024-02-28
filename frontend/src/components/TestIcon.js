// import React from 'react'

// export default function TestIcon() {
//   return (
//     <>
//     <div className='hero'>
//         <button className='btn' id="btn" >click here 
//         <span></span>
//         <span></span>
//         <span></span>
//         <span></span>
//         <span></span>
//         <span></span>
//         <span></span>
//         <span></span>
//         <span></span>
//         <span></span>
//         <span></span>
//         <span></span>
//         <span></span>
//         <span></span>
//         <span></span>
//         <span></span>
//         <span></span>
//         <span></span>
//         <span></span>
//         <span></span>
//         <span></span>
//         <span></span>
//         <span></span>
//         <span></span>
        
//         </button>
        
//     </div>
//     <script>
//         {
//           // Chờ cho tất cả các phần tử span được render trước khi thêm sự kiện click
//           window.onload = function() {
//             let btn = document.getElementById("btn");
//             let spans = document.getElementsByTagName("span");
//             btn.onclick = function() {
//               for (let span of spans) {
//                 span.classList.add("anim");
//               }
//               setTimeout(function() {
//                 for (let span of spans) {
//                   span.classList.remove("anim");
//                 }
//               }, 500);
//             };
//           }
//         }
//       </script>
//     {/* <script>
//       {
//       let btn = document.getElementById("btn");
//       let spans = document.getElementsByTagName("span");

//       btn.onclick = function(){
//         for( span of spans){
//           span.classList.add("anim");
//         }
//         setTimeout(function(){
//           for( span of spans){
//             span.classList.remove("anim");}

//         },500)

//    }

// }
//     </script> */}
//     </>
//   );
// } 
// import React, { useEffect, useRef } from 'react';
// import FavoriteIcon from '@mui/icons-material/Favorite';

// export default function TestIcon() {
//   const spansRef = useRef([]);

//   useEffect(() => {
//     const handleClick = () => {
//       for (const span of spansRef.current) {
//         span.classList.add("anim");
//       }
//       setTimeout(() => {
//         for (const span of spansRef.current) {
//           span.classList.remove("anim");
//         }
//       }, 500);
//     };

//     const btn = document.getElementById("btn");
//     btn.addEventListener("click", handleClick);

//     return () => {
//       btn.removeEventListener("click", handleClick);
//     };
//   }, []);

//   return (
//     <>
//       <div className='hero'>
//         <button className='btn' id="btn"><FavoriteIcon />
//           <span ref={(el) => (spansRef.current.push(el))}></span>
//           <span ref={(el) => (spansRef.current.push(el))}></span>
//           <span ref={(el) => (spansRef.current.push(el))}></span>
//           <span ref={(el) => (spansRef.current.push(el))}></span>
//           <span ref={(el) => (spansRef.current.push(el))}></span>
//           <span ref={(el) => (spansRef.current.push(el))}></span>
//           <span ref={(el) => (spansRef.current.push(el))}></span>
//           <span ref={(el) => (spansRef.current.push(el))}></span>
//           <span ref={(el) => (spansRef.current.push(el))}></span>
//           <span ref={(el) => (spansRef.current.push(el))}></span>
//           <span ref={(el) => (spansRef.current.push(el))}></span>
//           <span ref={(el) => (spansRef.current.push(el))}></span>
//           <span ref={(el) => (spansRef.current.push(el))}></span>
//           <span ref={(el) => (spansRef.current.push(el))}></span>
//           <span ref={(el) => (spansRef.current.push(el))}></span>
//           <span ref={(el) => (spansRef.current.push(el))}></span>
//           <span ref={(el) => (spansRef.current.push(el))}></span>
//           <span ref={(el) => (spansRef.current.push(el))}></span>
//           <span ref={(el) => (spansRef.current.push(el))}></span>
//           <span ref={(el) => (spansRef.current.push(el))}></span>
//           <span ref={(el) => (spansRef.current.push(el))}></span>
//           <span ref={(el) => (spansRef.current.push(el))}></span>
//           <span ref={(el) => (spansRef.current.push(el))}></span>
//           <span ref={(el) => (spansRef.current.push(el))}></span>
//           <span ref={(el) => (spansRef.current.push(el))}></span>
//           <span ref={(el) => (spansRef.current.push(el))}></span>
//           <span ref={(el) => (spansRef.current.push(el))}></span>
//           <span ref={(el) => (spansRef.current.push(el))}></span>
//           <span ref={(el) => (spansRef.current.push(el))}></span>
//           <span ref={(el) => (spansRef.current.push(el))}></span>
//           {/* Thêm các span khác tại đây */}
//         </button>
//       </div>
//     </>
//   );
// }
import React, { useEffect, useRef, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function TestIcon() {
  const [isClicked, setIsClicked] = useState(false);
  const spansRef = useRef([]);

  useEffect(() => {
    const handleClick = () => {
      setIsClicked((prevIsClicked) => !prevIsClicked);
    };

    const btn = document.getElementById("btn");
    btn.addEventListener("click", handleClick);

    return () => {
      btn.removeEventListener("click", handleClick);
    };
  }, []); // Dependency trống để chỉ chạy một lần sau khi render

  useEffect(() => {
    if (isClicked) {
      for (const span of spansRef.current) {
        span.classList.add("anim");
      }
      setTimeout(() => {
        for (const span of spansRef.current) {
          span.classList.remove("anim");
        }
      }, 700);
    }
  }, [isClicked]);

  return (
    <div className='hero'>
      <button className={`btn ${isClicked ? 'active' : ''}`} id="btn">
      {isClicked ? (
          <FavoriteIcon style={{ color: '#ff1876' }} />
        ) : (
          <FavoriteBorderIcon style={{ color: '#000' }} />
        )}
        {/* <FavoriteIcon style={{ color: isClicked ? '#ff1876' : '#000'}} /> */}
        {Array.from({ length: 16 }).map((_, index) => (
          <span key={index} ref={(el) => (spansRef.current[index] = el)}></span>
        ))}
      </button>
    </div>
  );
}