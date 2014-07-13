// Put your custom code here
//var apipath='http://127.0.0.1:8000/em/default/';
//var apipath='http://e.businesssolutionapps.com/em/default/';
//var apipath='http://127.0.0.1:8000/em/default/';

var apipath='http://e2.businesssolutionapps.com/unilever/syncmobile/';
var apipath_image = 'http://e2.businesssolutionapps.com/unilever/';

//var apipath='http://127.0.0.1:8000/unilever/syncmobile/';
//var apipath_image = 'http://127.0.0.1:8000/unilever/';





var temp_image_div='';
localstorage.m_new="";
localstorage.submitted_outlet="";



//-------GET GEO LOCATION Start----------------------------
function getlocationand_askhelp() { //location
	navigator.geolocation.getCurrentPosition(onSuccess, onError);
	
}
	 
// onSuccess Geolocation
function onSuccess(position) {
		
	$("#lat").val(position.coords.latitude);
	$("#long").val(position.coords.longitude);

	
}
	
function onError(error) {
	$("#lat").val(0);
	$("#long").val(0);
	}
//-------GET GEO LOCATION End----------------------------
//=============get time start===================
function get_date() {
	var currentdate = new Date(); 
	var datetime = currentdate.getFullYear() + "-" 
			+ (currentdate.getMonth()+1)  + "-"  
			+ currentdate.getDate() + " "
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();
	return datetime;
}
//=============get tieme end=============

//============================================
//--------------------------------------------- Exit Application
function exit() {
navigator.app.exitApp();

}


function first_page(){
	//alert (localStorage.synced);
	if ((localStorage.synced!='YES')){
		//alert ('nadira')
		var url = "#login";
		$.mobile.navigate(url);
		//$(location).attr('href',url);
		
	}


}

function outlet_next_page(){
	
	if ((localStorage.routeException_found == '1') && ((localStorage.outletException=='undefined') || (localStorage.outletException==undefined))){
		//alert (localStorage.routeException_found);
		var url = "#outletexceptionPage";
		$.mobile.navigate(url);
		//$(location).attr('href',url);
		
	}
	else{
		    var url = "#mhskusPage";
			//$(location).attr('href',url);
			$.mobile.navigate(url);
			location.reload();	
	}
}

//=================after select an outlet
function clear_autho(){
	localStorage.cm_id='';
	localStorage.cm_pass='';
	//localStorage.synccode='';
	localStorage.routeString='';
	localStorage.routeExStringShow='';
	localStorage.show_cancel=0;
	localStorage.m_new_string="";
	localStorage.selectedOutlet="";
	localStorage.outletExStringShow="";
	localStorage.outletException="";
	localStorage.outletChanne="";
	localStorage.outletNameID="";
	localStorage.mhskusTotal="";
	localStorage.npdTotal="";
	localStorage.fdisplaySlabTotal="";
	localStorage.fdisplayTotal="";
	localStorage.qpdsSlabTotal="";
	localStorage.qpdsTotal="";
	localStorage.giftTotal="";
	
	localStorage.marchadizingTotal="";
	//localstorage.m_new="";
	localStorage.mhskus_data_ready="";
	localStorage.npd_data_ready="";
	localStorage.fdisplay_data_ready="";
	localStorage.qpds_data_ready="";
	localStorage.gift_data_ready="";
	
	localStorage.mar_data_ready="";
	localStorage.synced="";
	
	localStorage.m_new="";
	var url = "#login";
	$.mobile.navigate(url);
	//$(location).attr('href',url);
	location.reload();
	//alert ('ccc');
	
}
function div_change(){
	//alert (localStorage.outletNameID);
	localStorage.show_cancel=1
	$("#outletCancel").show();
	$("#outletString").hide();
	$("#menujpj").hide();
	$("#backjpj").hide();
	$("#link_route").hide();
	
	
	
	
	$("#outletName_show").html(localStorage.outletNameID);
	$("#outletButton").delay(6000).show(0);
	$("#outletWait").delay(6000).hide(0);
	
	//$("#outletWait").hide();
	//doTimer();
	
	
}

function cancel_outlet(){
	localStorage.show_cancel=0;
	localStorage.outletNameID='';
	localStorage.marchadizingTotal='';
	localStorage.m_new_string='';
	localStorage.m_new='';
	
	
	
	localStorage.mhskus_data_ready="";
	localStorage.npd_data_ready="";
	localStorage.fdisplay_data_ready="";
	localStorage.qpds_data_ready="";
	localStorage.gift_data_ready="";
	localStorage.mar_data_ready="";
	
	
	
	
	localStorage.outletException='undefined';
	$("#outletCancel").hide();
	$("#outletString").show();
	$("#menujpj").show();
	$("#backjpj").show();
	$("#link_route").show();
	
	$("#outletWait").show();
	$("#outletButton").hide();
	
	$("#outletName_show").html(localStorage.outletNameID);
	//alert ('abcd');
}
//=============================================
//=========================Check user=====================
function check_user() { 
	//alert ('nadira');
	var cm_id=$("#cm_id").val();
	var cm_pass=$("#cm_pass").val();
	//var synccode=''
	if (cm_id=="" || cm_id==undefined || cm_pass=="" || cm_pass==undefined){
		var url = "#login";      
		$.mobile.navigate(url);
	}else{
		
		$("#login_image").show();
		$("#loginButton").hide();
		localStorage.cid='UNILEVER';
		localStorage.cm_id=cm_id;
   		localStorage.cm_pass=cm_pass;
   		//localStorage.synccode=synccode;
		localStorage.synced='NO'
   		
		//$("#error_login").html(apipath+'check_user?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&synccode='+localStorage.synccode);	
   		$.ajax({
				 type: 'POST',
				 url: apipath+'check_user?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&synccode='+localStorage.synccode,
				 success: function(result) {
					 	//$("#error_login").html('ajax');				
						if (result==''){
							$("#loginButton").show();
							$("#login_image").hide();
							alert ('Sorry Network not available');
						}
						else{
							var resultArray = result.split('<SYNCDATA>');			
							if (resultArray[0]=='FAILED'){
								//$("#error_login").html('Failed');
								$("#loginButton").show();
								$("#login_image").hide();
								$("#error_login").html('Unauthorized User');
							}
							if (resultArray[0]=='SUCCESS'){
								$("#loginButton").show();
								$("#login_image").hide();
								var sync_date_get=get_date();
								var sync_date=sync_date_get.substring(0,10);
								localStorage.sync_date=sync_date;
								
								
								
								localStorage.synced='YES';
								localStorage.synccode=resultArray[2];
								//alert (localStorage.synccode);
								
								
								result_string=resultArray[1];
								localStorage.routeString_bak=result_string;
								//alert (localStorage.routeString_bak);
								
								var routeArray = result_string.split('</routeList>');									
								routeList = routeArray[0].replace("<routeList>","");
								
								
								
								
								//alert (result_string)
								routeException = routeArray[1];
								var routeExArray = routeException.split('</routeexList>');									
								routeExList = routeExArray[0].replace("<routeexList>","");
								
								
						  //==========Create route list
								var routeSingleArray = routeList.split('rdrd');	
								var routeSingleTtotal = routeSingleArray.length;
								var routeStringShow=''
								
								var d=new Date();
								var weekday=new Array(7);
								weekday[0]="Sunday";
								weekday[1]="Monday";
								weekday[2]="Tuesday";
								weekday[3]="Wednesday";
								weekday[4]="Thursday";
								weekday[5]="Friday";
								weekday[6]="Saturday";
								
								var today_get = weekday[d.getDay()];
								
								var alowSl=''
								for (var rs=0; rs < routeSingleTtotal-1; rs++){
									routeSArray = routeSingleArray[rs].split('fdfd');
									routeSID=routeSArray[0];
										
									
									routeSArray = routeSID.split('_');
									var r_sday=routeSArray[2];
									var r_sdaySl=routeSArray[3];
									
									
									if (r_sday==today_get){	
											if (r_sdaySl==1){
												alowSl=	'7,6,5'
											}
											if (r_sdaySl==2){
												alowSl=	'1,7,6'
											}
											if (r_sdaySl==3){
												alowSl=	'1,2,7'
											}
											if (r_sdaySl==4){
												alowSl=	'3,2,1'
											}
											if (r_sdaySl==5){
												alowSl=	'4,3,2'
											}
											if (r_sdaySl==6){
												alowSl=	'5,4,3'
											}
									}
									
								}
								//alert (alowSl);
								for (var r=0; r < routeSingleTtotal-1; r++){
									routeArray = routeSingleArray[r].split('fdfd');
									routeID=routeArray[0];
									routeName=routeArray[1];	
									
									routeSArray = routeID.split('_');
									var r_day=routeSArray[2];
									var r_daySl=routeSArray[3];
									//alert (r_daySl);
									
									//alert (today_get);
									
									
									//alert (r_daySl);
									if (r_day==today_get){																			
									  routeStringShow=routeStringShow+'<label style="background:#81C0C0"><input type="radio" name="RadioRoute"  value="'+routeID+'" id="RadioGroup1_0"> '+routeName+'</label>'
									}
									else{
									  //alert (alowSl)
									 if ((alowSl.search( r_daySl )) != -1){
										 routeStringShow=routeStringShow+'<label><input type="radio" name="RadioRoute"  value="'+routeID+'" id="RadioGroup1_0"> '+routeName+'</label>'
									 }
									 else{
									  	routeStringShow=routeStringShow+'<label><input type="radio"  disabled name="RadioRoute"  value="'+routeID+'" id="RadioGroup1_0"> '+routeName+'</label>'
									 }
									}
									
								}
								localStorage.routeString=routeStringShow
								
								$("#routeString").html(localStorage.routeString);
							
							//=======end route list====================
							//==========Create route exception list
								var routeExStringShow=''
								var routeExSingleArray = routeExList.split('rdrd');	
								var routeExSingleTtotal = routeExSingleArray.length;
								var routeExStringShow=''
								for (var re=0; re < routeExSingleTtotal-1; re++){
									routeExArray = routeExSingleArray[re].split('fdfd');
									routeExID=routeExArray[0];
									routeExName=routeExArray[1];
									routeExStringShow=routeExStringShow+'<label><input type="radio" name="RadioRouteEx"    value="'+routeExName+'" > '+routeExName+'</label>'
								}
								localStorage.routeExStringShow=routeExStringShow
								$("#routeExString").html(localStorage.routeExStringShow);
							
							//=======end route exception list====================								
								
							}
							if ((resultArray[0]=='SUCCESS') && (localStorage.route==undefined)){
								
								var url = "#routePage";
								$.mobile.navigate(url);
								location.reload();
							}
							if ((resultArray[0]=='SUCCESS') && (localStorage.route!=undefined)){
								var url = "#menuPage";
								$.mobile.navigate(url);
								//location.reload();
							}
							
							
							
						}
				      },
				  error: function(result) {
					 // $("#error_login").html(apipath+'check_user?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&synccode='+localStorage.synccode);
					 // $("#error_login").html('Ajax Error');
					  $("#loginButton").show();
					  $("#login_image").hide();
					  var url = "#login";
					  $.mobile.navigate(url);	
				  }
			  });//end ajax
		  }//end else	
	}//function

