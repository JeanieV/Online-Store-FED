import succulentsData from './succulents.json' assert { type: 'json' };

class Succulents {
    constructor(productName,price){
        this._name = productName;
        this._price = price;
    }
    
    get getproductName(){
        return this._name;
    }
    get getPrice(){
        return this._price;
    }
}


let succulentArray = [];











// 'Read more' button
// const readMoreButton1 = document.getElementById('readMore1');
// const closeButton = document.getElementsByClassName('closebtn');
// const popup = document.getElementById('popup');

// function myFunction() {

//     let succulent1R =

//         `
//     <div class="backgroundpopup">
//             <img class="succulent1" src="/src/images/succulent1.webp" alt="Succulent Collection"
//             attribution="https://www.google.com/url?q=https://www.earthandjungle.com/product/tSFF111y/succulent-one-random-potted-plant-bulk-r%3Futm_source%3Dgoogle%26utm_medium%3Dorganic%26utm_content%3Dcatalog&sa=U&ved=0ahUKEwiHnrWcqan-AhXwQkEAHToyDzcQwSsISw&usg=AOvVaw1AFFOR2JhBJkUVVLeWubgU">
//             <button class="closebtn"> Close Button </button>
//             </div>
//     `
    
//     document.getElementById('popup').innerHTML += succulent1R;
    
// }

// readMoreButton1.addEventListener('click', myFunction);

// closeButton.addEventListener('click', () => {
//     popup.remove('backgroundpopup');
// })