// global variable
let cartArray = [];


// Roll Info constructor function
function RollDescription(imgUrl, itemName, price, description, rate, calory, allergy){
    this.imgUrl = imgUrl;
    this.itemName = itemName;
    this.price = price;
    this.description = description;
    this.rate = rate;
    this.calory = calory;
    this.allergy = allergy;
}

// Roll description constants
const ogDescription = "Homemade cinnamon roll with grandma's love.";
const brDescription = "Homemade cinnamon roll with love. In addition, with self-planted blackberry inside!";
const waDescription = "Homemade cinnamon roll with love. In addition, with walnut on the top!";
const gfDescription = "Homemade cinnamon roll with love. In addition, it's gluten free!";
const psDescription = "Homemade cinnamon roll with love. In addition, with pumpkin spice inside!";
const cpDescription = "Homemade cinnamon roll with love. In addition, with caramel pecan on the top!";

// Roll Full Info constructor
const defaultInfo = new RollDescription("Imgs/RollPics/count1.png", "Default Value", 0, "", 0.0, 0, false);
const ogRollInfo = new RollDescription("../Imgs/RollPics/og-roll-pic.svg", "OG Roll", 1.5, ogDescription, 5.0, 560, true);
const bbRollInfo = new RollDescription("../Imgs/RollPics/blackberry-roll-pic.svg", "Blackberry Roll", 2.0, brDescription, 4.5, 580, false);
const waRollInfo = new RollDescription("../Imgs/RollPics/walnut-roll-pic.svg", "Walnut Roll", 2.5, waDescription, 4.7, 620, true);
const gfRollInfo = new RollDescription("../Imgs/RollPics/gfree-roll-pic.svg", "Gluten Free Roll", 1.2, gfDescription, 5.0, 450, false);
const psRollInfo = new RollDescription("../Imgs/RollPics/pumpkin-roll-pic.svg", "Pumpkin Spice Roll", 2, psDescription, 5, 560, true);
const cpRollInfo = new RollDescription("../Imgs/RollPics/pecan-roll-pic.svg", "Caramel Pecan Roll", 3.0, cpDescription, 4.9, 650, true);

function deleteItem(item){
    item.parentNode.removeChild(item);
}

// Array of built-in Roll Info
const rollInfo = [defaultInfo, ogRollInfo, bbRollInfo, waRollInfo, gfRollInfo, psRollInfo, cpRollInfo];

// Function that parse the detail rollInfo into Product Description page
function setDetailInfo(index){
    // get info object
    const jsonSelectedRoll = JSON.stringify(rollInfo[index]);
    // store locally
    localStorage.setItem("selectedRoll", jsonSelectedRoll);
}


// Helper function that add a img element under the given parentNode
function AddImgTemplate(parentNode, src, alt, id=null){
    let imgNode = document.createElement('img');

    if(id != null){    
        imgNode.setAttribute("id", id);
    }
    imgNode.setAttribute("src", src);
    imgNode.setAttribute("alt", alt);
    parentNode.appendChild(imgNode);
}

// Helper Function that create and fill in the information on Item Description Page
function ContentTemplate(roll){
    console.log("ContentTemplate got called");
    // get outer container
    const bodyContainer = document.getElementById("description-section");

    // create three sections divs
    let picDiv = document.createElement("div");
    picDiv.className = "pic";
    let tagDiv = document.createElement("div");
    tagDiv.className ="tag";
    let infoDiv = document.createElement("div");
    infoDiv.className = "info";

    // fill in pic information
    let leftArrow = document.createElement('div');    
    let rightArrow = document.createElement('div');   
    leftArrow.className = "left";
    rightArrow.className = "right";
    AddImgTemplate(leftArrow, "../Imgs/Buttons/huge-arrow.svg", "Switch to the previous item");
    AddImgTemplate(rightArrow, "../Imgs/Buttons/huge-arrow.svg", "Switch to the previous item");
    AddImgTemplate(picDiv, roll.imgUrl, "Roll Picture", "itemPic");

    // fill in tag information
    tagDiv.innerHTML = `Item: ${roll.itemName}<br/> 
                        Price: ${roll.price}`;

    // fill in description information
    infoDiv.innerHTML = `Flavor: ${roll.description}<br/>
                        Calories: ${roll.calory}<br/>
                        Popularity: ${roll.rate}<br/>
                        Allergy: ${roll.allergy ? "YES" : "NO"}`


    // append created divs to the container
    bodyContainer.appendChild(picDiv);
    bodyContainer.appendChild(tagDiv);
    bodyContainer.appendChild(infoDiv);
}




