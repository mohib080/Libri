const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const { jsPDF } = require('jspdf');
const autoTable = require('jspdf-autotable').default;
const port = 3000;
const WebSocket = require('ws');
const http = require('http');


const server = http.createServer(app);


const wss = new WebSocket.Server({
    server,
    path: '/chat'
});


const activeConnections = new Map();


wss.on('connection', async (ws, req) => {
    console.log('New WebSocket connection');

    ws.on('message', async (data) => {
        try {
            const message = JSON.parse(data);

            switch (message.type) {
                case 'authenticate':
                    await handleAuthentication(ws, message);
                    break;
                case 'start_chat':
                    await handleStartChat(ws, message);
                    break;
                case 'send_message':
                    await handleSendMessage(ws, message);
                    break;
                case 'admin_join':
                    await handleAdminJoin(ws, message);
                    break;
                case 'end_chat':
                    await handleEndChat(ws, message);
                    break;
            }
        } catch (error) {
            console.error('WebSocket message error:', error);
            ws.send(JSON.stringify({ type: 'error', message: 'Invalid message format' }));
        }
    });

    ws.on('close', () => {
        for (const [key, value] of activeConnections.entries()) {
            if (value.ws === ws) {
                activeConnections.delete(key);
                break;
            }
        }
    });
});

async function handleAuthentication(ws, message) {
    try {
        const { token, userType } = message;

        if (userType === 'customer') {
            const decoded = jwt.verify(token, 'your_secret_key');
            const customerId = decoded.customerId;

            activeConnections.set(`customer_${customerId}`, {
                ws,
                customerId,
                userType: 'customer',
                sessionId: null
            });

            ws.send(JSON.stringify({
                type: 'authenticated',
                customerId,
                userType: 'customer'
            }));
        } else if (userType === 'admin') {
            const decoded = jwt.verify(token, 'your_secret_key');
            if (!decoded.isAdmin) {
                throw new Error('Not an admin');
            }

            activeConnections.set(`admin_${decoded.adminId || 'main'}`, {
                ws,
                adminId: decoded.adminId || 'main',
                userType: 'admin'
            });

            ws.send(JSON.stringify({
                type: 'authenticated',
                userType: 'admin'
            }));

            await sendPendingChatsToAdmin(ws);
        }
    } catch (error) {
        ws.send(JSON.stringify({ type: 'auth_error', message: 'Authentication failed' }));
    }
}

async function handleStartChat(ws, message) {
    let client;
    try {
        const connection = findConnectionByWs(ws);
        if (!connection || connection.userType !== 'customer') {
            return;
        }

        client = await pool.connect();

        const sessionResult = await client.query(`
            INSERT INTO chat_session (customer_id, started_at)
            VALUES ($1, NOW())
            RETURNING session_id
        `, [connection.customerId]);

        const sessionId = sessionResult.rows[0].session_id;
        connection.sessionId = sessionId;

        // Send session info to customer
        ws.send(JSON.stringify({
            type: 'chat_started',
            sessionId: sessionId,
            message: 'Chat session started. An admin will join you shortly.'
        }));
        notifyAdminsOfNewChat(sessionId, connection.customerId);

    } catch (error) {
        console.error('Error starting chat:', error);
        ws.send(JSON.stringify({ type: 'error', message: 'Failed to start chat' }));
    } finally {
        if (client) client.release();
    }
}
async function handleSendMessage(ws, message) {
    let client;
    try {
        const connection = findConnectionByWs(ws);
        if (!connection) return;

        const { sessionId, messageText } = message;

        client = await pool.connect();


        const senderType = connection.userType === 'admin' ? 'admin' : 'customer';
        await client.query(`
            INSERT INTO chat_message (session_id, sender_type, message_text, sent_at)
            VALUES ($1, $2, $3, NOW())
        `, [sessionId, senderType, messageText]);


        broadcastToSession(sessionId, {
            type: 'new_message',
            sessionId,
            senderType,
            messageText,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error sending message:', error);
        ws.send(JSON.stringify({ type: 'error', message: 'Failed to send message' }));
    } finally {
        if (client) client.release();
    }
}


async function handleAdminJoin(ws, message) {
    try {
        const connection = findConnectionByWs(ws);
        if (!connection || connection.userType !== 'admin') {
            return;
        }

        const { sessionId } = message;
        connection.sessionId = sessionId;

        // Notify customer that admin joined
        const customerConnection = findCustomerBySession(sessionId);
        if (customerConnection) {
            customerConnection.ws.send(JSON.stringify({
                type: 'admin_joined',
                message: 'An admin has joined the chat'
            }));
        }


        await sendChatHistory(ws, sessionId);

    } catch (error) {
        console.error('Error admin joining chat:', error);
        ws.send(JSON.stringify({ type: 'error', message: 'Failed to join chat' }));
    }
}


async function handleEndChat(ws, message) {
    let client;
    try {
        const connection = findConnectionByWs(ws);
        if (!connection) return;

        const { sessionId } = message;

        client = await pool.connect();


        await client.query(`
            UPDATE chat_session 
            SET ended_at = NOW() 
            WHERE session_id = $1
        `, [sessionId]);


        broadcastToSession(sessionId, {
            type: 'chat_ended',
            message: 'Chat session has ended'
        });

        for (const [key, conn] of activeConnections.entries()) {
            if (conn.sessionId === sessionId) {
                conn.sessionId = null;
            }
        }

    } catch (error) {
        console.error('Error ending chat:', error);
    } finally {
        if (client) client.release();
    }
}


function findConnectionByWs(ws) {
    for (const connection of activeConnections.values()) {
        if (connection.ws === ws) {
            return connection;
        }
    }
    return null;
}

function findCustomerBySession(sessionId) {
    for (const connection of activeConnections.values()) {
        if (connection.sessionId === sessionId && connection.userType === 'customer') {
            return connection;
        }
    }
    return null;
}

function broadcastToSession(sessionId, message) {
    for (const connection of activeConnections.values()) {
        if (connection.sessionId === sessionId) {
            connection.ws.send(JSON.stringify(message));
        }
    }
}

function notifyAdminsOfNewChat(sessionId, customerId) {
    for (const connection of activeConnections.values()) {
        if (connection.userType === 'admin') {
            connection.ws.send(JSON.stringify({
                type: 'new_chat_request',
                sessionId,
                customerId,
                message: `New chat request from customer ${customerId}`
            }));
        }
    }
}

async function sendChatHistory(ws, sessionId) {
    let client;
    try {
        client = await pool.connect();
        const result = await client.query(`
            SELECT sender_type, message_text, sent_at
            FROM chat_message
            WHERE session_id = $1
            ORDER BY sent_at ASC
        `, [sessionId]);

        ws.send(JSON.stringify({
            type: 'chat_history',
            sessionId,
            messages: result.rows
        }));
    } catch (error) {
        console.error('Error sending chat history:', error);
    } finally {
        if (client) client.release();
    }
}

async function sendPendingChatsToAdmin(ws) {
    let client;
    try {
        client = await pool.connect();
        const result = await client.query(`
            SELECT cs.session_id, cs.customer_id, cs.started_at, c.name as customer_name
            FROM chat_session cs
            JOIN customer c ON cs.customer_id = c.customer_id
            WHERE cs.ended_at IS NULL
            ORDER BY cs.started_at DESC
        `);

        ws.send(JSON.stringify({
            type: 'pending_chats',
            chats: result.rows
        }));
    } catch (error) {
        console.error('Error sending pending chats:', error);
    } finally {
        if (client) client.release();
    }
}


server.listen(port, () => {
    console.log(`Server running on port ${port} with WebSocket support`);
});


app.use(express.static(path.join(__dirname, '../frontend/html')));
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.static(path.join(__dirname, '../frontend/css')));
app.use(express.static(path.join(__dirname, '../frontend/js')));



app.use(cors());
app.use(bodyParser.json());

const dbConfig = require('../Connection/config.js');
const pool = new Pool(dbConfig);

pool.on('connect', () => {
    console.log('Connected to database');
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

const getBookDetailsBaseQuery = `
    SELECT
        b.book_id,
        b.title,
        STRING_AGG(DISTINCT a.name, ', ') AS author,
        b.description,
        b.image_url,
        b.price,
        b.isbn,
        b.publisher,
        b.publication_date,
        b.language,
        COALESCE(AVG(r.rating), 0)::numeric(3, 2) AS average_rating,
        COUNT(r.review_id) AS review_count,
        bc.category_id,
        bc.category_name,
        sc.sub_category_id,
        sc.sub_category_name
    FROM
        book b
    LEFT JOIN
        book_author ba ON b.book_id = ba.book_id
    LEFT JOIN
        author a ON ba.author_id = a.author_id
    LEFT JOIN
        review r ON b.book_id = r.book_id
    LEFT JOIN
        book_sub_category bsc ON b.book_id = bsc.book_id
    LEFT JOIN
        sub_category sc ON bsc.sub_category_id = sc.sub_category_id
    LEFT JOIN
        book_category bc ON sc.category_id = bc.category_id
`;


app.get('/api/books', async (req, res) => {
    let client;
    try {
        client = await pool.connect();
        const { categoryId, subCategoryId } = req.query;

        let query = getBookDetailsBaseQuery;
        const queryParams = [];
        let paramIndex = 1;
        const whereClauses = [];

        if (categoryId) {
            whereClauses.push(`bc.category_id = $${paramIndex++}`);
            queryParams.push(parseInt(categoryId, 10));
        }

        if (subCategoryId) {
            whereClauses.push(`sc.sub_category_id = $${paramIndex++}`);
            queryParams.push(parseInt(subCategoryId, 10));
        }

        if (whereClauses.length > 0) {
            query += ' WHERE ' + whereClauses.join(' AND ');
        }

        query += `
            GROUP BY b.book_id, bc.category_id, bc.category_name,
                     sc.sub_category_id, sc.sub_category_name
            ORDER BY b.average_rating DESC, b.title ASC
            LIMIT 10
        `;

        const result = await client.query(query, queryParams);
        res.json(result.rows);
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).send('Error fetching data from PostgreSQL DB');
    } finally {
        if (client) client.release();
    }
});

app.get('/api/books/search', async (req, res) => {
    const { q: searchTerm, categoryId, subCategoryId } = req.query;

    if (!searchTerm && !categoryId && !subCategoryId) {
        return res.status(200).json([]);
    }

    let client;
    try {
        client = await pool.connect();
        let query = getBookDetailsBaseQuery;
        const queryParams = [];
        let paramIndex = 1;
        const whereClauses = [];

        if (searchTerm) {
            whereClauses.push(`(b.title ILIKE $${paramIndex} OR a.name ILIKE $${paramIndex})`);
            queryParams.push(`%${searchTerm}%`);
            paramIndex++;
        }

        if (categoryId) {
            whereClauses.push(`bc.category_id = $${paramIndex++}`);
            queryParams.push(parseInt(categoryId, 10));
        }

        if (subCategoryId) {
            whereClauses.push(`sc.sub_category_id = $${paramIndex++}`);
            queryParams.push(parseInt(subCategoryId, 10));
        }

        if (whereClauses.length > 0) {
            query += ' WHERE ' + whereClauses.join(' AND ');
        }

        query += `
            GROUP BY b.book_id, bc.category_id, bc.category_name,
                     sc.sub_category_id, sc.sub_category_name
            ORDER BY b.title ASC
        `;

        const result = await client.query(query, queryParams);
        res.json(result.rows);
    } catch (err) {
        console.error('Search error:', err);
        res.status(500).send('Error searching books');
    } finally {
        if (client) client.release();
    }
});

app.get('/api/books/by-name', async (req, res) => {
    const bookTitle = req.query.title;

    if (!bookTitle) {
        return res.status(400).json({ error: 'Book title is required' });
    }

    let client;
    try {
        client = await pool.connect();
        const result = await client.query(`
            ${getBookDetailsBaseQuery}
            WHERE b.title ILIKE $1
            GROUP BY b.book_id, bc.category_id, bc.category_name,
                     sc.sub_category_id, sc.sub_category_name
            LIMIT 1;
        `, [bookTitle]);

        if (result.rows.length > 0) {
            const bookDetails = result.rows[0];
            const bookId = bookDetails.book_id;

            const stockResult = await client.query(`
                SELECT f.format_name, SUM(i.quantity_in_stock) AS stock
                FROM inventory i
                JOIN format f ON i.format_id = f.format_id
                WHERE i.book_id = $1
                GROUP BY f.format_name
            `, [bookId]);

            bookDetails.stock_by_format = stockResult.rows;

            res.json(bookDetails);
        } else {
            res.status(404).json({ error: 'Book not found with that title' });
        }
    } catch (err) {
        console.error('Error fetching single book by title:', err);
        res.status(500).send('Error retrieving book details by title');
    } finally {
        if (client) client.release();
    }
});

app.get('/api/books/:id', async (req, res) => {
    const bookId = parseInt(req.params.id, 10);

    if (isNaN(bookId)) {
        return res.status(400).json({ error: 'Invalid book ID' });
    }

    let client;
    try {
        client = await pool.connect();

        const result = await client.query(`
            ${getBookDetailsBaseQuery}
            WHERE b.book_id = $1
            GROUP BY b.book_id, bc.category_id, bc.category_name,
                     sc.sub_category_id, sc.sub_category_name
        `, [bookId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Book not found' });
        }

        const bookDetails = result.rows[0];

        const stockResult = await client.query(`
            SELECT f.format_name, SUM(i.quantity_in_stock) AS stock
            FROM inventory i
            JOIN format f ON i.format_id = f.format_id
            WHERE i.book_id = $1
            GROUP BY f.format_name
        `, [bookId]);

        bookDetails.stock_by_format = stockResult.rows;

        res.json(bookDetails);

    } catch (err) {
        console.error('Error fetching book details by ID:', err);
        res.status(500).send('Error retrieving book details by ID');
    } finally {
        if (client) client.release();
    }
});

app.get('/api/categories', async (req, res) => {
    let client;
    try {
        client = await pool.connect();
        const result = await client.query(`SELECT category_id, category_name FROM book_category ORDER BY category_name`);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching categories:', err);
        res.status(500).send('Error fetching categories');
    } finally {
        if (client) {
            client.release();
        }
    }
});

app.get('/api/subcategories', async (req, res) => {
    let client;
    try {
        client = await pool.connect();
        const { categoryId } = req.query;
        let query = `SELECT sub_category_id, category_id, sub_category_name FROM sub_category`;
        const queryParams = [];
        if (categoryId) {
            query += ` WHERE category_id = $1`;
            queryParams.push(parseInt(categoryId, 10));
        }
        query += ` ORDER BY sub_category_name`;
        const result = await client.query(query, queryParams);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching subcategories:', err);
        res.status(500).send('Error fetching subcategories');
    } finally {
        if (client) {
            client.release();
        }
    }
});
app.get('/api/books/:bookId/reviews', async (req, res) => {
    const bookId = parseInt(req.params.bookId, 10);

    if (isNaN(bookId)) {
        return res.status(400).json({ error: 'Invalid book ID for reviews' });
    }

    let client;
    try {
        client = await pool.connect();
        const result = await client.query(`
            SELECT
                r.review_id,
                r.book_id,
                r.customer_id,
                c.name AS customer_name,
                r.rating,
                r.comment,
                r.review_date
            FROM
                review r
            LEFT JOIN
                customer c ON r.customer_id = c.customer_id
            WHERE
                r.book_id = $1
            ORDER BY
                r.review_date DESC;
        `, [bookId]);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching book reviews:', err);
        res.status(500).send('Error fetching book reviews');
    } finally {
        if (client) {
            client.release();
        }
    }
});

app.post('/signup', async (req, res) => {
    const { name, email, password, phone_number, address } = req.body;


    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    try {

        const emailCheck = await pool.query('SELECT 1 FROM customer WHERE email = $1', [email]);
        if (emailCheck.rows.length > 0) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const nameCheck = await pool.query('SELECT 1 FROM customer WHERE name = $1', [name]);
        if (nameCheck.rows.length > 0) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert new customer
        const newCustomer = await pool.query(
            `INSERT INTO customer (name, email, hashed_password, phone_number, address, created_at, updated_at, role, is_verified)
             VALUES ($1, $2, $3, $4, $5, NOW(), NOW(), 'customer', false)
             RETURNING *`,
            [name, email, hashedPassword, phone_number || null, address || null]
        );


        const token = jwt.sign(
            {
                customerId: newCustomer.rows[0].customer_id,
                email: newCustomer.rows[0].email,
                role: newCustomer.rows[0].role
            },
            'your_secret_key',
            { expiresIn: '24h' }
        );

        // Send response
        res.status(201).json({
            token,
            customer: {
                customer_id: newCustomer.rows[0].customer_id,
                name: newCustomer.rows[0].name,
                email: newCustomer.rows[0].email,
                role: newCustomer.rows[0].role
            }
        });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ error: 'Registration failed' });
    }
});


app.post('/signin', async (req, res) => {
    const { email, name, password } = req.body;
    try {
        const customerResult = await pool.query(
            'SELECT * FROM customer WHERE email = $1 OR name = $2',
            [email, name]
        );

        if (customerResult.rows.length == 0) {
            return res.status(401).json({ error: 'Invalid Email or Username' });
        }

        const customer = customerResult.rows[0];

        const validPassword = await bcrypt.compare(password, customer.hashed_password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Wrong Password' });
        }

        await pool.query(
            'UPDATE customer SET last_login_at = NOW() WHERE customer_id = $1',
            [customer.customer_id]
        );

        // Generate JWT token
        const token = jwt.sign(
            {
                customerId: customer.customer_id,
                email: customer.email,
                role: customer.role
            },
            'your_secret_key',
            { expiresIn: '24h' }
        );

        res.json({
            token,
            customer: {
                customer_id: customer.customer_id,
                name: customer.name,
                email: customer.email,
                role: customer.role
            }
        });
    } catch (err) {
        console.error('Signin error:', err);
        res.status(500).json({ error: 'Login failed' });
    }
});

// JWT AUTH MIDDLEWARE
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, 'your_secret_key', (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user;
        next();
    });

}

