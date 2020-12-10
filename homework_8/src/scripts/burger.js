
/*************** Smooth Scroll Setting ***********/ 

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
    lerp: 0.02,
    multiplier: 2
    // repeat: true
});
/*************** In page Transitions ***********/
/** 
 * @brief Onclick => Scroll to Dest ID
 * @args destID: #xxxxx
*/
function ScrollTo(destID) {
    const dest = document.querySelector(destID);
    locoScroll.scrollTo(dest);
}

/*************** Google Map Api Parser ***********/
function initMap() {
    // Map options
    let options = {
        zoom: 5,
        center: {lat:40.4433, lng: -79.9436}
    }
    // New map
    let map = new google.maps.Map(document.getElementById('map'), options);

    // loop through markers
    Markers.forEach(element => addMarker(element));

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

// Array of markers
let Markers = []

const rawData = [
    {
        id: "slug burger",
        oneLiner: "hyper-regional burger from Northern Mississippi",
        thumbnail: "http://i3.ytimg.com/vi/WSM1tp4Qtpc/maxresdefault.jpg",
        origin: "Mississippi",
        location: {
            coords: { lat: 34.6582, lng: -88.5667 },
            content: `<button class="btn btn-lg btn-warning" onclick="buildContent('slug burger');ScrollTo('#Introduction');">Slug Burger</button>`
        },
        year: "1940s",
        description: "The historic slug burger recipe was borne out of the Great Depression. The slug burger patty combines beef and bread crumbs—a method that was used to extend the meat supply. As the bread crumbs toast on the griddle, they absorb the rendered beef fat, creating the ultimate crispy burger.",
        images: [
            "../src/imgs/slug_img_1.jpg",
            "../src/imgs/slug_img_2.jpg",
            "../src/imgs/slug_img_3.jpg"
        ],
        facts: [
            {
                title: "Great Depression",
                note: "Slug burger was invented because restaurant have to come up with inventive ways to cook so that they can extend their food supply during the Great Depression.",
                src: "https://ideas.darden.virginia.edu/sites/default/files/styles/full_width_640px_5_3_/public/2019-09/201909_Great-Depression.jpg?itok=EkgyA0NW"
            },
            {
                title: "Slug",
                note: "The slug in the title comes from the old term for nickles because these burgers used to cost a nickle!",
                src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeUHdKI3utcuBP4SePb9-GtXRWHJrjg0Rmnw&usqp=CAU"
            },
            {
                title: "Beef or Pork",
                note: "The original slug burger are beef burgers. But if you ask for a slug burger today, you will get a pork burger",
                src: "https://assets.wsimgs.com/wsimgs/ab/images/dp/recipe/202032/0041/img44l.jpg"
            },
            {
                title: "No CHEEEESE",
                note: "Cheese doesn't exist on burgers when the slug burger was invented. The slug burger pre-days the cheese burger by almost two decades",
                src: "https://www.flaticon.com/svg/static/icons/svg/1971/1971008.svg"
            },
        ],
        ingredients: [
            {
                title: "Bread Crumbs",
                note: "White, crusty bread works best -- Like stale hard rolls. Avoid wheat and sourdough!",
                src: "https://www.thespruceeats.com/thmb/ippnQYVtQeUPnCgxXE5GwERL9rk=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-471441405-5834b0045f9b58d5b133d0c4.jpg",
            },
            {
                title: "Beef",
                note: "No comments, any kind of beef works",
                src: "https://www.meijer.com/content/dam/meijer/product/0004/12/5006/86/0004125006869_0_A1C1_0200.png",
            },
            {
                title: "No seasoning",
                note: "There's no need for seasoning. It's just beef, bread crumbs, and salt.",
                src: "http://www.whenpeanutsattack.com/wp-content/uploads/2015/02/NO-cumin-spices-sign.jpg"
            },
            {
                title: "Normal Bun",
                note: "Stay plain and stay original with the normal bun",
                src: "https://d3awvtnmmsvyot.cloudfront.net/api/file/dsBUXZl4S62XxGQC6rlS/convert?fit=max&w=1450&quality=60&cache=true&rotate=exif&compress=true"
            },
            {
                title: "Pickles",
                note: "Pieces of sliced pickles",
                src: "https://d2d8wwwkmhfcva.cloudfront.net/800x/d2lnr5mha7bycj.cloudfront.net/product-image/file/large_952fe0b1-9ca0-4cd9-9e5b-e32507f31d7a.jpeg"
            },
            {
                title: "Mustard",
                note: "Dopping you burger with mustard!",
                src: "https://i.redd.it/sqh6n0ez8lw31.jpg"
            }
        ],
        videoURL: "https://www.youtube-nocookie.com/embed/WSM1tp4Qtpc"
    }
];




// burger details info structure
function Burger (id, oneLiner, thumbnail, origin, location, year,
                description, images, facts, ingredients, videoURL) {
    this.id = id;
    this.oneLiner = oneLiner;
    this.thumbnail = thumbnail;
    this.origin = origin;
    this.location = location;
    this.year = year;
    this.description = description
    this.images = [...images];
    this.facts = [...facts];
    this.ingredients = [...ingredients];
    this.videoURL = videoURL;
}

let BURGERS;
function loadContent() {
    // Step 1: parse info into burger objects and create an array
    BURGERS = rawData.map((element) => {
        // console.log(element);
        let burger = new Burger(element.id, element.oneLiner,
            element.thumbnail, element.origin,
            element.location, element.year,
            element.description,
            element.images,
            element.facts,
            element.ingredients,
            element.videoURL);
        return burger;
    });

    // call intro to build the intro carousel and map
    buildIntro();
}

function buildIntro() {
    rawData.forEach((element => {
        Markers.push(element.location);
        //FIXME: This only work temporarily. Needs to be changed once more carousel pages are added
        // console.log(element.location);
        let id = document.querySelector("#burger-id");
        id.innerHTML = element.id;
        // console.log(id);
        
        let oneLiner = document.querySelector("#burger-oneLiner");
        oneLiner.innerHTML = element.oneLiner;
        // console.log(oneLiner);
        
        let thumbnail = document.querySelector("#burger-thumbnail");
        thumbnail.setAttribute("src", element.thumbnail);
    }));



    initMap();
    // build default content in case the user didn't make a choice
    buildContent(rawData[0].id);
}

function buildContent(key) {
    // Step 1: Get the target element
    let entry = BURGERS.find((element) => {
        return element.id === key;
    });
    // Step 2: parse burger into HTML content
    // Set Info on Section 2
    let origin = document.querySelector("#burger-origin");
    origin.innerHTML = entry.origin;

    let year = document.querySelector("#burger-year");
    year.innerHTML = entry.year;

    let title = document.querySelector("#burger-title");
    title.innerHTML = entry.id;

    let description = document.querySelector("#burger-description");
    description.innerHTML = entry.description;

    // Set Images on Section 2
    let burgerImg1 = document.querySelector("#burger-images-0");
    burgerImg1.setAttribute("src", entry.images[0]);

    let burgerImg2 = document.querySelector("#burger-images-1");
    burgerImg2.setAttribute("src", entry.images[1]);

    let burgerImg3 = document.querySelector("#burger-images-2");
    burgerImg3.setAttribute("src", entry.images[2]);

    // Set Info on Section 3
    // Imgs
    let funImg1 = document.querySelector("#fun-card-0-img");
    funImg1.setAttribute("src", entry.facts[0].src);
    let funImg2 = document.querySelector("#fun-card-1-img");
    funImg2.setAttribute("src", entry.facts[1].src);
    let funImg3 = document.querySelector("#fun-card-2-img");
    funImg3.setAttribute("src", entry.facts[2].src);
    let funImg4 = document.querySelector("#fun-card-3-img");
    funImg4.setAttribute("src", entry.facts[3].src);

    //Titles + Texts
    let funTitle1 = document.querySelector("#fun-card-0-title");
    funTitle1.innerHTML = entry.facts[0].title;
    let funText1 = document.querySelector("#fun-card-0-text");
    funText1.innerHTML = entry.facts[0].note;

    let funTitle2 = document.querySelector("#fun-card-1-title");
    funTitle2.innerHTML = entry.facts[1].title;
    let funText2 = document.querySelector("#fun-card-1-text");
    funText2.innerHTML = entry.facts[1].note;

    let funTitle3 = document.querySelector("#fun-card-2-title");
    funTitle3.innerHTML = entry.facts[2].title;
    let funText3 = document.querySelector("#fun-card-2-text");
    funText3.innerHTML = entry.facts[2].note;

    let funTitle4 = document.querySelector("#fun-card-3-title");
    funTitle4.innerHTML = entry.facts[3].title;
    let funText4 = document.querySelector("#fun-card-3-text");
    funText4.innerHTML = entry.facts[3].note;

    // Section 4 Ingredients
    // Imgs
    let IngImg1 = document.querySelector("#ingredient-img-1");
    IngImg1.setAttribute("src", entry.ingredients[0].src);
    let IngImg2 = document.querySelector("#ingredient-img-2");
    IngImg2.setAttribute("src", entry.ingredients[1].src);
    let IngImg3 = document.querySelector("#ingredient-img-3");
    IngImg3.setAttribute("src", entry.ingredients[2].src);
    let IngImg4 = document.querySelector("#ingredient-img-4");
    IngImg4.setAttribute("src", entry.ingredients[3].src);
    let IngImg5 = document.querySelector("#ingredient-img-5");
    IngImg5.setAttribute("src", entry.ingredients[4].src);
    let IngImg6 = document.querySelector("#ingredient-img-6");
    IngImg6.setAttribute("src", entry.ingredients[5].src);
    
    //Titles + Texts
    let IngTitle1 = document.querySelector("#ingredient-title-1");
    IngTitle1.innerHTML = entry.ingredients[0].title;
    let IngText1 = document.querySelector("#ingredient-text-1");
    IngText1.innerHTML = entry.ingredients[0].note;

    let IngTitle2 = document.querySelector("#ingredient-title-2");
    IngTitle2.innerHTML = entry.ingredients[1].title;
    let IngText2 = document.querySelector("#ingredient-text-2");
    IngText2.innerHTML = entry.ingredients[1].note;

    let IngTitle3 = document.querySelector("#ingredient-title-3");
    IngTitle3.innerHTML = entry.ingredients[2].title;
    let IngText3 = document.querySelector("#ingredient-text-3");
    IngText3.innerHTML = entry.ingredients[2].note;

    let IngTitle4 = document.querySelector("#ingredient-title-4");
    IngTitle4.innerHTML = entry.ingredients[3].title;
    let IngText4 = document.querySelector("#ingredient-text-4");
    IngText4.innerHTML = entry.ingredients[3].note;

    let IngTitle5 = document.querySelector("#ingredient-title-5");
    IngTitle5.innerHTML = entry.ingredients[4].title;
    let IngText5 = document.querySelector("#ingredient-text-5");
    IngText5.innerHTML = entry.ingredients[4].note;

    let IngTitle6 = document.querySelector("#ingredient-title-6");
    IngTitle6.innerHTML = entry.ingredients[5].title;
    let IngText6 = document.querySelector("#ingredient-text-6");
    IngText6.innerHTML = entry.ingredients[5].note;

    // Section 5 video
    let videoURL = document.querySelector("#burger-videoURL");
    videoURL.setAttribute("src", entry.videoURL);
    // console.log(videoURL);
}



// Page Content Template Factory

// Parsing data to Map Menu

// Parsing data to Text Menu

// Parsing data to slides