"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

//import { checkoutListTemplate } from './components/checkoutTemplate';
// global variable
var cartArray = [];
var wishListArray = [];
var glazeArray = ["None", "Sugar-Milk", "Vanilla-Milk", "Double-chocolate"];
var qtyArray = ["1", "3", "6", "12"]; // Roll Info constructor function

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

  var bodyContainer = document.getElementById("description-section");
  bodyContainer.setAttribute('name', "".concat(roll.itemName)); // create three sections divs

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
  getWishList();
} // Constructor of cart array items


function CartTag(name, glaze, qty, price, imgUrl) {
  this.name = name;
  this.glaze = glaze;
  this.qty = qty;
  this.price = price;
  this.imgUrl = imgUrl;
} // helper function that keep track of number in cart


function updateNumberTag() {
  //update cart tag number
  var numberTag = document.querySelector("p.number-in-cart");
  numberTag.innerHTML = "".concat(cartArray.length);
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
} // helper function that loads up all locally stored in cart items


function getCart() {
  var JsonSelectedCartArray = localStorage.getItem("cartArray");

  if (JsonSelectedCartArray === null) {
    console.log("got a problem when parsing the cart array!");
  } else {
    var parsedCartArray = JSON.parse(JsonSelectedCartArray);
    console.log("Get Cart:" + parsedCartArray);
    cartArray = _toConsumableArray(parsedCartArray);
    updateNumberTag();
  }
} //TODO:
// Function that store the info locally
// this info will get passed into the side wishListArray and check-out page


function setWishListInfo(glaze, qty) {
  var JsonSelectedRoll = localStorage.getItem("selectedRoll");
  var parsedSelection = JSON.parse(JsonSelectedRoll); // create tag array element object

  var cartTag = new CartTag(parsedSelection.itemName, glaze, qty, parsedSelection.price, parsedSelection.imgUrl); // push to array

  wishListArray.push(cartTag);
  console.log(cartTag);
  console.log(wishListArray); // create JSON cart array object

  var jsonCartArray = JSON.stringify(wishListArray); // store locally

  localStorage.setItem("wishListArray", jsonCartArray);
}

function updateWishList() {
  var glazeField = document.querySelector('input[name="glaze"]:checked');
  var qtyField = document.querySelector('input[name="qty"]:checked'); // check if both selection are filled

  if (glazeField === null || qtyField === null) {
    window.alert("Please finish you glaze and quantity selection~");
  } else {
    var glazeValue = glazeField.value;
    var qtyValue = qtyField.value;
    setWishListInfo(glazeValue, qtyValue);
  }
} // helper function that updates local info about the cart


function setWishList() {
  var jsonCartArray = JSON.stringify(wishListArray); // store locally

  localStorage.setItem("wishListArray", jsonCartArray);
} // helper function that loads up all locally stored in cart items


function getWishList() {
  var JsonSelectedWishListArray = localStorage.getItem("wishListArray");

  if (JsonSelectedWishListArray === null) {
    console.log("got a problem when parsing the wishList array!");
  } else {
    var parsedWishListArray = JSON.parse(JsonSelectedWishListArray);
    console.log("Get Wish List:" + parsedWishListArray);
    wishListArray = _toConsumableArray(parsedWishListArray);
  }
} // Helper function that is attached to the edit button


function inCartEdit() {
  var mode = document.querySelector("input[name=mode]:checked").id; // get info

  var editName, editGlaze, editQty;

  var _this$parentNode$id$s = this.parentNode.id.split("^");

  var _this$parentNode$id$s2 = _slicedToArray(_this$parentNode$id$s, 3);

  editName = _this$parentNode$id$s2[0];
  editGlaze = _this$parentNode$id$s2[1];
  editQty = _this$parentNode$id$s2[2];
  console.log(editName, editGlaze, editQty);

  if (mode === 'cart') {
    // edit index on the local cart array
    var editIndex = cartArray.findIndex(function (item) {
      return item.name === editName && item.glaze === editGlaze && item.qty === editQty;
    }); // obj index from the default array

    var objIndex = rollInfo.findIndex(function (item) {
      return item.itemName === editName;
    });
    setDetailInfo(objIndex); // delete it from array and set local

    cartArray.splice(editIndex, 1);
    setCart();
  } else if (mode === 'wish') {
    // edit index on the local cart array
    var _editIndex = wishListArray.findIndex(function (item) {
      return item.name === editName && item.glaze === editGlaze && item.qty === editQty;
    }); // obj index from the default array


    var _objIndex = rollInfo.findIndex(function (item) {
      return item.itemName === editName;
    });

    setDetailInfo(_objIndex); // delete it from array and set local

    wishListArray.splice(_editIndex, 1);
    setWishList();
  } //bring back to specific product page


  window.location.href = "../htmlPages/Product_detail.html";
} // Helper function that are attached to the button