const isSeller = (req, res, next) => {
    // Check if user has supplierId (indicating they're a seller)
    if (!req.user || !req.user.supplierId) {
        return res.status(403).json({ error: 'Access denied. Seller privileges required.' });
    }
    next();
};


const isAdmin = (req, res, next) => {
    // Assumes authenticateToken has attached user info to req.user
    if (req.user && req.user.isAdmin) {
        next(); // User is an admin, proceed to the next middleware/route handler
    } else {
        res.status(403).json({ error: 'Forbidden: Access is restricted to administrators.' });
    }
};

// PROFILE API (secured) 
app.get('/api/profile', authenticateToken, async (req, res) => {
    try {
        const customerResult = await pool.query(
            'SELECT customer_id, name, email, phone_number, address, role, created_at, last_login_at, is_verified FROM customer WHERE customer_id = $1',
            [req.user.customerId]
        );

        if (customerResult.rows.length === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        res.json({ customer: customerResult.rows[0] });
    } catch (err) {
        console.error('Profile error:', err);
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});

app.put('/api/profile', authenticateToken, async (req, res) => {
    const { name, email, phone_number, address } = req.body;
    try {
        const updated = await pool.query(`
            UPDATE customer
            SET name = $1, email = $2, phone_number = $3, address = $4, updated_at = NOW()
            WHERE customer_id = $5
            RETURNING customer_id, name, email, role
        `, [name, email, phone_number || null, address || null, req.user.customerId]);

        const updatedCustomer = updated.rows[0];

        const newToken = jwt.sign({
            customerId: updatedCustomer.customer_id,
            email: updatedCustomer.email,
            role: updatedCustomer.role
        }, 'your_secret_key', { expiresIn: '24h' });

        res.json({ message: 'Profile updated successfully.', token: newToken });
    } catch (err) {
        console.error('Error updating profile:', err);
        res.status(500).json({ error: 'Failed to update profile.' });
    }
});


app.post('/api/change-password', authenticateToken, async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        return res.status(400).json({ error: 'Both passwords are required.' });
    }
    try {
        const result = await pool.query('SELECT hashed_password FROM customer WHERE customer_id = $1', [req.user.customerId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found.' });
        }
        const valid = await bcrypt.compare(oldPassword, result.rows[0].hashed_password);
        if (!valid) return res.status(401).json({ error: 'Old password is incorrect.' });

        const hashedNew = await bcrypt.hash(newPassword, 10);
        await pool.query('UPDATE customer SET hashed_password = $1, updated_at = NOW() WHERE customer_id = $2', [hashedNew, req.user.customerId]);
        res.json({ message: 'Password updated successfully.' });
    } catch (err) {
        console.error('Change password error:', err);
        res.status(500).json({ error: 'Failed to change password.' });
    }
});

app.get('/api/cart', authenticateToken, async (req, res) => {
    const customerId = req.user.customerId;
    let client;
    try {
        client = await pool.connect();

        let cartResult = await client.query('SELECT cart_id FROM cart WHERE customer_id = $1', [customerId]);
        let cartId;

        if (cartResult.rows.length === 0) {
            const newCart = await client.query('INSERT INTO cart (customer_id, created_at, updated_at) VALUES ($1, NOW(), NOW()) RETURNING cart_id', [customerId]);
            cartId = newCart.rows[0].cart_id;
        } else {
            cartId = cartResult.rows[0].cart_id;
        }

        // query to handle multiple authors and ensure format_id consistency
        const cartItemsResult = await client.query(`
            SELECT
                crt.cart_item_id,
                crt.book_id,
                b.title,
                b.image_url,
                b.price,
                crt.quantity,
                COALESCE(crt.format_id, 2) as format_id, -- Default to 2 (hardcover) if null
                COALESCE(f.format_name, 'Hardcover') as format_name,
                COALESCE(f.factor, 1.0) as factor,
                STRING_AGG(DISTINCT au.name, ', ') AS author,
                (b.price * crt.quantity * COALESCE(f.factor, 1.0)) AS total_item_price
            FROM
                cart_item crt
            JOIN
                book b ON crt.book_id = b.book_id
            LEFT JOIN
                book_author ba ON b.book_id = ba.book_id
            LEFT JOIN
                author au ON au.author_id = ba.author_id
            LEFT JOIN
                format f ON COALESCE(crt.format_id, 2) = f.format_id
            WHERE
                crt.cart_id = $1
            GROUP BY 
                crt.cart_item_id, crt.book_id, b.title, b.image_url, b.price, 
                crt.quantity, crt.format_id, f.format_name, f.factor
            ORDER BY
                crt.cart_item_id;
        `, [cartId]);

        const totalAmount = cartItemsResult.rows.reduce((sum, item) => sum + parseFloat(item.total_item_price), 0);

        res.json({
            cart_id: cartId,
            customer_id: customerId,
            items: cartItemsResult.rows,
            total_amount: totalAmount.toFixed(2)
        });

    } catch (err) {
        console.error('Error fetching cart:', err);
        res.status(500).json({ error: 'Failed to retrieve cart' });
    } finally {
        if (client) client.release();
    }
});



//cart adding route
app.post('/api/cart/add', authenticateToken, async (req, res) => {
    const customerId = req.user.customerId;
    const { bookId, quantity } = req.body;
    const formatId = 2;

    if (!bookId || !quantity || quantity <= 0) {
        return res.status(400).json({ error: 'Book ID and a positive quantity are required.' });
    }

    let client;
    try {
        client = await pool.connect();
        await client.query('BEGIN');

        let cartResult = await client.query('SELECT cart_id FROM cart WHERE customer_id = $1 FOR UPDATE', [customerId]);
        let cartId;

        if (cartResult.rows.length === 0) {
            const newCart = await client.query('INSERT INTO cart (customer_id, created_at, updated_at) VALUES ($1, NOW(), NOW()) RETURNING cart_id', [customerId]);
            cartId = newCart.rows[0].cart_id;
        } else {
            cartId = cartResult.rows[0].cart_id;
        }

        // 2. Check if book exists in inventory and is active
        const bookCheck = await client.query('SELECT price, is_active FROM book WHERE book_id = $1', [bookId]);
        if (bookCheck.rows.length === 0 || !bookCheck.rows[0].is_active) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: 'Book not found or is not available.' });
        }
        const cartItemResult = await client.query('SELECT * FROM cart_item WHERE cart_id = $1 AND book_id = $2 FOR UPDATE', [cartId, bookId]);

        if (cartItemResult.rows.length > 0) {
            await client.query('ROLLBACK');
            return res.status(409).json({ message: 'Book already in the cart.' });
        }
        else {
            await client.query('INSERT INTO cart_item (cart_id, book_id, quantity, format_id) VALUES ($1, $2, $3, $4)', [cartId, bookId, quantity, formatId]);
            res.status(201).json({ message: 'Book added to cart successfully.' });
        }
        await client.query('UPDATE cart SET updated_at = NOW() WHERE cart_id = $1', [cartId]);

        await client.query('COMMIT');

    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Error adding item to cart:', err);
        res.status(500).json({ error: 'Failed to add item to cart.' });
    } finally {
        if (client) client.release();
    }
});

