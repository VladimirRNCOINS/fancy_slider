import ResizeEvent from './ResizeEvent.js';
import ArrowsNavigation from './ArrowsNavigation.js';
import InfobarSlider from './InfobarSlider.js';

class ChangeSlider {
    constructor (startObj) {
        this.startObj = startObj;
        this.resizeEvent = new ResizeEvent(this.startObj);
    }

    changeMainImage () {
        let fSlide = document.querySelectorAll(".fancybox-slide");
        let fThumbsListAnchors = document.querySelectorAll(".fancybox-thumbs__list a");
        for (let fs = 0; fs < fSlide.length; fs++) {
            if (fs == this.startObj.switchSmallThumbs.clkThumbInd) {
                fSlide[fs].classList.add("fancybox-slide--current");
                this.startObj.objClientProps.currentElement = fSlide[fs];
                fThumbsListAnchors[fs].classList.add("fancybox-thumbs-active");
                this.startObj.switchSmallThumbs.currentImg = fs + 1;
            }
            else {
                fSlide[fs].classList.remove("fancybox-slide--current");
                fThumbsListAnchors[fs].classList.remove("fancybox-thumbs-active");
            }
        }
        
        this.startObj.objClientProps.scale = 1;
        this.objInfobarSlider = new InfobarSlider(this.startObj);
        this.objInfobarSlider.setInfoInInfobar();
        this.objArrowsNavigation = new ArrowsNavigation(this.startObj);
        this.objArrowsNavigation.findActiveIndexThumbs();

        this.resizeEvent.calcResizeSlider();
    }
}

export default ChangeSlider;