function inCartDelete() {
  var mode = document.querySelector("input[name=mode]:checked").id; // target deleted item's index

  var deleteKey = this.parentNode.id.split("^");

  if (mode === 'cart') {
    var deleteIndex = cartArray.findIndex(function (item) {
      return item.name === deleteKey[0] && item.glaze === deleteKey[1] && item.qty === deleteKey[2];
    });
    cartArray.splice(deleteIndex, 1); // delete from model

    setCart();
  } else if (mode === 'wish') {
    var _deleteIndex = wishListArray.findIndex(function (item) {
      return item.name === deleteKey[0] && item.glaze === deleteKey[1] && item.qty === deleteKey[2];
    });

    wishListArray.splice(_deleteIndex, 1); // delete from model

    setWishList();
  } // delete item from view


  deleteItem(this.parentNode);
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
  editButton.onclick = inCartEdit;
  var deleteButton = document.createElement("button");
  deleteButton.textContent = "DELETE";
  deleteButton.setAttribute("id", "delete");
  deleteButton.onclick = inCartDelete; // attach all child nodes

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
  console.log(cartArray);
} // Loads up all stored items in cart


function loadWishListItems() {
  // parent node
  var wishListItemList = document.getElementById("wishList"); // clear cartItemList

  wishListItemList.innerHTML = ""; // iterate through each item => turn into a block item => add to display item list 

  wishListArray.forEach(function (cartTag) {
    var cartBlock = CartItemTemplate(cartTag.name, cartTag.glaze, cartTag.qty, cartTag.price, cartTag.imgUrl);
    wishListItemList.appendChild(cartBlock);
    console.log(wishListItemList);
  });
  console.log(wishListArray);
}

function calculateTotalCost() {
  if (cartArray.length == 0) {
    return 0;
  } else {
    var rawTotal = cartArray.map(function (cartTag) {
      return cartTag.price * cartTag.qty;
    }).reduce(function (a, b) {
      return a + b;
    });
    return rawTotal;
  }
}

function calculateTotal() {
  var rawTotal = calculateTotalCost();
  var shippingCost = 0;
  var CouponCode = 0;
  var finalTotal = (rawTotal + shippingCost) * (1 - CouponCode);
  var subTotal = document.querySelector("p#d1");
  subTotal.innerHTML = "<span>".concat(rawTotal, "</span>");
  var shippingFee = document.querySelector("p#d2");
  shippingFee.innerHTML = "<span>".concat(shippingCost, "$</span>");
  var discount = document.querySelector("p#d3");
  discount.innerHTML = "<span>".concat(CouponCode, "</span>");
  var grandTotal = document.querySelector("p#d4");
  grandTotal.innerHTML = "<span>".concat(finalTotal, "</span>");
} // Loads up all stored item in the check out page display format


