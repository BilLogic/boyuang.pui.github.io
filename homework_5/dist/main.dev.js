"use strict";

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