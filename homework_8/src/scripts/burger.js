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

// Template Function
function buildBurgerDescription() {
    BURGERDATA.forEach(element => {
        // Parse info into new object
        let burger = new Burger(element.id, element.title, element.origin, element.img, element.restaurantImg, element.description);
    });
}


gsap.registerPlugin(ScrollTrigger);

const locoScroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true,
});

// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("[data-scroll-container]", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("[data-scroll-container]").style.transform ? "transform" : "fixed"
});



gsap.to(".square", {
  // x: 700, //distance
  duration: 3,//duration (3 seconds)
  scrollTrigger: {
    trigger: ".square",
    start: "top 30%",
    end: "center 20%",
    markers: true,
    toggleClass: "red"
  } //when this item come to view port, the animation start
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
