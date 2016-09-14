function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function () {
        this.ctx = this.getComponent(cc.Graphics);

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: this.onTouchBegan.bind(this),
            onTouchMoved: this.onTouchMoved.bind(this),
            onTouchEnded: this.onTouchEnded.bind(this),
        }, this.node);
    },

    onTouchBegan: function (touch, event) {
        var touchLoc = touch.getLocation();
        touchLoc = this.node.parent.convertToNodeSpaceAR(touchLoc);

        this.lastPoint = touchLoc;

        return true;
    },

    onTouchMoved: function (touch, event) {
        var touchLoc = touch.getLocation();
        touchLoc = this.node.parent.convertToNodeSpaceAR(touchLoc);

        let ctx = this.ctx;
        let lastPoint = this.lastPoint;        

        ctx.strokeColor = cc.color(0,0,0,255);
        ctx.moveTo(lastPoint.x - 4, lastPoint.y - 4);
        ctx.lineTo(touchLoc.x - 4, touchLoc.y - 4);
        ctx.stroke();
        
        ctx.strokeColor = cc.color(0,0,0,200);
        ctx.moveTo(lastPoint.x - 2, lastPoint.y - 2);
        ctx.lineTo(touchLoc.x - 2, touchLoc.y - 2);
        ctx.stroke();
        
        ctx.strokeColor = cc.color(0,0,0,130);
        ctx.moveTo(lastPoint.x, lastPoint.y);
        ctx.lineTo(touchLoc.x, touchLoc.y);
        ctx.stroke();
        
        ctx.strokeColor = cc.color(0,0,0,80);
        ctx.moveTo(lastPoint.x + 2, lastPoint.y + 2);
        ctx.lineTo(touchLoc.x + 2, touchLoc.y + 2);
        ctx.stroke();
        
        ctx.strokeColor = cc.color(0,0,0,20);
        ctx.moveTo(lastPoint.x + 4, lastPoint.y + 4);
        ctx.lineTo(touchLoc.x + 4, touchLoc.y + 4);
        ctx.stroke();

        this.lastPoint = touchLoc;
    },

    onTouchEnded: function (touch, event) {
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
