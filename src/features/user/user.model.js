

export default class UserModel{
    constructor(name, email, password, type){
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;
    }

    // static async signUp(name, email, password, type){
    //     try {
    //         const newUser = new UserModel(name, email, password, type);
    //         const db = getDb();
    //         const collection = db.collection('users');
    //         await collection.insertOne(newUser);
    //         return newUser;
            
    //     } catch (error) {
    //         throw new Error(error.message);
    //     }
    // }

    // static signIn(email, password){
    //     const user = users.find((u) => u.email==email && u.password==password);
    //     return user;
    // }

    static getAll(){
        return users;
    }

    static getUser(userID){
        const user = users.find((u)=> u.id == userID);
        return user;
    }
}

// const users = [{
//     "id":"1",
//     "name":"Seller Admin",
//     "email": "selleradmin@ecom.com",
//     "password": "Password1",
//     "type":"seller"
// },{
//     "id":"2",
//     "name":"Customer",
//     "email": "customer@ecom.com",
//     "password": "Password1",
//     "type":"customer"
// }];