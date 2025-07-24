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

const isSeller = (req, res, next) => {
    // This check relies on the JWT payload having a 'supplierId' or 'isSeller' flag
    if (!req.user || !req.user.isSeller) {
        return res.status(403).json({ error: 'Forbidden: Requires seller privileges' });
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

        // Modified cart items query to handle multiple authors and ensure format_id consistency
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
    const { shipping, items } = req.body; // Get items from request body
    let client;

    try {
        client = await pool.connect();
        await client.query('BEGIN');

        const itemsTotal = items.reduce((sum, item) =>
            sum + (parseFloat(item.price) * item.quantity), 0
        );
        const shippingCost = 5.00;
        const serverTotal = itemsTotal + shippingCost;

        // 2. Create order
        const orderResult = await client.query(`
            INSERT INTO "order" (customer_id, status, order_date, total_amount, shipping_method)
            VALUES ($1, 'pending', NOW(), $2, 'standard')
            RETURNING order_id
        `, [customerId, serverTotal]);

        const orderId = orderResult.rows[0].order_id;

        // 3. Add order items with format
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
                item.formatId // Use formatId instead of format
            ]);

            // Update inventory
            await client.query(`
                UPDATE inventory 
                SET quantity_in_stock = quantity_in_stock - $1,
                    last_update = NOW()
                WHERE book_id = $2
            `, [item.quantity, item.bookId]);
        }

        // 4. Add shipping information
        if (shipping) {
            await client.query(`
                INSERT INTO shipping (order_id, address, city, postal_code, country, delivery_estimate)
                VALUES ($1, $2, $3, $4, $5, NOW() + INTERVAL '7 days')
            `, [orderId, shipping.address, shipping.city, shipping.postal_code, shipping.country]);
        }

        // 5. Clear cart properly
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


// POST /api/seller/signup - Handles new seller registration and immediate login
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

        // --- ADD THIS SECTION TO AUTOMATICALLY LOG IN ---
        // Create a JWT payload for the new seller
        const payload = {
            supplierId: newSupplier.supplier_id,
            name: newSupplier.supplier_name,
            email: newSupplier.email,
            isSeller: true // Flag to identify this token type
        };

        // Sign the token
        const token = jwt.sign(payload, 'your_secret_key', { expiresIn: '1h' }); // Use process.env.JWT_SECRET in production

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
        if (err.code === '23505') { // Unique constraint violation (email)
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
    const { title, format, description, price, isbn, publisher, publicationDate, quantity, authorName } = req.body;
    const supplierId = req.user.supplierId;
    let client;

    try {
        client = await pool.connect();
        await client.query('BEGIN');

        // Step 1: Check if author exists; if not, create one.
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
        } else {
            authorId = authorResult.rows[0].author_id;
        }

        // Step 2: Insert the new book
        const bookResult = await client.query(
            `INSERT INTO book (title, description, price, isbn, publisher, publication_date, format_id) 
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING book_id`,
            [title, description, price, isbn, publisher, publicationDate, format]
        );
        const newBookId = bookResult.rows[0].book_id;

        // Step 3: Link book to author **(fix is here)**
        await client.query(
            'INSERT INTO book_author (book_id, author_id) VALUES ($1, $2)',
            [newBookId, authorId]
        );

        // Step 4: Add to inventory
        await client.query(
            'INSERT INTO inventory (book_id, quantity_in_stock,format_id) VALUES ($1, $2, $3)',
            [newBookId, quantity, format]
        );

        // Step 5: Link book to supplier
        await client.query(
            'INSERT INTO book_supply (book_id, supplier_id) VALUES ($1, $2)',
            [newBookId, supplierId]
        );

        await client.query('COMMIT');
        res.status(201).json({ message: 'Book added to inventory successfully!', bookId: newBookId });
    } catch (err) {
        if (client) await client.query('ROLLBACK');
        console.error('Error adding book:', err);
        res.status(500).json({ error: 'Failed to add book to inventory' });
    } finally {
        if (client) client.release();
    }
});

// --- ADMIN ROUTES ---

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
        // If you want to issue a JWT for admin session:
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
        const result = await pool.query('SELECT COUNT(*) AS total_orders FROM "order" WHERE status = \'completed\'');
        res.json({ totalOrders: parseInt(result.rows[0].total_orders, 10) });
    } catch (err) {
        console.error('Count orders error:', err);
        res.status(500).json({ error: 'Failed to get total orders' });
    }
});

app.get('/api/admin/total-books-in-stock', authenticateToken, isAdmin, async (req, res) => {
    try {
        const result = await pool.query('SELECT COUNT(DISTINCT book_id) AS unique_books FROM inventory WHERE quantity_in_stock > 0');
        res.json({ booksInStock: parseInt(result.rows[0].unique_books, 10) });
    } catch (err) {
        console.error('Count books in stock error:', err);
        res.status(500).json({ error: 'Failed to get books in stock' });
    }
});
app.get('/api/admin/total-sales', authenticateToken, isAdmin, async (req, res) => {
    try {
        const result = await pool.query('SELECT COALESCE(SUM(total_amount), 0) AS total_sales FROM "order" WHERE status=\'completed\'');
        res.json({ totalSales: parseFloat(result.rows[0].total_sales) });
    } catch (err) {
        console.error('Count total sales error:', err);
        res.status(500).json({ error: 'Failed to get total sales' });
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

// Route to get ONLY customers
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

// Route to get ONLY sellers
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

app.get('/api/seller/dashboard-stats', authenticateToken, isSeller, async (req, res) => {
    const supplierId = req.user.supplierId;
    let client;

    try {
        client = await pool.connect();

        // 1. Get Total Sales for this seller's books
        const salesQuery = `
            SELECT COALESCE(SUM(oi.item_price * oi.quantity), 0) AS total_sales
            FROM order_item oi
            JOIN book_supply bs ON oi.book_id = bs.book_id
            WHERE bs.supplier_id = $1;
        `;
        const salesResult = await client.query(salesQuery, [supplierId]);

        // 2. Get Total Orders containing this seller's books
        const ordersQuery = `
            SELECT COUNT(DISTINCT oi.order_id) AS total_orders
            FROM order_item oi
            JOIN book_supply bs ON oi.book_id = bs.book_id
            WHERE bs.supplier_id = $1;
        `;
        const ordersResult = await client.query(ordersQuery, [supplierId]);

        // 3. Get Total Books in Stock for this seller
        const stockQuery = `
            SELECT COALESCE(SUM(i.quantity_in_stock), 0) AS books_in_stock
            FROM inventory i
            JOIN book_supply bs ON i.book_id = bs.book_id
            WHERE bs.supplier_id = $1;
        `;
        const stockResult = await client.query(stockQuery, [supplierId]);

        // 4. Get Recent Orders for this seller's books
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

        res.json({
            totalSales: parseFloat(salesResult.rows[0].total_sales),
            totalOrders: parseInt(ordersResult.rows[0].total_orders, 10),
            booksInStock: parseInt(stockResult.rows[0].books_in_stock, 10),
            // For now, low stock alerts can be a static value or a future enhancement
            lowStockAlerts: 8,
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

// UPDATE seller's profile information
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