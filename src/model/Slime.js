/**
 * Created by CPU11084_LOCAL on 7/2/2018.
 */
var Slime = cc.Sprite.extend({
    speech: -30,
    type:null,
    ctor:function(){
        this._super("#blueslime1.png");
        var slimeAnimFrams = [];
        var frame;
        var i;
        for(i = 1; i < 10; i++){
            frame = cc.spriteFrameCache.getSpriteFrame("blueslime" + i + ".png");
            slimeAnimFrams.push(frame);
        }
        var animation = new cc.Animation(slimeAnimFrams, 0.1);
        var animate = cc.animate(animation);
        this.runAction(animate.repeatForever());
    }
});

Slime.createSlime = function(){
    var newSlime = new Slime();
    newSlime.attr({
        anchorX: 0,
        anchorY: 0,
        x: Math.random()*winSize.width - newSlime.width,
        y: Math.random()*winSize.height - newSlime.height
    });
    MW.CONTAINER.SLIMES.push(newSlime);
    cc.log("--- CREATE SLIME ---");
    return newSlime;
};
