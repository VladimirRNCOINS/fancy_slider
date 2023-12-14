import Navigation from '../init/Navigation.js';

class MouseMoveSliderElement {

    constructor (startObj) {
        this.startObj = startObj;
        this.objNavigation = new Navigation(this.startObj);
    }

    checkMouseMoveElement () {
        this.objNavigation.manageNavigationTools();
        return; 
    }
}

export default MouseMoveSliderElement;