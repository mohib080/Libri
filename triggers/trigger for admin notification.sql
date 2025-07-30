CREATE TABLE admin_notifications (
    notification_id SERIAL PRIMARY KEY,
    admin_id INTEGER,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    data JSONB,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (admin_id) REFERENCES admin(admin_id)
);

CREATE OR REPLACE FUNCTION notify_admin_new_signup()
RETURNS TRIGGER AS $$
BEGIN
   
    INSERT INTO admin_notifications (type, title, message, data, created_at)
    VALUES (
        'new_signup',
        'New User Registration',
        'A new user "' || NEW.name || '" has registered with email: ' || NEW.email,
        jsonb_build_object(
            'customer_id', NEW.customer_id,
            'customer_name', NEW.name,
            'customer_email', NEW.email,
            'signup_date', NEW.created_at
        ),
        NOW()
    );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trigger_new_user_signup
    AFTER INSERT ON customer
    FOR EACH ROW
    EXECUTE FUNCTION notify_admin_new_signup();


CREATE OR REPLACE FUNCTION notify_admin_new_review()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO admin_notifications (type, title, message, data, created_at)
    VALUES (
        'new_review',
        'New Book Review',
        'A new ' || NEW.rating || '-star review has been submitted for "' || 
        (SELECT title FROM book WHERE book_id = NEW.book_id) || '" by ' || 
        (SELECT name FROM customer WHERE customer_id = NEW.customer_id) || '.',
        jsonb_build_object(
            'book_id', NEW.book_id,
            'book_title', (SELECT title FROM book WHERE book_id = NEW.book_id),
            'review_id', NEW.review_id,
            'rating', NEW.rating,
            'comment', NEW.comment,
            'customer_id', NEW.customer_id,
            'customer_name', (SELECT name FROM customer WHERE customer_id = NEW.customer_id),
            'customer_email', (SELECT email FROM customer WHERE customer_id = NEW.customer_id),
            'review_date', NEW.review_date
        ),
        NOW()
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_admin_new_review
    AFTER INSERT ON review
    FOR EACH ROW
    EXECUTE FUNCTION notify_admin_new_review();
    
    

CREATE OR REPLACE FUNCTION notify_admin_review_deleted()
RETURNS TRIGGER AS $$
BEGIN
    
    INSERT INTO admin_notifications (type, title, message, data, created_at)
    VALUES (
        'review_deleted',
        'Review Deleted',
        'A ' || OLD.rating || '-star review for "' || 
        (SELECT title FROM book WHERE book_id = OLD.book_id) || '" by ' || 
        (SELECT name FROM customer WHERE customer_id = OLD.customer_id) || ' has been deleted.',
        jsonb_build_object(
            'book_id', OLD.book_id,
            'book_title', (SELECT title FROM book WHERE book_id = OLD.book_id),
            'review_id', OLD.review_id,
            'rating', OLD.rating,
            'comment', OLD.comment,
            'customer_id', OLD.customer_id,
            'customer_name', (SELECT name FROM customer WHERE customer_id = OLD.customer_id),
            'customer_email', (SELECT email FROM customer WHERE customer_id = OLD.customer_id),
            'deleted_date', NOW()
        ),
        NOW()
    );
    
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trigger_admin_review_deleted
    AFTER DELETE ON review
    FOR EACH ROW
    EXECUTE FUNCTION notify_admin_review_deleted();
    


CREATE OR REPLACE FUNCTION notify_admin_payment_received()
RETURNS TRIGGER AS $$
DECLARE
    customer_id INTEGER;
    customer_name VARCHAR;
    customer_email VARCHAR;
    payment_method VARCHAR;
BEGIN
  
    SELECT o.customer_id, c.name, c.email
      INTO customer_id, customer_name, customer_email
      FROM "order" o
      JOIN customer c ON o.customer_id = c.customer_id
     WHERE o.order_id = NEW.order_id;

  
    SELECT method_name INTO payment_method
      FROM payment_method
     WHERE payment_method_id = NEW.payment_method_id;

    INSERT INTO admin_notifications (type, title, message, data, created_at)
    VALUES (
        'payment_received',
        'Payment Received',
        'Received payment of $' || NEW.amount || ' for Order #' || NEW.order_id ||
        ' via ' || payment_method || ' from "' || customer_name || '"',
        jsonb_build_object(
            'order_id', NEW.order_id,
            'amount', NEW.amount,
            'payment_method', payment_method,
            'customer_id', customer_id,
            'customer_name', customer_name,
            'customer_email', customer_email,
            'payment_date', NEW.payment_date
        ),
        NOW()
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trigger_admin_payment_received
AFTER INSERT ON payment
FOR EACH ROW
EXECUTE FUNCTION notify_admin_payment_received();


CREATE OR REPLACE FUNCTION notify_admin_inventory_update()
RETURNS TRIGGER AS $BODY$
DECLARE
    supplier_name VARCHAR(255);
    book_title VARCHAR(255);
    supplier_id INTEGER;
BEGIN

    SELECT title INTO book_title
    FROM book
    WHERE book_id = NEW.book_id;
    

    SELECT bs.supplier_id, s.supplier_name
    INTO supplier_id, supplier_name
    FROM book_supply bs
    JOIN supplier s ON bs.supplier_id = s.supplier_id
    WHERE bs.book_id = NEW.book_id
    LIMIT 1;
    

    INSERT INTO admin_notifications (type, title, message, data, created_at)
    VALUES (
        'inventory_update',
        'Inventory Updated by Supplier',
        'Supplier "' || COALESCE(supplier_name, 'Unknown') || '" has updated inventory for "' || 
        COALESCE(book_title, 'Unknown Book') || '". New stock: ' || NEW.quantity_in_stock,
        jsonb_build_object(
            'book_id', NEW.book_id,
            'book_title', book_title,
            'supplier_id', supplier_id,
            'supplier_name', supplier_name,
            'old_quantity', COALESCE(OLD.quantity_in_stock, 0),
            'new_quantity', NEW.quantity_in_stock,
            'format_id', NEW.format_id,
            'update_date', NEW.last_update,
            'inventory_id', NEW.inventory_id
        ),
        NOW()
    );
    
    RETURN NEW;
END;
$BODY$
LANGUAGE plpgsql;


CREATE TRIGGER trigger_admin_inventory_added
    AFTER INSERT ON inventory
    FOR EACH ROW
    EXECUTE PROCEDURE notify_admin_inventory_update();


CREATE OR REPLACE FUNCTION notify_admin_inventory_update_from_customer_when_stock_zero()
RETURNS TRIGGER AS $BODY$
DECLARE
    customer_name VARCHAR(255);
    book_title VARCHAR(255);
BEGIN
    SELECT title INTO book_title
    FROM book
    WHERE book_id = NEW.book_id;

    SELECT c.name INTO customer_name
    FROM order_item oi
    JOIN "order" o ON oi.order_id = o.order_id
    JOIN customer c ON o.customer_id = c.customer_id
    JOIN inventory i on oi.inventory_id = i.inventory_id;
    WHERE oi.book_id = NEW.book_id AND oi.format_id = NEW.format_id  AND i.quantity_in_stock = 0;
    ORDER BY o.order_date DESC
    LIMIT 1;

    INSERT INTO admin_notifications (type, title, message, data, created_at)
    VALUES (
        'inventory_update',
        'Book Stock Depleted',
        'Customer "' || COALESCE(customer_name, 'Unknown') || '" ordered the last copy of "' || 
        COALESCE(book_title, 'Unknown Book') || '". Stock is now zero.',
        jsonb_build_object(
            'book_id', NEW.book_id,
            'book_title', book_title,
            'customer_name', customer_name,
            'old_quantity', COALESCE(OLD.quantity_in_stock, 0),
            'new_quantity', NEW.quantity_in_stock,
            'format_id', NEW.format_id,
            'update_date', NEW.last_update,
            'inventory_id', NEW.inventory_id
        ),
        NOW()
    );

    RETURN NEW;
END;
$BODY$
LANGUAGE plpgsql;


CREATE TRIGGER trigger_user_ordered_last_copy
AFTER UPDATE ON public.inventory
FOR EACH ROW
WHEN (OLD.quantity_in_stock IS DISTINCT FROM NEW.quantity_in_stock AND NEW.quantity_in_stock = 0)
EXECUTE FUNCTION notify_admin_inventory_update_from_customer_when_stock_zero();