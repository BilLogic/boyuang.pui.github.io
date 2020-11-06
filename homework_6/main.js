//import { checkoutListTemplate } from './components/checkoutTemplate';

// global variable
let cartArray = [];
let wishListArray = [];

const glazeArray = ["None", "Sugar-Milk", "Vanilla-Milk", "Double-chocolate"];
const qtyArray = ["1", "3", "6", "12"];

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
function AddImgTemplate(parentNode, src, alt, id = null) {
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
    bodyContainer.setAttribute('name', `${roll.itemName}`);

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
    getWishList();
}

// Constructor of cart array items
function CartTag(name, glaze, qty, price, imgUrl){
    this.name = name;
    this.glaze = glaze;
    this.qty = qty;
    this.price = price;
    this.imgUrl = imgUrl;
}

// helper function that keep track of number in cart
function updateNumberTag(){
       //update cart tag number
       let numberTag = document.querySelector("p.number-in-cart");
       numberTag.innerHTML = `${cartArray.length}`;
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
// helper function that loads up all locally stored in cart items
function getCart(){
    const JsonSelectedCartArray = localStorage.getItem("cartArray");
    if (JsonSelectedCartArray === null){
        console.log("got a problem when parsing the cart array!");
    }
    else {
        const parsedCartArray = JSON.parse(JsonSelectedCartArray);
        console.log("Get Cart:" + parsedCartArray);
        cartArray = [...parsedCartArray];
        updateNumberTag();
    }
}


//TODO:
// Function that store the info locally
// this info will get passed into the side wishListArray and check-out page
function setWishListInfo(glaze, qty){
    const JsonSelectedRoll = localStorage.getItem("selectedRoll");
    const parsedSelection = JSON.parse(JsonSelectedRoll);

    // create tag array element object
    const cartTag = new CartTag(parsedSelection.itemName, glaze, qty, parsedSelection.price, parsedSelection.imgUrl);
    // push to array
    wishListArray.push(cartTag);
    console.log(cartTag);
    console.log(wishListArray);
    // create JSON cart array object
    const jsonCartArray = JSON.stringify(wishListArray);
    // store locally
    localStorage.setItem("wishListArray", jsonCartArray);
}
function updateWishList (){
    const glazeField = document.querySelector('input[name="glaze"]:checked');
    const qtyField = document.querySelector('input[name="qty"]:checked');
    // check if both selection are filled
    if (glazeField === null || qtyField === null){
        window.alert("Please finish you glaze and quantity selection~");
    }
    else {
        const glazeValue = glazeField.value;
        const qtyValue = qtyField.value;
        setWishListInfo(glazeValue, qtyValue);
    }
}
// helper function that updates local info about the cart
function setWishList() {
    const jsonCartArray = JSON.stringify(wishListArray);
    // store locally
    localStorage.setItem("wishListArray", jsonCartArray);
}
// helper function that loads up all locally stored in cart items
function getWishList(){
    const JsonSelectedWishListArray = localStorage.getItem("wishListArray");
    if (JsonSelectedWishListArray === null){
        console.log("got a problem when parsing the wishList array!");
    }
    else {
        const parsedWishListArray = JSON.parse(JsonSelectedWishListArray);
        console.log("Get Wish List:" + parsedWishListArray);
        wishListArray = [...parsedWishListArray];
    }
}


// Helper function that is attached to the edit button
function inCartEdit() {
    const mode = document.querySelector("input[name=mode]:checked").id;
    // get info
    let editName, editGlaze, editQty;
    [editName, editGlaze, editQty] = this.parentNode.id.split("^");
    console.log(editName, editGlaze, editQty);
    if (mode === 'cart') {
        // edit index on the local cart array
        let editIndex = cartArray.findIndex((item) => 
                                               (item.name === editName) 
                                            && (item.glaze === editGlaze) 
                                            && (item.qty === editQty));
        // obj index from the default array
        let objIndex = rollInfo.findIndex((item) => item.itemName === editName);
        setDetailInfo(objIndex);

        // delete it from array and set local
        cartArray.splice(editIndex, 1);
        setCart();
    }
    else if (mode === 'wish') {
        // edit index on the local cart array
        let editIndex = wishListArray.findIndex((item) => 
                                               (item.name === editName) 
                                            && (item.glaze === editGlaze) 
                                            && (item.qty === editQty));
        // obj index from the default array
        let objIndex = rollInfo.findIndex((item) => item.itemName === editName);
        setDetailInfo(objIndex);
        // delete it from array and set local
        wishListArray.splice(editIndex, 1);
        setWishList();
    }
    //bring back to specific product page
    window.location.href = ("../htmlPages/Product_detail.html");
}

// Helper function that are attached to the button
function inCartDelete() {
    const mode = document.querySelector("input[name=mode]:checked").id;
        // target deleted item's index
    let deleteKey = this.parentNode.id.split("^");
    if (mode === 'cart') {
            let deleteIndex = cartArray.findIndex((item) => (item.name === deleteKey[0]) 
                                                    && (item.glaze === deleteKey[1]) 
                                                    && (item.qty === deleteKey[2]));
        cartArray.splice(deleteIndex, 1);
        // delete from model
        setCart();
    }
    else if (mode === 'wish') {
        let deleteIndex = wishListArray.findIndex((item) => (item.name === deleteKey[0]) 
                                                    && (item.glaze === deleteKey[1]) 
                                                    && (item.qty === deleteKey[2]));
        wishListArray.splice(deleteIndex, 1);
        // delete from model
        setWishList();
    }
    // delete item from view
    deleteItem(this.parentNode);
}
// Produce SideBar Cart Items
function CartItemTemplate(name, glaze, qty, price, imgUrl) {
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
    editButton.onclick = inCartEdit;
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "DELETE";
    deleteButton.setAttribute("id", "delete");
    deleteButton.onclick = inCartDelete;

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
    // clear cartItemList
    cartItemList.innerHTML="";
    // iterate through each item => turn into a block item => add to display item list 
    cartArray.forEach((cartTag) => {
        let cartBlock = CartItemTemplate(cartTag.name, cartTag.glaze, cartTag.qty, cartTag.price, cartTag.imgUrl);
        cartItemList.appendChild(cartBlock);
    })
    console.log(cartArray);
}

// Loads up all stored items in cart
function loadWishListItems(){
    // parent node
    const wishListItemList = document.getElementById("wishList");
    // clear cartItemList
    wishListItemList.innerHTML="";
    // iterate through each item => turn into a block item => add to display item list 
    wishListArray.forEach((cartTag) => {
        let cartBlock = CartItemTemplate(cartTag.name, cartTag.glaze, cartTag.qty, cartTag.price, cartTag.imgUrl);
        wishListItemList.appendChild(cartBlock);
    console.log(wishListItemList);
    })
    console.log(wishListArray);
}

function calculateTotalCost() {
    if (cartArray.length == 0) {
        return 0;
    }
    else {
        let rawTotal = cartArray.map(cartTag => cartTag.price * cartTag.qty).reduce((a, b) => (a + b));
        return rawTotal;
    }
}
function calculateTotal() {
    let rawTotal = calculateTotalCost();
    let shippingCost = 0;
    let CouponCode = 0;
    let finalTotal = (rawTotal + shippingCost) * (1 - CouponCode);

    const subTotal = document.querySelector("p#d1");
    subTotal.innerHTML = `<span>${rawTotal}</span>`;
    const shippingFee = document.querySelector("p#d2");
    shippingFee.innerHTML = `<span>${shippingCost}$</span>`;
    const discount = document.querySelector("p#d3");
    discount.innerHTML = `<span>${CouponCode}</span>`
    const grandTotal = document.querySelector("p#d4");
    grandTotal.innerHTML =`<span>${finalTotal}</span>`
}

// Loads up all stored item in the check out page display format
function loadCartItemsToFinalCheckout(){
    // parent node
    const tableBodyContainer = document.querySelector("#itemTableBody");

    // clear cartItemList
    tableBodyContainer.innerHTML="";
    // iterate through each item => turn into a block item => add to display item list 
    cartArray.forEach((cartTag) => {
        let newTableRow = checkoutListTemplate(cartTag.name, cartTag.glaze, cartTag.qty, cartTag.price, cartTag.imgUrl);
        tableBodyContainer.appendChild(newTableRow);
    })

    calculateTotal()
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
    const cartDisplay = document.getElementById("cartDisplay");
    const mode = document.querySelector("input[name=mode]:checked").id;
    const cartList = document.getElementById("itemList");
    const wishList = document.getElementById("wishList");
    const totalPrice = document.getElementById('totalPrice');
    if (!cartSwitch) {
        cartLogo.src = "../Imgs/Buttons/Cart_CheckOut.svg";
        menu.style.gridTemplateAreas = "'roll_1 roll_2 roll_3 .' 'roll_4 roll_5 roll_6 .'";
        menu.style.gridAutoColumns = "3fr 3fr 3fr 0fr";
        cartDisplay.style.display = "grid";
        menu.style.justifySelf = 'start';
        // display cart
        if (mode === 'cart') {
            cartList.style.display = "block";
            wishList.style.display = "none";
        }
        else if (mode === 'wish') {
            wishList.style.display = "block" ;
            cartList.style.display = "none";
        }
        // calculate the total cost
        totalPrice.innerHTML = `Total Cost: ${calculateTotalCost()}$`;
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
    const cartLogo = document.getElementById("theCartLogo");
    const menu = document.getElementById("mainMenu");
    const cartList = document.getElementById("cartDisplay");

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

// 3. link with the local array + set array

const stateArray = ["Add to Cart", "Allergy", "glaze:<br/>", "qty:<br/>", "Confirm?"];

/******Drag Function */
let startX = null;
let menuTagManager = {
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
function resetMenuTagManger(){
    menuTagManager.rollDiv = null;
    menuTagManager.cartDiv = null;
    menuTagManager.target = null;
    menuTagManager.textIndex = 0;
    menuTagManager.glaze = null;
    menuTagManager.qty = null;
    menuTagManager.rollInfoIndex = null;
}
function checkMenuTagTarget(newTarget){
    let newRollDiv = newTarget.parentNode.parentNode;
        // target changed
    if (menuTagManager.textIndex > 0){
        if (newRollDiv.className != menuTagManager.rollDiv.className){
            console.log("Target Changed!");
            // reset current Obj
            updateMenuTag(menuTagManager.cartDiv, 0);
            resetMenuTagManger();
        }
    }
}


function setMenuTagManager(){
    const stateIndex = menuTagManager.textIndex;
    if (stateIndex === 0){
        // set obj info
        menuTagManager.rollInfoIndex = menuTagManager.rollDiv.className[5];
        //console.log(menuTagManager.rollInfoIndex);
        // store current selection locally
        setDetailInfo(menuTagManager.rollInfoIndex);
    }

    else if (stateIndex === 2){
        // set glaze
        let glazeSelection = document.getElementById("menu-glaze-selection").value;
        menuTagManager.glaze = glazeSelection;
    }
    else if (stateIndex === 3){
        // set qty
        let qtySelection = document.getElementById("menu-qty-selection").value;
        menuTagManager.qty = Number(qtySelection);
    }
    console.log(menuTagManager);
}

// dragstart handler if (menuTagManager.textIndex != 0){
function dragStart(e, target) {
    menuTagManager.target = target;
    // check if target has changed
    checkMenuTagTarget(target);
    startX = e.offsetX;
    menuTagManager.cartDiv = target.parentNode;
    menuTagManager.rollDiv = target.parentNode.parentNode;
}

// dragend handler
function dragEnd(e, target) {
    const thresholdX = target.width * 2;

    let endX = e.offsetX;
    let changeX = endX - startX;
    if (changeX < thresholdX){
        target.style.left = "-21%";
        //console.log("Not enough!");
    } else {
        target.style.left = "100%";
        //console.log("You made it!");
        updateMenuTag(target.parentNode, 1);
    }
}

// Helper function that fabricate add to cart tags
function menuTagTemplate(obj){
    let textIndex = obj.textIndex;
    let parent = obj.rollDiv;
    // create main div
    let mainDiv = document.createElement("div");
    mainDiv.className = "cart";

    // create drag button
    let dragButton = document.createElement("img");
    dragButton.setAttribute("src", "../Imgs/Buttons/double-arrow.png");
    dragButton.setAttribute("alt", "button");
    dragButton.setAttribute("ondragStart", "dragStart(event, this)");
    dragButton.setAttribute("ondragend", "dragEnd(event, this)");
    mainDiv.appendChild(dragButton);

    // create info test
    // Back to cart
    if (textIndex === 0){
        let initP = document.createElement("p");
        initP.innerHTML = stateArray[textIndex];
        mainDiv.appendChild(initP);
    }

    // Add to cart =>  Allergy
    else if (textIndex === 1){
        let infoP = document.createElement("p");
        infoP.innerHTML = stateArray[textIndex];
        mainDiv.appendChild(infoP);
    }

    // allergy => glaze
    else if (textIndex === 2){
        let glazeDiv = document.createElement("div");
        glazeDiv.className = "glaze";
        glazeDiv.innerHTML = `
        <label for="glaze">${stateArray[textIndex]}</label>
        <select name="glaze" id="menu-glaze-selection">
            <option value="None">None</option>
            <option value="Sugar-Milk">Sugar-Milk</option>
            <option value="Vanilla-Milk">Vanilla-Milk</option>
            <option value="Double-chocolate">Double-chocolate</option>
        </select>`
        mainDiv.appendChild(glazeDiv);
    }

    // glaze => qty
    else if (textIndex === 3){
        let qtyDiv = document.createElement("div");
        qtyDiv.className = "qty";
        qtyDiv.innerHTML = `
        <label for="qty">${stateArray[textIndex]}</label>
        <select name="qty" id="menu-qty-selection">
            <option value="1">One</option>
            <option value="3">Three</option>
            <option value="6">Six</option>
            <option value="12">Twelve</option>
        </select>`
        mainDiv.appendChild(qtyDiv);
    }

    else if (textIndex === 4){
        let doneDiv = document.createElement("div");
        doneDiv.innerHTML = `
        <button onclick="setCartInfo(menuTagManager.glaze, menuTagManager.qty);
                         getCart();
                         openCart();
                         loadCartItems();
                         resetMenuTagManger();">
                         ${stateArray[textIndex]}
                         </button>`
        mainDiv.appendChild(doneDiv);
    }

    // update menuTagManager info
    menuTagManager.cartDiv = mainDiv;
    // attach to parent
    parent.appendChild(mainDiv);
}


// Swipe Event Handler
function updateMenuTag(prevTag, step){
    //move to next
    if (menuTagManager.textIndex<4 && step===1){
    //collect data if necessary
    // load to local storage
    setMenuTagManager();
    // update state
    menuTagManager.textIndex++;
    //delete old node
    deleteItem(prevTag);
    //append new node
    menuTagTemplate(menuTagManager);
    }
    // reset
    else if(step === 0){
        deleteItem(prevTag);
        menuTagManager.textIndex = 0;
        menuTagTemplate(menuTagManager);
    }
}

//TODO: Make the load available across all pages

/**************        * CHECK OUT PAGE LOADING ********* */

function checkoutListTemplate(name, glaze, qty, price, imgUrl) {
    console.log("CheckoutListTemplate got called");
    // create the tr wrapper
    const newRow = document.createElement("tr");
    newRow.setAttribute("id", `${name}^${glaze}^${qty}`);

    // create the td under tr
    const itemTD = document.createElement("td");
    itemTD.setAttribute("scope", "row");
    const priceTD = document.createElement("td");
    const qtyTD = document.createElement("td");
    const glazeTD = document.createElement("td");
    const totalTD = document.createElement("td");

    // set up item TD
    let itemDiv = document.createElement("div");
    let rollPic = document.createElement("img");
    rollPic.setAttribute("src", imgUrl);
    let rollName = document.createElement("p");
    rollName.innerHTML = `${name}`;
    itemDiv.appendChild(rollPic);
    itemDiv.appendChild(rollName);

    // insert div to the item TD
    itemTD.appendChild(itemDiv);

    // set up price TD
    priceTD.innerHTML = `<span>${price}$</span>`;


    // set up qty TD
    let qtyDiv = document.createElement("div");
    let qtyParagraph = document.createElement("p");
    qtyParagraph.innerHTML = `<span>${qty}</span>`;
    const buttonUp = document.createElement("button");
    buttonUp.setAttribute("id", "Qty_Up");
    if (qty != 12) {
        buttonUp.setAttribute('class', "active");
        buttonUp.onclick = inCheckoutEdit;
    }
    else {
        buttonUp.setAttribute('class', "in-active");
    }

    const buttonDown = document.createElement("button");
    buttonDown.setAttribute("id", "Qty_Down");
    if (qty != 1) {
        buttonDown.setAttribute('class', "active");
        buttonDown.onclick = inCheckoutEdit;
    }
    else {
        buttonDown.setAttribute('class', "in-active");
    }

    // assemble the qty TD
    qtyDiv.appendChild(buttonUp);
    qtyDiv.appendChild(qtyParagraph);
    qtyDiv.appendChild(buttonDown);
    // insert div to the item TD
    qtyTD.appendChild(qtyDiv);


    // set up glaze TD
    let glazeDiv = document.createElement("div");
    let glazeParagraph = document.createElement("p");
    glazeParagraph.innerHTML = `<span>${glaze}</span>`;
    const buttonPrev = document.createElement("button");
    buttonPrev.setAttribute("id", "Glaze_Prev");
    buttonPrev.setAttribute('class', "active");
    buttonPrev.onclick = inCheckoutEdit;

    const buttonNext = document.createElement("button");
    buttonNext.setAttribute("id", "Glaze_Next");
    buttonNext.setAttribute('class', "active");
    buttonNext.onclick = inCheckoutEdit;

    // assemble the qty TD
    glazeDiv.appendChild(buttonPrev);
    glazeDiv.appendChild(glazeParagraph); 
    glazeDiv.appendChild(buttonNext);
    // insert div to the item TD
    glazeTD.appendChild(glazeDiv);

    // set up total TD
    let totalDiv = document.createElement("div");
    let totalParagraph = document.createElement("p");
    let rowTotal = qty * price;
    totalParagraph.innerHTML = `<span>${rowTotal}$</span>`;
    const buttonDel = document.createElement("button");
    buttonDel.setAttribute("id", "In_Delete_btn");
    buttonDel.onclick = inCheckoutDelete;

    // assemble the total TD
    totalDiv.appendChild(totalParagraph); 
    totalDiv.appendChild(buttonDel);
    // insert div to the item TD
    totalTD.appendChild(totalDiv);

    // assemble the table row
    newRow.appendChild(itemTD);
    newRow.appendChild(priceTD);
    newRow.appendChild(qtyTD);
    newRow.appendChild(glazeTD);
    newRow.appendChild(totalTD);

    // return the assembled newRow
    console.log(newRow);
    return(newRow);
}



function inCheckoutDelete() {
        // target deleted item's index
    const deleteNode = this.parentNode.parentNode.parentNode;
    console.log(deleteNode);
    let deleteKey = deleteNode.id.split("^");
    let deleteIndex = cartArray.findIndex((item) => (item.name === deleteKey[0]) 
                                                && (item.glaze === deleteKey[1]) 
                                                && (item.qty === deleteKey[2]));
    cartArray.splice(deleteIndex, 1);
    // delete from model
    setCart();
    // delete item from view
    deleteItem(deleteNode);
}



function inCheckoutEdit(event) {
        // target deleted item's index
    const commandID = event.target.id;
    const editNode = this.parentNode.parentNode.parentNode;
    let editKey = editNode.id.split("^");
    let editIndex = cartArray.findIndex((item) => (item.name === editKey[0]) 
                                                && (item.glaze === editKey[1]) 
        && (item.qty === editKey[2]));
    let editItem = cartArray[editIndex];
    let replaceItem = { ...editItem };
    console.log("Original item:", editItem);
    
    console.log("Original Array:", cartArray);
    let GlazeIndex = glazeArray.findIndex(glaze => (glaze === editItem.glaze));
    let QtyIndex = qtyArray.findIndex(qty => (qty === editItem.qty));
    // Case 1: Decrease Qty if necessary
    if (commandID === "Qty_Down") {
        if (QtyIndex !== 0) {
            QtyIndex = ((QtyIndex - 1) % qtyArray.length);
        }
        else {
            // no update => just skip
            return;
        }
    }

    // Case 2: Increase Qty if necessary
    else if (commandID === "Qty_Up") {
        if (QtyIndex !== (qtyArray.length - 1)){
            QtyIndex = (QtyIndex + 1) % qtyArray.length;
        }
        else {
            // no update => just skip
            return;
        }
    }
    // Case 3: Prev Glaze circularly
    else if (commandID === "Glaze_Prev") {
        GlazeIndex = ((GlazeIndex - 1) % glazeArray.length);
        if (GlazeIndex < 0) {
            GlazeIndex = 3;
            console.log("Stupid JS modular arith");
        }
    }
    // Case 4: Next Glaze circularly
    else if (commandID === "Glaze_Next") {
        GlazeIndex = (GlazeIndex + 1) % glazeArray.length;
    }

    // reset Qty & Glaze & ID
    let newGlaze = glazeArray[GlazeIndex];
    let newQty = qtyArray[QtyIndex];
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
    const bodyContainer = document.getElementById("description-section");
    const curItemName = bodyContainer.getAttribute('name');
    let ogIndex = rollInfo.findIndex((item) => item.itemName === curItemName);
    let newIndex = ((ogIndex - 1) % rollInfo.length);
    if (newIndex === 0) {
        newIndex = rollInfo.length-1;
    }
    // set newDetail Info
    setDetailInfo(newIndex);
    location.reload();
}

// function that make large carousel swap avaiable [Prev]
function switchToNextItem() {
    const bodyContainer = document.getElementById("description-section");
    const curItemName = bodyContainer.getAttribute('name');
    let ogIndex = rollInfo.findIndex((item) => item.itemName === curItemName);
    let newIndex = ((ogIndex + 1) % rollInfo.length);
    if (newIndex === 0) {
        newIndex = 1;
    }
    // set newDetail Info
    setDetailInfo(newIndex);
    location.reload();
}