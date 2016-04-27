// 打开 loading
(function(){
  var spinner = document.createElement('div')
  spinner.className = "spinner"

  var loadingTitle = document.createElement('div')
  loadingTitle.className = "loading-title"
  loadingTitle.innerHTML = "扇贝助手加载中..."

  var loading = document.createElement('div')
  loading.className = "loading-cover"

  loading.appendChild(spinner)
  loading.appendChild(loadingTitle)
  loading = document.body.appendChild(loading)

  window.addEventListener('load', function(){
    loading.style.display = 'none'
  })
})()
