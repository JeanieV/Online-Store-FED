import data from './products.json' assert { type: 'json' };
console.log(data);

// Class
class Products {
    constructor(productName, firstDescription, secondDescription, image, price, category) {
        if (category === "Succulents") {
            this._productName = productName;
            this._firstDescription = firstDescription;
            this._image = image;
            this._secondDescription = secondDescription;
            this._price = price;
            this._category = category;
        }
    }

    // Getters
    get getProductName() {
        return this._productName;
    }
    get getFirstDescription() {
        return this._firstDescription;
    }
    get getImage() {
        return this._image;
    }
    get getSecondDescription() {
        return this._secondDescription;
    }
    get getPrice() {
        return this._price;
    }
    get getCategory() {
        return this._category;
    }

}
const modalView = document.getElementById("myModal");

function showModal(index) {


    const product = succulentArray[index];
    modalView.innerHTML = '';

    // Creating constants that will show the modal for every product
    const myproduct = document.createElement("div");
    myproduct.classList.add("modal-content");
    myproduct.classList.add("mx-5");
    myproduct.classList.add("mt-5");

    const closeButton = document.createElement("span");
    closeButton.classList.add("close");
    closeButton.classList.add("p-2");
    closeButton.innerHTML = "&times";

    closeButton.addEventListener("click", () => {
        modalView.style.display = 'none';
    });

    const heading2 = document.createElement("h2");
    heading2.classList.add("heading2Modal");
    heading2.innerHTML = product.getProductName;

    const heading3 = document.createElement("h3");
    heading3.innerHTML = product.getFirstDescription;

    const myrow = document.createElement("div");
    myrow.classList.add("row");

    // first column
    const mycolumn1 = document.createElement("div");
    mycolumn1.classList.add("column");

    const div1 = document.createElement("div");
    div1.classList.add("img-zoom-container");

    const picture1 = document.createElement("picture");

    const modalImage = document.createElement("img");
    modalImage.classList.add("succulentModal");
    modalImage.setAttribute("id", "modalImage");
    modalImage.setAttribute("src", product.getImage);


    const div2 = document.createElement("div");
    div2.classList.add("succulentModal");
    div2.setAttribute("id", "myResult");



    // Column 1 inside

    picture1.appendChild(modalImage);
    div1.appendChild(picture1);
    div1.appendChild(div2);
    mycolumn1.appendChild(div1);


    /* Create a wrapper div */
    const zoomWrapper = document.createElement("div");
    zoomWrapper.setAttribute("class", "img-zoom-wrapper");

    /* Add the original image to the wrapper div */
    zoomWrapper.appendChild(modalImage);

    /* Insert the wrapper div */
    picture1.appendChild(zoomWrapper);


    const lens = document.createElement("div");
    lens.setAttribute("class", "img-zoom-lens");
    zoomWrapper.appendChild(lens);

    const result = document.createElement("div");
    result.setAttribute("class", "img-zoom-result");
    zoomWrapper.appendChild(result);

    let cx, cy;
    /* Calculate the ratio between result DIV and lens */
    result.style.backgroundImage = "url('" + modalImage.src + "')";

    cx = result.offsetWidth / lens.offsetWidth;
    cy = result.offsetHeight / lens.offsetHeight;

    const img = document.createElement("img");
    zoomWrapper.appendChild(img);
    img.addEventListener("mousemove", moveLens);

    lens.addEventListener("mousemove", moveLens);
    result.style.backgroundSize = (modalImage.width * cx) + "px " + (modalImage.height * cy) + "px";


    /* Function to move the lens */
    function moveLens(e) {
        /* Position of the cursor relative to the image */
        let pos = getCursorPos(e);

        /* Calculate the position of the lens */
        let x = pos.x - (lens.offsetWidth / 2);
        let y = pos.y - (lens.offsetHeight / 2);

        /* Prevent the lens from being positioned outside the image */
        if (x > modalImage.width - lens.offsetWidth) {
            x = modalImage.width - lens.offsetWidth;
        }
        if (x < 0) {
            x = 0;
        }
        if (y > modalImage.height - lens.offsetHeight) {
            y = modalImage.height - lens.offsetHeight;
        }
        if (y < 0) {
            y = 0;
        }

        /* Set the position of the lens */
        lens.style.left = x + "px";
        lens.style.top = y + "px";

        /* Display what the lens "sees" */

        result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
    }

    function getCursorPos(e) {
        let a,
            x = 0,
            y = 0;
        e = e || window.event;
        a = modalImage.getBoundingClientRect();

        x = e.pageX - a.left;
        y = e.pageY - a.top;
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return { x: x, y: y };
    }


    // Column 2
    const mycolumn2 = document.createElement("div");
    mycolumn2.classList.add("column");

    const unordered = document.createElement("ul");

    for (let j = 0; j < product.getSecondDescription.length; j++) {
        let mylist = document.createElement("li");
        mylist.innerHTML = product.getSecondDescription[j];
        unordered.appendChild(mylist);
    }

    const headingthree = document.createElement("h3");
    headingthree.innerHTML = "R" + product.getPrice + " each";

    const buttonnew = document.createElement("button");
    buttonnew.classList.add("btn");
    buttonnew.classList.add("succulentCard");
    buttonnew.setAttribute("id", "addtoCart");
    buttonnew.innerHTML = "Go to Cart";

    // Column 2 inside
    mycolumn2.appendChild(unordered);
    mycolumn2.appendChild(headingthree);
    mycolumn2.appendChild(buttonnew);

    //Row 
    myrow.appendChild(mycolumn1);
    myrow.appendChild(mycolumn2);

    // Product
    myproduct.appendChild(closeButton);
    myproduct.appendChild(heading2);
    myproduct.appendChild(heading3);
    myproduct.appendChild(myrow);

    modalView.appendChild(myproduct);
    modalView.style.display = "block";
}
window.addEventListener('click', (event) => {
    if (event.target == modalView) {
        modalView.style.display = 'none';
    }
});


// Empty Succulent Array
let succulentArray = [];


// Loop through the products in the JSON data
for (let i = 0; i < data.products.length; i++) {

    // Create an Product object and push it into the succulentArray
    if (data.products[i].category === "Succulents") {
    let product = new Products(data.products[i].productName, data.products[i].firstDescription, data.products[i].secondDescription, data.products[i].image, data.products[i].price, data.products[i].category)
    
        succulentArray.push(product);
    }

}
console.log(succulentArray)

const readMoreButtons = document.querySelectorAll('.readMore');
readMoreButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        showModal(index);
    });
});

