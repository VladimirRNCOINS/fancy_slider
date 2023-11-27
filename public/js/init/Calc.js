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
        }
        return;
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