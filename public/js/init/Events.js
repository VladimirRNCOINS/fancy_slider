import ResizeEvent from '../calcEvents/ResizeEvent.js';
import DragCurrentSlide from '../calcEvents/DragCurrentSlide.js';
import ChangeSlider from '../calcEvents/ChangeSlider.js';
import ZoomEvents from '../calcEvents/ZoomEvents.js';
import ArrowsNavigation from '../calcEvents/ArrowsNavigation.js';
import DragLineSlide from '../calcEvents/DragLineSlide.js';
import MouseMoveSliderElement from '../calcEvents/MouseMoveSliderElement.js';

class Events {

    constructor (startObj) {
        this.startObj = startObj;

        this.objResizeEvent = new ResizeEvent(this.startObj);
        this.resizeHandler = this.resizeHandsySlider.bind(this);
        window.addEventListener('resize', this.resizeHandler);

        this.closeButton = document.querySelector('.handsybox-button--close');
        if (this.closeButton) {
            this.closeButton.addEventListener('click', {handleEvent: this.clickCloseButton, self: this.startObj, events: this});
        }
        
        this.objChangeSlider = new ChangeSlider(this.startObj);
        this.switchThumbListHandler = this.switchThumbList.bind(this);
        this.thumbsList = document.querySelectorAll('.handsybox-thumbs__list a');
        if (this.thumbsList.length > 1) {
            for (let tl = 0; tl < this.thumbsList.length; tl++) {
                this.thumbsList[tl].addEventListener('click', this.switchThumbListHandler);
            }
        }

        this.objZoomEvents = new ZoomEvents(this.startObj);
        this.clickZoomPlusHandler = this.clickZoomPlus.bind(this);
        this.clickZoomMinusHandler = this.clickZoomMinus.bind(this);
        this.zoomIn = document.querySelector('#zoom_in_handsy');
        if (this.zoomIn ) {
            this.zoomIn.addEventListener('click', this.clickZoomPlusHandler);
        }
        this.zoomOut = document.querySelector('#zoom_out_handsy');
        if (this.zoomOut ) {
            this.zoomOut.addEventListener('click', this.clickZoomMinusHandler);
        }

        this.objCurrentSlide = new DragCurrentSlide(this.startObj);
        this.fContents = document.querySelectorAll('.handsybox-content');
        if (this.fContents.length) {
            this.fContents.forEach( (el) => {
                el.addEventListener('pointerdown', {handleEvent: this.startDrag, self: this.startObj, currentDrag: this.objCurrentSlide});
                el.addEventListener('pointerup', {handleEvent: this.stopDrag, self: this.startObj, currentDrag: this.objCurrentSlide});
		        el.addEventListener('pointercancel', {handleEvent: this.stopDrag, self: this.startObj, currentDrag: this.objCurrentSlide});
            });
        }
        this.objLineSlide = new DragLineSlide(this.startObj);
        this.objMouseMoveSliderElement = new MouseMoveSliderElement(this.startObj);
        this.fSlides = document.querySelectorAll('.handsybox-slide');
        this.mouseMoveHandler = this.mouseMoveSlider.bind(this);
        if (this.fSlides.length) {
            this.fSlides.forEach( (el) => {
                el.addEventListener('pointerdown', {handleEvent: this.startLineDrag, self: this.startObj, lineDrag: this.objLineSlide});
                el.addEventListener('pointerup', {handleEvent: this.stopLineDrag, self: this.startObj, lineDrag: this.objLineSlide});
                el.addEventListener('pointercancel', {handleEvent: this.stopLineDrag, self: this.startObj, lineDrag: this.objLineSlide});
                el.addEventListener('mousemove', this.mouseMoveHandler);
            });
        }

        this.fArrowsButton = document.querySelectorAll('.handsybox-navigation .handsybox-button');
        if (this.fArrowsButton.length > 1) {
            this.objArrowsNavigation = new ArrowsNavigation(this.startObj);
            this.clickArrowsNavigationHandler = this.clickArrowsNavigation.bind(this);
            this.fArrowsButton.forEach( (el) => {
                el.addEventListener('click', this.clickArrowsNavigationHandler);
            });
        }
    }

    clickCloseButton () {
        this.sliderImagesWrapper = document.getElementById('sliderImagesWrapper');
        if (this.sliderImagesWrapper) {
            this.self.resizeSession = false;
            
            this.sliderImagesWrapper.remove();
            
            window.removeEventListener('resize', this.events.resizeHandler);
        }
    }

    resizeHandsySlider () {
        this.objResizeEvent.calcResizeSlider(this.startObj.objClientProps.loadImg);
    }

    switchThumbList (e) {
        let clkElInd = e.target.getAttribute('data-index');
        this.startObj.switchSmallThumbs.clkThumbInd = +clkElInd;
        
        this.objChangeSlider.changeMainImage();
    }

    clickZoomPlus () {
        this.objZoomEvents.zoomPlusCalc(this.startObj);
    }

    clickZoomMinus () {
        this.objZoomEvents.zoomMinusCalc(this.startObj);
    }

    startDrag (e) {
        if (this.self.objClientProps.scale > 1) {
            this.currentDrag.startDrag(e);
        }
    }

    startLineDrag (e) {
        if (this.self.objClientProps.scale == 1) {
            this.lineDrag.startLineDrag(e);
        }
    }

    stopDrag (e) {
        if (this.self.objClientProps.scale > 1) {
            this.currentDrag.stopDrag(e);
        }
    }

    stopLineDrag (e) {
        if (this.self.objClientProps.scale == 1) {
            this.lineDrag.stopLineDrag(e);
        }
    }

    clickArrowsNavigation (e) {
        this.objArrowsNavigation.clickArrowsNavigation(e);
    }

    mouseMoveSlider () {
        this.objMouseMoveSliderElement.checkMouseMoveElement();
    }
}

export default Events;