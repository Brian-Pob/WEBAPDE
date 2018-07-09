var boxCount = 0;
function addBox(){
    
    var boxList = document.getElementById("boxlist");
    
    var entry = document.createElement("li");
    
    var boxDiv = document.createElement("div");
    
    boxDiv.innerHTML = boxCount;
    entry.appendChild(boxDiv);
    
    boxList.appendChild(entry);
    boxCount++;
}