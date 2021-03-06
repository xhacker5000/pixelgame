var skins;
(function (skins) {
    var scene;
    (function (scene) {
        var MainMenuSkin = (function (_super) {
            __extends(MainMenuSkin, _super);
            function MainMenuSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [480, 800]);
                this.elementsContent = [this.bg1_i(), this.bg2_i(), this.grp_particle_i(), this.grp_i(), this.bg3_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = MainMenuSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return MainMenuSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.bg2_i = function () {
                var t = new egret.gui.UIAsset();
                this.bg2 = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [520, "title_bg2", 840, -20, -20]);
                return t;
            };
            __egretProto__.bg3_i = function () {
                var t = new egret.gui.UIAsset();
                this.bg3 = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [520, "title_bg3", 840, -20, -20]);
                return t;
            };
            __egretProto__.grp_i = function () {
                var t = new egret.gui.Group();
                this.grp = t;
                this.__s(t, ["height", "width", "x", "y"], [480, 800, 0, 0]);
                t.elementsContent = [this.img_title_i(), this.img_start_i(), this.img_continue_i()];
                return t;
            };
            __egretProto__.grp_particle_i = function () {
                var t = new egret.gui.Group();
                this.grp_particle = t;
                this.__s(t, ["height", "width", "x", "y"], [480, 800, 0, 0]);
                return t;
            };
            __egretProto__.img_continue_i = function () {
                var t = new egret.gui.UIAsset();
                this.img_continue = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [52, "title_continue_0", 122, 629, 362]);
                return t;
            };
            __egretProto__.img_start_i = function () {
                var t = new egret.gui.UIAsset();
                this.img_start = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [52, "title_start", 122, 579, 302]);
                return t;
            };
            __egretProto__.img_title_i = function () {
                var t = new egret.gui.UIAsset();
                this.img_title = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [160, "title_title_1", 584, 19, 71]);
                return t;
            };
            __egretProto__.bg1_i = function () {
                var t = new egret.gui.UIAsset();
                this.bg1 = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [520, "title_bg1", 840, -20, -20]);
                return t;
            };
            MainMenuSkin._skinParts = ["bg1", "bg2", "grp_particle", "img_title", "img_start", "img_continue", "grp", "bg3"];
            return MainMenuSkin;
        })(egret.gui.Skin);
        scene.MainMenuSkin = MainMenuSkin;
        MainMenuSkin.prototype.__class__ = "skins.scene.MainMenuSkin";
    })(scene = skins.scene || (skins.scene = {}));
})(skins || (skins = {}));