//=========================set route for new date==============

//=========================Check user=====================
function check_route() { 
		//localStorage.routeList_bak=localStorage.routeString_bak;
		//alert (localStorage.routeList_bak) 
		//localStorage.routeString="";	
		//localStorage.routeExStringShow="";					
		result_string=localStorage.routeString_bak;
		//alert (result_string);
		
		var routeArray = result_string.split('</routeList>');									
		routeList = routeArray[0].replace("<routeList>","");
		//alert (result_string)
		
								
								
  //==========Create route list
		var routeSingleArray = routeList.split('rdrd');	
		var routeSingleTtotal = routeSingleArray.length;
		var routeStringShow=''
		
		var d=new Date();
		var weekday=new Array(7);
		weekday[0]="Sunday";
		weekday[1]="Monday";
		weekday[2]="Tuesday";
		weekday[3]="Wednesday";
		weekday[4]="Thursday";
		weekday[5]="Friday";
		weekday[6]="Saturday";
								
		var today_get = weekday[d.getDay()];
		//alert (today_get);
		var alowSl=''
								
		for (var rs=0; rs < routeSingleTtotal-1; rs++){
			routeSArray = routeSingleArray[rs].split('fdfd');
			routeSID=routeSArray[0];
				
		
			routeSArray = routeSID.split('_');
			var r_sday=routeSArray[2];
			var r_sdaySl=routeSArray[3];
			
			
			if (r_sday==today_get){	
					//r_sdaySl=5;
					if (r_sdaySl==1){
						alowSl=	'7,6,5'
					}
					if (r_sdaySl==2){
						alowSl=	'1,7,6'
					}
					if (r_sdaySl==3){
						alowSl=	'1,2,7'
					}
					if (r_sdaySl==4){
						alowSl=	'3,2,1'
					}
					if (r_sdaySl==5){
						alowSl=	'4,3,2'
					}
					if (r_sdaySl==6){
						alowSl=	'5,4,3'
					}
			}
			
		}
		//alert (alowSl);
		for (var r=0; r < routeSingleTtotal-1; r++){
			routeArray = routeSingleArray[r].split('fdfd');
			routeID=routeArray[0];
			routeName=routeArray[1];	
			
			routeSArray = routeID.split('_');
			var r_day=routeSArray[2];
			var r_daySl=routeSArray[3];


			if (r_day==today_get){	
												
			  routeStringShow=routeStringShow+'<label style="background:#81C0C0"><input type="radio" name="RadioRoute"  value="'+routeID+'" id="RadioGroup1_0"> '+routeName+'</label>'
			}
			else{
			  //alert (alowSl)
			 if ((alowSl.search( r_daySl )) != -1){
				 routeStringShow=routeStringShow+'<label><input type="radio" name="RadioRoute"  value="'+routeID+'" id="RadioGroup1_0"> '+routeName+'</label>'
			 }
			 else{
				routeStringShow=routeStringShow+'<label><input type="radio"  disabled name="RadioRoute"  value="'+routeID+'" id="RadioGroup1_0"> '+routeName+'</label>'
			 }
			}
			
		}
		localStorage.routeString=routeStringShow
		
		$("#routeString").html(localStorage.routeString);
	
	//=======end route list====================
						
								
		var url = "#routePage";
		$.mobile.navigate(url);	
		location.reload();
	}//function


//==========================set route for new dateend=============

//=====================Check user end========================
//=====================Select Route Start====================

function selectRoute() { 
	var selected_route=($("input:radio[name='RadioRoute']:checked").val())
	
	var d=new Date();
	var weekday=new Array(7);
	weekday[0]="Sunday";
	weekday[1]="Monday";
	weekday[2]="Tuesday";
	weekday[3]="Wednesday";
	weekday[4]="Thursday";
	weekday[5]="Friday";
	weekday[6]="Saturday";
	
	var today_get = weekday[d.getDay()];
	
	var sync_date_get=get_date();
	var sync_date=sync_date_get.substring(0,10);
	
	//sync_date.substring(1,10)
	//alert (sync_date);
	localStorage.sync_date=sync_date;
	
	
	var selected_routeArray = selected_route.split('_');	
	var selected_routeID=selected_routeArray[0];
	var selected_routeName=selected_routeArray[1];
	var selected_routeDay=selected_routeArray[2];
	
	localStorage.routeIDName=selected_routeName+"( "+selected_routeID+" )"
	
	//cancel_outlet();
	
	if(selected_route!=undefined){
		$("#routeS_image").show();
		$("#RSButton").hide();
		//alert (selected_routeDay);
		//alert (today_get);
		if (selected_routeDay==today_get){
			localStorage.selectedRoute=selected_routeID;
			localStorage.routeException_found='0';
		
			var url = "#menuPage";
		   $.mobile.navigate(url);	
		}
		else {
			localStorage.selectedRoute=selected_routeID;
			localStorage.routeException_found='1';
			
			
			var url = "#routeexceptionPage";
			$.mobile.navigate(url);	
		}
	}
}
//=====================Select Route End=========================
//=====================Route Exception start=====================
function selectRouteException() { 
	var selected_route_exception=($("input:radio[name='RadioRouteEx']:checked").val())
   // alert (selected_route_exception);
	if(selected_route_exception!=undefined){
		localStorage.routeException=selected_route_exception;
		var url = "#menuPage";
		$.mobile.navigate(url);	
	}
}
//=====================Route Exception end=====================
//=====================outlet start=====================
function marketPJP() { 
	var selected_route_exception=($("input:radio[name='RadioRouteEx']:checked").val())
	if(localStorage.selectedRoute!=undefined){
		//$("#dataerror").html(apipath+'sync_route?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&synccode='+localStorage.synccode+'&route='+localStorage.selectedRoute);
	//======================================	
		$.ajax({
				 type: 'POST',
				 url: apipath+'sync_route?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&synccode='+localStorage.synccode+'&route='+localStorage.selectedRoute,
				 success: function(result) {					
						if (result==''){
							alert ('Sorry Network not available');
						}
						else{
							var resultArray = result.split('<SYNCDATA>');			
							if (resultArray[0]=='FAILED'){
								$("#error_login").html('Unauthorized User');
							}
							if (resultArray[0]=='SUCCESS'){
								result_string=resultArray[1];
								var outletArray = result_string.split('</outletList>');									
								outletList = outletArray[0].replace("<outletList>","");
						  //==========Create outlet list
								var outletSingleArray = outletList.split('rdrd');	
								var outletSingleTtotal = outletSingleArray.length;
								var outletStringShow=''
								
								outletStringShow=outletStringShow+'<table width="100%" border="0" cellpadding="0" cellspacing="0"><tr style="color:#006A6A; font-size:18px;"><td>'+localStorage.routeIDName+'</td></tr></table>'
								for (var o=0; o < outletSingleTtotal-1; o++){
									outletArray = outletSingleArray[o].split('fdfd');
									outletID=outletArray[0];
									outletName=outletArray[1];
									total_visit=outletArray[2];
									total_visit_done=outletArray[3];
									outlet_c=outletArray[4];
									depot_id=outletArray[5];
									schedule_date=outletArray[6];
									
									
									
									
									//alert (outletColor);
									if (outlet_c=='g'){
										outletColor='<img style="height:20px; width:20px" src="green.png">';
									}
									if (outlet_c=='b'){
										outletColor='<img style="height:20px; width:20px" src="orange.png">';
									}
									if (outlet_c=='r'){
										outletColor='<img style="height:20px; width:20px" src="red.png">';
									}
									
									outletStringShow=outletStringShow+'<label ><table width="100%" border="0"> <tr> <td width="5%">'+
													'<input type="radio" name="RadioOutlet" value="'+outletID+'rdrd'+schedule_date+'"></td><td width="60%">'+outletName +'('+outletID+')</td><td width="15%">'+ total_visit+'/'+total_visit_done+' </td>	<td>'+outletColor+'</td> </tr></table></label>'
								}
								
								
								outletStringShow=outletStringShow+'<br/><br/> <a data-role="button" onClick="select_outlet();" >Next</a>'
								
								
								
								
								localStorage.outletString=outletStringShow
								$("#outletString").html(localStorage.outletString);
								
								$("#routeS_image").hide();
								$("#RSButton").show();
								
								
								//var url = "#menuPage";
//								$.mobile.navigate(url);	
//								location.reload();
							//=======end outlet list====================								
							}

						}
				      },
				  error: function(result) {
					  $("#routeS_image").hide();
					  $("#RSButton").show();
									
					  var url = "#routePage";
					  $.mobile.navigate(url);
				  }
			  });//end ajax*/
		
	}
}



function marketPJP_check() { 
	if(localStorage.selectedRoute!=undefined){
	
				if (localStorage.route==''){
					var url = "#routePage";
					$.mobile.navigate(url);	
				}
				if (localStorage.route!=''){
					
					//div_change()
					var url = "#outletPage";
					$.mobile.navigate(url);
					location.reload();	
					
				}

	}
}




//=====================Outlet end===================
//=====================select Outlet start============

