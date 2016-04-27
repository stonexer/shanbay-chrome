// 打开 loading
var spinner = document.createElement('div')
spinner.className = "spinner"

var loading = document.createElement('div')
loading.className = "loading-cover"

loading.appendChild(spinner)
loading = document.body.appendChild(loading)

// 绑定点击事件
var shanbayBoxWord = ''
var shanbayBox = document.createElement('div')
shanbayBox.className = "shanbay-box"

var boxTitle = document.createElement('div')
boxTitle.className = "box-title"
boxTitle = shanbayBox.appendChild(boxTitle)

var boxDefinition = document.createElement('div')
boxDefinition.className = "box-definition"
boxDefinition = shanbayBox.appendChild(boxDefinition)

shanbayBox = document.body.appendChild(shanbayBox)

var mouseHandle = function(e) {
    var text = getSelectedText()
    
    if(text.replace(/(^\s*)|(\s*$)/g, "").length != 0) {
        if(text.length > 20 && text.indexOf(' ') > -1) {
            return boxTitle.innerHTML = '目前只能测量单词哦'
        }
        boxTitle.innerHTML = shanbayBoxWord = text
        boxDefinition.innerHTML = "正在搜索中..."
        var pos = calcBoxPos(e)
        shanbayBox.style.top = pos.y + "px"
        shanbayBox.style.left = pos.x + "px"
        shanbayBox.style.display = 'block'
        
        fetch('https://api.shanbay.com/bdc/search/?word=' + text)
        .then(function(response){
            return response.json()
        })
        .then(function(json) {
            var data = json.data
            if(text == shanbayBoxWord) {
                boxDefinition.innerHTML = data.definition || '未找到定义'
                
                if(data.audio) {
                    var play = document.createElement('div')
                    play.className = "play"
                    play.onmouseover = function() {
                        var audio = new Audio(data.audio)
                        audio.play()
                    }
                    play = boxTitle.appendChild(play)
                }
            }
        })
    } else {
        shanbayBox.style.display = 'none'
        boxDefinition.innerHTML = ''
        boxTitle.innerHTML = ''
    }
}

// document.ondblclick = mouseHandle
document.onmouseup = mouseHandle

// 干掉页面守卫
var cleanList = {
    className: ['top-banner-ad-container', 'js-adblock-sticky', 'content__labels', 'js-content-meta', 'content-footer', 'l-footer', 'submeta', 'after-article', 'content__secondary-column', "selection-sharing"],
    id: ['header','dfp-ad--inline1','dfp-ad--inline2','dfp-ad--inline3'], // 也许是该用正则了，暂时没看到超过三个广告的，不过一般人都用adblock吧
    tagName: ['aside']
}
try {
    window.guardian = {}
    clean(cleanList)
    getstyle(".content__main-column").setProperty('margin', 'auto', 'important')
} catch(err) {}

// 翻页按钮
calcPageBox()

window.onload = function () {
    window.guardian = {}
    window.onresize = calcPageBox
    
    // 清除页面垃圾信息
    clean(cleanList)
    
    // 关闭loading
    loading.style.display = 'none'

    // 居中正文
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

function calcBoxPos(e) {
    var x = document.body.scrollLeft + e.clientX
    var y = document.body.scrollTop + e.clientY
    
    y += 20
    
    if(e.clientY > innerHeight - 150) {
        y -= 150
    }
    
    if(e.clientX > innerWidth - 200) {
        x -= (e.clientX - innerWidth + 250)
    }
    
    return {
        x: x,
        y: y
    }
}

function calcPageBox() {
    var lastPageBox = document.getElementsByClassName('page-box')[0]
    if(lastPageBox) document.body.removeChild(lastPageBox)
    
    var page = ~~(document.body.scrollHeight / innerHeight)

    var pageBox = document.createElement('div')
    pageBox.className = "page-box"

    var downButton = document.createElement('div')
    downButton.className = "down-button"
    downButton.onclick = function(ev) {
        animatedScrollTo(document.body, scrollY - innerHeight, 1000)
    }
    downButton = pageBox.appendChild(downButton)

    for(var i = 0; i < page + 1; i++) {
        var pageButton = document.createElement('div')
        pageButton.className = "page-button"
        pageButton.innerHTML = i+1
        
        pageButton.onclick = function(ev) {
            animatedScrollTo(document.body, innerHeight * (this.innerHTML - 1), 1000)
        }
        
        pageButton = pageBox.appendChild(pageButton)
    }

    var upButton = document.createElement('div')
    upButton.className = "up-button"
    upButton.onclick = function(ev) {
        animatedScrollTo(document.body, scrollY + innerHeight, 1000)
    }
    upButton = pageBox.appendChild(upButton)

    pageBox = document.body.appendChild(pageBox)
}
