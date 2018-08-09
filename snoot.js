/*

Grace Kelly
8.6.18
form validation code for snoot.html
snoot.js

*/

"use strict";

var twentyNine = document.createDocumentFragment();
var thirty = document.createDocumentFragment();
var thirtyOne = document.createDocumentFragment();

// function to remove select list defaults
function removeSelectDefaults() {
    var emptyBoxes  = document.getElementsByTagName("select");
    for (var i = 0; i < emptyBoxes.length; i++) {
        emptyBoxes[i].selectedIndex = -1;
    }
}

// function to set up document fragments for days of the month
function setUpDays() {
    var dates = document.getElementById("delivDy").getElementsByTagName("option");
    twentyNine.appendChild(dates[28].cloneNode(true));
    thirty.appendChild(dates[28].cloneNode(true));
    thirty.appendChild(dates[29].cloneNode(true));
    thirtyOne.appendChild(dates[28].cloneNode(true));
    thirtyOne.appendChild(dates[29].cloneNode(true));
    thirtyOne.appendChild(dates[30].cloneNode(true));
}

// function to set up the list of days based on the selected month 
function updateDays() {
   var deliveryDay = document.getElementById("delivDy");
   var dates = deliveryDay.getElementsByTagName("option");
   var deliveryMonth = document.getElementById("delivMo");
   var deliveryYear = document.getElementById("delivYr");
   var selectedMonth = deliveryMonth.options[deliveryMonth.selectedIndex].value;
   while (dates[28]) {
        deliveryDay.removeChild(dates[28]);
    }
    if (deliveryYear.selectedIndex === -1) {
        deliveryDay.selectedIndex = 0; 
    }
    
    // if it's feburary and the year 2020, twentyNine
    if (selectedMonth === "2" && deliveryYear.options[deliveryYear.selectedIndex].value === "2020") {
        deliveryDay.appendChild(twentyNine.cloneNode(true));
    }   
    // else if it's a 30 day month, thirty
    else if (selectedMonth === "4" || selectedMonth === "6" || selectedMonth === "9" || selectedMonth === "11") {
        deliveryDay.appendChild(thirty.cloneNode(true));

    }
    // else if 31 day month, thirtyOne
    else if (selectedMonth === "1" || selectedMonth === "3" || selectedMonth === "5" || selectedMonth === "7" || selectedMonth === "8" || selectedMonth === "10" || selectedMonth === "12") {
        deliveryDay.appendChild(thirtyOne.cloneNode(true));

    }
}

//function to inspect custom check box on message change
function autoCheckCustom() {
    var messageBox = document.getElementById("customText");
    //textarea has message, check the box
    if (messageBox.value !== "" && messageBox.value !== messageBox.placeholder) {
                document.getElementById("custom").checked = "checked";
    }
    //textarea has no message, uncheck the box
    else {
        document.getElementById("custom").checked = "";
    }
    
}

//function to copy billing to delivery address
function copyBillingAddress() {
    var billingInputElements = document.querySelectorAll("#billingAddress input");
    var deliveryInputElements = document.querySelectorAll("#deliveryAddress input");
    
    // duplicate adress - checkbox is checked - copy
    if (document.getElementById("sameAddr").checked) {
        for (var i=0; i < billingInputElements.length; i++) {
            deliveryInputElements[i + 1].value = billingInputElements[i].value;
        }
        document.querySelector("#deliveryAddress select").value = document.querySelector("#billingAddress select").value;
    }
    // duplicate adress - checkboxnot checked - erase
        else {
            for (var i=0; i< billingInputElements.length; i++) {
                deliveryInputElements[i + 1].value = billingInputElements[i].value;
        }
        document.querySelector("#deliveryAddress select").selectedIndex = -1;               
        }
}

// function that sets up page on load event 
function setUpPage() {
    removeSelectDefaults();
    setUpDays();
    createEventListeners();
}

// function to create our event listeners 

    //if the month changes
function createEventListeners() {
    var deliveryMonth = document.getElementById("delivMo");
        if (deliveryMonth.addEventListener) {
            deliveryMonth.addEventListener("change", updateDays, false);
        } else if (deliveryMonth.attachEvent) {
            deliveryMonth.attachEvents("onchange", updateDays);
        }   
    
    //if the year changes
     var deliveryYear = document.getElementById("delivYr");
        if (deliveryYear.addEventListener) {
            deliveryYear.addEventListener("change", updateDays, false);
        } else if (deliveryYear.attachEvent) {
            deliveryYear.attachEvents("onchange", updateDays);
        }   
    
     //if the message box changes
     var messageBox = document.getElementById("customText");
        if (messageBox.addEventListener) {
            messageBox.addEventListener("change", autoCheckCustom, false);
        } else if (messageBox.attachEvent) {
            messageBox.attachEvents("onchange", autoCheckCustom);
        }   
    
      var same = document.getElementById("sameAddr");
        if (same.addEventListener) {
            same.addEventListener("change", copyBillingAddress, false);
        } else if (same.attachEvent) {
            same.attachEvents("onchange", copyBillingAddress);
        }   
    
}
    
//page load event handlers
if (window.addEventListener) {
    window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
    window.attachEvents("onload", setUpPage);
     
}


