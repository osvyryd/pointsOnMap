// JavaScript Document
var map;                //Map element
var xmlhttp;            //AJAX requesr/respons
var currentPosition;    //My position on map
var markers = [];       //Markers on map

google.maps.event.addDomListener(window, 'load', initialize);

//Initializing map and start posistion
function initialize() {
	GetLocation();
	var defaultMapOptions = {
		center: {lat : 48.9501, lng : 24.701},
		zoom: 14
	};
	map = new google.maps.Map(document.getElementById('map_container'), defaultMapOptions);
	setMarkers(map);
};

//Geting location from browser
function GetLocation(){
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(setLocation);
	}
};

//Seting current location in position
function setLocation(position){
	currentPosition = { lat: position.coords.latitude, lng: position.coords.longitude};
	addMarker(currentPosition, "I", "I");
	map.panTo(currentPosition);
};

function setLocationByLatLng(position){
	addMarker(currentPosition, "I", "I");
	map.panTo(currentPosition);
}

//Adding marker to marker array
function addMarker(position, title, type){
	var	marker = new google.maps.Marker({
		position: position,
		map: map,
		title: title
	});	
	if(type == "ATM"){
		marker.setIcon("resources\\ATM.png");
	}
	markers.push(marker);
}

//Seting markers on map
function setMarkers(local_map){
	for(var i = 0; i<markers.length; i++){
		markers[i].setMap(local_map);
	}
}

//Clearing all ATM markers
function clearATMMarkers(){
	setMarkers(null);
	markers = [];
	addMarker(currentPosition, "I", "I");
	setMarkers(map);
}

//Setind current position to address
function setLocationByAddress(address_string){
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({'address' : address_string}, function(data, status){
		if(status == google.maps.GeocoderStatus.OK){
			currentPosition = {lat : data[0].geometry.location.lat(), lng : data[0].geometry.location.lng()};
			clearATMMarkers();
			addMarker(currentPosition, "I", "I");
	        map.panTo(currentPosition);
		} else {
			window.alert("Address is invalid");
		}
	})
	
};
//Seting position after pressing button
function findAddress(){
	var addres_str = document.getElementById("address_string").value;
		if(addres_str){
			setLocationByAddress(addres_str);
		} else {
			window.alert("Address is invalid");
		}
};

function getATMs(){
	clearATMMarkers(); 
	sendReq(currentPosition, document.getElementById("radius").value);
};

function sendReq(position, rad) {
	xmlhttp=GetXmlHttpObject();

    if (xmlhttp==null){
   		alert ("Your browser does not support Ajax HTTP");
   		return;
  	}
    var url = "getPoints.jsp?lat="+position.lat+"&lng="+position.lng+"&radius="+rad;
    xmlhttp.open("GET", url, true);
    xmlhttp.onreadystatechange = function() {
  		if (xmlhttp.readyState == 4) {
     		if(xmlhttp.status == 200) {
       			parseRequest();
         	}
  		}
	};
    xmlhttp.send(null);
};

function parseRequest() {
	var s = xmlhttp.responseText.replace("\r\n\r\n\r\n","");
	var s = s.replace(", ]}\r\n","]}");
    ATMs = JSON.parse(s);		
    for (var i = 0; i < ATMs.points.length; i++) { 
		var pos = ATMs.points[i];
   		addMarker(pos, "ATM", "ATM"); 
	}    
};

function GetXmlHttpObject(){
    if (window.XMLHttpRequest){
       	return new XMLHttpRequest();
    }
    if (window.ActiveXObject){
      	return new ActiveXObject("Microsoft.XMLHTTP");
    }
 	return null;
}


//