import ResizeEvent from './ResizeEvent.js';
import InfobarSlider from './InfobarSlider.js';
import CalcArrowsNavagation from './CalcArrowsNavagation.js';

class ChangeSlider {
    constructor (startObj) {
        this.startObj = startObj;
        this.objCalcArrowsNavagation = new CalcArrowsNavagation(this.startObj);
        this.objInfobarSlider = new InfobarSlider(this.startObj);
        this.resizeEvent = new ResizeEvent(this.startObj);
        this.transitionEndChangeHandler = this.transitionendChangeHandler.bind(this);
    }

    changeMainImage () {
        let fSlide = document.querySelectorAll(".fancybox-slide");
        let fThumbsListAnchors = document.querySelectorAll(".fancybox-thumbs__list a");
        
        this.changeCurrentClass (fSlide, fThumbsListAnchors).
        then((contentCurrent) =>{
            contentCurrent.style.transition = "opacity 0.5s linear 0s";
            contentCurrent.style.opacity = 1;
        });
        
        this.startObj.objClientProps.scale = 1;
        
        this.objInfobarSlider.setInfoInInfobar();
        
        this.objCalcArrowsNavagation.findActiveIndexThumbs();
        this.objCalcArrowsNavagation.checkVideoElement();
         
        this.resizeEvent.calcResizeSlider();
    }

    changeCurrentClass (fSlide, fThumbsListAnchors) {
        return new Promise((resolve, reject) => {
            for (let fs = 0; fs < fSlide.length; fs++) {
                if (fs == this.startObj.switchSmallThumbs.clkThumbInd) {
                    fSlide[fs].classList.add("fancybox-slide--current");
    
                    let contentCurrent = document.querySelector('.fancybox-slide--current .fancybox-content');
                    contentCurrent.style.transition = "opacity 0s linear 0s";
                    contentCurrent.style.opacity = 0;
                    contentCurrent.addEventListener('transitionend', this.transitionEndChangeHandler);
                    
                    this.startObj.objClientProps.currentElement = fSlide[fs];
                    fThumbsListAnchors[fs].classList.add("fancybox-thumbs-active");
                    this.startObj.switchSmallThumbs.currentImg = fs + 1;
                    resolve(contentCurrent);
                }
                else {
                    fSlide[fs].classList.remove("fancybox-slide--current");
                    fThumbsListAnchors[fs].classList.remove("fancybox-thumbs-active");
                }
            }
        });
    }

    transitionendChangeHandler (e) {
        let contentCurrent = document.querySelector('.fancybox-slide--current .fancybox-content');
        contentCurrent.style.removeProperty('opacity');
        contentCurrent.style.removeProperty('transition');
        contentCurrent.removeEventListener('transitionend', this.transitionEndChangeHandler);
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
        this.objCalcArrowsNavagation.checkVideoElement();
    }
}

export default ChangeSlider;