// get tag text from local storage
function getInfo(){
    const JsonSelectedRoll = localStorage.getItem("selectedRoll");
    if (JsonSelectedRoll === null){
        console.log("got a problem when parsing the info!");
    }
    else {
        const parsedSelection = JSON.parse(JsonSelectedRoll);
        console.log("Calling ContentTemplate");
        ContentTemplate(parsedSelection);
    }

    // get locally stored cart info
    getCart();
}

// Constructor of cart array items
function CartTag(name, glaze, qty, price, imgUrl){
    this.name = name;
    this.glaze = glaze;
    this.qty = qty;
    this.price = price;
    this.imgUrl = imgUrl;
}

// Function that store the info locally
// this info will get passed into the side cart and check-out page
function setCartInfo(glaze, qty){
    const JsonSelectedRoll = localStorage.getItem("selectedRoll");
    const parsedSelection = JSON.parse(JsonSelectedRoll);

    // create tag array element object
    const cartTag = new CartTag(parsedSelection.itemName, glaze, qty, parsedSelection.price, parsedSelection.imgUrl);
    // push to array
    cartArray.push(cartTag);
    // update tag num
    updateNumberTag();
    // create JSON cart array object
    const jsonCartArray = JSON.stringify(cartArray);
    // store locally
    localStorage.setItem("cartArray", jsonCartArray);
}


// Jump to item menu + cart menu open page after the click
function updateCart (){
    const glazeField = document.querySelector('input[name="glaze"]:checked');
    const qtyField = document.querySelector('input[name="qty"]:checked');
    // check if both selection are filled
    if (glazeField === null || qtyField === null){
        window.alert("Please finish you glaze and quantity selection~");
    }
    else {
        const glazeValue = glazeField.value;
        const qtyValue = qtyField.value;
        setCartInfo(glazeValue, qtyValue);
    }
}

// helper function that updates local info about the cart
function setCart() {
    const jsonCartArray = JSON.stringify(cartArray);
    // store locally
    localStorage.setItem("cartArray", jsonCartArray);
    updateNumberTag();
}

// helper function that keep track of number in cart
function updateNumberTag(){
       //update cart tag number
       let numberTag = document.querySelector("p.number-in-cart");
       numberTag.innerHTML = `${cartArray.length}`;
}

// helper function that loads up all locally stored in cart items
function getCart(){
    const JsonSelectedCartArray = localStorage.getItem("cartArray");
    if (JsonSelectedCartArray === null){
        console.log("got a problem when parsing the cart array!");
    }
    else {
        const parsedCartArray = JSON.parse(JsonSelectedCartArray);
        cartArray = [...parsedCartArray];
        updateNumberTag();
    }
}

// Produce SideBar Cart Items
function CartItemTemplate(name, glaze, qty, price, imgUrl){
    // create div
    let itemDiv = document.createElement("div");
    itemDiv.className = "item";
    itemDiv.setAttribute("id", `${name}^${glaze}^${qty}`);

    // thumbnail pic
    AddImgTemplate(itemDiv, imgUrl, "item Pic", "cartImg");

    // thumbnail text
    let infoDiv = document.createElement("div");
    infoDiv.setAttribute("id", "cartInfo");
    infoDiv.innerHTML = `Glaze: ${glaze}<br/>
                         Qty: ${qty}<br/>
                         Price: ${price}`;
    
    // edit buttons
    let editButton = document.createElement("button");
    editButton.textContent = "EDIT";
    editButton.setAttribute("id", "edit");
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "DELETE";
    deleteButton.setAttribute("id", "delete");
    deleteButton.onclick = function () {
        
        // target deleted item's index
        let deleteKey = this.parentNode.id.split("^");
        let deleteIndex = cartArray.findIndex((item) => (item.name === deleteKey[0]) 
                                                    && (item.glaze === deleteKey[1]) 
                                                    && (item.qty === deleteKey[2]));
        cartArray.splice(deleteIndex, 1);
        
        // delete from model
        setCart();
        // delete item from view
        deleteItem(this.parentNode);
    };

    // attach all child nodes
    itemDiv.appendChild(infoDiv);
    itemDiv.appendChild(editButton);
    itemDiv.appendChild(deleteButton);

    // return div
    return itemDiv;
}

