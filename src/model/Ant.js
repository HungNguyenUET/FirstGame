/**
 * Created by CPU11084_LOCAL on 6/22/2018.
 */
var Ant = cc.Sprite.extend({
    speech: 100,
    appearPosition:cc.p(160, 60),

    ctor: function(){
        this._super("res/00.png");
        this.x = this.appearPosition.x;
        this.y = this.appearPosition.y;
    }
});