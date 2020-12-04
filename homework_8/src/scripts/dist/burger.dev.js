"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// burger details info structure
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
// Template Function


function buildBurgerDescription() {
  BURGERDATA.forEach(function (element) {
    // Parse info into new object
    var burger = new Burger(element.id, element.title, element.origin, element.img, element.restaurantImg, element.description);
  });
}

gsap.registerPlugin(ScrollTrigger); // gsap.to(".line-inner", {
//   y: "0%",
//   rotate: "0deg",
//   duration: 0.7,
//   delay: 0.5,
//   stagger: {
//     from: "end",
//     amount: 0.1
//   }
// });

var locoScroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
  lerp: 0.01
}); // locoScroll.on("scroll", ScrollTrigger.update);
// ScrollTrigger.scrollerProxy("body", {
//   scrollTop(value) {
//     return arguments.length
//       ? locoScroll.scrollTo(value, 0, 0)
//       : locoScroll.scroll.instance.scroll.y;
//   },
//   getBoundingClientRect() {
//     return {
//       top: 0,
//       left: 0,
//       width: window.innerWidth,
//       height: window.innerHeight
//     };
//   }
// });
// gsap.to(".background", {
//   backgroundColor: "red",
//   duration: 1,
//   ease: "Power4.easeIn",
//   scrollTrigger: {
//     start: "50% 50%",
//     scrub: true,
//     markers: true
//   }
// });
// ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
// ScrollTrigger.refresh();