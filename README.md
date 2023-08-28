# MERN E-COMMERCE

Parts

1. create de list product(data.js)
2. create the routes
3. node js server
   3.1 run npm init in root folder
   3.2 update package json set type:module
   3.3 add .js to imports
   3.4 npm install express
   3.5 create server .js
   3.6 add start command as node backend/server.js
   3.7 require express
   3.8 create rout for/return backend is ready
   3.9 move producst.js from fornted to backend
   3.10 create rout for /api/products
   3.11 return products
   3.12 run npm start
4. fetch products from backend axius  
   4.1 set proxy in package.json
   4.2 npm install axios
   4.3 use state hook
   4.4 use effect hook
   4.5 use reducer hook
5. Manage State by reducer hook
   5.1. define reducer
   5.2. update fetch data
   5.3. get state from usReducer
6. add boostrap to the project
7. create product and rating component
   7.1 create rating component
   7.2 create product component
   7.3 use rating in product component
8. Create product details screen
   8.1 fetch product from backend
   8.2 create 3 coluns for image,info and action
9. create loading and message component
   9.1 create loading component
   9.2 use spinner component
   9.3 create message component
   9.4 create utils.js to define getError function
10. Implement Add to Cart
    10.1 Create react context
    10.2 define reducer
    10.3 create store provider
    10.4 implement add to cart button click handler
11. complete Add to cart
    11.1 check exist item in the cart
    11.2 cjeck count in stock backend
12. Create Cart screen
    12.1 create 2 columns
    12.2 display items list
    12.3 create action columns
13. Complete Cart Screen
    13.1 click handler for inc/dec item
    13.2 click handler for remove item
    13.3 click handler for checkout
