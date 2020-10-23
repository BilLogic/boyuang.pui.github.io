"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// global variable
var cartArray = []; // Roll Info constructor function

function RollDescription(imgUrl, itemName, price, description, rate, calory, allergy) {
  this.imgUrl = imgUrl;
  this.itemName = itemName;
  this.price = price;
  this.description = description;
  this.rate = rate;
  this.calory = calory;
  this.allergy = allergy;
} // Roll description constants


var ogDescription = "Homemade cinnamon roll with grandma's love.";
var brDescription = "Homemade cinnamon roll with love. In addition, with self-planted blackberry inside!";
var waDescription = "Homemade cinnamon roll with love. In addition, with walnut on the top!";
var gfDescription = "Homemade cinnamon roll with love. In addition, it's gluten free!";
var psDescription = "Homemade cinnamon roll with love. In addition, with pumpkin spice inside!";
var cpDescription = "Homemade cinnamon roll with love. In addition, with caramel pecan on the top!"; // Roll Full Info constructor

var defaultInfo = new RollDescription("Imgs/RollPics/count1.png", "Default Value", 0, "", 0.0, 0, false);
var ogRollInfo = new RollDescription("../Imgs/RollPics/og-roll-pic.svg", "OG Roll", 1.5, ogDescription, 5.0, 560, true);
var bbRollInfo = new RollDescription("../Imgs/RollPics/blackberry-roll-pic.svg", "Blackberry Roll", 2.0, brDescription, 4.5, 580, false);
var waRollInfo = new RollDescription("../Imgs/RollPics/walnut-roll-pic.svg", "Walnut Roll", 2.5, waDescription, 4.7, 620, true);
var gfRollInfo = new RollDescription("../Imgs/RollPics/gfree-roll-pic.svg", "Gluten Free Roll", 1.2, gfDescription, 5.0, 450, false);
var psRollInfo = new RollDescription("../Imgs/RollPics/pumpkin-roll-pic.svg", "Pumpkin Spice Roll", 2, psDescription, 5, 560, true);
var cpRollInfo = new RollDescription("../Imgs/RollPics/pecan-roll-pic.svg", "Caramel Pecan Roll", 3.0, cpDescription, 4.9, 650, true);

function deleteItem(item) {
  item.parentNode.removeChild(item);
} // Array of built-in Roll Info


var rollInfo = [defaultInfo, ogRollInfo, bbRollInfo, waRollInfo, gfRollInfo, psRollInfo, cpRollInfo]; // Function that parse the detail rollInfo into Product Description page

function setDetailInfo(index) {
  // get info object
  var jsonSelectedRoll = JSON.stringify(rollInfo[index]); // store locally

  localStorage.setItem("selectedRoll", jsonSelectedRoll);
} // Helper function that add a img element under the given parentNode


function AddImgTemplate(parentNode, src, alt) {
  var id = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var imgNode = document.createElement('img');

  if (id != null) {
    imgNode.setAttribute("id", id);
  }

  imgNode.setAttribute("src", src);
  imgNode.setAttribute("alt", alt);
  parentNode.appendChild(imgNode);
} // Helper Function that create and fill in the information on Item Description Page


function ContentTemplate(roll) {
  console.log("ContentTemplate got called"); // get outer container

  var bodyContainer = document.getElementById("description-section"); // create three sections divs

  var picDiv = document.createElement("div");
  picDiv.className = "pic";
  var tagDiv = document.createElement("div");
  tagDiv.className = "tag";
  var infoDiv = document.createElement("div");
  infoDiv.className = "info"; // fill in pic information

  var leftArrow = document.createElement('div');
  var rightArrow = document.createElement('div');
  leftArrow.className = "left";
  rightArrow.className = "right";
  AddImgTemplate(leftArrow, "../Imgs/Buttons/huge-arrow.svg", "Switch to the previous item");
  AddImgTemplate(rightArrow, "../Imgs/Buttons/huge-arrow.svg", "Switch to the previous item");
  AddImgTemplate(picDiv, roll.imgUrl, "Roll Picture", "itemPic"); // fill in tag information

  tagDiv.innerHTML = "Item: ".concat(roll.itemName, "<br/> \n                        Price: ").concat(roll.price); // fill in description information

  infoDiv.innerHTML = "Flavor: ".concat(roll.description, "<br/>\n                        Calories: ").concat(roll.calory, "<br/>\n                        Popularity: ").concat(roll.rate, "<br/>\n                        Allergy: ").concat(roll.allergy ? "YES" : "NO"); // append created divs to the container

  bodyContainer.appendChild(picDiv);
  bodyContainer.appendChild(tagDiv);
  bodyContainer.appendChild(infoDiv);
} // get tag text from local storage