// Update cart item format
app.put('/api/cart/update-format', authenticateToken, async (req, res) => {
    const { bookId, formatId } = req.body;
    const customerId = req.user.customerId || req.user.userId;

    if (!bookId || !formatId) {
        return res.status(400).json({ error: 'Book ID and format ID are required' });
    }

    let client;
    try {
        client = await pool.connect();

        const result = await client.query(
            `UPDATE cart_item
   SET format_id = $1
   FROM cart
   WHERE cart_item.cart_id = cart.cart_id
     AND cart.customer_id = $2
     AND cart_item.book_id = $3
   RETURNING cart_item.*`,
            [formatId, customerId, bookId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Cart item not found' });
        }

        res.json({
            message: 'Cart item format updated successfully',
            cartItem: result.rows[0]
        });

    } catch (err) {
        console.error('Error updating cart item format:', err);
        res.status(500).json({ error: 'Failed to update cart item format' });
    } finally {
        if (client) client.release();
    }
});


app.put('/api/cart/update', authenticateToken, async (req, res) => {
    const customerId = req.user.customerId;
    const { bookId, quantity } = req.body;

    if (!bookId || quantity === undefined || quantity < 0) {
        return res.status(400).json({ error: 'Book ID and quantity are required.' });
    }

    let client;
    try {
        client = await pool.connect();
        await client.query('BEGIN');

        const cartResult = await client.query('SELECT cart_id FROM cart WHERE customer_id = $1', [customerId]);
        if (cartResult.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: 'Cart not found for this customer.' });
        }
        const cartId = cartResult.rows[0].cart_id;

        if (quantity === 0) {
            await client.query('DELETE FROM cart_item WHERE cart_id = $1 AND book_id = $2', [cartId, bookId]);
            res.json({ message: 'Book removed from cart.' });
        } else {
            const updateResult = await client.query(
                'UPDATE cart_item SET quantity = $1 WHERE cart_id = $2 AND book_id = $3 RETURNING *',
                [quantity, cartId, bookId]
            );

            if (updateResult.rows.length === 0) {
                await client.query('ROLLBACK');
                return res.status(404).json({ error: 'Book not found in cart.' });
            }
            res.json({ message: 'Cart item quantity updated successfully.' });
        }

        await client.query('UPDATE cart SET updated_at = NOW() WHERE cart_id = $1', [cartId]);

        await client.query('COMMIT');

    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Error updating cart item quantity:', err);
        res.status(500).json({ error: 'Failed to update cart item quantity.' });
    } finally {
        if (client) client.release();
    }
});


app.delete('/api/cart/remove/:bookId', authenticateToken, async (req, res) => {
    const customerId = req.user.customerId;
    const bookId = parseInt(req.params.bookId, 10);

    if (isNaN(bookId)) {
        return res.status(400).json({ error: 'Invalid book ID.' });
    }

    let client;
    try {
        client = await pool.connect();
        await client.query('BEGIN');
        const cartResult = await client.query('SELECT cart_id FROM cart WHERE customer_id = $1', [customerId]);
        if (cartResult.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: 'Cart not found for this customer.' });
        }
        const cartId = cartResult.rows[0].cart_id;

        const deleteResult = await client.query(
            'DELETE FROM cart_item WHERE cart_id = $1 AND book_id = $2 RETURNING *',
            [cartId, bookId]
        );

        if (deleteResult.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: 'Book not found in cart.' });
        }
        await client.query('UPDATE cart SET updated_at = NOW() WHERE cart_id = $1', [cartId]);

        await client.query('COMMIT');
        res.json({ message: 'Book removed from cart successfully.' });

    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Error removing item from cart:', err);
        res.status(500).json({ error: 'Failed to remove item from cart.' });
    } finally {
        if (client) client.release();
    }
});

app.get('/api/wishlist', authenticateToken, async (req, res) => {
    const customerId = req.user.customerId;
    let client;
    try {
        client = await pool.connect();
        let wishlistResult = await client.query('SELECT wishlist_id FROM wishlist WHERE customer_id = $1', [customerId]);
        let wishlistId;

        if (wishlistResult.rows.length === 0) {
            const newWishlist = await client.query('INSERT INTO wishlist (customer_id, created_at) VALUES ($1, NOW()) RETURNING wishlist_id', [customerId]);
            wishlistId = newWishlist.rows[0].wishlist_id;
        } else {
            wishlistId = wishlistResult.rows[0].wishlist_id;
        }

        const wishlistItemDetailsQuery = `
    SELECT
        wish.wishlist_item_id,
        wish.book_id,
        b.title,
        b.image_url,
        b.price,
        STRING_AGG(DISTINCT a.name, ', ') AS author
    FROM
        wishlist_item wish
    JOIN
        book b ON wish.book_id = b.book_id
    LEFT JOIN
        book_author ba ON b.book_id = ba.book_id
    LEFT JOIN
        author a ON ba.author_id = a.author_id
    WHERE
        wish.wishlist_id = $1
    GROUP BY
        wish.wishlist_item_id, wish.book_id, b.title, b.image_url, b.price
    ORDER BY
        wish.wishlist_item_id;
`;

        const wishlistItemsResult = await client.query(wishlistItemDetailsQuery, [wishlistId]);

        res.json({
            wishlist_id: wishlistId,
            customer_id: customerId,
            items: wishlistItemsResult.rows
        });

    } catch (err) {
        console.error('Error fetching wishlist:', err);
        res.status(500).json({ error: 'Failed to retrieve wishlist' });
    } finally {
        if (client) client.release();
    }
});

app.post('/api/wishlist/add', authenticateToken, async (req, res) => {
    const customerId = req.user.customerId;
    const { bookId } = req.body;

    if (!bookId) {
        return res.status(400).json({ error: 'Book ID is required.' });
    }
    let client;
    try {
        client = await pool.connect();
        await client.query('BEGIN');

        let wishlistResult = await client.query('SELECT wishlist_id FROM wishlist WHERE customer_id = $1 FOR UPDATE', [customerId]);
        let wishlistId;

        if (wishlistResult.rows.length === 0) {
            const newWishlist = await client.query('INSERT INTO wishlist (customer_id, name, created_at) VALUES ($1, $2, NOW()) RETURNING wishlist_id', [customerId, `Wishlist for Customer ${customerId}`]); // Added 'name'
            wishlistId = newWishlist.rows[0].wishlist_id;
        } else {
            wishlistId = wishlistResult.rows[0].wishlist_id;
        }

        const bookCheck = await client.query('SELECT book_id, is_active FROM book WHERE book_id = $1', [bookId]);
        if (bookCheck.rows.length === 0 || !bookCheck.rows[0].is_active) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: 'Book not found or is not available.' });
        }
        const wishlistItemResult = await client.query('SELECT * FROM wishlist_item WHERE wishlist_id = $1 AND book_id = $2 FOR UPDATE', [wishlistId, bookId]);

        if (wishlistItemResult.rows.length > 0) {
            await client.query('ROLLBACK');
            return res.status(409).json({ message: 'Book is already in your wishlist.' });
        } else {
            await client.query('INSERT INTO wishlist_item (wishlist_id, book_id, created_at) VALUES ($1, $2, NOW())', [wishlistId, bookId]);
            res.status(201).json({ message: 'Book added to wishlist successfully.' });
        }
        await client.query('COMMIT');

    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Error adding item to wishlist:', err);
        res.status(500).json({ error: 'Failed to add item to wishlist.' });
    } finally {
        if (client) client.release();
    }
});

app.delete('/api/wishlist/remove/:bookId', authenticateToken, async (req, res) => {
    const customerId = req.user.customerId;
    const bookId = parseInt(req.params.bookId, 10);

    if (isNaN(bookId)) {
        return res.status(400).json({ error: 'Invalid book ID.' });
    }

    let client;
    try {
        client = await pool.connect();
        await client.query('BEGIN');

        const wishlistResult = await client.query('SELECT wishlist_id FROM wishlist WHERE customer_id = $1', [customerId]);
        if (wishlistResult.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: 'Wishlist not found for this customer.' });
        }
        const wishlistId = wishlistResult.rows[0].wishlist_id;

        const deleteResult = await client.query(
            'DELETE FROM wishlist_item WHERE wishlist_id = $1 AND book_id = $2 RETURNING *',
            [wishlistId, bookId]
        );

        if (deleteResult.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: 'Book not found in wishlist.' });
        }

        await client.query('COMMIT');
        res.json({ message: 'Book removed from wishlist successfully.' });

    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Error removing item from wishlist:', err);
        res.status(500).json({ error: 'Failed to remove item from wishlist.' });
    } finally {
        if (client) client.release();
    }
});

app.delete('/api/wishlist/clear', authenticateToken, async (req, res) => {
    const customerId = req.user.customerId;
    let client;
    try {
        client = await pool.connect();
        await client.query('BEGIN');

        const wishlistResult = await client.query('SELECT wishlist_id FROM wishlist WHERE customer_id = $1', [customerId]);
        if (wishlistResult.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: 'Wishlist not found for this customer.' });
        }
        const wishlistId = wishlistResult.rows[0].wishlist_id;

        await client.query('DELETE FROM wishlist_item WHERE wishlist_id = $1', [wishlistId]);

        await client.query('COMMIT');
        res.json({ message: 'Wishlist cleared successfully.' });

    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Error clearing wishlist:', err);
        res.status(500).json({ error: 'Failed to clear wishlist.' });
    } finally {
        if (client) client.release();
    }
});

app.post('/api/wishlist/move-to-cart', authenticateToken, async (req, res) => {
    const customerId = req.user.customerId;
    const { bookId } = req.body;

    if (!bookId) {
        return res.status(400).json({ error: 'Book ID is required.' });
    }

    let client;
    try {
        client = await pool.connect();
        await client.query('BEGIN');

        const wishlistResult = await client.query('SELECT wishlist_id FROM wishlist WHERE customer_id = $1', [customerId]);
        if (wishlistResult.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: 'Wishlist not found.' });
        }
        const wishlistId = wishlistResult.rows[0].wishlist_id;

        const deleteResult = await client.query('DELETE FROM wishlist_item WHERE wishlist_id = $1 AND book_id = $2 RETURNING *', [wishlistId, bookId]);
        if (deleteResult.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: 'Book not found in wishlist.' });
        }

        let cartResult = await client.query('SELECT cart_id FROM cart WHERE customer_id = $1 FOR UPDATE', [customerId]);
        let cartId;
        if (cartResult.rows.length === 0) {
            const newCart = await client.query('INSERT INTO cart (customer_id) VALUES ($1) RETURNING cart_id', [customerId]);
            cartId = newCart.rows[0].cart_id;
        } else {
            cartId = cartResult.rows[0].cart_id;
        }

        const cartItemResult = await client.query('SELECT * FROM cart_item WHERE cart_id = $1 AND book_id = $2 FOR UPDATE', [cartId, bookId]);
        if (cartItemResult.rows.length > 0) {
            // If item exists in cart, increment quantity
            const newQuantity = cartItemResult.rows[0].quantity + 1;
            await client.query('UPDATE cart_item SET quantity = $1 WHERE cart_id = $2 AND book_id = $3', [newQuantity, cartId, bookId]);
        } else {
            // If item does not exist, add it with quantity 1
            await client.query('INSERT INTO cart_item (cart_id, book_id, quantity) VALUES ($1, $2, 1)', [cartId, bookId]);
        }

        await client.query('UPDATE cart SET updated_at = NOW() WHERE cart_id = $1', [cartId]);

        await client.query('COMMIT');
        res.json({ message: 'Book moved to cart successfully.' });

    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Error moving item from wishlist to cart:', err);
        res.status(500).json({ error: 'Failed to move item to cart.' });
    } finally {
        if (client) client.release();
    }
});

