var nuovoLayer = '';
var vartempor='';
var folderfile='';
var Keyelements = [];
var k=0;
var matchingKeys=new Array();


var resto=0;
var pagMax=0;
var pagina= 1;
//var numRes=top.search.document.all.searchPdm.numDisp.value;
var xmlDocument;
var structurePath = new Array();
var upper='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var lower='abcdefghijklmnopqrstuvwxyz';

// the following should generate an expression like this:
//         xPathExpression +=  'contains(translate(KfpUasDcc,\''+upper+'\',\''+lower+'\'),\'' + UasDccval + '\')';
//         xPathExpression +=containsTemplate.replace(/__node__/, "KfpUasDcc") + UasDccval + '\')';
var containsTemplate='contains(translate(__node__,\''+upper+'\',\''+lower+'\'),\''


var startPos      = 0;
var deepestEntry;
var arrayFile=new Array();

function printDate() {
var pDate=new Date();
var m= pDate.getMonth() +1;
if(m<10) m="0"+m;
var d=pDate.getDate();
if(d<10) d="0"+d;
var dStr=pDate.getYear()+"-"+m+"-"+d+" "+pDate.getHours()+":"+pDate.getMinutes()+":"+pDate.getSeconds();
return dStr;
}
function reloadPage() {
	location.reload();
}
function printPage() {

w1=window.open("printWindow.htm","printWindow","dependent,scrollbars,width=1000,height=600,resizable");
}
function init () {
 if (document.all && document.all.XMLnew && document.all.XMLnew.XMLDocument)  {  xmlDocument = document.all.XMLnew.XMLDocument;}
 //alert(xmlDocument);
 else
 { var xmlDocument=document.implementation.createDocument("","",null);
xmlDocument.async = false;
xmlDocument.load("XMLnew.xml");
 }
 pagina=1;
}
var kksFilter;