function select_outlet() { 
		var selected_outletID_get=($("input:radio[name='RadioOutlet']:checked").val())		
		var selected_outletID_list = selected_outletID_get.split('rdrd');
		var selected_outletID=selected_outletID_list[0];	
		var selected_date_get=selected_outletID_list[1];
		
		//localStorage.selected_outletID_get=selected_outletID_get;
		
		if ((selected_outletID!=undefined) && (selected_outletID!='undefined')){
				localStorage.selectedOutlet=selected_outletID;
				
				localStorage.selected_date_get=selected_date_get;
				//selected_date=new Date(selected_date_get);
				//selected_date=get_date(selected_date_get)
				selected_date=selected_date_get;
				localStorage.selected_date=selected_date.substr(0,10);
				//alert (localStorage.selected_date);
		//}
		//alert (selected_outletID);
		//$("#outletInfo1").html(apipath+'sync_outlet_ex?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&synccode='+localStorage.synccode+'&outlet='+localStorage.selectedOutlet);
		
			$.ajax({
				 type: 'POST',
				 url: apipath+'sync_outlet_ex?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&synccode='+localStorage.synccode+'&outlet='+localStorage.selectedOutlet,
				 success: function(result) {	
						if (result==''){
							alert ('Sorry Network not available');
						}
						else{
							var resultArray = result.split('<SYNCDATA>');			
							if (resultArray[0]=='FAILED'){
								$("#error_login").html('Unauthorized User');
							}
							
							if (resultArray[0]=='SUCCESS'){
								
								result_string=resultArray[1];
								var outletArray = result_string.split('</outletList>');									
								outletList = outletArray[0].replace("<outletList>","");
								outletException = outletArray[1];
								var outletExArray = outletException.split('</outletexList>');									
								outletExList = outletExArray[0].replace("<outletexList>","");
								
								
								//==========Create route list
								var outletSingleArray = outletList.split('rdrd');	
								var outletSingleTtotal = outletSingleArray.length;
								var outletStringShow=''
								
								
								
								for (var o=0; o < outletSingleTtotal-1; o++){
									outletArray = outletSingleArray[o].split('fdfd');
								
									outlet=outletArray[0];
									channel=outletArray[1];
									visit=outletArray[2];
									psSlab=outletArray[3];
									 
									outletStringShow=outletStringShow+'<table width="100%" border="0" cellpadding="0" cellspacing="0">'
									outletStringShow=outletStringShow+'<tr> <td colspan="3" style="color:#006A6A; font-size:18px;">'+outlet+'</td></tr> '
				 					
									
									/*outletStringShow=outletStringShow+'<tr style="background-color:#BCDBE0;"><td width="2%">&nbsp;</br></td><td width="60">Channel </td><td>&nbsp;&nbsp;:'+channel+'</td></tr>'
									//outletStringShow=outletStringShow+'<tr style="background-color:#BCDBE0;">'
//                    				outletStringShow=outletStringShow+'<td width="1%"></td><td width="60">PS Slab</td><td>&nbsp;&nbsp;:'+ psSlab +'</td></tr>'
									outletStringShow=outletStringShow+'<tr style="background-color:#BCDBE0;">'
                    				outletStringShow=outletStringShow+'<td width="1%"></td><td width="60">Freq/Visit</td><td>&nbsp;&nbsp;:'+visit+'</td>'
                  					outletStringShow=outletStringShow+'</tr>'*/
									outletStringShow=outletStringShow+'</table>'
								}
								
								localStorage.outletinfoString=outletStringShow
								localStorage.outletChannel=channel
								localStorage.outletNameID=outlet
							
								
								$("#outletName_show").html(localStorage.outletNameID);
								$("#outletInfo").html(localStorage.outletinfoString);
						  //	==========Create outlet exception list
								var outletExStringShow=''
								var outletExSingleArray = outletExList.split('rdrd');	
								var outletExSingleTtotal = outletExSingleArray.length;
								var outletExStringShow=''
								for (var oe=0; oe < outletExSingleTtotal-1; oe++){
									outletExArray = outletExSingleArray[oe].split('fdfd');
									outletExID=outletExArray[0];
									outletExName=outletExArray[1];
									outletExStringShow=outletExStringShow+'<label><input type="radio" name="RadioOutletEx"    value="'+outletExName+'" > '+outletExName+'</label>'
								}
								localStorage.outletExStringShow=outletExStringShow;
								$("#outletExString").html(localStorage.outletExStringShow);
								
							//=======end outlet exception list====================	
							
							syncOutlet();
							
							div_change();
							//syncOutlet();
							
							}//end success if
							
							
							
									
						}//end else
						
						
				
						
						//============End set page=============
						
						
				      },
				  error: function(result) {
					 // alert (result);
					  var url = "#outletPage";
					  $.mobile.navigate(url);	
				  }
			  });//end ajax*/
			  
    }//end if
}

//=====================select Outlet end===============
function reloadPages() { 
		   var url = "#mhskusPage";
			$.mobile.navigate(url);
			location.reload();
}
//=====================Outlet Exception start=====================
function selectOutletException() { 
	var selected_outlet_exception=($("input:radio[name='RadioOutletEx']:checked").val())
    // alert (selected_route_exception);
	if(selected_outlet_exception!=undefined){
		localStorage.outletException=selected_outlet_exception;
		syncOutlet();
		//localStorage.routeDone=''
		//setOutlet();
		//var url = "#outletSyncingPage";
		var url = "#mhskusPage";
		$.mobile.navigate(url);
		location.reload();
		//doTimer();
		
		///	==Div hide after confirm outlet	
			
		
	}
}
//=====================Outlet Exception end=====================

//=====================Select Outlet Start====================