function loadCartItemsToFinalCheckout() {
  // parent node
  var tableBodyContainer = document.querySelector("#itemTableBody"); // clear cartItemList

  tableBodyContainer.innerHTML = ""; // iterate through each item => turn into a block item => add to display item list 

  cartArray.forEach(function (cartTag) {
    var newTableRow = checkoutListTemplate(cartTag.name, cartTag.glaze, cartTag.qty, cartTag.price, cartTag.imgUrl);
    tableBodyContainer.appendChild(newTableRow);
  });
  calculateTotal();
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
  var cartDisplay = document.getElementById("cartDisplay");
  var mode = document.querySelector("input[name=mode]:checked").id;
  var cartList = document.getElementById("itemList");
  var wishList = document.getElementById("wishList");
  var totalPrice = document.getElementById('totalPrice');

  if (!cartSwitch) {
    cartLogo.src = "../Imgs/Buttons/Cart_CheckOut.svg";
    menu.style.gridTemplateAreas = "'roll_1 roll_2 roll_3 .' 'roll_4 roll_5 roll_6 .'";
    menu.style.gridAutoColumns = "3fr 3fr 3fr 0fr";
    cartDisplay.style.display = "grid";
    menu.style.justifySelf = 'start'; // display cart

    if (mode === 'cart') {
      cartList.style.display = "block";
      wishList.style.display = "none";
    } else if (mode === 'wish') {
      wishList.style.display = "block";
      cartList.style.display = "none";
    } // calculate the total cost


    totalPrice.innerHTML = "Total Cost: ".concat(calculateTotalCost(), "$");
  } else {
    cartLogo.src = "../Imgs/CartCart_without_number.svg";
    menu.style.gridTemplateAreas = "'roll_1 roll_2 roll_3' 'roll_4 roll_5 roll_6'";
    menu.style.gridAutoColumns = "1fr 1fr 1fr";
    cartDisplay.style.display = "none";
    menu.style.justifySelf = 'center';
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
    menu.style.gridAutoColumns = "2fr 2fr 2fr 2fr 0fr";
    cartList.style.display = "grid";
    menu.style.justifySelf = 'start';
  } else {
    cartLogo.src = "../Imgs/CartBun_cart_icon.svg";
    menu.style.gridTemplateAreas = "'roll_1 roll_2 roll_3 roll_4' 'roll_5 roll_6 roll_7 roll_8'";
    menu.style.gridAutoColumns = "1fr 1fr 1fr 1fr";
    cartList.style.display = "none";
    menu.style.justifySelf = 'center';
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
} //TODO: Make the load available across all pages

/**************        * CHECK OUT PAGE LOADING ********* */


function checkoutListTemplate(name, glaze, qty, price, imgUrl) {
  console.log("CheckoutListTemplate got called"); // create the tr wrapper

  var newRow = document.createElement("tr");
  newRow.setAttribute("id", "".concat(name, "^").concat(glaze, "^").concat(qty)); // create the td under tr

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

  priceTD.innerHTML = "<span>".concat(price, "$</span>"); // set up qty TD

  var qtyDiv = document.createElement("div");
  var qtyParagraph = document.createElement("p");
  qtyParagraph.innerHTML = "<span>".concat(qty, "</span>");
  var buttonUp = document.createElement("button");
  buttonUp.setAttribute("id", "Qty_Up");

  if (qty != 12) {
    buttonUp.setAttribute('class', "active");
    buttonUp.onclick = inCheckoutEdit;
  } else {
    buttonUp.setAttribute('class', "in-active");
  }

  var buttonDown = document.createElement("button");
  buttonDown.setAttribute("id", "Qty_Down");

  if (qty != 1) {
    buttonDown.setAttribute('class', "active");
    buttonDown.onclick = inCheckoutEdit;
  } else {
    buttonDown.setAttribute('class', "in-active");
  } // assemble the qty TD


  qtyDiv.appendChild(buttonUp);
  qtyDiv.appendChild(qtyParagraph);
  qtyDiv.appendChild(buttonDown); // insert div to the item TD

  qtyTD.appendChild(qtyDiv); // set up glaze TD

  var glazeDiv = document.createElement("div");
  var glazeParagraph = document.createElement("p");
  glazeParagraph.innerHTML = "<span>".concat(glaze, "</span>");
  var buttonPrev = document.createElement("button");
  buttonPrev.setAttribute("id", "Glaze_Prev");
  buttonPrev.setAttribute('class', "active");
  buttonPrev.onclick = inCheckoutEdit;
  var buttonNext = document.createElement("button");
  buttonNext.setAttribute("id", "Glaze_Next");
  buttonNext.setAttribute('class', "active");
  buttonNext.onclick = inCheckoutEdit; // assemble the qty TD

  glazeDiv.appendChild(buttonPrev);
  glazeDiv.appendChild(glazeParagraph);
  glazeDiv.appendChild(buttonNext); // insert div to the item TD

  glazeTD.appendChild(glazeDiv); // set up total TD

  var totalDiv = document.createElement("div");
  var totalParagraph = document.createElement("p");
  var rowTotal = qty * price;
  totalParagraph.innerHTML = "<span>".concat(rowTotal, "$</span>");
  var buttonDel = document.createElement("button");
  buttonDel.setAttribute("id", "In_Delete_btn");
  buttonDel.onclick = inCheckoutDelete; // assemble the total TD

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

function inCheckoutDelete() {
  // target deleted item's index
  var deleteNode = this.parentNode.parentNode.parentNode;
  console.log(deleteNode);
  var deleteKey = deleteNode.id.split("^");
  var deleteIndex = cartArray.findIndex(function (item) {
    return item.name === deleteKey[0] && item.glaze === deleteKey[1] && item.qty === deleteKey[2];
  });
  cartArray.splice(deleteIndex, 1); // delete from model

  setCart(); // delete item from view

  deleteItem(deleteNode);
}

function inCheckoutEdit(event) {
  // target deleted item's index
  var commandID = event.target.id;
  var editNode = this.parentNode.parentNode.parentNode;
  var editKey = editNode.id.split("^");
  var editIndex = cartArray.findIndex(function (item) {
    return item.name === editKey[0] && item.glaze === editKey[1] && item.qty === editKey[2];
  });
  var editItem = cartArray[editIndex];

  var replaceItem = _objectSpread({}, editItem);

  console.log("Original item:", editItem);
  console.log("Original Array:", cartArray);
  var GlazeIndex = glazeArray.findIndex(function (glaze) {
    return glaze === editItem.glaze;
  });
  var QtyIndex = qtyArray.findIndex(function (qty) {
    return qty === editItem.qty;
  }); // Case 1: Decrease Qty if necessary

  if (commandID === "Qty_Down") {
    if (QtyIndex !== 0) {
      QtyIndex = (QtyIndex - 1) % qtyArray.length;
    } else {
      // no update => just skip
      return;
    }
  } // Case 2: Increase Qty if necessary
  else if (commandID === "Qty_Up") {
      if (QtyIndex !== qtyArray.length - 1) {
        QtyIndex = (QtyIndex + 1) % qtyArray.length;
      } else {
        // no update => just skip
        return;
      }
    } // Case 3: Prev Glaze circularly
    else if (commandID === "Glaze_Prev") {
        GlazeIndex = (GlazeIndex - 1) % glazeArray.length;

        if (GlazeIndex < 0) {
          GlazeIndex = 3;
          console.log("Stupid JS modular arith");
        }
      } // Case 4: Next Glaze circularly
      else if (commandID === "Glaze_Next") {
          GlazeIndex = (GlazeIndex + 1) % glazeArray.length;
        } // reset Qty & Glaze & ID


  var newGlaze = glazeArray[GlazeIndex];
  var newQty = qtyArray[QtyIndex];
  replaceItem.glaze = newGlaze;
  replaceItem.qty = newQty;
  cartArray.splice(editIndex, 1, replaceItem);
  console.log("New Item: ", replaceItem);
  console.log("New Array:", cartArray);
  setCart();
  getCart();
  checkoutListTemplate();
  location.reload();
}
/*********************** Scroll left and right ************** */
// function that make large carousel swap avaiable [Prev]


function switchToPrevItem() {
  var bodyContainer = document.getElementById("description-section");
  var curItemName = bodyContainer.getAttribute('name');
  var ogIndex = rollInfo.findIndex(function (item) {
    return item.itemName === curItemName;
  });
  var newIndex = (ogIndex - 1) % rollInfo.length;

  if (newIndex === 0) {
    newIndex = rollInfo.length - 1;
  } // set newDetail Info


  setDetailInfo(newIndex);
  location.reload();
} // function that make large carousel swap avaiable [Prev]


function switchToNextItem() {
  var bodyContainer = document.getElementById("description-section");
  var curItemName = bodyContainer.getAttribute('name');
  var ogIndex = rollInfo.findIndex(function (item) {
    return item.itemName === curItemName;
  });
  var newIndex = (ogIndex + 1) % rollInfo.length;

  if (newIndex === 0) {
    newIndex = 1;
  } // set newDetail Info


  setDetailInfo(newIndex);
  location.reload();
}