(function() {
  // 绑定点击事件
  var shanbayBoxWord = ''
  
  var shanbayBox = document.createElement('div')
  var boxTitle = document.createElement('div')
  var boxDefinition = document.createElement('div')
  
  shanbayBox.className = "shanbay-box"
  boxTitle.className = "box-title"
  boxDefinition.className = "box-definition"
  
  boxTitle = shanbayBox.appendChild(boxTitle)
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
                      var audio = new Audio(data.audio)
                      play.onmouseover = function() {
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

  document.onmouseup = mouseHandle
  
  function getSelectedText() {
    var text = ""
    if(document.selection) {
      txt = document.selection.createRange().text
    } else {
      txt = document.getSelection()
    }
    return txt.toString()
  }

  function calcBoxPos(e) {
      var x = document.body.scrollLeft + e.clientX
      var y = document.body.scrollTop + e.clientY + 20
      
      if(e.clientY > innerHeight - 150) {
          y -= 150
      }
      
      if(e.clientX > innerWidth - 200) {
          x -= (e.clientX - innerWidth + 250)
      }
      
      return {x: x,y: y}
  }

})()

