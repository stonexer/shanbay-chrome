function removeElement(_element){
    var _parentElement = _element.parentNode
    if(_parentElement){
        _parentElement.removeChild(_element)
    }
}

var cleanByClassName = function (name) {
    try {
        removeElement(document.getElementsByClassName(name)[0])
    } catch(err) {}
}

var cleanById = function (id) {
    removeElement(document.getElementById(id))
}

var cleanByTagName = function (tag) {
    removeElement(document.getElementsByTagName(tag))
}

var clean = function (list) {
    for (var item in list.className) {
        cleanByClassName(list.className[item])
    }

    for (var item in list.id) {
        cleanById(list.id[item])
    }

    for (var item in list.tagName) {
        cleanByTagName(list.tagName[item])
    }
}

;(function (window) {
    var requestAnimFrame = (function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(callback){window.setTimeout(callback,1000/60);};})();

    var easeInOutQuad = function (t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    };

    var animatedScrollTo = function (element, to, duration, callback) {
        var start = element.scrollTop,
        change = to - start,
        animationStart = +new Date();
        var animating = true;
        var lastpos = null;

        var animateScroll = function() {
            if (!animating) {
                return;
            }
            requestAnimFrame(animateScroll);
            var now = +new Date();
            var val = Math.floor(easeInOutQuad(now - animationStart, start, change, duration));
            if (lastpos) {
                if (lastpos === element.scrollTop) {
                    lastpos = val;
                    element.scrollTop = val;
                } else {
                    animating = false;
                }
            } else {
                lastpos = val;
                element.scrollTop = val;
            }
            if (now > animationStart + duration) {
                element.scrollTop = to;
                animating = false;
                if (callback) { callback(); }
            }
        };
        requestAnimFrame(animateScroll);
    };

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = animatedScrollTo;
    } else {
        window.animatedScrollTo = animatedScrollTo;
    }
})(window)
