class CalcArrowsNavagation {
    constructor (startObj) {
        this.startObj = startObj;
        this.leftButton = document.querySelector('.handsybox-button--arrow_left');
        this.rightButton = document.querySelector('.handsybox-button--arrow_right');
    }

    findActiveIndexThumbs () {
        let allList = document.querySelectorAll('.handsybox-thumbs__list a');
        if (allList.length) {
            allList.forEach( (el, ind) => {
                if (el.className == 'handsybox-thumbs-active') {
                    this.startObj.switchSmallThumbs.clkThumbInd = +ind;
                }
            });
        }
        this.setArrowsParams();
    }

    setArrowsParams () {
        this.leftButton.removeAttribute('disabled');
        this.rightButton.removeAttribute('disabled');

        let left = this.startObj.objClientProps.bigImages[this.startObj.switchSmallThumbs.clkThumbInd - 1];
        let right = this.startObj.objClientProps.bigImages[this.startObj.switchSmallThumbs.clkThumbInd + 1];

        if (typeof left === 'undefined') {
            this.leftButton.setAttribute('disabled', '');
        }

        if (typeof right === 'undefined') {
            this.rightButton.setAttribute('disabled', '');
        }
    }

    checkVideoElement () {
        let fVideoCurrent = document.querySelector('.handsybox-slide--current .handsybox-content .handsybox-video');
        let hZoomIn = document.getElementById("zoom_in_handsy");
        let hZoomOut = document.getElementById("zoom_out_handsy");
        
        if (fVideoCurrent) {
            fVideoCurrent.play();
            hZoomIn.style.display = 'none';
            hZoomOut.style.display = 'none';
        }
        else {
            let fVideoNoCurrent = document.querySelector('.handsybox-slide .handsybox-content .handsybox-video');
            if (fVideoNoCurrent) {
                fVideoNoCurrent.pause();
                hZoomIn.style.display = 'inline-block';
                hZoomOut.style.display = 'inline-block';
            }
        }
    }
}

export default CalcArrowsNavagation;