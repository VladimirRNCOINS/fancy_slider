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
        //console.log(this.startObj.dataToCreateSliderLine);
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
}

export default Calc;