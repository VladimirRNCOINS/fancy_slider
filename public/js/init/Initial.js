class Initial  {
    constructor (objClientProps, switchSmallThumbs) {
        this.objClientProps = objClientProps;
        this.switchSmallThumbs = switchSmallThumbs;
        this.body = document.querySelector('body');
        this.closeButton = null;
        this.sliderImagesWrapper = null;
        this.parentDiv = null;
        this.fancyBoxStage = this.prepareHtmlValueFancyBoxStage();
        this.fancyBoxThumbsList = this.prepareHtmlBoxThumbsList();
        this.fancyBoxNavigation = this.prepareHtmlNavigation();
        this.dataIndexCountInfo = this.setIndexCountInfo();
        this.popUpHtml = `
            <div class="fancybox-container fancybox-show-thumbs fancybox-is-open fancybox-is-zoomable fancybox-can-zoomIn" role="dialog" tabindex="-1" id="fancybox-container-1" style="transition-duration: 366ms; display: none;">
                <div class="fancybox-bg"></div>
                <div class="fancybox-inner">
                    <div class="fancybox-infobar">
                        ${this.dataIndexCountInfo}
                    </div>
                    <div class="fancybox-toolbar">
                        <button class="fancybox-button button-toolbar" id="zoom_in" title="Zoom In" style="padding: 13px; user-select: none;">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path class="fslightbox-svg-path" d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z M 12.984375 7.9863281 A 1.0001 1.0001 0 0 0 12 9 L 12 12 L 9 12 A 1.0001 1.0001 0 1 0 9 14 L 12 14 L 12 17 A 1.0001 1.0001 0 1 0 14 17 L 14 14 L 17 14 A 1.0001 1.0001 0 1 0 17 12 L 14 12 L 14 9 A 1.0001 1.0001 0 0 0 12.984375 7.9863281 z"></path>
                            </svg>
                        </button>
                        <button class="fancybox-button button-toolbar" id="zoom_out" title="Zoom Out" style="padding: 13px; user-select: none;">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path class="fslightbox-svg-path" d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z M 9 12 A 1.0001 1.0001 0 1 0 9 14 L 17 14 A 1.0001 1.0001 0 1 0 17 12 L 9 12 z"></path>
                            </svg>
                        </button>
                        <button class="fancybox-button button-toolbar fancybox-button--close" data-fancybox-close="" title="Close">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"></path>
                            </svg>
                        </button>
                    </div>
                    ${this.fancyBoxNavigation.outerHTML}
                    ${this.fancyBoxStage.outerHTML}
                    <div class="fancybox-caption fancybox-caption--separate">
                        <div class="fancybox-caption__body"></div>
                    </div>
                    <div class="fancybox-progress"></div>
                </div>
                ${this.fancyBoxThumbsList.outerHTML}
            </div>`
        ;
    }

    prepareHtmlValueFancyBoxStage () {
        this.fancyBoxStage = document.createElement('div');
        this.fancyBoxStage.classList.add("fancybox-stage");
        for (let fs = 0; fs < this.objClientProps.bigImages.length; fs++) {
            let fsDiv = document.createElement('div');
            let fsDivContent = document.createElement('div');
            let fsImage = document.createElement('img');
            
            fsDiv.classList.add("fancybox-slide");
            if ( fs == +this.objClientProps.clickIndexParentDiv ) {
                fsDiv.classList.add("fancybox-slide--current");
                this.objClientProps.currentElement = fsDiv;
            }
            fsDiv.classList.add("fancybox-slide--image");
            fsDivContent.classList.add("fancybox-content");
            if (this.objClientProps.sourceAnchor[fs].classList.contains('video-image-wrapper')) {
                let fsVideo = document.createElement('video');
                let fsSource = document.createElement('source');
                fsDivContent.style.width = this.objClientProps.loadWidth + 'px';
                fsDivContent.style.height = this.objClientProps.loadHeight + 'px';

                fsDivContent.style.transform = ("translate(" + this.objClientProps.translateX + "px, " + this.objClientProps.translateY + "px) scale(" + this.objClientProps.scale + ")");
                fsVideo.classList.add("fancybox-video");
                fsVideo.setAttribute('controls', "");
                fsVideo.setAttribute('controlslist', "nodownload");
                fsVideo.setAttribute('poster', "./img/video_image.jpg");
                //fsVideo.setAttribute('autoplay', false);
                //fsVideo.style.pointerEvents = "none";
                fsSource.setAttribute('src', this.objClientProps.bigImages[fs]);
                fsSource.setAttribute('type', 'video/mp4');
                fsVideo.append(fsSource);
                fsDivContent.append(fsVideo);
            }
            else {
                fsDivContent.style.width = this.objClientProps.loadWidth + 'px';
                fsDivContent.style.height = this.objClientProps.loadHeight + 'px';

                fsDivContent.style.transform = ("translate(" + this.objClientProps.translateX + "px, " + this.objClientProps.translateY + "px) scale(" + this.objClientProps.scale + ")");



                
                fsImage.classList.add("fancybox-image");
                fsImage.setAttribute('src', this.objClientProps.bigImages[fs]);
                fsImage.style.pointerEvents = "none";
                
                fsDivContent.append(fsImage);
            }
            fsDiv.append(fsDivContent);
            this.fancyBoxStage.append(fsDiv);
        }
        return this.fancyBoxStage;
    }

    prepareHtmlBoxThumbsList () {
        let fThumbs = document.createElement('div');
        fThumbs.classList.add(...['fancybox-thumbs', 'fancybox-thumbs-y']);
        if (this.objClientProps.smallImages.length < 2) {
            fThumbs.innerHTML = `<div></div>`;
            return fThumbs;
        }
        
        let fThumbsList = document.createElement('div');
        fThumbsList.classList.add('fancybox-thumbs__list');
        
        for (let i=0; i < this.objClientProps.smallImages.length; i++) {
            let fsAnchor = document.createElement('a');
            if (i == +this.objClientProps.clickIndexParentDiv) {
                fsAnchor.classList.add("fancybox-thumbs-active");
                this.switchSmallThumbs.clkThumbInd = i;
                this.switchSmallThumbs.currentImg = i + 1;
                this.switchSmallThumbs.totalImg = this.objClientProps.smallImages.length;
            }
            fsAnchor.setAttribute('href', "javascript:;");
            fsAnchor.setAttribute('data-index', i);
            fsAnchor.setAttribute('style', "background-image:url(" + this.objClientProps.smallImages[i] + ")");
            fThumbsList.append(fsAnchor);
        }
        fThumbs.append(fThumbsList);
        return fThumbs;
    }

    prepareHtmlNavigation () {
        let fNavigation = document.createElement('div');
        fNavigation.classList.add('fancybox-navigation');

        if (this.objClientProps.smallImages.length < 2) {
            fNavigation.innerHTML = `<div></div>`;
            return fNavigation;
        }

        let buttons = `<button data-fancybox-prev="" class="fancybox-button fancybox-button--arrow_left" title="Previous">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z"></path>
                                </svg>
                            </div>
                        </button>
                        <button data-fancybox-next="" class="fancybox-button fancybox-button--arrow_right" title="Next">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z"></path>
                                </svg>
                            </div>
                        </button>`;
        fNavigation.innerHTML = buttons;
        return fNavigation;
    }

    prepareFIndex () {
        console.log(this.switchSmallThumbs.currentImg);
        return this.switchSmallThumbs.currentImg;
    }

    prepareFCount () {
        return this.switchSmallThumbs.totalImg;
    }

    setIndexCountInfo () {
        if (this.objClientProps.smallImages.length < 2) {
            let empty = `<span></span>`;
            return empty;
        }
        let infobar = `<span data-fancybox-index="">${this.switchSmallThumbs.currentImg}</span>&nbsp;/&nbsp;
                        <span data-fancybox-count="">${this.switchSmallThumbs.totalImg}</span>`;
        return infobar;
    }
}

export default Initial;