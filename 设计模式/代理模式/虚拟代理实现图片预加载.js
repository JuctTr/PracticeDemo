
var myImage = (function () {
    var imgNode = document.createElement('img');
    document.body.appendChild(imgNode);
    return {
        setSrc: function (src) {
            imgNode.src = src;
        }
    }
})();

var proxyImage = (function () {
    var img = new Image;
    img.onload = function () {
        myImage.setSrc(this.src);
    }
    return {
        setSrc: function (src) {
            myImage.setSrc('file:///C:/Users/svenzeng/Desktop/loading.gif');
            img.src = src;
        }
    }
})();
proxyImage.setSrc('http://imgcache.qq.com/music/photo/k/000GGDys0yA0Nk.jpg');