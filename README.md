# Next.js for frontend setup

Application

# NestJS + Prisma CRUD Application

This is a simple CRUD application built with NestJS and Prisma ORM. The app provides endpoints to manage items with functionalities to create, read, update, and delete items.

##  Features
- Create, read, update, and delete items
- Prisma ORM integration
- REST API with NestJS
- CORS enabled for frontend-backend communication

##  Technologies
- **NestJS**: Backend framework
- **Prisma ORM**: Database management
- **MySQL**: Database
- **Axios**: HTTP client for frontend requests

##  Project Structure
```
├── prisma              # Prisma schema and migrations
├── src
│   ├── items          # Items module (controller, service)
│   ├── app.module.ts  # Main app module
│   ├── main.ts        # App entry point
├── .env               # Environment variables
├── package.json       # Project dependencies
└── README.md          # Project documentation
```

##  Installation
1. Clone the repository:
```bash
git clone https://github.com/your-repo.git
cd your-repo
```

2. Install dependencies:
```bash
npm install
```

3. Set up the database (MySQL) and configure Prisma:
Update the `.env` file with your database connection URL:
```
DATABASE_URL="mysql://user:password@localhost:3306/mydb"
```

4. Run Prisma migrations:
```bash
npx prisma migrate dev --name init
```

##  Running the App
1. Start the NestJS server:
```bash
npm run start
```

2. API will be accessible at:
```
http://localhost:3003
```

## API Endpoints
### Items Endpoints
- **Get all items:** `GET /items`
- **Get item by ID:** `GET /items/:id`
- **Create item:** `POST /items`
  ```json
  {
    "name": "Item Name",
    "price": 100,
    "quantity": 10
  }
  ```
- **Update item:** `PUT /items/:id`
- **Delete item:** `DELETE /items/:id`


If you get CORS errors, ensure your backend has CORS enabled:
```typescript
app.enableCors({
  origin: 'http://localhost:3000', 
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization',
});
```


