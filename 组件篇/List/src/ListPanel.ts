class ListPanel extends eui.Component {

  private list: eui.List;
  constructor() 
  {
    super();
    this.skinName = "ListPanelSKin";
  }


  protected childrenCreated(): void 
  {
    super.childrenCreated();
    var items = [];
    for (var i: number = 0; i < 100; i++) 
    {
      items.push("内容" + i);
    }
    
    this.list.dataProvider = new eui.ArrayCollection(items);
  }
}