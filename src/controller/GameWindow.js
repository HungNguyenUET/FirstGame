/**
 * Created by CPU11084_LOCAL on 6/22/2018.
 */
var GameWindow = cc.Layer.extend({
    count: 0,
    score: null,
    tmpScore:0,
    ctor:function(){
        this._super();
        this.init();
    },

    init:function(){
        this.count = 1;
        cc.spriteFrameCache.addSpriteFrames("res/fire1.plist");
        cc.spriteFrameCache.addSpriteFrames("res/fire2.plist");
        this.initBackground();
        MW.CONTAINER.FIRES = [];
        winSize = cc.director.getWinSize();
        this.score = new cc.LabelBMFont("Score: 0", "res/arial-14.fnt");
        this.score.attr({
            anchorX: 1,
            anchorY: 0,
            x: winSize.width - 5,
            y: winSize.height - 30,
            scale: 1.5
        });
        this.score.textAlign = cc.TEXT_ALIGNMENT_RIGHT;
        this.addChild(this.score);
        this.schedule(this.update, 1);
        this.schedule(this.updateUI, 0.1);
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
                var i;
                for(i = 0; i < MW.CONTAINER.FIRES.length; i++){
                    if(self.isTouch(MW.CONTAINER.FIRES[i], location)){
                        MW.CONTAINER.FIRES[i].y = -100;
                        if(MW.CONTAINER.FIRES[i].type == 1){
                            self.scoreCounter();
                        }else{
                            cc.log("Game Over");
                            MW.SCORE = self.tmpScore;
                            cc.director.runScene(GameOver.scene());
                        }
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

    updateUI:function(){
        cc.log("----- UPDATE -----");
        var newFire;
        if(this.count % 6 == 0){
            newFire = Fire.createFire(2);
        }else{
            newFire = Fire.createFire(1);
        }
        this.count++;
        this.addChild(newFire);
    },

    update:function(){
        var i;
        for(i = 0; i < MW.CONTAINER.FIRES.length; i++){
            var currentFire = MW.CONTAINER.FIRES[i];
            if(currentFire.x > winSize.width || currentFire.x < 0){
                currentFire.speech *= -1;
            }
            currentFire.x += currentFire.speech;
        }
    },

    isTouch:function(fire, location){
        if(location.x > fire.x && location.x < (fire.x + fire.width) &&
            location.y > fire.y && location.y < (fire.y + fire.height)){
            cc.log("--- TOUCH ---");
            return true;
        }
    },

    scoreCounter:function(){
        this.tmpScore += 1;
        this.score.setString("Score: " + this.tmpScore);
    }
});

GameWindow.scene = function(){
    var scene = new cc.Scene();
    var layer = new GameWindow();
    scene.addChild(layer);
    return scene;
};