import "./../style/visual.less";
export declare class Visual implements powerbi.extensibility.visual.IVisual {
    private target;
    constructor(options: powerbi.extensibility.visual.VisualConstructorOptions);
    private renderUI;
    update(): void;
}
