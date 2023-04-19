import data from './products.json' assert { type: 'json' };
console.log(data);


class Products {
    constructor(name, firstdescription, seconddescription, image, price) {
        this._name = name;
        this._firstdescription = firstdescription;
        this._image = image;
        this._seconddescription = seconddescription;
        this._price = price;
    }

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

        let modal =
            `
        <div id="myModal" class="modal">
            <div class="modal-content mx-5 mt-5">
                <span class="close p-2">&times;</span>
                <h2 class="heading2Modal"> ${this._name}</h2>
                <h3> ${this._firstdescription}</h3>
                <div class="row">
                    <div class="column">
                        <div class="img-zoom-container">
                            <picture>
                                <img id="modalImage" ${this._image} >
                            <div id="myResult" class="img-zoom-result"></div>
                        </div>
                    </div>
                    <div class="column">
                        ${this._seconddescription}
                        <h3> R ${this._price} each </h3>
                        <a href="/src/html/succulents.html" class="btn succulentCard p-3"> Add to Cart </a>
                    </div>
                </div>
            </div>
        </div>
        `;
        document.getElementById("myModal").innerHTML += modal;
        return modal;
    }
}


// Empty Succulent Array
let succulentArray = [];


const succulent1 = new Products(
    "Small Succulent",
    "The Small Succulent plant is made entirely for new garden enthusiasts",
    "<ul>" +
    "<li>Pot Size: 2 to 3 Inch Pot</li>" +
    "<li>Plant Size: 2 Inch To 4 Inch plants depending on variety</li>" +
    "<li>Keep in direct sun they love sunny weather</li>" +
    "<li>Water once in a week if its winter or rainy season</li>" +
    "<li>In summer water twice a week</li>" +
    "</ul>",
    "./src/images/succulent1.webp",
    25
);

const succulent2 = new Products(
    "Mini Succulent Garden",
    "<h3>The Mini Succulent Garden is the perfect gift </h3>",
    "<ul>" +
    "<li>Pot Size: 2 to 3 Inch Pot</li>" +
    "<li>Plant Size: 2 Inch To 4 Inch plants depending on variety</li>" +
    "<li>Keep in direct sun they love sunny weather</li>" +
    "<li>Water once in a week if its winter or rainy season</li>" +
    "<li>In summer water twice a week</li>" +
    "</ul>",
    "/src/images/succulent2.webp",
    250
)

succulentArray.push(succulent1, succulent2);


// Get the Read More button and add a click event listener to show the modal
let readMoreButton = document.getElementById("readMore");
let span = document.getElementsByClassName("close")[0];

readMoreButton.addEventListener("click", () => {
  const modalView = succulent1.showModal();
  modalView.style.display = 'block';
  console.log(succulent1);
});

span.addEventListener("click", () => {
  const modalView = succulent1.showModal();
  modalView.style.display = 'none';
});

window.addEventListener('click', (event) => {
  const modalView = succulent1.showModal();
  if (event.target == modalView) {
    modalView.style.display = 'none';
  }
});



// Zoom in Modal
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
