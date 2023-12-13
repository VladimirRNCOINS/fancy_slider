import ResizeEvent from './ResizeEvent.js';
import Calc from '../init/Calc.js';

class ZoomEvents {
    constructor (startObj) {
        this.startObj = startObj;
        this.objResizeEvent = new ResizeEvent(this.startObj);
        this.objCalc = new Calc(this.startObj);
        this.transitionEndZoomHandler = this.zoomTransitionEnd.bind(this);
    }

    zoomPlusCalc () {
        if (this.startObj.objClientProps.scale >= 4) {
            return;
        }
        this.getZoomData('plus');
        return;
    }

    zoomMinusCalc () {
        if (this.startObj.objClientProps.scale <= 1) {
            return;
        }
        this.getZoomData('minus');
        return;
    }

    getZoomData (mark) {
        this.fsDivContent = document.querySelectorAll(".handsybox-content");
        this.fsDivContent.forEach((el) => {
            el.addEventListener('transitionend', this.transitionEndZoomHandler);
        });
        if (mark == 'plus') {
            this.startObj.objClientProps.scale = this.startObj.objClientProps.scale + this.startObj.objClientProps.scaleStep;
        }
        if (mark == 'minus') {
            let promScale = this.startObj.objClientProps.scale - this.startObj.objClientProps.scaleStep;
            if (promScale <= 1) {
                this.objResizeEvent.calcResizeSlider();
                this.objCalc.setStyleTransition();
                return;
            }
            this.startObj.objClientProps.scale = this.startObj.objClientProps.scale - this.startObj.objClientProps.scaleStep;
        }
        
        this.objCalc.getCalcScaleSize();

        this.objCalc.setCalcSize();

        this.objCalc.setStyleTransition();
    }

    zoomTransitionEnd () {
        this.fsDivContent.forEach( (el) => {
            el.removeEventListener('transitionend', this.transitionEndZoomHandler);
        } );
        this.objCalc.resetStyleTransition();
    }
}

export default ZoomEvents;