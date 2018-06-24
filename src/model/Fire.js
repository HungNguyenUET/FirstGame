/**
 * Created by CPU11084_LOCAL on 6/22/2018.
 */
var Fire = cc.Sprite.extend({
    speech: 50,
    type:null,
    ctor:function(arg){
        this._super("#00.png");
        this.type = arg;
        var animFrams = [];
        var frame;
        var i;
        if(arg == 1){
            for(i = 0; i < 15; i++){
                frame = cc.spriteFrameCache.getSpriteFrame("" + i + ".png");
                animFrams.push(frame);
            }
        }else{
            for(i = 0; i < 10; i++){
                frame = cc.spriteFrameCache.getSpriteFrame("0" + i + ".png");
                animFrams.push(frame);
            }
        }
        var animation = new cc.Animation(animFrams, 0.1);
        var animate = cc.animate(animation);
        this.runAction(animate.repeatForever());
    }
});

Fire.createFire = function(arg){
    var newFire = new Fire(arg);
    newFire.attr({
        anchorX: 0,
        anchorY: 0,
        x: Math.random()*winSize.width,
        y: Math.random()*winSize.height
    });
    MW.CONTAINER.FIRES.push(newFire);
    cc.log("--- CREATE FIRE ---");
    return newFire;
};