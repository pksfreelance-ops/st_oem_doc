// 2008-0701  width of window made dynamically, wolfgang.schrader@siemens.com


// puts the selected value into the search form
function UpdateText(listbox,textbox) {	
var urform=window.opener.top.search.document.getElementsByName("searchPdm")[0];
  obj=urform[textbox];
  obj.value = listbox.options[listbox.selectedIndex].text;
 // alert(obj.value);
  self.close();
} 
function AssembleEntry() {
  // alert('loading elements');
	var maxOptionLength=0;
	var selObj=document.getElementsByTagName("select")[0];
	for(i=0;i<selObj.options.length;i++) {
		maxOptionLength= Math.max(selObj.options[i].text.length,maxOptionLength);
	}
	window.resizeTo(Math.max(maxOptionLength * 7 + 100,130),250);
	
//  var itemshow=window.location.search.substring(1).split("=")[1];
//  document.getElementById(itemshow).style.display="block";
} 