app.post('/api/books/:bookId/reviews', authenticateToken, async (req, res) => {
    const bookId = parseInt(req.params.bookId, 10);
    const { rating, comment } = req.body;
    const customerId = req.user.customerId; // Get customer_id from authenticated token

    if (isNaN(bookId)) {
        return res.status(400).json({ error: 'Invalid book ID.' });
    }
    if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({ error: 'Rating must be between 1 and 5.' });
    }
    if (!comment || comment.trim() === '') {
        return res.status(400).json({ error: 'Review comment cannot be empty.' });
    }

    let client;
    try {
        client = await pool.connect();
        await client.query('BEGIN');

        // Check if the book exists
        const bookExists = await client.query('SELECT 1 FROM book WHERE book_id = $1', [bookId]);
        if (bookExists.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: 'Book not found.' });
        }

        // Check if the customer has already reviewed this book
        const existingReview = await client.query(
            'SELECT review_id FROM review WHERE book_id = $1 AND customer_id = $2',
            [bookId, customerId]
        );
        if (existingReview.rows.length > 0) {
            await client.query('ROLLBACK');
            return res.status(409).json({ error: 'You have already reviewed this book.' });
        }

        // Insert the new review
        await client.query(
            `INSERT INTO review (book_id, customer_id, rating, comment, review_date)
             VALUES ($1, $2, $3, $4, NOW())`,
            [bookId, customerId, rating, comment]
        );

        // Update the book's average rating and review count
        await client.query(
            `UPDATE book
             SET
                 average_rating = (SELECT AVG(rating) FROM review WHERE book_id = $1),
                 review_count = (SELECT COUNT(review_id) FROM review WHERE book_id = $1)
             WHERE book_id = $1`,
            [bookId]
        );

        await client.query('COMMIT');
        res.status(201).json({ message: 'Review submitted successfully.' });

    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Error submitting review:', err);
        res.status(500).json({ error: 'Failed to submit review.' });
    } finally {
        if (client) {
            client.release();
        }
    }
});


app.delete('/api/books/:bookId/reviews/:reviewId', authenticateToken, async (req, res) => {
    const bookId = parseInt(req.params.bookId, 10);
    const reviewId = parseInt(req.params.reviewId, 10);
    const customerId = req.user.customerId; // Get customer_id from authenticated token

    if (isNaN(bookId) || isNaN(reviewId)) {
        return res.status(400).json({ error: 'Invalid book ID or review ID.' });
    }

    let client;
    try {
        client = await pool.connect();
        await client.query('BEGIN');

        // Verify the review exists and belongs to the authenticated customer and the specified book
        const reviewCheckResult = await client.query(
            'SELECT review_id FROM review WHERE review_id = $1 AND book_id = $2 AND customer_id = $3',
            [reviewId, bookId, customerId]
        );

        if (reviewCheckResult.rows.length === 0) {
            await client.query('ROLLBACK');

            return res.status(404).json({ error: 'Review not found or you do not have permission to delete it.' });
        }

        //Delete the review
        await client.query('DELETE FROM review WHERE review_id = $1', [reviewId]);

        // Update the book's average rating and review count
        // Recalculate average_rating and review_count after deletion
        await client.query(
            `UPDATE book
             SET
                 average_rating = COALESCE((SELECT AVG(rating) FROM review WHERE book_id = $1), 0),
                 review_count = (SELECT COUNT(review_id) FROM review WHERE book_id = $1)
             WHERE book_id = $1`,
            [bookId]
        );

        await client.query('COMMIT');
        res.json({ message: 'Review removed successfully.' });

    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Error removing review:', err);
        res.status(500).json({ error: 'Failed to remove review.' });
    } finally {
        if (client) {
            client.release();
        }
    }
});

app.post('/api/orders', authenticateToken, async (req, res) => {
    const customerId = req.user.customerId;
    const { shipping, items, paymentMethodId } = req.body; // Get items from request body
    let client;

    try {
        client = await pool.connect();
        await client.query('BEGIN');

        const itemsTotal = items.reduce((sum, item) =>
            sum + (parseFloat(item.price) * item.quantity), 0
        );
        const shippingCost = 5.00;
        const serverTotal = itemsTotal + shippingCost;

        //Create order
        const orderResult = await client.query(`
            INSERT INTO "order" (customer_id, status, order_date, total_amount, shipping_method, tracking_number)
            VALUES ($1, 'pending', NOW(), $2, 'standard', 'LIBRI' || SUBSTRING(MD5(RANDOM()::TEXT), 1, 5))
            RETURNING order_id, tracking_number
        `, [customerId, serverTotal]);

        const orderId = orderResult.rows[0].order_id;
        const trackingNumber = orderResult.rows[0].tracking_number;


        //Add order items with format
        for (const item of items) {
            await client.query(`
                INSERT INTO order_item (
                    order_id, 
                    book_id, 
                    order_date, 
                    quantity, 
                    item_price,
                    format_id
                )
                VALUES ($1, $2, NOW(), $3, $4, $5)
            `, [
                orderId,
                item.bookId,
                item.quantity,
                item.price,
                item.formatId
            ]);

            // Update inventory
            await client.query(`
                UPDATE inventory 
                SET quantity_in_stock = quantity_in_stock - $1,
                    last_update = NOW()
                WHERE book_id = $2
            `, [item.quantity, item.bookId]);
        }

        // Add shipping information
        if (shipping) {
            await client.query(`
                INSERT INTO shipping (order_id, address, city, postal_code, country, delivery_estimate)
                VALUES ($1, $2, $3, $4, $5, NOW() + INTERVAL '7 days')
            `, [orderId, shipping.address, shipping.city, shipping.postal_code, shipping.country]);
        }

        //Clear cart properly
        await client.query(`
            DELETE FROM cart_item WHERE cart_id = (SELECT cart_id FROM cart WHERE customer_id = $1)
        `, [customerId]);

        await client.query(`
            INSERT INTO payment (
                order_id, 
                payment_method_id, 
                amount,
                payment_date, 
                requested_at
            ) VALUES ($1, $2, $3, NOW(),NOW())
        `, [orderId, paymentMethodId, serverTotal]);

        await client.query('COMMIT');
        res.status(201).json({
            order_id: orderId,
            message: 'Order created successfully',
            total_amount: serverTotal.toFixed(2)
        });

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Failed to create order', details: error.message });
    } finally {
        if (client) client.release();
    }
});

app.get('/api/orders', authenticateToken, async (req, res) => {
    const customerId = req.user.customerId;
    let client;

    try {
        client = await pool.connect();

        const ordersResult = await client.query(`
            SELECT
                o.order_id,
                o.status,
                o.order_date,
                o.total_amount,
                COALESCE(o.shipping_method, 'standard') as shipping_method,
                o.tracking_number,
                s.address,
                s.city,
                s.postal_code,
                s.country,
                s.shipped_date,
                s.delivery_estimate
            FROM "order" o
            LEFT JOIN shipping s ON o.order_id = s.order_id
            WHERE o.customer_id = $1
            ORDER BY o.order_date DESC
        `, [customerId]);

        const orders = [];
        for (const order of ordersResult.rows) {
            const itemsResult = await client.query(`
                SELECT
                    oi.order_item_id,
                    oi.book_id,
                    oi.quantity,
                    oi.item_price,
                    oi.format_id,
                    f.format_name,
                    f.factor,
                    COALESCE(b.title, 'Unknown Book') as title,
                    COALESCE(b.image_url, '/images/default-book.jpg') as image_url
                FROM order_item oi
                LEFT JOIN book b ON oi.book_id = b.book_id
                LEFT JOIN format f ON oi.format_id = f.format_id
                WHERE oi.order_id = $1
`, [order.order_id]);

            orders.push({
                order_id: order.order_id,
                status: order.status,
                order_date: order.order_date,
                total_amount: order.total_amount,
                shipping_method: order.shipping_method,
                tracking_number: order.tracking_number,
                items: itemsResult.rows,
                shipping: order.address ? {
                    address: order.address,
                    city: order.city,
                    postal_code: order.postal_code,
                    country: order.country,
                    shipped_date: order.shipped_date,
                    delivery_estimate: order.delivery_estimate
                } : null
            });
        }

        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    } finally {
        if (client) client.release();
    }
});

// Cancel order
app.put('/api/orders/:orderId/cancel', authenticateToken, async (req, res) => {
    const customerId = req.user.customerId;
    const orderId = parseInt(req.params.orderId);
    const { reason, details } = req.body;
    let client;

    try {
        client = await pool.connect();
        await client.query('BEGIN');

        // Verify order belongs to customer and can be cancelled
        const orderResult = await client.query(`
            SELECT status FROM "order"
            WHERE order_id = $1 AND customer_id = $2
        `, [orderId, customerId]);

        if (orderResult.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: 'Order not found' });
        }

        const currentStatus = orderResult.rows[0].status;
        if (currentStatus !== 'pending' && currentStatus !== 'processing') {
            await client.query('ROLLBACK');
            return res.status(400).json({ error: 'Order cannot be cancelled at this stage' });
        }

        // Update order status
        await client.query(`
            UPDATE "order"
            SET status = 'cancelled'
            WHERE order_id = $1
        `, [orderId]);

        // Fetch all items in the order
        const itemsResult = await client.query(`
            SELECT book_id, quantity
            FROM order_item
            WHERE order_id = $1
        `, [orderId]);

        // Restore inventory for each item
        for (const item of itemsResult.rows) {
            await client.query(`
                UPDATE inventory
                SET quantity_in_stock = quantity_in_stock + $1,
                    last_update = NOW()
                WHERE book_id = $2
            `, [item.quantity, item.book_id]);
        }

        // Add cancellation record
        await client.query(`
            INSERT INTO order_cancellation (order_id, customer_id, cancelled_by, reason, status)
            VALUES ($1, $2, 'customer', $3, 'approved')
        `, [orderId, customerId, `${reason}${details ? ': ' + details : ''}`]);

        await client.query('COMMIT');
        res.json({ message: 'Order cancelled successfully' });

    } catch (error) {
        if (client) await client.query('ROLLBACK');
        console.error('Error cancelling order:', error);
        res.status(500).json({ error: 'Failed to cancel order' });
    } finally {
        if (client) client.release();
    }
});

app.post('/api/seller/signup', async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ error: 'Full name, email, and password are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new supplier and get their details back
        const newSupplierResult = await pool.query(
            `INSERT INTO supplier (supplier_name, email, hashed_password) 
             VALUES ($1, $2, $3) RETURNING supplier_id, supplier_name, email`,
            [fullName, email, hashedPassword]
        );

        const newSupplier = newSupplierResult.rows[0];
        // Create a JWT payload for the new seller
        const payload = {
            supplierId: newSupplier.supplier_id,
            name: newSupplier.supplier_name,
            email: newSupplier.email,
            isSeller: true // Flag to identify this token type
        };

        // Sign the token
        const token = jwt.sign(payload, 'your_secret_key', { expiresIn: '1h' });

        // Send back the token and user info
        res.status(201).json({
            message: 'Account created and logged in successfully!',
            token,
            user: {
                supplierId: newSupplier.supplier_id,
                name: newSupplier.supplier_name
            }
        });

    } catch (err) {
        console.error('Seller signup error:', err);
        if (err.code === '23505') {
            return res.status(409).json({ error: 'A supplier account with this email already exists.' });
        }
        res.status(500).json({ error: 'Failed to create seller account' });
    }
});



