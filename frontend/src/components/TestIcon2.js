// import React from 'react'

// export default function TestIcon2() {
//   return (
//     <div className='test2'>
//         <button className='button'>Click 2</button>
//     </div>
//   )
// }
// <script>
//     const button = document.querySelector(".button");

//     button.addEventListenter("click",(e) => {
//         e.preventDefault();
//         button.classList.add("animate");

//         setTimeout(() => {
//             button.classList.remove("animate"); 
//         },600);

//     });
// </script>
import React, { useEffect } from 'react';

export default function TestIcon2() {
  useEffect(() => {
    const button = document.querySelector(".button");

    button.addEventListener("click", (e) => {
      e.preventDefault();
      button.classList.add("animate");

      setTimeout(() => {
        button.classList.remove("animate");
      }, 600);
    });

    // Cleanup
    return () => {
      button.removeEventListener("click", (e) => {
        e.preventDefault();
        button.classList.add("animate");

        setTimeout(() => {
          button.classList.remove("animate");
        }, 600);
      });
    };
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  return (
    <div className='test2'>
      <button className='button'>Click 2</button>
    </div>
  );
}

