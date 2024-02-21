import React from 'react'

export default function TestIcon() {
  return (
    <>
    <div className='hero'>
        <button className='btn' id="btn" >click here 
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        
        </button>
        
    </div>
    {/* <script>
        {
          // Chờ cho tất cả các phần tử span được render trước khi thêm sự kiện click
          window.onload = function() {
            let btn = document.getElementById("btn");
            let spans = document.getElementsByTagName("span");
            btn.onclick = function() {
              for (let span of spans) {
                span.classList.add("anim");
              }
              setTimeout(function() {
                for (let span of spans) {
                  span.classList.remove("anim");
                }
              }, 500);
            };
          }
        }
      </script> */}
    <script>
      {
      let btn = document.getElementById("btn");
      let spans = document.getElementsByTagName("span");

      btn.onclick = function(){
        for( span of spans){
          span.classList.add("anim");
        }
        setTimeout(function(){
          for( span of spans){
            span.classList.remove("anim");}

        },500)

   }

}
    </script>
    </>
  );
} 
