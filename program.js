// Defines all the necessary variables to run the game.
var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
var mafiaLevel = 0;
var currentMoney = 0;
var currentDollar = 0;
var swaglevel = "Crook"
var swaglist = ["Hitman", "Boss", "Mafia Leader", "Godfather", "Demigod", "SANS", "Overlord", "Owner Of The Universe", "Shaggy"]
var moneySpawnRate = 500
var comboLevel = 0;
var comboActive = false;
var comboImage = document.getElementById("combo")

// Function for removing money after it has been clicked on.
Element.prototype.remove = function () {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
    for (var i = this.length - 1; i >= 0; i--) {
        if (this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
};


// Makes sure the shake effect works.
['', '-ms-', '-webkit-', '-o-', '-moz-'].map(function (prefix) {
    document.body.style[prefix + 'transform'] = 'rotate(' + 0 + 'deg)';
});

// When you click on a money, it creates a $100 image that dissapears after a second.
function show100dollar(leftLocation, topLocation) {
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
    setTimeout(function () {
        $("#" + img.id).fadeOut("slow");
    }, 500)
}


// Creates the function which handles spawning money on screen.
function createMoney(leftPos, topPos) {
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
    document.getElementById(img.id).onclick = function () {
        document.getElementById(img.id).remove()
        mafiaLevel += Math.floor(comboLevel * 0.75) + 1;
        comboLevel++;
        timeout = 0;
        comboActive = true;
        show100dollar(leftPos, topPos)
        // Checks what level you are and if you meet the requirements, sets you to a certain name.
        if (mafiaLevel >= 25000) {
            swaglevel = swaglist[8];
        } else if (mafiaLevel >= 15000) {
            swaglevel = swaglist[7];
        } else if (mafiaLevel >= 9000) {
            swaglevel = swaglist[6];
        } else if (mafiaLevel >= 3000) {
            swaglevel = swaglist[5];
        } else if (mafiaLevel >= 1500) {
            swaglevel = swaglist[4];
        } else if (mafiaLevel >= 750) {
            swaglevel = swaglist[3];
        } else if (mafiaLevel >= 450) {
            swaglevel = swaglist[2];
        } else if (mafiaLevel >= 300) {
            swaglevel = swaglist[1];
        } else if (mafiaLevel >= 75) {
            swaglevel = swaglist[0];
        }
        document.getElementById("level").innerText = "Mafia Level: LV." + mafiaLevel + " - " + swaglevel
        var audio = new Audio('moneysound.wav');

        audio.play();
    };
};



// The shake effect when starting the game.
var shake = setTimeout(function () {
    var velocityWings = 0;
    var j = Math.floor((Math.random() * 360) + 1);;
    setInterval(function () {
        ['', '-ms-', '-webkit-', '-o-', '-moz-'].map(function (prefix) {
            document.getElementById("title").style[prefix + 'transform'] = 'rotate(' + j + 'deg)';
        });
        if (j <= 360) {
            j = Math.floor((Math.random() * velocityWings) + 0);
            velocityWings += 0.1;
        }
    }, 1);
}, 1000)

// Makes the combo multiplier shake more and more the higher combo you are. 
var comboshake = setTimeout(function () {
    var j = Math.floor((Math.random() * comboLevel));;
    setInterval(function () {
        ['', '-ms-', '-webkit-', '-o-', '-moz-'].map(function (prefix) {
            document.getElementById("combo").style[prefix + 'transform'] = 'rotate(' + j + 'deg)';
        });
        if (j <= 360) {
            j = Math.floor((Math.random() * comboLevel) + 0);
        }
    }, 1);
}, 1000)

// The fadeout effect and fadein effects when you first start the game.
setTimeout(function () {
    $("#title").fadeOut('slow');
    $('#maintitle').fadeIn("slow");
    $("#info").fadeIn("slow");
    $("#level").fadeIn("slow");
    $("#combo").fadeIn("slow");
    document.getElementById("level").style.display = "inline-block"
    document.getElementById("maintitle").style.display = "inline-block";
    document.getElementById("info").style.display = "inline-block";
    document.getElementById("combo").style.display = "inline-block";
    clearInterval("shake");
}, 4000);

// Spawns the money every second.
setTimeout(function () {
    setInterval(function () {
        width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        var randomLeftPos = Math.floor(Math.random() * width)
        var randomTopPos = Math.floor(Math.random() * height)
        createMoney(randomLeftPos, randomTopPos)

    }, moneySpawnRate)
}, 6000)

// Combo Meter Code
var timeout = 0;
setInterval(function () {
    if (comboActive == true) {
        timeout++;
        if (comboLevel >= 20) {
            comboImage.classList.add("rainbow");
        }
        if (timeout == 14) {
            console.log("combo over");
            if (comboImage.classList.contains("rainbow")) {
                comboImage.classList.remove("rainbow");
            };
            comboActive = false;
            comboLevel = 0;
            timeout = 0;
        }                                                                                       
    }
    document.getElementById("combo").innerText = comboLevel + "x";
}, 100);