function drag() {
    var successBox = document.getElementById('success');
    var srcModule = [];
    for (var i = 0; i < 3; i++) {
        var srcBox = document.getElementById('src-' + (i + 1));
        srcModule.push(srcBox);
        srcModule[i].isRight = false;
    }
    console.log(srcModule);
    // 模块的宽高
    var moduleWidth = srcModule[0].clientWidth;
    var moduleHeight = srcModule[0].clientHeight;

    for (var j = 0; j < srcModule.length; j++) {
        srcModule[j].onmousedown = (function (j) {
            return function (event) {
                console.log(this);
                var destModule = document.getElementById('dest-' + (j + 1));
                // 右边目标模块的客户区位置
                var destX = destModule.offsetLeft;
                var destY = destModule.offsetTop;
                // 右边目标模块的中心位置
                var destCenterX = destX + moduleWidth / 2;
                var destCenterY = destY + moduleHeight / 2;
                var _that = this;
                // 原位置没移动的时候客户区的位置
                var originX = _that.offsetLeft;
                var originY = _that.offsetTop;
                // 在最开始没移动的时候，鼠标到盒子（当前点击模块）最左边的距离
                var noMoveX = event.clientX - _that.offsetLeft;
                var noMoveY = event.clientY - _that.offsetTop;
                // 鼠标点击后在页面移动
                document.onmousemove = function (event) {
                    var e = event || window.event;
                    // 使移动模块跟着鼠标
                    var movePositionX = e.clientX - noMoveX;
                    var movePositionY = e.clientY - noMoveY;
                    _that.style.left = movePositionX + 'px';
                    _that.style.top = movePositionY + 'px';
                };
                document.onmouseup = function (event) {
                    // 当鼠标提起的时候，move移动事件就必须被取消
                    document.onmousemove = null;
                    document.onmouseup = null;
                    // 获得当前鼠标点击移动的模块的中心点位置
                    var srcModuleCenterX = _that.offsetLeft + moduleWidth / 2;
                    var srcModuleCenterY = _that.offsetTop + moduleHeight / 2;
                    // 比较“当前移动模块”中心点的位置和目标中心点的位置的差的绝对值，
                    var distanceX = Math.abs(srcModuleCenterX - destCenterX);
                    var distanceY = Math.abs(srcModuleCenterY - destCenterY);
                    if (distanceX <= moduleWidth / 3 && distanceY <= moduleHeight / 3) {
                        _that.style.left = destX + 'px';
                        _that.style.top = destY + 'px';
                        _that.isRight = true;
                        _that.onmousedown = null;
                    }
                    if (_that.offsetLeft !== destX || _that.offsetTop !== destY) {
                        _that.style.left = originX + 'px';
                        _that.style.top = originY + 'px';
                    }
                    if (
                        srcModule[0].isRight === true &&
                        srcModule[1].isRight === true &&
                        srcModule[2].isRight === true
                    ) {
                        success.style.display = 'block';
                    }
                };
            };
        })(j);
    }
}
// 全局函数
drag();