// KAP : add	Original Drawing
function searchKeywords(docid,titleId,Kksvalue,UasDccval,CnsOs1val,CnsOs2val,Unidval,RegNo,SeqNo,Revision,Date,Statusval,CatalogueNo,VolumeIdent,CustomerCode,OriginalDrawing,Variant,OriginatorCompany,numRes,sscope,sscope2) {
for(i=0;i<arguments.length;i++) {
	if(typeof arguments[i]=="string") {
		arguments[i]=arguments[i].toLowerCase();
		if(arguments[i]==top.nvaString) arguments[i]="";
	        }
	}
// KAP : add	Original Drawing
arrayFile=['KfpTitle','KfpUasDcc','KfpKks','KfpCnsOs1','KfpRegNo','KfpUnid','KfpRevision','KfpDate','Status','KfpDrawingCatalogueNo','KfpCustomerCode','KfpOriginalDrawing','KfpVariant','KfpOriginatorCompany','Filename','DocumentType'];
titleFilter=titleId;
kksFilter=Kksvalue;
UasDccFilter=UasDccval;
CnsOsFilter="";
if(/^\w{4}\s/.test(UasDccval)) UasDccFilter=UasDccval.substr(0,4);
if(/^\w{4}\s/.test(CnsOs1val)) CnsOsFilter=CnsOs1val.substr(0,4);
if(CnsOs1val!="" && CnsOs2val!="") CnsOsFilter+=" / ";
if(/^\w{4}\s/.test(CnsOs2val)) CnsOsFilter+=CnsOs2val.substr(0,4);
UnidFilter=Unidval;
RegFilter=RegNo;
SeqFilter=SeqNo;
RevisionFilter=Revision;
DateFilter=Date;
StatusFilter=Statusval;
CatalogueNoFilter=CatalogueNo;
if(CatalogueNo!="" && VolumeIdent!="") CatalogueNoFilter+=" / ";
CatalogueNoFilter+=VolumeIdent;
CustomerCodeFilter=CustomerCode;
// KAP : add	Original Drawing whenever attribiutes are collected
OriginalDrawingFilter=OriginalDrawing;
VariantFilter=Variant;
OriginatorCompanyFilter=OriginatorCompany;


	//	if (xmlDocument && typeof xmlDocument.documentElement.childNodes == 'undefined') return;
      //   xmlDocument.setProperty("SelectionLanguage", "XPath");

     var xPathExpression = '//Position';
     var ParEmpty=1;


      if ( docid=='' && titleId==''&& Kksvalue=='' && Variant=='' && OriginatorCompany=='' && UasDccval=='' && CustomerCode=='' && OriginalDrawing=='' &&VolumeIdent=='' && CnsOs1val=='' && CnsOs2val=='' && CatalogueNo=='' && Unidval=='' && RegNo=='' && SeqNo=='' && Revision=='' && Statusval=='' && Date=='') {
	     	nuovoLayer = '<div style="font-size:16px;font-weight:bold;color:red;">No keywords found, please try again..</div>';
				document.getElementById('layer1').innerHTML=nuovoLayer;
      	return;
      }

      if ( docid!='' || Kksvalue!='' || UasDccval!='' || Variant!='' || OriginatorCompany!='' || CnsOs1val!='' || CustomerCode!='' || OriginalDrawing!='' || VolumeIdent!='' || CnsOs2val!='' || Statusval!='' || CatalogueNo!='' || Unidval!='' || RegNo!='' || SeqNo!='' || Revision!='' || Date!='' || sscope || sscope2) {
        xPathExpression += '[';
      }

	  if(sscope)  xPathExpression +='(DocumentType="VOL" or DocumentType="FIL" or DocumentType="TAB"  ';
	  if(sscope && sscope2) xPathExpression +=' or ';
	  if( !sscope && sscope2) xPathExpression +='(';
	  if(sscope2)  xPathExpression +='DocumentType="TEC" or DocumentType="REP" or DocumentType="CON" or DocumentType="COR" ';

     if (!( docid!='' || Kksvalue!='' || UasDccval!='' || Variant!='' || OriginatorCompany!='' || CnsOs1val!='' || CustomerCode!='' || OriginalDrawing!='' || VolumeIdent!='' || CnsOs2val!='' || Statusval!='' || CatalogueNo!='' || Unidval!='' || RegNo!='' || SeqNo!='' || Revision!='' || Date!='' ) && ( sscope || sscope2) )   xPathExpression += ')]';
      if ( (docid!=''  || Kksvalue!='' || UasDccval!='' || Variant!='' || OriginatorCompany!='' || CnsOs1val!='' || CustomerCode!='' || OriginalDrawing!='' || VolumeIdent!='' || CnsOs2val!='' || Statusval!='' || CatalogueNo!='' || Unidval!='' || RegNo!='' || SeqNo!='' || Revision!='' || Date!='') && ( sscope || sscope2))  xPathExpression +=') and ';

       if (docid!='') {
       	 xPathExpression +=containsTemplate.replace(/__node__/, "DocumentId") + docid + '\')';
         ParEmpty=0;
       }

       if (Kksvalue!='') {
       	 if (ParEmpty==0) {
       		xPathExpression +=  ' and ';
       	 }
         ParEmpty=0;
       	 xPathExpression +=containsTemplate.replace(/__node__/, "KfpKks") + Kksvalue + '\')';
       }

       if (UasDccval!='') {
       	 if (ParEmpty==0) {
       		xPathExpression +=  ' and ';
       	 }
         ParEmpty=0;
       	 xPathExpression +=containsTemplate.replace(/__node__/, "KfpUasDcc") + UasDccval + '\')';
//         xPathExpression +='contains(substring-before(translate(KfpUasDcc,\''+upper+'\',\''+lower+'\')," "),\''+ UasDccval + '\')';
       }

       if (CnsOs1val!='') {
       	 if (ParEmpty==0) {
       		xPathExpression +=  ' and ';
       	 }
         ParEmpty=0;
       	 xPathExpression +=containsTemplate.replace(/__node__/, "KfpCnsOs1") + CnsOs1val + '\')';
       }

       if (CnsOs2val!='') {
       	 if (ParEmpty==0) {
       		xPathExpression +=  ' and ';
       	 }
         ParEmpty=0;
       	 xPathExpression +=containsTemplate.replace(/__node__/, "KfpCnsOs2") + CnsOs2val + '\')';
       }

        if (Unidval!='') {
       	 if (ParEmpty==0) {
       		xPathExpression +=  ' and ';
       	 }
         ParEmpty=0;
       	 xPathExpression +=containsTemplate.replace(/__node__/, "KfpUnid") + Unidval + '\')';
       }

        if (SeqNo!='') {
       	 if (ParEmpty==0) {
       		xPathExpression +=  ' and ';
       	 }
         ParEmpty=0;
       	 xPathExpression +=containsTemplate.replace(/__node__/, "KfpSeqno") + SeqNo + '\')';
       }
         if (RegNo!='') {
       	 if (ParEmpty==0) {
       		xPathExpression +=  ' and ';
       	 }
         ParEmpty=0;
       	 xPathExpression +=containsTemplate.replace(/__node__/, "KfpRegNo") + RegNo + '\')';
       }

        if (Revision!='') {
       	 if (ParEmpty==0) {
       		xPathExpression +=  ' and ';
       	 }
         ParEmpty=0;
       	 xPathExpression +=containsTemplate.replace(/__node__/, "KfpRevision") + Revision + '\')';
       }

        if (Date!='') {
       	 if (ParEmpty==0) {
       		xPathExpression +=  ' and ';
       	 }
         ParEmpty=0;
         xPathExpression +=  'contains(KfpDate,\'' + Date + '\')';
       }

       if (Statusval!='') {
       	 if (ParEmpty==0) {
       		xPathExpression +=  ' and ';
       	 }
         ParEmpty=0;
       	 xPathExpression +=containsTemplate.replace(/__node__/, "Status") + Statusval + '\')';
       }

       if (CatalogueNo!='') {
       	 if (ParEmpty==0) {
       		xPathExpression +=  ' and ';
       	 }
         ParEmpty=0;
       	 xPathExpression +=containsTemplate.replace(/__node__/, "KfpDrawingCatalogueNo") + CatalogueNo  + '\')';
       }

       if (VolumeIdent!='') {
       	 if (ParEmpty==0) {
       		xPathExpression +=  ' and ';
       	 }
         ParEmpty=0;
       	 xPathExpression +='('+containsTemplate.replace(/__node__/, "KfpVolumeIdent") + VolumeIdent + '\') or '+containsTemplate.replace(/__node__/, "KfpFileFolderIdent") + VolumeIdent + '\'))';
       }

       if (CustomerCode!='') {
       	 if (ParEmpty==0) {
       		xPathExpression +=  ' and ';
       	 }
         ParEmpty=0;
       	 xPathExpression +=containsTemplate.replace(/__node__/, "KfpUasDcc") + UasDccval + '\')';
       }

       if (OriginalDrawing!='') {
       	 if (ParEmpty==0) {
       		xPathExpression +=  ' and ';
       	 }
         ParEmpty=0;
       	 xPathExpression +=containsTemplate.replace(/__node__/, "KfpOriginalDrawing") + OriginalDrawing + '\')';
       }



       if (Variant!='') {
       	 if (ParEmpty==0) {
       		xPathExpression +=  ' and ';
       	 }
         ParEmpty=0;
       	 xPathExpression +=containsTemplate.replace(/__node__/, "KfpVariant") + Variant + '\')';
       }

       if (OriginatorCompany!='') {
       	 if (ParEmpty==0) {
       		xPathExpression +=  ' and ';
       	 }
         ParEmpty=0;
       	 xPathExpression +=containsTemplate.replace(/__node__/, "KfpOriginatorCompany") + OriginatorCompany + '\')';
       }

      if ( docid!='' || Kksvalue!='' || UasDccval!='' || Variant!='' || OriginatorCompany!='' || CnsOs1val!='' || CustomerCode!='' || OriginalDrawing!='' || VolumeIdent!='' || CnsOs2val!='' || Statusval!='' || CatalogueNo!='' || Unidval!='' || RegNo!='' || SeqNo!='' || Revision!='' || Date!='') {
        xPathExpression += ']';
      }
//alert(xPathExpression);
     while(Keyelements.length) Keyelements.pop();
  var matchingKeys=new Array();
  var nAgt = navigator.userAgent;
var browserName  = navigator.appName;
var verOffset;
 if (document.all && document.all.XMLnew && document.all.XMLnew.XMLDocument)  {  xmlDocument = document.all.XMLnew.XMLDocument;} //for IE
 //alert(xmlDocument);
 else if ((verOffset=nAgt.indexOf("Firefox"))!=-1)  //for Firefox
 { var xmlDocument=document.implementation.createDocument("","",null);
xmlDocument.async = false;
xmlDocument.load("XMLnew.xml");
 }
 else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) //for Chrome
 {
	 var xmlhttp = new window.XMLHttpRequest(); 
	xmlhttp.open("GET", "XMLnew.xml", false); 
	xmlhttp.send(null); 
	xmlDocument = xmlhttp.responseXML.documentElement;
 }
	 if (typeof (xmlDocument.selectNodes) != "undefined") { //for IE
	 
   xmlDocument.setProperty("SelectionLanguage", "XPath"); 
  var matchingKeys = xmlDocument.selectNodes(xPathExpression);
  }
  else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) { //for Firefox
	var XPathResults = xmlDocument.evaluate(xPathExpression,xmlDocument,null,XPathResult.ANY,null);
	var result = XPathResults.iterateNext();
	while (result) {
    matchingKeys.push(result);
    result = XPathResults.iterateNext();
   }	
  }
  else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) //for Chrome
  {	
	var XPathResults = document.evaluate(xPathExpression,xmlDocument,null,XPathResult.ANY,null);
	var result = XPathResults.iterateNext();
	while (result) {
    matchingKeys.push(result);
    result = XPathResults.iterateNext();
   }
  }
	 
