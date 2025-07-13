const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();

// Serve static files from frontend directories
app.use(express.static(path.join(__dirname, '../frontend/html')));
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.static(path.join(__dirname, '../frontend/css')));
app.use(express.static(path.join(__dirname, '../frontend/js')));

const port = 3000;

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
        b.book_id AS id,
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
        query += ` GROUP BY b.book_id, bc.category_id, bc.category_name, sc.sub_category_id,
        sc.sub_category_name ORDER BY b.title ASC`;

        const result = await client.query(query, queryParams);
        res.json(result.rows);
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).send('Error fetching data from PostgreSQL DB');
    } finally {
        if (client) {
            client.release();
        }
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

        query += ` GROUP BY b.book_id, bc.category_id, bc.category_name, sc.sub_category_id,
        sc.sub_category_name ORDER BY b.title ASC`; // Corrected alias to sc.sub_category_name

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
            GROUP BY b.book_id, bc.category_id, bc.category_name, sc.sub_category_id,
            sc.sub_category_name
            LIMIT 1;
        `, [bookTitle]);

        if (result.rows.length > 0) {
            res.json(result.rows[0]);
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
            GROUP BY b.book_id, bc.category_id, bc.category_name, sc.sub_category_id,
            sc.sub_category_name
        `, [bookId]);

        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    } catch (err) {
        console.error('Error fetching single book by ID:', err);
        res.status(500).send('Error retrieving book details by ID');
    } finally {
        if (client) {
            client.release();
        }
    }
});

// --- CATEGORY ROUTES ---
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
        let query = `SELECT sub_category_id, category_id, sub_category_name FROM sub_category ORDER BY sub_category_name`;
        const queryParams = [];
        if (categoryId) {
            query += ` WHERE category_id = $1`;
            queryParams.push(parseInt(categoryId, 10));
        }
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
    try {
        const customerExists = await pool.query(
            'SELECT * FROM customer WHERE email = $1||WHERE name = $2',
            [email,name]
        );

        if (customerExists.rows.length > 0 && customerExists.rows[0].email === email || customerExists.rows[0].name === name) {
            return res.status(400).json({ error: 'Email or Username already exists' });
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

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
            [email,name]
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

// --- JWT AUTH MIDDLEWARE ---
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

// --- PROFILE API (secured) ---
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

        const cartItemsResult = await client.query(`
            SELECT
                crt.cart_item_id,
                crt.book_id,
                b.title,
                b.image_url,
                b.price,
                crt.quantity,
                (b.price * crt.quantity) AS total_item_price
            FROM
                cart_item crt
            JOIN
                book b ON crt.book_id = b.book_id
            WHERE
                crt.cart_id = $1
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

app.post('/api/cart/add', authenticateToken, async (req, res) => {
    const customerId = req.user.customerId;
    const { bookId, quantity } = req.body;

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
            await client.query('INSERT INTO cart_item (cart_id, book_id, quantity) VALUES ($1, $2, $3)', [cartId, bookId, quantity]);
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


// --- STATIC FILE ROUTES ---
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/html/index.html'));
});

// Serve book-details.html
app.get('/book-details.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/html/book-details.html'));
});

// Serve wishlist.html (NEW)
app.get('/wishlist.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/html/wishlist.html'));
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
