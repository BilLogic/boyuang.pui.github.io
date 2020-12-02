import LocomotiveScroll from 'locomotive-scroll';
import "../styles/burger.scss";
import { BurgerData } from "./data";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles

AOS.init();

// scrolling function
const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    multiplier: 1,
});

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


document.addEventListener('aos:in', ({ detail }) => {
  console.log('animated in', detail);
});

document.addEventListener('aos:out', ({ detail }) => {
  console.log('animated out', detail);
});
