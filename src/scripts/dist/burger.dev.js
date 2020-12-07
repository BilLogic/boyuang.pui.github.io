"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Google Map Api Parser
function initMap() {
  // Map options
  var options = {
    zoom: 5,
    center: {
      lat: 40.4433,
      lng: -79.9436
    }
  }; // New map

  var map = new google.maps.Map(document.getElementById('map'), options); // listen for click on map

  /*
  google.maps.event.addListener(map, "click",
      function (event) {
          //add marker
          addMarker({ coords: event.latLng });
      }
  );
  */
  // Array of markers

  var markers = [{
    coords: {
      lat: 40.4433,
      lng: -79.9436
    },
    content: "<h1>Demo Burger</h1>"
  }, {
    coords: {
      lat: 42,
      lng: -80.9436
    },
    content: "<h1>Demo Burger</h1>"
  }]; // loop through markers

  markers.forEach(function (element) {
    return addMarker(element);
  }); // Add Marker function

  function addMarker(props) {
    var marker = new google.maps.Marker({
      position: props.coords,
      map: map
    }); // check for custom icon

    if (props.iconImage) {
      // set icon
      marker.setIcon(props.iconImage);
    } // check content


    if (props.content) {
      var infoWindow = new google.maps.InfoWindow({
        content: props.content
      });
      marker.addListener("click", function () {
        infoWindow.open(map, marker);
      });
    }
  }
} // Template Function


function buildBurgerDescription() {
  BURGERDATA.forEach(function (element) {
    // Parse info into new object
    var burger = new Burger(element.id, element.title, element.origin, element.img, element.restaurantImg, element.description);
  });
}
/*************** Smooth Scroll Setting ***********/


var locoScroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
  lerp: 0.03
}); // const testButton = document.querySelector("#testButton");
// testButton.addEventListener("click", testClickHandler);

/*************** In page Transitions ***********/

/** 
 * @brief Onclick => Scroll to Dest ID
 * @args destID: #xxxxx
*/

function ScrollTo(destID) {
  var dest = document.querySelector(destID);
  locoScroll.scrollTo(dest);
} // burger details info structure


var Burger = function Burger(id, title, origin, img, restaurantImg, description) {
  _classCallCheck(this, Burger);

  this.id = id;
  this.title = title;
  this.origin = origin;
  this.img = img;
  this.restaurantImg = restaurantImg;
  this.description = description;
}; // Page Content Template Factory
// Parsing data to Map Menu
// Parsing data to Text Menu
// Parsing data to slides