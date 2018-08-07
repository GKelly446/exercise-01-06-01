/*

Grace Kelly
8.6.18
form validation code for snoot.html
snoot.js

*/

"use strict";

// function to remove select list defaults
function removeSelectDefaults() {
    var emptyBoxes  = document.getElementsByTagName("select");
    alert("select lists: " + emptyBoxes.length);
}

//page load event handlers
if (window.addEventListener) {
    window.addEventListener("load", removeSelectDefaults, false);
} else if (window.attatchEvent) {
    window.attatchEvent("onload", removeSelectDefaults);
    
}