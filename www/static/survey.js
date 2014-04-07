// Put your custom code here
//var apipath='http://127.0.0.1:8000/em/default/';
//var apipath='http://e.businesssolutionapps.com/em/default/';
//var apipath='http://127.0.0.1:8000/em/default/';
//var apipath='http://e.businesssolutionapps.com/panicbutton/default_with_sync_code/';
var apipath='http://127.0.0.1:8000/unilever/default/';


var helpCount = 0;
var slideFlag=0;


//-------GET GEO LOCATION Start----------------------------
function getlocationand_askhelp() { //location
//	$("#helperror").text('inside ask help');
	navigator.geolocation.getCurrentPosition(onSuccess, onError);
	
}
	
// onSuccess Geolocation
function onSuccess(position) {
		
	$("#lat").val(position.coords.latitude);
	$("#long").val(position.coords.longitude);
//	$("#helperror").text('success');
	helpCount = helpCount+1;
	if (helpCount<=2){
		get_help();
		$("#info").text(helpCount);
	}else{
		$("#info").text("more than twice");
	}
	
}
	
function onError(error) {
	$("#lat").val(0);
	$("#long").val(0);
	//$("#helperror").text('location not found');
	
	helpCount = helpCount+1;
	if (helpCount<=2){
		get_help();
		$("#info").text(helpCount);
	}else{
		$("#info").text("more than twice");
	}
	//get_help();
	//alert('code: '    + error.code    + '\n' +'message: ' + error.message + '\n');
	}
//-------GET GEO LOCATION End----------------------------




//--------------------------------------------- Exit Application
function exit() {
navigator.app.exitApp();

}


//=========================Check user=====================
function check_user() { 
	var cm_id=$("#cm_id").val();
	var cm_pass=$("#cm_pass").val();
	var synccode='123456'
	
	
	if (cm_id=="" || cm_id==undefined || cm_pass=="" || cm_pass==undefined){
		var url = "#login";      
		$(location).attr('href',url);
	
	}else{
		localStorage.cid='UNILEVER';
		localStorage.cm_id=cm_id;
   		localStorage.cm_pass=cm_pass;
   		localStorage.synccode=synccode;
   			$("#error_login").html(apipath+'check_user?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&synccode='+localStorage.synccode);	
   			$.ajax({
				 url: apipath+'check_user?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&synccode='+localStorage.synccode,
				 success: function(result) {					
						if (result==''){
							alert ('Sorry Network not available');
						}
						else{
							var resultArray = result.split('<SYNCDATA>');			
							if (clientResArray[0]=='YES'){
								
								clientListStr=clientResArray[1];
								
							if ((result=='SUCCESS') && (localStorage.route=='')){
								var url = "#routePage";
								$(location).attr('href',url);	
							}
							if ((result=='SUCCESS') && (localStorage.route!='')){
								var url = "#uotletPage";
								$(location).attr('href',url);	
							}
						}
				      },
				  error: function(result) {
					  $("#error_login").html(apipath+'check_user?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&synccode='+localStorage.synccode);
					  var url = "#login";
					  $(location).attr('href',url);	
				  }
			  });//end ajax
		  }//end else	
	}//function

//=====================Toggle==========================
function new_m() { 
	
	jQuery("#newMarchandizing").toggle();
}

// ====================================Camera==========
function get_pic() {
	navigator.camera.getPicture(onSuccess, onFail, { quality: 30,
    destinationType: Camera.DestinationType.FILE_URI });
}

function onSuccess_get_pic(imageURI) {
//    var image = document.getElementById('myImage');
//    image.src = imageURI;
}

function onFail_get_pic(message) {
    alert('Failed because: ' + message);
}

}