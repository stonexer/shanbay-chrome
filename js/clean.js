(function () {
    var cleanList = {
        className: ['top-banner-ad-container', 'js-adblock-sticky', 'content__labels', 'js-content-meta', 'content-footer', 'l-footer', 'submeta', 'after-article', 'content__secondary-column', "selection-sharing"],
        id: ['header','dfp-ad--inline1','dfp-ad--inline2','dfp-ad--inline3'], // 也许是该用正则了，暂时没看到超过三个广告的，不过一般人都用adblock吧
        tagName: ['aside']
    }
    
    try {
        clean(cleanList)
        getstyle(".content__main-column").setProperty('margin', 'auto', 'important')
    } catch(err) {}

    window.onload = function () {
        window.guardian = {}
        clean(cleanList)
        getstyle(".content__main-column").setProperty('margin', 'auto', 'important')
    }
    
    function getstyle(sname) {
        for (var i = 0; i < document.styleSheets.length; i++) {
            var rules;
            if (document.styleSheets[i].cssRules) {
                rules = document.styleSheets[i].cssRules;
            } else {
                rules = document.styleSheets[i].rules;
            }
            for (var j = 0; j < rules.length; j++) {
                if (rules[j].selectorText == sname) { 
                    return rules[j].style;
                }
            }
        }
    }

    function removeElement (_element){
        var _parentElement = _element.parentNode
        if(_parentElement){
            _parentElement.removeChild(_element)
        }
    }

    function cleanByClassName (name) {
        try {
            var els = document.getElementsByClassName(name)
            Array.prototype.forEach.call(els, function(el) {
                removeElement(el)
            })
        } catch(err) {}
    }

    function cleanById (id) {
        try {
            removeElement(document.getElementById(id))
        } catch(err) {}
    }

    function cleanByTagName (tag) {
        try {
            var els = document.getElementsByTagName(tag)
            Array.prototype.forEach.call(els, function(el) {
                removeElement(el)
            })
        } catch(err) {}
    }

    function clean (list) {
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

})()
