import Calc from '../init/Calc.js'

class ResizeEvent {
    constructor (startObj) { 
        this.startObj = startObj;
        this.objCalc = new Calc(this.startObj);
        this.body = document.querySelector('body');
    }

    calcResizeSlider (img) {
        let fImages = document.querySelector('.handsybox-slide--current .handsybox-content .handsybox-image');
        let fVideo = document.querySelector('.handsybox-slide--current .handsybox-content .handsybox-video');
        
        if (!fImages && !fVideo) {
            this.startLoadingData(img);
        }
        else {
            let elem;
            if (fImages) {
                elem = fImages;
            }
            if (fVideo) {
                elem = fVideo;
            }
            this.repeatedLoadingData(elem);
        }
        this.objCalc.setCalcSize();
    }

    commonLoadingData (img) {
        this.startObj.objClientProps.widthWindow = window.innerWidth;
        this.startObj.objClientProps.heightWindow = window.innerHeight;

        this.startObj.objClientProps.naturalWidth = img.naturalWidth;
        this.startObj.objClientProps.naturalHeight = img.naturalHeight;
    }

    startLoadingData (img) {
        this.commonLoadingData(img);

        img.style.position = 'absolute';
        img.style.left = -10000 + 'px';
        img.style.top = -10000 + 'px';
        img.style.opacity = 0;

        if (((this.startObj.objClientProps.widthWindow - this.startObj.objClientProps.naturalWidth) <= 0) ||
            (((this.startObj.objClientProps.widthWindow - this.startObj.objClientProps.naturalWidth) >= 0) && (this.startObj.objClientProps.heightWindow - this.startObj.objClientProps.naturalHeight) <= 0) ||
            (((this.startObj.objClientProps.widthWindow - this.startObj.objClientProps.naturalWidth) <= 0) &&
            ((this.startObj.objClientProps.heightWindow - this.startObj.objClientProps.naturalHeight) <= 0))) {
            
            this.startObj.objClientProps.loadWidth = this.startObj.objClientProps.widthWindow - 100;
            img.style.width = +this.startObj.objClientProps.loadWidth + 'px';
            
            this.body.prepend(img);
                
            img.style.height = +img.offsetHeight + 'px';
            this.startObj.objClientProps.loadHeight = +img.offsetHeight;

            this.startObj.objClientProps.translateX = 50;
            this.startObj.objClientProps.translateY = (this.startObj.objClientProps.heightWindow - this.startObj.objClientProps.loadHeight) / 2;
        }
        else {
            this.startObj.objClientProps.loadHeight = this.startObj.objClientProps.heightWindow - 2 * this.startObj.objClientProps.mainPadding;
            img.style.height = +this.startObj.objClientProps.loadHeight + 'px';

            this.body.prepend(img);

            this.startObj.objClientProps.loadWidth = +img.offsetWidth;
            img.style.width = +img.offsetWidth + 'px';

            this.startObj.objClientProps.translateX = (this.startObj.objClientProps.widthWindow - this.startObj.objClientProps.loadWidth) / 2;
            this.startObj.objClientProps.translateY = (this.startObj.objClientProps.heightWindow - this.startObj.objClientProps.loadHeight) / 2;
        }
        //удалить элемент для данных начальной загрузки
        img.remove();
    }

    repeatedLoadingData (fImages) {
        
        this.commonLoadingData(fImages);
        
        if (((this.startObj.objClientProps.widthWindow - this.startObj.objClientProps.naturalWidth) <= 0) ||
            (((this.startObj.objClientProps.widthWindow - this.startObj.objClientProps.naturalWidth) >= 0) && (this.startObj.objClientProps.heightWindow - this.startObj.objClientProps.naturalHeight) <= 0) ||
            (((this.startObj.objClientProps.widthWindow - this.startObj.objClientProps.naturalWidth) <= 0) && ((this.startObj.objClientProps.heightWindow - this.startObj.objClientProps.naturalHeight) <= 0))) {
            
            this.startObj.objClientProps.loadWidth = this.startObj.objClientProps.widthWindow - 100;

            fImages.style.width = this.startObj.objClientProps.loadWidth + 'px';
            fImages.style.height = 'auto';
             
            this.startObj.objClientProps.loadHeight = +fImages.offsetHeight;

            this.startObj.objClientProps.translateX = 50;
            this.startObj.objClientProps.translateY = (this.startObj.objClientProps.heightWindow - this.startObj.objClientProps.loadHeight) / 2;
        }
        else {
            this.startObj.objClientProps.loadHeight = this.startObj.objClientProps.heightWindow - 2 * this.startObj.objClientProps.mainPadding;
            
            fImages.style.height = this.startObj.objClientProps.loadHeight + 'px';
            fImages.style.width = 'auto';
            
            this.startObj.objClientProps.loadWidth = +fImages.offsetWidth;

            this.startObj.objClientProps.translateX = (this.startObj.objClientProps.widthWindow - this.startObj.objClientProps.loadWidth) / 2;
            this.startObj.objClientProps.translateY = (this.startObj.objClientProps.heightWindow - this.startObj.objClientProps.loadHeight) / 2;
        }
        this.startObj.objClientProps.scale = 1;
        fImages.style.width = null;
        fImages.style.height = null;
    }
}

export default ResizeEvent;