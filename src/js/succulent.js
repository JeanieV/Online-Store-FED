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


// Modal Section

const modalView = document.getElementById("myModal");

function showModal(index) {

    const product = succulentArray[index];
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
    buttonnew.setAttribute("id", "addToCart");
    buttonnew.innerHTML = "Add to Cart";

    // When the button is clicked, the cart modal will show
    buttonnew.addEventListener('click', () => {
        showCart(index);
    })

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

// The showModal will display when the user clicks on the Read More Button
const readMoreButtons = document.querySelectorAll('.readMore');
readMoreButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        showModal(index);
    });
});




// Cart Section


// Empty Cart Array
let cartArray = [];

// function saveCart() {
//     localStorage.setItem('showCart', JSON.stringify(cartArray));
// }


const cartView = document.getElementById("myModal");

// Function to display the cart modal
function showCart(index) {

    const item = succulentArray[index];
    item.quantity = 1;

    const existingProduct = cartArray.findIndex(cartItem => cartItem.getProductName === item.getProductName);

    if (existingProduct >= 0) {
        // If the product is already in the cart, show an alert message and view cart
        alert("You've already added this product to the cart!\nKindly see your cart with the item in it");
    } else {
        // Otherwise, add the item to the cart
        cartArray.push(item);
    }

    console.log(cartArray);


    //Clear the current modal before showing a new modal
    cartView.innerHTML = '';

    // Creating constants that will show the modal for every product
    const mycart = document.createElement("div");
    mycart.classList.add("content-cart", "mx-5", "mt-5");

    //Creating the close button on the modal
    const buttonClose = document.createElement("span");
    buttonClose.classList.add("close", "p-2");
    buttonClose.innerHTML = "&times";

    buttonClose.addEventListener("click", () => {
        cartView.style.display = 'none';
    });

    // Creating the Heading
    const invoiceName = document.createElement("h2");
    invoiceName.classList.add("heading2Modal", "pb-5");
    invoiceName.innerHTML = "Invoice";

    // Creating a date for the invoice
    const centerDiv1 = document.createElement('div');
    centerDiv1.classList.add("col-md-12", "text-center")

    const cartDate = document.createElement("p");
    cartDate.innerHTML = "Date: " + new Date().toLocaleDateString();
    cartDate.classList.add("invoice-date","pb-3");

    // Appending the cartDate to the div
    centerDiv1.appendChild(cartDate);


    // Creating the table
    const tableCart = document.createElement("table");
    tableCart.classList.add("table", "table-striped");


    // Creating the table row and head
    const tableHeadRow = document.createElement("tr");

    // Creating the image heading that will show in the table
    const tableHeadImage = document.createElement("th");
    tableHeadImage.classList.add("tableHeadings");
    tableHeadImage.innerHTML = "Image";

    // Creating the product name heading that will show in the table
    const tableHeadProductName = document.createElement("th");
    tableHeadProductName.classList.add("tableHeadings");
    tableHeadProductName.innerHTML = "Product Name";

    // Creating the quantity heading that will show in the table
    const tableHeadQuantity = document.createElement("th");
    tableHeadQuantity.classList.add("tableHeadings");
    tableHeadQuantity.innerHTML = "Quantity";

    // Creating the price heading that will show in the table
    const tableHeadPrice = document.createElement("th");
    tableHeadPrice.classList.add("tableHeadings");
    tableHeadPrice.innerHTML = "Price";


    // Appending to tableCart
    tableHeadRow.appendChild(tableHeadImage);
    tableHeadRow.appendChild(tableHeadProductName);
    tableHeadRow.appendChild(tableHeadQuantity);
    tableHeadRow.appendChild(tableHeadPrice);
    tableCart.appendChild(tableHeadRow);

    // This will add all the products in the modal, starting with 0
    let subTotal = 0;
    let total = 0;


    cartArray.forEach((item) => {

        // Creating the table data
        const tableDataRow = document.createElement("tr");

        // Creating the image that will show in the table
        const tableDataImage = document.createElement("td");
        tableDataImage.classList.add("tableData");
        const image = document.createElement("img");
        image.src = item.getImage;
        image.alt = item.getProductName;
        image.classList.add("cart-image");
        tableDataImage.appendChild(image);

        // Creating the product name that will shpw in the table
        const tableDataProductName = document.createElement("td");
        tableDataProductName.classList.add("tableData");
        tableDataProductName.innerHTML = item.getProductName;

        // Creating the product quantity that will show in the table
        const tableDataQuantity = document.createElement("td");
        tableDataQuantity.classList.add("tableData");
        // Creating the quantity input
        const quantityInput = document.createElement("input");
        quantityInput.type = "number";
        quantityInput.min = 1;
        quantityInput.max = 100;
        quantityInput.value = 1;
        quantityInput.classList.add("quantity-input");

        // Add event listener to the quantity input
        quantityInput.addEventListener("input", () => {

            const newQuantity = parseInt(quantityInput.value);
            item.quantity = newQuantity;
            const newPrice = "R" + (item.getPrice * newQuantity);
            tableDataPrice.innerHTML = newPrice;

            let subTotal = 0
            cartArray.forEach((item) => {
                subTotal += item.getPrice * item.quantity;
            });
            subTotal = subTotal.toFixed(2);
            subTotalValue.innerHTML = "R" + subTotal;

            // update the total
            if (cartArray.length === 0) {
                total = 0;
            } else {
                total = 0;
                cartArray.forEach((item) => {
                    total += (item.getPrice * item.quantity);
                });
                total += 90;
                total = total.toFixed(2);
            }
            totalValue.innerHTML = "R" + total;
            showProductCount();
        });

        // Appending to the quantity in the table
        tableDataQuantity.appendChild(quantityInput);

        // Creating the product price that will show in the table
        const tableDataPrice = document.createElement("td");
        tableDataPrice.classList.add("tableData");
        tableDataPrice.innerHTML = "R" + item.getPrice;


        // Creating the remove button that will delete the row
        const removeRowButton = document.createElement("td");
        removeRowButton.classList.add("tableData");
        const bin = document.createElement("img");
        bin.src = "/src/images/bin.gif";
        bin.alt = "Remove"
        bin.classList.add("cart-image-bin");
        bin.setAttribute("id", "deleteRow")
        removeRowButton.appendChild(bin);

        // The function that will delete the row
        function removeRow(event, index) {
            const entry = event.target.parentNode.parentNode;
            cartArray.splice(index, 1);
            entry.remove();
            // saveTasks();

            let subTotal = 0
            cartArray.forEach((item) => {
                subTotal += item.getPrice * item.quantity;
            });
            subTotal = subTotal.toFixed(2);
            subTotalValue.innerHTML = "R" + subTotal;

            // update the total

            if (cartArray.length === 0) {
                total = 0;
            } else {
                total = 0;
                cartArray.forEach((item) => {
                    total += (item.getPrice * item.quantity);
                });
                total += 90;
                total = total.toFixed(2);
                showProductCount();
            }
            totalValue.innerHTML = "R" + total;

            showProductCount();
        }

        // When the user clicks on the image, the row will be deleted
        bin.addEventListener('click', removeRow);

        // Calculating the new quantity and price
        let newQuantity = parseInt(quantityInput.value);
        item.quantity = newQuantity;
        let newPrice = item.getPrice * item.quantity;
        subTotal += newPrice;
        total = subTotal + 90

        // Appending to tableCart
        tableDataRow.appendChild(tableDataImage);
        tableDataRow.appendChild(tableDataProductName);
        tableDataRow.appendChild(tableDataQuantity);
        tableDataRow.appendChild(tableDataPrice);
        tableDataRow.appendChild(removeRowButton);
        tableCart.appendChild(tableDataRow);
    });


    // Creating the Sub Total row and label
    const subTotalRow = document.createElement("tr");
    const subTotalLabel = document.createElement("td");
    subTotalLabel.classList.add("priceHeadings");
    subTotalLabel.colSpan = 1;
    subTotalLabel.textContent = "Sub-Total";

    // Creating the value 
    const subTotalValue = document.createElement("td");
    subTotalValue.classList.add("tableData");
    subTotalValue.textContent = "R" + subTotal.toFixed(2);
    subTotalRow.appendChild(subTotalLabel);
    subTotalRow.appendChild(subTotalValue);
    tableCart.appendChild(subTotalRow);

    // Creating the Delivery row and label
    const deliveryRow = document.createElement("tr");
    const deliveryLabel = document.createElement("td");
    deliveryLabel.classList.add("priceHeadings");
    deliveryLabel.colSpan = 1;
    deliveryLabel.textContent = "Standard Delivery";

    // Creating the value
    const deliveryValue = document.createElement("td");
    deliveryValue.classList.add("tableData");
    deliveryValue.textContent = "R90.00";
    deliveryRow.appendChild(deliveryLabel);
    deliveryRow.appendChild(deliveryValue);
    tableCart.appendChild(deliveryRow);


    // Creating the Total row and label
    const totalRow = document.createElement("tr");
    const totalLabel = document.createElement("td");
    totalLabel.classList.add("priceHeadings");
    totalLabel.colSpan = 1;
    totalLabel.textContent = "Total";

    // Creating the value
    const totalValue = document.createElement("td");
    totalValue.classList.add("tableData");
    totalValue.textContent = "R" + total.toFixed(2);
    totalRow.appendChild(totalLabel);
    totalRow.appendChild(totalValue);
    tableCart.appendChild(totalRow);

    // Creating a container div for the button
    const centerDiv = document.createElement('div');
    centerDiv.classList.add("col-md-12", "text-center", "py-5");

    // Creating the Go to Cart button inside the modal
    const purchaseButton = document.createElement("button");
    purchaseButton.classList.add("btn", "purchasebtn", "p-2");
    purchaseButton.innerHTML = "Purchase";

    // When the button is clicked, the cart modal will not show
    purchaseButton.addEventListener('click', () => {
        alert("Thank you for shopping at Faan's Garden!\nPurchase successful!");

        cartView.style.display = 'none';
        emptyShoppingCart();
    })

    centerDiv.appendChild(purchaseButton);

    // Appending to myCart
    mycart.appendChild(buttonClose);
    mycart.appendChild(invoiceName);
    mycart.appendChild(centerDiv1);
    mycart.appendChild(tableCart);
    mycart.appendChild(centerDiv);


    // The modal display
    cartView.appendChild(mycart);
    cartView.style.display = "block";

    showProductCount();
}

