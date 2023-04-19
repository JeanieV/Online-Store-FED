fetch('/src/js/products.json')
  .then(response => response.json())
  .then(data => {
    const products = {
    "products" : [
        {
            "productName": "Small Succulent",
            "price": 25,
            "category": "Succulents"
        },
        {
            "productName": "Mini Succulent Garden",
            "price": 250,
            "category": "Succulents"
        },
        {
            "productName": "Succulent in Ceramic Pot",
            "price": 100,
            "category": "Succulents"
        },
        {
            "productName": "Seagrass Succulents",
            "price": 50,
            "category": "Succulents"
        },
        {
            "productName": "Tin Sinkbad with Succulent Mix",
            "price": 150,
            "category": "Succulents"
        },
        {
            "productName": "Gasteria in Bowl",
            "price": 170,
            "category": "Succulents"
        },
        {
            "productName": "Mini Glass Succulents",
            "price": 90,
            "category": "Succulents"
        },
        {
            "productName": "Firesticks, Pumila & Spekboom Succulents",
            "price": 90,
            "category": "Succulents"
        },
        {
            "productName": "Woodbox Succulents",
            "price": 200,
            "category": "Succulents"
        },
        {
            "productName": "Circle Handle Potted Succulent",
            "price": 230,
            "category": "Succulents"
        },
        {
            "productName": "Large Sedum Pachyphyllum",
            "price": 180,
            "category": "Succulents"
        },
        {
            "productName": "Nephrolepis Exaltata Blonde",
            "price": 130,
            "category": "Ferns"
        },
        {
            "productName": "Asparagus Plumosus",
            "price": 90,
            "category": "Ferns"
        },
        {
            "productName": "Florex Platycerium Staghorn Fern",
            "price": 110,
            "category": "Ferns"
        },
        {
            "productName": "Dicksonia Antarctica Fern",
            "price": 200,
            "category": "Ferns"
        },
        {
            "productName": "Tuberflora Cyathea Australis Fern",
            "price": 300,
            "category": "Ferns"
        },
        {
            "productName": "Large Kangaroo Fern",
            "price": 380,
            "category": "Ferns"
        },
        {
            "productName": "Staghorn Fern",
            "price": 300,
            "category": "Ferns"
        },
        {
            "productName": "Maiden Hair Fern",
            "price": 490,
            "category": "Ferns"
        },
        {
            "productName": "Houseplant Care Gift Set",
            "price": 650,
            "category": "Plant Care"
        },
        {
            "productName": "1-For-All Multipurpose Fertiliser 25kg",
            "price": 730,
            "category": "Plant Care"
        },
        {
            "productName": "Plant Care - 500 ml",
            "price": 300,
            "category": "Plant Care"
        },
        {
            "productName": "Garden Master 60 dm3 Potting Soil",
            "price": 125,
            "category": "Plant Care"
        },
        {
            "productName": "Gardening Gloves",
            "price": 150,
            "category": "Plant Care"
        },
        {
            "productName": "Dynaroot",
            "price": 70,
            "category": "Plant Care"
        },
        {
            "productName": "City Gardening Balcony Box",
            "price": 850,
            "category": "Plant Care"
        }
    ]
}
  
    
})
console.log(data.products);

// class Products {
//     constructor(productName,price){
//         this._name = productName;
//         this._price = price;
//     }
    
//     get getproductName(){
//         return this._name;
//     }
//     get getPrice(){
//         return this._price;
//     }
// }


// let succulentArray = [];
