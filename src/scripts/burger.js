// Google Map Api Parser
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



// Template Function
function buildBurgerDescription() {
    BURGERDATA.forEach(element => {
        // Parse info into new object
        let burger = new Burger(element.id, element.title, element.origin, element.img, element.restaurantImg, element.description);
    });
}

/*************** Smooth Scroll Setting ***********/ 

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
  lerp: 0.03,
});

// const testButton = document.querySelector("#testButton");
// testButton.addEventListener("click", testClickHandler);

/*************** In page Transitions ***********/
/** 
 * @brief Onclick => Scroll to Dest ID
 * @args destID: #xxxxx
*/
function ScrollTo(destID) {
    const dest = document.querySelector(destID);
    locoScroll.scrollTo(dest);
}



// burger details info structure
class Burger {
    constructor(id, title, origin, img, restaurantImg, description) {
        this.id = id;
        this.title = title;
        this.origin = origin;
        this.img = img;
        this.restaurantImg = restaurantImg;
        this.description = description
    }
}

// Page Content Template Factory

// Parsing data to Map Menu

// Parsing data to Text Menu

// Parsing data to slides