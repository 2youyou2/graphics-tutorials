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

        this.points = [touchLoc];

        return true;
    },

    onTouchMoved: function (touch, event) {
        var touchLoc = touch.getLocation();
        touchLoc = this.node.parent.convertToNodeSpaceAR(touchLoc);

        let points = this.points;
        points.push(touchLoc);

        let ctx = this.ctx;
        // ctx.clear();

        ctx.moveTo(points[points.length - 2].x, points[points.length - 2].y);
        ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
        ctx.stroke();
        
        for (var i = 0, len = points.length; i < len; i++) {
            let dx = points[i].x - points[points.length-1].x;
            let dy = points[i].y - points[points.length-1].y;
            let d = dx * dx + dy * dy;
  
            if (d < 1000) {
                ctx.strokeColor = cc.color(0,0,0,255*0.3);
                ctx.moveTo( points[points.length-1].x + (dx * 0.2), points[points.length-1].y + (dy * 0.2));
                ctx.lineTo( points[i].x - (dx * 0.2), points[i].y - (dy * 0.2));
                ctx.stroke();
            }
        }

        // ctx.stroke();
    },

    onTouchEnded: function (touch, event) {
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
