# Microservice CRUD Application with Docker

This project is a full-stack CRUD microservice application built using:
- Frontend: React + Vite + AdminLTE
- Backend: Node.js + Express
- Database: MySQL (via Docker or XAMPP)
- Containerization: Docker & Docker Compose

---

## 📁 Project Structure

```
micro-service/
├── crud_backend/        # Node.js backend API
├── db/                  # MySQL init script
├── frontend/            # React frontend app
└── docker-compose.yml   # Compose file for services
```

---

## ✅ Prerequisites

- Docker & Docker Compose installed
- MySQL client (for testing DB connections)
- Node.js (for local dev runs)
- XAMPP or Dockerized MySQL (depending on your setup)

---

## 🔧 Backend Setup

### Run backend manually (for testing without containers):
```bash
cd crud_backend/server
npm install
node index.js
```

Backend will be served at: `http://localhost:5000`

---

## 🎨 Frontend Setup

### Run frontend manually:
```bash
cd frontend
npm install
npm run dev
```

By default, frontend connects to the backend at `http://localhost:5000` via `.env`:
```
VITE_API_URL=http://localhost:5000
```

---

## 🐬 Database

Using MySQL either from XAMPP or container.

For Dockerized MySQL, add this to `docker-compose.yml`:

```yaml
services:
  mysql:
    image: mysql:5.7
    ports:
      - "3307:3306"
    volumes:
      - /mnt/db_data:/var/lib/mysql
      - ./db/init.sql:/docker-entrypoint-initdb.d/init.sql
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: crud
      MYSQL_USER: nodeuser
      MYSQL_PASSWORD: MySecurePass123!
    networks:
      - crud_app-network

networks:
  crud_app-network:

volumes:
  db_data:
```

### 🔔 Important:
If using bind mount `/mnt/db_data`, you must **create it manually**:
```bash
sudo mkdir -p /mnt/db_data
sudo chmod 777 /mnt/db_data
```

---

## 🐳 Running the Whole Stack with Docker Compose

From the root folder:
```bash
docker-compose up --build
```

This will start:
- Backend on port `5000`
- Frontend on port `3000` (if Dockerized)
- MySQL on port `3307`

Access frontend in browser: `http://localhost:3000`

---

## ✅ Troubleshooting

- `Cannot GET /`: Ensure Vite dev server or frontend container is running.
- `ERR_NAME_NOT_RESOLVED`: Make sure `.env` file points to the right backend container/hostname.
- Use `docker logs <container>` to debug each service.

---

## 💡 Notes

- Data persists via volume `/mnt/db_data`.
- MySQL init script runs only on first startup.
- Network `crud_app-network` allows inter-container communication.

---

Happy building! 🚀
