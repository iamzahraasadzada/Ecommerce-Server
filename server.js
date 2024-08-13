const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config(); // dotenv paketini yükləyin

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.listen(4000, (err) => {
  if (err) console.log(err);
  console.log("running server on port 4000");
});

app.get("/products", (req, res) => {
  connection.query("SELECT * FROM products;", (err, data) => {
    if (err) return res.status(500);
    res.json(data);
    console.log(data);
  });
});

app.get("/products/:id", (req, res) => {
  const productId = req.params.id;
  connection.query(
    "SELECT * FROM products WHERE id = ?",
    [productId],
    (err, data) => {
      if (err) return res.status(500).json({ error: "Internal Server Error" });
      if (data.length === 0)
        return res.status(404).json({ error: "Product not found" });
      res.json(data[0]);
    }
  );
});

app.post("/products", (req, res) => {
  const { name, brand, price, img } = req.body;
  connection.query(
    `
    INSERT INTO products (name, brand, price, img)
    VALUES ('${name}', '${brand}', '${price}', '${img}')
    `,
    (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Error deleting the product" });
      }
      connection.query(`SELECT * FROM products`, (err, data) => {
        if (err) {
          console.error("Error fetching the updated products:", err);
          return res
            .status(500)
            .json({ error: "Error fetching the updated products" });
        }
        res.json(data);
      });
    }
  );
});

app.delete("/products", (req, res) => {
  const { id } = req.body;

  connection.query(`DELETE FROM products WHERE id = ?`, [id], (err, result) => {
    if (err) {
      console.error("Error deleting the product:", err);
      return res.status(500).json({ error: "Error deleting the product" });
    }
    connection.query(`SELECT * FROM products`, (err, data) => {
      if (err) {
        console.error("Error fetching the updated products:", err);
        return res
          .status(500)
          .json({ error: "Error fetching the updated products" });
      }
      res.json(data);
    });
  });
});
