import Calc from '../init/Calc.js';
import ChangeSlider from './ChangeSlider.js';

class DragLineSlide{
    constructor (startObj) {
        this.startObj = startObj;
        this.objCalc = new Calc(this.startObj);
        this.objChangeSlider = new ChangeSlider(this.startObj);
        this.draggingLineHandler = this.dragging.bind(this);
        this.transitionEndLineHandler = this.transitionEnd.bind(this);
        this.fContent = document.querySelectorAll('.fancybox-content');
        this.fSlide = document.querySelectorAll('.fancybox-slide');
        this.fCurrentSlide = null;
        this.startDataPointer = {
            startDragX: null,
            leftStartCoord: null,
            windowWidth: null,
            elementWidthPadding: null,
        };
    }

    startLineDrag (e) {
        this.setNullToDataToCreateSliderLine();
        this.setDataCreateSliderLine (e);

        if (this.startObj.dataToCreateSliderLine.leftSliderInd !== null) {
            let closestLeft = this.fContent[this.startObj.dataToCreateSliderLine.leftSliderInd].closest('.fancybox-slide');
            closestLeft.style.transform = ("translate(" + (this.startObj.dataToCreateSliderLine.leftXCoordinata) + "px, " + "0px)");
            closestLeft.style.display = "block";
        }
        if (this.startObj.dataToCreateSliderLine.rightSliderInd !== null) {
            let closestRight = this.fContent[this.startObj.dataToCreateSliderLine.rightSliderInd].closest('.fancybox-slide');
            closestRight.style.transform = ("translate(" + (this.startObj.dataToCreateSliderLine.rightXCoordinata) + "px, " + "0px)");
            closestRight.style.display = "block";
        }
        this.fCurrentSlide.style.transform = ("translate(" + this.startObj.dataToCreateSliderLine.centerXCoordinata + "px, " + "0px)");;
        
        this.fCurrentSlide.addEventListener('pointermove', this.draggingLineHandler);

        
        this.startObj.dataToCreateSliderLine.fSlides.forEach( (el) => {
            el.addEventListener('transitionend', this.transitionEndLineHandler);
        } );
    }

    setDataCreateSliderLine (e) {
        let elemPadding, currentInd;
        this.fCurrentSlide = document.querySelector('.fancybox-slide--current');

        this.startObj.dataToCreateSliderLine.fSlides = document.querySelectorAll('.fancybox-slide');
        this.startObj.dataToCreateSliderLine.fSlides.forEach((el, ind) => {
            if(el.classList.contains("fancybox-slide--current")) {
                currentInd = ind;
            }
        });
        
        this.startDataPointer.startDragX = e.pageX;
        this.startDataPointer.leftStartCoord = this.fCurrentSlide.getBoundingClientRect().x;
        this.startDataPointer.windowWidth = this.fCurrentSlide.getBoundingClientRect().width;
        
        this.startDataPointer.elementWidthPadding = (this.startDataPointer.windowWidth - this.fCurrentSlide.children[0].getBoundingClientRect().width) / 2;

        if (this.startDataPointer.elementWidthPadding == 0 || this.startDataPointer.elementWidthPadding == null) {
            elemPadding = 30;
        }
        else {
            elemPadding = this.startDataPointer.elementWidthPadding;
        }

        this.startObj.dataToCreateSliderLine.centerSliderInd = currentInd;
        this.startObj.dataToCreateSliderLine.currentSlideWidth = e.target.offsetWidth;
        let leftInd = currentInd - 1;
        let rightInd = currentInd + 1;

        if (typeof this.startObj.objClientProps.bigImages[leftInd] !== 'undefined') {
            this.startObj.dataToCreateSliderLine.leftSliderInd = leftInd;
            this.startObj.dataToCreateSliderLine.leftXCoordinata = -this.startDataPointer.windowWidth - elemPadding;
        }
        else {
            this.startObj.dataToCreateSliderLine.leftSliderInd = null;
            this.startObj.dataToCreateSliderLine.leftXCoordinata = null;
        }
        
        if (typeof this.startObj.objClientProps.bigImages[rightInd] !== 'undefined') {
            this.startObj.dataToCreateSliderLine.rightSliderInd = rightInd;
            this.startObj.dataToCreateSliderLine.rightXCoordinata = this.startDataPointer.windowWidth + elemPadding;
        }
        else {
            this.startObj.dataToCreateSliderLine.rightSliderInd = null;
            this.startObj.dataToCreateSliderLine.rightXCoordinata = null;
        }

        this.startObj.dataToCreateSliderLine.centerXCoordinata = this.startDataPointer.leftStartCoord;
    }

    dragging(e) {
        let dragShiftX;
        let dragX = e.pageX;
        if (this.startObj.dataToCreateSliderLine.centerSliderInd <= 0 || this.startObj.dataToCreateSliderLine.centerSliderInd + 1 >= this.startObj.objClientProps.bigImages.length ) {
            dragShiftX = (dragX - this.startDataPointer.startDragX) / 5;
        }
        else {
            dragShiftX = dragX - this.startDataPointer.startDragX;
        }

        this.startObj.dataToCreateSliderLine.centerXCoordinata = this.startDataPointer.leftStartCoord + dragShiftX;
        this.objCalc.setCalcLineSize();
    }

    stopLineDrag (e) {
        this.objCalc.setCalcLineChangeSlider();
        this.fCurrentSlide.style.cursor = "grab";

        
        this.fCurrentSlide.removeEventListener('pointermove', this.draggingLineHandler);
    }

    setNullToDataToCreateSliderLine () {
        for (let propGlob in this.startObj.dataToCreateSliderLine) {
            this.startObj.dataToCreateSliderLine[propGlob] = null;
        }

        for (let propLocal in this.startDataPointer) {
            this.startDataPointer[propLocal] = null;
        }
    }

    transitionEnd (e) {
        this.startObj.dataToCreateSliderLine.fSlides.forEach( (el) => {
            el.removeAttribute("style");
        } );
        this.startObj.dataToCreateSliderLine.fSlides.forEach( (el) => {
            el.removeEventListener('transitionend', this.transitionEndLineHandler);
        } );
        this.objChangeSlider.changeThumbImage();
    }
}

export default DragLineSlide;