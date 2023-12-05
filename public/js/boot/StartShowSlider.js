import Initial from '../init/Initial.js';
import Events from "../init/Events.js";
import ResizeEvent from '../calcEvents/ResizeEvent.js';
import CalcArrowsNavagation from '../calcEvents/CalcArrowsNavagation.js';

class StartShowSlider {
    constructor (event) {
        this.invokeDataSet(event);
    }

    invokeDataSet (event) {
        this.clickThumbMiddle = null;
        this.objClientProps = {
            clickParentDiv: this.getClosestDiv(event),
            clickIndexParentDiv: null,
            smallImages: [],
            bigImages: [],
            widthWindow: window.innerWidth,
            heightWindow: window.innerHeight,
            mainPadding: 44,
            naturalWidth: null,
            naturalHeight: null,
            scale: 1,
            scaleStep: 0.4,
            translateX: null,
            translateY: null,
            loadHeight: null,
            loadWidth: null,
            loadImg: null,
            currentElement: null,
            sourceAnchor: this.getSourceAnchor()
        };
        this.switchSmallThumbs = {
            clkThumbInd: null,
            totalImg: null,
            currentImg: null
        },
        this.dataToCreateSliderLine = {
            leftSliderInd: null,
            centerSliderInd: null,
            rightSliderInd: null,
            currentSlideWidth: null,
            leftXCoordinata: null,
            centerXCoordinata: null,
            rightXCoordinata: null,
            fSlides: null,
            leftMoving: null,
            rightMoving: null,
            change: false,
        };
        this.objEvents = null,
        this.objInitial = null,
        this.objResizeEvent = null,
        this.getImagesArrays();
        this.setImagesSettings();
        this.getIndexClosestDiv();
        this.fancyContener = null;
        this.sliderWrapper = null;
        this.resizeSession = false;
        this.dragEventName = null;
    }

    getClosestDiv (event) {
        if (event.type == 'click') {
            this.clickThumbMiddle = event.currentTarget;
            return event.target.closest("div");
        }
        return;
    }

    getIndexClosestDiv () {
        let elementInd = this.objClientProps.clickParentDiv.getAttribute('data-num');
        let ind = null;
        if (elementInd) {
            ind = elementInd - 1;
        }
        else {
            if (this.clickThumbMiddle != null) {
                let href = this.clickThumbMiddle.getAttribute('href');
                let indThumbMiddle = this.objClientProps.bigImages.findIndex( (el) => {
                    return el == href;
                });
                ind = indThumbMiddle;
            }
            else {
                ind = 0;
            }
        }
        this.objClientProps.clickIndexParentDiv = ind;
        return;
    }

    setImagesSettings () {
        this.loadTmpImage(this.objClientProps.bigImages[0])
        .then((img) => {
            //вычислить данные для начальной загрузки
            this.objResizeEvent = new ResizeEvent(this);
            this.objResizeEvent.calcResizeSlider(img);
            this.objInitial = new Initial(this.objClientProps, this.switchSmallThumbs);
            this.showSlider();
        })
        .catch((src) => { 
            console.log(src);
        });
    }

    loadTmpImage (src) {
        return new Promise((resolve, reject) => {
            //загрузка изображения в Promise для данных установки
            const img = new Image();
            img.src = src;
            img.onload = () => { 
                this.objClientProps.loadImg = img;
                resolve(img); 
            };
            img.onerror = () => { 
                reject(src); 
            };
        });
    }
    
    showSlider () {
        this.sliderWrapper = document.getElementById('sliderImagesWrapper');
        let htmlSlider = document.createElement('div');
        htmlSlider.setAttribute('id', 'sliderImagesWrapper');
        htmlSlider.innerHTML = this.objInitial.popUpHtml;
        if (!this.sliderWrapper) {
            this.objInitial.body.append(htmlSlider);
        }
        else {
            this.sliderWrapper.remove();
            this.objInitial.body.append(htmlSlider);
        }
        this.fancyContener = document.querySelector('.fancybox-container');
        this.fancyContener.style.display = 'block';
        this.objEvents = new Events(this);
        this.objCalcArrowsNavagation = new CalcArrowsNavagation(this);
        this.objCalcArrowsNavagation.setArrowsParams();
        this.objCalcArrowsNavagation.checkVideoElement();
        return;
    }

    getImagesArrays () {
        let elements = document.querySelectorAll('.fancybox-thumb');
        elements.forEach( (el, indx) => {
            this.objClientProps.smallImages[indx] = el.children[0].getAttribute('src');
            this.objClientProps.bigImages[indx] = el.getAttribute('href');
        } );
    }

    getSourceAnchor () {
        let fThumbs = document.querySelectorAll('.fancybox-thumb');
        return fThumbs;
    }
}

export default StartShowSlider;