import products from './products.json' assert { type: 'json' };

class Products {
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
