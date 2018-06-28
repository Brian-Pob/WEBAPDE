var totalPrice = 0;

function updateList() {
    var itemList = document.getElementById("itemList");
    
    var itemName = document.getElementById("itemInput").value.toString();
    
    var itemPrice = Number(document.getElementById("priceInput").value);
    
    var itemQty = document.getElementById("qtyInput").value;
    
    var totalItemPrice = itemPrice * itemQty;
    totalPrice += totalItemPrice;
    var itemString = itemName + " $" + itemPrice.toString() + " x" + itemQty.toString() + " $" + totalItemPrice.toString();
    var entry = document.createElement("li");
    entry.appendChild(document.createTextNode(itemString));
    itemList.appendChild(entry);
    
    document.getElementById("total").innerHTML = totalPrice;
}