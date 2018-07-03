/**
 * Created by HungNguyen on 26/06/2018.
 */
var GameOver = cc.Layer.extend({
    ctor:function(){
        this._super();
        this.init();
    },

    init:function(){
        this.initBackground();
        var score = new cc.LabelBMFont("Score: " + MW.SCORE, "res/arial-14.fnt");
        score.attr({
            x: winSize.width/2,
            y: 2*winSize.height/3,
            scale: 5
        });
        score.textAlign = cc.TEXT_ALIGNMENT_RIGHT;
        this.addChild(score);
    },

    initBackground:function(){
        var background = new cc.Sprite("res/game_over.png");
        background.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: winSize.width/2,
            y: winSize.height/2
        });
        this.addChild(background);
    }
});

GameOver.scene = function(){
    var scene = new cc.Scene();
    var layer = new GameOver();
    scene.addChild(layer);
    return scene;
};