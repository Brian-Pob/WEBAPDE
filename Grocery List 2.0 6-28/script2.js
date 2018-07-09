var totalPrice = 0;
var itemInventory = {"Crocodile":200, "Beef":90, "Pork":120, "Chicken":150, "Fish":100};
var itemInventoryNum = {"Crocodile":0, "Beef":1, "Pork":2, "Chicken":3, "Fish":4};
var itemInventoryQty = [0,0,0,0,0];
var itemList;
function updatePrice(){
    document.getElementById("priceInput").value = itemInventory[document.getElementById('items').value].toString();
//    alert(itemInventory[document.getElementById('items').value])
    return false;
}

function updateList() {
    itemList = document.getElementById("itemList");
    
    var itemName = document.forms["main-form"]["item"].value;
    var itemPrice = document.forms["main-form"]["price"].value;
    var itemQty = document.forms["main-form"]["qty"].value;
    var totalItemPrice = itemPrice * itemQty;

    totalPrice += totalItemPrice;
    itemInventoryQty[itemInventoryNum[itemName]] += itemQty;
    
    totalItemPrice = totalItemPrice + (itemPrice*itemQty);
    
    var itemString = itemName + " $" + itemPrice + " x" + itemQty + " $" + totalItemPrice;
    var entry = document.createElement("li");
    entry.appendChild(document.createTextNode(itemString));
    itemList.appendChild(entry);

    document.getElementById("total").innerHTML = totalPrice;
    
    return false; //must return somehting
}

//function isInList(itemName) {
//    var listItems = itemList.getElementsByTagName("li");
//    var itemString;
//    for(var i = 0; i < listItems.length; i++){
//        alert("test");
//        if(itemName === listItems[i].innerText.split(" ", 1)){
//            itemString = listItems[i].innerText;
//            
//        }   
//        
//    }
//}

