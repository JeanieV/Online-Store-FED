import { Products } from './product.js';
import data from './products.json' assert { type: 'json' };
console.log(data);

const modalView = document.getElementById("myModal");

// This is a function that shows the modal when clicked on the Read More Button
function showModal(index) {

    const product = productsArray[index];
    //Clear the current modal before showing a new modal
    modalView.innerHTML = '';

    // Creating constants that will show the modal for every product
    const myProduct = document.createElement("div");
    myProduct.classList.add("modal-content", "mx-5", "mt-5");

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
    const myRow = document.createElement("div");
    myRow.classList.add("row");

    // First column
    const myColumn1 = document.createElement("div");
    myColumn1.classList.add("column");

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
    myColumn1.appendChild(div1);

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
    const myColumn2 = document.createElement("div");
    myColumn2.classList.add("column");

    const unordered = document.createElement("ul");

    // The for loop will loop through the JSON string
    for (let j = 0; j < product.getSecondDescription.length; j++) {
        let mylist = document.createElement("li");
        mylist.innerHTML = product.getSecondDescription[j];
        unordered.appendChild(mylist);
    }

    // Creating the Price 
    const headingThree = document.createElement("h3");
    headingThree.innerHTML = "R" + product.getPrice + " each";

    // Creating the Go to Cart button inside the modal
    const buttonNew = document.createElement("button");
    buttonNew.classList.add("btn", "succulentCard");
    buttonNew.innerHTML = "Add to Cart";

    buttonNew.addEventListener('click', () => {
        showCart(index);
        updateCart();
    })

    // Column 2 inside
    myColumn2.appendChild(unordered);
    myColumn2.appendChild(headingThree);
    myColumn2.appendChild(buttonNew);

    //Row 
    myRow.appendChild(myColumn1);
    myRow.appendChild(myColumn2);

    // Product
    myProduct.appendChild(closeButton);
    myProduct.appendChild(heading2);
    myProduct.appendChild(heading3);
    myProduct.appendChild(myRow);


    // The modal display
    modalView.appendChild(myProduct);
    modalView.style.display = "block";
}
// When the user clicks outside the modal, it will close
window.addEventListener('click', (event) => {
    if (event.target == modalView) {
        modalView.style.display = 'none';
    }
});


// Empty Product Array
let productsArray = [];

// Loop through the products in the JSON data
for (let i = 0; i < data.products.length; i++) {
    // Create an Product object and push it into the productsArray
    let product = new Products(data.products[i].productName, data.products[i].firstDescription, data.products[i].secondDescription, data.products[i].image, data.products[i].price, data.products[i].category)
    productsArray.push(product);
}
console.log(productsArray);

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

// JSON data local Storage
function jsonToJSObjects() {
    let JSONdata = JSON.parse(localStorage.getItem('cartArray')) || [];
    // Make the cart empty, to remove duplicates
    cartArray = [];

    for (let i = 0; i < JSONdata.length; i++) {
        // Create a Product object and push it into the cartArray
        let product = new Products(JSONdata[i]._productName, JSONdata[i]._firstDescription, JSONdata[i]._secondDescription, JSONdata[i]._image, JSONdata[i]._price, JSONdata[i]._category);
        cartArray.push(product);
    }
}
// Call the local storage
jsonToJSObjects();

// Local Storage
function updateCart() {
    localStorage.setItem('cartArray', JSON.stringify(cartArray));
    jsonToJSObjects();
}

const cartView = document.getElementById("myModal");

// This will add global variables to the values
let subTotalValue;
let totalValue;


