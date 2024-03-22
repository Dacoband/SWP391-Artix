import React, { useEffect, useRef, useState, useContext } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { ThemeContext } from './Themes/ThemeProvider.tsx';
export default function TestIcon() {
  const { theme } = useContext(ThemeContext);
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

      <div className='button-favourite'>
        <button 
        style={{display: 'flex'}}
        className={`btn ${isClicked ? 'active' : ''}`} id="btn">
          {isClicked ? (
            <FavoriteIcon sx={{ fontSize: 35 }} style={{ color: '#ff1876' }} />
          ) : (
            <FavoriteBorderIcon sx={{ color: theme.color, backgroundColor: "none", fontSize: 35 }} />
          )}
          {/* <FavoriteIcon style={{ color: isClicked ? '#ff1876' : '#000'}} /> */}
          {Array.from({ length: 16 }).map((_, index) => (
            <span key={index} ref={(el) => (spansRef.current[index] = el)}></span>
          ))}
       
        <h4 className='addfavourite' style={{paddingTop:"5px",color:isClicked?"#ff1876" : theme.color}}>
          {isClicked ? "Thanks For The Like!" : "Add To Favourites"}
        </h4>
        </button>
      </div>
    </div>







  );
}