import React, { useEffect, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { GetTagList } from '../../../API/TagAPI/GET.tsx';
import { Tag } from '../../../Interfaces/TagInterface';

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
  const [tagList, SetTagList] = useState<Tag[]>([]);
  useEffect(() => {
    const fetchTags = async () => {
      const tagList = await GetTagList()
      SetTagList(tagList? tagList :[]);
    };
    fetchTags();
  },[])

  function TagList(){
    return(
      <>
       <Slider {...settings}>
        {tagList.map((tag, index) => (
        <div key={tag.tagID}>
          <button className='itemtag' style={{ backgroundColor: colors[index % colors.length] }}>{tag.tagName}</button>
        </div>
      ))}
       </Slider>
      </>
    )
  }

  return (
      tagList.length!==0 ?
        <TagList/>
      :
      ""
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
