// 询价方法，接受价格标签和原价为入参
function askPrice(tag, originPrice) {
    // 处理预热价
    if (tag === 'pre') {
        if (originPrice >= 100) {
            return originPrice - 20;
        }
        return originPrice * 0.9;
    }

    // 处理大促价
    if (tag === 'onSale') {
        if (originPrice >= 100) {
            return originPrice - 30;
        }
        return originPrice * 0.8;
    }

    // 处理返场价
    if (tag === 'back') {
        if (originPrice >= 200) {
            return originPrice - 50;
        }
        return originPrice;
    }

    // 处理尝鲜价
    if (tag === 'fresh') {
        return originPrice * 0.5;
    }
}

// ==================================================    增加一个其他价格     ==================================================

function askPrice(tag, originPrice) {
    // 处理预热价
    if (tag === 'pre') {
        if (originPrice >= 100) {
            return originPrice - 20;
        }
        return originPrice * 0.9;
    }
    // 处理大促价
    if (tag === 'onSale') {
        if (originPrice >= 100) {
            return originPrice - 30;
        }
        return originPrice * 0.8;
    }

    // 处理返场价
    if (tag === 'back') {
        if (originPrice >= 200) {
            return originPrice - 50;
        }
        return originPrice;
    }

    // 处理尝鲜价
    if (tag === 'fresh') {
        return originPrice * 0.5;
    }

    // 处理新人价
    if (tag === 'newUser') {
        if (originPrice >= 100) {
            return originPrice - 50;
        }
        return originPrice;
    }
}

// ==================================================    单一功能改造     ==================================================
// 处理预热价
function prePrice(originPrice) {
    if (originPrice >= 100) {
        return originPrice - 20;
    }
    return originPrice * 0.9;
}

// 处理大促价
function onSalePrice(originPrice) {
    if (originPrice >= 100) {
        return originPrice - 30;
    }
    return originPrice * 0.8;
}

// 处理返场价
function backPrice(originPrice) {
    if (originPrice >= 200) {
        return originPrice - 50;
    }
    return originPrice;
}

// 处理尝鲜价
function freshPrice(originPrice) {
    return originPrice * 0.5;
}

function askPrice(tag, originPrice) {
    // 处理预热价
    if (tag === 'pre') {
        return prePrice(originPrice);
    }
    // 处理大促价
    if (tag === 'onSale') {
        return onSalePrice(originPrice);
    }

    // 处理返场价
    if (tag === 'back') {
        return backPrice(originPrice);
    }

    // 处理尝鲜价
    if (tag === 'fresh') {
        return freshPrice(originPrice);
    }
}

// ==================================================    增加一个其他价格，但没有遵循开放闭合原则    ==================================================
// 处理预热价
function prePrice(originPrice) {
    if (originPrice >= 100) {
        return originPrice - 20;
    }
    return originPrice * 0.9;
}

// 处理大促价
function onSalePrice(originPrice) {
    if (originPrice >= 100) {
        return originPrice - 30;
    }
    return originPrice * 0.8;
}

// 处理返场价
function backPrice(originPrice) {
    if (originPrice >= 200) {
        return originPrice - 50;
    }
    return originPrice;
}

// 处理尝鲜价
function freshPrice(originPrice) {
    return originPrice * 0.5;
}

// 处理新人价
function newUserPrice(originPrice) {
    if (originPrice >= 100) {
        return originPrice - 50;
    }
    return originPrice;
}

function askPrice(tag, originPrice) {
    // 处理预热价
    if (tag === 'pre') {
        return prePrice(originPrice);
    }
    // 处理大促价
    if (tag === 'onSale') {
        return onSalePrice(originPrice);
    }

    // 处理返场价
    if (tag === 'back') {
        return backPrice(originPrice);
    }

    // 处理尝鲜价
    if (tag === 'fresh') {
        return freshPrice(originPrice);
    }

    // 处理新人价
    if (tag === 'newUser') {
        return newUserPrice(originPrice);
    }
}

// ==================================================    遵循开放闭合原则    ==================================================

// 定义一个询价处理器对象
const priceProcessor = {
    pre(originPrice) {
        if (originPrice >= 100) {
            return originPrice - 20;
        }
        return originPrice * 0.9;
    },
    onSale(originPrice) {
        if (originPrice >= 100) {
            return originPrice - 30;
        }
        return originPrice * 0.8;
    },
    back(originPrice) {
        if (originPrice >= 200) {
            return originPrice - 50;
        }
        return originPrice;
    },
    fresh(originPrice) {
        return originPrice * 0.5;
    },
};
// 询价函数
function askPrice(tag, originPrice) {
    return priceProcessor[tag](originPrice);
}
