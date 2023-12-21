class Initial  {
    constructor (objClientProps, switchSmallThumbs) {
        this.objClientProps = objClientProps;
        this.switchSmallThumbs = switchSmallThumbs;
        this.body = document.querySelector('body');
        this.closeButton = null;
        this.sliderImagesWrapper = null;
        this.parentDiv = null;
        this.handsyBoxStage = this.prepareHtmlValueHandsyBoxStage();
        this.handsyBoxThumbsList = this.prepareHtmlBoxThumbsList();
        this.handsyBoxNavigation = this.prepareHtmlNavigation();
        this.dataIndexCountInfo = this.setIndexCountInfo();
        this.popUpHtml = `
            <div class="handsybox-container handsybox-show-thumbs handsybox-is-open handsybox-is-zoomable handsybox-can-zoomIn" role="dialog" tabindex="-1" id="handsybox-container-1" style="display: none;">
                <div class="handsybox-bg"></div>
                <div class="handsybox-inner">
                    <div class="handsybox-infobar">
                        ${this.dataIndexCountInfo}
                    </div>
                    <div class="handsybox-toolbar" style="display: flex;">
                        <button class="handsybox-button button-toolbar" id="zoom_in_handsy" title="Zoom In" style="padding: 13px; user-select: none;">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path class="fslightbox-svg-path" d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z M 12.984375 7.9863281 A 1.0001 1.0001 0 0 0 12 9 L 12 12 L 9 12 A 1.0001 1.0001 0 1 0 9 14 L 12 14 L 12 17 A 1.0001 1.0001 0 1 0 14 17 L 14 14 L 17 14 A 1.0001 1.0001 0 1 0 17 12 L 14 12 L 14 9 A 1.0001 1.0001 0 0 0 12.984375 7.9863281 z"></path>
                            </svg>
                        </button>
                        <button class="handsybox-button button-toolbar" id="zoom_out_handsy" title="Zoom Out" style="padding: 13px; user-select: none;">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path class="fslightbox-svg-path" d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z M 9 12 A 1.0001 1.0001 0 1 0 9 14 L 17 14 A 1.0001 1.0001 0 1 0 17 12 L 9 12 z"></path>
                            </svg>
                        </button>
                        <button class="handsybox-button button-toolbar handsybox-button--close" data-handsybox-close="" title="Close">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"></path>
                            </svg>
                        </button>
                    </div>
                    ${this.handsyBoxNavigation.outerHTML}
                    ${this.handsyBoxStage.outerHTML}
                    <div class="handsybox-caption handsybox-caption--separate">
                        <div class="handsybox-caption__body"></div>
                    </div>
                    <div class="handsybox-progress"></div>
                </div>
                ${this.handsyBoxThumbsList.outerHTML}
            </div>`
        ;
    }

    prepareHtmlValueHandsyBoxStage () {
        this.handsyBoxStage = document.createElement('div');
        this.handsyBoxStage.classList.add("handsybox-stage");
        for (let fs = 0; fs < this.objClientProps.bigImages.length; fs++) {
            let fsDiv = document.createElement('div');
            let fsDivContent = document.createElement('div');
            let fsImage = document.createElement('img');
            
            fsDiv.classList.add("handsybox-slide");
            if ( fs == +this.objClientProps.clickIndexParentDiv ) {
                fsDiv.classList.add("handsybox-slide--current");
                this.objClientProps.currentElement = fsDiv;
            }
            fsDiv.classList.add("handsybox-slide--image");
            fsDivContent.classList.add("handsybox-content");
            if (this.objClientProps.sourceAnchor[fs].classList.contains('video-image-wrapper')) {
                let fsVideo = document.createElement('video');
                let fsSource = document.createElement('source');
                fsDivContent.style.width = this.objClientProps.loadWidth + 'px';
                fsDivContent.style.height = this.objClientProps.loadHeight + 'px';

                fsDivContent.style.transform = ("translate(" + this.objClientProps.translateX + "px, " + this.objClientProps.translateY + "px) scale(" + this.objClientProps.scale + ")");
                fsVideo.classList.add("handsybox-video");
                fsVideo.setAttribute('controls', "");
                fsVideo.setAttribute('controlslist', "nodownload");
                fsVideo.setAttribute('poster', "./img/video_image.jpg");
                fsSource.setAttribute('src', this.objClientProps.bigImages[fs]);
                fsSource.setAttribute('type', 'video/mp4');
                fsVideo.append(fsSource);
                fsDivContent.append(fsVideo);
            }
            else {
                fsDivContent.style.width = this.objClientProps.loadWidth + 'px';
                fsDivContent.style.height = this.objClientProps.loadHeight + 'px';

                fsDivContent.style.transform = ("translate(" + this.objClientProps.translateX + "px, " + this.objClientProps.translateY + "px) scale(" + this.objClientProps.scale + ")");

                fsImage.classList.add("handsybox-image");
                fsImage.setAttribute('src', this.objClientProps.bigImages[fs]);
                fsImage.style.pointerEvents = "none";
                
                fsDivContent.append(fsImage);
            }
            fsDiv.append(fsDivContent);
            this.handsyBoxStage.append(fsDiv);
        }
        return this.handsyBoxStage;
    }

    prepareHtmlBoxThumbsList () {
        let fThumbs = document.createElement('div');
        fThumbs.classList.add(...['handsybox-thumbs', 'handsybox-thumbs-y']);
        if (this.objClientProps.smallImages.length < 2) {
            fThumbs.innerHTML = `<div></div>`;
            return fThumbs;
        }
        
        let fThumbsList = document.createElement('div');
        fThumbsList.classList.add('handsybox-thumbs__list');
        
        for (let i=0; i < this.objClientProps.smallImages.length; i++) {
            let fsAnchor = document.createElement('a');
            if (i == +this.objClientProps.clickIndexParentDiv) {
                fsAnchor.classList.add("handsybox-thumbs-active");
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
        fNavigation.classList.add('handsybox-navigation');

        if (this.objClientProps.smallImages.length < 2) {
            fNavigation.innerHTML = `<div></div>`;
            return fNavigation;
        }

        let buttons = `<button data-handsybox-prev="" class="handsybox-button handsybox-button--arrow_left" title="Previous">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z"></path>
                                </svg>
                            </div>
                        </button>
                        <button data-handsybox-next="" class="handsybox-button handsybox-button--arrow_right" title="Next">
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
        let infobar = `<span data-handsybox-index="">${this.switchSmallThumbs.currentImg}</span>&nbsp;/&nbsp;
                        <span data-handsybox-count="">${this.switchSmallThumbs.totalImg}</span>`;
        return infobar;
    }
}

export default Initial;