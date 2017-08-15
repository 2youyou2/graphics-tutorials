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

        this.points = [];
    },

    onTouchBegan: function (touch, event) {
        var touchLoc = touch.getLocation();
        touchLoc = this.node.parent.convertToNodeSpaceAR(touchLoc);

        this.points.push(touchLoc);

        return true;
    },

    onTouchMoved: function (touch, event) {
        var touchLoc = touch.getLocation();
        touchLoc = this.node.parent.convertToNodeSpaceAR(touchLoc);

        var width = getRandomInt(5, 10);

        let points = this.points;
        points.push(touchLoc);

        let ctx = this.ctx;

        let p1 = points[points.length-2];
        let p2 = points[points.length-1];

        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineWidth = width;
        ctx.stroke();
    },

    onTouchEnded: function (touch, event) {
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
