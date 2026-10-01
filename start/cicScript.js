var tempfile=new String();
tempfile='';
var lastSearched=new String();
lastSearched='';
var lastSearchedTable='';
var lastrow='';
var ocFlag=false;
var ocFlagOld;

function init(pName) {
openRoot();
document.all.xmlBody.style.display="block";
}

function showHelp() { window.open("help.htm","_help");  }
												
function toggleFolder2(iddoc,idrow) {
	ocFlagOld=ocFlag;
	ocFlag=true;
//	closeAll();				funktioniert nicht - sr
	idrow.style.backgroundColor="lightblue";
	if ( (lastrow!='') && (lastrow!=idrow) ) {
		lastrow.style.backgroundColor="lightyellow";
	}
	lastrow=idrow;
	
	if (lastSearchedTable!=''){
		if (iddoc!=lastSearchedTable){
			document.getElementById(iddoc).firstChild.nextSibling.alt="closed";
			lastSearchedTable=iddoc;
			toggleFolder(iddoc);
		}
	} else {
		lastSearchedTable=iddoc;
		toggleFolder(iddoc);
	}
	ocFlag=ocFlagOld;
}
														
function toggleFolder(iddoc) {
	if (document.getElementById(iddoc)==null){
		alert("The searched document does not exist.")
		return;
	}
   else {
   	toggleFolderObj(document.getElementById(iddoc));
   	}
}

function toggleFolderObj(idtemp) {
//	alert();
	if (tempfile!='') {
		tempfile.style.color="navy";
	}
	tempfile=idtemp;
	// idtemp.style.color="red";
	if (idtemp.className=="files") {		// ist Dokument
		var idd=idtemp.parentNode.previousSibling;
	}
	else {
		var idd=idtemp;
	}
   if(!idd.firstChild) return;
   
	var imgObj=idd.firstChild.nextSibling;
	if ( /closed/.test(imgObj.alt) || idd.className=="files") {
//         if(ocFlag) {
         closeRoot();
			idtemp.style.fontWeight="bold";
			if (lastSearched!='' && lastSearched.last=="no") {
				lastSearched.firstChild.nextSibling.alt="closed";
				lastSearched.firstChild.src="images/plus_notlast.gif";
			} else if (lastSearched!='' && lastSearched.last=="yes" && lastSearched.className!="root") {
				lastSearched.firstChild.nextSibling.alt="closed";
				lastSearched.firstChild.src="images/plusbottom.gif";
			}
//		   }
  		lastSearched=idd;
  		imgObj.alt = "open";
  		
  		if (idd.className!="root" && idd.last=="no"){
			idd.firstChild.src= "images/minus_notlast.gif";
		}else if (idd.className!="root" && idd.last=="yes"){
			idd.firstChild.src= "images/minusbottom.gif";
		}else{
			idd.firstChild.src= "images/minusonly.gif";
		}
 		idd.nextSibling.style.display="block";
  		openParent(idd);
  	}
	else {
	idtemp.style.fontWeight="normal";
	imgObj.alt="closed";
	if (idd.className!="root" && idd.last=="no"){
	idd.firstChild.src= "images/plus_notlast.gif";
	}else if (idd.className!="root" && idd.last=="yes"){
	idd.firstChild.src= "images/plusbottom.gif";
	}
	else{
	idd.firstChild.src= "images/plusonly.gif";
	}
    lastSearched.firstChild.nextSibling.alt="closed";
  	if (lastSearched.className!="root" && idd.last=="no"){
	lastSearched.firstChild.src="images/plus_notlast.gif";
	}else if (lastSearched.className!="root" && idd.last=="yes"){
	lastSearched.firstChild.src="images/plusbottom.gif";
	} else {
	lastSearched.firstChild.src="images/plusonly.gif";
	}
  	if (idd.nextSibling.className=="branch"){
  		idd.nextSibling.style.display="none";
   	}
  }
}

function openParent(idd) {
	if (idd.className!="root") {
  		var parnode=idd.parentNode;
  		parnode.style.display="block";
  		parnode.previousSibling.firstChild.nextSibling.alt="open";
  	
  		if (parnode.previousSibling.className!="root" && parnode.previousSibling.last=="no"){
  			parnode.previousSibling.firstChild.src="images/minus_notlast.gif";
		}else if(parnode.previousSibling.className!="root" && parnode.previousSibling.last=="yes"){
  			parnode.previousSibling.firstChild.src="images/minusbottom.gif";
		}
  	  	openParent(parnode.previousSibling);
  	} else if (idd.className=="root") {
  		idd.firstChild.src="images/minusonly.gif";
  	}
}


function openRoot(){
	divs=document.getElementsByTagName("div");
	for(i=0;i<divs.length;i++) {
  	  if (divs[i].className=="root") { toggleFolder(divs[i].id);  }
  	}
}

function closeRoot() {
	if (lastSearched!=''){
		if (lastSearched.className!="root" && lastSearched.last=="no"){
			lastSearched.firstChild.src="images/plus_notlast.gif";
		}else if (lastSearched.className!="root" && lastSearched.last=="yes"){
			lastSearched.firstChild.src="images/plusbottom.gif";
		} else {
		lastSearched.firstChild.src="images/plusonly.gif";
		}
		lastSearched.firstChild.nextSibling.alt = "closed";
		lastSearched.style.fontWeight="normal";
		lastSearched.nextSibling.style.display="none";
		closeParent(lastSearched);
	}
}

