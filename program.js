var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
var mafiaLevel = 0;
var currentMoney = 0;
var currentDollar = 0;
var swaglevel = "Crook"
var swaglist = ["Hitman","Boss","Mafia Leader","Godfather","Demigod","SANS"]
var moneySpawnRate = 1000

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
};



['', '-ms-', '-webkit-', '-o-', '-moz-'].map(function(prefix) { document.body.style[prefix + 'transform'] = 'rotate(' + 0 + 'deg)'; });

function show100dollar(leftLocation,topLocation) {
    var img = document.createElement("img");
    img.src = "100dollar.png";
    img.id = "dollar" + currentDollar
    img.width = 50;
    img.height = 50;
    document.body.appendChild(img);
    img.style.position = "absolute";
    img.style.top = topLocation + 40;
    img.style.left = leftLocation + 45;
    currentDollar++
    setTimeout(function(){
        $("#" + img.id).fadeOut("slow")
    },500)
}

function createMoney(leftPos,topPos) {
    var img = document.createElement("img");
    img.src = "money.png";
    img.id = "money" + currentMoney;
    img.width = 150;
    img.height = 150;
    document.body.appendChild(img);
    img.style.position = "absolute";
    img.style.top = topPos;
    img.style.left = leftPos;
    currentMoney++
    document.getElementById(img.id).onclick = function() {
        document.getElementById(img.id).remove()
        mafiaLevel++;
        show100dollar(leftPos,topPos)
        if(mafiaLevel >= 1000) {
            swaglevel = swaglist[5];
        }
        else if(mafiaLevel >= 500) {
            swaglevel = swaglist[4];
        }
        else if(mafiaLevel >= 250) {
            swaglevel = swaglist[3];
        }
        else if(mafiaLevel >= 150) {
            swaglevel = swaglist[2];
        }
        else if(mafiaLevel >= 100) {
            swaglevel = swaglist[1];
        }
        else if(mafiaLevel >= 25) {
            swaglevel = swaglist[0];
        }
        document.getElementById("level").innerText = "Mafia Level: LV." + mafiaLevel + " - " + swaglevel
        var audio = new Audio('moneysound.wav');
        
    audio.play();
    };
};




var shake = setTimeout(function(){
    var velocityWings = 0;
    var j = Math.floor((Math.random() * 360) + 1);;
                setInterval(function(){ 
                    ['', '-ms-', '-webkit-', '-o-', '-moz-'].map(function(prefix) 
                    { document.getElementById("title").style[prefix + 'transform'] = 'rotate(' + j + 'deg)'; });
                    if (j <= 360) {
                        j = Math.floor((Math.random() * velocityWings) + 0); 
                        velocityWings+=0.1;
                    }
                }, 1);
},1000)
setTimeout(function(){
    $("#title").fadeOut('slow');
    $('#maintitle').fadeIn("slow");
    $("#info").fadeIn("slow");
    $("#level").fadeIn("slow");
    document.getElementById("level").style.display = "inline-block"
    document.getElementById("maintitle").style.display = "inline-block";
    document.getElementById("info").style.display = "inline-block";
    clearInterval("shake");
},4000);

setTimeout(function(){
    setInterval(function(){
        var randomLeftPos = Math.floor(Math.random() * width)
        var randomTopPos = Math.floor(Math.random() * height)
        createMoney(randomLeftPos,randomTopPos)
        
    },moneySpawnRate)
},6000)


