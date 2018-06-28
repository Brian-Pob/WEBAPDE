//variables are declared globally and can be accessed directly.
var entry = 0;

function store(numA){
  entry += numA;
}

//for more traditional developers more use to file segregation. Functions
//may be used.
function getEntry(){
  return entry;
}
