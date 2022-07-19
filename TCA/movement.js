/* Stores information about all necessary html elements in index.html*/
var scene = document.querySelector("a-scene"); /* Scene */
/* Bars */
var redBar = scene.querySelector("#redBar");
var greenBar = scene.querySelector("#greenBar");
var blueBar = scene.querySelector("#blueBar");
var redBar2 = scene.querySelector("#redBar2");
var greenBar2 = scene.querySelector("#greenBar2");
var blueBar2 = scene.querySelector("#blueBar2");
/* Input Information */

/* Height and width inputs */
var heightSlider = document.getElementById("heightRange");
var heightText = document.getElementById("height");
var widthText = document.getElementById("width");
var widthSlider = document.getElementById("widthRange");
var offsetText = document.getElementById("offset");
var offsetSlider = document.getElementById("offsetRange");

const xRed1 = document.getElementById("xRed1");
const xGreen1 = document.getElementById("xGreen1");
const xBlue1 = document.getElementById("xBlue1");
const xRed2 = document.getElementById("xRed2");
const xGreen2 = document.getElementById("xGreen2");
const xBlue2 = document.getElementById("xBlue2");

/* Handles height/width inputs */
var width = widthSlider.value;
var height = heightSlider.value;
var offset = 20;

offsetSlider.oninput = function() {
    /* Update value in textbox */
    offsetText.value = this.value;
    /* Set height to be new height */
    offset = this.value;
    /* Redraw bars */
    drawBars(width,height);
}

$("#offset").change(function() {
    /* Change height slider to correct height, this will call the slider change function */
    offset = offsetText.value;
    offsetSlider.value = offset;
    drawBars(width,height);
  });

/* If the height slider is changed */
heightSlider.oninput = function() {
    /* Update value in textbox */
    heightText.value = this.value;
    /* Set height to be new height */
    height = this.value;
    /* Redraw bars */
    drawBars(width,height);
}

/* If the width slider is change */
widthSlider.oninput = function() {
    /* Update value in textbox */
    widthText.value = this.value;
    /* Set width to be new width */
    width = this.value;
    /* Redraw bars */
    drawBars(width,height);
}

/* If the textbox for height is changed */
$("#height").change(function() {
    /* Change height slider to correct height, this will call the slider change function */
    height = heightText.value;
    heightSlider.value = height;
    drawBars(width,height);
  });

$("#width").change(function() {
    /* Change width slider to correct height, this will call the slider change function */
    width = widthText.value;
    widthSlider.value = width;
    drawBars(width,height);
  });

/* Creates array of all bars, used in determining which bar to move on key press */
var currbar = new Array();
currbar.push(redBar);
currbar.push(greenBar);
currbar.push(blueBar);

var currbar2 = new Array();
currbar2.push(redBar2);
currbar2.push(greenBar2);
currbar2.push(blueBar2);

var text = new Array();
text.push(xRed1);
text.push(xGreen1);
text.push(xBlue1);

var text2 = new Array();
text2.push(xRed2);
text2.push(xGreen2);
text2.push(xBlue2);
/* Establishes current bar as redbar */
var currbarNum = 0;
var currbarNum2 = 0;
/* Variable that will store step */
var step = 0.1;

/* Positions the bars in desired location and sets them to desired size */

redBar.setAttribute("geometry",{primitive: "box", depth: 0, height: .05, width: .005});
redBar.setAttribute("position", {x: 0 * Math.cos((20*Math.PI)/180) - -1 * Math.sin((20*Math.PI)/180), y: .05, z: -1 * Math.cos((20*Math.PI)/180) + 0 * Math.sin((20*Math.PI)/180)});
greenBar.setAttribute("geometry",{primitive: "box", depth: 0, height: .05, width: .005});
greenBar.setAttribute("position", {x: 0 * Math.cos((20*Math.PI)/180) - -1 * Math.sin((20*Math.PI)/180), y: 0, z: -1 * Math.cos((20*Math.PI)/180) + 0 * Math.sin((20*Math.PI)/180)});
blueBar.setAttribute("geometry",{primitive: "box", depth: 0, height: .05, width: .005});
blueBar.setAttribute("position", {x: 0 * Math.cos((20*Math.PI)/180) - -1 * Math.sin((20*Math.PI)/180), y: -.05, z: -1 * Math.cos((20*Math.PI)/180) + 0 * Math.sin((20*Math.PI)/180)});

