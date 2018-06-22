/**
 * Created by CPU11084_LOCAL on 6/22/2018.
 */
var Fire = cc.Sprite.extend({
    speech: 500,
    ctor:function(){
        this._super("#0.png");
        var animFrams = [];
        for(var i = 0; i < 15; i++){
            var frame = cc.spriteFrameCache.getSpriteFrame("" + i + ".png");
            animFrams.push(frame);
        }
        var animation = new cc.Animation(animFrams, 0.1);
        var animate = cc.animate(animation);
        this.runAction(animate.repeatForever());
    }
});

Fire.createFire = function(){
    var newFire = new Fire();
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