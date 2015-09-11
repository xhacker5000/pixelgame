/**
 *
 * @author wheatup
 * 测试游戏场景
 *
 */
class ScenarioIntro extends Scenario{
    private tick: number = 0;
    
	public constructor() {
        super("skins.scenario.ScenarioIntroSkin");
        this.terrain = new Terrain(this, "73,239 26,392 207,468 363,389 325,294 427,181 590,256 456,389 483,453 759,449 729,152 496,22 205,124 205,354 144,260");
	}
	
	public start(): void{
        //this.drawGrid();
        this.nextBumpTick = Math.round(Math.random() * 100 + 1);
        Timer.addTimer(3000, 1, () => {
            egret.Tween.get(this.ui["img_mask"]).to({ alpha: 0 }, 2000);
        }, this);
        Timer.addTimer(6000, 1, () => {
            egret.Tween.get(this.ui["img_logo"]).to({ alpha: 0 }, 2000);
        }, this);
	}
	
	
    private nextBumpTick: number = 0;
	public update(): void{
        this.tick++;
        this.cameraPosition.x++;
        this.ui["grp_bg1"].x = Math.round(this.cameraPosition.x / 2) % 800;
        this.ui["grp_bg2"].x = Math.round(this.cameraPosition.x * 8) % 800;
        this.ui["grp_bg3"].x = Math.round(this.cameraPosition.x * 24) % 800;
        
        if(this.tick == this.nextBumpTick){
            this.ui["img_car"].y-=2;
            Timer.addTimer(100, 1, () => { this.ui["img_car"].y+=2; }, this);
            this.nextBumpTick += Math.round(Math.random() * 20 + 10);
        }
	}
}
