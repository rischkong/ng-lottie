import { ElementRef, OnInit } from '@angular/core';
export declare class LottieAnimationViewComponent implements OnInit {
    private platformId;
    options: any;
    width: number;
    height: number;
    animCreated: any;
    onComplete: any;
    onLoopComplete: any;
    onEnterFrame: any;
    lavContainer: ElementRef;
    viewWidth: string;
    viewHeight: string;
    private _options;
    constructor(platformId: string);
    ngOnInit(): void;
    private emitComplete(anim);
    private emitLoopComplete(anim);
    private emitEnterFrame(anim);
}