//alert(matchingKeys.length);
     if (titleId!='') {
        titleId=titleId.replace(/^\*/,"");
        titleId=titleId.replace(/\*$/,"");
        titleId=titleId.replace(/\sand\s/i,".*");
        titleId=titleId.replace(/\?/g,".");
//     	alert(titleId)
     	var reg = new RegExp(titleId);
     	var j=0;

      	for (var i = 0; i < matchingKeys.length; i++) {
        if(matchingKeys[i].getElementsByTagName('KfpTitle')[0].firstChild) {
    	    if ( reg.test(matchingKeys[i].getElementsByTagName('KfpTitle')[0].firstChild.nodeValue.toLowerCase())) {
               Keyelements[j] = new Array(matchingKeys[i]);
               j++;
            }
          }
      }

     } else { for (var i = 0; i < matchingKeys.length; i++)  Keyelements[i] = new Array(matchingKeys[i])     	 }

findMultipleElements();

dispElement(numRes);
}

// find multiple used objects
// identical objects are defined by same unid, version and revision data, stored in DocumentId - Entity
function findMultipleElements() {
var DocumentId;
var k;
  for(i=0;i<Keyelements.length;i++) {
  	if(!Keyelements[i][0]) continue;
  	DocumentId=getAttr(Keyelements[i][0],"DocumentId");
  	k=0;
        for(j=i+1;j<Keyelements.length;j++) {
          if(DocumentId == getAttr(Keyelements[j][0],"DocumentId")) {
            k++;
            Keyelements[i][k]=Keyelements[j][0];
//            Keyelements[j][0]=0;
             Keyelements.splice(j,1);
           }
	}
  }
}

