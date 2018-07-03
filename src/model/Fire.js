/**
 * Created by CPU11084_LOCAL on 6/22/2018.
 */
MAX_FIRE = 60;

var Fire = cc.Sprite.extend({
    speech: 30,
    type:null,
    active: true,
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
    var positionX = Math.random()*winSize.width;
    var positionY = Math.random()*winSize.height;
    if(positionY < MW.PADDING_TOP){
        positionY += MW.PADDING_TOP;
    }
    newFire.attr({
        anchorX: 0,
        anchorY: 0,
        x: positionX,
        y: positionY,
        scale: arg
    });
    if(newFire.y < MW.PADDING_TOP){
        cc.log(newFire.y);
    }
    MW.CONTAINER.FIRES.push(newFire);
    total_fire += 1;
    return newFire;
};