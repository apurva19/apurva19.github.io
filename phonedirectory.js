window.onload=function()
{
var quickAddBtn = document.getElementById('QuickAdd');
var quickAddFormDiv = document.querySelector('.quickaddForm');
var cancelBtn = document.getElementById('Cancel');
var AddBtn = document.getElementById('Add');
var frm = document.querySelector('.addbook1');

var fullname = document.getElementById('fullname');
var phone = document.getElementById('phone');

var addBookDiv = document.querySelector('.addbook');

//function to display the form for adding a subscriber
quickAddBtn.addEventListener("click",function() {
	quickAddFormDiv.style.display="block";
	frm.style.display="none";
	quickAddBtn.style.display="none";
	addBookDiv.style.display="none";
	document.getElementById('title').innerHTML="ADD SUBSCRIBER";
});

cancelBtn.addEventListener("click",function(){
	quickAddFormDiv.style.display="none";
	frm.style.display="block";
	quickAddBtn.style.display="block";
	addBookDiv.style.display="block";
	document.getElementById('title').innerHTML="PHONE DIRECTORY";
	clearForm();

});
AddBtn.addEventListener("click",addToBook);
addBookDiv.addEventListener("click",removeEntry);

//storage array
var addressBook=[];

function jsonStructure(fullname,phone){
	this.fullname = fullname;
	this.phone = phone;
}
		
function addToBook(){

	frm.style.display="block";
	quickAddBtn.style.display="block";
	addBookDiv.style.display="block";
	document.getElementById('title').innerHTML="PHONE DIRECTORY";

	var isNull = fullname.value!='' && phone.value!='';
	if(isNull){
		//format the input into a valid JSON structure
		var obj = new jsonStructure(fullname.value,phone.value);
		addressBook.push(obj);
		localStorage['addbook']=JSON.stringify(addressBook);
		quickAddFormDiv.style.display="none";
		clearForm();
		showAddressBook();
		
	}
	else{
	frm.style.display="none";
	quickAddBtn.style.display="none";
	addBookDiv.style.display="none";
	document.getElementById('title').innerHTML="ADD SUBSCRIBER";

	}
}


fullname.onkeyup = function(){
	document.getElementById('nm').innerHTML= fullname.value;
}


phone.onkeyup = function(){
	document.getElementById('ph').innerHTML= phone.value;
}

function removeEntry(e){
	//Remove an entry from the phone directory
	if(e.target.classList.contains('delbutton')){
		var remID = e.target.getAttribute('data-id');
		addressBook.splice(remID,1);
		localStorage['addbook']=JSON.stringify(addressBook);
		showAddressBook();
	}
}

function clearForm(){
	var formFields = document.querySelectorAll('.formFields');
	for(var i in formFields){
		formFields[i].value='';
	document.getElementById('nm').innerHTML= '';
	document.getElementById('ph').innerHTML= '';
	
	}
}

function showAddressBook(){
	if(localStorage['addbook'] === undefined){
		localStorage['addbook']="[]";
	}
	else{
		addressBook=JSON.parse(localStorage['addbook']);
		addBookDiv.innerHTML='';
		for(var n in addressBook){
			var str ='<div class ="entry">';
			str+='<div class ="name"><p>'+ addressBook[n].fullname +'</p></div>';
			str+='<div class ="phone"><p>'+ addressBook[n].phone +'</p></div>';
			str+= '<div class="del"><a href="#" class="delbutton" data-id="' + n + '">DELETE</a></div>';
			str+='<div>';
			addBookDiv.innerHTML+=str;

		}
	}
}

	showAddressBook();
}