function dispElement(numRes) {	document.getElementById('layer1').innerHTML=buildLayer(numRes);  }

function dispTree(tree) {

	document.write("Nodes :"+tree.length+"<br>");
	for(var i=0;i<tree.length;i++) {
		document.write("node "+i+":"+tree[i].childNodes.length+"<br>");
		dispChildNode(tree[i].childNodes);
		document.write("<p>");
	}
}
function dispChildNode(tree)	{
	document.write("childnodelength:"+tree.length+"<br>");
	for(var i=0;i<tree.length;i++) {
		document.write("<br>childnode "+i+":"+tree[i].nodeName+" : ");
		if(tree[i].childNodes[0]) if(tree[i].childNodes[0].nodeName=="#text") document.write(tree[i].childNodes[0].nodeValue);
		else if(tree[i].childNodes.length) {
			document.write(" -- "+tree[i].childNodes.length);
			dispChildNode(tree[i].childNodes);
		}
	}

}
function changePage(pag,numRes) {
	pagina=pag;
	dispElement(numRes);
}
function getAttr(searchResult,attrName) {
	for(var i=0;i<searchResult.childNodes.length;i++) {
//		alert(searchResult.childNodes[i].nodeName)
		if(searchResult.childNodes[i].nodeName==attrName) {
			if(searchResult.childNodes[i].childNodes.length) return searchResult.childNodes[i].childNodes[0].nodeValue;
		}
	}
return "";
}

