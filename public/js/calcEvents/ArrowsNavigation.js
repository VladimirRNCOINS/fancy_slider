import ChangeSlider from './ChangeSlider.js'

class ArrowsNavigation {
    constructor (startObj) {
        this.startObj = startObj;
        this.leftButton = document.querySelector('.fancybox-button--arrow_left');
        this.rightButton = document.querySelector('.fancybox-button--arrow_right');
    }

    clickArrowsNavigation (e) {
        if (e.currentTarget.classList.contains('fancybox-button--arrow_left')) {
            this.startObj.switchSmallThumbs.clkThumbInd = this.startObj.switchSmallThumbs.clkThumbInd - 1;
        }
        if (e.currentTarget.classList.contains('fancybox-button--arrow_right')) {
            this.startObj.switchSmallThumbs.clkThumbInd = this.startObj.switchSmallThumbs.clkThumbInd + 1;
        }
        this.objChangeSlider = new ChangeSlider(this.startObj);
        this.objChangeSlider.changeMainImage();
    }
}

export default ArrowsNavigation;