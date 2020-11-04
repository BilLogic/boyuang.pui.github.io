"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkoutListTemplate = checkoutListTemplate;

var _main = require("../main");

// Helper Function that create and fill in the information on Item Description Page
function checkoutListTemplate(name, glaze, qty, price, imgUrl) {
  console.log("CheckoutListTemplate got called"); // create the tr wrapper

  var newRow = document.createElement("tr"); // create the td under tr

  var itemTD = document.createElement("td");
  itemTD.setAttribute("scope", "row");
  var priceTD = document.createElement("td");
  var qtyTD = document.createElement("td");
  var glazeTD = document.createElement("td");
  var totalTD = document.createElement("td"); // set up item TD

  var itemDiv = document.createElement("div");
  var rollPic = document.createElement("img");
  rollPic.setAttribute("src", imgUrl);
  var rollName = document.createElement("p");
  rollName.innerHTML = "".concat(name);
  itemDiv.appendChild(rollPic);
  itemDiv.appendChild(rollName); // insert div to the item TD

  itemTD.appendChild(itemDiv); // set up price TD

  priceTD.innerHTML = "".concat(price); // set up qty TD

  var qtyDiv = document.createElement("div");
  var qtyParagraph = document.createElement("p");
  qtyParagraph.innerHTML = "".concat(qty);
  var buttonUp = document.createElement("button");
  buttonUp.setAttribute("id", "Qty_Up");
  var buttonDown = document.createElement("button");
  buttonDown.setAttribute("id", "Qty_Down"); // assemble the qty TD

  qtyDiv.appendChild(bottomUp);
  qtyDiv.appendChild(qtyParagraph);
  qtyDiv.appendChild(bottomDown); // insert div to the item TD

  qtyTD.appendChild(qtyDiv); // set up glaze TD

  var glazeDiv = document.createElement("div");
  var glazeParagraph = document.createElement("p");
  qtyParagraph.innerHTML = "".concat(glaze);
  var buttonPrev = document.createElement("button");
  buttonPrev.setAttribute("id", "Glaze_Prev");
  var buttonNext = document.createElement("button");
  buttonNext.setAttribute("id", "Glaze_Next"); // assemble the qty TD

  glazeDiv.appendChild(buttonPrev);
  glazeDiv.appendChild(glazeParagraph);
  glazeDiv.appendChild(buttonNext); // insert div to the item TD

  glazeTD.appendChild(glazeDiv); // set up total TD

  var totalDiv = document.createElement("div");
  var totalParagraph = document.createElement("p");
  var rowTotal = qty * price;
  totalParagraph.innerHTML = "".concat(rowTotal);
  var buttonDel = document.createElement("button");
  buttonDel.setAttribute("id", "In_Delete_btn"); // assemble the total TD

  totalDiv.appendChild(totalParagraph);
  totalDiv.appendChild(buttonDel); // insert div to the item TD

  totalTD.appendChild(totalDiv); // assemble the table row

  newRow.appendChild(itemTD);
  newRow.appendChild(priceTD);
  newRow.appendChild(qtyTD);
  newRow.appendChild(glazeTD);
  newRow.appendChild(totalTD); // return the assembled newRow

  console.log(newRow);
  return newRow;
}