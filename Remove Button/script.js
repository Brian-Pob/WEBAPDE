var boxCount = 0;

function addBox(){
    var box = document.createElement("input");
    box.setAttribute("class","createdButton");
    box.setAttribute("onclick", "removeButton(this.value);");
    box.setAttribute("type","button");
    box.setAttribute("value", boxCount);
    
    var boxDiv = document.getElementById("box-div");
    boxDiv.appendChild(box);
    
    boxCount++;
}

function removeButton(value){
    
    var boxes = document.getElementsByClassName("createdButton");
    
    for(var i = 0; i <= boxes.length; i++){
        
        if(boxes[i].getAttribute("value") == value){
            
            document.getElementById("box-div").removeChild(boxes[i]);
            
        }
    }
        
}