// Aufbau der Ergebnisliste
function buildLayer(numRes) {
var nuovoLayer="";
var neueZeile="";


	nuovoLayer = '<div style="font-size:12px;font-weight:normal;color:red;width:100%">';
	nuovoLayer +='<table border="0" width="100%" ><tr><td class="titlecells" width=70%">';
	nuovoLayer +=top.attributeNames["cicResultNo"][top.languageAbbr][1]+' : '+ Keyelements.length;
	nuovoLayer +='<br><span style=font-size:9px;color:red;">'+top.attributeNames["cicResultHint1"][top.languageAbbr][1];
	nuovoLayer +='<br>'+top.attributeNames["cicResultHint2"][top.languageAbbr][1]+'</span>';
	nuovoLayer +='</td><td class="titlecells" width="30%" style="font-weight:bold;font-size:10pt"><span class="printTitle"> '+parent.menu.pName+' <span style="font-size:8pt;font-weight:normal;">created: '+parent.menu.createDate+'<br>filtered '+printDate()+'</span></span></td>';
	nuovoLayer +='<td class="titlecells" align="right"><img class="printerGif" src="images/printer.gif" title="use landscape for best result" onclick="printPage();" align="left">';
	nuovoLayer +='<input type="button" value="'+top.attributeNames["cicResultClose"][top.languageAbbr][1]+'"  class="printerGif" style="margin-left:10px;width:50px;height:20px;font-size:10px;" onclick="reloadPage();"></td></table>';

	if (Keyelements.length>numRes){
		resto=(Keyelements.length)%numRes;
		if (resto>0) {
			pagMax=((Keyelements.length-resto)/numRes)+1;
		} else {
		pagMax=((Keyelements.length)/numRes);
		}
		nuovoLayer +='<div class="pageListClass">';
		if (pagina>1){
			nuovoLayer += ' <a  class="prevnextLinkClass" href="#" onClick="changePage(';
			nuovoLayer += pagina-1;
			nuovoLayer += ',';
			nuovoLayer += numRes;
			nuovoLayer += ');"> prev << </a> ';
		}

		for (var i=1; i<pagMax+1;i++){
			if (i==pagina){
				nuovoLayer += '<a class="pageListSelLinkClass"';
			} else {
				nuovoLayer += '<a class="pageListLinkClass"';
			}
			nuovoLayer += ' href="#" onClick="changePage('+i+','+numRes+');">'+i+'</a> ';
		}
		if (pagina<pagMax){
			nuovoLayer += '<a  class="prevnextLinkClass" href="#" onClick="changePage(' + (pagina+1) + ',' + numRes + ');"> >> next</a> ';
		}
		nuovoLayer +='</div>';
	}

	nuovoLayer +='</div><table id="resultTable" bgcolor="#00CCFF" valign="middle" cellspacing="1" class="tablerows"><thead>';
//KAP Aufbau der Header Zeile mit Spaltenüberschriften	
	nuovoLayer +='<tr bgcolor="#FFFFFF" ><th  bgcolor="#0066ff" width="5%" ><font color="#FFFFFF">'+top.attributeNames["cicSearchKKS"][top.languageAbbr][1]+'</font></th>';
	nuovoLayer +='<th bgcolor="#0066ff" width="5%" ><font color="#FFFFFF">'+top.attributeNames["cicResultTabDescr"][top.languageAbbr][1]+'</font></th>';
	nuovoLayer +='<th bgcolor="#0066ff" width="5%" ><font color="#FFFFFF">'+top.attributeNames["cicResultTabIdent"][top.languageAbbr][1]+'</font></th>';
	nuovoLayer +='<th bgcolor="#99CCFF" width="5%">'+top.attributeNames["cicResultTabTabNo"][top.languageAbbr][1]+'</th>';
	nuovoLayer +='<th bgcolor="#99CCFF" width="5%">'+top.attributeNames["cicResultTabTabTit"][top.languageAbbr][1]+'</th>';
	nuovoLayer +='<th bgcolor="#CCFFFF" width="15%">'+top.attributeNames["cicResultTabTitle"][top.languageAbbr][1]+'</th>';
	nuovoLayer +='<th bgcolor="#CCFFFF" >'+top.attributeNames["cicSearchUAS"][top.languageAbbr][1]+'</th>';
	nuovoLayer +='<th bgcolor="#CCFFFF" >'+top.attributeNames["cicSearchKKS"][top.languageAbbr][1]+'</th>';
	nuovoLayer +='<th bgcolor="#CCFFFF" >'+top.attributeNames["cicSearchCNS1"][top.languageAbbr][1]+'/2</th>';
	nuovoLayer +='<th bgcolor="#CCFFFF" >'+top.attributeNames["cicSearchReg"][top.languageAbbr][1]+'/<br> '+top.attributeNames["cicSearchSeqno"][top.languageAbbr][1]+'</th>';
	nuovoLayer +='<th bgcolor="#CCFFFF" >'+top.attributeNames["cicSearchUNID"][top.languageAbbr][1]+'</th>';
	nuovoLayer +='<th bgcolor="#CCFFFF" >'+top.attributeNames["cicSearchRev"][top.languageAbbr][1]+'</th>';
	nuovoLayer +='<th bgcolor="#CCFFFF" >'+top.attributeNames["cicSearchDate"][top.languageAbbr][1]+'</th>';
	nuovoLayer +='<th bgcolor="#CCFFFF" >'+top.attributeNames["cicSearchStat"][top.languageAbbr][1]+'</th>';
	nuovoLayer +='<th bgcolor="#CCFFFF" nowrap width="5%">'+top.attributeNames["cicResultTabDocNo"][top.languageAbbr][1]+'</br>'+top.attributeNames["cicResultTabVol"][top.languageAbbr][1]+'</br>'+top.attributeNames["cicResultTabTabNo"][top.languageAbbr][1]+'</th>';
	nuovoLayer +='<th bgcolor="#CCFFFF" >'+top.attributeNames["cicResultTabCust"][top.languageAbbr][1]+'</th>';
// KAP : Enhance result table : add	Original Drawing
	nuovoLayer +='<th bgcolor="#CCFFFF" >'+top.attributeNames["KfpOriginalDrawing"][top.languageAbbr][1]+'</th>';
	nuovoLayer +='<th bgcolor="#CCFFFF" >'+top.attributeNames["cicResultVar"][top.languageAbbr][1]+'</th>';	
	nuovoLayer +='<th bgcolor="#CCFFFF" >'+top.attributeNames["KfpOriginatorCompany"][top.languageAbbr][1]+'</th>';
	nuovoLayer +='<th bgcolor="#CCFFFF" >'+top.attributeNames["cicResultTabFname"][top.languageAbbr][1]+'</th>';
	nuovoLayer +='<th bgcolor="#CCFFFF" width="5%">'+top.attributeNames["cicResultTabType"][top.languageAbbr][1]+'</th>';
	nuovoLayer +='</tr> </thead><tbody> ';

// Anzeige des selektierten Filters
	nuovoLayer +='<tr bgcolor="#ffffe0" ><td colspan="5">'+top.attributeNames["cicResultFilter"][top.languageAbbr][1]+'</td><td>'+titleFilter+'</td><td>'+UasDccFilter+'</td><td>'+kksFilter+'</td>';
	nuovoLayer +='<td>'+CnsOsFilter+'</td><td>'+RegFilter+'<br>'+SeqFilter+'</td><td>'+UnidFilter+'</td><td>'+RevisionFilter+'</td><td>'+DateFilter;
	nuovoLayer +='</td><td>'+StatusFilter+'</td><td>'+CatalogueNoFilter+'</td><td>'+CustomerCodeFilter+'</td><td>'+OriginalDrawingFilter;
	nuovoLayer +='</td><td>'+VariantFilter+'</td><td>'+OriginatorCompanyFilter+'</td><td></td><td></td></tr>';
	var limit= Math.min(pagina*numRes, Keyelements.length);
	var keyObj;
	for (var i = (pagina-1)*numRes; i < limit; i++) {
 	    rowspan=Keyelements[i].length;
 	    for(ii=0;ii<rowspan;ii++) {
	                neueZeile +='<tr bgcolor="#ffffe0" > ';
			genitore=Keyelements[i][ii].parentNode.parentNode;
			k=0;
			do {
			         if(genitore==null) {break;}
				 genitoreTyp=genitore.getElementsByTagName('DocumentType')[0].firstChild.nodeValue;
				 if (genitoreTyp=='DIR' | genitoreTyp=='VOL' | genitoreTyp=='FIL' ){
	                	  	neueZeile +='<td id="row' +i;
					neueZeile +='" onClick="top.frames[0].toggleFolder2(\'';
					neueZeile +=Keyelements[i][ii].parentNode.firstChild.nodeValue;
					neueZeile +='\',this)">';
				        neueZeile +=getAttr(genitore,'KfpKks');

					neueZeile +='</td>';
	                	  	neueZeile +='<td id="row' +i;
					neueZeile +='" onClick="top.frames[0].toggleFolder2(\'';
					neueZeile +=Keyelements[i][ii].parentNode.firstChild.nodeValue;
					neueZeile +='\',this)">';
				        neueZeile +=getAttr(genitore,'KfpTitle');
					neueZeile +='</td>';
	                	  	neueZeile +='<td id="row' +i;
					neueZeile +='" onClick="top.frames[0].toggleFolder2(\'';
					neueZeile +=Keyelements[i][ii].parentNode.firstChild.nodeValue;
					neueZeile +='\',this)">';
					if (genitore.getElementsByTagName('KfpVolumeIdent').length) {
					   var nodeValue=getAttr(genitore,'DocumentType');
					   if(nodeValue=="VOL") neueZeile +=getAttr(genitore,'KfpVolumeIdent');
					   else if(nodeValue=="FIL") neueZeile +=getAttr(genitore,'KfpFileFolderIdent');
					}
					neueZeile +='</td>';
	                	  	neueZeile +='<td id="row' +i;
					neueZeile +='" onClick="top.frames[0].toggleFolder2(\'';
					neueZeile +=Keyelements[i][ii].parentNode.firstChild.nodeValue;
					neueZeile +='\',this)">';
					k=1;
				 } else {
					k=0;
				 	genitore=genitore.parentNode.parentNode;
				 }
			} while (k==0);
		   if(k==0) neueZeile+='<td></td><td></td><td></td><td>';
		   var docType=getAttr(Keyelements[i][0],'DocumentType');
//		   alert(docType);
			if (docType!='TEC' && docType != 'REP' && docType != 'CON' && docType != 'COR') {
				neueZeile +='</td>';
	                	neueZeile +='<td id="row' +i;
				neueZeile +='" onClick="top.frames[0].toggleFolder2(\'';
				neueZeile +=Keyelements[i][ii].parentNode.firstChild.nodeValue;
				neueZeile +='\',this)"></td >';
			} else {
				neueZeile +=getAttr(Keyelements[i][ii].parentNode.parentNode,'KfpTabNo');
				neueZeile +='</td>';
	                	neueZeile +='<td id="row' +i;
				neueZeile +='" onClick="top.frames[0].toggleFolder2(\'';
				neueZeile +=Keyelements[i][ii].parentNode.firstChild.nodeValue;
				neueZeile +='\',this)">';
				neueZeile +=getAttr(Keyelements[i][ii].parentNode.parentNode,'KfpTitle') ;
				neueZeile +='</td>';
			}
		   if(ii>0) continue;

			for (j=0; j<arrayFile.length; j++) {
				neueZeile +='<td rowspan='+rowspan+'>';
				keyObj=Keyelements[i][0].getElementsByTagName(arrayFile[j]);
// KAP : Spaltennummer ???? von 13 auf 14
					if (j==14 && keyObj.length>0 && keyObj[0].childNodes.length!=0){
						figli=Keyelements[i][0].childNodes;
						for (d=0; d<(figli.length); d++) {
							if (figli[d].nodeName=='Files') {
								for (h=0; h<figli[d].getElementsByTagName('Filename').length; h++) {
								if ((verOffset=navigator.userAgent.indexOf("Firefox"))!=-1 || (verOffset=navigator.userAgent.indexOf("Chrome"))!=-1 )
								    vartempor=figli[d].getElementsByTagName('Filename')[h].textContent;	
								else
									vartempor=figli[d].getElementsByTagName('Filename')[h].text;								
									folderfile=vartempor.substring(2).split("\\");
									neueZeile +='<a href="' + "javascript:void(parent.Showfile('" + folderfile[0] +"','" + folderfile[1] + "'))" + '">' + folderfile[1] + "</a><br />";
								}
								break;
							}
						}
				       } else if (j==1 ) {
				       	    KfpUas=getAttr(Keyelements[i][0],'KfpUasDcc').substr(0,4);
				       	    KfpUasTitle=getAttr(Keyelements[i][0],'KfpUasDcc').substr(4);
				       	    neueZeile +="<span title='"+KfpUasTitle+"'>"+KfpUas+"</span>";
				       } else if (j==3 ) {
				       	    os1=getAttr(Keyelements[i][0],'KfpCnsOs1');
				       	    os2=getAttr(Keyelements[i][0],'KfpCnsOs2');
				       	    neueZeile +="<span title='"+os1+"'>"+os1.substr(0,4)+"</span>";
				       	    if(os2) neueZeile +="<br>"+"<span title='"+os2+"'>"+os2.substr(0,4)+"</span>";
				       } else if (j==4 ) {
				       	    neueZeile+=getAttr(Keyelements[i][0],'KfpRegNo');
				       	    if(getAttr(Keyelements[i][0],'KfpSeqno')) neueZeile+='<br>'+getAttr(Keyelements[i][0],'KfpSeqno');
				       } else if(j==9) {
				       	    neueZeile +=getAttr(Keyelements[i][0],arrayFile[j]);
				       	    neueZeile +=getAttr(Keyelements[i][0],'KfpReportNo');
				       	    neueZeile += getAttr(Keyelements[i][0],'KfpFileFolderIdent') ? getAttr(Keyelements[i][0],"KfpFileFolderIdent"):getAttr(Keyelements[i][0],"KfpVolumeIdent");
				       	    neueZeile +=getAttr(Keyelements[i][0],'KfpTabNo');
				       } else neueZeile +=getAttr(Keyelements[i][0],arrayFile[j]);
				neueZeile +='</td>';
			}
		}
	neueZeile +='</tr>';
	nuovoLayer +=neueZeile;
	neueZeile="";
	}
	nuovoLayer +='</tbody></table>';

	return nuovoLayer;
}


function cambia(value) {
top.frames[1].document.numRes=value;
}