function closeParent(idd) {
	if (idd.className!="root") {
		var parnode=idd.parentNode;
		parnode.style.display="none";
  		parnode.previousSibling.firstChild.nextSibling.alt="closed";
  	
  		if (parnode.previousSibling.className!="root" && parnode.previousSibling.last=="no"){
			parnode.previousSibling.firstChild.src="images/plus_notlast.gif";
		}else if (parnode.previousSibling.className!="root" && parnode.previousSibling.last=="yes"){
			parnode.previousSibling.firstChild.src="images/plusbottom.gif";
		} else {
			parnode.previousSibling.firstChild.src="images/plusonly.gif";
		}
  		closeParent(parnode.previousSibling);
  	} else {
  		idd.firstChild.nextSibling.alt="closed";
  		idd.firstChild.src="plusonly.gif";
  	}
}

function closeAll() {
	divs=document.getElementsByTagName("div");
	for(i=0;i<divs.length;i++) {
  	  if (divs[i].className=="root") {
  	  	 closeChildNodes(divs[i]);   		
  	  	  	}
  	}	
}								

function closeChildNodes(childObj) {
for(i=0;i<childObj.childNodes.length;i++) {
	if(childObj.childNodes[i].alt=="open") toggleFolderObj(childObj.childNodes[i]);
	if(childObj.childNodes[i].length) {
//	   alert(childObj.childNodes[i].length);
//		closeChildNodes(childObj.childNodes[i]);
	}
   }
}
function searchDoc(){
	docsearch=prompt('Which document are you looking for? type its idDoc..',"idDoc");
	toggleFolder(docsearch);
}

function getAttributeName(nm) {
if(typeof(top.attributeNames[nm]) != "undefined") {
	attr = top.attributeNames[nm][top.languageAbbr][1];
	if(attr=="")  attr = top.attributeNames[nm]["en"][1];
	
	return attr;
}
else return "";
}
function getAttributeIndex(nm) {
if(typeof(top.attributeNames[nm]) != "undefined") {
	return top.attributeNames[nm][top.languageAbbr][0];
}
else return "0";
}
	var appendFromNodes = function(object, nodes) {
        for (var index in nodes) {
            var childNode = nodes[index];

            if (childNode.nodeName) {
               object[childNode.nodeName] = childNode.textContent;
            }
        }
	}

function displayMetadata(docId,docType) {
//if((typeof(docType) != "undefined") && (docType=="DIR")) docId=-1;
//	alert(docType)
var metaArray=new Array();
var indx;

if(!docId) return;
if(docId==-1) {
var metaData="No attributes available<br>Keine Beschreibungsdaten verf&uuml;gbar";
}
else {
var nAgt = navigator.userAgent;
var browserName  = navigator.appName;
var verOffset;
//alert(docId);
var mKeys=new Array();
var attrName;
var metaData='<table><colgroup><col width="150"><col width="*"></colgroup>';
var xPathExpression ="//*[contains(DocumentId,'"+docId+"')]";
var xmlDocument = parent.frames["doc_main"].document.all.XMLnew;
 if (typeof (xmlDocument.selectNodes) != "undefined") { //for IE
	 
   xmlDocument.setProperty("SelectionLanguage", "XPath"); 
  var mKeys = xmlDocument.selectNodes(xPathExpression);
  }
  else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) { //for Firefox
	var xmlDocument=document.implementation.createDocument("","",null);
	xmlDocument.async = false;
	xmlDocument.load("XMLnew.xml");
	var XPathResults = xmlDocument.evaluate(xPathExpression,xmlDocument,null,XPathResult.ANY,null);
	var result = XPathResults.iterateNext();
	while (result) {
    mKeys.push(result);
    result = XPathResults.iterateNext();
   }	
  }
  else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) //for Chrome
  {	var xmlhttp = new window.XMLHttpRequest(); 
	xmlhttp.open("GET", "XMLnew.xml", false); 
	xmlhttp.send(null); 
	xmlDocument = xmlhttp.responseXML.documentElement;
	var XPathResults = document.evaluate(xPathExpression,xmlDocument,null,XPathResult.ANY,null);
	var result = XPathResults.iterateNext();
	while (result) {
    mKeys.push(result);
    result = XPathResults.iterateNext();
   }
  }
	
	
  
  
for(i=0;i<mKeys[0].childNodes.length;i++) {
	attrName=getAttributeName(mKeys[0].childNodes[i].nodeName);
	if(attrName=="") continue;
	indx=getAttributeIndex(mKeys[0].childNodes[i].nodeName);
	
	metaData="<tr><td class='metadata'>"+attrName+"</td><td class='metadata'>";
	metaData+= mKeys[0].childNodes[i].childNodes.length==0  ?  "----" : mKeys[0].childNodes[i].childNodes[0].nodeValue  ;
	metaData+="</td></tr>";
	metaArray[indx]=metaData;
    }
    metaData='<table><colgroup><col width="150"><col width="*"></colgroup>'+metaArray.join("")+"</table>";

}
parent.frames["search"].document.getElementById("tcontent2").innerHTML=metaData;
parent.frames["search"].expandtab("maintab",1);
}
