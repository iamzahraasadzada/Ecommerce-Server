Here’s a README file for your server folder:

---

# Salinka BE (Backend)

## Description

Salinka BE is a backend service built with Node.js and Express. It provides a RESTful API to manage products in a MySQL database.

## Prerequisites

- Node.js
- MySQL

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the server directory:

   ```bash
   cd server
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root of the server directory with the following environment variables:
   ```env
   DB_HOST=your-database-host
   DB_PORT=your-database-port
   DB_USER=your-database-user
   DB_PASSWORD=your-database-password
   DB_NAME=your-database-name
   ```

## Scripts

- `npm start` - Starts the server using `nodemon`.

## API Endpoints

### Products

- **GET** `/products`  
  Retrieves a list of all products.

- **GET** `/products/:id`  
  Retrieves a product by its ID.

- **POST** `/products`  
  Creates a new product. Expects JSON payload with `name`, `brand`, `price`, and `img` fields.

  Example request body:

  ```json
  {
    "name": "Product Name",
    "brand": "Product Brand",
    "price": 123.45,
    "img": "image-url"
  }
  ```

- **DELETE** `/products`  
  Deletes a product by its ID. Expects a JSON payload with the `id` field.

  Example request body:

  ```json
  {
    "id": 1
  }
  ```

## Configuration

- The server listens on port `4000`.
- CORS is configured to allow requests from `http://localhost:5173` and `http://localhost:5174`.

## Error Handling

- Returns `500` status code for internal server errors.
- Returns `404` status code if the product is not found.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---

Feel free to adjust any details as needed!