function getInfo() {
  var JsonSelectedRoll = localStorage.getItem("selectedRoll");

  if (JsonSelectedRoll === null) {
    console.log("got a problem when parsing the info!");
  } else {
    var parsedSelection = JSON.parse(JsonSelectedRoll);
    console.log("Calling ContentTemplate");
    ContentTemplate(parsedSelection);
  } // get locally stored cart info


  getCart();
} // Constructor of cart array items


function CartTag(name, glaze, qty, price, imgUrl) {
  this.name = name;
  this.glaze = glaze;
  this.qty = qty;
  this.price = price;
  this.imgUrl = imgUrl;
} // Function that store the info locally
// this info will get passed into the side cart and check-out page


function setCartInfo(glaze, qty) {
  var JsonSelectedRoll = localStorage.getItem("selectedRoll");
  var parsedSelection = JSON.parse(JsonSelectedRoll); // create tag array element object

  var cartTag = new CartTag(parsedSelection.itemName, glaze, qty, parsedSelection.price, parsedSelection.imgUrl); // push to array

  cartArray.push(cartTag); // update tag num

  updateNumberTag(); // create JSON cart array object

  var jsonCartArray = JSON.stringify(cartArray); // store locally

  localStorage.setItem("cartArray", jsonCartArray);
} // Jump to item menu + cart menu open page after the click


function updateCart() {
  var glazeField = document.querySelector('input[name="glaze"]:checked');
  var qtyField = document.querySelector('input[name="qty"]:checked'); // check if both selection are filled

  if (glazeField === null || qtyField === null) {
    window.alert("Please finish you glaze and quantity selection~");
  } else {
    var glazeValue = glazeField.value;
    var qtyValue = qtyField.value;
    setCartInfo(glazeValue, qtyValue);
  }
} // helper function that updates local info about the cart


function setCart() {
  var jsonCartArray = JSON.stringify(cartArray); // store locally

  localStorage.setItem("cartArray", jsonCartArray);
  updateNumberTag();
} // helper function that keep track of number in cart


function updateNumberTag() {
  //update cart tag number
  var numberTag = document.querySelector("p.number-in-cart");
  numberTag.innerHTML = "".concat(cartArray.length);
} // helper function that loads up all locally stored in cart items


function getCart() {
  var JsonSelectedCartArray = localStorage.getItem("cartArray");

  if (JsonSelectedCartArray === null) {
    console.log("got a problem when parsing the cart array!");
  } else {
    var parsedCartArray = JSON.parse(JsonSelectedCartArray);
    cartArray = _toConsumableArray(parsedCartArray);
    updateNumberTag();
  }
} // Produce SideBar Cart Items


function CartItemTemplate(name, glaze, qty, price, imgUrl) {
  // create div
  var itemDiv = document.createElement("div");
  itemDiv.className = "item";
  itemDiv.setAttribute("id", "".concat(name, "^").concat(glaze, "^").concat(qty)); // thumbnail pic

  AddImgTemplate(itemDiv, imgUrl, "item Pic", "cartImg"); // thumbnail text

  var infoDiv = document.createElement("div");
  infoDiv.setAttribute("id", "cartInfo");
  infoDiv.innerHTML = "Glaze: ".concat(glaze, "<br/>\n                         Qty: ").concat(qty, "<br/>\n                         Price: ").concat(price); // edit buttons

  var editButton = document.createElement("button");
  editButton.textContent = "EDIT";
  editButton.setAttribute("id", "edit");
  var deleteButton = document.createElement("button");
  deleteButton.textContent = "DELETE";
  deleteButton.setAttribute("id", "delete");

  deleteButton.onclick = function () {
    // target deleted item's index
    var deleteKey = this.parentNode.id.split("^");
    var deleteIndex = cartArray.findIndex(function (item) {
      return item.name === deleteKey[0] && item.glaze === deleteKey[1] && item.qty === deleteKey[2];
    });
    cartArray.splice(deleteIndex, 1); // delete from model

    setCart(); // delete item from view

    deleteItem(this.parentNode);
  }; // attach all child nodes


  itemDiv.appendChild(infoDiv);
  itemDiv.appendChild(editButton);
  itemDiv.appendChild(deleteButton); // return div

  return itemDiv;
} // Loads up all stored items in cart


function loadCartItems() {
  // parent node
  var cartItemList = document.getElementById("itemList"); // clear cartItemList

  cartItemList.innerHTML = ""; // iterate through each item => turn into a block item => add to display item list 

  cartArray.forEach(function (cartTag) {
    var cartBlock = CartItemTemplate(cartTag.name, cartTag.glaze, cartTag.qty, cartTag.price, cartTag.imgUrl);
    cartItemList.appendChild(cartBlock);
  });
}

function TurnOnItemPage() {
  var menu = document.getElementById("mainMenu");
  menu.style.display = "none";
  console.log("Menu Disappear, Item pop up~");
}

