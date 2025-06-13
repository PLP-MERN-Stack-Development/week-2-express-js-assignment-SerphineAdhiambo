const express = require('express');
const router = express.Router();

const authenticate = require('../middleware/auth');
const validateProduct = require('../middleware/validateProduct');
const asyncHandler = require('../utils/asyncHandler');

const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');

let products = []; // In-memory store

// GET all products (with filtering + pagination)
router.get('/', (req, res) => {
  const { category, page = 1, limit = 5 } = req.query;
  let filtered = [...products];

  if (category) {
    filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  const start = (page - 1) * limit;
  const end = start + parseInt(limit);
  res.json({
    page: +page,
    limit: +limit,
    total: filtered.length,
    data: filtered.slice(start, end),
  });
});

// GET /search?name=
router.get('/search', (req, res) => {
  const { name } = req.query;
  if (!name) throw new ValidationError('Search term is required.');
  const results = products.filter(p =>
    p.name.toLowerCase().includes(name.toLowerCase())
  );
  res.json(results);
});

// GET /stats
router.get('/stats', (req, res) => {
  const stats = {};
  products.forEach(p => {
    stats[p.category] = (stats[p.category] || 0) + 1;
  });
  res.json(stats);
});

// GET product by ID
router.get('/:id', asyncHandler(async (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) throw new NotFoundError('Product not found');
  res.json(product);
}));

// POST create product
router.post('/', authenticate, validateProduct, (req, res) => {
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

// PUT update product
router.put('/:id', authenticate, validateProduct, (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) throw new NotFoundError('Product not found');

  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
});

// DELETE product
router.delete('/:id', authenticate, (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) throw new NotFoundError('Product not found');

  const deleted = products.splice(index, 1);
  res.json({ message: 'Deleted successfully', product: deleted[0] });
});

module.exports = router;
