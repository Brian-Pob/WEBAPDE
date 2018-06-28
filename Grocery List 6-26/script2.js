var totalPrice = 0;

function updateList() {
    var itemList = document.getElementById("itemList");

    var itemName = document.forms["main-form"]["item"].value;
    var itemPrice = document.forms["main-form"]["price"].value;
    var itemQty = document.forms["main-form"]["qty"].value;
    var totalItemPrice = itemPrice * itemQty;

    totalPrice += totalItemPrice;

    var itemString = itemName + " $" + itemPrice + " x" + itemQty + " $" + totalItemPrice;
    var entry = document.createElement("li");
    entry.appendChild(document.createTextNode(itemString));
    itemList.appendChild(entry);

    document.getElementById("total").innerHTML = totalPrice;

    return false; //must return somehting
}
