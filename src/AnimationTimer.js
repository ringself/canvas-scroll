AnimationTimer = function(duration, timeWarp) {
    // this.timeWarp = timeWarp || this.makeEaseOut(2);
    this.timeWarp = timeWarp || this.easing.easeOutCubic;
    if (duration !== undefined) this.duration = duration;
    this.stopwatch = new Stopwatch();
};

AnimationTimer.prototype = {
    start: function() {
        this.stopwatch.start();
    },
    stop: function() {
        this.stopwatch.stop();
    },
    getElapsedTime: function() {
        var elapsedTime = this.stopwatch.getElapsedTime();
        var percentComplete = elapsedTime / this.duration;
        if (!this.stopwatch.running) {
            return undefined;
        }
        if (this.timeWarp == undefined) {
            return elapsedTime;
        }
        return elapsedTime * (this.timeWarp(percentComplete) / percentComplete);
    },
    isRunning: function() {
        return this.stopwatch.isRunning();
    },
    isOver: function() {
        return this.stopwatch.getElapsedTime() > this.duration;
    },
    makeEaseInOut: function(percentComplete) {
        return percentComplete - Math.sin(percentComplete * 2 * Math.PI) / (2 * Math.PI)
    },
    makeEaseOut: function(strength) {
        return function(percentComplete) {
            return 1 - Math.pow(1 - percentComplete, strength * 2);
        }
    },
    easing: {

        linear: function(t) {
            return t;
        },

        easeInQuad: function(t) {
            return Math.pow(t, 2);
        },

        easeOutQuad: function(t) {
            return t * (2 - t);
        },

        easeInOutQuad: function(t) {
            return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        },

        easeInCubic: function(t) {
            return t * t * t;
        },

        easeOutCubic: function(t) {
            return (--t) * t * t + 1;
        },

        easeInOutCubic: function(t) {
            return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        }

    }
}