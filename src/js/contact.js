//Submit Button
let submitButton = document.getElementById("submitButton");

//Contact Form Validation
function createUser(event) {
    event.preventDefault();

    let firstname1 = document.getElementById("firstname").value;
    let lastname1 = document.getElementById("lastname").value;
    let calldate = document.getElementById("calldate").value;
    let calltime = document.getElementById("calltime").value;
    let email1 = document.getElementById("email").value;

    //Validations for when the form is empty and completed
    if (firstname1 !== "" && lastname1 !== "" && calldate !== "" && calltime !== "" && email1 !== "") {
        alert("Thank you for completing the Contact Form!");

        // Clear the form inputs after submit
        document.getElementById("firstname").value = '';
        document.getElementById("lastname").value = '';
        document.getElementById("calldate").value = '';
        document.getElementById("calltime").value = '';
        document.getElementById("email").value = '';
    }
    else if (firstname1 !== "") {
        if (lastname1 == "") {
            alert("Kindly enter your Last Name!");
        } else if (calldate == "") {
            alert("Kindly enter a date we can call you!");
        } else if (calltime == "") {
            alert("Kindly enter a suitable time we can call you!");
        } else if (email1 == "") {
            alert("Kindly enter your email address");
        }
    }
    else {
        alert("Please complete your Contact Form ");
    }
}
submitButton.addEventListener("click", createUser);


import {Products} from './product.js';
import data from './products.json' assert { type: 'json' };
console.log(data);


// Empty Product Array
let productsArray = [];

// Loop through the products in the JSON data
for (let i = 0; i < data.products.length; i++) {
    // Create an Product object and push it into the productsArray
    let product = new Products(data.products[i].productName, data.products[i].firstDescription, data.products[i].secondDescription, data.products[i].image, data.products[i].price, data.products[i].category)
    productsArray.push(product);
}
console.log(productsArray);


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
let tableDataPrice;

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

            // Add event listener to the quantity input
            quantityInput.addEventListener("input", updatedPrice);

            function updatedPrice() {
                let quantity = parseInt(quantityInput.value);
                item.subTotal = item.getPrice * quantity;
                subTotal = 0;
                cartArray.forEach((item) => {
                    subTotal += item.subTotal;
                });
                subTotalValue.innerHTML = "R" + subTotal.toFixed(2);
                totalValue.innerHTML = "R" + (subTotal + 90).toFixed(2);
                tableDataPrice.innerHTML = "R" + item.subTotal.toFixed(2);
                updateCart();
            }

            let quantity = parseInt(quantityInput.value);

            item.subTotal = item.getPrice * quantity;
            subTotal += item.subTotal;

            total = subTotal + 90;

            // Appending to the quantity in the table
            tableDataQuantity.appendChild(quantityInput);

            // Creating the product price that will show in the table
            tableDataPrice = document.createElement("td");
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
                // Add event listener to the quantity input

                quantityInput.addEventListener("input", updatedPrice);

                function updatedPrice() {
                    let quantity = parseInt(quantityInput.value);
                    item.subTotal = item.getPrice * quantity;
                    subTotal = 0;
                    cartArray.forEach((item) => {
                        subTotal += item.subTotal;
                    });
                    subTotalValue.innerHTML = "R" + subTotal.toFixed(2);
                    totalValue.innerHTML = "R" + (subTotal + 90).toFixed(2);
                    tableDataPrice.innerHTML = "R" + item.subTotal.toFixed(2);
                    updateCart();
                }

                let quantity = parseInt(quantityInput.value);

                item.subTotal = item.getPrice * quantity;
                subTotal += item.subTotal;

                total = subTotal + 90;


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
