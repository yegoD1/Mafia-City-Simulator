var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

setTimeout(function(){
    var j = Math.floor((Math.random() * 360) + 1);;
                setInterval(function(){ 
                    ['', '-ms-', '-webkit-', '-o-', '-moz-'].map(function(prefix) 
                    { document.body.style[prefix + 'transform'] = 'rotate(' + j + 'deg)'; });
                    if (j <= 360) {
                     j = Math.floor((Math.random() * 360) + 1);; 
                    }
                }, 1);
},1000)
setTimeout(function(){
    var element = document.getElementById("title")
element.classList.add("startfadeout");
},1000)