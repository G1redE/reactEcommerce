const firebaseConfig = {
    apiKey: "AIzaSyBHnmisze2XydU5xFAaZ3rtZu7bDhwmaMU",
    authDomain: "ecommerce-52136.firebaseapp.com",
    projectId: "ecommerce-52136",
    storageBucket: "ecommerce-52136.appspot.com",
    messagingSenderId: "603952838538",
    appId: "1:603952838538:web:f8a61821d047f22e5c7a73"
  };

const userJson = {
    cartTotal:0,
    userEmail:"",
    userId:"",
    cartItems:[]
}

const cartItemJson = {
    itemcategory:"",
    itemDescription:"",
    itemId:"",
    itemPrice:0,
    itemRating:0,
    itemImage:"",
    itemTitle:"",
    itemCount:1,
};

const userCollection="users";

const itemCategories = ["electronics", "jewelery"];

const logoUrl =
  "https://cdn-icons-png.flaticon.com/512/1591/1591111.png";

export {firebaseConfig,userJson,cartItemJson,userCollection,itemCategories,logoUrl}