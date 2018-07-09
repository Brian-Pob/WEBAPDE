function checkForm(){
    var idString = document.forms["main-form"]["id-field"].value;
	if(!( idString.length==8&&
			Number(idString)%3==0&&
			Number(idString)%9!=0 )){
		alert("ID wrong field");
		return false;
	}
	return true;
  }