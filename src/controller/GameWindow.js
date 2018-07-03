/**
 * Created by CPU11084_LOCAL on 6/22/2018.
 */
MAX_CONTAINT_WIDTH = 40;
MAX_CONTAINT_HEIGHT = 40;
var total_fire = 0;

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
        cc.spriteFrameCache.addSpriteFrames(res.fire1_plist);
        cc.spriteFrameCache.addSpriteFrames(res.fire2_plist);
        cc.spriteFrameCache.addSpriteFrames(res.slime_plist);
        winSize = cc.director.getWinSize();
        cc.log(winSize.width);
        this.initBackground(winSize);
        MW.CONTAINER.FIRES = [];
        this.score = new cc.LabelBMFont("0", "res/fonts/number_1.fnt");
        this.score.attr({
            anchorX: 1,
            anchorY: 0,
            x: winSize.width - this.score.width,
            y: winSize.height - this.score.height,
            scale: 1.5
        });
        this.score.textAlign = cc.TEXT_ALIGNMENT_RIGHT;
        this.addChild(this.score);
        this.schedule(this.update, 1);
        this.schedule(this.updateUI, 0.1);
        this.addTouchListener();
        cc.audioEngine.playMusic(cc.sys.os == cc.sys.OS_WP8 || cc.sys.os == cc.sys.OS_WINRT ? res.bgMusic_wav : res.bgMusic_mp3, true);
    },

    collide:function (a, b) {
        var ax = a.x, ay = a.y, bx = b.x, by = b.y;
        if (Math.abs(ax - bx) > MAX_CONTAINT_WIDTH || Math.abs(ay - by) > MAX_CONTAINT_HEIGHT)
            return false;

        var aRect = a.collideRect(ax, ay);
        var bRect = b.collideRect(bx, by);
        return cc.rectIntersectsRect(aRect, bRect);
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
                        MW.CONTAINER.FIRES[i].active = false;
                        if(MW.CONTAINER.FIRES[i].type == 1){
                            cc.audioEngine.playEffect(cc.sys.os == cc.sys.OS_WINDOWS ||
                            cc.sys.os == cc.sys.OS_WINRT ? res.fireEffect_wav : res.fireEffect_mp3);
                            self.scoreCounter();
                        }else{
                            cc.audioEngine.stopMusic();
                            cc.audioEngine.stopAllEffects();
                            cc.log("Game Over");
                            MW.SCORE = self.tmpScore;
                            cc.director.runScene(GameOver.scene());
                            cc.log(total_fire);
                        }
                        return true;
                    }
                }
                for(i = 0; i < MW.CONTAINER.SLIMES.length; i++){
                    if(self.isTouch(MW.CONTAINER.SLIMES[i], location)){
                        MW.CONTAINER.SLIMES[i].y = -100;
                        return true;
                    }
                }
                return true;
            }
        }, this);
    },

    initBackground: function(winSize){
        var background = new cc.Sprite("res/game_background.png");
        background.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: winSize.width/2,
            y: winSize.height/2
        });
        this.addChild(background);
    },

    update:function(){
        var newFire;
        var newSlime;
        if(total_fire < MAX_FIRE){
            if(this.count % 6 == 0){
                newFire = Fire.createFire(2);
                newSlime = Slime.createSlime();
                this.addChild(newSlime);
            }else{
                newFire = Fire.createFire(1);
            }
            this.addChild(newFire);
            this.count++;
        }else{
            for(var i = 0; i < MW.CONTAINER.FIRES.length; i++){
                var curFire =  MW.CONTAINER.FIRES[i];
                if(curFire.active == false){
                    curFire.active = true;
                    var positionX = Math.random()*winSize.width;
                    var positionY = Math.random()*winSize.height;
                    curFire.attr({
                        anchorX: 0,
                        anchorY: 0,
                        x: positionX,
                        y: positionY
                    });
                    break;
                }
            }
        }
    },

    updateUI:function(){
        var i;
        for(i = 0; i < MW.CONTAINER.FIRES.length; i++){
            var currentFire = MW.CONTAINER.FIRES[i];
            if(currentFire.x > winSize.width || currentFire.x < 0){
                currentFire.speech *= -1;
            }
            if(currentFire.active == true) {
                currentFire.x += currentFire.speech;
            }
        }
        for(i = 0; i < MW.CONTAINER.SLIMES.length; i++){
            var currentSlime = MW.CONTAINER.SLIMES[i];
            if(currentSlime.x > winSize.width || currentFire.x < 0){
                currentSlime.speech *= -1;
                currentSlime.scaleX *= -1;
            }
            currentSlime.x += currentSlime.speech;
        }
    },

    isTouch:function(obj, location){
        if(location.x > obj.x && location.x < (obj.x + obj.width*2) &&
            location.y > obj.y && location.y < (obj.y + obj.height*2)){
            cc.log("--- TOUCH ---");
            return true;
        }
    },

    scoreCounter:function(){
        this.tmpScore += 1;
        this.score.setString(this.tmpScore);
    }
});

GameWindow.scene = function(){
    var scene = new cc.Scene();
    var layer = new GameWindow();
    scene.addChild(layer);
    return scene;
};