var cartSwitch = false;

function openCart() {
  var cartLogo = document.getElementById("theCartLogo");
  var menu = document.getElementById("mainMenu");
  var cartList = document.getElementById("cartDisplay");

  if (!cartSwitch) {
    cartLogo.src = "../Imgs/Buttons/Cart_CheckOut.svg";
    menu.style.gridTemplateAreas = "'roll_1 roll_2 roll_3 .' 'roll_4 roll_5 roll_6 .'";
    menu.style.gridAutoColumns = "2fr 2fr 2fr 1fr";
    cartList.style.display = "grid";
  } else {
    cartLogo.src = "../Imgs/CartCart_without_number.svg";
    menu.style.gridTemplateAreas = "'roll_1 roll_2 roll_3' 'roll_4 roll_5 roll_6'";
    menu.style.gridAutoColumns = "1fr 1fr 1fr";
    cartList.style.display = "none";
  }

  cartSwitch = !cartSwitch;
}

function openCart2() {
  var cartLogo = document.getElementById("theCartLogo");
  var menu = document.getElementById("mainMenu");
  var cartList = document.getElementById("cartDisplay");

  if (!cartSwitch) {
    cartLogo.src = "../Imgs/Buttons/Cart_CheckOut.svg";
    menu.style.gridTemplateAreas = "'roll_1 roll_2 roll_3 roll_4 .' 'roll_5 roll_6 roll_7 roll_8 .'";
    menu.style.gridAutoColumns = "2fr 2fr 2fr 2fr 1fr"; //layout.style.gridTemplateAreas = "'header header openCart' 'content content 0penCart'";
    //layout.style.gridTemplateColumns = "3fr 3fr 1fr";

    cartList.style.display = "grid";
  } else {
    cartLogo.src = "../Imgs/CartBun_cart_icon.svg";
    menu.style.gridTemplateAreas = "'roll_1 roll_2 roll_3 roll_4' 'roll_5 roll_6 roll_7 roll_8'";
    menu.style.gridAutoColumns = "1fr 1fr 1fr 1fr"; //layout.style.gridTemplateAreas = "'header header header' 'content content content'";
    //layout.style.gridTemplateColumns = "1fr 1fr 1fr";

    cartList.style.display = "none";
  }

  cartSwitch = !cartSwitch;
}

function ZipCodeInput() {
  var banner = document.getElementById("banner");
  console.log(banner);
} // update item qty after qty seel


function ChangeImg(i) {
  var pic = document.getElementById("itemPic");

  if (i === 1) {
    pic.src = "../Imgs/RollPics/count1.svg";
  } else if (i === 3) {
    pic.src = "../Imgs/RollPics/count3.svg";
  } else if (i === 6) {
    pic.src = "../Imgs/RollPics/count6.svg";
  } else if (i === 12) {
    pic.src = "../Imgs/RollPics/count12.svg";
  }
} // update item picture after glaze selection


function ChangeGlaze(value) {
  var pic = document.getElementById("itemPic");

  if (value === "None") {
    pic.src = "../Imgs/RollPics/glaze_none.svg";
  } else if (value === "Sugar-Milk") {
    pic.src = "../Imgs/RollPics/glaze_sugarMilk.svg";
  } else if (value === "Vanilla-Milk") {
    pic.src = "../Imgs/RollPics/glaze_vinillaMilk.svg";
  } else if (value === "Double-chocolate") {
    pic.src = "../Imgs/RollPics/glaze_doubleChoco.svg";
  }
} // 3. link with the local array + set array


var stateArray = ["Add to Cart", "Allergy", "glaze:<br/>", "qty:<br/>", "Confirm?"];
/******Drag Function */

var startX = null;
var menuTagManager = {
  rollDiv: null,
  cartDiv: null,
  target: null,
  textIndex: 0,
  glaze: null,
  qty: null,
  rollInfoIndex: null
};
/************************Drag Functions *********************************/
// Helper function that reset the tag if target has changed

function resetMenuTagManger() {
  menuTagManager.rollDiv = null;
  menuTagManager.cartDiv = null;
  menuTagManager.target = null;
  menuTagManager.textIndex = 0;
  menuTagManager.glaze = null;
  menuTagManager.qty = null;
  menuTagManager.rollInfoIndex = null;
}

function checkMenuTagTarget(newTarget) {
  var newRollDiv = newTarget.parentNode.parentNode; // target changed

  if (menuTagManager.textIndex > 0) {
    if (newRollDiv.className != menuTagManager.rollDiv.className) {
      console.log("Target Changed!"); // reset current Obj

      updateMenuTag(menuTagManager.cartDiv, 0);
      resetMenuTagManger();
    }
  }
}

