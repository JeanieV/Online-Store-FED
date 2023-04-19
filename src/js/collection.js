// Buttons
let readMoreButton = document.getElementById("readMore");
let readMoreButton1 = document.getElementById("readMore1");
let readMoreButton2 = document.getElementById("readMore2");
let readMoreButton3 = document.getElementById("readMore3");
let readMoreButton4 = document.getElementById("readMore4");
let readMoreButton5 = document.getElementById("readMore5");
let span = document.getElementsByClassName("close")[0];
let span1 = document.getElementsByClassName("close1")[0];
let span2 = document.getElementsByClassName("close2")[0];
let span3 = document.getElementsByClassName("close3")[0];
let span4 = document.getElementsByClassName("close4")[0];
let span5 = document.getElementsByClassName("close5")[0];
let modal = document.getElementById("myModal");
let modal1 = document.getElementById("myModal1");
let modal2 = document.getElementById("myModal2");
let modal3 = document.getElementById("myModal3");
let modal4 = document.getElementById("myModal4");
let modal5 = document.getElementById("myModal5");

// The modal will open when the user clicks on Read More
readMoreButton.addEventListener('click', () => {
    modal.style.display = "block";
})
readMoreButton1.addEventListener('click', () => {
    modal1.style.display = "block";
})
readMoreButton2.addEventListener('click', () => {
    modal2.style.display = "block";
})
readMoreButton3.addEventListener('click', () => {
    modal3.style.display = "block";
})
readMoreButton4.addEventListener('click', () => {
    modal4.style.display = "block";
})
readMoreButton5.addEventListener('click', () => {
    modal5.style.display = "block";
})

//Close button
span.addEventListener('click', () => {
    modal.style.display = "none";
})
span1.addEventListener('click', () => {
    modal1.style.display = "none";
})
span2.addEventListener('click', () => {
    modal2.style.display = "none";
})
span3.addEventListener('click', () => {
    modal3.style.display = "none";
})
span4.addEventListener('click', () => {
    modal4.style.display = "none";
})
span5.addEventListener('click', () => {
    modal5.style.display = "none";
})


//When the user click outside the modal, the modal will close
window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
})
window.addEventListener('click', (event) => {
    if (event.target == modal1) {
        modal1.style.display = "none";
    }
})
window.addEventListener('click', (event) => {
    if (event.target == modal2) {
        modal2.style.display = "none";
    }
})
window.addEventListener('click', (event) => {
    if (event.target == modal3) {
        modal3.style.display = "none";
    }
})
window.addEventListener('click', (event) => {
    if (event.target == modal4) {
        modal4.style.display = "none";
    }
})
window.addEventListener('click', (event) => {
    if (event.target == modal5) {
        modal5.style.display = "none";
    }
})

// Zoom effect on Images

function imageZoom(modalImage, myResult) {

    let img = document.getElementById(modalImage);
    let result = document.getElementById(myResult);

    /* Create lens: */
    let lens = document.createElement("div");
    lens.setAttribute("class", "img-zoom-lens");

    /* Insert lens: */
    img.parentElement.insertBefore(lens, img);

    /* Calculate the ratio between result DIV and lens: */
    let cx = result.offsetWidth / lens.offsetWidth;
    let cy = result.offsetHeight / lens.offsetHeight;

    /* Set background properties for the result DIV */
    result.style.backgroundImage = "url('" + img.src + "')";
    result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";

    /* Execute a function when someone moves the cursor over the image, or the lens: */
    lens.addEventListener("mousemove", moveLens);
    img.addEventListener("mousemove", moveLens);

    /* And also for touch screens: */
    lens.addEventListener("touchmove", moveLens);
    img.addEventListener("touchmove", moveLens);

    function moveLens(e) {

        /* Prevent any other actions that may occur when moving over the image */
        e.preventDefault();

        /* Get the cursor's x and y positions: */
        let pos = getCursorPos(e);

        /* Calculate the position of the lens: */
        let x = pos.x - (lens.offsetWidth / 2);
        let y = pos.y - (lens.offsetHeight / 2);

        /* Prevent the lens from being positioned outside the image: */
        if (x > img.width - lens.offsetWidth) { x = img.width - lens.offsetWidth; }
        if (x < 0) { x = 0; }
        if (y > img.height - lens.offsetHeight) { y = img.height - lens.offsetHeight; }
        if (y < 0) { y = 0; }

        /* Set the position of the lens: */
        lens.style.left = x + "px";
        lens.style.top = y + "px";

        /* Display what the lens "sees": */
        result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
    }

    function getCursorPos(e) {
        let x = 0;
        let y = 0;

        e = e || window.event;

        /* Get the x and y positions of the image: */
        let a = img.getBoundingClientRect();

        /* Calculate the cursor's x and y coordinates, relative to the image: */
        x = e.pageX - a.left;
        y = e.pageY - a.top;

        /* Consider any page scrolling: */
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return { x: x, y: y };
    }
}

//Initiate zoom for every product
imageZoom("modalImage", "myResult");
imageZoom("modalImage1", "myResult1");
imageZoom("modalImage2", "myResult2");
imageZoom("modalImage3", "myResult3");
imageZoom("modalImage4", "myResult4");
imageZoom("modalImage5", "myResult5");


// class Product {
//     constructor(name, description, image, price) {
//       this.name = name;
//       this.description = description;
//       this.image = image;
//       this.price = price;
//     }
  
//     showModal() {
//       // Get the modal element
//       const modal = document.getElementById("myModal");
  
//       // Get the image and description elements in the modal
//       const modalImage = modal.querySelector("#modalImage");
//       const modalDescription = modal.querySelector("#modalDescription");
  
//       // Set the values for the modal elements
//       modalImage.src = this.image;
//       modalDescription.innerHTML = this.description;
  
//       // Display the modal
//       modal.style.display = "block";
//     }
//   }
  
//   // Create a new succulent object
//   const succulent1 = new Product(
//     "Small Succulent",
//     "<h3>The Small Succulent plant is made entirely for new garden enthusiasts </h3>" +
//       "<ul>" +
//       "<li>Pot Size: 2 to 3 Inch Pot</li>" +
//       "<li>Plant Size: 2 Inch To 4 Inch plants depending on variety</li>" +
//       "<li>Keep in direct sun they love sunny weather</li>" +
//       "<li>Water once in a week if its winter or rainy season</li>" +
//       "<li>In summer water twice a week</li>" +
//       "</ul>",
//     "/src/images/succulent1.webp",
//     "R25 each"
//   );
  
//   // Get the Read More button and add a click event listener to show the modal
//   const readMoreBtn = document.getElementById("readMore");
//   readMoreBtn.addEventListener("click", () => {
//     succulent1.showModal();
//   });
  
//   // Get the Add to Cart button and add a click event listener to add to cart
//   const addCartBtn = document.getElementById("addCartBtn");
//   addCartBtn.addEventListener("click", () => {
//     // Add to cart logic here
//   });