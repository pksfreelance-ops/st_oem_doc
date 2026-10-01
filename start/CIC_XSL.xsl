<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.w3.org/1999/xhtml">
	<xsl:output method="html" indent="yes" 
  	doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"
    doctype-public="-//W3C//DTD XHTML 1.0 Strict//EN"/>
    	
   <xsl:template match="DistributionOrder/Folder">

    <html>
				<head>
				<meta http-equiv="content-type" content="text/html; charset=iso-8859-1"/>
				<title>JavaScript Tree Control</title>
					<link rel="stylesheet" href="cicStyle.css"/>
   				<script language="JavaScript1.2" src="cicScript.js"></script>
   				<script language="JavaScript1.2">
   				var pName='<xsl:value-of select="Document/KfpProjectCode"/>';
   				var createDate='<xsl:value-of select="CicCreationDate"/>';
   				</script>
				</head>	
			 	
	<body topmargin="0" class="xmlBody" id="xmlBody"  onLoad="init(pName);">
            <div id="menuTop" style="padding-bottom:5px;text-align:center;width:100%;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td>
            <span style="white-space:nowrap;font-family:helvetica;font-size:16px;">Power Plant Docu :
            <span style="font-weight:bold;"><xsl:value-of select="Document/KfpProjectCode"/></span></span>
            <span style="font-size:10px;padding-left:5px;" size="-1">( created <xsl:value-of select="CicCreationDate"/> )</span>
                </td>
                <td><span class="helpChar" onClick="showHelp();">?</span></td>
                </tr></table>
            </div>
								
		<xsl:for-each select="Document">

        	   <div id="{DocumentId}" class="root" last="yes">
   		    
                    <xsl:attribute name="onClick">
			<![CDATA[displayMetadata(']]>
			<xsl:value-of select="normalize-space(DocumentId)"/>
			<![CDATA[');toggleFolder(this.id);]]>
		    </xsl:attribute>
      	    	    
                    <xsl:choose>

   			<xsl:when test="DocumentType='DIR'">
     				<img src="images/plusonly.gif"  border="0" width="18" height="16"/><img src="images/_{DocumentType}.gif" alt="closed" width="18" height="16" border="0"/>&#160;
 	   				<xsl:value-of select="KfpTitle"/> <br/>
     			</xsl:when>

     			<xsl:when test="DocumentType='VOL'">
     				<img src="images/plusonly.gif"  border="0" width="18" height="16"/><img src="images/_{DocumentType}.gif" alt="closed" width="18" height="16" border="0"/>&#160;
 	   				<xsl:value-of select="KfpTitle"/><span class="bgVol">[<xsl:value-of select="KfpVolumeIdent"/>]</span><br/>
     			</xsl:when>
     			
     			<xsl:when test="DocumentType='FIL'">  	  
     				<img src="images/plusonly.gif"  border="0" width="18" height="16"/><img src="images/_{DocumentType}.gif" alt="closed" width="18" height="16" border="0"/>&#160;
 	   				<xsl:value-of select="KfpTitle"/><span class="bgVol">[<xsl:value-of select="KfpFileFolderIdent"/>]</span><br/>
     			</xsl:when>
 
      			<xsl:otherwise>
     				<img src="images/plusonly.gif"  border="0" width="18" height="16"/><img src="images/unknownpostfix.gif" alt="closed" width="18" height="16" border="0"/>&#160;
 	   				<xsl:value-of select="KfpTabNo"/> : <xsl:value-of select="KfpTitle"/> <br/>
     			</xsl:otherwise>
    			
      		    </xsl:choose>
        	   
                   </div>
       		   <xsl:call-template name="childnodes"/>
     		 
                  </xsl:for-each>	
	       
               </body> 	
		
             </html>
	
	</xsl:template>

  <xsl:template name="childnodes">
	<xsl:variable name="DocId" select="DocumentId"/>
  	<span id="branch{DocumentId}" class="branch">
        <xsl:if test="Files">
      	     <xsl:for-each select="Files/Filename">
      	     
      			 <img   width="18" height="16" border="0">
      			    <xsl:attribute name="src">
      			       <xsl:if test="position()  &lt;  last()">
      			          <![CDATA[images/join.gif]]>
      			        </xsl:if>
      			        <xsl:if test="position()  &gt;=  last()">
      			          <![CDATA[images/joinbottom.gif]]>
      			        </xsl:if>
      			     </xsl:attribute>
       			  </img>
      			  <img style="margin-left:10px;" alt="open" width="18" height="16" border="0">
      			     <xsl:attribute name="src">
      			     <xsl:choose>
							<xsl:when test="substring(.,string-length(.)-3)='.pdf'"><![CDATA[images/acrobat.gif]]></xsl:when>
							<xsl:when test="substring(.,string-length(.)-3)='.tif'"><![CDATA[images/tifg4.gif]]></xsl:when>
							<xsl:when test="substring(.,string-length(.)-3)='.doc'"><![CDATA[images/winword.gif]]></xsl:when>
							<xsl:when test="substring(.,string-length(.)-3)='.ppt'"><![CDATA[images/powerpt.gif]]></xsl:when>
							<xsl:when test="substring(.,string-length(.)-3)='.xls'"><![CDATA[images/excel.gif]]></xsl:when>
							<xsl:when test="substring(.,string-length(.)-3)='.csv'"><![CDATA[images/excel.gif]]></xsl:when>
							<xsl:when test="substring(.,string-length(.)-3)='.gif'"><![CDATA[images/gif.gif]]></xsl:when>
							<xsl:when test="substring(.,string-length(.)-3)='.bmp'"><![CDATA[images/tiffdoc.gif]]></xsl:when>
							<xsl:when test="substring(.,string-length(.)-3)='.au'"><![CDATA[images/audio.gif]]></xsl:when>
							<xsl:when test="substring(.,string-length(.)-3)='.wav'"><![CDATA[images/audio.gif]]></xsl:when>
							<xsl:when test="substring(.,string-length(.)-3)='.avi'"><![CDATA[images/avi.gif]]></xsl:when>
							<xsl:when test="substring(.,string-length(.)-3)='.htm'"><![CDATA[images/navigator.gif]]></xsl:when>
							<xsl:when test="substring(.,string-length(.)-3)='.html'"><![CDATA[images/navigator.gif]]></xsl:when>
							<xsl:when test="substring(.,string-length(.)-3)='.hlp'"><![CDATA[images/help.gif]]></xsl:when>
							<xsl:when test="substring(.,string-length(.)-3)='.zip'"><![CDATA[images/zip.gif]]></xsl:when>
							<xsl:when test="substring(.,string-length(.)-3)='.txt'"><![CDATA[images/text.gif]]></xsl:when>
							<xsl:when test="substring(.,string-length(.)-3)='.dwg'"><![CDATA[images/autocad.gif]]></xsl:when>
							<xsl:when test="substring(.,string-length(.)-3)='.dgn'"><![CDATA[images/ustation.gif]]></xsl:when>
							<xsl:when test="substring(.,string-length(.)-3)='.pid'"><![CDATA[images/ustation.gif]]></xsl:when>
							<xsl:when test="substring(.,string-length(.)-3)='.i0'"><![CDATA[images/ustation.gif]]></xsl:when>
							<xsl:otherwise><![CDATA[images/unknownpostfix.gif]]></xsl:otherwise>
					     </xsl:choose>
      			     </xsl:attribute>
       			  </img>&#160;

      		     <p id="{.}" class="files">
		              <a class="docLinks">
    			           <xsl:attribute name="href">
     			           <![CDATA[javascript:void(parent.Showfile(']]><xsl:value-of select= "substring-before(substring-after(.,'\'),'\')"/><![CDATA[',']]><xsl:value-of select= "substring-after(substring-after(.,'\'),'\')"/><![CDATA['));]]>
    			           </xsl:attribute>
    			           <xsl:value-of select= "substring-after(substring-after(.,'\'),'\')"/>
		              </a>
      		     </p><br/>
      	     </xsl:for-each>
        </xsl:if>
  	  <xsl:for-each select="Document">
            <xsl:if test="position()  &lt;  last()"> 
       	        <xsl:call-template name="branches"> 
     	         <xsl:with-param name="notLast"  select="'images/plus_notlast.gif'"/>
       		     <xsl:with-param name="cicId"  select="@id"/>
		         <xsl:with-param name="docid" select="$DocId"/>
          	    </xsl:call-template>
  	        </xsl:if>    
           <xsl:if test="position()  &gt;=  last()"> 
       	        <xsl:call-template name="branches"> 
     	         <xsl:with-param name="notLast"  select="'images/plus_last.gif'"/>
       		     <xsl:with-param name="cicId"  select="@id"/>
		         <xsl:with-param name="docid" select="$DocId"/>
          	    </xsl:call-template>
  	        </xsl:if>    
  	   </xsl:for-each>        
   </span>
</xsl:template>	
  			
 	<xsl:template name="branches"> 
 	   <xsl:param name="cicId"/>
	   <xsl:param name="docid"/>
 	   <xsl:param name="notLast"/>
	<xsl:for-each select="Position">
      	    <xsl:choose>
      	    
      	        	<xsl:when test="DocumentType='TEC' or DocumentType='CON' or DocumentType='COR' or DocumentType='REP' ">
   				<span id="{$cicId}"  class="trigger" last="no">
   				<xsl:attribute name="onClick">
				<![CDATA[displayMetadata(']]><xsl:value-of select="DocumentId"/><![CDATA[');toggleFolder(this.id);]]>
				</xsl:attribute>
     				<img src="{$notLast}"  border="0" width="18" height="16"/><img src="images/_{DocumentType}.gif" alt="closed" width="18" height="16" border="0"/>&#160;
 	   				<xsl:value-of select="KfpTitle"/><span class="bgVol">(<xsl:value-of select="substring-before(KfpUasDcc,' ')"/>, <xsl:value-of select="KfpKks"/>)</span> <br/>
     				</span>
     				<xsl:call-template name="childnodes"/>
     			</xsl:when>
     			
   			<xsl:when test="DocumentType='DIR' or DocumentType='MDL'">
   				<span id="{$cicId}"  class="trigger" last="no">
   				   	<xsl:attribute name="onClick">
				      <![CDATA[displayMetadata(']]><xsl:value-of select="DocumentId"/><![CDATA[');toggleFolder(this.id);]]>
				    </xsl:attribute>
     				<img src="{$notLast}"  border="0" width="18" height="16"/><img src="images/_{DocumentType}.gif" alt="closed" width="18" height="16" border="0"/>&#160;
 	   				<xsl:value-of select="KfpTitle"/> <br/>
     				</span>
     				<xsl:call-template name="childnodes"/>
     			</xsl:when>
     			
   			<xsl:when test="DocumentType='INT'or DocumentType='MAM'or DocumentType='MOD'or DocumentType='MDG'">
   				<span id="{$cicId}"  class="trigger" last="no">
   				   	<xsl:attribute name="onClick">
				      <![CDATA[displayMetadata(']]><xsl:value-of select="DocumentId"/><![CDATA[');toggleFolder(this.id);]]>
				    </xsl:attribute>
     				<img src="{$notLast}"  border="0" width="18" height="16"/><img src="images/_{DocumentType}.gif" alt="closed" width="18" height="16" border="0"/>&#160;
 	   				<xsl:value-of select="KfpTitle"/> <br/>
     				</span>
     				<xsl:call-template name="childnodes"/>
     			</xsl:when>

     			
     			<xsl:when test="DocumentType='VOL'">
   				<span id="{$cicId}"  class="trigger" last="no">
   				   	<xsl:attribute name="onClick">
				      <![CDATA[displayMetadata(']]><xsl:value-of select="DocumentId"/><![CDATA[');toggleFolder(this.id);]]>
				    </xsl:attribute>   				
     				<img src="{$notLast}"  border="0" width="18" height="16"/><img src="images/_{DocumentType}.gif" alt="closed" width="18" height="16" border="0"/>&#160;
 	   				<xsl:value-of select="KfpTitle"/><span class="bgVol">[<xsl:value-of select="KfpVolumeIdent"/>]</span><br/>
     				</span>
     				<xsl:call-template name="childnodes"/>
     			</xsl:when>
     			
     			<xsl:when test="DocumentType='FIL'">  	  
   				<span id="{$cicId}"  class="trigger" last="no">
   				   	<xsl:attribute name="onClick">
				      <![CDATA[displayMetadata(']]><xsl:value-of select="DocumentId"/><![CDATA[');toggleFolder(this.id);]]>
				    </xsl:attribute>
     				<img src="{$notLast}"  border="0" width="18" height="16"/><img src="images/_{DocumentType}.gif" alt="closed" width="18" height="16" border="0"/>&#160;
 	   				<xsl:value-of select="KfpTitle"/><span class="bgVol">[<xsl:value-of select="KfpFileFolderIdent"/>]</span><br/>
     				</span>
     				<xsl:call-template name="childnodes"/>
     			</xsl:when>
     			
     			<xsl:when test="DocumentType='TAB'">
   				<span id="{$cicId}"  class="trigger" last="no">
   				   	<xsl:attribute name="onClick">
				      <![CDATA[displayMetadata(']]><xsl:value-of select="DocumentId"/><![CDATA[');toggleFolder(this.id);]]>
				    </xsl:attribute>
     				<img src="{$notLast}"  border="0" width="18" height="16"/><img src="images/_{DocumentType}.gif" alt="closed" width="18" height="16" border="0"/>&#160;
 	   				<xsl:value-of select="KfpTabNo"/> : <xsl:value-of select="KfpTitle"/> <br/>
     				</span>
     				<xsl:call-template name="childnodes"/>
     			</xsl:when>
 
      		<xsl:otherwise>
   				<span id="{$cicId}"  class="trigger" last="no">
   				   	<xsl:attribute name="onClick">
				      <![CDATA[displayMetadata(']]><xsl:value-of select="DocumentId"/><![CDATA[');toggleFolder(this.id);]]>
				    </xsl:attribute>
     				<img src="{$notLast}"  border="0" width="18" height="16"/><img src="images/unknownpostfix.gif" alt="closed" width="18" height="16" border="0"/>&#160;
 	   				<xsl:value-of select="KfpTabNo"/> : <xsl:value-of select="KfpTitle"/> <br/>
     				</span>
     				<xsl:call-template name="childnodes"/>
     			</xsl:otherwise>
    			
      </xsl:choose>
	</xsl:for-each>	
  </xsl:template>
</xsl:stylesheet>