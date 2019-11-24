declare class FPSMeter {
    constructor(element:Element,arguments?: {
        /** Whether to show history graph. */
        graph?:boolean,
        history?:number,
        theme?:string,
        /** Update interval in milliseconds. */
        interval?:number
    });
    tick () : void;
    tickStart () : void;
    showFps () : void;
    showDuration () : void;
    toggle () : void;
    pause () : void;
    resume () : void;
    hide () : void;
    show () : void;
    destroy () : void;
    set (name:string,val:any) : void;
}