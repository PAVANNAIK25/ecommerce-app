
export default class ProductModel {
    constructor(name, desc, imageUrl, categories, price, sizes) {
        this.name = name;
        this.desc = desc;
        this.imageUrl = imageUrl;
        this.categories = categories;
        this.price = parseFloat(price);
        this.sizes = sizes;
    }

}

    // static getAll() {
    //     return products;
    // }

    // static get(id) {
    //     const product = products.find((product) => {
    //         return (product.id == id)
    //     });

    //     return product;
    // }

    // static addProduct(product) {
    //     product.id = products.length + 1;
    //     products.push(product);
    //     return product;
    // }

    // static filter(minPrice, maxPrice, category) {
    //     const result = products.filter((product) => {
    //         return (
    //             (!minPrice || product.price >= minPrice) && (!maxPrice || product.price <= maxPrice) && (!category || category == product.category));
    //     });

    //     return result;

    // }

    // static rateProduct(userID, productID, rating) {
    //     const user = UserModel.getUser(userID);
    //     if (!user) {
    //         return "User not found";
    //     }

    //     const product = this.get(productID);

    //     if (!product) {
    //         return "Product not found";
    //     }

    //     if (!product.rating) {
    //         product.ratings = [];
    //         product.ratings.push({
    //             userID : userID,
    //             rating : rating
    //         });
    //     } else {
    //         const existingIndex = product.ratings.findIndex((r) => r.userID == userID);
    //         if (existingIndex < 0) {
    //             product.ratings[existingIndex] = {
    //                 userID: userID,
    //                 rating: rating
    //             };
    //         } else {
    //             product.ratings.push({
    //                 userID : userID,
    //                 rating : rating
    //             });
    //         }
    //     }
    // }

// export let products = [{
//     "id": 1,
//     "name": "Product 1",
//     "desc": "Description for Product 1",
//     "imageUrl": 'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
//     "category": "category1",
//     "price": 19.99,
// }, {
//     "id": 2,
//     "name": "Product 2",
//     "desc": "Description for Product 2",
//     "imageUrl": 'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
//     "category": "category2",
//     "price": 25.99,
//     "sizes": ["m", "xl", "l"]
// }, {
//     "id": 3,
//     "name": "Product 3",
//     "desc": "Description for Product 3",
//     "imageUrl": 'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
//     "category": "category2",
//     "price": 39.99,
//     "sizes": ["s", "m", "xl", "l"],
// },


// ]