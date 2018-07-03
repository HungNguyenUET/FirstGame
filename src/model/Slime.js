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
    var positionX = Math.random()*winSize.width;
    var positionY = Math.random()*winSize.height;
    if(positionY < MW.PADDING_TOP){
        positionY += MW.PADDING_TOP;
    }
    newSlime.attr({
        anchorX: 0,
        anchorY: 0,
        x:  positionX,
        y:  positionY
    });
    MW.CONTAINER.SLIMES.push(newSlime);
    return newSlime;
};
