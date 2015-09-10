/**
 *
 * @author wheatup
 * 游戏场景
 * 
 */
class WarningScene extends Scene{
    private img_loading: egret.gui.UIAsset;
    private grp: egret.gui.Group;
    private interuptted: boolean = false;
    private autoTimerVO: TimerVO;
    private viberateTimerVO: TimerVO;
    private title1x: number;
    private title2x: number;
    private title1y: number;
    private title2y: number;
    
    public constructor(){
        super("skins.scene.WarningSkin");
    }
    
    public init():void{
        this.img_loading = this.ui["img_loading"];
        this.grp = this.ui["grp"];
    }
	
    public start(): void{
        this.spinSimbol();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.rush,this);
        this.title1x = this.ui["lbl_title_cn1"].x;
        this.title1y = this.ui["lbl_title_cn1"].y;
        this.title2x = this.ui["lbl_title_en1"].x;
        this.title2y = this.ui["lbl_title_en1"].y;
        this.viberateTimerVO = Timer.addTimer(50,-1,this.viberate,this);
        this.autoTimerVO = Timer.addTimer(20000,1,() => {
            if(!this.interuptted) {
                this.stepToNext();
            }
        },this);
    }
    
    private spinSimbol():void{
        this.img_loading.anchorX = 0.5;
        this.img_loading.anchorY = 0.5;
        this.img_loading.x += this.img_loading.width / 2;
        this.img_loading.y += this.img_loading.width / 2;
        egret.Tween.get(this.img_loading,{ loop: true }).to({ rotation: -360 },2000);
    }
    
    private rush():void{
        this.interuptted = true;
        Timer.removeTimer(this.autoTimerVO);
        this.stepToNext();
    }
    
    private viberate():void{
        egret.Tween.get(this.ui["lbl_title_cn1"]).to({ x: this.title1x + Math.floor(Math.random() * 3),y: this.title1y + Math.floor(Math.random() * 3) },40);
        egret.Tween.get(this.ui["lbl_title_en1"]).to({ x: this.title2x + Math.floor(Math.random() * 3),y: this.title2y + Math.floor(Math.random() * 3) },40);
            
    }
    
    private stepToNext(): void{
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.rush,this);
        //添加主菜单层
        Main.addScene(Main.LAYER_GAME,new MainMenuScene());
        Main.removeScene(this);
    }
    
    public onRemove():void{
        Timer.removeTimer(this.viberateTimerVO);
        if(!this.interuptted){
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.rush,this);
        }
    }
}
