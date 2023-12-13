class MouseMoveSliderElement {

    constructor () {
        this.mouseMove = false;
        this.navigations = {
            hInfobar: document.querySelector('.handsybox-infobar'),
            hToolbar: document.querySelector('.handsybox-toolbar'),
            hNavigator: document.querySelector('.handsybox-navigation'),
            hThumbList: document.querySelector('.handsybox-thumbs__list'),
        };

    }

    checkMouseMoveElement () {
        if (this.mouseMove == false) {
            this.mouseMove = true;
            for (let navigation in this.navigations) {
                if (this.navigations[navigation].classList.contains('handsy-opacity-0')) {
                    this.navigations[navigation].classList.remove('handsy-opacity-0');
                }
            }
            setTimeout(() => {
                for (let navigation in this.navigations) {
                    this.navigations[navigation].classList.add('handsy-opacity-0');
                }
                this.mouseMove = false;
            }, 8000);
        }
        return; 
    }
}

export default MouseMoveSliderElement;