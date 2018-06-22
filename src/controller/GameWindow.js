/**
 * Created by CPU11084_LOCAL on 6/22/2018.
 */
var GameWindow = cc.Layer.extend({
    _fire: null,

    ctor:function(){
        this._super();
        this.init();
    },

    init:function(){
        this.initBackground();
        winSize = cc.director.getWinSize();
        this.schedule(this.update, 2);
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
        this.makeFire();
    },

    makeFire:function(){
        this._fire = new cc.Sprite("res/animation_0/00.png");
        this._fire.attr({
            anchorX: 0,
            anchorY: 0,
            x: Math.random()*winSize.width,
            y: Math.random()*winSize.height
        });
        this.addChild(this._fire);
    }
});

GameWindow.scene = function(){
    var scene = new cc.Scene();
    var layer = new GameWindow();
    scene.addChild(layer);
    return scene;
};