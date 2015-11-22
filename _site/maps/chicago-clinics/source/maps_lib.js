/*------------------------------------------------------------------+
 | Functions used for searchable fusion table maps                  |
 | Requires jQuery                                                  |
 +-------------------------------------------------------------------*/

  var map;
  var geocoder;
  var addrMarker;
  var addrMarkerImage = 'http://derekeder.com/images/icons/blue-pushpin.png';
  
  var fusionTableId = 1938254; //replace this with the ID of your fusion table
  
  var searchRadius = 805; //in meters ~ 1/2 mile
  var recordName = "clinic";
  var recordNamePlural = "clinics";
  var searchrecords;
  var records = new google.maps.FusionTablesLayer(fusionTableId);
  
  var searchStr;
  var searchRadiusCircle;
  
  google.load('visualization', '1', {}); //used for custom SQL call to get count
  
  function initialize() {
	$( "#resultCount" ).html("");
  
  	geocoder = new google.maps.Geocoder();
    var chicago = new google.maps.LatLng(41.850033, -87.6500523);
    var myOptions = {
      zoom: 11,
      center: chicago,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);
	
	$("#ddlRadius").val("805");
	
	$("#cbType1").attr("checked", "checked");
	$("#cbType2").attr("checked", "checked");
	$("#cbType3").attr("checked", "checked");
	
	$("#cbOpen").attr("checked", "checked");
	$("#cbClosed").attr("checked", "checked");
	
	searchrecords = null;
	$("#txtSearchAddress").val("");
	doSearch();
  }
	
	function doSearch() 
	{
		clearSearch();
		var address = $("#txtSearchAddress").val();
		searchRadius = $("#ddlRadius").val();
		
		var isOpen = $("#cbOpen").is(':checked');
		var isClosed = $("#cbClosed").is(':checked');
		
		var type1 = $("#cbType1").is(':checked');
		var type2 = $("#cbType2").is(':checked');
		var type3 = $("#cbType3").is(':checked');
		
		searchStr = "SELECT Location FROM " + fusionTableId + " WHERE ";
		
		
		var searchOpen = "'Status Flag' IN (-1,";
    if (isOpen) searchOpen += "1,";
		if (isClosed) searchOpen += "0,";

    searchStr += " " + searchOpen.slice(0, searchOpen.length - 1) + ") AND ";
		
		//by type
		//this is a big mess - would be so much easier if FT supported 'OR' operators. 
		//would ideally do 'Type Flag' CONTAINS 'WIC' OR 'Type Flag' CONTAINS 'NHC' … etc
		var searchType = "'Type Flag' IN (-1,";
        if (type1) //NHC
			searchType += "1,";
		if (type2) //MHC
			searchType += "2,";
		if (type3) //WIC
			searchType += "3,";
		if (type1 && type3) //NHC, WIC
			searchType += "4,";
		if (type2 && type3) //MHC, WIC
			searchType += "5,";
		if (type1 && type2 && type3) //NHC, MHC, WIC
			searchType += "6,";

        searchStr += " " + searchType.slice(0, searchType.length - 1) + ")";
		
		// because the geocode function does a callback, we have to handle it in both cases - when they search for and address and when they dont
		if (address != "")
		{
			if (address.toLowerCase().indexOf("chicago") == -1)
				address = address + " chicago";
			_trackClickEventWithGA("Search", "Chicago Clinics", address);
			geocoder.geocode( { 'address': address}, function(results, status) 
			{
			  if (status == google.maps.GeocoderStatus.OK) 
			  {
				//console.log("found address: " + results[0].geometry.location.toString());
				map.setCenter(results[0].geometry.location);
				map.setZoom(14);
				
				addrMarker = new google.maps.Marker({
				  position: results[0].geometry.location, 
				  map: map, 
				  icon: addrMarkerImage,
				  animation: google.maps.Animation.DROP,
				  title:address
				});
				drawSearchRadiusCircle(results[0].geometry.location);
				
				searchStr += " AND ST_INTERSECTS(Location, CIRCLE(LATLNG" + results[0].geometry.location.toString() + "," + searchRadius + "))";
				
				//get using all filters
				//console.log(searchStr);
				searchrecords = new google.maps.FusionTablesLayer(fusionTableId, {
					query: searchStr}
					);
			
				searchrecords.setMap(map);
				displayCount(searchStr);
			  } 
			  else 
			  {
				alert("We could not find your address: " + status);
			  }
			});
		}
		else
		{
			//get using all filters
			//console.log(searchStr);
			searchrecords = new google.maps.FusionTablesLayer(fusionTableId, {
				query: searchStr}
				);
		
			searchrecords.setMap(map);
			displayCount(searchStr);
		}
  	}
	
	function clearSearch() {
		if (searchrecords != null)
			searchrecords.setMap(null);
		if (addrMarker != null)
			addrMarker.setMap(null);	
		if (searchRadiusCircle != null)
			searchRadiusCircle.setMap(null);
		
		records.setMap(null);
	}
	
	function refreshrecords() {
		if (searchrecords != null)
			searchrecords.setMap(map);
		else
			records.setMap(map);
	}

 function findMe() {
	  var foundLocation;
	  
	  if(navigator.geolocation) { // Try W3C Geolocation (Preferred)
	    navigator.geolocation.getCurrentPosition(function(position) {
	      foundLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
	      addrFromLatLng(foundLocation);
	    }, null);
	  } 
	  else if (google.gears) { // Try Google Gears Geolocation
	    var geo = google.gears.factory.create('beta.geolocation');
	    geo.getCurrentPosition(function(position) {
	      foundLocation = new google.maps.LatLng(position.latitude,position.longitude);
	      addrFromLatLng(foundLocation);
	    }, null);
	  }
	  else {
	  	alert("Sorry, we could not find your location.");
	  }
	}
	
	function addrFromLatLng(latLngPoint) {
	    geocoder.geocode({'latLng': latLngPoint}, function(results, status) {
	      if (status == google.maps.GeocoderStatus.OK) {
	        if (results[1]) {
	          $('#txtSearchAddress').val(results[1].formatted_address);
	          $('.hint').focus();
	          doSearch();
	        }
	      } else {
	        alert("Geocoder failed due to: " + status);
	      }
	    });
	  }
	
	function drawSearchRadiusCircle(point) {
	    var circleOptions = {
	      strokeColor: "#4b58a6",
	      strokeOpacity: 0.3,
	      strokeWeight: 1,
	      fillColor: "#4b58a6",
	      fillOpacity: 0.05,
	      map: map,
	      center: point,
	      clickable: false,
	      zIndex: -1,
	      radius: parseInt(searchRadius)
	    };
	    searchRadiusCircle = new google.maps.Circle(circleOptions);
	}
	
	function getFTQuery(sql) {
		var queryText = encodeURIComponent(sql);
		//console.log('http://www.google.com/fusiontables/gvizdata?tq='  + queryText);
		return new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq='  + queryText);
	}
	
	function displayCount(searchStr) {
	  //set the callback function
	  getFTQuery(searchStr).send(displaySearchCount);
	}

	function displaySearchCount(response) {
	  var numRows = 0;
	  if (response.getDataTable().getNumberOfRows() > 0)
	  	numRows = response.getDataTable().getNumberOfRows(); //doing this the old way since Count() wasn't working with this query (?)
	  var name = recordNamePlural;
	  if (numRows == 1)
		name = recordName;
	  $( "#resultCount" ).fadeOut(function() {
        $( "#resultCount" ).html(addCommas(numRows) + " " + name + " found");
      });
	  $( "#resultCount" ).fadeIn();
	}
	
	function addCommas(nStr)
	{
		nStr += '';
		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;
	}