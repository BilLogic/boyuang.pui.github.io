# Assignment 8 - Write Up

Due Date: Dec 11, 2020
Student: Bill Guo

## Part I: 300 world description

- What is the purpose of my website?
- I always crave burgers, and I am a big fan of the YouTube show "Burger Scholar Sessions" with George Motz. I want to create a platform to deliver information about the origin, fun facts, ingredients, and instructions to make a special burger. For this purpose, I designed and developed this website all about burgers.

- What information do I convey with my website?
- Information I want to convey includes stories behind the creation of famous burger recipes, ingredients to replicate it on one's own, and notes on picking the ingredients.

- How is my website interesting and engaging?
- My website is attractive for its animations and reading experience. This is achieved with a smooth scrolling feature. Users can enjoy rich animation content that is automatically triggered as they scroll down the page. The page is responsive and friendly to different screen sizes and users with various platforms. In addition to interactive elements, the static tone is also welcoming. I used the color scheme of a burger with lower saturation to create a warm impression of the site.

![Assignment%208%20-%20Write%20Up%201563ab51a9604044995381beb4763cde/Untitled.png](Assignment%208%20-%20Write%20Up%201563ab51a9604044995381beb4763cde/Untitled.png)

Color Scheme I used

- Who is my target audience?
- My target audience is everyone, especially people who crave tasty burgers and are interested in the exciting stories about them. Ordinary users could go through the page and read about fun facts behind their creation. Foodies could look into details about the ingredients and learn about what makes these fantastic burgers unique. More importantly, real foodies can visit the video session linked at the bottom, follow each step and make the burgers themselves.

## Part 2: Interaction Bullet List

- Actives scrolling animations
    - Interaction type: Animations
    - Instruction:
        - The animation will be triggered as you scroll down the pages.
    - Note:
        - This works better with the trackpad. The library isn't stable enough. If you find a scroll bar that appears on the side without scrolling, please turn the page back to standard computer screen size and refresh the page.

![Assignment%208%20-%20Write%20Up%201563ab51a9604044995381beb4763cde/Untitled%201.png](Assignment%208%20-%20Write%20Up%201563ab51a9604044995381beb4763cde/Untitled%201.png)

Example of program fails to hijack default scroll system. The grey scroll bar would appear on the side. 

- Passive scrolling animations
    - Interaction type: Animations
    - Instruction:
        - Click on the Buttons ("Location," "Brief Info," "Fun Facts," etc.) to trigger the event and visit the target pages.
        - Click on the yellow buttons at the right button to visit the successive page.
        - Once you scroll down to the very bottom, a button will appear at the bottom. Click on it to trigger the event and go  back to the home page.

![Assignment%208%20-%20Write%20Up%201563ab51a9604044995381beb4763cde/Untitled%202.png](Assignment%208%20-%20Write%20Up%201563ab51a9604044995381beb4763cde/Untitled%202.png)

Click on the buttons in the center or on the side

![Assignment%208%20-%20Write%20Up%201563ab51a9604044995381beb4763cde/Untitled%203.png](Assignment%208%20-%20Write%20Up%201563ab51a9604044995381beb4763cde/Untitled%203.png)

Click on the button at the bottom or on the side.

- Content Generation
    - Interaction type: Animation
    - Instruction:
        - Click on the pin-point on the map and then click on the button appears. This will force the page to load proper information in pages below and automatClick on the Buttons ("Location," "Brief Info," "Fun Facts," etc.) to trigger the event and visit the target pages.ically take you to the introduction page.

![Assignment%208%20-%20Write%20Up%201563ab51a9604044995381beb4763cde/Untitled%204.png](Assignment%208%20-%20Write%20Up%201563ab51a9604044995381beb4763cde/Untitled%204.png)

Click on the yellow button to generate content

## Part 3: External Tool

1. Google Map API
    - Why I chose to use it:
    - During the user test, my tester reported that it would be beneficial to provide information about the burgers, such as their origin and location of the best-known restaurants. Therefore, I decided to use the Google map API to visualize the geographic data.
    - How I used it:
    - I include the metadata with the API key in the <head> section and created a function called initMap() in JavaScript, which opens up a Google Map on the page and makes pinpoint on all target positions I pass in. The pinpoint contains HTML code and functions as a button as well as an event trigger.
    - What it adds to my website:
    - With this tool, users could find the origin and remarkable restaurants I mentioned on a map.
2. Bootstrap 4
    - Why I chose to use it:
    - To make my website responsive to different screen sizes and maintain a consistent style across all pages, I used bootstrap to build a grid system.
    - How I used it:
    - After getting familiar with the class tags and built-in styles, I created the layout for a normal-sized computer screen based on my prototype. Then I planned out the information I want to emit for smaller screens and how the design should change. Finally, I included breaking points at each screen size, namely, extra-small, small, and medium.
    - What it adds to my website:
    - It helps me to quickly create high-fi prototype components such as carousels, cards, and buttons as I develop my website. The built-in design pattern and grid system keep everything aligned, justified, simple, and clean.
3. Locomotive-Scroll (An animation library)
    - Why I chose to use it:
    - I want my animations to be triggered by the scroller and create smoother feedback on scrolling for the users.
    - How I used it:
    - I customized several animation patterns with the parameters from the library. Then I include them as class names in HTML, which controls factors such as speed and moving directions of the animation.
    - What it adds to my website:Click on the pinpoint on the map and then click on the button that appears. This will force the page to load correct information in the pages below and automatically take you to the introduction page.
    - The library helps create animations moving smoothly as the user scrolling down the website. It also helps show hierarchy and connections among components based on how they move and the time it takes for them to appear.

## Part 4: Iteration Process (2-4 Sentences)

- Based on feedback from user tests and heuristic evaluations with TAs, I decided to shrink my website's scale to one page. Instead of describing everything about the burgers, I decided to concentrate on the location, fun facts, and main ingredients of the burger. In this way, the information functions as a hook that interests the users to check out the videos. Because of this decision, I eventually got rid of the navigation bar and replaced it with a carousel on the home page.

## Part 5: Challenges (2-4 Sentences)

- Using the animation library was unexpectedly challenging because it turns out I cannot merely rely on high-level abstraction, copy and paste class names from examples, and wait for my website to perform the same way. I still need to understand what the library does under the hood in general.
- Another challenge comes with maintaining modularity in JS scripts with ES6 syntax. The browser needs a bundle tool (e.g., Parcel and Web-pack) to help the package manager (e.g., npm) compile all files to the server.

## Appendix

### Link to Prototype: [here](https://www.figma.com/file/k79D47K1X4pAd62LcmTv3p/Burger-Scholar?node-id=0%3A1)

### Link to Git Hub Repo: [here](https://github.com/BilLogic/boyuang.pui.github.io/tree/master/homework_8/src)

### Link to GitHub Page: [here](https://billogic.github.io/boyuang.pui.github.io/homework_8/src/index.html)