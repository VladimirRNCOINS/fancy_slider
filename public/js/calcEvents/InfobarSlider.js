class InfobarSlider {
    constructor (startObj) {
        this.startObj = startObj;
    }

    setInfoInInfobar () {
        let index = document.querySelector("span[data-handsybox-index]");
        let count = document.querySelector("span[data-handsybox-count]");
        if (index) {
            index.innerHTML = this.startObj.switchSmallThumbs.currentImg;
        }
        if (count) {
            count.innerHTML = this.startObj.switchSmallThumbs.totalImg;
        }
    }
}

export default InfobarSlider;