import express from 'express';
import cors from 'cors';
import mysql from 'mysql';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// MySQL database connection with retry
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dateStrings: process.env.DB_DATE_STRINGS === 'true',
    port: process.env.DB_PORT || 3306,
});

function connectWithRetry() {
    db.connect((err) => {
        if (err) {
            console.error('❌ MySQL not ready, retrying in 5s:', err.message);
            setTimeout(connectWithRetry, 5000);
        } else {
            console.log('✅ Connected to MySQL database');
        }
    });
}
connectWithRetry();

/* -------------------- BOOK ROUTES -------------------- */

// Get all books with publisher name
app.get('/books', (req, res) => {
    const sql = `
        SELECT 
            book.id, 
            book.name, 
            DATE_FORMAT(book.date, '%Y-%m-%d') as date, 
            publisher.name AS publisher,
            book.publisher_id
        FROM book 
        LEFT JOIN publisher ON book.publisher_id = publisher.id
    `;
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json({ error: "Failed to fetch books" });
        return res.json(data);
    });
});

// Get single book by ID
app.get('/books/:id', (req, res) => {
    const sql = `
        SELECT 
            book.id, 
            book.name, 
            DATE_FORMAT(book.date, '%Y-%m-%d') as date,
            publisher.name AS publisher,
            book.publisher_id
        FROM book
        JOIN publisher ON book.publisher_id = publisher.id
        WHERE book.id = ?
    `;
    db.query(sql, [req.params.id], (err, data) => {
        if (err) return res.status(500).json({ error: "Failed to fetch book" });
        if (data.length === 0) return res.status(404).json({ error: "Book not found" });
        return res.json(data[0]);
    });
});

// Create new book
app.post('/books', (req, res) => {
    const { publisher_id, name, date } = req.body;
    db.query('SELECT id FROM publisher WHERE id = ?', [publisher_id], (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        if (results.length === 0) return res.status(400).json({ error: "Publisher does not exist" });

        const sql = "INSERT INTO book (publisher_id, name, date) VALUES (?, ?, ?)";
        db.query(sql, [publisher_id, name, date], (err, result) => {
            if (err) return res.status(500).json({ error: "Failed to create book" });
            return res.status(201).json({
                message: "Book created",
                id: result.insertId,
                book: { id: result.insertId, publisher_id, name, date }
            });
        });
    });
});

// Update book
app.put('/books/:id', (req, res) => {
    const { publisher_id, name, date } = req.body;
    db.query('SELECT id FROM publisher WHERE id = ?', [publisher_id], (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        if (results.length === 0) return res.status(400).json({ error: "Publisher does not exist" });

        const sql = "UPDATE book SET publisher_id = ?, name = ?, date = ? WHERE id = ?";
        db.query(sql, [publisher_id, name, date, req.params.id], (err, result) => {
            if (err) return res.status(500).json({ error: "Failed to update book" });
            if (result.affectedRows === 0) return res.status(404).json({ error: "Book not found" });
            return res.json({
                message: "Book updated",
                book: { id: req.params.id, publisher_id, name, date }
            });
        });
    });
});

// Delete book
app.delete('/books/:id', (req, res) => {
    const sql = "DELETE FROM book WHERE id = ?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: "Failed to delete book" });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Book not found" });
        return res.json({ message: "Book deleted" });
    });
});

/* -------------------- PUBLISHER ROUTES -------------------- */

// Get all publishers
app.get('/publishers', (req, res) => {
    const sql = "SELECT * FROM publisher";
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json({ error: "Failed to fetch publishers" });
        return res.json(data);
    });
});

// Create publisher
app.post('/publishers', (req, res) => {
    const { name, address, contact } = req.body;
    const sql = "INSERT INTO publisher (name, address, contact) VALUES (?, ?, ?)";
    db.query(sql, [name, address, contact], (err, result) => {
        if (err) return res.status(500).json({ error: "Failed to create publisher" });
        return res.status(201).json({
            message: "Publisher created",
            id: result.insertId,
            publisher: { id: result.insertId, name, address, contact }
        });
    });
});

// Delete publisher
app.delete('/publishers/:id', (req, res) => {
    db.query('SELECT id FROM book WHERE publisher_id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        if (results.length > 0) return res.status(400).json({
            error: "Cannot delete publisher - books are associated with it"
        });

        const sql = "DELETE FROM publisher WHERE id = ?";
        db.query(sql, [req.params.id], (err, result) => {
            if (err) return res.status(500).json({ error: "Failed to delete publisher" });
            if (result.affectedRows === 0) return res.status(404).json({ error: "Publisher not found" });
            return res.json({ message: "Publisher deleted" });
        });
    });
});

/* -------------------- SERVER -------------------- */

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