redBar2.setAttribute("geometry",{primitive: "box", depth: 0, height: .05, width: .005});
redBar2.setAttribute("position", {x: 0 * Math.cos((-20*Math.PI)/180) - -1 * Math.sin((-20*Math.PI)/180), y: .05, z: -1 * Math.cos((-20*Math.PI)/180) + 0 * Math.sin((-20*Math.PI)/180)});
greenBar2.setAttribute("geometry",{primitive: "box", depth: 0, height: .05, width: .005});
greenBar2.setAttribute("position", {x: 0 * Math.cos((-20*Math.PI)/180) - -1 * Math.sin((-20*Math.PI)/180), y: 0, z: -1 * Math.cos((-20*Math.PI)/180) + 0 * Math.sin((-20*Math.PI)/180)});
blueBar2.setAttribute("geometry",{primitive: "box", depth: 0, height: .05, width: .005});
blueBar2.setAttribute("position", {x: 0 * Math.cos((-20*Math.PI)/180) - -1 * Math.sin((-20*Math.PI)/180), y: -.05, z: -1 * Math.cos((-20*Math.PI)/180) + 0 * Math.sin((-20*Math.PI)/180)});

/* Draws bars with given width, height at default position */
function drawBars(widthIn,heightIn){

    redBar.setAttribute("geometry",{primitive: "box", depth: 0, height: heightIn, width: widthIn});
    redBar.setAttribute("position", {x: 0 * Math.cos((offset*Math.PI)/180) - -1 * Math.sin((offset*Math.PI)/180), y: heightIn, z: -1 * Math.cos((offset*Math.PI)/180) + 0 * Math.sin((offset*Math.PI)/180)});
    greenBar.setAttribute("geometry",{primitive: "box", depth: 0, height: heightIn, width: widthIn});
    greenBar.setAttribute("position", {x: 0 * Math.cos((offset*Math.PI)/180) - -1 * Math.sin((offset*Math.PI)/180), y: 0, z: -1 * Math.cos((offset*Math.PI)/180) + 0 * Math.sin((offset*Math.PI)/180)});
    blueBar.setAttribute("geometry",{primitive: "box", depth: 0, height: heightIn, width: widthIn});
    blueBar.setAttribute("position", {x: 0 * Math.cos((offset*Math.PI)/180) - -1 * Math.sin((offset*Math.PI)/180), y: -heightIn, z: -1 * Math.cos((offset*Math.PI)/180) + 0 * Math.sin((offset*Math.PI)/180)});
    
    redBar2.setAttribute("geometry",{primitive: "box", depth: 0, height: heightIn, width: widthIn});
    redBar2.setAttribute("position", {x: 0 * Math.cos((-offset*Math.PI)/180) - -1 * Math.sin((-offset*Math.PI)/180), y: heightIn, z: -1 * Math.cos((-offset*Math.PI)/180) + 0 * Math.sin((-offset*Math.PI)/180)});
    greenBar2.setAttribute("geometry",{primitive: "box", depth: 0, height: heightIn, width: widthIn});
    greenBar2.setAttribute("position", {x: 0 * Math.cos((-offset*Math.PI)/180) - -1 * Math.sin((-offset*Math.PI)/180), y: 0, z: -1 * Math.cos((-offset*Math.PI)/180) + 0 * Math.sin((-offset*Math.PI)/180)});
    blueBar2.setAttribute("geometry",{primitive: "box", depth: 0, height: heightIn, width: widthIn});
    blueBar2.setAttribute("position", {x: 0 * Math.cos((-offset*Math.PI)/180) - -1 * Math.sin((-offset*Math.PI)/180), y: -heightIn, z: -1 * Math.cos((-offset*Math.PI)/180) + 0 * Math.sin((-offset*Math.PI)/180)});
    

}

