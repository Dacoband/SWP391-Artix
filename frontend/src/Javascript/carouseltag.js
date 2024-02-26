const carousel = document.querySelector(".ListofTag");

const dragging = (e) => {
    console.scrollLeft = e.pageX;
}

if (carousel) {
    carousel.addEventListener("mousemove", dragging);
}
