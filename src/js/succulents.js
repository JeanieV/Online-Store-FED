// 'Read more' button
const readMoreButton1 = document.getElementById('readMore1');
const closeButton = document.getElementById('closeButton');


// Function to add a Popup for the details of the product
function readMore(event) {
    event.preventDefault();
    let succulent1R = `
    <div class="popup1">
        <img src="/src/images/succulent1.webp">
        <button class="btn succulentCard" id="closeButton"> Close
        </button>
    </div>
`;
    document.getElementById("popup").innerHTML += succulent1R;
}
readMoreButton1.addEventListener('click', readMore);

// Function to close the popup
function closeButtonReadMore() {
    
}
closeButton.addEventListener('click', closeButtonReadMore);


