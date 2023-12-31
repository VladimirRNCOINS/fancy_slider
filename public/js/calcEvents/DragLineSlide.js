import Calc from '../init/Calc.js';
import ChangeSlider from './ChangeSlider.js';
import Navigation from '../init/Navigation.js';

class DragLineSlide{
    constructor (startObj) {
        this.startObj = startObj;
        this.objNavigation = new Navigation(this.startObj);
        this.objCalc = new Calc(this.startObj);
        this.objChangeSlider = new ChangeSlider(this.startObj);
        this.draggingLineHandler = this.dragging.bind(this);
        this.transitionEndLineHandler = this.transitionEnd.bind(this);
        this.fContent = document.querySelectorAll('.handsybox-content');
        this.fSlide = document.querySelectorAll('.handsybox-slide');
        this.fCurrentSlide = null;
        this.startDataPointer = {
            startDragX: null,
            leftStartCoord: null,
            windowWidth: null,
            elementWidthPadding: null,
        };
        this.compliteDrag = true;
    }

    startLineDrag (e) {
        if (this.compliteDrag == true) {
            this.setNullToDataToCreateSliderLine();
            this.setDataCreateSliderLine (e);

            if (this.startObj.dataToCreateSliderLine.leftSliderInd !== null) {
                let closestLeft = this.fContent[this.startObj.dataToCreateSliderLine.leftSliderInd].closest('.handsybox-slide');
                closestLeft.style.transform = ("translate(" + (this.startObj.dataToCreateSliderLine.leftXCoordinata) + "px, " + "0px)");
                closestLeft.style.display = "block";
            }
            if (this.startObj.dataToCreateSliderLine.rightSliderInd !== null) {
                let closestRight = this.fContent[this.startObj.dataToCreateSliderLine.rightSliderInd].closest('.handsybox-slide');
                closestRight.style.transform = ("translate(" + (this.startObj.dataToCreateSliderLine.rightXCoordinata) + "px, " + "0px)");
                closestRight.style.display = "block";
            }
            this.fCurrentSlide.style.transform = ("translate(" + this.startObj.dataToCreateSliderLine.centerXCoordinata + "px, " + "0px)");;
            
            this.fCurrentSlide.addEventListener('pointermove', this.draggingLineHandler);

            
            this.startObj.dataToCreateSliderLine.fSlides.forEach( (el) => {
                el.addEventListener('transitionend', this.transitionEndLineHandler);
            } );
        }
        this.compliteDrag = false;
    }

    setDataCreateSliderLine (e) {
        let elemPadding, currentInd;
        this.fCurrentSlide = document.querySelector('.handsybox-slide--current');

        this.startObj.dataToCreateSliderLine.fSlides = document.querySelectorAll('.handsybox-slide');
        this.startObj.dataToCreateSliderLine.fSlides.forEach((el, ind) => {
            if(el.classList.contains("handsybox-slide--current")) {
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

        if (((this.startObj.dataToCreateSliderLine.centerSliderInd <= 0) && ((this.startDataPointer.startDragX - dragX) < 0)) || 
        ((this.startObj.dataToCreateSliderLine.centerSliderInd + 1 >= this.startObj.objClientProps.bigImages.length)  && ((this.startDataPointer.startDragX - dragX) > 0))) {
            
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

        this.objNavigation.manageNavigationTools();
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
        this.compliteDrag = true;
        this.startObj.dataToCreateSliderLine.fSlides.forEach( (el) => {
            el.removeAttribute("style");
        } );
        this.startObj.dataToCreateSliderLine.fSlides.forEach( (el) => {
            el.removeEventListener('transitionend', this.transitionEndLineHandler);
        } );
        if (this.startObj.objEvents.fContents.length > 1) {
            this.objChangeSlider.changeThumbImage();
        }
    }
}

export default DragLineSlide;