import ChangeSlider from './ChangeSlider.js';
import Navigation from '../init/Navigation.js';

class ArrowsNavigation {
    constructor (startObj) {
        this.startObj = startObj;
        this.objNavigation = new Navigation(this.startObj);
        this.leftButton = document.querySelector('.handsybox-button--arrow_left');
        this.rightButton = document.querySelector('.handsybox-button--arrow_right');
    }

    clickArrowsNavigation (e) {
        if (e.currentTarget.classList.contains('handsybox-button--arrow_left')) {
            this.startObj.switchSmallThumbs.clkThumbInd = this.startObj.switchSmallThumbs.clkThumbInd - 1;
        }
        if (e.currentTarget.classList.contains('handsybox-button--arrow_right')) {
            this.startObj.switchSmallThumbs.clkThumbInd = this.startObj.switchSmallThumbs.clkThumbInd + 1;
        }
        this.objChangeSlider = new ChangeSlider(this.startObj);
        this.objChangeSlider.changeMainImage();

        this.objNavigation.manageNavigationTools();
    }
}

export default ArrowsNavigation;