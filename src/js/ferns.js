import data from './products.json' assert { type: 'json' };
console.log(data);

// Class
class Products {
    constructor(name, firstdescription, seconddescription, image, price) {
        this._name = name;
        this._firstdescription = firstdescription;
        this._image = image;
        this._seconddescription = seconddescription;
        this._price = price;
    }

    // Getters
    get getname() {
        return this._name;
    }
    get getfirstdescription() {
        return this._firstdescription;
    }
    get getimage() {
        return this._image;
    }
    get getseconddescription() {
        return this._seconddescription;
    }
    get getPrice() {
        return this._price;
    }


    showModal() {

        // Creating constants that will show the modal for every product
        const nameElement = document.querySelector("#myModal h2.heading2Modal");
        const firstDescriptionElement = document.querySelector("#myModal h3");
        const secondDescriptionElement = document.querySelector("#myModal ul");
        const imageElement = document.querySelector("#myModal img#modalImage");
        const priceElement = document.querySelector("#myModal div.column h3");
        const resultElement = document.querySelector("#myModal #myResult");
        const closeButton = document.querySelector(".close");
        const modalView = document.getElementById("myModal");
        const modalImage = document.getElementById("modalImage");

        nameElement.innerHTML = this._name;
        firstDescriptionElement.innerHTML = this._firstdescription;
        secondDescriptionElement.innerHTML = this._seconddescription;
        imageElement.src = this._image;
        priceElement.innerHTML = "R " + this._price + " each";
        modalView.style.display = "block";
        imageZoom(modalImage, resultElement);
        modalImage.setAttribute("src", this._image);

        closeButton.addEventListener("click", () => {
            modalView.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target == modalView) {
                modalView.style.display = 'none';
            }
        });
    }
}

// Empty Fern Array
let fernArray = [];

// Creating the new products inside the Class Products
// Ferns
const fern1 = new Products(
    "Nephrolepis Exaltata Blonde",
    "This Boston Blonde Fern is a beautiful hanging houseplant",
    "<ul>" +
    "<li>Pot Size: 20cm</li>" +
    "<li>Water your fern thoroughly and allowed it to dry between waterings, only water when the soil dries out.</li>" +
    "<li>Use potting soil with good drainage</li>" +
    "</ul>",
    "/src/images/fern1.jpeg",
    130
);
const fern2 = new Products(
    "Asparagus Plumosus",
    "This Asparagus Plumosus is a beautiful indoor",
    "<ul>" +
    "<li>Pot Size: 12cm</li>" +
    "<li>Water your fern thoroughly and allowed it to dry between waterings, only water when the soil dries out.</li>" +
    "<li>Use potting soil with good drainage</li>" +
    "</ul>",
    "/src/images/fern2.webp",
    130
);

// The products gets pushed into the succulent Array
fernArray.push(fern1,fern2);

// Get the Read More button and add a click event listener to show the modal
let readMoreButton11 = document.getElementById("readMore11");
let readMoreButton12 = document.getElementById("readMore12");

let closeButton = document.querySelector(".close");
let modalView = document.getElementById("myModal");
let modalImage1 = document.getElementById("modalImage");


// Fern 1
readMoreButton11.addEventListener("click", () => {
    fern1.showModal();
    modalView.style.display = 'block';
    modalImage1.setAttribute("src", "/src/images/fern1.jpeg");
})
// Fern 2
readMoreButton12.addEventListener("click", () => {
    fern2.showModal();
    modalView.style.display = 'block';
    modalImage1.setAttribute("src", "/src/images/fern2.webp");
})


// The closeButton and Window button will remain the same for all the products
closeButton.addEventListener("click", () => {
    modalView.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target == modalView) {
        modalView.style.display = 'none';
    }
});



// Zoom Image inside Modal that will remain the same for all products
function imageZoom(modalImage, myResult) {

    let img = document.getElementById("modalImage");
    let result = document.getElementById("myResult");

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
