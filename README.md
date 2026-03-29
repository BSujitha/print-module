# Print Module 

Simple print‑orders web app built with React + Spring Boot + MySQL.

## Features

- Upload PDF  
- Auto page count using `pdfjs-dist`  
- Print options: **B/W** and **Color**  
- Copies input  
- Auto price calculation:
  - B/W: ₹2 per page  
  - Color: ₹5 per page  
- Save orders to backend  
- View and delete orders from the list  

## Tech Stack

- Frontend: **React (Vite)**   
- Backend: **Spring Boot** + Spring Data JPA  
- Database: **MySQL** (`printdb`)  

## Expected API Endpoints

- `GET    /api/orders` → list all orders  
- `POST   /api/orders` → save a new order  
- `DELETE /api/orders/{id}` → delete an order by ID  

## How to Run

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

### Backend (Spring Boot)

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

The backend runs on `http://localhost:8080` and exposes the `/api/orders` endpoints.

## Notes

- Vite proxies `/api` to `http://localhost:8080` (see `vite.config.js`).  
- Orders are persisted in the MySQL database (`printdb`).