app.post('/api/seller/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM supplier WHERE email = $1', [email]);
        const supplier = result.rows[0];

        if (!supplier) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isValidPassword = await bcrypt.compare(password, supplier.hashed_password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Create a JWT payload specifically for sellers
        const payload = {
            supplierId: supplier.supplier_id,
            name: supplier.supplier_name,
            email: supplier.email,
            isSeller: true // Flag to identify this token type
        };

        const token = jwt.sign(payload, 'your_secret_key', { expiresIn: '1h' });

        res.json({
            message: 'Login successful',
            token,
            user: { // Send user info to the frontend
                supplierId: supplier.supplier_id,
                name: supplier.supplier_name
            }
        });

    } catch (err) {
        console.error('Seller login error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});



app.post('/api/seller/books', authenticateToken, isSeller, async (req, res) => {
    const {
        title,
        format,
        description,
        price,
        isbn,
        publisher,
        publicationDate,
        quantity,
        authorName,
        categoryName,
        subCategoryName
    } = req.body;

    const supplierId = req.user.supplierId;
    let client;

    try {
        client = await pool.connect();
        await client.query('BEGIN');

        // Initialize tracking variables
        let categoryCreated = false;
        let subcategoryCreated = false;

        //Check if author exists; if not, create one
        let authorResult = await client.query(
            'SELECT author_id FROM author WHERE name = $1',
            [authorName]
        );

        let authorId;
        if (authorResult.rows.length === 0) {
            const newAuthorResult = await client.query(
                'INSERT INTO author (name) VALUES ($1) RETURNING author_id',
                [authorName]
            );
            authorId = newAuthorResult.rows[0].author_id;
            console.log(`Created new author: ${authorName} with ID: ${authorId}`);
        } else {
            authorId = authorResult.rows[0].author_id;
            console.log(`Using existing author: ${authorName} with ID: ${authorId}`);
        }

        //Handle category - check if exists in book_category table, if not create it
        let categoryId = null;
        if (categoryName) {
            let categoryResult = await client.query(
                'SELECT category_id FROM book_category WHERE category_name ILIKE $1',
                [categoryName]
            );

            if (categoryResult.rows.length === 0) {
                const newCategoryResult = await client.query(
                    'INSERT INTO book_category (category_name) VALUES ($1) RETURNING category_id',
                    [categoryName]
                );
                categoryId = newCategoryResult.rows[0].category_id;
                categoryCreated = true;
                console.log(`Created new category: ${categoryName} with ID: ${categoryId}`);
            } else {
                categoryId = categoryResult.rows[0].category_id;
                console.log(`Using existing category: ${categoryName} with ID: ${categoryId}`);
            }
        }

        //Handle subcategory - check if exists, if not create it
        let subCategoryId = null;
        if (subCategoryName && categoryId) {
            let subCategoryResult = await client.query(
                'SELECT sub_category_id FROM sub_category WHERE sub_category_name ILIKE $1 AND category_id = $2',
                [subCategoryName, categoryId]
            );

            if (subCategoryResult.rows.length === 0) {
                const newSubCategoryResult = await client.query(
                    'INSERT INTO sub_category (sub_category_name, category_id) VALUES ($1, $2) RETURNING sub_category_id',
                    [subCategoryName, categoryId]
                );
                subCategoryId = newSubCategoryResult.rows[0].sub_category_id;
                subcategoryCreated = true;
                console.log(`Created new subcategory: ${subCategoryName} with ID: ${subCategoryId}`);
            } else {
                subCategoryId = subCategoryResult.rows[0].sub_category_id;
                console.log(`Using existing subcategory: ${subCategoryName} with ID: ${subCategoryId}`);
            }
        }

        //Insert the new book with category and subcategory
        const bookResult = await client.query(
            `INSERT INTO book (title, description, price, isbn, publisher, publication_date, category_id, sub_category_id)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING book_id`,
            [title, description, price, isbn, publisher, publicationDate, categoryId, subCategoryId]
        );

        const newBookId = bookResult.rows[0].book_id;
        console.log(`Created new book: ${title} with ID: ${newBookId}`);

        //Link book to author
        await client.query(
            'INSERT INTO book_author (book_id, author_id) VALUES ($1, $2)',
            [newBookId, authorId]
        );

        //Add to inventory
        await client.query(
            'INSERT INTO inventory (book_id, quantity_in_stock, format_id) VALUES ($1, $2, $3)',
            [newBookId, quantity, format]
        );

        //Link book to supplier
        await client.query(
            'INSERT INTO book_supply (book_id, supplier_id) VALUES ($1, $2)',
            [newBookId, supplierId]
        );

        //Link book to subcategory in junction table if subcategory exists
        if (subCategoryId) {
            await client.query(
                'INSERT INTO book_sub_category (book_id, sub_category_id) VALUES ($1, $2)',
                [newBookId, subCategoryId]
            );
        }

        await client.query('COMMIT');

        res.status(201).json({
            message: 'Book added to inventory successfully!',
            bookId: newBookId,
            details: {
                bookTitle: title,
                authorName: authorName,
                categoryName: categoryName,
                subCategoryName: subCategoryName,
                categoryCreated: categoryCreated,
                subcategoryCreated: subcategoryCreated
            }
        });

    } catch (err) {
        if (client) await client.query('ROLLBACK');
        console.error('Error adding book:', err);
        res.status(500).json({
            error: 'Failed to add book to inventory',
            details: err.message
        });
    } finally {
        if (client) client.release();
    }
});


app.post('/api/admin/login', async (req, res) => {
    const { email, secretCode } = req.body;
    if (!email || !secretCode) {
        return res.status(400).json({ error: 'Email and secret code are required.' });
    }
    let client;
    try {
        client = await pool.connect();
        const result = await client.query(
            'SELECT admin_id, email FROM admin WHERE email = $1 AND secret_code = $2',
            [email, secretCode]
        );
        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid email or secret code.' });
        }
        const payload = { adminId: result.rows[0].admin_id, email: result.rows[0].email, isAdmin: true };
        const token = jwt.sign(payload, 'your_secret_key', { expiresIn: '2h' });
        res.json({ message: 'Admin login successful', token });
    } catch (err) {
        console.error('Admin login error:', err);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        if (client) client.release();
    }
});


app.get('/api/admin/total-users', authenticateToken, isAdmin, async (req, res) => {
    try {
        const result = await pool.query('SELECT COUNT(*) AS total_users FROM customer');
        res.json({ totalUsers: parseInt(result.rows[0].total_users, 10) });
    } catch (err) {
        console.error('Count users error:', err);
        res.status(500).json({ error: 'Failed to get total users' });
    }
});

app.get('/api/admin/total-orders', authenticateToken, isAdmin, async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT COUNT(*) AS total_orders FROM "order"'
        );

        res.json({ totalOrders: parseInt(result.rows[0].total_orders, 10) });
    } catch (err) {
        console.error('Count orders error:', err);
        res.status(500).json({ error: 'Failed to get total orders' });
    }
});

app.get('/api/admin/total-books-in-stock', authenticateToken, isAdmin, async (req, res) => {
    try {
        const result = await pool.query('SELECT COALESCE(SUM(quantity_in_stock), 0) AS total FROM inventory');
        res.json({ booksInStock: parseInt(result.rows[0].total, 10) });
    } catch (err) {
        console.error('Count books in stock error:', err);
        res.status(500).json({ error: 'Failed to get books in stock' });
    }
});

app.get('/api/admin/total-sales', authenticateToken, isAdmin, async (req, res) => {
    try {
        const result = await pool.query('SELECT COALESCE(SUM(total_amount), 0) AS total_sales FROM "order" WHERE status=\'delivered\'');
        res.json({ totalSales: parseFloat(result.rows[0].total_sales) });
    } catch (err) {
        console.error('Count total sales error:', err);
        res.status(500).json({ error: 'Failed to get total sales' });
    }
});