// Function to display the cart modal
function showCart(index) {
    cartView.innerHTML = '';

    let item = productsArray[index];
    item.quantity = 1;

    const existingProduct = cartArray.findIndex(cartItem => cartItem.getProductName === item.getProductName);

    if (existingProduct >= 0) {
        // If the product is already in the cart, show an alert message and view cart
        alert("You've already added this product to the cart!\nKindly see your cart with the item in it");
        cartView.style.display = 'block'
    } else {
        // Otherwise, add the item to the cart
        cartArray.push(item);
        updateCart();
    }

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
    cartDate.classList.add("invoice-date", "pb-3");

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

    let subTotal = 0;
    let total = 0;
    if (cartArray.length != 0) {
        // For each product, the quantity will change in the shopping cart
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
            quantityInput.max = 1000;
            quantityInput.value = 1;
            quantityInput.classList.add("quantity-input");

            // Creating the Product Price that will show in the cart
            const tableDataPrice = document.createElement("td");
            tableDataPrice.classList.add("tableData");
            tableDataPrice.innerHTML = "R" + item.getPrice.toFixed(2);
            item.tableDataPrice = tableDataPrice;


            // Function to handle the input event for the quantity input
            function updatedPrice() {
                subTotal = 0;
                if (quantityInput.value !== "") {
                    let quantity = parseInt(quantityInput.value);
                    item.quantity = quantity; // update the item's quantity
                    item.subTotal = item.getPrice * quantity;
                    item.tableDataPrice.innerHTML = "R" + item.subTotal.toFixed(2);

                    subTotal += item.subTotal;

                    subTotalValue.innerHTML = "R" + subTotal.toFixed(2);
                    totalValue.innerHTML = "R" + (subTotal + 90).toFixed(2);

                } else {
                    let zero = 0;
                    item.tableDataPrice.innerHTML = "R" + zero.toFixed(2);
                    subTotalValue.innerHTML = "R" + zero.toFixed(2);
                    totalValue.innerHTML = "R" + zero.toFixed(2);

                }
            }

            // Add event listener to the quantity input
            quantityInput.addEventListener("input", () => {
                updatedPrice();
            });

            let quantity = parseInt(quantityInput.value);
            item.quantity = quantity;
            item.subTotal = item.getPrice * quantity;

            subTotal += item.subTotal;
            total = subTotal + 90;

            // Appending to the quantity in the table
            tableDataQuantity.appendChild(quantityInput);

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

                if (cartArray.length === 0) {
                    subTotal = 0;
                    total = 0;
                }
                else {
                    let quantity = parseInt(quantityInput.value);
                    item.subTotal = item.getPrice * quantity;
                    subTotal = subTotal - item.subTotal;
                    total = subTotal + 90;
                }

                subTotalValue.innerHTML = "R" + subTotal.toFixed(2);
                totalValue.innerHTML = "R" + total.toFixed(2);

                showProductCount();
                updateCart();
            }

            // When the user clicks on the image, the row will be deleted
            bin.addEventListener('click', removeRow);

            // Appending to tableCart
            tableDataRow.appendChild(tableDataImage);
            tableDataRow.appendChild(tableDataProductName);
            tableDataRow.appendChild(tableDataQuantity);
            tableDataRow.appendChild(tableDataPrice);
            tableDataRow.appendChild(removeRowButton);
            tableCart.appendChild(tableDataRow);



        });
    }
    // Creating the Sub Total row and label
    const subTotalRow = document.createElement("tr");
    const subTotalLabel = document.createElement("td");
    subTotalLabel.classList.add("priceHeadings");
    subTotalLabel.colSpan = 1;
    subTotalLabel.textContent = "Sub-Total";

    // Creating the value 
    subTotalValue = document.createElement("td");
    subTotalValue.classList.add("tableData1");
    subTotalValue.innerHTML = "R" + subTotal.toFixed(2);

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
    deliveryValue.classList.add("tableData1");
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
    totalValue = document.createElement("td");
    totalValue.classList.add("tableData1");
    totalValue.innerHTML = "R" + total.toFixed(2);

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
        cartArray = [];
        emptyShoppingCart();
        updateCart();
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

// When the user clicks outside the modal, it will close as well
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
        updateCart();
    });
});

showProductCount();


// View the cart button
const viewCartButton = document.querySelector('.viewShoppingCart');
viewCartButton.addEventListener('click', shoppingCartButton);


