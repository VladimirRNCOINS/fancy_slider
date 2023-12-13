import Calc from '../init/Calc.js';

class DragCurrentSlide {

    constructor (startObj) {
        this.startObj = startObj;
        this.objCalc = new Calc(this.startObj);
        this.draggingHandler = this.dragging.bind(this);
        this.currentElem = null;
        this.propsDragCurrentSlide = {
            startDragX: null,
            startDragY: null,
            leftStartCoord: null,
            topStartCoord: null
        };
    }
    
    startDrag(e) {
        this.currentElem = document.querySelector('.handsybox-slide--current .handsybox-content');
        this.currentElem.style.cursor = "grabbing";
        this.propsDragCurrentSlide.startDragX = e.pageX;
        this.propsDragCurrentSlide.startDragY = e.pageY;
        this.propsDragCurrentSlide.leftStartCoord = this.startObj.objClientProps.translateX;
        this.propsDragCurrentSlide.topStartCoord = this.startObj.objClientProps.translateY;
        this.currentElem.addEventListener('pointermove', this.draggingHandler);
    }

    dragging(e) {
        let dragX = e.pageX;
        let dragY = e.pageY;
        let dragShiftX = dragX - this.propsDragCurrentSlide.startDragX;
        let dragShiftY = dragY - this.propsDragCurrentSlide.startDragY;
        
        this.startObj.objClientProps.translateX = this.propsDragCurrentSlide.leftStartCoord + dragShiftX;
        this.startObj.objClientProps.translateY = this.propsDragCurrentSlide.topStartCoord + dragShiftY;  

        this.objCalc.setCalcSize();

        return;
    }

    stopDrag (e) {
        this.currentElem.style.cursor = "grab";
        this.currentElem.removeEventListener('pointermove', this.draggingHandler);
    }
}

export default DragCurrentSlide;