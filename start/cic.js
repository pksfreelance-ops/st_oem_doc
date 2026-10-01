/*
	cic-specific functions extracted from index page
	by wolfgang.schrader@siemens.com at 2005-02-22
*/

var attributeNames= new Array();
var keywordAmount=new Array();
var languages=new Array();
var languageAbbr="en";

var nvaString="nva";

function Showfile(dir,fil) {
	dir = dir.replace(/\s/g,"");
	fil = fil.replace(/^\s*/,"");
	fil = fil.replace(/\s*$/,"");
	fil=escape(fil);
	fil ="..\/"+ dir + "\/" + fil;
	var winParam='width=' + screen.availWidth + ',height=' + screen.availHeight + ',screenX=0,screenY=0,top=0,left=0,location=yes,menubar=yes,resizable=yes';
//	alert(winParam);
  	parent.anzeige = open(fil, 'anzeige', winParam);
	return false;
}