function syncOutlet() { 
	
	//$("#outletInfo1").html(apipath+'sync_outlet?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&synccode='+localStorage.synccode+'&outlet='+localStorage.selectedOutlet+'&channel='+localStorage.outletChannel);
	$.ajax({
				 type: 'POST',
				 url: apipath+'sync_outlet?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&synccode='+localStorage.synccode+'&outlet='+localStorage.selectedOutlet+'&channel='+localStorage.outletChannel,
				 success: function(result) {
						if (result==''){
							alert ('Sorry Network not available');
						}
						else{
							var resultArray = result.split('<SYNCDATA>');			
							if (resultArray[0]=='FAILED'){
								$("#error_login").html('Unauthorized User');
							}
							
							
							if (resultArray[0]=='SUCCESS'){
								//alert (resultArray[1]);
								result_string=resultArray[1];
								var mhskusArray = result_string.split('</mhskusList>');									
								mhskusList = mhskusArray[0].replace("<mhskusList>","");
								npd = mhskusArray[1];
								var npdArray = npd.split('</npdList>');									
								npdList = npdArray[0].replace("<npdList>","");
								
								
								fdisplay = npdArray[1];
								var fdisplayArray = fdisplay.split('</fdisplayList>');									
								fdisplayList = fdisplayArray[0].replace("<fdisplayList>","");
								
								qpds = fdisplayArray[1];
								var qpdsArray = qpds.split('</qpdsList>');									
								qpdsList = qpdsArray[0].replace("<qpdsList>","");
								
								//alert (qpdsArray[1]);
								gift = qpdsArray[1];
								var giftArray = gift.split('</giftList>');									
								giftList = giftArray[0].replace("<giftList>","");
								
								marchadizing = giftArray[1];
								var marchadizingArray = marchadizing.split('</marList>');									
								marchadizingList = marchadizingArray[0].replace("<marList>","");
								
								
								//=====marchandizing Item=======
								marchadizingItem = marchadizingArray[1];
								var marchadizingItemArray = marchadizingItem.split('</marItemList>');									
								marchadizingItemList = marchadizingItemArray[0].replace("<marItemList>","");
								
								//=====marchandizing Brand=======
								marchadizingBrand = marchadizingItemArray[1];
								var marchadizingBrandArray = marchadizingBrand.split('</marBrandList>');									
								marchadizingBrandList = marchadizingBrandArray[0].replace("<marBrandList>","");
								
								//==========Create MHSKUS list
								
								var mhskusSingleArray = mhskusList.split('rdrd');	
								var mhskusSingleTotal = mhskusSingleArray.length;
								//alert (mhskusList);
								var mhskusStringShow=''
								mhskusStringShow=mhskusStringShow+'<table width="100%" border="0"><tr style="color:#0329C0"> <td colspan="2" style="color:#006A6A; font-size:18px;">'+localStorage.outletNameID+'</td></tr><tr > </table></br>'
								mhskusStringShow=mhskusStringShow+'<table  width="100%" border="0" cellpadding="0" cellspacing="0">'
                  				mhskusStringShow=mhskusStringShow+'<tr bgcolor="#9FCED7"  ><td></td><td>Item</td><td> QTY</td><td ></td></tr><tr height="1px" bgcolor="#CCCCCC" ><td></td><td></td><td> </td><td ></td></tr>'
								
								//i=6;
//								alert (i.toString())
								localStorage.mhskusTotal=mhskusSingleTotal
								
								for (var i=0; i < mhskusSingleTotal-1; i++){
									mhskusArray = mhskusSingleArray[i].split('fdfd');
									itemID=mhskusArray[0];
									itemName=mhskusArray[1];
									minQty=mhskusArray[2];
									var i_text=i.toString()
									var ItemQtymskus='ItemQtymskus_'+i_text
									var Itemmskus='Itemmskus_'+i_text
									var minQtymskus='minQtymskus_'+i_text
									
									
									mhskusStringShow=mhskusStringShow+'<tr ><td>&nbsp;</td><td>'+itemName+
									'<input type="hidden" name="'+ Itemmskus +'" id="'+ Itemmskus +'" value="'+itemID+'" min="0">'+
									'<input type="hidden" name="'+ minQtymskus +'" id="'+ minQtymskus +'" value="'+minQty+'" min="0">'+
									'</td><td width="60"><input type="number" name="'+ItemQtymskus +'" id="'+ ItemQtymskus +'" value="" min="0"></td><td width="5px">&nbsp;</td></tr>'
									mhskusStringShow=mhskusStringShow+'<tr height="1px" bgcolor="#CCCCCC" ><td></td><td></td><td> </td><td ></td></tr>'
									
								}
								mhskusStringShow=mhskusStringShow+'</table>'
								
								localStorage.mhskusStringShow=mhskusStringShow
								$("#mhskus").html(localStorage.mhskusStringShow);
								
								
								//==========Create NPD list
								
								var npdSingleArray = npdList.split('rdrd');	
								var npdSingleTotal = npdSingleArray.length;
								//alert (mhskusList);
								var npdStringShow=''
								npdStringShow=npdStringShow+'<table width="100%" border="0"><tr style="color:#0329C0"> <td colspan="2" style="color:#006A6A; font-size:18px;">'+localStorage.outletNameID+'</td></tr><tr > </table></br>'
								npdStringShow=npdStringShow+'<table  width="100%" border="0" cellpadding="0" cellspacing="0">'
                  				npdStringShow=npdStringShow+'<tr bgcolor="#9FCED7"  ><td></td><td>Item</td><td> QTY</td><td ></td></tr><tr height="1px" bgcolor="#CCCCCC" ><td></td><td></td><td> </td><td ></td></tr>'
								
								//i=6;
//								alert (i.toString())
								localStorage.npdTotal=npdSingleTotal
								for (var i=0; i < npdSingleTotal-1; i++){
									npdArray = npdSingleArray[i].split('fdfd');
									itemID=npdArray[0];
									itemName=npdArray[1];
									minQty_npd=npdArray[2];
									var i_text=i.toString()
									var ItemQtynpd='ItemQtynpd_'+i_text
									var Itemnpd='Itemnpd_'+i_text
									var minQty='minQty_npd_'+i_text
									
									
									npdStringShow=npdStringShow+'<tr ><td>&nbsp;</td><td>'+itemName+
									'<input type="hidden" name="'+ Itemnpd +'" id="'+ Itemnpd +'" value="'+itemID+'" min="0">'+
									'<input type="hidden" name="'+ minQty +'" id="'+ minQty +'" value="'+minQty_npd+'" min="0">'+
									'</td>'+
									'<td width="60"><input type="number" name="'+ItemQtynpd +'" id="'+ ItemQtynpd +'" value="" min="0"></td><td width="5px">&nbsp;</td></tr>'
									npdStringShow=npdStringShow+'<tr height="1px" bgcolor="#CCCCCC" ><td></td><td></td><td> </td><td ></td></tr>'
									
								}
								npdStringShow=npdStringShow+'</table>'
								localStorage.npdStringShow=npdStringShow
								$("#npd").html(localStorage.npdStringShow);
								
						//=====================Create Fixed Display list
						
								var fdisplaySlabArray = fdisplayList.split('</slab>');
								var fdisplaySlabTotal = fdisplaySlabArray.length;

								var fdisplayStringShow=''
								fdisplayStringShow=fdisplayStringShow+'<table width="100%" border="0"><tr style="color:#0329C0"> <td colspan="2" style="color:#006A6A; font-size:18px;">'+localStorage.outletNameID+'</td></tr><tr > </table></br>'
								
								localStorage.fdisplaySlabTotal=fdisplaySlabTotal
								for (var slab=0; slab < fdisplaySlabTotal-1; slab++){
										var fdisplaySlabList = fdisplaySlabArray[slab].replace("<slab>","");
										var fdisplaySlab_1Array = fdisplayList.split('<slab>');
										var fdisplaySlab_image = fdisplaySlab_1Array[0];
										//var fdisplaySlabList = fdisplaySlab_1Array[1];
										
										
										var slab_text=slab.toString()
										var fdSL_image_div='fdSL_image_div_'+slab_text
										var fdSL_image_div_hidden='fdSL_image_div_hidden_'+slab_text
										var fdSL_image_name_hidden='fdSL_image_name_hidden_'+slab_text
										
										var fdSL_image='fdSL_image_'+slab_text
									    var fdSL_image_div='fdSL_image_div_'+slab_text
										var fdSLfdisplay='fdSLfdisplay_'+slab_text
										
										
										fdisplayStringShow=fdisplayStringShow+'<div id="fddiv_'+slab.toString()+'">'
										fdisplayStringShow=fdisplayStringShow+'<img height="100px" width="100%"  src="'+apipath_image+'static/uni_images/display/'+fdisplaySlab_image+'" alt="FixedDisplay" />';
										fdisplayStringShow=fdisplayStringShow+'<table width="100%" border="0" cellpadding="0" cellspacing="0">'
										fdisplayStringShow=fdisplayStringShow+'<tr bgcolor="#9FCED7" ><td width="1%" >&nbsp;</td><td >Item</td> <td width="50px">QTY</td><td></td><td width="50px">Face Up</td><td></td><td width="100px">Visible</td></tr>'
										
										var fdisplaySingleArray = fdisplaySlabList.split('rdrd');	
										var fdisplaySingleTotal = fdisplaySingleArray.length;
										
										var fdisplayTotal='fdisplayTotal'+slab.toString()
										
										var fdSL_total_hidden='fdSL_total_hidden_'+slab.toString()
										
										//alert (fdSL_image_name_hidden);
										
										localStorage.fdisplayTotal=fdisplaySingleTotal
										
										for (var i=0; i < fdisplaySingleTotal-1; i++){
											fdisplayArray = fdisplaySingleArray[i].split('fdfd');
											slab_fdisplay=fdisplayArray[0]
											itemID=fdisplayArray[1];
											itemName=fdisplayArray[2];
											fdSL_fdisplay=fdisplayArray[3];
											var i_text=i.toString()
											var ItemQtyfdisplay='ItemQtyfdisplay_'+i_text
											var Itemfdisplay='Itemfdisplay_'+i_text
											var ItemFaceupfdisplay='ItemFaceupfdisplay_'+i_text
											var ItemVisiblefdisplay='ItemVisiblefdisplay_'+i_text
											var slabfdisplay='slabfdisplay_'+i_text
											//var fdSLfdisplay='fdSLfdisplay_'+i_text
											
											
											
											fdisplayStringShow=fdisplayStringShow+'<tr ><td width="1%" >&nbsp;</td><td>'+itemName+'<input type="hidden" name="'+ Itemfdisplay +'" id="'+ Itemfdisplay +'" value="'+itemID+'" min="0"> <input type="hidden" name="'+ slabfdisplay +'" id="'+ slabfdisplay +'" value="'+slab_fdisplay+'" min="0"></td>'+
															  '<td><input  onClick="checkQtyFd('+i+')" onKeyUp="checkQtyFd('+i+')" type="number" name="'+ItemQtyfdisplay +'" id="'+ ItemQtyfdisplay +'" value="" min="0"></td><td></td><td><input onKeyUp="checkQtyFd('+i+')"  type="number" name="'+ItemFaceupfdisplay +'" id="'+ ItemFaceupfdisplay +'" value="" min="0"></td>'+
															  '<td></td><td><label  style="width:5px; height:8px"><input type="checkbox" name="'+ ItemVisiblefdisplay +'" id="'+ ItemVisiblefdisplay +'" value=""/></label></td></tr>'
											fdisplayStringShow=fdisplayStringShow+'<tr height="1px" bgcolor="#CCCCCC" ><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'
											
										}
										fdisplayStringShow=fdisplayStringShow+'</table>'
										fdisplayStringShow=fdisplayStringShow+'</div>'	
										
										
										fdisplayStringShow=fdisplayStringShow+'<table width="100%" border="0"><tr>'+
												'<input type="hidden" name="'+ fdSLfdisplay +'" id="'+ fdSLfdisplay +'" value="'+fdSL_fdisplay+'" min="0">  '+
												'<td> <a data-role="button" href="#" onClick="get_pic_fdisplay('+slab+')" >Take Picture </a></td></tr></table>'+ 
											    '<img id="'+fdSL_image_div+'" height="100px" width="100px"  src="" alt="FixedDisplay" />'+
												'<input type="hidden" name="'+ fdSL_image_div_hidden +'" id="'+ fdSL_image_div_hidden +'" value="" >'+
												'<input type="hidden" name="'+ fdSL_image_name_hidden +'" id="'+ fdSL_image_name_hidden +'" value="" >'+
												'<input type="hidden" name="'+ fdSL_total_hidden +'" id="'+ fdSL_total_hidden +'" value="'+fdisplaySingleTotal+'" >'
										
										
										
									
										
								}
								localStorage.fdisplayStringShow=fdisplayStringShow
								$("#fdisplay").html(localStorage.fdisplayStringShow);

								//==========Create QPDS Display list
								
								
								var qpdsSlabArray = qpdsList.split('</scheme>');
								var qpdsSlabTotal = qpdsSlabArray.length;
								
								var qpdsStringShow=''
								qpdsStringShow=qpdsStringShow+'<table width="100%" border="0"><tr style="color:#0329C0"> <td colspan="2" style="color:#006A6A; font-size:18px;">'+localStorage.outletNameID+'</td></tr><tr > </table></br>'
								
								localStorage.qpdsSlabTotal=qpdsSlabTotal
								for (var slab=0; slab < qpdsSlabTotal-1; slab++){
																				
										
										var qpdsSlab_1Array = qpdsSlabArray[slab].split('<scheme>');
										var qpdsSlab_image = qpdsSlab_1Array[0];
										
										var qpdsSlabList = qpdsSlab_1Array[1].replace("<scheme>","");
										
										
										qpdsStringShow=qpdsStringShow+'<div id="qpdsdiv_'+slab.toString()+'">'
										
										qpdsStringShow=qpdsStringShow+'<img height="100px" width="100%"  src="'+apipath_image+'static/uni_images/scheme/'+qpdsSlab_image+'" alt="QPDS" />';
										qpdsStringShow=qpdsStringShow+'<table width="100%" border="0" cellpadding="0" cellspacing="0">'
										qpdsStringShow=qpdsStringShow+'<tr bgcolor="#9FCED7" ><td width="1%" >&nbsp;</td><td >Item</td> <td width="50px">QTY</td><td></td><td width="50px">Face Up</td><td></td><td>Visible</td></tr>'
										
										
										
										
										
										var qpdsSingleArray = qpdsSlabList.split('rdrd');	
										var qpdsSingleTotal = qpdsSingleArray.length;
																				
										var qpdsSL_image_div='qpdsSL_image_div_'+slab.toString()
										var qpdsSL_image_div_hidden='qpdsSL_image_div_hidden_'+slab.toString()
										var qpdsSL_image_name_hidden='qpdsSL_image_name_hidden_'+slab.toString()
										
										
										var qpdsSL_total_hidden='qpdsSL_total_hidden_'+slab.toString()
										
										var qpdsSL_f='qpdsSL_'+slab.toString()
										
										localStorage.qpdsTotal=qpdsSingleTotal

										for (var i=0; i < qpdsSingleTotal-1; i++){
											qpdsArray = qpdsSingleArray[i].split('fdfd');
											scheme_qpds=qpdsArray[0]
											itemID=qpdsArray[1];
											itemName=qpdsArray[2];
											qpdsSL=qpdsArray[3];
											
											var i_text=i.toString()
											var ItemQtyqpds='ItemQtyqpds_'+i_text
											var Itemqpds='Itemqpds_'+i_text
											var ItemFaceupqpds='ItemFaceupqpds_'+i_text
											var ItemVisibleqpds='ItemVisibleqpds_'+i_text
											var schemeqpds='schemeqpds_'+i_text											
											qpdsStringShow=qpdsStringShow+
														   '<tr ><td width="1%" >&nbsp;</td><td>'+itemName+'<input type="hidden" name="'+ Itemqpds +'" id="'+ Itemqpds +'" value="'+itemID+'" min="0">'+
														   '<input type="hidden" name="'+ schemeqpds +'" id="'+ schemeqpds +'" value="'+scheme_qpds+'" min="0"> </td>'+
														   '<td><input onClick="checkQtyQpds('+i+')" onKeyUp="checkQtyQpds('+i+')"  type="number" name="'+ItemQtyqpds +'" id="'+ ItemQtyqpds +'" value="" min="0"></td>'+
														   '<td></td><td><input onKeyUp="checkQtyQpds('+i+')" type="number" name="'+ItemFaceupqpds +'" id="'+ ItemFaceupqpds +'" value="" min="0"></td><td></td>'+
														   '<td><label  style="width:5px; height:8px"><input type="checkbox" name="'+ ItemVisibleqpds +'" id="'+ ItemVisibleqpds +'" value=""/></label></td></tr>'
											qpdsStringShow=qpdsStringShow+'<tr height="1px" bgcolor="#CCCCCC" ><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'
										}
										qpdsStringShow=qpdsStringShow+'</table>'
										qpdsStringShow=qpdsStringShow+'</div>'
										
										qpdsStringShow=qpdsStringShow+
													  '<table width="100%" border="0"><tr><td>'+
													  ' <input type="hidden" name="'+ qpdsSL_f +'" id="'+ qpdsSL_f +'" value="'+qpdsSL+'" min="0">  '+
													  ' <a data-role="button" href="#" onClick="get_pic_qpds('+slab+')" >Take Picture </a></td></tr></table>'
										
										//alert (qpdsSL);
										
										 qpdsStringShow=qpdsStringShow+
										 		'<img id="'+qpdsSL_image_div+'" height="100px" width="100px"  src="" alt="QPDS" />'+
												'<input type="hidden" name="'+ qpdsSL_image_div_hidden +'" id="'+ qpdsSL_image_div_hidden +'" value="" >'+
												'<input type="hidden" name="'+ qpdsSL_image_name_hidden +'" id="'+ qpdsSL_image_name_hidden +'" value="" >'+
												'<input type="hidden" name="'+ qpdsSL_total_hidden +'" id="'+ qpdsSL_total_hidden +'" value="'+qpdsSingleTotal+'" >'
								
								 
								}
								localStorage.qpdsStringShow=qpdsStringShow
								$("#qpds").html(localStorage.qpdsStringShow);
								
								
								
								//==========Create Gift Ack list
								var giftSingleArray = giftList.split('rdrd');	
								var giftSingleTotal = giftSingleArray.length;
								var giftStringShow=''
								giftStringShow=giftStringShow+'<table width="100%" border="0"><tr style="color:#0329C0"> <td colspan="2" style="color:#006A6A; font-size:18px;">'+localStorage.outletNameID+'</td></tr><tr > </table></br>'
								giftStringShow=giftStringShow+'<table width="100%" border="0" cellpadding="0" cellspacing="0">'
                  				giftStringShow=giftStringShow+'<tr bgcolor="#9FCED7" ><td width="1%" >&nbsp;</td><td >Item</td> <td>Received</td><td></td><td>Memo</td></tr>'
								
								localStorage.giftTotal=giftSingleTotal
								for (var i=0; i < giftSingleTotal-1; i++){
									giftArray = giftSingleArray[i].split('fdfd');
									slabSchemeName_gift=giftArray[0];
									amount_gift=giftArray[1];
									gift_id=giftArray[2];
									var i_text=i.toString()
									var slabSchemeName_gift_f='slabSchemeNamegift_'+i_text
									var amount_gift_f='amount_gift_'+i_text
									var receivedgift_f='receivedgift_'+i_text
									var memogift_f='memogift_'+i_text
									var gift_id_f='gift_id_'+i_text
									
									giftStringShow=giftStringShow+'<tr ><td width="1%" >&nbsp;</td><td>'+slabSchemeName_gift+' BDT  '+amount_gift+'<input type="hidden" name="'+ slabSchemeName_gift_f +'" id="'+ slabSchemeName_gift_f +'" value="'+slabSchemeName_gift+'" ><input type="hidden" name="'+ amount_gift_f +'" id="'+ amount_gift_f +'" value="'+amount_gift+'" > <input type="hidden" name="'+ gift_id_f +'" id="'+ gift_id_f +'" value="'+gift_id+'" ></td><td><label  style="width:5px; height:8px"><input type="checkbox" name="'+ receivedgift_f +'" id="'+ receivedgift_f +'" value=""/></label></td> <td></td><td><label  style="width:5px; height:8px"><input type="checkbox" name="'+ memogift_f +'" id="'+ memogift_f +'" value=""/></label></td></tr>'
									giftStringShow=giftStringShow+'<tr height="1px" bgcolor="#CCCCCC" ><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'
									
								}
								
								giftStringShow=giftStringShow+'</table>'
								if (localStorage.giftTotal > 1){
									//alert (localStorage.giftTotal);
									giftStringShow=giftStringShow+'</br><table width="100%" border="0" cellpadding="0" cellspacing="0"><tr><td>'+              
												   '<a data-role="button" href="#" onClick="get_pic_gift();" >Take Picture </a></td> </tr></table>'
								}
								
								if (localStorage.giftTotal > 1){
								   giftStringShow=giftStringShow+'<img id="gift_image_div"  height="100px" width="100px"  src="" alt="Gift" />'
								}
								else{
									giftStringShow=giftStringShow+'<img id="gift_image_div" style="display:none" height="100px" width="100px"  src="" alt="Gift" />'
								}
								giftStringShow=giftStringShow+
												'<input type="hidden" name="gift_image_div_hidden" id="gift_image_div_hidden" value="" >'+
												'<input type="hidden" name="gift_image_name_hidden" id="gift_image_name_hidden" value="" >'
												
								
								localStorage.giftStringShow=giftStringShow
								$("#gift").html(localStorage.giftStringShow);
								
								//==========Create Marchandizing list
								var marchadizingSingleArray = marchadizingList.split('rdrd');	
								var marchadizingSingleTotal = marchadizingSingleArray.length;
								
								var marchadizingStringShow=''
								marchadizingStringShow=marchadizingStringShow+'<table width="100%" border="0"><tr style="color:#0329C0"> <td colspan="2" style="color:#006A6A; font-size:18px;">'+localStorage.outletNameID+'</td><td  colspan="2"><a data-role="button" href="#dialogMarchandizing" >+</a> </td></tr><tr > </table></br>'
								marchadizingStringShow=marchadizingStringShow+'<table  width="100%" border="0" cellpadding="0" cellspacing="0">'
                  				marchadizingStringShow=marchadizingStringShow+'<tr bgcolor="#9FCED7" ><td width="1%" >&nbsp;</td> <td >Item / Brand</td><td>QTY </td><td> </td><td>Condition</td><td > </td><td>Visible</td><td> </td><td >Dismantled</td></tr>'
								
								
								localStorage.marchadizingTotal=marchadizingSingleTotal
								for (var i=0; i < marchadizingSingleTotal-1; i++){
									marchadizingArray = marchadizingSingleArray[i].split('fdfd');
									
									
									itemID_mar=marchadizingArray[0];
									itemName_mar=marchadizingArray[1];
									brandID_mar=marchadizingArray[2];
									brand_mar=marchadizingArray[3];
									qty_mar=marchadizingArray[4];
									insDate_mar=marchadizingArray[5];
									id_mar=marchadizingArray[6];
									
									var i_text=i.toString()
									var itemID_mar_f='itemID_mar_'+i_text
									var itemName_mar_f='itemName_mar_'+i_text									
									var brandID_mar_f='brandID_mar_'+i_text
									//var brand_mar_f='brandID_mar_'+i_text									
									var brand_mar_f='brand_mar_'+i_text
									var qty_mar_f='qty_mar_'+i_text
									var insDate_mar_f='insDate_mar_'+i_text
									var condition_mar_f='condition_mar_'+i_text
									var visible_mar_f='visible_mar_'+i_text
									var dism_mar_f='dism_mar_'+i_text
									
									var id_mar_f='id_mar_'+i_text
									
									

									var condition_combo='<option value="0" >&nbsp; </option><option value="Good/Sound" >Good/Sound</option><option value="Damaged/ Torn" >Damaged/Torn</option><option value="Need repair" >Need repair</option>'
									
									var visible_combo='<option value="0" >&nbsp; </option><option value="Yes" >Yes</option><option value="No" >No</option>'
									
									
									
									
									marchadizingStringShow=marchadizingStringShow+'<tr ><td  >&nbsp;</td><td>'+itemName_mar+ '</br>'+brand_mar+'</br><font face="Verdana, Geneva, sans-serif" size="-10">'+insDate_mar+'</font>'+'<input type="hidden" name="'+ itemID_mar_f +'" id="'+ itemID_mar_f +'" value="'+itemID_mar +'" >'+'<input type="hidden" name="'+ id_mar_f +'" id="'+ id_mar_f +'" value="'+id_mar +'" >'+'<input type="hidden" name="'+ itemName_mar_f +'" id="'+ itemName_mar_f +'" value="'+itemName_mar +'" >'+'<input type="hidden" name="'+ brandID_mar_f +'" id="'+ brandID_mar_f +'" value="'+brandID_mar +'" >'+'<input type="hidden" name="'+ brand_mar_f +'" id="'+ brand_mar_f +'" value="'+brand_mar +'" >'+'<input type="hidden" name="'+ qty_mar_f +'" id="'+ qty_mar_f +'" value="'+qty_mar +'" >'+'<input type="hidden" name="'+ insDate_mar_f +'" id="'+ insDate_mar_f +'" value="'+insDate_mar +'" >'+'</td><td width="3%" align="center">'+qty_mar+'</td><td width="1%"> </td>'
                    				marchadizingStringShow=marchadizingStringShow+'<td width="20%"  ><select style="height:20px" name="'+condition_mar_f+'" id="'+condition_mar_f+'" data-native-menu="false">'+condition_combo+ '</select></td><td width="1%"> </td>'
									marchadizingStringShow=marchadizingStringShow+'<td><select style="height:20px" name="'+visible_mar_f+'" id="'+visible_mar_f+'" data-native-menu="false">'+visible_combo+ '</select></td><td width="1%"> </td>'
                    				marchadizingStringShow=marchadizingStringShow+'<td width="5%"> <label  style="width:5px; height:20px"><input type="checkbox" name="'+dism_mar_f+'" id="'+dism_mar_f+'" value=""/></label> </td></tr>'
									
																		
									marchadizingStringShow=marchadizingStringShow+'<tr height="1px" bgcolor="#CCCCCC" ><td></td><td  ></td><td ></td><td></td><td ></td><td></td><td></td><td></td><td></td></tr>'
									
								}
								marchadizingStringShow=marchadizingStringShow+'</table>'
								
								localStorage.marchadizingStringShow=marchadizingStringShow
								$("#marchadizing").html(localStorage.marchadizingStringShow);
								
					//========dynamic modal form for new marchandizing start=========
							// Item	
								var marchadizingItemSingleArray = marchadizingItemList.split('rdrd');	
								var marchadizingItemSingleTotal = marchadizingItemSingleArray.length;
								
								var marchadizingItemStringShow=''
								marchadizingItemStringShow=marchadizingItemStringShow+'<select name="select_mar_item" id="select_mar_item" data-native-menu="false"><option value="0" >Item </option>'
								
								localStorage.marchadizingItemTotal=marchadizingItemSingleTotal
								for (var i=0; i < marchadizingItemSingleTotal-1; i++){
									marchadizingItemArray = marchadizingItemSingleArray[i].split('fdfd');
									
									
									marItemID=marchadizingItemArray[0];
									marItemName=marchadizingItemArray[1];
									
									marchadizingItemStringShow=marchadizingItemStringShow+'<option value="'+marItemID+'" >'+marItemName+'</option>'
								}
								marchadizingItemStringShow=marchadizingItemStringShow+'</select>'
								
								localStorage.marchadizingItemStringShow=marchadizingItemStringShow
								$("#selectItem").html(localStorage.marchadizingItemStringShow);
								
							//Brand
							   
							    var marchadizingBrandSingleArray = marchadizingBrandList.split('rdrd');	
								var marchadizingBrandSingleTotal = marchadizingBrandSingleArray.length;
								
								var marchadizingBrandStringShow=''
								marchadizingBrandStringShow=marchadizingBrandStringShow+'<select name="select_mar_brand" id="select_mar_brand" data-native-menu="false"><option value="0" >Brand</option>'
								
								localStorage.marchadizingBrandTotal=marchadizingBrandSingleTotal
								for (var i=0; i < marchadizingBrandSingleTotal-1; i++){
									marchadizingBrandArray = marchadizingBrandSingleArray[i].split('fdfd');
									
									
									marBrandID=marchadizingBrandArray[0];
									marBrandName=marchadizingBrandArray[1];
									
									marchadizingBrandStringShow=marchadizingBrandStringShow+'<option value="'+marBrandID+'" >'+marBrandName+'</option>'
								}
								marchadizingBrandStringShow=marchadizingBrandStringShow+'</select>'
								
								localStorage.marchadizingBrandStringShow=marchadizingBrandStringShow
								$("#selectBrand").html(localStorage.marchadizingBrandStringShow);	
								
								
							//	===========dynamic modal form for new marchandizing end================
								
								var startTime=get_date()
								localStorage.startTime=startTime
								//alert (startTime);
								$("#startTime").val(localStorage.startTime);
							}
						}
				      },
				  error: function(result) {
					 // alert (result);
					  var url = "#login";
					  $.mobile.navigate(url);	
				  }
			  });//end ajax*/
			  
}
//=====================Select Outlet End=========================

