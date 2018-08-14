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
var formValidity = true;


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
//cover for no month selected
    if (deliveryMonth.selectedIndex === -1) {
        return;
    }
    
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
    
    // duplicate address - checkbox is checked - copy
    if (document.getElementById("sameAddr").checked) {
        for (var i=0; i < billingInputElements.length; i++) {
            deliveryInputElements[i + 1].value = billingInputElements[i].value;
        }
        document.querySelector("#deliveryAddress select").value = document.querySelector("#billingAddress select").value;
    }
    // duplicate address - checkboxnot checked - erase
        else {
            for (var i=0; i< billingInputElements.length; i++) {
                deliveryInputElements[i + 1].value = billingInputElements[i].value;
        }
        document.querySelector("#deliveryAddress select").selectedIndex = -1;               
        }
}

//================================================
//VALIDATION
//================================================


// function to validate address - billing & delivery
function validateAddress(fieldsetId) {
    var inputElements = document.querySelectorAll("#" + fieldsetId + " input");
    var errorDiv = document.querySelectorAll("#" + fieldsetId + " .errorMessage")[0];
    var fieldsetValidity = true;
    var elementCount = inputElements.length;
    var currentElement;
    
    try {
        // loop through input fields lookking for blanks
        for (var i = 0; i < elementCount; i++) {
            currentElement = inputElements[i];
            // blanks
            if (currentElement.value === "") {
               // debugger;
                currentElement.style.background = "rgb(255, 233, 233)";
                fieldsetValidity = false; 
            }
            
            // not blanks
            
            else {
                currentElement.style.background = "white";
            }
        }
        
        
        // action for invalide fieldset

        if (fieldsetValidity === false) {
            if (fieldsetId === "billingAddress") {
                throw "Please complete all Billing Address information."
            } 
            else {
                throw "Please complete all Delivery Address information."
            }
        }
    }
    catch (msg) {
     errorDiv.style.display = "block";
     errorDiv.innerHTML = msg;
     formValidity = false;
 }

}

// function to validate delivery date
function validateDeliveryDate() {
    var selectElements = document.querySelectorAll("#deliveryDate" + " select");
    var errorDiv = document.querySelectorAll("#deliveryDate" + " .errorMessage")[0];
    var fieldsetValidity = true;
    var elementCount = selectElements.length;
    var currentElement;
    
    try {
        // loop through select fields looking for blanks
        for (var i = 0; i < elementCount; i++) {
            currentElement = selectElements[i];
            // blanks
            if (currentElement.selectedIndex === -1) {
               // debugger;
                currentElement.style.border = "1px solid red";
                fieldsetValidity = false; 
            }
            
            // not blanks
            
            else {
                currentElement.style.border = "";
            }
        }
        
        // action for invalide fieldset
        if (fieldsetValidity === false) {
            throw "Please specify a Delivery Date."
        } else {
            errorDiv.style.display = "none";
            errorDiv.innerHTML = "";
            
        }
        
    }
    catch(msg) {
        errorDiv.style.display = "block";
        errorDiv.innerHTML = msg;
        formValidity = false;

    }
    
}

// function to validate payment
function validatePayment() {
    var errorDiv = document.querySelectorAll("#deliveryDate" + " .errorMessage")[0];
    var fieldsetValidity = true;
    var selectElements = document.querySelectorAll("#paymentInfo" + " select");
    var elementCount = selectElements.length;
    var cvvElement = document.getElementById("cvv");
    var cards = document.getElementsByName("PaymentType");
    var currentElement;
// this is where we were yesterday!!!!!@LKJ!LJK@!JKL!@LJK!JLK!L#KJAGKJSLD Gads jf dASLKfjDLKj a oiaeu jfdlkf jaldfkjsa Kj1  L!KJ!JK!!KL!KL!JKL!J!!
    try {
        // loop through select fields looking for blanks
        for (var i = 0; i < elementCount; i++) {
            currentElement = selectElements[i];
            // blanks
            if (currentElement.selectedIndex === -1) {
               // debugger;
                currentElement.style.border = "1px solid red";
                fieldsetValidity = false; 
            }
            
            // not blanks
            
            else {
                currentElement.style.border = "";
            }
        }
        
        // action for invalide fieldset
        if (fieldsetValidity === false) {
            throw "Please specify a Delivery Date."
        } else {
            errorDiv.style.display = "none";
            errorDiv.innerHTML = "";
            
        }
        
    }
    catch(msg) {
        errorDiv.style.display = "block";
        errorDiv.innerHTML = msg;
        formValidity = false;

    }
    
}

// function to validate entire form
function validateForm(evt) {
    if (evt.preventDefault) {
        evt.preventDefault();
    }
    else {
        evt.returnValue = false;
    }
    formValidity = true;
    
    validateAddress("billingAddress");
    validateAddress("deliveryAddress");
    validateDeliveryDate();
    
    if (formValidity === true) { //form is valid
        document.getElementById("errorText").innerHTML = "";
        document.getElementById("errorText").style.display = "none";
        document.getElementsByTagName("form")[0].submit();

    }
    else {
        document.getElementById("errorText").innerHTML = "Please fix the indicated problems and then resubmit your order.";
        document.getElementById("errorText").style.display = "block";
        scroll(0,0);
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
    
    var form = document.getElementsByTagName("form")[0];
        if (form.addEventListener) {
            form.addEventListener("submit", validateForm, false);
        } else if (form.attachEvent) {
            form.attachEvents("onsubmit", validateForm);
        }   
    
}
    
//page load event handlers
if (window.addEventListener) {
    window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
    window.attachEvents("onload", setUpPage);
     
}


