/**
 *
 * @author wheatup
 * 数据与标识
 *
 */
class Data {
    private static flags: Array<Flag> = [];
    public static flagData: Object = {};
    
    public static setFlag(key: Flag, value: any = true): void{
        if(Data.flags.indexOf(key) < 0){
            Data.flags.push(key);
        }
        Data.flagData[key] = value;
    }
    
    public static getFlag(key: Flag): any{
        return Data.flagData[key];
    }
    
    public static save():void{
        
    }
}

enum Flag{
    HasCarBusted,       //车是否刚坏，这将控制是否出现道路的对话剧情
    HasArrivedJungle,      //是否到达过丛林，这将控制是否天色已晚
    GotShovel              //是否获得过铲子，这将控制车厢内是否有铲子
}

//class Flag{
//    public static IsCarJustBusted = "IsCarJustBusted";        //车是否刚坏，这将控制是否出现道路的对话剧情
//    public static HasArrivedJungle = "HasArrivedJungle";      //是否到达过丛林，这将控制是否天色已晚
//    public static GotShovel = "GotShovel";                    //是否获得过铲子，这将控制车厢内是否有铲子
//}