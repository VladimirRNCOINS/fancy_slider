import ResizeEvent from './ResizeEvent.js';
import InfobarSlider from './InfobarSlider.js';
import CalcArrowsNavagation from './CalcArrowsNavagation.js';

class ChangeSlider {
    constructor (startObj) {
        this.startObj = startObj;
        this.objCalcArrowsNavagation = new CalcArrowsNavagation(this.startObj);
        this.objInfobarSlider = new InfobarSlider(this.startObj);
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
        
        this.objInfobarSlider.setInfoInInfobar();
        
        this.objCalcArrowsNavagation.findActiveIndexThumbs();
         
        this.resizeEvent.calcResizeSlider();
    }

    changeThumbImage () {
        let lastInd, newInd; 
        let fThumbsListAnchors = document.querySelectorAll(".fancybox-thumbs__list a");
        this.startObj.dataToCreateSliderLine.fSlides.forEach( (el,ind) => {
            if(el.classList.contains("fancybox-slide--current")) {
                el.classList.remove("fancybox-slide--current");
                lastInd = ind;
            }
        });
        if (this.startObj.dataToCreateSliderLine.leftMoving == true && this.startObj.dataToCreateSliderLine.fSlides[lastInd + 1]) {
            this.startObj.dataToCreateSliderLine.fSlides[lastInd + 1].classList.add("fancybox-slide--current");
            newInd = lastInd + 1;
        }
        else if (this.startObj.dataToCreateSliderLine.rightMoving == true && this.startObj.dataToCreateSliderLine.fSlides[lastInd - 1]) {
            this.startObj.dataToCreateSliderLine.fSlides[lastInd - 1].classList.add("fancybox-slide--current");
            newInd = lastInd - 1;
        }
        else {
            this.startObj.dataToCreateSliderLine.fSlides[lastInd].classList.add("fancybox-slide--current");
            newInd = lastInd;
        } 
        fThumbsListAnchors.forEach( (el) => {
            el.classList.remove("fancybox-thumbs-active");
        });

        this.startObj.dataToCreateSliderLine.centerSliderInd = newInd;
        fThumbsListAnchors[newInd].classList.add("fancybox-thumbs-active");
        this.startObj.switchSmallThumbs.currentImg = this.startObj.dataToCreateSliderLine.centerSliderInd + 1;
        
        this.objInfobarSlider.setInfoInInfobar();
        
        this.objCalcArrowsNavagation.findActiveIndexThumbs();
    }
}

export default ChangeSlider;