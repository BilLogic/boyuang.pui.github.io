
function initMap() {
    // Map options
    let options = {
        zoom: 5,
        center: {lat:40.4433, lng: -79.9436}
    }
    // New map
    let map = new google.maps.Map(document.getElementById('map'), options);

    // listen for click on map
    /*
    google.maps.event.addListener(map, "click",
        function (event) {
            //add marker
            addMarker({ coords: event.latLng });
        }
    );
    */
    
    // Array of markers
    let markers = [
        {
            coords: { lat: 40.4433, lng: -79.9436 },
            content: "<h1>Demo Burger</h1>"
        },
        {
        coords: { lat: 42, lng: -80.9436 },
        content: "<h1>Demo Burger</h1>"
    }
    ]
    
    // loop through markers
    markers.forEach(element => addMarker(element));

    // Add Marker function
    function addMarker(props) {
        let marker = new google.maps.Marker({
            position: props.coords,
            map: map,
        });
        // check for custom icon
        if (props.iconImage) {
            // set icon
            marker.setIcon(props.iconImage);
        }         
        // check content
        if (props.content) {
            let infoWindow = new google.maps.InfoWindow({
                content: props.content
            });
            marker.addListener("click", function () {
                infoWindow.open(map, marker);
            });
        }
    }
}