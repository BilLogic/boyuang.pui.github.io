"use strict";

// Roll Info constructor function
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
var cpRollInfo = new RollDescription("../Imgs/RollPics/pecan-roll-pic.svg", "Caramel Pecan Roll", 3.0, cpDescription, 4.9, 650, true); // Array of built-in Roll Info

var rollInfo = [defaultInfo, ogRollInfo, bbRollInfo, waRollInfo, gfRollInfo, psRollInfo, cpRollInfo]; // Function that parse the detail rollInfo into Product Description page

function setDetailInfo(index) {
  // get info object
  var jsonSelectedRoll = JSON.stringify(rollInfo[index]); // store locally

  localStorage.setItem("selectedRoll", jsonSelectedRoll);
} // Helper function that add a img element under the given parentNode


function AddImgTemplate(parentNode, src, alt) {
  var id = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var imgNode = document.createElement('img');
  var source = document.createAttribute('src');
  source.value = src;
  var altValue = document.createAttribute('alt');
  altValue.value = alt;

  if (id != null) {
    var idValue = document.createAttribute('id');
    idValue.value = id;
    imgNode.setAttributeNode(idValue);
  }

  imgNode.setAttributeNode(source);
  imgNode.setAttributeNode(altValue);
  parentNode.appendChild(imgNode);
}

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
  console.log(bodyContainer);
} // get tag text from local storage


function getInfo() {
  console.log("getInfo got called");
  var JsonSelectedRoll = localStorage.getItem("selectedRoll");

  if (JsonSelectedRoll === null) {
    console.log("got a problem when parsing the info!");
  } else {
    var parsedSelection = JSON.parse(JsonSelectedRoll);
    console.log(parsedSelection);
    console.log("Calling ContentTemplate");
    ContentTemplate(parsedSelection);
  }
}

function TurnOnItemPage() {
  var menu = document.getElementById("mainMenu");
  menu.style.display = "none";
  console.log("Menu Disappear, Item pop up~");
}

var cartSwitch = false;

function openCart() {
  var cartLogo = document.getElementById("theCartLogo"); //console.log(cartLogo);

  var menu = document.getElementById("mainMenu"); //console.log(menu);
  //const layout = document.getElementById("GeneralLayout");

  var cartList = document.getElementById("cartDisplay");

  if (!cartSwitch) {
    cartLogo.src = "../Imgs/Buttons/Cart_CheckOut.svg";
    menu.style.gridTemplateAreas = "'roll_1 roll_2 roll_3 .' 'roll_4 roll_5 roll_6 .'";
    menu.style.gridAutoColumns = "2fr 2fr 2fr 1fr"; //layout.style.gridTemplateAreas = "'header header openCart' 'content content 0penCart'";
    //layout.style.gridTemplateColumns = "3fr 3fr 1fr";

    cartList.style.display = "grid";
  } else {
    cartLogo.src = "../Imgs/CartBun_cart_icon.svg";
    menu.style.gridTemplateAreas = "'roll_1 roll_2 roll_3' 'roll_4 roll_5 roll_6'";
    menu.style.gridAutoColumns = "1fr 1fr 1fr"; //layout.style.gridTemplateAreas = "'header header header' 'content content content'";
    //layout.style.gridTemplateColumns = "1fr 1fr 1fr";

    cartList.style.display = "none";
  }

  cartSwitch = !cartSwitch;
}

function openCart2() {
  var cartLogo = document.getElementById("theCartLogo"); //console.log(cartLogo);

  var menu = document.getElementById("mainMenu"); //console.log(menu);
  //const layout = document.getElementById("GeneralLayout");

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
}

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
}

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
}

function ChangeDescription(i) {
  var text = document.getElementById();
}