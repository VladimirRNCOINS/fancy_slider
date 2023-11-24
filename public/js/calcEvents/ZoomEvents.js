import ResizeEvent from './ResizeEvent.js';
import Calc from '../init/Calc.js';

class ZoomEvents {
    constructor (startObj) {
        this.startObj = startObj;
        this.objResizeEvent = new ResizeEvent(this.startObj);
        this.objCalc = new Calc(this.startObj);
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
        let beforeWidth, beforeHeight, leftX, topY, afterWidth, afterHeight;
        let currentElem = document.querySelector('.fancybox-slide--current .fancybox-content');
        beforeWidth = currentElem.getBoundingClientRect().width;
        beforeHeight = currentElem.getBoundingClientRect().height;
        
        if (mark == 'plus') {
            this.startObj.objClientProps.scale = this.startObj.objClientProps.scale + this.startObj.objClientProps.scaleStep;
        }
        if (mark == 'minus') {
            let promScale = this.startObj.objClientProps.scale - this.startObj.objClientProps.scaleStep;
            if (promScale <= 1) {
                this.startObj.objClientProps.scale = 1;
                this.objResizeEvent.calcResizeSlider();
                return;
            }
            this.startObj.objClientProps.scale = this.startObj.objClientProps.scale - this.startObj.objClientProps.scaleStep;
        }
        
        this.objCalc.setCalcSize();
        
        leftX = currentElem.getBoundingClientRect().x;
		topY = currentElem.getBoundingClientRect().y;
        afterWidth = currentElem.getBoundingClientRect().width;
		afterHeight = currentElem.getBoundingClientRect().height;

        //set new TranlateX
		this.startObj.objClientProps.translateX = leftX - (afterWidth - beforeWidth)/2;
        
		//set new TranlateY
		this.startObj.objClientProps.translateY = topY - (afterHeight - beforeHeight)/2;
        
        this.objCalc.setCalcSize();
    }
}

export default ZoomEvents;