app.get('/api/admin/orders/:orderId', authenticateToken, isAdmin, async (req, res) => {
    const orderId = parseInt(req.params.orderId, 10);
    let client;
    try {
        client = await pool.connect();
        const result = await client.query(`
            SELECT 
                o.*,
                c.name AS customer_name, 
                c.email AS customer_email,
                c.phone_number AS customer_phone,
                c.address AS customer_address
            FROM "order" o
            JOIN customer c ON o.customer_id = c.customer_id
            WHERE o.order_id = $1
        `, [orderId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Order not found" });
        }

        const order = result.rows[0];

        // Get order items with book details
        const itemsResult = await client.query(`
            SELECT 
                oi.*,
                b.title,
                b.image_url,
                f.format_name,
                STRING_AGG(DISTINCT a.name, ', ') AS authors
            FROM order_item oi
            LEFT JOIN book b ON oi.book_id = b.book_id
            LEFT JOIN format f ON oi.format_id = f.format_id
            LEFT JOIN book_author ba ON b.book_id = ba.book_id
            LEFT JOIN author a ON ba.author_id = a.author_id
            WHERE oi.order_id = $1
            GROUP BY oi.order_item_id, oi.order_id, oi.book_id, oi.order_date, 
                     oi.quantity, oi.item_price, oi.format_id, b.title, 
                     b.image_url, f.format_name
        `, [orderId]);

        order.items = itemsResult.rows;

        // Get shipping details
        const shippingResult = await client.query(
            `SELECT * FROM shipping WHERE order_id = $1`, [orderId]
        );
        order.shipping = shippingResult.rows[0] || null;

        res.json(order);
    } catch (err) {
        console.error('Admin order details error', err);
        res.status(500).json({ error: 'Failed to load order details' });
    } finally {
        if (client) client.release();
    }
});
app.put('/api/admin/orders/:orderId/status', authenticateToken, isAdmin, async (req, res) => {
    const orderId = parseInt(req.params.orderId, 10);
    const { status } = req.body;

    if (!['pending', 'processing', 'shipped', 'delivered', 'cancelled'].includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
    }

    let client;
    try {
        client = await pool.connect();
        await client.query('UPDATE "order" SET status=$1 WHERE order_id=$2', [status, orderId]);
        res.json({ message: 'Order status updated!', status });
    } catch (err) {
        console.error('Admin update status error', err);
        res.status(500).json({ error: 'Update failed.' });
    } finally {
        if (client) client.release();
    }
});


app.get('/api/admin/books', authenticateToken, isAdmin, async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
    b.book_id,
    b.title,
    STRING_AGG(DISTINCT a.name, ', ') AS authors,
    b.price,
    COALESCE(SUM(i.quantity_in_stock), 0) AS total_stock,
    bc.category_name,
    sc.sub_category_name,
    COALESCE(AVG(r.rating), 0)::numeric(3, 2) AS average_rating,
    COUNT(r.review_id) AS review_count
    FROM book b
    LEFT JOIN book_author ba ON b.book_id = ba.book_id
    LEFT JOIN author a ON ba.author_id = a.author_id
    LEFT JOIN inventory i ON b.book_id = i.book_id
    LEFT JOIN book_sub_category bsc ON b.book_id = bsc.book_id
    LEFT JOIN sub_category sc ON bsc.sub_category_id = sc.sub_category_id
    LEFT JOIN book_category bc ON sc.category_id = bc.category_id
    LEFT JOIN review r ON b.book_id = r.book_id
    GROUP BY b.book_id, b.title, b.price, bc.category_name, sc.sub_category_name
    ORDER BY b.title;
    `
        );
        res.json(result.rows);
    } catch (err) {
        console.error('Admin books load error:', err);
        res.status(500).json({ error: 'Failed to fetch admin books' });
    }
});

app.get('/api/admin/books/:id', authenticateToken, isAdmin, async (req, res) => {
    const bookId = parseInt(req.params.id, 10);
    if (isNaN(bookId)) return res.status(400).json({ error: 'Invalid book ID' });

    let client;
    try {
        client = await pool.connect();
        const bookResult = await client.query(`
            SELECT 
                b.book_id,
                b.title,
                b.description,
                b.image_url,
                b.price,
                b.isbn,
                b.publisher,
                b.publication_date,
                b.language,
                b.is_active,
                b.is_featured,
                COALESCE(AVG(r.rating), 0)::numeric(3,2) AS avg_rating,
                COUNT(r.review_id) AS review_count,
                STRING_AGG(DISTINCT a.name, ', ') AS authors,
                bc.category_name,
                sc.sub_category_name
            FROM book b
            LEFT JOIN book_author ba ON b.book_id = ba.book_id
            LEFT JOIN author a ON ba.author_id = a.author_id
            LEFT JOIN review r ON b.book_id = r.book_id
            LEFT JOIN book_sub_category bsc ON b.book_id = bsc.book_id
            LEFT JOIN sub_category sc ON bsc.sub_category_id = sc.sub_category_id
            LEFT JOIN book_category bc ON sc.category_id = bc.category_id
            WHERE b.book_id = $1
            GROUP BY b.book_id, b.title, b.description, b.image_url, b.price, b.isbn, b.publisher, b.publication_date, b.language, b.is_active, b.is_featured, bc.category_name, sc.sub_category_name
        `, [bookId]);
        if (!bookResult.rows.length) return res.status(404).json({ error: 'Book not found' });
        const bookDetails = bookResult.rows[0];

        // Reviews
        const reviewsResult = await client.query(`
            SELECT r.review_id, r.rating, r.comment, r.review_date, c.customer_id, c.name AS customer_name
            FROM review r
            LEFT JOIN customer c ON c.customer_id = r.customer_id
            WHERE r.book_id = $1
            ORDER BY r.review_date DESC
        `, [bookId]);
        bookDetails.reviews = reviewsResult.rows;

        res.json(bookDetails);
    } catch (err) {
        console.error('Admin get single book error:', err);
        res.status(500).json({ error: 'Failed to load book details' });
    } finally {
        if (client) client.release();
    }
});

app.patch('/api/admin/books/:id/flags', authenticateToken, isAdmin, async (req, res) => {
    const bookId = parseInt(req.params.id, 10);
    const { isActive, isFeatured } = req.body;

    if (isNaN(bookId)) return res.status(400).json({ error: 'Invalid book ID' });

    let updateFields = [];
    let params = [];
    let paramIdx = 1;

    if (typeof isActive === 'boolean') {
        updateFields.push(`is_active = $${paramIdx++}`);
        params.push(isActive);
    }
    if (typeof isFeatured === 'boolean') {
        updateFields.push(`is_featured = $${paramIdx++}`);
        params.push(isFeatured);
    }
    if (updateFields.length === 0) return res.status(400).json({ error: 'Nothing to update' });
    params.push(bookId);

    try {
        const result = await pool.query(
            `UPDATE book SET ${updateFields.join(', ')} WHERE book_id = $${params.length} RETURNING is_active, is_featured`,
            params
        );
        if (!result.rows.length) return res.status(404).json({ error: 'Book not found' });
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Admin update book flags error:', err);
        res.status(500).json({ error: 'Update failed.' });
    }
});

//Delete any review for a book
app.delete('/api/admin/books/:bookId/reviews/:reviewId', authenticateToken, isAdmin, async (req, res) => {
    const bookId = parseInt(req.params.bookId, 10);
    const reviewId = parseInt(req.params.reviewId, 10);
    if (isNaN(bookId) || isNaN(reviewId)) return res.status(400).json({ error: 'Invalid IDs' });

    let client;
    try {
        client = await pool.connect();
        await client.query('BEGIN');

        // Verify review exists and belongs to the right book
        const chk = await client.query('SELECT review_id FROM review WHERE review_id = $1 AND book_id = $2', [reviewId, bookId]);
        if (!chk.rows.length) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: 'Review not found.' });
        }
        await client.query('DELETE FROM review WHERE review_id = $1', [reviewId]);

        // Book triggers will update average_rating automatically

        await client.query('COMMIT');
        res.json({ message: 'Review deleted.' });
    } catch (err) {
        if (client) await client.query('ROLLBACK');
        console.error('Admin delete review error:', err);
        res.status(500).json({ error: 'Failed to delete review' });
    } finally {
        if (client) client.release();
    }
});



app.get('/api/admin/orders', authenticateToken, isAdmin, async (req, res) => {
    let client;
    try {
        client = await pool.connect();
        const result = await client.query(`
            SELECT
                o.order_id,
                o.order_date,
                o.total_amount,
                o.status,
                o.tracking_number,
                c.name AS customer_name
            FROM
                "order" o
            JOIN
                customer c ON o.customer_id = c.customer_id
            ORDER BY
                o.order_date DESC;
        `);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching admin orders:', err);
        res.status(500).json({ error: 'Failed to retrieve orders.' });
    } finally {
        if (client) {
            client.release();
        }
    }
});

// Route to get customers
app.get('/api/admin/customers', authenticateToken, isAdmin, async (req, res) => {
    let client;
    try {
        client = await pool.connect();
        const result = await client.query('SELECT customer_id, name, email FROM customer ORDER BY customer_id');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching customers:', err);
        res.status(500).json({ error: 'Failed to retrieve customers.' });
    } finally {
        if (client) client.release();
    }
});

// Route to get sellers
app.get('/api/admin/sellers', authenticateToken, isAdmin, async (req, res) => {
    let client;
    try {
        client = await pool.connect();

        const result = await client.query('SELECT supplier_id,supplier_name, email FROM supplier ORDER BY supplier_id');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching sellers:', err);
        res.status(500).json({ error: 'Failed to retrieve sellers.' });
    } finally {
        if (client) client.release();
    }
});

// Get detailed customer information
app.get('/api/admin/customers/:customerId', authenticateToken, isAdmin, async (req, res) => {
    const customerId = parseInt(req.params.customerId, 10);

    if (isNaN(customerId)) {
        return res.status(400).json({ error: 'Invalid customer ID' });
    }

    let client;
    try {
        client = await pool.connect();

        // Get customer details with order statistics
        const customerResult = await client.query(`
      SELECT 
            c.*,    
            COUNT(DISTINCT o.order_id) as total_orders,
            COALESCE(SUM(o.total_amount), 0) as total_spent,
            COUNT(DISTINCT r.review_id) as total_reviews,
            MAX(o.order_date) as last_order_date
      FROM customer c
      LEFT JOIN "order" o ON c.customer_id = o.customer_id
      LEFT JOIN review r ON c.customer_id = r.customer_id
      WHERE c.customer_id = $1
      GROUP BY c.customer_id
    `, [customerId]);

        if (customerResult.rows.length === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        const customer = customerResult.rows[0];

        // Get recent orders
        const ordersResult = await client.query(`
      SELECT order_id, order_date, total_amount, status
      FROM "order"
      WHERE customer_id = $1
      ORDER BY order_date DESC
      LIMIT 5
    `, [customerId]);

        customer.recent_orders = ordersResult.rows;

        // Get recent reviews
        const reviewsResult = await client.query(`
      SELECT r.review_id, r.rating, r.comment, r.review_date, b.title as book_title
      FROM review r
      JOIN book b ON r.book_id = b.book_id
      WHERE r.customer_id = $1
      ORDER BY r.review_date DESC
      LIMIT 5
    `, [customerId]);

        customer.recent_reviews = reviewsResult.rows;

        res.json(customer);
    } catch (err) {
        console.error('Error fetching customer details:', err);
        res.status(500).json({ error: 'Failed to fetch customer details' });
    } finally {
        if (client) client.release();
    }
});

// Get seller information
app.get('/api/admin/sellers/:sellerId', authenticateToken, isAdmin, async (req, res) => {
    const sellerId = parseInt(req.params.sellerId, 10);

    if (isNaN(sellerId)) {
        return res.status(400).json({ error: 'Invalid seller ID' });
    }

    let client;
    try {
        client = await pool.connect();

        // Get seller details with business statistics
        const sellerResult = await client.query(`
      SELECT 
        s.*,
        COUNT(DISTINCT bs.book_id) as total_books_supplied,
        COALESCE(SUM(oi.quantity * oi.item_price), 0) as total_revenue,
        COUNT(DISTINCT oi.order_id) as total_orders
      FROM supplier s
      LEFT JOIN book_supply bs ON s.supplier_id = bs.supplier_id
      LEFT JOIN order_item oi ON bs.book_id = oi.book_id
      WHERE s.supplier_id = $1
      GROUP BY s.supplier_id
    `, [sellerId]);

        if (sellerResult.rows.length === 0) {
            return res.status(404).json({ error: 'Seller not found' });
        }

        const seller = sellerResult.rows[0];

        // Get books supplied by this seller
        const booksResult = await client.query(`
      SELECT 
        b.book_id, 
        b.title, 
        b.price,
        STRING_AGG(DISTINCT a.name, ', ') as authors,
        COALESCE(SUM(i.quantity_in_stock), 0) as stock
      FROM book_supply bs
      JOIN book b ON bs.book_id = b.book_id
      LEFT JOIN book_author ba ON b.book_id = ba.book_id
      LEFT JOIN author a ON ba.author_id = a.author_id
      LEFT JOIN inventory i ON b.book_id = i.book_id
      WHERE bs.supplier_id = $1
      GROUP BY b.book_id, b.title, b.price
      ORDER BY b.title
      LIMIT 10
    `, [sellerId]);

        seller.books_supplied = booksResult.rows;

        // Get recent sales
        const salesResult = await client.query(`
      SELECT 
        o.order_id,
        o.order_date,
        b.title as book_title,
        oi.quantity,
        oi.item_price,
        (oi.quantity * oi.item_price) as total
      FROM order_item oi
      JOIN book_supply bs ON oi.book_id = bs.book_id
      JOIN book b ON oi.book_id = b.book_id
      JOIN "order" o ON oi.order_id = o.order_id
      WHERE bs.supplier_id = $1 AND o.status = 'delivered'
      ORDER BY o.order_date DESC
      LIMIT 5
    `, [sellerId]);

        seller.recent_sales = salesResult.rows;

        res.json(seller);
    } catch (err) {
        console.error('Error fetching seller details:', err);
        res.status(500).json({ error: 'Failed to fetch seller details' });
    } finally {
        if (client) client.release();
    }
});

app.get('/api/admin/live-chat-count', authenticateToken, async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ error: 'Admin access required' });
    }

    let client;
    try {
        client = await pool.connect();

        // Count active chat sessions
        const result = await client.query(`
            SELECT COUNT(*) as count
            FROM chat_session 
            WHERE ended_at IS NULL
        `);

        const liveChatCount = parseInt(result.rows[0].count) || 0;

        res.json({ liveChatCount });
    } catch (error) {
        console.error('Error fetching live chat count:', error);
        res.status(500).json({ error: 'Failed to fetch live chat count' });
    } finally {
        if (client) client.release();
    }
});


app.get('/api/seller/dashboard-stats', authenticateToken, isSeller, async (req, res) => {
    const supplierId = req.user.supplierId;
    let client;

    try {
        client = await pool.connect();

        //Get Total Sales for this seller's books
        const salesQuery = `
            SELECT COALESCE(SUM(oi.item_price * oi.quantity), 0) AS total_sales
            FROM order_item oi
            JOIN book_supply bs ON oi.book_id = bs.book_id
            WHERE bs.supplier_id = $1;
        `;
        const salesResult = await client.query(salesQuery, [supplierId]);

        // Get Total Orders containing this seller's books
        const ordersQuery = `
            SELECT COUNT(DISTINCT oi.order_id) AS total_orders
            FROM order_item oi
            JOIN book_supply bs ON oi.book_id = bs.book_id
            WHERE bs.supplier_id = $1;
        `;
        const ordersResult = await client.query(ordersQuery, [supplierId]);

        //  Get Total Books in Stock for this seller
        const stockQuery = `
            SELECT COALESCE(SUM(i.quantity_in_stock), 0) AS books_in_stock
            FROM inventory i
            JOIN book_supply bs ON i.book_id = bs.book_id
            WHERE bs.supplier_id = $1;
        `;
        const stockResult = await client.query(stockQuery, [supplierId]);

        //Get Recent Orders for this seller's books
        const recentOrdersQuery = `
            SELECT
                o.order_id,
                c.name AS customer_name,
                b.title AS book_title,
                (oi.item_price * oi.quantity) AS total,
                o.status
            FROM "order" o
            JOIN order_item oi ON o.order_id = oi.order_id
            JOIN customer c ON o.customer_id = c.customer_id
            JOIN book b ON oi.book_id = b.book_id
            JOIN book_supply bs ON b.book_id = bs.book_id
            WHERE bs.supplier_id = $1
            ORDER BY o.order_date DESC
            LIMIT 5;
        `;
        const recentOrdersResult = await client.query(recentOrdersQuery, [supplierId]);

        const lowStockQuery = `
    SELECT COUNT(DISTINCT i.book_id) AS low_stock_count
    FROM inventory i
    JOIN book_supply bs ON i.book_id = bs.book_id
    WHERE bs.supplier_id = $1 AND i.quantity_in_stock < 5;
`;

        const lowStockResult = await client.query(lowStockQuery, [supplierId]);
        const lowStockCount = parseInt(lowStockResult.rows[0].low_stock_count, 10);


        res.json({
            totalSales: parseFloat(salesResult.rows[0].total_sales),
            totalOrders: parseInt(ordersResult.rows[0].total_orders, 10),
            booksInStock: parseInt(stockResult.rows[0].books_in_stock, 10),
            lowStockAlerts: lowStockCount,
            recentOrders: recentOrdersResult.rows
        });

    } catch (err) {
        console.error('Seller dashboard stats error:', err);
        res.status(500).json({ error: 'Failed to fetch dashboard data' });
    } finally {
        if (client) client.release();
    }
});

app.get('/api/seller/profile', authenticateToken, isSeller, async (req, res) => {
    const supplierId = req.user.supplierId;
    try {
        const result = await pool.query(
            'SELECT supplier_id, supplier_name, email, phone_number, address FROM supplier WHERE supplier_id = $1',
            [supplierId]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Seller profile not found.' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching seller profile:', err);
        res.status(500).json({ error: 'Failed to retrieve profile.' });
    }
});

app.put('/api/seller/profile', authenticateToken, isSeller, async (req, res) => {
    const supplierId = req.user.supplierId;
    const { supplier_name, email, phone_number, address } = req.body;

    try {
        const result = await pool.query(
            `UPDATE supplier SET supplier_name = $1, email = $2, phone_number = $3, address = $4
             WHERE supplier_id = $5 RETURNING supplier_id, supplier_name, email`,
            [supplier_name, email, phone_number, address, supplierId]
        );
        res.json({ message: 'Profile updated successfully!', supplier: result.rows[0] });
    } catch (err) {
        console.error('Error updating seller profile:', err);
        res.status(500).json({ error: 'Failed to update profile.' });
    }
});

// UPDATE seller's password
app.post('/api/seller/change-password', authenticateToken, isSeller, async (req, res) => {
    const supplierId = req.user.supplierId;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        return res.status(400).json({ error: 'All password fields are required.' });
    }

    try {
        const result = await pool.query('SELECT hashed_password FROM supplier WHERE supplier_id = $1', [supplierId]);
        const supplier = result.rows[0];

        const isMatch = await bcrypt.compare(currentPassword, supplier.hashed_password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Incorrect current password.' });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await pool.query('UPDATE supplier SET hashed_password = $1 WHERE supplier_id = $2', [hashedNewPassword, supplierId]);

        res.json({ message: 'Password updated successfully.' });
    } catch (err) {
        console.error('Error changing seller password:', err);
        res.status(500).json({ error: 'Failed to update password.' });
    }
});


app.get('/api/admin/notifications', authenticateToken, isAdmin, async (req, res) => {
    let client;
    try {
        client = await pool.connect();
        const result = await client.query(`
            SELECT 
                notification_id,
                type,
                title,
                message,
                data,
                is_read,
                created_at
            FROM admin_notifications 
            ORDER BY created_at DESC
            LIMIT 50
        `);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching notifications:', err);
        res.status(500).json({ error: 'Failed to fetch notifications' });
    } finally {
        if (client) client.release();
    }
});

// Get unread notification count
app.get('/api/admin/notifications/count', authenticateToken, isAdmin, async (req, res) => {
    let client;
    try {
        client = await pool.connect();
        const result = await client.query(`
            SELECT COUNT(*) as unread_count 
            FROM admin_notifications 
            WHERE is_read = FALSE
        `);
        res.json({ unreadCount: parseInt(result.rows[0].unread_count, 10) });
    } catch (err) {
        console.error('Error fetching notification count:', err);
        res.status(500).json({ error: 'Failed to fetch notification count' });
    } finally {
        if (client) client.release();
    }
});

// Mark notification as read
app.put('/api/admin/notifications/:id/read', authenticateToken, isAdmin, async (req, res) => {
    const notificationId = parseInt(req.params.id, 10);
    let client;
    try {
        client = await pool.connect();
        await client.query(`
            UPDATE admin_notifications 
            SET is_read = TRUE 
            WHERE notification_id = $1
        `, [notificationId]);
        res.json({ message: 'Notification marked as read' });
    } catch (err) {
        console.error('Error marking notification as read:', err);
        res.status(500).json({ error: 'Failed to mark notification as read' });
    } finally {
        if (client) client.release();
    }
});

// Mark all notifications as read
app.put('/api/admin/notifications/read-all', authenticateToken, isAdmin, async (req, res) => {
    let client;
    try {
        client = await pool.connect();
        await client.query('UPDATE admin_notifications SET is_read = TRUE WHERE is_read = FALSE');
        res.json({ message: 'All notifications marked as read' });
    } catch (err) {
        console.error('Error marking all notifications as read:', err);
        res.status(500).json({ error: 'Failed to mark all notifications as read' });
    } finally {
        if (client) client.release();
    }
});


// Get user notifications
app.get('/api/user/notifications', authenticateToken, async (req, res) => {
    let client;
    try {
        const customerId = req.user.customerId || req.user.userId;
        client = await pool.connect();

        const result = await client.query(`
            SELECT 
                notification_id,
                type,
                title,
                message,
                order_id,
                is_read,
                created_at
            FROM user_notifications 
            WHERE customer_id = $1
            ORDER BY created_at DESC
            LIMIT 20
        `, [customerId]);

        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching user notifications:', err);
        res.status(500).json({ error: 'Failed to fetch notifications' });
    } finally {
        if (client) client.release();
    }
});

// Get unread notification count
app.get('/api/user/notifications/count', authenticateToken, async (req, res) => {
    let client;
    try {
        const customerId = req.user.customerId || req.user.userId;
        client = await pool.connect();

        const result = await client.query(`
            SELECT COUNT(*) as unread_count 
            FROM user_notifications 
            WHERE customer_id = $1 AND is_read = FALSE
        `, [customerId]);

        res.json({ unreadCount: parseInt(result.rows[0].unread_count, 10) });
    } catch (err) {
        console.error('Error fetching notification count:', err);
        res.status(500).json({ error: 'Failed to fetch notification count' });
    } finally {
        if (client) client.release();
    }
});

// Mark notification as read
app.put('/api/user/notifications/:id/read', authenticateToken, async (req, res) => {
    const notificationId = parseInt(req.params.id, 10);
    const customerId = req.user.customerId || req.user.userId;

    let client;
    try {
        client = await pool.connect();
        await client.query(`
            UPDATE user_notifications 
            SET is_read = TRUE 
            WHERE notification_id = $1 AND customer_id = $2
        `, [notificationId, customerId]);

        res.json({ message: 'Notification marked as read' });
    } catch (err) {
        console.error('Error marking notification as read:', err);
        res.status(500).json({ error: 'Failed to mark notification as read' });
    } finally {
        if (client) client.release();
    }
});


app.get('/api/seller/supplied-books', authenticateToken, isSeller, async (req, res) => {
    const supplierId = req.user.supplierId;

    let client;
    try {
        client = await pool.connect();

        const result = await client.query(`
            SELECT 
                b.book_id,
                b.title,
                STRING_AGG(DISTINCT a.name, ', ') AS authors,
                b.description,
                b.image_url,
                b.price,
                b.isbn,
                b.publisher,
                b.publication_date,
                b.language,
                COALESCE(AVG(r.rating), 0)::numeric(3, 2) AS average_rating,
                COUNT(r.review_id) AS review_count,
                bc.category_name,
                sc.sub_category_name,
                COALESCE(SUM(i.quantity_in_stock), 0) AS total_stock,
                COUNT(DISTINCT oi.order_item_id) AS total_orders,
                COALESCE(SUM(oi.quantity * oi.item_price), 0) AS total_revenue
            FROM book_supply bs
            JOIN book b ON bs.book_id = b.book_id
            LEFT JOIN book_author ba ON b.book_id = ba.book_id
            LEFT JOIN author a ON ba.author_id = a.author_id
            LEFT JOIN review r ON b.book_id = r.book_id
            LEFT JOIN book_sub_category bsc ON b.book_id = bsc.book_id
            LEFT JOIN sub_category sc ON bsc.sub_category_id = sc.sub_category_id
            LEFT JOIN book_category bc ON sc.category_id = bc.category_id
            LEFT JOIN inventory i ON b.book_id = i.book_id
            LEFT JOIN order_item oi ON b.book_id = oi.book_id
            WHERE bs.supplier_id = $1
            GROUP BY 
                b.book_id, b.title, b.description, b.image_url, b.price, 
                b.isbn, b.publisher, b.publication_date, b.language,
                bc.category_name, sc.sub_category_name
            ORDER BY b.title ASC
        `, [supplierId]);

        res.json(result.rows);

    } catch (err) {
        console.error('Error fetching supplied books:', err);
        res.status(500).json({ error: 'Failed to fetch supplied books' });
    } finally {
        if (client) client.release();
    }
});

app.get('/api/seller/delivered-books-stats', authenticateToken, isSeller, async (req, res) => {
    const supplierId = req.user.supplierId;

    let client;
    try {
        client = await pool.connect();

        const result = await client.query(`
            SELECT 
                b.book_id,
                b.title,
                STRING_AGG(DISTINCT a.name, ', ') AS authors,
                b.image_url,
                b.price,
                COUNT(oi.order_item_id) AS delivered_orders,
                SUM(oi.quantity) AS total_quantity_delivered,
                SUM(oi.quantity * oi.item_price) AS total_revenue_delivered
            FROM book_supply bs
            JOIN book b ON bs.book_id = b.book_id
            LEFT JOIN book_author ba ON b.book_id = ba.book_id
            LEFT JOIN author a ON ba.author_id = a.author_id
            JOIN order_item oi ON b.book_id = oi.book_id
            JOIN "order" o ON oi.order_id = o.order_id
            WHERE bs.supplier_id = $1 AND o.status = 'delivered'
            GROUP BY 
                b.book_id, b.title, b.image_url, b.price
            ORDER BY delivered_orders DESC, total_quantity_delivered DESC
        `, [supplierId]);

        res.json(result.rows);

    } catch (err) {
        console.error('Error fetching delivered books stats:', err);
        res.status(500).json({ error: 'Failed to fetch delivered books statistics' });
    } finally {
        if (client) client.release();
    }
});


// Get supplier notifications
app.get('/api/supplier/notifications', authenticateToken, isSeller, async (req, res) => {
    const supplierId = req.user.supplierId;
    let client;

    try {
        client = await pool.connect();
        const result = await client.query(`
            SELECT 
                notification_id,
                type,
                title,
                message,
                data,
                is_read,
                created_at
            FROM supplier_notifications 
            WHERE supplier_id = $1 
            ORDER BY created_at DESC 
            LIMIT 50
        `, [supplierId]);

        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching supplier notifications:', err);
        res.status(500).json({ error: 'Failed to fetch notifications' });
    } finally {
        if (client) client.release();
    }
});

app.get('/api/supplier/notifications/count', authenticateToken, isSeller, async (req, res) => {
    const supplierId = req.user.supplierId;
    let client;

    try {
        client = await pool.connect();
        const result = await client.query(`
            SELECT COUNT(*) as unread_count 
            FROM supplier_notifications 
            WHERE supplier_id = $1 AND is_read = FALSE
        `, [supplierId]);

        res.json({ unreadCount: parseInt(result.rows[0].unread_count, 10) });
    } catch (err) {
        console.error('Error fetching supplier notification count:', err);
        res.status(500).json({ error: 'Failed to fetch notification count' });
    } finally {
        if (client) client.release();
    }
});

// Mark supplier notification as read
app.put('/api/supplier/notifications/:id/read', authenticateToken, isSeller, async (req, res) => {
    const notificationId = parseInt(req.params.id, 10);
    const supplierId = req.user.supplierId;
    let client;

    try {
        client = await pool.connect();
        await client.query(`
            UPDATE supplier_notifications 
            SET is_read = TRUE 
            WHERE notification_id = $1 AND supplier_id = $2
        `, [notificationId, supplierId]);

        res.json({ message: 'Notification marked as read' });
    } catch (err) {
        console.error('Error marking supplier notification as read:', err);
        res.status(500).json({ error: 'Failed to mark notification as read' });
    } finally {
        if (client) client.release();
    }
});

app.put('/api/supplier/notifications/read-all', authenticateToken, isSeller, async (req, res) => {
    const supplierId = req.user.supplierId;
    let client;

    try {
        client = await pool.connect();
        await client.query(`
            UPDATE supplier_notifications 
            SET is_read = TRUE 
            WHERE supplier_id = $1 AND is_read = FALSE
        `, [supplierId]);

        res.json({ message: 'All notifications marked as read' });
    } catch (err) {
        console.error('Error marking all supplier notifications as read:', err);
        res.status(500).json({ error: 'Failed to mark all notifications as read' });
    } finally {
        if (client) client.release();
    }
});

app.get('/api/seller/low-stock-count', authenticateToken, isSeller, async (req, res) => {
    const supplierId = req.user.supplierId;
    let client;

    try {
        client = await pool.connect();

        // Query to count books with stock less than 5 for this seller
        const result = await client.query(`
            SELECT COUNT(DISTINCT i.book_id) AS low_stock_count
            FROM inventory i
            JOIN book_supply bs ON i.book_id = bs.book_id
            WHERE bs.supplier_id = $1 AND i.quantity_in_stock < 5
        `, [supplierId]);

        const lowStockCount = parseInt(result.rows[0].low_stock_count, 10);
        res.json({ lowStockCount });

    } catch (err) {
        console.error('Error fetching low stock count:', err);
        res.status(500).json({ error: 'Failed to fetch low stock count' });
    } finally {
        if (client) client.release();
    }
});

app.get('/api/seller/low-stock-books', authenticateToken, isSeller, async (req, res) => {
    const supplierId = req.user.supplierId;
    let client;

    try {
        client = await pool.connect();

        const result = await client.query(`
            SELECT 
                b.book_id,
                b.title,
                STRING_AGG(DISTINCT a.name, ', ') AS authors,
                i.quantity_in_stock,
                f.format_name
            FROM inventory i
            JOIN book_supply bs ON i.book_id = bs.book_id
            JOIN book b ON i.book_id = b.book_id
            LEFT JOIN book_author ba ON b.book_id = ba.book_id
            LEFT JOIN author a ON ba.author_id = a.author_id
            LEFT JOIN format f ON i.format_id = f.format_id
            WHERE bs.supplier_id = $1 AND i.quantity_in_stock < 5
            GROUP BY b.book_id, b.title, i.quantity_in_stock, f.format_name
            ORDER BY i.quantity_in_stock ASC
        `, [supplierId]);

        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching low stock books:', err);
        res.status(500).json({ error: 'Failed to fetch low stock books' });
    } finally {
        if (client) client.release();
    }
});


async function showLowStockDetails() {
    try {
        const response = await fetch('/api/seller/low-stock-books', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const books = await response.json();
            displayLowStockBooks(books);
        }
    } catch (error) {
        console.error('Error fetching low stock books:', error);
    }
}

function displayLowStockBooks(books) {
    // You can implement this to show a modal or section with low stock books
    console.log('Low stock books:', books);
}



app.get('/api/orders/:orderId/receipt', authenticateToken, async (req, res) => {
    const customerId = req.user.customerId;
    const orderId = parseInt(req.params.orderId, 10);

    if (isNaN(orderId)) {
        return res.status(400).json({ error: 'Invalid order ID' });
    }

    let client;
    try {
        client = await pool.connect();

        // Fetch order header
        const orderResult = await client.query(`
      SELECT 
        o.order_id, o.status, o.order_date, o.total_amount, o.shipping_method, o.tracking_number,
        c.name as customer_name, c.email as customer_email, c.phone_number as customer_phone, c.address as customer_address,
        s.address as shipping_address, s.city as shipping_city, s.postal_code as shipping_postal_code,
        s.country as shipping_country, s.shipped_date, s.delivery_estimate
      FROM "order" o
      JOIN customer c ON o.customer_id = c.customer_id
      LEFT JOIN shipping s ON o.order_id = s.order_id
      WHERE o.order_id = $1 AND o.customer_id = $2
    `, [orderId, customerId]);

        if (orderResult.rows.length === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }

        const order = orderResult.rows[0];

        // Fetch order items
        const itemsResult = await client.query(`
      SELECT 
        oi.quantity, oi.item_price, b.title as book_title,
        STRING_AGG(DISTINCT a.name, ', ') as authors,
        f.format_name, f.factor
      FROM order_item oi
      LEFT JOIN book b ON oi.book_id = b.book_id
      LEFT JOIN book_author ba ON b.book_id = ba.book_id
      LEFT JOIN author a ON ba.author_id = a.author_id
      LEFT JOIN format f ON oi.format_id = f.format_id
      WHERE oi.order_id = $1
      GROUP BY oi.quantity, oi.item_price, b.title, f.format_name, f.factor
    `, [orderId]);

        order.items = itemsResult.rows;

        // Generate PDF buffer
        const pdfBuffer = generateReceiptPDF(order);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="receipt_${orderId}.pdf"`);
        res.setHeader('Content-Length', pdfBuffer.length);
        res.send(pdfBuffer);

    } catch (error) {
        console.error('Error generating receipt:', error);
        res.status(500).json({ error: 'Failed to generate receipt', details: error.message });
    } finally {
        if (client) client.release();
    }
});



