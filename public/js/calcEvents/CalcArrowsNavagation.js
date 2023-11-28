class CalcArrowsNavagation {
    constructor (startObj) {
        this.startObj = startObj;
        this.leftButton = document.querySelector('.fancybox-button--arrow_left');
        this.rightButton = document.querySelector('.fancybox-button--arrow_right');
    }

    findActiveIndexThumbs () {
        let allList = document.querySelectorAll('.fancybox-thumbs__list a');
        if (allList.length) {
            allList.forEach( (el, ind) => {
                if (el.className == 'fancybox-thumbs-active') {
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
}

export default CalcArrowsNavagation;