function setMenuTagManager() {
  var stateIndex = menuTagManager.textIndex;

  if (stateIndex === 0) {
    // set obj info
    menuTagManager.rollInfoIndex = menuTagManager.rollDiv.className[5]; //console.log(menuTagManager.rollInfoIndex);
    // store current selection locally

    setDetailInfo(menuTagManager.rollInfoIndex);
  } else if (stateIndex === 2) {
    // set glaze
    var glazeSelection = document.getElementById("menu-glaze-selection").value;
    menuTagManager.glaze = glazeSelection;
  } else if (stateIndex === 3) {
    // set qty
    var qtySelection = document.getElementById("menu-qty-selection").value;
    menuTagManager.qty = Number(qtySelection);
  }

  console.log(menuTagManager);
} // dragstart handler if (menuTagManager.textIndex != 0){


function dragStart(e, target) {
  menuTagManager.target = target; // check if target has changed

  checkMenuTagTarget(target);
  startX = e.offsetX;
  menuTagManager.cartDiv = target.parentNode;
  menuTagManager.rollDiv = target.parentNode.parentNode;
} // dragend handler


function dragEnd(e, target) {
  var thresholdX = target.width * 2;
  var endX = e.offsetX;
  var changeX = endX - startX;

  if (changeX < thresholdX) {
    target.style.left = "-21%"; //console.log("Not enough!");
  } else {
    target.style.left = "100%"; //console.log("You made it!");

    updateMenuTag(target.parentNode, 1);
  }
} // Helper function that fabricate add to cart tags


function menuTagTemplate(obj) {
  var textIndex = obj.textIndex;
  var parent = obj.rollDiv; // create main div

  var mainDiv = document.createElement("div");
  mainDiv.className = "cart"; // create drag button

  var dragButton = document.createElement("img");
  dragButton.setAttribute("src", "../Imgs/Buttons/double-arrow.png");
  dragButton.setAttribute("alt", "button");
  dragButton.setAttribute("ondragStart", "dragStart(event, this)");
  dragButton.setAttribute("ondragend", "dragEnd(event, this)");
  mainDiv.appendChild(dragButton); // create info test
  // Back to cart

  if (textIndex === 0) {
    var initP = document.createElement("p");
    initP.innerHTML = stateArray[textIndex];
    mainDiv.appendChild(initP);
  } // Add to cart =>  Allergy
  else if (textIndex === 1) {
      var infoP = document.createElement("p");
      infoP.innerHTML = stateArray[textIndex];
      mainDiv.appendChild(infoP);
    } // allergy => glaze
    else if (textIndex === 2) {
        var glazeDiv = document.createElement("div");
        glazeDiv.className = "glaze";
        glazeDiv.innerHTML = "\n        <label for=\"glaze\">".concat(stateArray[textIndex], "</label>\n        <select name=\"glaze\" id=\"menu-glaze-selection\">\n            <option value=\"None\">None</option>\n            <option value=\"Sugar-Milk\">Sugar-Milk</option>\n            <option value=\"Vanilla-Milk\">Vanilla-Milk</option>\n            <option value=\"Double-chocolate\">Double-chocolate</option>\n        </select>");
        mainDiv.appendChild(glazeDiv);
      } // glaze => qty
      else if (textIndex === 3) {
          var qtyDiv = document.createElement("div");
          qtyDiv.className = "qty";
          qtyDiv.innerHTML = "\n        <label for=\"qty\">".concat(stateArray[textIndex], "</label>\n        <select name=\"qty\" id=\"menu-qty-selection\">\n            <option value=\"1\">One</option>\n            <option value=\"3\">Three</option>\n            <option value=\"6\">Six</option>\n            <option value=\"12\">Twelve</option>\n        </select>");
          mainDiv.appendChild(qtyDiv);
        } else if (textIndex === 4) {
          var doneDiv = document.createElement("div");
          doneDiv.innerHTML = "\n        <button onclick=\"setCartInfo(menuTagManager.glaze, menuTagManager.qty);\n                         getCart();\n                         openCart();\n                         loadCartItems();\n                         resetMenuTagManger();\">\n                         ".concat(stateArray[textIndex], "\n                         </button>");
          mainDiv.appendChild(doneDiv);
        } // update menuTagManager info


  menuTagManager.cartDiv = mainDiv; // attach to parent

  parent.appendChild(mainDiv);
} // Swipe Event Handler


function updateMenuTag(prevTag, step) {
  //move to next
  if (menuTagManager.textIndex < 4 && step === 1) {
    //collect data if necessary
    // load to local storage
    setMenuTagManager(); // update state

    menuTagManager.textIndex++; //delete old node

    deleteItem(prevTag); //append new node

    menuTagTemplate(menuTagManager);
  } // reset
  else if (step === 0) {
      deleteItem(prevTag);
      menuTagManager.textIndex = 0;
      menuTagTemplate(menuTagManager);
    }
}