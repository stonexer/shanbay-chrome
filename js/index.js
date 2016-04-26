// 打开 loading
var spinner = document.createElement('div')
spinner.className = "spinner"

var loading = document.createElement('div')
loading.className = "loading-cover"

loading.appendChild(spinner)
loading = document.body.appendChild(loading)

// 绑定点击事件
var shanbayBox = document.createElement('div')
shanbayBox.className = "shanbay-box"
shanbayBox = document.body.appendChild(shanbayBox)

document.ondblclick = function(e){
    var text = getSelectedText()
    shanbayBox.innerHTML = text
}

// 干掉页面守卫
window.guardian = {}
window.onload = function () {
    window.guardian = {}
    
    // 清除页面垃圾信息
    var cleanList = {
        className: ['js-adblock-sticky', 'content__labels', 'js-content-meta', 'content-footer', 'l-footer', 'submeta', 'after-article', 'content__secondary-column'],
        id: ['header'],
        tagName: ['aside']
    }
    clean(cleanList)
    
    // 关闭loading
    loading.style.display = 'none'
    
    getstyle(".content__main-column").setProperty('margin', 'auto', 'important')
    
    // 翻页按钮
    var upButton = document.createElement('div')
    upButton.className = "up-button"
    upButton.onclick = function(ev) {
        animatedScrollTo(document.body, scrollY + innerHeight, 1000)
    }
    upButton = document.body.appendChild(upButton)
    
    var downButton = document.createElement('div')
    downButton.className = "down-button"
    downButton.onclick = function(ev) {
        animatedScrollTo(document.body, scrollY - innerHeight, 1000)
    }
    downButton = document.body.appendChild(downButton)
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

function getSelectedText() {
	var text = ""
	if(document.selection) {
		txt = document.selection.createRange().text
	} else {
		txt = document.getSelection()
	}
	ICIBA_WORD = txt.toString()
	return txt.toString()
}

function getObjPos(obj) {
	var pos = {
        x: obj.offsetLeft,
        y: obj.offsetTop
    }

	var obj = obj.offsetParent

	while(obj) {
		pos.x += obj.offsetLeft
		pos.y += obj.offsetTop
		obj = obj.offsetParent
	}
	return pos
}