//=====================Route Exception start=====================
function selectRouteException() { 
	var selected_route_exception=($("input:radio[name='RadioRouteEx']:checked").val())
   // alert (selected_route_exception);
	if(selected_route_exception!=undefined){
		localStorage.routeException=selected_route_exception;
		var url = "#menuPage";
		$.mobile.navigate(url);	
	}
}
//=====================Route Exception end=====================



//=====================Toggle==========================
function new_m() { 
	jQuery("#newMarchandizing").toggle();
}



//======================Submit Data Start======================

function mhskus_ready_data() { 
	//===============MHSKUS data==================
	var mhskus_data=""
	for (var i=0; i < localStorage.mhskusTotal-1; i++){
		var itemskus=$( "#Itemmskus_"+i.toString()).val();
		var itemQtyskus=$( "#ItemQtymskus_"+i.toString()).val();
		var minQtymskus=$( "#minQtymskus_"+i.toString()).val();
		
		
		mhskus_data=mhskus_data+itemskus+'fdfd'+itemQtyskus+'fdfd'+minQtymskus+'rdrd';
		//alert (minQtymskus);
	}
	localStorage.mhskus_data_ready=mhskus_data;
	mhskus_page_set();
	//alert ('nadira');
}

function mhskus_page_set() { 
	 var mhskus_array =  localStorage.mhskus_data_ready.split('rdrd');
	 for (var i=0; i < mhskus_array.length-1; i++){
		var mhskus_single_array = mhskus_array[i].split('fdfd');	
		var itemQty=mhskus_single_array[1];
		$("#ItemQtymskus_"+i.toString()).val(itemQty);
	 }
}

