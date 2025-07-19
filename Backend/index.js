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
        let query = `SELECT sub_category_id, category_id, sub_category_name FROM sub_category`;
        const queryParams = [];
        if (categoryId) {
            query += ` WHERE category_id = $1`;
            queryParams.push(parseInt(categoryId, 10));
        }
        query += ` ORDER BY sub_category_name`; // Always add ORDER BY at the end
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

    // Basic backend input validation
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    try {
        // Check if email already exists
        const emailCheck = await pool.query('SELECT 1 FROM customer WHERE email = $1', [email]);
        if (emailCheck.rows.length > 0) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Check if username already exists
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
            'your_secret_key', // Replace this with a real secret in production!
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
                au.name AS author,
                (b.price * crt.quantity) AS total_item_price
            FROM
                cart_item crt
            JOIN
                book b ON crt.book_id = b.book_id
            JOIN
                book_author ba ON b.book_id = ba.book_id
            JOIN
                author au ON au.author_id = ba.author_id
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
        await client.query('BEGIN'); // Start transaction

        // 1. Check if the book exists
        const bookExists = await client.query('SELECT 1 FROM book WHERE book_id = $1', [bookId]);
        if (bookExists.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: 'Book not found.' });
        }

        // 2. Check if the customer has already reviewed this book (optional, but good practice)
        const existingReview = await client.query(
            'SELECT review_id FROM review WHERE book_id = $1 AND customer_id = $2',
            [bookId, customerId]
        );
        if (existingReview.rows.length > 0) {
            await client.query('ROLLBACK');
            return res.status(409).json({ error: 'You have already reviewed this book.' });
        }

        // 3. Insert the new review
        await client.query(
            `INSERT INTO review (book_id, customer_id, rating, comment, review_date)
             VALUES ($1, $2, $3, $4, NOW())`,
            [bookId, customerId, rating, comment]
        );

        // 4. Update the book's average rating and review count
        await client.query(
            `UPDATE book
             SET
                 average_rating = (SELECT AVG(rating) FROM review WHERE book_id = $1),
                 review_count = (SELECT COUNT(review_id) FROM review WHERE book_id = $1)
             WHERE book_id = $1`,
            [bookId]
        );

        await client.query('COMMIT'); // Commit transaction
        res.status(201).json({ message: 'Review submitted successfully.' });

    } catch (err) {
        await client.query('ROLLBACK'); // Rollback on error
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
        await client.query('BEGIN'); // Start transaction

        // 1. Verify the review exists and belongs to the authenticated customer and the specified book
        const reviewCheckResult = await client.query(
            'SELECT review_id FROM review WHERE review_id = $1 AND book_id = $2 AND customer_id = $3',
            [reviewId, bookId, customerId]
        );

        if (reviewCheckResult.rows.length === 0) {
            await client.query('ROLLBACK');
            // Return 404 if not found, or 403 if found but doesn't belong to user
            return res.status(404).json({ error: 'Review not found or you do not have permission to delete it.' });
        }

        // 2. Delete the review
        await client.query('DELETE FROM review WHERE review_id = $1', [reviewId]);

        // 3. Update the book's average rating and review count
        // Recalculate average_rating and review_count after deletion
        await client.query(
            `UPDATE book
             SET
                 average_rating = COALESCE((SELECT AVG(rating) FROM review WHERE book_id = $1), 0),
                 review_count = (SELECT COUNT(review_id) FROM review WHERE book_id = $1)
             WHERE book_id = $1`,
            [bookId]
        );

        await client.query('COMMIT'); // Commit transaction
        res.json({ message: 'Review removed successfully.' });

    } catch (err) {
        await client.query('ROLLBACK'); // Rollback on error
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
    const { shipping } = req.body;
    let client;

    try {
        client = await pool.connect();
        await client.query('BEGIN');

        console.log('Creating order for customer:', customerId); // Debug log

        // 1. Get cart items and validate
        const cartItems = await client.query(`
            SELECT
    ci.book_id,
    ci.quantity,
    b.price,
    b.is_active,    
    b.title
FROM
    cart_item ci
JOIN
    book b ON ci.book_id = b.book_id
JOIN
     cart crt on crt.cart_id=ci.cart_id
JOIN
    customer c ON c.customer_id = crt.customer_id
WHERE
    ci.cart_id = (SELECT cart_id FROM cart WHERE customer_id = $1);
        `, [customerId]);

        console.log('Cart items found:', cartItems.rows.length); // Debug log

        if (cartItems.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(400).json({ error: 'Cart is empty' });
        }

        // 2. Validate all books are active
        const inactiveBooks = cartItems.rows.filter(item => !item.is_active);
        if (inactiveBooks.length > 0) {
            await client.query('ROLLBACK');
            return res.status(400).json({
                error: 'Some books are no longer available',
                unavailable_books: inactiveBooks.map(book => book.title)
            });
        }

        // 3. Check inventory for each book
        for (const item of cartItems.rows) {
            const inventoryCheck = await client.query(
                'SELECT quantity_in_stock FROM inventory WHERE book_id = $1',
                [item.book_id]
            );

            if (inventoryCheck.rows.length === 0 ||
                inventoryCheck.rows[0].quantity_in_stock < item.quantity) {
                await client.query('ROLLBACK');
                return res.status(400).json({
                    error: `Insufficient stock for "${item.title}"`,
                    available_stock: inventoryCheck.rows[0]?.quantity_in_stock || 0,
                    requested: item.quantity
                });
            }
        }

        // 4. Calculate total on server side
        const serverTotal = cartItems.rows.reduce((sum, item) =>
            sum + (parseFloat(item.price) * item.quantity), 0);

        // 5. Create order
        const orderResult = await client.query(`
            INSERT INTO "order" (customer_id, status, order_date, total_amount, shipping_method)
            VALUES ($1, 'pending', NOW(), $2, 'standard')
            RETURNING order_id
        `, [customerId, serverTotal]);

        const orderId = orderResult.rows[0].order_id;
        console.log('Order created with ID:', orderId); // Debug log

        // 6. Add order items
        for (const item of cartItems.rows) {
            await client.query(`
                INSERT INTO order_item (order_id, book_id, order_date, quantity, item_price)
                VALUES ($1, $2, NOW(), $3, $4)
            `, [orderId, item.book_id, item.quantity, item.price]);

            // Update inventory
            await client.query(`
                UPDATE inventory 
                SET quantity_in_stock = quantity_in_stock - $1,
                    last_update = NOW()
                WHERE book_id = $2
            `, [item.quantity, item.book_id]);
        }

        // 7. Add shipping information
        if (shipping) {
            await client.query(`
                INSERT INTO shipping (order_id, address, city, postal_code, country, delivery_estimate)
                VALUES ($1, $2, $3, $4, $5, NOW() + INTERVAL '7 days')
            `, [orderId, shipping.address, shipping.city, shipping.postal_code, shipping.country]);
        }

        // 8. Clear cart properly
        await client.query(`
            DELETE FROM cart_item WHERE cart_id = (SELECT cart_id FROM cart WHERE customer_id = $1)
        `, [customerId]);

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

// Get orders (FIXED)
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
                    COALESCE(b.title, 'Unknown Book') as title,
                    COALESCE(b.image_url, '/images/default-book.jpg') as image_url
                FROM order_item oi
                LEFT JOIN book b ON oi.book_id = b.book_id
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

// Cancel order (FIXED)
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

        // Add cancellation record
        await client.query(`
            INSERT INTO order_cancellation (order_id, customer_id, cancelled_by, reason, status)
            VALUES ($1, $2, 'customer', $3, 'approved')
        `, [orderId, customerId, `${reason}${details ? ': ' + details : ''}`]);

        await client.query('COMMIT');
        res.json({ message: 'Order cancelled successfully' });

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error cancelling order:', error);
        res.status(500).json({ error: 'Failed to cancel order' });
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