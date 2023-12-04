import StartShowSlider from "./js/boot/StartShowSlider.js";

const clkElements = document.querySelectorAll('.fancybox-thumb, .thumb-item');

if (clkElements && clkElements.length) {
    clkElements.forEach ((el) => {
        el.addEventListener('click', showZoomNDragSlider);
    });
}

function showZoomNDragSlider (event) {
    event.stopPropagation();
    event.preventDefault();
    
    new StartShowSlider(event);
}
