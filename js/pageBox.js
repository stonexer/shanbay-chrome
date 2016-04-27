(function() {
    calcPageBox()
    window.onresize = calcPageBox
    
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

})()