function npd_ready_data() { 
	//===============NPD data==================
	var npd_data=""
	for (var i=0; i < localStorage.npdTotal-1; i++){
		var ItemQtynpd=$( "#ItemQtynpd_"+i.toString()).val();
		var Itemnpd=$( "#Itemnpd_"+i.toString()).val();
		var minQty=$( "#minQty_npd_"+i.toString()).val(); 
		npd_data=npd_data+Itemnpd+'fdfd'+ItemQtynpd+'fdfd'+minQty+'rdrd';
		//alert (minQty);
	}
	 localStorage.npd_data_ready=npd_data

}
function npd_page_set() { 
	 var npd_array =  localStorage.npd_data_ready.split('rdrd');
	 for (var i=0; i < npd_array.length-1; i++){
		var npd_single_array = npd_array[i].split('fdfd');	
		var itemQty=npd_single_array[1];
		$("#ItemQtynpd_"+i.toString()).val(itemQty);
	 }
}

function fdisplay_ready_data() { 
	//===============fixeddisplay data==================
	var fdisplay_data=""
	var fdisplay_data_detail="";
	var fdisplay_data_head="";
	for (var i=0; i < localStorage.fdisplaySlabTotal-1; i++){
		var fdisplayTotal='fdisplayTotal'+i.toString()
		
		var fdTotal=$("#fdSL_total_hidden_"+i.toString()).val();
		var fdSLfdisplay_image_path=$("#fdSL_image_div_hidden_"+i.toString()).val(); 
		var fdSLfdisplay_image_name=$("#fdSL_image_name_hidden_"+i.toString()).val(); 
		var fdSLfdisplay=$("#fdSLfdisplay_"+i.toString()).val(); 
			for (var d=0; d < fdTotal-1; d++){
				var ItemQtyfdisplay=$("#ItemQtyfdisplay_"+d.toString()).val();
				var Itemfdisplay=$("#Itemfdisplay_"+d.toString()).val();
				var ItemFaceupfdisplay=$("#ItemFaceupfdisplay_"+d.toString()).val();
				var slabfdisplay=$("#slabfdisplay_"+d.toString()).val();
	
				var ItemVisiblefdisplay_f="#ItemVisiblefdisplay_"+d.toString();
				var ItemVisiblefdisplay_g= ($(ItemVisiblefdisplay_f).is(':checked') ? 1 : 0);
				
					if (ItemVisiblefdisplay_g==0){
						ItemVisiblefdisplay='NO'
					}
					if (ItemVisiblefdisplay_g==1){
						ItemVisiblefdisplay='YES'
					}	
				
					fdisplay_data_detail=fdisplay_data_detail+Itemfdisplay+'fdfd'+ItemQtyfdisplay+'fdfd'+ItemFaceupfdisplay+'fdfd'+ItemVisiblefdisplay+'fdfd'+slabfdisplay+'fdfd'+fdSLfdisplay+'fdfd'+'rdrd'
			}
		fdisplay_data_head=fdisplay_data_head+slabfdisplay+'fdfd'+fdSLfdisplay+'fdfd'+fdSLfdisplay_image_name+'fdfd'+fdSLfdisplay_image_path+'rdrd'

	}
	 fdisplay_data='headstart'+fdisplay_data_head+'headend'+fdisplay_data_detail
	 localStorage.fdisplay_data_ready=fdisplay_data
	
	 fdisplay_page_set()
	// alert (localStorage.fdisplay_data_ready);

}

function fdisplay_page_set() { 
	var fdisplay_array =  localStorage.fdisplay_data_ready.split('headend');
	var fdisplay_head=fdisplay_array[0].replace("headstart","");
	var fdisplay_detail=fdisplay_array[1];
	
	
	for (var i=0; i < localStorage.fdisplaySlabTotal-1; i++){
		var head_s_array=fdisplay_head.split('fdfd');
		var slabfdisplay =head_s_array[0];
		var fdisplayTotal=head_s_array[1];
		var fdisplayImg=head_s_array[2];
		var fdisplayImg_path=head_s_array[3].replace("rdrd","");
		
		//fdisplayImg_path='q343253456rdrd'
		
		$("#fdSL_image_name_hidden_"+i.toString()).val(fdisplayImg);
		$("#fdSL_image_div_hidden_"+i.toString()).val(fdisplayImg_path);
		
		if ((fdisplayImg.length > 10) & (fdisplayImg_path.length > 10)){
			$('#fddiv_'+i.toString()).find('input, textarea, button, select').attr('disabled','disabled');
		}
		
		var fdisplay_detail_array =  fdisplay_detail.split('rdrd');
		var fdTotal=fdisplay_detail_array.length
		//alert (fdisplayImg_path.length);
			
			for (var d=0; d < fdTotal-1; d++){
				
				var fdisplay_detail_s_array =  fdisplay_detail_array[d].split('fdfd');
				
				var ItemQtyfdisplay= fdisplay_detail_s_array[1];
				var ItemFaceupfdisplay= fdisplay_detail_s_array[2];
				var ItemVisiblefdisplay= fdisplay_detail_s_array[3];
				
				
				
				$("#ItemQtyfdisplay_"+d.toString()).val(ItemQtyfdisplay);
				$("#ItemFaceupfdisplay_"+d.toString()).val(ItemFaceupfdisplay);
				if (ItemVisiblefdisplay=='YES'){
					$("#ItemVisiblefdisplay_"+d.toString()).attr('checked',true);
				}
				
			
			}
	}
}

function qpds_ready_data() { 
	//===============QPDS data==================
	var qpds_data=""
	var qpds_data_detail="";
	var qpds_data_head="";
		
	for (var i=0; i < localStorage.qpdsSlabTotal-1; i++){
		var qpdsSL_image_path=$("#qpdsSL_image_div_hidden_"+i.toString()).val(); 
		var qpdsSL_image_name=$("#qpdsSL_image_name_hidden_"+i.toString()).val(); 
		var qpdsSL=$("#qpdsSL_"+i.toString()).val();
		
		var qpdsTotal='qpdsTotal'+i.toString()
		var qpdsTotal_1=$("#qpdsSL_total_hidden_"+i.toString()).val();
		
		
		for (var d=0; d < qpdsTotal_1-1; d++){
			var ItemQtyqpds= $("#ItemQtyqpds_"+d.toString()).val();  
			var Itemqpds= $("#Itemqpds_"+d.toString()).val();  
			var ItemFaceupqpds=$("#ItemFaceupqpds_"+d.toString()).val();   
			var schemeqpds=$("#schemeqpds_"+d.toString()).val(); 

 
			var ItemVisibleqpds_f="#ItemVisibleqpds_"+d.toString();
     		var ItemVisibleqpds_g= ($(ItemVisibleqpds_f).is(':checked') ? 1 : 0);
			
			if (ItemVisibleqpds_g==0){
				ItemVisibleqpds='NO'
			}
			if (ItemVisibleqpds_g==1){
				ItemVisibleqpds='YES'
			}
			qpds_data_detail=qpds_data_detail+Itemqpds+'fdfd'+ItemQtyqpds+'fdfd'+ItemFaceupqpds+'fdfd'+ItemVisibleqpds+'fdfd'+schemeqpds+'fdfd'+qpdsSL+'rdrd'
		}
		qpds_data_head=qpds_data_head+schemeqpds+'fdfd'+qpdsSL+'fdfd'+qpdsSL_image_name+'fdfd'+qpdsSL_image_path+'rdrd'
	
	}
	qpds_data='headstart'+qpds_data_head+'headend'+qpds_data_detail
	localStorage.qpds_data_ready=qpds_data;
	qpds_page_set();
}

function qpds_page_set() { 
	var qpds_array =  localStorage.qpds_data_ready.split('headend');
	var qpds_head=qpds_array[0].replace("headstart","");
	var qpds_detail=qpds_array[1];
	
	
	for (var i=0; i < localStorage.qpdsSlabTotal-1; i++){
		var head_s_array=qpds_head.split('fdfd');
		var slabqpds =head_s_array[0];
		var qpdsTotal=head_s_array[1];
		
		
		var qpdsImg=head_s_array[2];
		var qpdsImg_path=head_s_array[3].replace("rdrd","");
		
		//qpdsImg_path='q343253456rdrd'
		
		$("#qpdsSL_image_name_hidden_"+i.toString()).val(qpdsImg);
		$("#qpdsSL_image_div_hidden_"+i.toString()).val(qpdsImg_path);
		
		if ((qpdsImg.length > 10) & (qpdsImg_path.length > 10)){
			$('#qpdsdiv_'+i.toString()).find('input, textarea, button, select').attr('disabled','disabled');
		}
		
		var qpds_detail_array =  qpds_detail.split('rdrd');
		var qpdsDTotal=qpds_detail_array.length
		
		//$("#fdSL_total_hidden_"+i.toString()).val();
		
		//var fdTotal=$("#fdSL_total_hidden_"+i.toString()).val();
//		var fdSLfdisplay_image_path=$("#fdSL_image_div_hidden_"+i.toString()).val(); 
//		var fdSLfdisplay_image_name=$("#fdSL_image_name_hidden_"+i.toString()).val(); 
		//var fdSLfdisplay=$("#fdSLfdisplay_"+i.toString()).val(); 
			
			for (var d=0; d < qpdsDTotal-1; d++){
				
				var qpds_detail_s_array =  qpds_detail_array[d].split('fdfd');
				
				var ItemQtyqpds = qpds_detail_s_array[1];
				var ItemFaceupqpds = qpds_detail_s_array[2];
				var ItemVisibleqpds = qpds_detail_s_array[3];
				
				
				
				$("#ItemQtyqpds_"+d.toString()).val(ItemQtyqpds);
				$("#ItemFaceupqpds_"+d.toString()).val(ItemFaceupqpds);
				if (ItemVisibleqpds=='YES'){
					$("#ItemVisibleqpds_"+d.toString()).attr('checked',true);
				}

			}
	}
}

