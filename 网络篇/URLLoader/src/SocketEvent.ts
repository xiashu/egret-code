/**
 * 事件
 */
class SocketEvent extends egret.Event
{
    public data:any;
    
    
    public constructor(type:string, data:any)
    {
        super(type);
        this.data = data;
    }
     
 
    public getByKey(key:string):any
    {
        return (this.data ? this.data[key] : null);
    }
}
