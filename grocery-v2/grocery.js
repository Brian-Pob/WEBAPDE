var ItemClass = function(food,price){
    this.food = food;
    this.price = price;
    this.qty = 0;
}

var list = [
    new ItemClass("Fish",120),
    new ItemClass("Chicken",150),
    new ItemClass("Pork",170),
    new ItemClass("Beef",90),
    new ItemClass("Aligator",200)
];

function addItem(){
    const indexItem = Number(document.forms['main-form']['food-fld'].value);
    const numQty = Number(document.forms['main-form']['qty-fld'].value);
    
    list[indexItem].qty += numQty;
    var allContent = '<div class="quarter">'+
        '<div>Item</div>'+
        '<div>Price</div>'+
        '<div>Quantity</div>'+
        '<div>Total</div></div>';
    var allTotal = 0;
    for(var i=0;i<list.length;i++){
        if(list[i].qty > 0){
            const divTotal = list[i].price*list[i].qty;
            const divContent = '<div class="quarter">'+
                '<div>'+list[i].food+'</div>'+
                '<div>'+list[i].price+'</div>'+
                '<div>'+list[i].qty+'</div>'+
                '<div>'+divTotal+'</div>'+
                '</div>';
            allTotal += divTotal;
            allContent += divContent;
        }//if
    }//for
    
    
	document.getElementById('grocery-list').innerHTML = allContent;
    
    document.forms['main-form']['total-fld'].value = allTotal;
  }