function gift_ready_data() { 
	//===============Gift data==================
	
	var gift_data="";
	
	for (var i=0; i < localStorage.giftTotal-1; i++){
		var slabSchemeName_gift=$( "#slabSchemeNamegift_"+i.toString()).val();
		var amount_gift=$( "#amount_gift_"+i.toString()).val();
		var gift_id=$( "#gift_id_"+i.toString()).val();
		
		var memogift_f="#memogift_"+i.toString();
		var receivedgift_f="#receivedgift_"+i.toString();
		
		
		var image_name=$("#gift_image_name_hidden").val();
		var gift_image_path=$("#gift_image_div_hidden").val();
	
		var memogift= ($(memogift_f).is(':checked') ? 1 : 0);
		var receivedgift= ($(receivedgift_f).is(':checked') ? 1 : 0);
		gift_data=gift_data+slabSchemeName_gift+'fdfd'+amount_gift+'fdfd'+receivedgift+'fdfd'+memogift+'fdfd'+gift_id+'fdfd'+image_name+'fdfd'+gift_image_path+'rdrd';
	}
	localStorage.gift_data_ready=gift_data
	gift_page_set();
	
	$('#outlet_info_msg').html(localStorage.outletNameID);
}

function gift_page_set() { 
	//===============Gift data==================
	//alert (localStorage.gift_data_ready);
	var gift_array =  localStorage.gift_data_ready.split('rdrd');
	//var giftTotal=gift_array.length
	
	for (var i=0; i < localStorage.giftTotal-1; i++){
		var gift_s_array =  gift_array[i].split('fdfd');
		
		var receivedgift = gift_s_array[2];
		var memogift = gift_s_array[3];
		
		var giftImg = gift_s_array[5];
		var giftPath = gift_s_array[6].replace("rdrd","");
		//alert (giftImg)

		//giftPath='q343253456rdrd'
		
		//alert (giftImg);
		$("#gift_image_name_hidden").val(giftImg);
		$("#gift_image_div_hidden").val(giftPath);
		
		if ((giftImg.length > 10) & (giftPath.length > 10)){
			$('#gift').find('input, textarea, button, select').attr('disabled','disabled');
		}
		

		
	    if (receivedgift==1){
			$("#receivedgift_"+i.toString()).attr('checked',true);
		}
		if (memogift==1){
			$("#memogift_"+i.toString()).attr('checked',true);
		}
		//var memogift= ($(memogift_f).is(':checked') ? 1 : 0);
//		var receivedgift= ($(receivedgift_f).is(':checked') ? 1 : 0);
//		gift_data=gift_data+slabSchemeName_gift+'fdfd'+amount_gift+'fdfd'+receivedgift+'fdfd'+memogift+'fdfd'+gift_id+'rdrd';
	}
	//localStorage.gift_data_ready=gift_data
}

function mar_ready_data() { 
//===============Marchadizing data==================
	var mar_data=""
	//alert (localStorage.giftTotal);
	for (var i=0; i < localStorage.marchadizingTotal-1; i++){
		var itemID_mar=$( "#itemID_mar_"+i.toString()).val();
		var itemName_mar=$( "#itemName_mar_"+i.toString()).val();
		var brandID_mar=$( "#brandID_mar_"+i.toString()).val();
		var brand_mar=$( "#brand_mar_"+i.toString()).val();
		var qty_mar=$( "#qty_mar_"+i.toString()).val();
		var insDate_mar=$( "#insDate_mar_"+i.toString()).val();
		var condition_mar=$( "#condition_mar_"+i.toString()).val();
		var visible_mar=$( "#visible_mar_"+i.toString()).val();
		var id_mar=$( "#id_mar_"+i.toString()).val();
		
		var dism_mar_f="#dism_mar_"+i.toString();
		var dism_mar= ($(dism_mar_f).is(':checked') ? 1 : 0);

		mar_data=mar_data+itemID_mar+'fdfd'+itemName_mar+'fdfd'+brandID_mar+'fdfd'+brand_mar+'fdfd'+qty_mar+'fdfd'+insDate_mar+'fdfd'+condition_mar+'fdfd'+visible_mar+'fdfd'+dism_mar+'fdfd'+id_mar+'rdrd';
	}	
	localStorage.mar_data_ready=mar_data
	mar_page_set();

}
function mar_page_set() { 
//===============Marchadizing data==================
	var mar_array =  localStorage.mar_data_ready.split('rdrd');
	for (var i=0; i < localStorage.marchadizingTotal-1; i++){
		var mar_s_array =  mar_array[i].split('fdfd');
		
		var condition_mar = mar_s_array[6];
		var visible_mar = mar_s_array[7];
		var dism_mar= mar_s_array[8];
		
		
		$( "#condition_mar_"+i.toString()).val(condition_mar);
		$( "#visible_mar_"+i.toString()).val(visible_mar);
		if (dism_mar==1){
			$("#dism_mar_"+i.toString()).attr('checked',true);
		}
		
		//alert (condition_mar);
		
		//var itemID_mar=$( "#itemID_mar_"+i.toString()).val();
//		var itemName_mar=$( "#itemName_mar_"+i.toString()).val();
//		var brandID_mar=$( "#brandID_mar_"+i.toString()).val();
//		var brand_mar=$( "#brand_mar_"+i.toString()).val();
//		var qty_mar=$( "#qty_mar_"+i.toString()).val();
//		var insDate_mar=$( "#insDate_mar_"+i.toString()).val();
//		var condition_mar=$( "#condition_mar_"+i.toString()).val();
//		var visible_mar=$( "#visible_mar_"+i.toString()).val();
//		var id_mar=$( "#id_mar_"+i.toString()).val();
		
		//var dism_mar_f="#dism_mar_"+i.toString();
//		var dism_mar= ($(dism_mar_f).is(':checked') ? 1 : 0);
//
//		mar_data=mar_data+itemID_mar+'fdfd'+itemName_mar+'fdfd'+brandID_mar+'fdfd'+brand_mar+'fdfd'+qty_mar+'fdfd'+insDate_mar+'fdfd'+condition_mar+'fdfd'+visible_mar+'fdfd'+dism_mar+'fdfd'+id_mar+'rdrd';
	}	
	

}
function submit_data() { 
	$("#sub_button").hide();
	
	$("#submit_data").html('<img height="40px" width="40px" src="loading.gif">');
	//=========================AJAX Submit==========================	
	var lat=$( "#lat").val();
	var long=$( "#long").val();
	var visitDate=get_date().substring(0,10);
    var endTime=get_date();
	var giftImage=$( "#gift_image_name_hidden").val();
	var latlong=lat.toString()+","+long.toString()
	
	//$("#submit_data").html(apipath+'syncSubmitData?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&synccode='+localStorage.synccode+'&route='+localStorage.selectedRoute+'&routeEx='+localStorage.routeException+'&outlet='+localStorage.selectedOutlet+'&scheduleDate='+ localStorage.selected_date +'&outletEx='+localStorage.outletException+'&channel='+localStorage.outletChannel+'&latlong='+latlong+'&visitDate='+visitDate+'&startTime='+localStorage.startTime+'&endTime='+endTime+'&giftImage='+giftImage+'&mhskus_data='+localStorage.mhskus_data_ready+'&npd_data='+localStorage.npd_data_ready+'&fdisplay_data='+localStorage.fdisplay_data_ready+'&qpds_data='+localStorage.qpds_data_ready+'&gift_data='+localStorage.gift_data_ready+'&mar_data='+localStorage.mar_data_ready+'&mar_data_new='+localStorage.m_new_string);
	
	//alert (localStorage.m_new_string);
	$.ajax({
				 type: 'POST',
				// url: apipath+'syncSubmitData?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&synccode='+localStorage.synccode+'&route='+localStorage.selectedRoute+'&routeEx='+localStorage.routeException+'&outlet='+localStorage.selectedOutlet+'&scheduleDate='+localstorage.selected_date+'&outletEx='+localStorage.outletException+'&channel='+localStorage.outletChannel+'&latlong='+latlong+'&visitDate='+visitDate+'&startTime='+localStorage.startTime+'&endTime='+endTime+'&giftImage='+giftImage+'&mhskus_data='+localStorage.mhskus_data_ready+'&npd_data='+localStorage.npd_data_ready+'&fdisplay_data='+localStorage.fdisplay_data_ready+'&qpds_data='+localStorage.qpds_data_ready+'&gift_data='+localStorage.gift_data_ready+'&mar_data='+localStorage.mar_data_ready+'&mar_data_new='+localStorage.m_new_string,
				url: apipath+'syncSubmitData?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&synccode='+localStorage.synccode+'&route='+localStorage.selectedRoute+'&routeEx='+localStorage.routeException+'&outlet='+localStorage.selectedOutlet+'&scheduleDate='+ localStorage.selected_date +'&outletEx='+localStorage.outletException+'&channel='+localStorage.outletChannel+'&latlong='+latlong+'&visitDate='+visitDate+'&startTime='+localStorage.startTime+'&endTime='+endTime+'&giftImage='+giftImage+'&mhskus_data='+localStorage.mhskus_data_ready+'&npd_data='+localStorage.npd_data_ready+'&fdisplay_data='+localStorage.fdisplay_data_ready+'&qpds_data='+localStorage.qpds_data_ready+'&gift_data='+localStorage.gift_data_ready+'&mar_data='+localStorage.mar_data_ready+'&mar_data_new='+localStorage.m_new_string,
				 success: function(result) {	
						//alert ('nadira');
						if (result==''){
							alert ('Sorry Network not available');
						}
						else{
							if (result=='FAILED'){
								$("#submit_data").html('Unauthorized User');
							}
							
							if (result=='SUCCESS'){
								
								
								
								uploadAll();
								cancel_outlet();
								
								localStorage.show_cancel=0;
								//alert ('nadira')
								//Disable outlet
								var check_outlet= localStorage.outletString;
								//alert ('<input type="radio" name="RadioOutlet" value="'+localStorage.selectedOutlet+'rdrd'+localStorage.selected_date_get+'">')
								localStorage.outletString=check_outlet.replace('<input type="radio" name="RadioOutlet" value="'+localStorage.selectedOutlet+'rdrd'+localStorage.selected_date_get+'">','<input type="radio" name="RadioOutlet" value="'+localStorage.selectedOutlet+'rdrd'+localStorage.selected_date_get+'" disabled="True">');
								//alert ('nnn')
								
								localStorage.m_new_string="";
								localStorage.m_new="";
								localStorage.selectedOutlet="";
								localStorage.outletExStringShow="";
								localStorage.outletException="";
								localStorage.outletChanne="";
								localStorage.outletNameID="";
								localStorage.mhskusTotal="";
								
								localStorage.npdTotal="";
								localStorage.fdisplaySlabTotal="";
								localStorage.fdisplayTotal="";
								localStorage.qpdsSlabTotal="";
								
								localStorage.qpdsTotal="";
								localStorage.giftTotal="";
								localStorage.marchadizingTotal="";
								localStorage.mhskus_data_ready="";
								localStorage.npd_data_ready="";
								localStorage.fdisplay_data_ready="";
								localStorage.qpds_data_ready="";
								localStorage.gift_data_ready="";
								localStorage.mar_data_ready="";
								
								$("#submit_data").html("Successfully Submitted");
												
								//doTimer();
								var url = "#menuPage";
								$.mobile.navigate(url);	
								//$(location).attr('href',url);
								location.reload
								
								
								localstorage.m_new="";
							}
									
						}
						
				      },
				  error: function(result) {
					 // alert (result);
					 $("#sub_button").show();
					 $("#submit_data").html("Connectivity Error.Please Check Your Network Connection and Try Again");
					  var url = "#submitPage";
					  $.mobile.navigate(url);	
				  }
			  });//end ajax
	

}