window.addEventListener('click', (event) => {
    if (event.target == cartView) {
        cartView.style.display = 'none';
    }
});


// Add to cart button
const addToCartButtons = document.querySelectorAll('.addToCart');

addToCartButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        showCart(index);
    });
});


showProductCount();

// View the cart button
const viewCartButton = document.querySelector(".viewShoppingCart");

viewCartButton.addEventListener('click', () => {
    console.log(viewCartButton);
    if (cartArray.length === 0) {
        emptyShoppingCart();
    } else {
        cartView.style.display = 'block';
    }
});


// When the user clicks on the shopping cart button on every page

function emptyShoppingCart() {
    showProductCount();
    //Clear the current modal before showing a new modal
    cartView.innerHTML = '';

    // Creating constants that will show the modal for every product
    const mycart = document.createElement("div");
    mycart.classList.add("content-cart", "mx-5", "mt-5");

    //Creating the close button on the modal
    const buttonClose = document.createElement("span");
    buttonClose.classList.add("close", "p-2");
    buttonClose.innerHTML = "&times";

    buttonClose.addEventListener("click", () => {
        cartView.style.display = 'none';
    });

    // Creating the Heading
    const invoiceName = document.createElement("h2");
    invoiceName.classList.add("heading2Modal", "pb-2");
    invoiceName.innerHTML = "Invoice";

    // Creating a date for the invoice
    const centerDiv1 = document.createElement('div');
    centerDiv1.classList.add("col-md-12", "text-center")

    const cartDate = document.createElement("p");
    cartDate.innerHTML = "Date: " + new Date().toLocaleDateString();
    cartDate.classList.add("invoice-date");

    // Appending the cartDate to the div
    centerDiv1.appendChild(cartDate);

    // Creating the paragraph
    const newparagraph = document.createElement("p");
    newparagraph.classList.add("tableData");
    newparagraph.innerHTML = `Your shopping cart is currently empty. <br> Kindly click on the button below to start your shopping journey!`

    const centerDiv = document.createElement('div');
    centerDiv.classList.add("col-md-12", "text-center", "py-5");

    // Creating the Go to Cart button inside the modal
    const shoppingButton = document.createElement("button");
    shoppingButton.classList.add("btn", "purchasebtn", "p-2");
    shoppingButton.innerHTML = "Continue shopping";

    shoppingButton.addEventListener('click', () => {
        cartView.style.display = 'none';
        showProductCount();

    })

    centerDiv.appendChild(shoppingButton)
    // Appending to the cart
    mycart.appendChild(buttonClose);
    mycart.appendChild(invoiceName);
    mycart.appendChild(centerDiv1);
    mycart.appendChild(newparagraph);
    mycart.appendChild(centerDiv);


    // The modal display
    cartView.appendChild(mycart);
    cartView.style.display = "block";

}

function showProductCount() {
    // Where to display products in cart 
    const cartItemCount = document.querySelector('.cartProductCount');

    // Set the text content of the button to show the number of items in the cart
    cartItemCount.textContent = `Shopping Cart (${cartArray.length})`;
    cartItemCount.classList.add("titles1");
}
