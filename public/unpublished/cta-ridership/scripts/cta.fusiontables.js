/*--------------------------+
 | Site: Budget Breakdown   |
 | Budget Display library   |
 +--------------------------*/	
	
	//init
	google.load('visualization', '1', {}); //using Google visulaization API to do Fusion Tables SQL calls
	
	var fusionTableId = 1302319;
  	var trainRidershipArray;
  	var busRidershipArray;
  	var arraysLoaded = 0;
	var dateStart = new Date(2011, 5, 1, 0, 0, 0, 0);
	var dateEnd = new Date(2011, 5, 30, 0, 0, 0, 0);
	
	//front end display functions
	
	//primary load for graph and table
	function loadData() {
		console.log("loading data");
		dateStart = new Date(Date.parse($('#dateStart').val()));
		dateEnd = new Date(Date.parse($('#dateEnd').val()));
		console.log("dateStart: " + dateStart.toString());
		console.log("dateEnd: " + dateEnd.toString());
		getRidershipArray(true, updateTrainRidership);
		getRidershipArray(false, updateBusRidership);
    }  
	
	//displays highchart
	function updateMainChart() {
   	  arraysLoaded++;
   	  if (arraysLoaded >= 2)
   	  {
		console.log('rendering main chart');
		console.log('train data: ' + trainRidershipArray);
		console.log('bus data: ' + busRidershipArray);
   	    arraysLoaded = 0;
   	  	var minValuesArray = $.grep(trainRidershipArray.concat(busRidershipArray), function(val) { return val != null; });
	      // Highcharts
	      mainChart = new Highcharts.Chart({
	      chart: {
	        borderColor: "#dddddd",
	        borderRadius: 0,
	        borderWidth: 1,
	        defaultSeriesType: "area",
	        marginBottom: 30,
	        marginLeft: 60,
	        marginRight: 15,
	        marginTop: 20,
	        renderTo: "timeline-chart"
	      },
	      credits: { enabled: false },
	      legend: {
	        backgroundColor: "#ffffff",
	        borderColor: "#cccccc",
	        floating: true,
	        verticalAlign: "top",
	        x: -230,
	        y: 20
	      },
	      plotOptions: {
	        area: { fillOpacity: 0.25, lineWidth: 1 },
	        series: {
	          lineWidth: 5,
	          point: {
              events: {
                click: function() {
                  var x = this.x,
				      y = this.y,
                      selected = !this.selected,
                      index = this.series.index;
                  this.select(selected, false);

                  $.each(this.series.chart.series, function(i, serie) {
                    if (serie.index !== index) {
                      $(serie.data).each(function(j, point){
                        if(x === point.x && point.y != null) {
                          point.select(selected, true);
                        }
                      });
                    }
                  });
                }
              }
            },
            pointInterval: 24 * 3600 * 1000,
	          pointStart: Date.UTC(dateStart.getFullYear(), dateStart.getMonth(), dateStart.getDate()),
	          shadow: false
	        }
	      },
	      series: [
	        {
	          color: "#264870",
	          data: trainRidershipArray,
	          marker: {
	            radius: 1,
	            symbol: "circle",
				states: {
                  hover: {
                     enabled: true,
					 radius: 6
                  }
               }
	          },
	          name: "Train ridership"
	        }, {
	          color: "#7d9abb",
	          data: busRidershipArray,
	          marker: {
	            radius: 1,
	            symbol: "square",
				states: {
                  hover: {
                     enabled: true,
					 radius: 8
                  }
               }
	          },
	          name: "Bus ridership"
	        }
	      ],
	      title: null,
	      tooltip: {
	        borderColor: "#000",
	        formatter: function() {
	          var s = "<strong>" + Highcharts.dateFormat("%m/%d/%Y", this.x) + "</strong>";
	          $.each(this.points, function(i, point) {
	            s += "<br /><span style=\"color: " + point.series.color + "\">" + point.series.name + ":</span> " + Highcharts.numberFormat(point.y, 0);
	          });
	          return s;
	        },
	        shared: true
	      },
	      xAxis: {
	        //dateTimeLabelFormats: { year: "%m/%d/%Y" },
	        gridLineColor: "#ddd",
	        gridLineWidth: 1,
	        type: "datetime"
	      },
	      yAxis: {
	        gridLineColor: "#ddd",
	        lineWidth: 1,
	        min: Math.min.apply( Math, minValuesArray ),
	        title: null
	      }
	  	});
		}
    }
  	
	function getRidershipArray(forTrains, callback) {
		var typeStr = "bus";
		if (forTrains == true) 
			typeStr = "rail_boardings";
		
		var myQuery = "SELECT " + typeStr + " FROM " + fusionTableId + " WHERE service_date >= '" + formatDate(dateStart) + "' AND service_date <= '" + formatDate(dateEnd) + "' ORDER BY service_date ASC";
		
		getQuery(myQuery).send(callback);
	}
	
	//converts SQL query to URL	
	function getQuery(myQuery) {
		console.log(myQuery);
		var queryText = encodeURIComponent(myQuery);
	  	return query = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq='  + queryText);
	}
	
	function updateTrainRidership(response) {
		trainRidershipArray = getDataAsArray(response);
		updateMainChart();
	}
	
	function updateBusRidership(response) {
		busRidershipArray = getDataAsArray(response);
		updateMainChart();
	}
	
	//returns a 1D array
	function getDataAsArray(response) {
	  numRows = response.getDataTable().getNumberOfRows();
	  var fusiontabledata = new Array();
	  
	  for(j = 0; j < numRows; j++) {
		if (response.getDataTable().getValue(j, 0) == "0")
			fusiontabledata[j] = null;
		else
			fusiontabledata[j] = response.getDataTable().getValue(j, 0);
	  }
	  
	  return fusiontabledata;
	}

	//for debugging - prints out data in a table
	function getDataAsTable(response) {
	
	  //for more information on the response object, see the documentation
	  //http://code.google.com/apis/visualization/documentation/reference.html#QueryResponse
	  numRows = response.getDataTable().getNumberOfRows();
	  numCols = response.getDataTable().getNumberOfColumns();
	  
	  //concatenate the results into a string, you can build a table here
	  fusiontabledata = "<table><tr>";
	  for(i = 0; i < numCols; i++) {
	    fusiontabledata += "<td>" + response.getDataTable().getColumnLabel(i) + "</td>";
	  }
	  fusiontabledata += "</tr>";
	  
	  for(i = 0; i < numRows; i++) {
	  	fusiontabledata += "<tr>";
	    for(j = 0; j < numCols; j++) {
	      fusiontabledata += "<td>" + response.getDataTable().getValue(i, j) + "</td>";
	    }
	    fusiontabledata += "</tr>";
	  }
	  fusiontabledata += "</table>";  
	  //console.log(fusiontabledata);
	  breakdownData += fusiontabledata;
	  updateTable();
	}
	
	function formatDate(d)
	{
		return (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
	}
		
	function convertToSlug(Text)
	{
		return (Text+'').replace(/ /g,'-').replace(/[^\w-]+/g,'');
	}
	
	function convertToQueryString(Text)
	{
		if (Text == undefined) return '';
		
		return (Text+'').replace(/\-+/g, '+')
		.replace(/\s+/g, '+');
	}
	
	function convertToPlainString(Text)
	{
	    if (Text == undefined) return '';
	    
		return (Text+'').replace(/\++/g, ' ')
		.replace(/\-+/g, ' ');
	}