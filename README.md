# node-rest-shop
Node RESTful API development with MongoDB cloud ATLAS server.

### Tech Stack
* Node JS
* MongoDB Cloud ATLAS

### API Routes
#### Here I have main three routes and they also have sub routes

| users | products | orders |
-----------------------------

#### users route /users
| Route Type | Route Name | Description |
| ---------- | ---------- | ----------- |
| POST | /signup | Register User into the database |
| POST | /login | Login User to Authenticate all the operations |
| DELETE | /:userId | Delete User from database |

#### products route /products
| Route Type | Route Name | Description |
| ---------- | ---------- | ----------- |
| GET | /products | Get all the products from database |
| POST | /products | Store a new product into the database |
| GET | /:productId | Get particular product by productId from database |
| PATCH | /:productId | Update particular product by productId in database |
| DELETE | /:productId | Delete particular product by productId in database |

#### orders route /orders
| Route Type | Route Name | Description |
| ---------- | ---------- | ----------- |
| GET | /orders | Get all the orders from database |
| POST | /orders | Store a new order into the database |
| GET | /:orderId | Get particular order by orderId from database |
| DELETE | /:orderId | Delete particular order by orderId in database |