//======================Submit Data End======================
//===================add marchandizing======================

function marchandizing_add() { 
	
	var select_mar_item=$( "#select_mar_item").val();
	var select_mar_brand=$( "#select_mar_brand").val();
	var select_mar_qty=$( "#mar_qty_add").val();
	var select_mar_date=$( "#mar_date_add").val();
	//alert (select_mar_item);
	var m_new_string=''

	var start_new_mar=0;
	if  ((select_mar_item!=0) && (select_mar_brand!=0) &&  (select_mar_qty>0) && (select_mar_date.length>9)){
		
		m_new_string=localStorage.m_new_string
		m_new_string=m_new_string+select_mar_item+"fdfd"+select_mar_brand+"fdfd"+select_mar_qty+"fdfd"+select_mar_date+"rdrd"
		localStorage.m_new_string=m_new_string.replace("undefined","");
		//alert (localStorage.m_new_string);
	
		
		//$("#marchadizing_add_show").html(apipath+'marchandizing_add?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&synccode='+localStorage.synccode+'&outlet='+localStorage.selectedOutlet+'&m_item='+select_mar_item+'&m_brand='+select_mar_brand+'&m_qty='+select_mar_qty+'&m_date='+select_mar_date);
		/*start_new_mar=0;
		$.ajax({
				 type: 'POST',
				 url: apipath+'marchandizing_add?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&synccode='+localStorage.synccode+'&outlet='+localStorage.selectedOutlet+'&m_item='+select_mar_item+'&m_brand='+select_mar_brand+'&m_qty='+select_mar_qty+'&m_date='+select_mar_date,
				 success: function(result) {	
						if (result==''){
							alert ('Sorry Network not available');
						}
						else{
							var resultArray = result.split('<SYNCDATA>');		
							if (resultArray[0]=='FAILED'){
								$("#error_login").html('Unauthorized User');
							}
							
							if (resultArray[0]=='SUCCESS'){
							   	var newArray = resultArray[1].split('fdfd');
								var item_name=newArray[0]
								var brand_name=newArray[1]
								var qty=newArray[2]
								var m_date=newArray[3]
							    */
								if (localStorage.m_new.length>10){
									
									start_new_mar=1;
									var m_new = '<font color="#00007D">New Added: </font> </br>'
								}
								
								 m_new=localStorage.m_new
								
								 m_new=m_new+'</br><font color="#00007D">Item:&nbsp;&nbsp;  </font>'+select_mar_item+'</br><font color="#00007D">   Brand: &nbsp;&nbsp;  </font>'+select_mar_brand+'</br><font color="#00007D"> InsDate: &nbsp;&nbsp;  </font>'+select_mar_date+'</br><font color="#00007D"> Qty:&nbsp;&nbsp;  </font>'+select_mar_qty+'</br></br>'
								 //alert (m_new);
								 localStorage.m_new=m_new.replace("undefined","");
								 $("#marchadizing_add_show").html(localStorage.m_new);
								 
						/*	}
									
						}
				      },
				  error: function(result) {
					  var url = "#login";
					  $.mobile.navigate(url);	
				  }
			  });//end ajax*/
	}

}

//=======================add marchandizing===================

//====================================Camera==========

//fixed display
function get_pic_fdisplay(id) {
	//alert ('#fddiv_'+id);
	$('#fddiv_'+id).find('input, textarea, button, select').attr('disabled','disabled');
	

	var div_id="fdSL_image_div_"+id;
	temp_image_div=div_id;
	var hidden_name="fdSL_image_name_hidden_"+id;
	var tempTime = $.now();
	fd_image_name=tempTime.toString()+"_"+localStorage.selectedOutlet+".jpg";
	$("#"+hidden_name).val(fd_image_name);
	navigator.camera.getPicture(onSuccessFd, onFailFd, { quality: 5,
		destinationType: Camera.DestinationType.FILE_URI });
	
	
}

function onSuccessFd(imageURI) {
	var image = document.getElementById(temp_image_div);
    image.src = imageURI;
    var hidden_path=temp_image_div.replace("fdSL_image_div","fdSL_image_div_hidden");
	$("#"+hidden_path).val(imageURI);

	
}

function onFailFd(message) {
	imagePathA="";
    alert('Failed because: ' + message);
}

//QPDS
function get_pic_qpds(id) {
	$('#qpdsdiv_'+id).find('input, textarea, button, select').attr('disabled','disabled');
	var div_id="qpdsSL_image_div_"+id;
	temp_image_div=div_id;
	var hidden_name="qpdsSL_image_name_hidden_"+id;
	var tempTime = $.now();
	qpds_image_name=tempTime.toString()+"_"+localStorage.selectedOutlet+".jpg";
	$("#"+hidden_name).val(qpds_image_name);
	navigator.camera.getPicture(onSuccessQpds, onFailQpds, { quality: 5,
		destinationType: Camera.DestinationType.FILE_URI });
}

function onSuccessQpds(imageURI) {
	var image = document.getElementById(temp_image_div);
    image.src = imageURI;
    var hidden_path=temp_image_div.replace("qpdsSL_image_div","qpdsSL_image_div_hidden");
	$("#"+hidden_path).val(imageURI);
}

function onFailQpds(message) {
	imagePathA="";
    alert('Failed because: ' + message);
}


//===========gift======
//QPDS
function get_pic_gift() {
	$('#gift').find('input, textarea, button, select').attr('disabled','disabled');
	var tempTime = $.now();
	gift_image_name=tempTime.toString()+"_"+localStorage.selectedOutlet+".jpg";
	$("#gift_image_name_hidden").val(gift_image_name);
	navigator.camera.getPicture(onSuccessGift, onFailGift, { quality: 5,
		destinationType: Camera.DestinationType.FILE_URI });
}

function onSuccessGift(imageURI) {
	var image = document.getElementById('gift_image_div');
    image.src = imageURI;
    var hidden_path="gift_image_div_hidden";
	$("#"+hidden_path).val(imageURI);
}

function onFailGift(message) {
	imagePathA="";
    alert('Failed because: ' + message);
}


//==================upload image===============
//------------------------------------------------------------------------------
function uploadAll(){
	
	//fixed display
	for (var i=0; i < localStorage.fdisplaySlabTotal-1; i++){
		var image_name=$("#fdSL_image_name_hidden_"+i.toString()).val();
		var fdSLfdisplay_image_path=$("#fdSL_image_div_hidden_"+i.toString()).val();
		
		if (fdSLfdisplay_image_path.length >10){
			uploadPhoto(fdSLfdisplay_image_path, image_name);
		}
		
	}
	//QPDS
	for (var i=0; i < localStorage.qpdsSlabTotal-1; i++){
		var image_name=$("#qpdsSL_image_name_hidden_"+i.toString()).val();
		var qpds_image_path=$("#qpdsSL_image_div_hidden_"+i.toString()).val();
		
		if (qpds_image_path.length >10){
			uploadPhoto(qpds_image_path, image_name);
		}
		
	}
	
	//Gift
		var image_name=$("#gift_image_name_hidden").val();
		var gift_image_path=$("#gift_image_div_hidden").val();
		
		if (gift_image_path.length >10){
			uploadPhoto(gift_image_path, image_name);
		}

		
}


//File upload 
function uploadPhoto(imageURI, imageName) {
  var options = new FileUploadOptions();
  options.fileKey="upload";
//  options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
  options.fileName=imageName;
//	options.fileName = options.fileName
  options.mimeType="image/jpeg";

  var params = {};
  params.value1 = "test";
  params.value2 = "param";

  options.params = params;

  var ft = new FileTransfer();
//  ft.upload(imageURI, encodeURI("http://m.businesssolutionapps.com/welcome/wab_sync/fileUploader/"),win,fail,options);
  ft.upload(imageURI, encodeURI("http://e2.businesssolutionapps.com/unilever/syncmobile/fileUploader/"),win,fail,options);
//ft.upload(imageURI, encodeURI("http://127.0.0.1:8000/welcome/wab_sync/fileUploader/"),win,fail,options);
}

function win(r) {
//  console.log("Code = " + r.responseCode);
//  console.log("Response = " + r.response);
//  console.log("Sent = " + r.bytesSent);
}

function fail(error) {
  alert("An error has occurred: Code = " + error.code);
//  console.log("upload error source " + error.source);
//  console.log("upload error target " + error.target);
}

//=====================Dialog==========================

//============wait for data submit  

function doTimer()
{
  setTimeout(setSubmitmsg(),60000);
 
}
function setSubmitmsg(){
	$("#submit_data").html("Successfully Submitted");
	
}
function setOutlet(){
	//$("#outletButton").show();
	localStorage.syncinfo='<div  style="color:#006A6A; font-size:18px;" id="outletName_show">'+localStorage.outletNameID +'</div>Sync Completed Successfully';
	$('#outletSyncmsg').html(localStorage.syncinfo);
	$("#outletOk").show();
}


//=============qty faceup check fdisplay====

function checkQtyFd(i){
	var qty=$("#ItemQtyfdisplay_"+i.toString()).val();
	var faceup=$("#ItemFaceupfdisplay_"+i.toString()).val();
	
	
	if (parseInt(faceup) > parseInt(qty)){
		$("#ItemFaceupfdisplay_"+i.toString()).val("");
	}
}


function checkQtyQpds(i){
	var qty=$("#ItemQtyqpds_"+i.toString()).val();
	var faceup=$("#ItemFaceupqpds_"+i.toString()).val();
	
	if (parseInt(faceup) > parseInt(qty)){
		$("#ItemFaceupqpds_"+i.toString()).val("");
	}
}
		