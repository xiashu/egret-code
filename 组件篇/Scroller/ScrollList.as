/**
 *
 * 滚动组合组件
 *
 */
class ScrollList extends eui.Component {
             
    public list:eui.List = new eui.List();
    public scroller: eui.Scroller;
    private noDataTxt:eui.Label;
              
    public constructor() 
    {
        super();
        this.scroller = new eui.Scroller();
        this.scroller.bounces = false;
        this.scroller.viewport = this.list;
        this.addChild(this.scroller);
        this.addEventListener(egret.Event.RESIZE,this.onResize,this);
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
    }
             
    public set dataProvider(dp: eui.ICollection)
    {
        this.list.dataProvider = dp;      
        this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
    }
             
    public get dataProvider(): eui.ICollection {
        return this.list.dataProvider;
    }
             
    public set itemRenderer(ir:any){
        this.list.itemRenderer = ir;
             
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame,this);
    }
             
    public get itemRenderer(): any {
        return this.list.itemRenderer;
    }
             
              
    public set selectedIndex(value:number){
        this.list.selectedIndex = value;
    }
             
    public get selectedIndex(): number{
        return this.list.selectedIndex;
    }
             
    public set selectedItem(value: any) {
        this.list.selectedItem = value;
    }
             
    public get selectedItem(): any {
        return this.list.selectedItem;
    }
             
    public set allowMultipleSelection(value: boolean) {
        this.list.allowMultipleSelection = value;
    }
             
    public get allowMultipleSelection(): boolean {
        return this.list.allowMultipleSelection;
    }
             
    public get selectedIndices(): any {
        return this.list.selectedIndices;
    }
             
    public set useVirtualLayout(value: boolean){
        this.list.useVirtualLayout = value;
    }
             
    public get useVirtualLayout(): boolean {
        return this.list.useVirtualLayout;
    }
             
    public set layout(value: any) {
        this.list.layout = value;
    }
             
    public get layout(): any {
        return this.list.layout;
    }
              
    public addEventListener(type: string,listener: Function,thisObject: any,useCapture?: boolean,priority?: number): void{
        this.list.addEventListener(type, listener, thisObject, useCapture, priority);
    }
             
    private onEnterFrame():void
    {
        this.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
        this.onResize();
                     
        var  dp = this.list.dataProvider;
        var noDataTxt = this.noDataTxt;
        if(dp && dp.length == 0)
        {
            if(!noDataTxt)
            {
                noDataTxt = this.noDataTxt = new eui.Label("目前列表为空");
                noDataTxt.size = 18;
                this.addChild(noDataTxt);
                noDataTxt.x = (this.width - noDataTxt.width)/2;
                noDataTxt.y = this.y + this.height/2 - 80;
            }
        }
        if(noDataTxt) noDataTxt.visible = dp.length == 0;
    }
             
    private onResize():void
    {
        this.scroller.height = this.height;
        this.scroller.width = this.width;
    }
             
    private onItemTap(event: eui.ItemTapEvent):void
    {
        this.dispatchEvent(event);
    }
             
             
    public getTileLayout():eui.TileLayout
    {
        return new eui.TileLayout();
    }
             
    public getVerticalLayout():eui.VerticalLayout
    {
        return new eui.VerticalLayout();
    }
             
}