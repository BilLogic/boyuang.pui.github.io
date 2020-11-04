// Helper Function that create and fill in the information on Item Description Page
import {AddImgTemplate} from "../main"

export function checkoutListTemplate(name, glaze, qty, price, imgUrl) {
    console.log("CheckoutListTemplate got called");
    // create the tr wrapper
    const newRow = document.createElement("tr");

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
    priceTD.innerHTML = `${price}`;


    // set up qty TD
    let qtyDiv = document.createElement("div");
    let qtyParagraph = document.createElement("p");
    qtyParagraph.innerHTML = `${qty}`;
    const buttonUp = document.createElement("button");
    buttonUp.setAttribute("id", "Qty_Up");
    const buttonDown = document.createElement("button");
    buttonDown.setAttribute("id", "Qty_Down");
    // assemble the qty TD
    qtyDiv.appendChild(bottomUp);
    qtyDiv.appendChild(qtyParagraph); 
    qtyDiv.appendChild(bottomDown);
    // insert div to the item TD
    qtyTD.appendChild(qtyDiv);


    // set up glaze TD
    let glazeDiv = document.createElement("div");
    let glazeParagraph = document.createElement("p");
    qtyParagraph.innerHTML = `${glaze}`;
    const buttonPrev = document.createElement("button");
    buttonPrev.setAttribute("id", "Glaze_Prev");
    const buttonNext = document.createElement("button");
    buttonNext.setAttribute("id", "Glaze_Next");
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
    totalParagraph.innerHTML = `${rowTotal}`;
    const buttonDel = document.createElement("button");
    buttonDel.setAttribute("id", "In_Delete_btn");
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