/* Handles horizontal translation */
function updateCoordsHorizontal(angle, bar, isLeft){
    /* Finds new x coordinates */
    newX = bar.getAttribute("position").x * Math.cos((angle*Math.PI)/180) - bar.getAttribute("position").z * Math.sin((angle*Math.PI)/180);
    /* Finds new z coordinates */
    newZ = bar.getAttribute("position").z * Math.cos((angle*Math.PI)/180) + bar.getAttribute("position").x * Math.sin((angle*Math.PI)/180);
    /* Updates position to new coordinates */
    bar.setAttribute("position",{x: newX.toPrecision(5), y: bar.getAttribute("position").y , z: newZ.toPrecision(5)});
    if (isLeft){
        text[currbarNum2].value = (parseFloat(text[currbarNum2].value) + angle).toPrecision(3);
    } else {
        text2[currbarNum].value = (parseFloat(text2[currbarNum].value) + angle).toPrecision(3);
    }
    /* Rotates the bar to keep it facing the camera (negated in orthographic mode)*/
    /*bar.setAttribute("rotation",{x: bar.getAttribute("rotation").x, y: bar.getAttribute("rotation").y - angle, z: bar.getAttribute("rotation").z});*/
}

/* Handles vertical translation */
function updateCoordsVertical(angle, bar){
    /* Finds new y coordinates */
    newY = bar.getAttribute("position").y * Math.cos((angle*Math.PI)/180) - bar.getAttribute("position").z * Math.sin((angle*Math.PI)/180);
    /* Finds new z coordinates */
    newZ = bar.getAttribute("position").z * Math.cos((angle*Math.PI)/180) + bar.getAttribute("position").y * Math.sin((angle*Math.PI)/180);
    /* Updates position to new coordinates */
    bar.setAttribute("position",{x: bar.getAttribute("position").x, y: newY.toPrecision(5), z: newZ.toPrecision(5)});
    /* Rotates the bar to keep it facing the camera (negated in orthographic mode) */
    /*bar.setAttribute("rotation",{x: bar.getAttribute("rotation").x + angle, y: bar.getAttribute("rotation").y, z: bar.getAttribute("rotation").z});*/

}

/* Input listener to determine if movement or bar switch is desired */
document.addEventListener("keydown", movement);
function movement(event) {
    /* Checks what key was pressed */
    var key = event.key;
    switch(key){
        case "ArrowUp":
            /* Changes selected bar to bar above current one, doesn't change for red bar */
            if (currbarNum > 0){
                currbarNum -= 1;
            }
            break;
        case "ArrowDown":
            /* Changes selected bar to bar below current one, doesn't change for blue bar */
            if (currbarNum < 2){
                currbarNum += 1;
            }
            break;
        case "w":
            /* Calls vertical translation */
            updateCoordsVertical((parseFloat($("#step-size").val())), currbar[currbarNum], false);
            break;
        case "s":
            /* Calls vertical translation */
            updateCoordsVertical((-parseFloat($("#step-size").val())), currbar[currbarNum], false);
            break;
        case "a":
            /* Calls horizontal translation */
            updateCoordsHorizontal((-parseFloat($("#step-size").val())), currbar[currbarNum], false);
            break;
        case "d":
            /* Calls horizontal translation */
            updateCoordsHorizontal((parseFloat($("#step-size").val())), currbar[currbarNum], false);
            break;

        case "ArrowLeft":
            /* Changes selected bar to bar above current one, doesn't change for red bar */
            if (currbarNum2 > 0){
                currbarNum2 -= 1;
            }
            break;
        case "ArrowRight":
            /* Changes selected bar to bar below current one, doesn't change for blue bar */
            if (currbarNum2 < 2){
                currbarNum2 += 1;
            }
            break;
        case "i":
            /* Calls vertical translation */
            updateCoordsVertical((parseFloat($("#step-size").val())), currbar2[currbarNum2], true);
            break;
        case "k":
            /* Calls vertical translation */
            updateCoordsVertical((-parseFloat($("#step-size").val())), currbar2[currbarNum2], true);
            break;
        case "j":
            /* Calls horizontal translation */
            updateCoordsHorizontal((-parseFloat($("#step-size").val())), currbar2[currbarNum2], true);
            break;
        case "l":
            /* Calls horizontal translation */
            updateCoordsHorizontal((parseFloat($("#step-size").val())), currbar2[currbarNum2], true);
            break;
    }
}