// Loads up all stored items in cart
function loadCartItems(){
    // parent node
    const cartItemList = document.getElementById("itemList");

    // iterate through each item => turn into a block item => add to display item list 
    cartArray.forEach((cartTag) => {
        let cartBlock = CartItemTemplate(cartTag.name, cartTag.glaze, cartTag.qty, cartTag.price, cartTag.imgUrl);
        cartItemList.appendChild(cartBlock);
    })
}

function TurnOnItemPage() {
    const menu = document.getElementById("mainMenu");
    menu.style.display = "none";
    console.log("Menu Disappear, Item pop up~");
}


let cartSwitch = false;


function openCart() {
    const cartLogo = document.getElementById("theCartLogo");
    const menu = document.getElementById("mainMenu");
    const cartList = document.getElementById("cartDisplay");

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
    const cartLogo = document.getElementById("theCartLogo");
    const menu = document.getElementById("mainMenu");
    const cartList = document.getElementById("cartDisplay");

    if (!cartSwitch) {
        cartLogo.src = "../Imgs/Buttons/Cart_CheckOut.svg";
        menu.style.gridTemplateAreas = "'roll_1 roll_2 roll_3 roll_4 .' 'roll_5 roll_6 roll_7 roll_8 .'";
        menu.style.gridAutoColumns = "2fr 2fr 2fr 2fr 1fr";
        //layout.style.gridTemplateAreas = "'header header openCart' 'content content 0penCart'";
        //layout.style.gridTemplateColumns = "3fr 3fr 1fr";

        cartList.style.display = "grid";
    } else {
        cartLogo.src = "../Imgs/CartBun_cart_icon.svg";
        menu.style.gridTemplateAreas = "'roll_1 roll_2 roll_3 roll_4' 'roll_5 roll_6 roll_7 roll_8'";
        menu.style.gridAutoColumns = "1fr 1fr 1fr 1fr";

        //layout.style.gridTemplateAreas = "'header header header' 'content content content'";
        //layout.style.gridTemplateColumns = "1fr 1fr 1fr";
        cartList.style.display = "none";
    }

    cartSwitch = !cartSwitch;
}

function ZipCodeInput() {
    const banner = document.getElementById("banner");
    console.log(banner);
}

// update item qty after qty seel
function ChangeImg(i) {
    const pic = document.getElementById("itemPic");
    if (i === 1){
        pic.src = "../Imgs/RollPics/count1.svg";
    }

    else if (i === 3){
        pic.src = "../Imgs/RollPics/count3.svg"
    }

    
    else if (i === 6){
        pic.src = "../Imgs/RollPics/count6.svg"
    }
    
    else if (i === 12){
        pic.src = "../Imgs/RollPics/count12.svg"
    }
}

// update item picture after glaze selection
function ChangeGlaze(value) {
    const pic = document.getElementById("itemPic");

    if (value=== "None"){
        pic.src="../Imgs/RollPics/glaze_none.svg"
    }
    else if (value=== "Sugar-Milk"){
        pic.src="../Imgs/RollPics/glaze_sugarMilk.svg"
    }
    else if (value=== "Vanilla-Milk"){
        pic.src="../Imgs/RollPics/glaze_vinillaMilk.svg"
    }    
    else if (value=== "Double-chocolate"){
        pic.src="../Imgs/RollPics/glaze_doubleChoco.svg"
    }
}