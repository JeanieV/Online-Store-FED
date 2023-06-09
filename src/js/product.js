import data from './products.json' assert { type: 'json' };
console.log(data);

export class Products {
    constructor(productName, firstDescription, secondDescription, image, price, category, quantity) {
        this._productName = productName;
        this._firstDescription = firstDescription;
        this._image = image;
        this._secondDescription = secondDescription;
        this._price = price;
        this._category = category;
        this._quantity = quantity;

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
    get getQuantuty() {
        return this._quantity;
    }
}

export function filterProductsByCategory(category) {
    return data.products.filter((product) => product.category === category);
}