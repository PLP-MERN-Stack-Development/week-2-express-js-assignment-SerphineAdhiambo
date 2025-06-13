const express = require('express');
const app = express();
const PORT = 3000;

// Import middlewares
const logger = require('./middleware/logger');
const authenticate = require('./middleware/auth');
const validateProduct = require('./middleware/validateProduct');

// In-memory products array
let products = [
  {
    id: 1,
    name: 'Laptop',
    description: 'A powerful machine',
    price: 1200,
    category: 'Electronics',
    inStock: true
  }
];

// Global middlewares
app.use(logger);
app.use(express.json());

// Routes
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

app.post('/api/products', authenticate, validateProduct, (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  const newProduct = {
    id: products.length ? products[products.length - 1].id + 1 : 1,
    name,
    description,
    price,
    category,
    inStock
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.put('/api/products/:id', authenticate, validateProduct, (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ message: 'Product not found' });

  const updatedProduct = { ...products[index], ...req.body };
  products[index] = updatedProduct;
  res.json(updatedProduct);
});

app.delete('/api/products/:id', authenticate, (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ message: 'Product not found' });

  const deleted = products.splice(index, 1);
  res.json({ message: 'Product deleted', product: deleted[0] });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
