/**
 * Created by CPU11084_LOCAL on 6/22/2018.
 */
var GameWindow = cc.Layer.extend({

    ctor:function(){
        this._super();
        this.init();
    },

    init:function(){
        cc.spriteFrameCache.addSpriteFrames("res/fire1.plist");
        this.initBackground();
        MW.CONTAINER.FIRES = [];
        winSize = cc.director.getWinSize();
        this.schedule(this.update, 2);
        this.addTouchListener()
    },

    addTouchListener: function() {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function(touch, event){
                var location = touch.getLocation();
                cc.log(location.x);
                cc.log(location.y);
                for(i = 0; i < MW.CONTAINER.FIRES.length; i++){
                    if(self.isTouch(MW.CONTAINER.FIRES[i], location)){
                        MW.CONTAINER.FIRES[i].x = -100;
                        return true;
                    }
                }
                return true;
            }
        }, this);
    },

    initBackground: function(){
        var background = new cc.Sprite("res/game_background.png");
        background.attr({
            anchorX: 0,
            anchorY: 0
        });
        this.addChild(background);
    },

    update:function(){
        cc.log("----- UPDATE -----");
        var newFire = Fire.createFire();
        this.addChild(newFire);

    },

    isTouch:function(fire, location){
        if(location.x > fire.x && location.x < (fire.x + fire.width) &&
            location.y > fire.y && location.y < (fire.y + fire.height)){
            cc.log("--- TOUCH ---");
            return true;
        }
    }
});

GameWindow.scene = function(){
    var scene = new cc.Scene();
    var layer = new GameWindow();
    scene.addChild(layer);
    return scene;
};