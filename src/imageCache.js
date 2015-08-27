function imageCache(substr, replacementCache) {
    var extension = substr;
    var defaultImage = {
        "width": 80,
        "height": 80,
        "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQBAMAAAB8P++eAAAAA3NCSVQICAjb4U/gAAAAMFBMVEX///+ZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZnHHh8xAAAAEHRSTlMAESIzRFVmd4iZqrvM3e7/dpUBFQAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAHrSURBVEiJ7Za9SgNBEMfvEtH4nUKw0CKV2IgJPoB5A1OIYCMphKAIsYqCRSyEVBLfIBa+gBZiF6NgGzvtDsHCzi8wiTH3d29j7vays7kF20xxt9z+b347czs7Zxh969s/LXwMhT3GRZ1ZUumAhiicUeuAc0HYw6HPZRhoFTKZXG5PuuxbgLfKYeBEFaZvbhwtdUIs3LvjSdTVwiLeBGGNJylBCfM+4Re7Tlt4iMrCbLfHUJWl4ibIIxPOOjn7kV1K6DzP7m4w2kJjHUIqVGjTSWwJ74HoEJBmmA9RM5dJyWjZo8n2aJ2IuorvbeDaE26w2Gwi6iyPOu0+jPB0EVGPORNNL4/8xVsCbZbZxIX7jAVnH0WJqA1jsIo7b4UjQOXPs7R7jJiQmkXY7WVI6C4rcgqJ9puFp05QPT2yejukPErCiFt8AWiv3mj01GqsPVhx641E77CcXyWdURmfpLCNXuCf275MmPPe9iDQA6/ikZNSo5dFXdMghQ46xByeLW1ZbWGlMymjR4FndgsfOCt4idIea/xVmwdshNcKm96+lNCmRXxxCj0EnFJCCT0BxIKFvLjoQ1JCl/3Fr0SbiiVKaCZM6qFLTVInRx2K6wg1u4J2n9HuXNq9ULu76vfrnn8Avtaj+0/Rt74J9gtwfIE3dy66ggAAAABJRU5ErkJggg=="
    }
    var backImage = new Image();
    backImage.src = defaultImage.url;
    this.cacheList = {};
    this.load = function(card) {
        var id = card.id;
        var localCache = this.cacheList;
        if (this[id] != undefined)
            return;
        var img = new Image();
        localCache[id] = {
            image: img,
            isLoaded: false,
            isDecode: false,
            data: {
                id: id
            }

        };
        // 用于canvas的img跨域缓存  canvas.toDataURL("image/png")
        img.crossOrigin = "Anonymous";
        img.onload = function() {
            localCache[id].isLoaded = true;
            localCache[id].data.width = this.width;
            localCache[id].data.height = this.height;
            localCache[id].data.src = this.src;
            localCache[id].data.translateY = (canvasWidth / card.width) * card.translateY;
            this.onload = null;
            this.onerror = null;
            requestAnimFrame(drawImg);
            // cancelAnimationFrame(canvasDrawAnimFrame);
            // canvasDrawAnimFrame = requestAnimFrame(drawAnimation);
        };
        img.onerror = function() {
            this.onload = null;
            this.onerror = null;
        };
        img.src = card.src + extension;
    };
    this.getReplacementFromLowerCache = function(card) {
        if (replacementCache == undefined)
            defaultImage = {
                image: backImage,
                isLoaded: true,
                data: card,
                isDefault: true,
                isDecode: true
            }
        return defaultImage;
        return replacementCache.getImageForCard(card);
    };
    this.getImageForCard = function(card) {
        var imgObj;
        if (this.cacheList[card.id] == undefined) {
            this.load(card);
            imgObj = this.getReplacementFromLowerCache(card);
        } else {
            if (this.cacheList[card.id].isLoaded)
                imgObj = this.cacheList[card.id];
            else
                imgObj = this.getReplacementFromLowerCache(card);
        }
        return imgObj;
    };
    this.clear = function() {

    }
}