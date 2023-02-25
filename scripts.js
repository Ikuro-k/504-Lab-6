 var map = L.map('map').setView([1, 38], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 12,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiaWt1cm9rYW5nZXRoZSIsImEiOiJjbDl4dml3bTYwM3pxM3Z0Y2JlNjhwbWo3In0.vVVHk3BPPwNVnRxCoU88-g'
    }).addTo(map);

var drawnItems = L.featureGroup().addTo(map);

new L.Control.Draw({
    draw : {
        polygon : true,
        polyline : true,
        rectangle : false,     // Rectangles disabled
        circle : false,        // Circles disabled 
        circlemarker : false,  // Circle markers disabled
        marker: true
    },
    edit : {
        featureGroup: drawnItems
    }
}).addTo(map);

function createFormPopup() {
    var popupContent = 
    '<form>' +
    'Description:<br><input type="text" id="input_desc"><br>' +
    'User\'s Name:<br><input type="text" id="input_name"><br>' +
    '<input type="button" value="Submit" id="submit">' +
    '</form>'
    drawnItems.bindPopup(popupContent).openPopup();
}


map.addEventListener("draw:created", function(e) {
    e.layer.addTo(drawnItems);
    createFormPopup();
});

function setData(e) {
    if(e.target && e.target.id == "submit") {
        // Get user name and description
        	// CHANGE THE VAR NAMES TO SOMETHING THAT MAKES SENSE FOR YOUR FORM
        	// CHANGE THE ELEMENT IDs TO MATCH THE IDs YOU GAVE YOUR FORM INPUTS IN STEP 6.2
        	// INSERT ADDITIONAL VARS AND .getElementById STATEMENTS FOR EACH OF YOUR FORM INPUTS
        var enteredUsername = document.getElementById("input_name").value;
        var enteredDescription = document.getElementById("input_desc").value;
        // Print user name and description
        	// LOG TO THE CONSOLE ALL OF THE VARIABLES THAT HOLD THE INPUT VALUES FOR YOUR FORM
        console.log(enteredUsername);
        console.log(enteredDescription);
        // Get and print GeoJSON for each drawn layer
        drawnItems.eachLayer(function(layer) {
            var drawing = JSON.stringify(layer.toGeoJSON().geometry);
            console.log(drawing);
        });
        // Clear drawn items layer
        drawnItems.closePopup();
        drawnItems.clearLayers();
    }
}

document.addEventListener("click", setData);

map.addEventListener("draw:editstart", function(e) {
    drawnItems.closePopup();
});
map.addEventListener("draw:deletestart", function(e) {
    drawnItems.closePopup();
});
map.addEventListener("draw:editstop", function(e) {
    drawnItems.openPopup();
});
map.addEventListener("draw:deletestop", function(e) {
    if(drawnItems.getLayers().length > 0) {
        drawnItems.openPopup();
    }
});