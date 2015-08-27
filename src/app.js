function drawOnscreenList() {
    var w = canvasWidth,
        h = canvasHeight,
        visibleItems = onScreenItems || getVisibleItemIndexes(imgData, scrollTop);

    function drawOnscreen(imageObj) {
        var image = imageObj.image;
        var item = imageObj.data;
        var width = item.width > canvasWidth ? canvasWidth : item.width;
        var height = item.width > canvasWidth ? utils.parseInt((canvasWidth / item.width) * item.height) : item.height;
        // old use translate
        var translateY = item.translateY - scrollTop;
        // var drawHeight = height > canvasHeight ? height - canvasHeight : height;
        var drawHeight = canvasHeight + scrollTop - item.translateY;
        context.save();
        context.translate(0, translateY);
        if (imageObj.isDefault) {
            context.drawImage(image, 0, 0, 80, 80, (width - 40) / 2, (height - 40) / 2, 40, 40);
        } else {
            context.drawImage(image, 0, 0, width, height);
            imageObj.isDecode = true;
        }
        context.restore();

        // TODO UC下有渲染bug 新的方法减少一次translate操作
        // new ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        // var isNeedDraw = true;
        // var sx,sy,sWidth,sHeight,dx,dy,dWidth,dHeight;
        // var dist = canvasHeight + scrollTop - item.translateY;
        // var translateY = item.translateY - scrollTop;
        // if(dist > canvasHeight){
        //     sy = -translateY;
        //     sHeight = Math.min(canvasHeight,height+translateY);
        //     dy = 0;
        //     dHeight = Math.min(canvasHeight,height+translateY);
        // }
        // else if(dist > 0){
        //     sy = 0;
        //     sHeight = dist;
        //     dy = translateY;
        //     dHeight = dist;
        // }
        // else{
        //     isNeedDraw = false;
        // }

        // if(isNeedDraw){
        //     if(imageObj.isDefault){
        //         context.save();
        //         context.translate(0, translateY);
        //         context.drawImage(image, 0, 0, 80, 80,(width-40)/2, (height-40)/2, 40, 40);
        //         context.restore();
        //     }
        //     else{
        //         if(item.width > canvasWidth){
        //             sHeight = utils.parseInt((item.width/canvasWidth)*sHeight);
        //             sy = utils.parseInt((item.width/canvasWidth)*sy);
        //         }
        //         context.drawImage(image, 0, sy, item.width, sHeight, 0, dy, width, dHeight);
        //         imageObj.isDecode = true;
        //     }
        // }
    }
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    visibleItems.forEach(function(v, i) {
        var img = imagesCache.getImageForCard(imgData[v]);
        if (img.isDecode === false) {
            img = imagesCache.getReplacementFromLowerCache(imgData[v]);
        }
        drawOnscreen(img);
    })
        // 写入scroller.y新的值scrollTop;
    scroller.y = -scrollTop;
    onScreenItems = null;
}

function drawAnimation() {
    if (lastRenderPosition !== 0 && lastRenderPosition == scrollTop) {
        return;
    }
    drawOnscreenList();
    lastRenderPosition = scrollTop;
}

function drawImg() {
    if (isDrawIng) {
        return;
    }
    isDrawIng = true;
    var visibleItems = getVisibleItemIndexes(imgData, scrollTop);

    function drawOnscreen(imageObj) {
        var image = imageObj.image;
        var item = imageObj.data;
        var width = item.width > canvasWidth ? canvasWidth : item.width;
        var height = item.width > canvasWidth ? utils.parseInt((canvasWidth / item.width) * item.height) : item.height;
        var translateY = item.translateY - scrollTop;
        context.save();
        context.translate(0, translateY);
        context.clearRect(0, 0, width, height);
        context.drawImage(image, 0, 0, width, height);
        imageObj.isDecode = true;
        context.restore();
    }

    if (animation && !animation.isRunning() || !animation) {
        visibleItems.forEach(function(v, i) {
            var img = imagesCache.getImageForCard(imgData[v]);
            if (img.isDecode === false) {
                drawOnscreen(img);
            }
        })
    }
    isDrawIng = false;
}


function getVisibleItemIndexes(data, scrollTop) {
    var itemIndexes = [];
    var itemCount = data.length;
    var scrollTop = scrollTop;
    var listData = data;

    for (var index = 0; index < itemCount; index++) {
        var item = listData[index];
        var itemHeight = item.height;
        var translateY = item.translateY;
        var id = item.id;
        // Part of item is on-screen.
        if (translateY + itemHeight >= scrollTop && translateY <= scrollTop + canvasHeight || translateY <= scrollTop + canvasHeight * 2 && translateY >= scrollTop + canvasHeight) {
            itemIndexes.push(id);
        }
    }
    //console.log(itemIndexes)
    return itemIndexes;
}


