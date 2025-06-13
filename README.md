[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19699090&assignment_repo_type=AssignmentRepo)

# 🚀 Express.js Products API

A RESTful API built with Express.js that manages products, featuring authentication, logging, validation, search, filtering, and custom error handling.

---

## 📦 Features

- Full CRUD operations for `products`
- Middleware: logger, API key auth, validation
- Error handling with custom error classes
- Query filtering, search, and pagination
- Statistics route by category

---

## 🛠️ Setup Instructions

### 1. Clone and install dependencies

```bash
git clone <your-repo-url>
cd express-api
npm install
```

### 2. Create a `.env` file

```env
API_KEY=your-secret-api-key
```

Refer to `.env.example`.

### 3. Start the server

```bash
node server.js
```

Server runs at: `http://localhost:3000`

---

## 🔐 Authentication

Some routes (POST, PUT, DELETE) require an API key sent in the request header:

```http
x-api-key: your-secret-api-key
```

---

## 📘 API Endpoints & Documentation

### ✅ GET `/api/products`

Returns all products with optional filtering and pagination.

**Query Params**:
- `category` — filter by category
- `page` — pagination page number
- `limit` — items per page (default: 5)

📤 **Example Request**:
```http
GET /api/products?category=Books&page=1&limit=2
```

📥 **Example Response**:
```json
{
  "page": 1,
  "limit": 2,
  "total": 5,
  "data": [
    {
      "id": 1,
      "name": "Clean Code",
      "description": "Software craftsmanship book",
      "price": 35,
      "category": "Books",
      "inStock": true
    }
  ]
}
```

---

### ✅ GET `/api/products/:id`

Get a specific product by ID.

📤 **Request**:
```http
GET /api/products/1
```

📥 **Response**:
```json
{
  "id": 1,
  "name": "Clean Code",
  "description": "Software craftsmanship book",
  "price": 35,
  "category": "Books",
  "inStock": true
}
```

---

### ✅ POST `/api/products`  
**(Requires API Key)**

Create a new product.

📤 **Request Body**:
```json
{
  "name": "Dell XPS",
  "description": "High-performance laptop",
  "price": 1500,
  "category": "Electronics",
  "inStock": true
}
```

📥 **Response**:
```json
{
  "id": 2,
  "name": "Dell XPS",
  "description": "High-performance laptop",
  "price": 1500,
  "category": "Electronics",
  "inStock": true
}
```

---

### ✅ PUT `/api/products/:id`  
**(Requires API Key)**

Update an existing product.

📤 **Request**:
```http
PUT /api/products/2
```

```json
{
  "price": 1450,
  "inStock": false
}
```

📥 **Response**:
```json
{
  "id": 2,
  "name": "Dell XPS",
  "description": "High-performance laptop",
  "price": 1450,
  "category": "Electronics",
  "inStock": false
}
```

---

### ✅ DELETE `/api/products/:id`  
**(Requires API Key)**

Delete a product by ID.

📤 **Request**:
```http
DELETE /api/products/2
```

📥 **Response**:
```json
{
  "message": "Deleted successfully",
  "product": {
    "id": 2,
    "name": "Dell XPS",
    "description": "High-performance laptop",
    "price": 1450,
    "category": "Electronics",
    "inStock": false
  }
}
```

---

### ✅ GET `/api/products/search?name=`

Search for products by name.

📤 **Request**:
```http
GET /api/products/search?name=code
```

📥 **Response**:
```json
[
  {
    "id": 1,
    "name": "Clean Code",
    "description": "Software craftsmanship book",
    "price": 35,
    "category": "Books",
    "inStock": true
  }
]
```

---

### ✅ GET `/api/products/stats`

Returns a count of products grouped by category.

📥 **Response**:
```json
{
  "Books": 2,
  "Electronics": 1
}
```

---

## 🧪 Sample Test Using curl

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-secret-api-key" \
  -d '{
    "name": "Node.js Guide",
    "description": "Book for backend development",
    "price": 25,
    "category": "Books",
    "inStock": true
  }'
```

---

## 📝 Author

Serphne Adhiambo   
Built with ❤️ using Node.js and Express.js
4. Include examples of requests and responses