function generateReceiptPDF(order) {
    const doc = new jsPDF();
    let y = 20;

    doc.setFontSize(28).setFont('helvetica', 'bold').text('Libri', 20, y);
    y += 10;
    doc.setFontSize(16).setFont('helvetica', 'normal').text('Order Receipt', 20, y);

    y += 20; doc.setFontSize(14).setFont('helvetica', 'bold').text('Order Details', 20, y);
    y += 10; doc.setFontSize(11).setFont('helvetica', 'normal');
    doc.text(`Order ID: #${order.order_id}`, 20, y);
    y += 7; doc.text(`Date: ${new Date(order.order_date).toLocaleDateString()}`, 20, y);
    y += 7; doc.text(`Status: ${order.status.toUpperCase()}`, 20, y);
    if (order.tracking_number) { y += 7; doc.text(`Tracking: ${order.tracking_number}`, 20, y); }

    y += 15; doc.setFontSize(14).setFont('helvetica', 'bold').text('Customer Information', 20, y);
    y += 10; doc.setFontSize(11).setFont('helvetica', 'normal');
    doc.text(`Name: ${order.customer_name}`, 20, y);
    y += 7; doc.text(`Email: ${order.customer_email}`, 20, y);
    if (order.customer_phone) { y += 7; doc.text(`Phone: ${order.customer_phone}`, 20, y); }

    if (order.shipping_address) {
        y += 15; doc.setFontSize(14).setFont('helvetica', 'bold').text('Shipping Address', 20, y);
        y += 10; doc.setFontSize(11).setFont('helvetica', 'normal');
        doc.text(order.shipping_address, 20, y);
        y += 7; doc.text(`${order.shipping_city}${order.shipping_postal_code ? ', ' + order.shipping_postal_code : ''}`, 20, y);
        y += 7; doc.text(order.shipping_country, 20, y);
        if (order.delivery_estimate) { y += 7; doc.text(`Est. Delivery: ${new Date(order.delivery_estimate).toLocaleDateString()}`, 20, y); }
    }

    y += 20;
    doc.setFontSize(14).setFont('helvetica', 'bold').text('Order Items', 20, y);
    y += 10;

    const tableHeaders = ['Item', 'Format', 'Qty', 'Price', 'Total'];
    const tableData = order.items.map(item => [
        `${item.book_title}${item.authors ? `\nby ${item.authors}` : ''}`,
        item.format_name || 'Standard',
        item.quantity.toString(),
        `$${parseFloat(item.item_price).toFixed(2)}`,
        `$${(item.item_price * item.quantity).toFixed(2)}`
    ]);

    autoTable(doc, {
        startY: y,
        head: [tableHeaders],
        body: tableData,
        theme: 'striped',
        headStyles: { fillColor: [30, 31, 38], textColor: 255, fontStyle: 'bold' },
        styles: { fontSize: 10, cellPadding: 5 },
    });

    const subtotal = order.items.reduce((sum, item) => sum + (item.item_price * item.quantity), 0);
    const shippingCost = 5.00;
    const finalY = doc.lastAutoTable.finalY + 15;

    doc.setFontSize(11).setFont('helvetica', 'normal');
    doc.text('Subtotal:', 120, finalY);
    doc.text(`$${subtotal.toFixed(2)}`, 170, finalY, { align: 'right' });
    doc.text('Shipping:', 120, finalY + 7);
    doc.text(`$${shippingCost.toFixed(2)}`, 170, finalY + 7, { align: 'right' });
    doc.setFont('helvetica', 'bold').setFontSize(12);
    doc.text('Total:', 120, finalY + 17);
    doc.text(`$${parseFloat(order.total_amount).toFixed(2)}`, 170, finalY + 17, { align: 'right' });

    const footerY = finalY + 35; function generateReceiptPDF(order) {
        const doc = new jsPDF();
        let y = 20;
        const pageW = doc.internal.pageSize.getWidth();
        const xMargin = 20;


        doc.setFontSize(26);
        doc.setFont('helvetica', 'bold');
        doc.text('🎓 Libri', xMargin, y);

        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.text('Order Receipt', pageW - xMargin, y, { align: 'right' });
        y += 10;
        doc.setDrawColor(220, 220, 220);
        doc.line(xMargin, y, pageW - xMargin, y);

        const x1 = xMargin;
        const x2 = pageW / 2 + 10;
        y += 15;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('Order ID:', x1, y);
        doc.text('Order Date:', x1, y + 7);
        doc.text('Status:', x1, y + 14);

        doc.setFont('helvetica', 'normal');
        doc.text(`#${order.order_id}`, x1 + 35, y);
        doc.text(new Date(order.order_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), x1 + 35, y + 7);
        doc.text(order.status.toUpperCase(), x1 + 35, y + 14);

        doc.setFont('helvetica', 'bold');
        doc.text('Billed To:', x2, y);
        doc.setFont('helvetica', 'normal');
        doc.text(order.customer_name, x2, y + 7);
        doc.text(order.customer_email, x2, y + 14);
        if (order.customer_phone) doc.text(order.customer_phone, x2, y + 21);

        y += 35; // Extra space before table

        const tableHeaders = [['Item', 'Format', 'Qty', 'Price', 'Total']];
        const tableData = order.items.map(item => [
            `${item.book_title}\n${item.authors ? `by ${item.authors}` : ''}`,
            item.format_name || 'Standard',
            item.quantity.toString(),
            `$${parseFloat(item.item_price).toFixed(2)}`,
            `$${(item.item_price * item.quantity).toFixed(2)}`
        ]);

        autoTable(doc, {
            startY: y,
            head: tableHeaders,
            body: tableData,
            theme: 'striped',
            headStyles: {
                fillColor: [41, 128, 185],
                textColor: 255,
                fontStyle: 'bold',
                halign: 'center'
            },
            columnStyles: {
                0: { cellWidth: 70 }, // Item
                1: { halign: 'center' }, // Format
                2: { halign: 'center' }, // Qty
                3: { halign: 'right' },  // Price
                4: { halign: 'right' }   // Total
            },
            margin: { left: xMargin, right: xMargin },
        });

        // Totals Section
        const subtotal = order.items.reduce((sum, item) => sum + (item.item_price * item.quantity), 0);
        const shippingCost = 5.00;
        let finalY = doc.lastAutoTable.finalY + 10;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const totalsX = pageW - xMargin - 60;

        doc.text('Subtotal:', totalsX, finalY);
        doc.text(`$${subtotal.toFixed(2)}`, pageW - xMargin, finalY, { align: 'right' });

        finalY += 7;
        doc.text('Shipping:', totalsX, finalY);
        doc.text(`$${shippingCost.toFixed(2)}`, pageW - xMargin, finalY, { align: 'right' });

        finalY += 7;
        doc.setDrawColor(41, 128, 185);
        doc.line(totalsX - 2, finalY, pageW - xMargin, finalY); // Line above total

        finalY += 5;
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('Total:', totalsX, finalY);
        doc.text(`$${parseFloat(order.total_amount).toFixed(2)}`, pageW - xMargin, finalY, { align: 'right' });

        const footerY = doc.internal.pageSize.getHeight() - 15;
        doc.setDrawColor(220, 220, 220);
        doc.line(xMargin, footerY - 5, pageW - xMargin, footerY - 5);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.text('Thank you for your business!', pageW / 2, footerY, { align: 'center' });
        doc.text('For support, contact support@libri.com', pageW / 2, footerY + 5, { align: 'center' });

        return Buffer.from(doc.output('arraybuffer'));
    }

    doc.setFontSize(10).setFont('helvetica', 'normal');
    doc.text('Thank you for using Libri!', 105, footerY, { align: 'center' });

    return Buffer.from(doc.output('arraybuffer'));
}








app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/html/index.html'));
});

app.get('/book-details.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/html/book-details.html'));
});

app.get('/wishlist.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/html/wishlist.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});