/**
 *
 * @author wheatup
 * 第一幕游戏场景
 * 道路
 *
 */
var ScenarioRoad = (function (_super) {
    __extends(ScenarioRoad, _super);
    function ScenarioRoad() {
        _super.call(this, "skins.scenario.ScenarioRoadSkin");
        this.tick = 0;
        this.forEngine = false;
        this.forTrunk = false;
        this.forEnd1 = false;
        this.forEnd2 = false;
        this.forBush = false;
        this.engineTouchCount = 0;
        this.terrain = new Terrain(this, "0,240 0,436 1600,436 1600,240", 1600, 480, ["1098,272 1098,332 1418,332 1418,272"]);
        //设置摄影机
        this.cameraLimit.width = 800;
        this.cameraPosition.x = 800;
    }
    var __egretProto__ = ScenarioRoad.prototype;
    __egretProto__.init = function () {
        this.grp_game = this.ui["grp_game"];
        this.grp_game.touchChildren = false;
        this.grp_touch = this.ui["grp_touch"];
        this.bindEvents();
        this.floatGroup = this.ui["grp_playground"];
        this.ui["img_car"].anchorX = 0.5;
        this.ui["img_car"].anchorY = 0.8;
        this.ui["img_car"].x += this.ui["img_car"].width * this.ui["img_car"].anchorX;
        this.ui["img_car"].y += this.ui["img_car"].height * this.ui["img_car"].anchorY;
        this.floaters.push(this.ui["img_car"]);
        //初始化判定区域
        this.box_scene = this.ui["box_scene"];
        this.box_engine = this.ui["box_engine"];
        this.box_trunk = this.ui["box_trunk"];
        this.box_end1 = this.ui["box_end1"];
        this.box_end2 = this.ui["box_end2"];
        this.box_bush = this.ui["box_bush"];
        //添加粒子
        this.grp_particle = this.ui["grp_particle"];
        this.grp_particle.anchorY = 5;
        this.grp_particle.y += this.grp_particle.height * 5;
        this.floaters.push(this.grp_particle);
        var texture = RES.getRes("par_steam");
        var config = RES.getRes("par_steam_json");
        this.particle = new particle.GravityParticleSystem(texture, config);
        //        this.particle.emitterX = -50;
        //        this.particle.emitterY = 240;
        this.grp_particle.blendMode = egret.BlendMode.ADD;
        this.grp_particle.addElement(this.particle);
        this.particle.start();
        //创建玩家
        this.createPlayer(1250, 350, this.ui["grp_playground"]);
        //创建GUI
        Main.addScene(Main.LAYER_GUI, Main.uiScene);
        //this.drawGrid();
    };
    __egretProto__.clearForFlag = function () {
        this.forEngine = false;
        this.forTrunk = false;
        this.forEnd1 = false;
        this.forEnd2 = false;
        this.forBush = false;
    };
    __egretProto__.bindEvents = function () {
        this.box_scene.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchScene, this);
        this.box_engine.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEngine, this);
        this.box_trunk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTrunk, this);
        this.box_end1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEnd1, this);
        this.box_end2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEnd2, this);
        this.box_bush.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchBush, this);
        WheatupEvent.bind(EventType.DIALOGUE_END, this.onDialogueEnd, this);
        WheatupEvent.bind(EventType.ARRIVE, this.onArrive, this);
    };
    __egretProto__.unbindEvents = function () {
        this.box_scene.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchScene, this);
        this.box_engine.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEngine, this);
        this.box_trunk.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTrunk, this);
        this.box_end1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEnd1, this);
        this.box_end2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEnd2, this);
        this.box_bush.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchBush, this);
        WheatupEvent.unbind(EventType.DIALOGUE_END, this.onDialogueEnd);
        WheatupEvent.unbind(EventType.ARRIVE, this.onArrive);
    };
    __egretProto__.start = function () {
        this.delay(2000);
        this.addEvent(function () {
            DialogueScene.showDialogue("scene1");
        }, this);
    };
    __egretProto__.update = function () {
        this.calcCamera();
    };
    __egretProto__.calcCamera = function () {
        var targetX = Util.clip(this.player.getX() - 400, 0, this.cameraLimit.width);
        var targetY = Util.clip(this.player.getY() - 240, 0, this.cameraLimit.height);
        this.cameraPosition.x = this.cameraPosition.x + Math.round((targetX - this.cameraPosition.x) * 0.1);
        this.cameraPosition.y = this.cameraPosition.y + Math.round((targetY - this.cameraPosition.y) * 0.1);
        this.ui["grp_bg3"].x = -(Math.round(this.cameraPosition.x * 2) % 800);
        this.ui["grp_bg3"].y = -(Math.round(this.cameraPosition.y * 2) % 800);
        this.ui["grp_bg2"].x = -this.cameraPosition.x;
        this.ui["grp_bg2"].y = -this.cameraPosition.y;
        this.ui["grp_bg1"].x = -(Math.round(this.cameraPosition.x * 0.2));
        this.ui["grp_bg1"].y = -(Math.round(this.cameraPosition.y * 0.2));
        this.ui["grp_playground"].x = -this.cameraPosition.x;
        this.ui["grp_playground"].y = -this.cameraPosition.y;
        //        this.grp_game.x = -this.cameraPosition.x;
        //        this.grp_game.y = -this.cameraPosition.y;
        this.grp_touch.x = -this.cameraPosition.x;
        this.grp_touch.y = -this.cameraPosition.y;
    };
    __egretProto__.touchScene = function (event) {
        if (DialogueScene.showing) {
            DialogueScene.interupt();
        }
        else if (Main.free) {
            this.clearForFlag();
            var x = event.localX;
            var y = event.localY;
            if (this.terrain.isInPolygon(x, y)) {
                this.player.onGridClick(x, y);
            }
        }
        event.stopPropagation();
    };
    __egretProto__.touchEngine = function (event) {
        if (DialogueScene.showing) {
            DialogueScene.interupt();
        }
        else if (Main.free) {
            this.forEngine = true;
            this.player.onGridClick(1150, 350);
        }
        event.stopPropagation();
    };
    __egretProto__.touchTrunk = function (event) {
        if (DialogueScene.showing) {
            DialogueScene.interupt();
        }
        else if (Main.free) {
            this.clearForFlag();
            this.forTrunk = true;
            this.player.onGridClick(1400, 300);
        }
        event.stopPropagation();
    };
    __egretProto__.touchEnd1 = function (event) {
        if (DialogueScene.showing) {
            DialogueScene.interupt();
        }
        else if (Main.free && !DialogueScene.showing) {
            this.clearForFlag();
            this.forEnd1 = true;
            this.player.onGridClick(25, 300);
        }
        event.stopPropagation();
    };
    __egretProto__.touchEnd2 = function (event) {
        if (DialogueScene.showing) {
            DialogueScene.interupt();
        }
        else if (Main.free) {
            this.clearForFlag();
            this.forEnd2 = true;
            this.player.onGridClick(1575, 300);
        }
        event.stopPropagation();
    };
    __egretProto__.touchBush = function (event) {
        if (DialogueScene.showing) {
            DialogueScene.interupt();
        }
        else if (Main.free) {
            this.clearForFlag();
            this.forBush = true;
            this.player.onGridClick(470, 230);
        }
        event.stopPropagation();
    };
    __egretProto__.onDialogueEnd = function (data) {
        if (data == "scene1") {
            Main.free = true;
        }
    };
    __egretProto__.onArrive = function (data) {
        if (this.forEngine) {
            if (this.engineTouchCount == 0) {
                DialogueScene.showDialogue("engine1");
            }
            else {
                DialogueScene.showDialogue("engine2");
            }
            this.engineTouchCount++;
        }
        else if (this.forTrunk) {
            Main.transit(1000);
            Main.addScene(Main.LAYER_GAME, Main.trunkScene);
        }
        else if (this.forEnd1) {
            DialogueScene.showDialogue("road_end1");
        }
        else if (this.forEnd2) {
            DialogueScene.showDialogue("road_end2");
        }
        else if (this.forBush) {
            Main.transit(1000);
            Main.removeScene(this);
        }
    };
    __egretProto__.onRemove = function () {
        this.unbindEvents();
    };
    return ScenarioRoad;
})(Scenario);
ScenarioRoad.prototype.__class__ = "ScenarioRoad";