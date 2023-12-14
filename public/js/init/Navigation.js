class Navigation {
    constructor (startObj) {
        this.startObj = startObj;
        this.navigations = {
            hInfobar: document.querySelector('.handsybox-infobar'),
            hToolbar: document.querySelector('.handsybox-toolbar'),
            hNavigator: document.querySelector('.handsybox-navigation'),
            hThumbList: document.querySelector('.handsybox-thumbs__list'),
        };
    }

    manageNavigationTools () {
        if (this.startObj.navigationTimeout) {
            clearTimeout(this.startObj.navigationTimeout);
            this.startObj.navigationTimeout = null;
        }

        for (let navigation in this.navigations) {
            if (this.navigations[navigation].classList.contains('handsy-opacity-0')) {
                this.navigations[navigation].classList.remove('handsy-opacity-0');
            }
        }

        this.startObj.navigationTimeout = setTimeout(() => {
            for (let navigation in this.navigations) {
                this.navigations[navigation].classList.add('handsy-opacity-0');
            }
            
        }, 7000);
    }
}

export default Navigation;