import { Component, EventEmitter, Inject, Input, Output, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformServer } from '@angular/common';
var lottie = require('lottie-web/build/player/lottie.js');
var LottieAnimationViewComponent = (function () {
    function LottieAnimationViewComponent(platformId) {
        this.platformId = platformId;
        this.animCreated = new EventEmitter();
        // Other event types
        // onComplete
        // onLoopComplete
        // onEnterFrame
        // onSegmentStart (TBD)
        this.onComplete = new EventEmitter();
        this.onLoopComplete = new EventEmitter();
        this.onEnterFrame = new EventEmitter();
    }
    LottieAnimationViewComponent.prototype.ngOnInit = function () {
        if (isPlatformServer(this.platformId)) {
            return;
        }
        this._options = {
            container: this.lavContainer.nativeElement,
            renderer: this.options.renderer || 'svg',
            loop: this.options.loop !== false,
            autoplay: this.options.autoplay !== false,
            autoloadSegments: this.options.autoloadSegments !== false,
            animationData: this.options.animationData,
            path: this.options.path || '',
            rendererSettings: this.options.rendererSettings || {}
        };
        this.viewWidth = this.width + 'px' || '100%';
        this.viewHeight = this.height + 'px' || '100%';
        // DONE: Safari BUG
        lottie.setLocationHref(document.location.href);
        var anim = lottie.loadAnimation(this._options);
        this.animCreated.emit(anim);
        // addListener
        anim.addEventListener('complete', this.emitComplete(anim));
        anim.addEventListener('loopComplete', this.emitComplete(anim));
        anim.addEventListener('enterFrame', this.emitComplete(anim));
    };
    LottieAnimationViewComponent.prototype.emitComplete = function (anim) {
        this.onComplete.emit(anim);
    };
    LottieAnimationViewComponent.prototype.emitLoopComplete = function (anim) {
        this.onLoopComplete.emit(anim);
    };
    LottieAnimationViewComponent.prototype.emitEnterFrame = function (anim) {
        this.onEnterFrame.emit(anim);
    };
    return LottieAnimationViewComponent;
}());
export { LottieAnimationViewComponent };
LottieAnimationViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'lottie-animation-view',
                template: "\n        <div #lavContainer\n             [ngStyle]=\"{'width': viewWidth, 'height': viewHeight, 'overflow':'hidden', 'margin': '0 auto'}\">\n        </div>"
            },] },
];
/** @nocollapse */
LottieAnimationViewComponent.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
]; };
LottieAnimationViewComponent.propDecorators = {
    'options': [{ type: Input },],
    'width': [{ type: Input },],
    'height': [{ type: Input },],
    'animCreated': [{ type: Output },],
    'onComplete': [{ type: Output },],
    'onLoopComplete': [{ type: Output },],
    'onEnterFrame': [{ type: Output },],
    'lavContainer': [{ type: ViewChild, args: ['lavContainer',] },],
};
//# sourceMappingURL=lottieAnimationView.component.js.map