// 绑定事件
function bindTouchEvent() {
    canvas.addEventListener('touchstart', function(e) {
        scroller.startTime = utils.getTime();
        var point = e.touches ? e.touches[0] : e;
        scroller.pointY = point.pageY;
        scroller.y = -scrollTop;
        scroller.startY = scroller.y;
        animation && animation.stop();
        cancelAnimationFrame(canvasDrawAnimFrame);
        cancelAnimationFrame(canvasScrollAnimFrame);
        drawImg();
    }, false);
    canvas.addEventListener('touchend', function(e) {
        scroller.endTime = utils.getTime();
        var point = e.changedTouches ? e.changedTouches[0] : e,
            momentumX,
            momentumY,
            duration = utils.getTime() - scroller.startTime,
            newX = Math.round(scroller.x),
            newY = Math.round(scroller.y),
            distanceX = Math.abs(newX - scroller.startX),
            distanceY = Math.abs(newY - scroller.startY),
            time = 0,
            easing = '';

        scroller.isInTransition = 0;
        scroller.initiated = 0;
        scroller.endTime = utils.getTime();

        // start momentum animation if needed
        if (duration < 300) {
            momentumY = utils.momentum(scroller.y, scroller.startY, duration, scroller.maxScrollY(), canvasHeight, scroller.options.deceleration);
            newY = momentumY.destination;
            time = momentumY.duration;
            scroller.isInTransition = 1;
        }

        if (time == Infinity || time == 0) {
            return;
        }
        var ANIMATION_DURATION = time;
        // var ANIMATION_DURATION = 400;
        var scrolltoY = newY - scroller.y;
        var fps = scrolltoY / ANIMATION_DURATION;
        animation = new AnimationTimer(ANIMATION_DURATION);
        var scrollY = scroller.y;
        // //console.log("scroller.y:"+scroller.y)
        function animate() {
            if (!animation.isOver()) {
                elapsed = animation.getElapsedTime();
                //console.log("elapsed:"+elapsed)
                // update this animation, base on the elapsed time
                if (elapsed) {
                    update(elapsed);
                    canvasScrollAnimFrame = requestAnimFrame(animate);
                }
            } else {
                animation.stop();
                animation = null;
                requestAnimFrame(drawImg);
            }
        }

        function update(elapsed) {
            scrollTop = Math.min(-utils.parseInt(scrollY + fps * elapsed), -scroller.maxScrollY());
            scrollTop = Math.max(scrollTop, 0);
            canvasDrawAnimFrame = requestAnimFrame(drawAnimation);
        }
        animation.start();
        canvasScrollAnimFrame = requestAnimFrame(animate);
    }, false);
    canvas.addEventListener('touchmove', function(e) {
        e.preventDefault();
        e.stopPropagation();
        var point = e.touches ? e.touches[0] : e,
            deltaX = point.pageX - scroller.pointX,
            deltaY = point.pageY - scroller.pointY,
            timestamp = utils.getTime(),
            newX, newY,
            absDistX, absDistY;
        scroller.pointX = point.pageX;
        scroller.pointY = point.pageY;

        scroller.distX += deltaX;
        scroller.distY += deltaY;
        absDistX = Math.abs(scroller.distX);
        absDistY = Math.abs(scroller.distY);

        // We need to move at least 10 pixels for the scrolling to initiate
        if (timestamp - scroller.endTime > 300 && (absDistX < 10 && absDistY < 10)) {
            return;
        }
        scrollTop -= utils.parseInt(deltaY);
        scrollTop = Math.min(scrollTop, -scroller.maxScrollY());
        scrollTop = Math.max(scrollTop, 0);
        canvasDrawAnimFrame = requestAnimFrame(drawAnimation);
        requestAnimFrame(drawImg);
        /* REPLACE START: _move */
        if (timestamp - scroller.startTime > 300) {
            scroller.startTime = timestamp;
            scroller.startY = scroller.y;
        }
        /* REPLACE END: _move */
    }, false)
}

//定义变量
var canvas = document.createElement("canvas"),
    context = canvas.getContext('2d'),
    scale = 1,
    scrollTop = 0,
    canvasHeight = canvas.height = window.innerHeight,
    canvasWidth = canvas.width = window.innerWidth,
    imgLoadList = {},
    onScreenItems,
    animation,
    imagesCache = new imageCache("_620x10000q90.jpg"), //cdn不限高全尺寸支持： 620 450 170 220 790 290 580 110 150 570 240
    // canvas缓存位置
    lastRenderPosition = 0,
    imgData,
    canvasDrawAnimFrame,
    canvasScrollAnimFrame,
    scroller = {
        pointX: 0,
        pointY: 0,
        y: 0,
        x: 0,
        startY: 0,
        maxScrollY: function() {
            return canvasHeight - imgData[imgData.length - 1].translateY - imgData[imgData.length - 1].height
        },
        options: {
            deceleration: 0.0012
        }
    },
    isDrawIng = false;

// 初始化数据
imgData = transformData(mockJson, canvasWidth);
// 创建canvas节点
document.getElementById('content').appendChild(canvas);
// 绑定事件
bindTouchEvent();
// 获取屏幕内元素
onScreenItems = getVisibleItemIndexes(imgData, scrollTop);
// 绘画canvas
canvasDrawAnimFrame = requestAnimFrame(drawAnimation);