function shoppingCartButton() {

    cartView.innerHTML = '';

    if (cartArray.length === 0) {
        emptyShoppingCart();
    }
    else {
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
        cartDate.classList.add("invoice-date", "pb-3");

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

        let subTotal = 0;
        let total = 0;

        if (cartArray.length != 0) {

            // For each product, the quantity will change in the shopping cart
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
                quantityInput.max = 1000;
                quantityInput.value = 1;
                quantityInput.classList.add("quantity-input");

                // Creating the Product Price that will show in the cart
                const tableDataPrice = document.createElement("td");
                tableDataPrice.classList.add("tableData");
                tableDataPrice.innerHTML = "R" + item.getPrice.toFixed(2);
                item.tableDataPrice = tableDataPrice;


                // Function to handle the input event for the quantity input
                function updatedPrice() {
                    subTotal = 0;
                    if (quantityInput.value !== "") {
                        let quantity = parseInt(quantityInput.value);
                        item.quantity = quantity; // update the item's quantity
                        item.subTotal = item.getPrice * quantity;
                        item.tableDataPrice.innerHTML = "R" + item.subTotal.toFixed(2);

                        subTotal += item.subTotal;

                        subTotalValue.innerHTML = "R" + subTotal.toFixed(2);
                        totalValue.innerHTML = "R" + (subTotal + 90).toFixed(2);

                    } else {
                        let zero = 0;
                        item.tableDataPrice.innerHTML = "R" + zero.toFixed(2);
                        subTotalValue.innerHTML = "R" + zero.toFixed(2);
                        totalValue.innerHTML = "R" + zero.toFixed(2);

                    }
                }

                // Add event listener to the quantity input
                quantityInput.addEventListener("input", () => {
                    updatedPrice();
                });

                let quantity = parseInt(quantityInput.value);
                item.quantity = quantity;
                item.subTotal = item.getPrice * quantity;

                subTotal += item.subTotal;
                total = subTotal + 90;

                // Appending to the quantity in the table
                tableDataQuantity.appendChild(quantityInput);


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

                    if (cartArray.length === 0) {
                        subTotal = 0;
                        total = 0;
                    }
                    else {
                        let quantity = parseInt(quantityInput.value);
                        item.subTotal = item.getPrice * quantity;
                        subTotal = subTotal - item.subTotal;
                        total = subTotal + 90;
                    }

                    subTotalValue.innerHTML = "R" + subTotal.toFixed(2);
                    totalValue.innerHTML = "R" + total.toFixed(2);

                    showProductCount();
                    updateCart();
                }

                // When the user clicks on the image, the row will be deleted
                bin.addEventListener('click', removeRow);

                // Appending to tableCart
                tableDataRow.appendChild(tableDataImage);
                tableDataRow.appendChild(tableDataProductName);
                tableDataRow.appendChild(tableDataQuantity);
                tableDataRow.appendChild(tableDataPrice);
                tableDataRow.appendChild(removeRowButton);
                tableCart.appendChild(tableDataRow);
            });
        }


        // Creating the Sub Total row and label
        const subTotalRow = document.createElement("tr");
        const subTotalLabel = document.createElement("td");
        subTotalLabel.classList.add("priceHeadings");
        subTotalLabel.colSpan = 1;
        subTotalLabel.textContent = "Sub-Total";

        // Creating the value 
        subTotalValue = document.createElement("td");
        subTotalValue.classList.add("tableData1");
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
        deliveryValue.classList.add("tableData1");
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
        totalValue = document.createElement("td");
        totalValue.classList.add("tableData1");
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
            cartArray = [];
            emptyShoppingCart();

            updateCart();
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
}


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

// Function to show the number of products in the shopping cart
function showProductCount() {
    const cartItemCount = document.querySelector('.cartProductCount');
    cartItemCount.textContent = `Shopping Cart (${cartArray.length})`;
    cartItemCount.classList.add("titles1");
}



//The products will be sorted automatically in alphabetical order
const sortButtonAlphabetically = document.querySelector(".alphabetically");
sortButtonAlphabetically.addEventListener('click', sortProducts);

function sortProducts() {

    const cardsAlphabetically = Array.from(document.querySelectorAll('.homeCard'));
    cardsAlphabetically.sort((a, b) => {
        const titleA = a.querySelector('h4').textContent;
        const titleB = b.querySelector('h4').textContent;
        return titleA.localeCompare(titleB);
    });

    const containerAlphabetically = document.querySelector('.allCards');
    containerAlphabetically.innerHTML = '';
    cardsAlphabetically.forEach(cardsAlphabetically => containerAlphabetically.appendChild(cardsAlphabetically));
}

//The products price will be sorted from low to high
const sortButtonlowToHigh = document.querySelector(".lowToHigh");
sortButtonlowToHigh.addEventListener('click', sortProductsLow);

function sortProductsLow() {
    const cardsLow = Array.from(document.querySelectorAll('.homeCard'));
    cardsLow.sort((a, b) => {
        const priceA = Number(a.querySelector('.card-text').getAttribute('data-price'));
        const priceB = Number(b.querySelector('.card-text').getAttribute('data-price'));
        return priceA - priceB;
    });
    const containerLow = document.querySelector('.allCards');
    containerLow.innerHTML = '';
    cardsLow.forEach(cardsLow => containerLow.appendChild(cardsLow));
}

//The products price will be sorted from high to low
const sortButtonHighToLow = document.querySelector(".highToLow");
sortButtonHighToLow.addEventListener('click', sortProductsHigh);

function sortProductsHigh() {
    const cardsHigh = Array.from(document.querySelectorAll('.homeCard'));
    cardsHigh.sort((a, b) => {
        const priceA = Number(a.querySelector('.card-text').getAttribute('data-price'));
        const priceB = Number(b.querySelector('.card-text').getAttribute('data-price'));
        return priceB - priceA;
    });
    const containerHigh = document.querySelector('.allCards');
    containerHigh.innerHTML = '';
    cardsHigh.forEach(cardsHigh => containerHigh.appendChild(cardsHigh));
}