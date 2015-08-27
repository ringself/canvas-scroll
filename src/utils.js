window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
            var self = this,
                start,
                finish;
            window.setTimeout(function() {
                start = +new Date();
                callback(start);
                finish = +new Date();
                self.timeout = 1000 / 60 - (finish - start);
            }, self.timeout);
        };
})();
var utils = (function() {
    var me = {};
    me.getTime = Date.now || function getTime() {
        return new Date().getTime();
    };
    me.momentum = function(current, start, time, lowerMargin, wrapperSize, deceleration) {
        var distance = current - start,
            speed = Math.abs(distance) / time,
            destination,
            duration;

        deceleration = deceleration === undefined ? 0.0006 : deceleration;

        destination = current + (speed * speed) / (2 * deceleration) * (distance < 0 ? -1 : 1);
        duration = speed / deceleration;

        //console.log("a"+destination)
        if (destination < lowerMargin) {
            destination = wrapperSize ? lowerMargin - (wrapperSize / 2.5 * (speed / 8)) : lowerMargin;
            distance = Math.abs(destination - current);
            duration = distance / speed;
        } else if (destination > 0) {
            destination = wrapperSize ? wrapperSize / 2.5 * (speed / 8) : 0;
            distance = Math.abs(current) + destination;
            duration = distance / speed;
        }

        //console.log("b"+destination)
        return {
            destination: Math.round(destination),
            duration: duration
        };
    };
    me.parseInt = function(somenum) {
        var rounded;
        // With a bitwise or.
        rounded = (0.5 + somenum) | 0;
        // A double bitwise not.
        rounded = ~~(0.5 + somenum);
        // Finally, a left bitwise shift.
        rounded = (0.5 + somenum) << 0;
        return rounded;
    }

    return me;
})();