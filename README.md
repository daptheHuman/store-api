# Store-API🏪

This project is a Node.js backend that provides an API for a store.

## Project Overview📝

The Store-API project is a Node.js backend that handles user-related functionalities for a store. It allows administrators to retrieve user information, update user details, and delete users. Certain operations require authentication and authorization.

## Features✨

- Retrieve all users (admin only)
- Retrieve information for a specific user (admin only)
- Update user details (authentication and authorization required)
- Delete a user (authentication and authorization required)

## Folder Structure📂

The project follows the following folder structure:

- `controllers/`: Contains the controller files that handle the logic for each API endpoint.
- `middleware/`: Contains the middleware files that provide additional functionality for the API.
- `routes/`: Contains the route files that define the API endpoints and connect them to the appropriate controller functions.
- `index.js`: The main entry point of the application.

## Prerequisites📝

Make sure you have the following dependencies installed:

- Node.js (v18.13.0)
- Express.js
- MongoDB (or any other supported database)

## Installation📥

Follow these steps to install and configure the project:

1. Clone the repository
2. Change to the project directory:

```shell
cd store-api
```

3. Install dependencies:

```shell
npm install
```

4. Configure environment variables:

   Rename the `.env.example` file to `.env` and set the values for the following variables:

   - PRODUCTION: Set to false for development mode.
   - MONGOOSE_URL: The URL of your MongoDB database.
   - PORT: The port on which the server will listen.
   - JWT_SECRET: Secret key for JSON Web Token (JWT) authentication.
   - MIDTRANS_MERCHANT_ID: Merchant ID for Midtrans payment integration.
   - MIDTRANS_CLIENT_KEY: Client key for Midtrans payment integration.
   - MIDTRANS_SERVER_KEY: Server key for Midtrans payment integration.

## Usage⚙️

To run the server in development mode, use the following command:

```shell
npm run dev
```

This command will start the server using a development environment configuration, allowing you to make changes and automatically restart the server whenever code changes are detected.

To start the server in production mode, use the following command:

```shell
npm start
```

This command will start the server using a production environment configuration, optimized for performance and stability.

The server will be accessible at `http://localhost:5000` by default. You can modify the port in the `.env` file if needed.

## API Documentation📍

The API endpoints available in this project are:

### Auth Endpoints

- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Authenticate user credentials and generate an access token.

### Cart Endpoints

- `POST /api/cart`: Create a new cart for a user (authentication required).
- `GET /api/cart/user/:id`: Get cart information for a specific user (authentication and authorization required).
- `GET /api/cart/all`: Get information for all carts (admin only).
- `PUT /api/cart/:id`: Update a cart (authentication and authorization required).
- `DELETE /api/cart/:id`: Delete a cart (authentication and authorization required).

### Order Endpoints

- `GET /api/order/user/:id`: Get order information for a specific user (authentication and authorization required).
- `GET /api/order/`: Get information for all orders (admin only).
- `POST /api/order/`: Create a new order (authentication required).
- `PUT /api/order/:orderId`: Update order details (admin only).
- `DELETE /api/order/:orderId`: Delete an order (admin only).

### Payment Endpoints

- `POST /api/payment/create/:id/:orderId`: Create a payment for an order (authentication and authorization required).
- `GET /api/payment/status/:id/:orderId`: Get the payment status for an order (authentication and authorization required).

### Product Endpoints

- `GET /api/product/`: Get information for all products.
- `GET /api/product/:prodId`: Get information for a specific product.
- `POST /api/product/`: Create a new product (authentication and authorization required).
- `PUT /api/product/:id`: Update an existing product (authentication and authorization required).
- `DELETE /api/product/:prodId`: Delete a product (authentication and authorization required).

### User Endpoints

- `GET /api/user/`: Get information for all users (admin only).
- `GET /api/user/:id`: Get information for a specific user (admin only).
- `PUT /api/user/:id`: Update user details (authentication and authorization required).
- `DELETE /api/user/:id`: Delete a user (authentication and authorization required).

## Contributing🤝

Contributions to this project are welcome. To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Commit your changes.
5. Push your changes to the forked repository.
6. Create a pull request.

Please ensure your code follows the project's coding style and conventions.

## License📃

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

For more information, please refer to the [LICENSE](LICENSE) file.
