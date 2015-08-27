// 取自手淘无线版图文详情接口数据
var mockJson = {
    wdescContent: {
        pages: [
            "<img size=751x459>https://img.alicdn.com/imgextra/i2/847005054/TB2i.MndpXXXXbhXXXXXXXXXXXX_!!847005054.jpg</img>",
            "<img size=790x466>https://img.alicdn.com/imgextra/i3/847005054/TB2takEbVXXXXcDXXXXXXXXXXXX_!!847005054.jpg</img>",
            "<img size=790x774>https://img.alicdn.com/imgextra/i2/847005054/TB29CUEbVXXXXcdXXXXXXXXXXXX_!!847005054.jpg</img>",
            "<img size=790x788>https://img.alicdn.com/imgextra/i3/847005054/TB2qCcDbVXXXXcSXXXXXXXXXXXX_!!847005054.jpg</img>",
            "<img size=790x639>https://img.alicdn.com/imgextra/i3/847005054/TB2pJAGbVXXXXbkXXXXXXXXXXXX_!!847005054.jpg</img>",
            "<img size=790x831>https://img.alicdn.com/imgextra/i3/847005054/TB20ygHbVXXXXauXXXXXXXXXXXX_!!847005054.jpg</img>",
            "<img size=790x835>https://img.alicdn.com/imgextra/i2/847005054/TB2pOADbVXXXXcZXXXXXXXXXXXX_!!847005054.jpg</img>",
            "<img size=790x760>https://img.alicdn.com/imgextra/i3/847005054/TB2KYwJbVXXXXXsXXXXXXXXXXXX_!!847005054.jpg</img>",
            "<img size=790x886>https://img.alicdn.com/imgextra/i4/847005054/TB2.LZzbVXXXXayXpXXXXXXXXXX_!!847005054.jpg</img>",
            "<img size=790x913>https://img.alicdn.com/imgextra/i2/847005054/TB2HTMIbVXXXXXAXXXXXXXXXXXX_!!847005054.jpg</img>",
            "<img size=790x1752>https://img.alicdn.com/imgextra/i1/847005054/TB2ESsEbVXXXXcfXXXXXXXXXXXX_!!847005054.jpg</img>",
            "<img size=790x1688>https://img.alicdn.com/imgextra/i1/847005054/TB21hwCbVXXXXXmXpXXXXXXXXXX_!!847005054.jpg</img>",
            "<img size=790x1667>https://img.alicdn.com/imgextra/i4/847005054/TB21KIHbVXXXXaoXXXXXXXXXXXX_!!847005054.jpg</img>",
            "<img size=790x1673>https://img.alicdn.com/imgextra/i2/847005054/TB2e6gIbVXXXXXPXXXXXXXXXXXX_!!847005054.jpg</img>",
            "<img size=790x1600>https://img.alicdn.com/imgextra/i2/847005054/TB2mVAAbVXXXXaCXpXXXXXXXXXX_!!847005054.jpg</img>",
            "<img size=790x1688>https://img.alicdn.com/imgextra/i1/847005054/TB2FDIlcpXXXXX1XpXXXXXXXXXX_!!847005054.jpg</img>",
            "<img size=790x1686>https://img.alicdn.com/imgextra/i3/847005054/TB2v8oybVXXXXblXpXXXXXXXXXX_!!847005054.jpg</img>",
            "<img size=790x1660>https://img.alicdn.com/imgextra/i4/847005054/TB2CCEAbVXXXXarXpXXXXXXXXXX_!!847005054.jpg</img>",
            "<img size=790x1679>https://img.alicdn.com/imgextra/i4/847005054/TB2fTUIbVXXXXXHXXXXXXXXXXXX_!!847005054.jpg</img>",
            "<img size=790x1686>https://img.alicdn.com/imgextra/i4/847005054/TB2uqZGbVXXXXbAXXXXXXXXXXXX_!!847005054.jpg</img>",
            "<img size=790x1688>https://img.alicdn.com/imgextra/i4/847005054/TB2Uv7EbVXXXXb8XXXXXXXXXXXX_!!847005054.jpg</img>",
            "<img size=790x1660>https://img.alicdn.com/imgextra/i2/847005054/TB2ewozbVXXXXaWXpXXXXXXXXXX_!!847005054.jpg</img>",
            "<img size=790x1699>https://img.alicdn.com/imgextra/i1/847005054/TB2YWEpcpXXXXcxXXXXXXXXXXXX_!!847005054.jpg</img>",
            "<img size=790x1699>https://img.alicdn.com/imgextra/i3/847005054/TB2oxsDbVXXXXXiXpXXXXXXXXXX_!!847005054.jpg</img>",
            "<img size=790x1673>https://img.alicdn.com/imgextra/i2/847005054/TB2V5cncpXXXXXeXpXXXXXXXXXX_!!847005054.jpg</img>",
            "<img size=790x1699>https://img.alicdn.com/imgextra/i3/847005054/TB2idktcpXXXXXSXXXXXXXXXXXX_!!847005054.jpg</img>",
            "<img size=790x1699>https://img.alicdn.com/imgextra/i3/847005054/TB2JZN1XVXXXXb7XpXXXXXXXXXX_!!847005054.jpg</img>",
            "<img size=790x1688>https://img.alicdn.com/imgextra/i3/847005054/TB2bdQrcpXXXXaIXXXXXXXXXXXX_!!847005054.jpg</img>",
            "<img size=790x1688>https://img.alicdn.com/imgextra/i4/847005054/TB2BEcgcpXXXXcaXpXXXXXXXXXX_!!847005054.jpg</img>",
            "<img size=790x1688>https://img.alicdn.com/imgextra/i2/847005054/TB2uRQocpXXXXcnXXXXXXXXXXXX_!!847005054.jpg</img>",
            "<img size=790x1688>https://img.alicdn.com/imgextra/i2/847005054/TB2kmMicpXXXXcrXpXXXXXXXXXX_!!847005054.jpg</img>",
            "<img size=790x1699>https://img.alicdn.com/imgextra/i3/847005054/TB2xdorcpXXXXaWXXXXXXXXXXXX_!!847005054.jpg</img>",
            "<img size=790x1688>https://img.alicdn.com/imgextra/i4/847005054/TB2RykkcpXXXXbbXpXXXXXXXXXX_!!847005054.jpg</img>",
            "<img size=790x1688>https://img.alicdn.com/imgextra/i3/847005054/TB2dKMscpXXXXakXXXXXXXXXXXX_!!847005054.jpg</img>",
            "<img size=790x1699>https://img.alicdn.com/imgextra/i4/847005054/TB2tXUncpXXXXXyXpXXXXXXXXXX_!!847005054.jpg</img>",
            "<img size=790x1688>https://img.alicdn.com/imgextra/i3/847005054/TB22U7mcpXXXXamXpXXXXXXXXXX_!!847005054.jpg</img>",
            "<img size=790x1688>https://img.alicdn.com/imgextra/i4/847005054/TB2o17lcpXXXXaRXpXXXXXXXXXX_!!847005054.jpg</img>",
            "<img size=790x1699>https://img.alicdn.com/imgextra/i1/847005054/TB2h_IkcpXXXXa_XpXXXXXXXXXX_!!847005054.jpg</img>"
        ]
    }
}


function transformData(data,canvasWidth){
    var imgData = data.wdescContent.pages;
    var ret = [];
    var h = 0;
    var tmp = imgData.map(function(v, i) {
        var ret = {};
        var c = v.match(/size=(\d*)+x+(\d*).*?(https:+.*?)</);
        ret.title = i+"";
        ret.width = c[1];
        ret.height = c[2];
        ret.src = c[3];
        ret.id = i;
        ret.height = ret.width > canvasWidth ? utils.parseInt((canvasWidth/ret.width)*ret.height) : ret.height;
        ret.width = ret.width > canvasWidth ? canvasWidth:ret.width;
        return ret;
    })
    
    tmp.forEach(function(v, i) {
        v.translateY = h;
        h += (v.height - 0)
        ret.push(v)
    })
    return ret;
}
