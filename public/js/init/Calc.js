class Calc {
    constructor (startObj) {
        this.startObj = startObj;
    }

    setCalcSize () {
        let fsDivContent = document.querySelectorAll(".fancybox-content");
        
        for (let i=0; i < fsDivContent.length; i++) {
            fsDivContent[i].style.width = this.startObj.objClientProps.loadWidth + 'px';
            fsDivContent[i].style.height = this.startObj.objClientProps.loadHeight + 'px';
            
            fsDivContent[i].style.transform = ("translate(" + this.startObj.objClientProps.translateX + "px, " + this.startObj.objClientProps.translateY + "px) scale(" + this.startObj.objClientProps.scale + ")");
            //fsDivContent[i].style.transform = ("translate(-191.5px, -122.2px) scale(1.4)");
        }
        return;
    }

    getCalcScaleSize () {
        let fCurrent = document.querySelector('.fancybox-slide--current .fancybox-content');
        let naturalWidth = this.startObj.objClientProps.loadWidth;
        let naturalHeight = this.startObj.objClientProps.loadHeight;
        let newScale = +this.startObj.objClientProps.scale.toFixed(2);
        
        let beforeWidth = fCurrent.getBoundingClientRect().width;
        let beforeHeight = fCurrent.getBoundingClientRect().height;

        let leftX = fCurrent.getBoundingClientRect().x;
		let topY = fCurrent.getBoundingClientRect().y;
        let afterWidth = newScale * naturalWidth;
		let afterHeight = newScale * naturalHeight;

        this.resetStyleTransition();
        
        //set new TranlateX
		this.startObj.objClientProps.translateX = leftX - (afterWidth - beforeWidth)/2;
        
		//set new TranlateY
		this.startObj.objClientProps.translateY = topY - (afterHeight - beforeHeight)/2;
    }

    setStyleTransition () {
        let fsDivContent = document.querySelectorAll(".fancybox-content");
        for (let i=0; i < fsDivContent.length; i++) {
            fsDivContent[i].style.transition = "all 0.25s linear 0s";
        }
    }

    resetStyleTransition () {
        let fsDivContent = document.querySelectorAll(".fancybox-content");
        for (let i=0; i < fsDivContent.length; i++) {
            fsDivContent[i].style.transition = "all 0s linear 0s";
        }
    }

    setCalcLineSize () {
        this.startObj.dataToCreateSliderLine.fSlides[this.startObj.dataToCreateSliderLine.centerSliderInd].style.transform = 
                            ("translate(" + this.startObj.dataToCreateSliderLine.centerXCoordinata + "px, " + "0px)");
        if ( this.startObj.dataToCreateSliderLine.leftSliderInd != null ) {
            let left = this.startObj.dataToCreateSliderLine.leftXCoordinata + this.startObj.dataToCreateSliderLine.centerXCoordinata;
            this.startObj.dataToCreateSliderLine.fSlides[this.startObj.dataToCreateSliderLine.leftSliderInd].style.transform = 
                            ("translate(" + left + "px, " + "0px)");
        }
        if ( this.startObj.dataToCreateSliderLine.rightSliderInd != null ) {
            let right = this.startObj.dataToCreateSliderLine.rightXCoordinata + this.startObj.dataToCreateSliderLine.centerXCoordinata;
            this.startObj.dataToCreateSliderLine.fSlides[this.startObj.dataToCreateSliderLine.rightSliderInd].style.transform = 
                            ("translate(" + right + "px, " + "0px)");
        }
    }

    setCalcLineChangeSlider () {
        this.startObj.dataToCreateSliderLine.change = false;
        if (this.startObj.dataToCreateSliderLine.centerXCoordinata < 0) {
            this.startObj.dataToCreateSliderLine.leftMoving = true;
            this.startObj.dataToCreateSliderLine.rightMoving = null;
            if (this.startObj.dataToCreateSliderLine.rightSliderInd != null) {
                let newCoords = -this.startObj.dataToCreateSliderLine.rightXCoordinata;
                this.startObj.dataToCreateSliderLine.fSlides[this.startObj.dataToCreateSliderLine.centerSliderInd].style.transition = "all 0.4s ease 0s";
                this.startObj.dataToCreateSliderLine.fSlides[this.startObj.dataToCreateSliderLine.centerSliderInd].style.transform = ("translate(" + newCoords + "px, " + "0px)");
                
                this.startObj.dataToCreateSliderLine.fSlides[this.startObj.dataToCreateSliderLine.rightSliderInd].style.transition = "all 0.4s ease 0s";
                this.startObj.dataToCreateSliderLine.fSlides[this.startObj.dataToCreateSliderLine.rightSliderInd].style.transform = ("translate(" + "0px, " + "0px)");
                this.startObj.dataToCreateSliderLine.change = true;
            }
            if (this.startObj.dataToCreateSliderLine.leftSliderInd != null) {
                this.startObj.dataToCreateSliderLine.fSlides[this.startObj.dataToCreateSliderLine.leftSliderInd].removeAttribute("style");
            }
        }
        if (this.startObj.dataToCreateSliderLine.centerXCoordinata > 0) {
            this.startObj.dataToCreateSliderLine.leftMoving = null;
            this.startObj.dataToCreateSliderLine.rightMoving = true;
            if (this.startObj.dataToCreateSliderLine.leftSliderInd != null) {
                let newCoords = -this.startObj.dataToCreateSliderLine.leftXCoordinata;
                this.startObj.dataToCreateSliderLine.fSlides[this.startObj.dataToCreateSliderLine.centerSliderInd].style.transition = "all 0.4s ease 0s";
                this.startObj.dataToCreateSliderLine.fSlides[this.startObj.dataToCreateSliderLine.centerSliderInd].style.transform = ("translate(" + newCoords + "px, " + "0px)");

                this.startObj.dataToCreateSliderLine.fSlides[this.startObj.dataToCreateSliderLine.leftSliderInd].style.transition = "all 0.4s ease 0s";
                this.startObj.dataToCreateSliderLine.fSlides[this.startObj.dataToCreateSliderLine.leftSliderInd].style.transform = ("translate(" + "0px, " + "0px)");
                this.startObj.dataToCreateSliderLine.change = true;
            }
            if (this.startObj.dataToCreateSliderLine.rightSliderInd != null) {
                this.startObj.dataToCreateSliderLine.fSlides[this.startObj.dataToCreateSliderLine.rightSliderInd].removeAttribute("style");
            }
        }
        if (this.startObj.dataToCreateSliderLine.change == false) {
            this.startObj.dataToCreateSliderLine.fSlides[this.startObj.dataToCreateSliderLine.centerSliderInd].style.transition = "all 0.4s ease 0s";
            this.startObj.dataToCreateSliderLine.fSlides[this.startObj.dataToCreateSliderLine.centerSliderInd].style.transform = ("translate(" + "0px, " + "0px)");
        }
    }
}

export default Calc;