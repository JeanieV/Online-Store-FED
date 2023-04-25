import data from './products.json' assert { type: 'json' };
console.log(data);

// Class
class Products {
    constructor(productName, firstDescription, secondDescription, image, price, category) {
        if (category === "Plant Care") {
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

    const product = plantCareArray[index];
    //Clear the current modal before showing a new modal
    modalView.innerHTML = '';

    // Creating constants that will show the modal for every product
    const myproduct = document.createElement("div");
    myproduct.classList.add("modal-content", "mx-5", "mt-5");

    //Creating the close button on the modal
    const closeButton = document.createElement("span");
    closeButton.classList.add("close", "p-2");
    closeButton.innerHTML = "&times";

    closeButton.addEventListener("click", () => {
        modalView.style.display = 'none';
    });

    // Creating the product name
    const heading2 = document.createElement("h2");
    heading2.classList.add("heading2Modal");
    heading2.innerHTML = product.getProductName;

    // Creating the first description
    const heading3 = document.createElement("h3");
    heading3.innerHTML = product.getFirstDescription;

    // This is the row that contains the 2 columns
    const myrow = document.createElement("div");
    myrow.classList.add("row");

    // First column
    const mycolumn1 = document.createElement("div");
    mycolumn1.classList.add("column");

    // Creating the zoom container
    const div1 = document.createElement("div");
    div1.classList.add("img-zoom-container");

    // Creating the original image inside the modal
    const modalImage = document.createElement("img");
    modalImage.classList.add("succulentModal");
    modalImage.setAttribute("id", "modalImage");
    modalImage.setAttribute("src", product.getImage);

    /* create the zoom result element */
    const result = document.createElement("div");
    result.classList.add("img-zoom-result");

    // Column 1 inside
    div1.appendChild(modalImage);
    div1.appendChild(result);
    mycolumn1.appendChild(div1);

    let cx, cy;

    /*create lens:*/
    const lens = document.createElement("div");
    lens.setAttribute("class", "img-zoom-lens");

    /*insert lens:*/
    modalImage.parentElement.insertBefore(lens, modalImage);

    /*The lens will move when hovering over the image*/
    lens.addEventListener("mousemove", moveLens);
    modalImage.addEventListener("mousemove", moveLens);

    modalImage.addEventListener('load', () => {
        /*calculate the ratio between result DIV and lens:*/
        cx = result.offsetWidth / lens.offsetWidth;
        cy = result.offsetHeight / lens.offsetHeight;

        /*set background properties for the result div*/
        result.style.backgroundImage = "url('" + modalImage.src + "')";
        result.style.backgroundSize = (modalImage.width * cx) + "px " + (modalImage.height * cy) + "px";

    })

    function moveLens(e) {

        let pos, x, y;

        /*prevent any other actions that may occur when moving over the image:*/
        e.preventDefault();

        /*get the cursor's x and y positions:*/
        pos = getCursorPos(e);

        /*calculate the position of the lens:*/
        x = pos.x - (lens.offsetWidth / 1);
        y = pos.y - (lens.offsetHeight / 1);

        /*prevent the lens from being positioned outside the image:*/
        if (x > modalImage.width - lens.offsetWidth) { x = modalImage.width - lens.offsetWidth; }
        if (x < 0) { x = 0; }
        if (y > modalImage.height - lens.offsetHeight) { y = modalImage.height - lens.offsetHeight; }
        if (y < 0) { y = 0; }

        /*set the position of the lens:*/
        lens.style.left = x + "px";
        lens.style.top = y + "px";

        /*display what the lens "sees":*/
        result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";

        function getCursorPos(e) {
            let a, x = 0, y = 0;
            e = e || window.event;
            
            /*get the x and y positions of the image:*/
            a = modalImage.getBoundingClientRect();

            /*calculate the cursor's x and y coordinates, relative to the image:*/
            x = e.pageX - a.left;
            y = e.pageY - a.top;

            /*consider any page scrolling:*/
            x = x - window.pageXOffset;
            y = y - window.pageYOffset;
            return { x: x, y: y };
        }
    }

    // Column 2
    const mycolumn2 = document.createElement("div");
    mycolumn2.classList.add("column");

    const unordered = document.createElement("ul");

    // The for loop will loop through the JSON string
    for (let j = 0; j < product.getSecondDescription.length; j++) {
        let mylist = document.createElement("li");
        mylist.innerHTML = product.getSecondDescription[j];
        unordered.appendChild(mylist);
    }

    // Creating the Price 
    const headingthree = document.createElement("h3");
    headingthree.innerHTML = "R" + product.getPrice + " each";

    // Creating the Go to Cart button inside the modal
    const buttonnew = document.createElement("button");
    buttonnew.classList.add("btn", "succulentCard");
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


    // The modal display
    modalView.appendChild(myproduct);
    modalView.style.display = "block";
}
// When the user clicks outside the modal, it will close
window.addEventListener('click', (event) => {
    if (event.target == modalView) {
        modalView.style.display = 'none';
    }
});


// Empty Succulent Array
let plantCareArray = [];


// Loop through the products in the JSON data
for (let i = 0; i < data.products.length; i++) {
    if (data.products[i].category === "Plant Care") {
        // Create an Product object and push it into the succulentArray
        let product = new Products(data.products[i].productName, data.products[i].firstDescription, data.products[i].secondDescription, data.products[i].image, data.products[i].price, data.products[i].category)

        plantCareArray.push(product);
    }

}
console.log(plantCareArray)

const readMoreButtons = document.querySelectorAll('.readMore');
readMoreButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        showModal(index);
    });
});