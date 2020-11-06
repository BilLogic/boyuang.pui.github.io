import { inCheckoutDelete, inCheckoutEdit } from '../main';

// Helper Function that create and fill in the information on Item Description Page
export function checkoutListTemplate(name, glaze, qty, price, imgUrl) {
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