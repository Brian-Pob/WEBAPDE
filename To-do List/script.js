
function addToList() {
    
    var itemname = document.forms["main-form"]["todo-name"].value;
    
    document.getElementById("text-area").innerHTML = itemname;
//    document.getElementById("text-area").innerHTML = "Hello";
    //when using forms, function must return false
    
    return false;
}