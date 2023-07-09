// ========================= 重构前 =========================
var getUploadObj = function () {
    try {
        return new ActiveXObject("TXFTNActiveX.FTNUpload"); // IE上传控件
    } catch (e) {
        if (supportFlash()) {
            var str = '<object type="application/x-shockwave-flash"></object>';
            return $(str).appendTo($('body'));
        } else {
            var str = '<input name="file" type="file"/>'; // 表单上传
            return $(str).appendTo($('body'));
        }
    }
};


// 重构后


var getActiveUploadObj = function () {
    try {
        return new ActiveXObject("TXFTNActiveX.FTNUpload"); // IE上传控件
    } catch (e) {
        return false;
    }
}

var getFlashUploadObj = function () {
    if (supportFlash()) {
        var str = '<object type="application/x-shockwave-flash"></object>';
        return $(str).appendTo($('body'));
    }
    return false;
}

var getFormUploadObj = function () {
    var str = '<input name="file" type="file"/>'; // 表单上传
    return $(str).appendTo($('body'));
}


var iteratorUploadObj = function () {
    for (var i = 0, fn; fn = arguments[i++];) {
        var uploadObj = fn();
        if (uploadObj !== false) {
            return uploadObj;
        }
    }
}

var uploadObj = iteratorUploadObj(getActiveUploadObj, getFlashUploadObj, getFormUploadObj);