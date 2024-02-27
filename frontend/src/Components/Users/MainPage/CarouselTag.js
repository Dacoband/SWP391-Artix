import React from 'react'
import { ListTag } from '../../../share/ListofTag'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function CarouselTag(){
  const settings = {
    dots: false,
    infinite: true,
    // speed: 5000,
    slidesToShow: 3,
    variableWidth: true,
    slidesToScroll: 3,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 8000,
    draggable:true,
  };
  const colors = ["#82c87e", "#c07ec8", "#c89c7e", "#7E8DC8", "#C07EC8","#C87E8A"];
  return (
    <Slider {...settings}>
      {ListTag.map((tag, index) => (
        <div key={tag.id}>
          <button className='itemtag' style={{ backgroundColor: colors[index % colors.length] }}>{tag.nameTag}</button>
        </div>
      ))}
    </Slider>
  );
}
// export default function CarouselTag() {
//   return (
//     <div>

// {/* <carouseltag> */}
//         {/* <ArrowBackIosNewIcon  sx={{ fontSize: 15 }} className='arrow-left'/> */}
//         <ul className='ListofTag'>
//         {ListTag.map(tag => (
//             <li key={tag.id}>
//               <button className='itemtag'>{tag.nameTag}</button>
//             </li>
//           ))}
//         </ul>
//         {/* <ArrowForwardIosIcon  sx={{ fontSize: 15 }} className='arrow-right'/> */}
//         {/* </carouseltag> */}

        
//     </div>
//   )
// }
