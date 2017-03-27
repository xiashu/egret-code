class MathUtil {
	public constructor() {

	}

    
    /**
     * 获取区间随机数{n,m}
	 *  @param start  开始区间
	 *  @param end    结束区间
	 *  @param isRound 是否需要取整数输出
	 *  @param isFloor 是否需要取下限输出
	 *  @param isCeil  是否需要取上输出
     */    
	public static getRangeNumber(start:number,end:number,isRound:boolean = false,isFloor:boolean = false,isCeil:boolean = false):number
	{

	     start = Math.min(start,end); 
		 end = Math.max(start,end); 
         var range:number = end - start; 
		 var result :number = start + Math.random()*range;
		 if(isRound) return  Math.round(result);
		 if(isFloor) return  Math.floor(result);
		 if(isCeil)  return  Math.ceil(result);
	  	 return result;
	}


    /**
     * 获取随机种子
     */     
	 public static random():number
	 {
		 return  Math.random();
	 }


    /**
     * 随机数组内一个
     * @param array
     */	
	public static randomArray(array:Array<any>):any 
	{
        var index:number = Math.floor(Math.random() * array.length);
        return array[index];
    }

}