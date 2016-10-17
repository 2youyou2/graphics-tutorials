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
        ctx.clear();

        let p1 = points[0];
        let p2 = points[1];
        
        ctx.moveTo(p1.x, p1.y);

        for (let i = 1, l = points.length; i < l-1; i++) {
            ctx.lineTo(points[i].x, points[i].y);
            var nearPoint = points[i-5];
            if (nearPoint && (nearPoint.sub(points[i]).mag() > 10)) {
                ctx.moveTo(nearPoint.x, nearPoint.y);
                ctx.lineTo(points[i].x, points[i].y);
            }
        }

        ctx.stroke();
    },

    onTouchEnded: function (touch, event) {
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
