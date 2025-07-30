CREATE TABLE supplier_notifications (
    notification_id SERIAL PRIMARY KEY,
    supplier_id INTEGER,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    data JSONB,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (supplier_id) REFERENCES supplier(supplier_id)
);


CREATE OR REPLACE FUNCTION notify_supplier_new_review()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO supplier_notifications (supplier_id, type, title, message, data, created_at)
    SELECT 
        bs.supplier_id,
        'new_review',
        'New Review on Your Book',
        'A new ' || NEW.rating || '-star review has been submitted for "' || b.title || '" by ' || c.name || '.',
        jsonb_build_object(
            'book_id', NEW.book_id,
            'book_title', b.title,
            'review_id', NEW.review_id,
            'rating', NEW.rating,
            'comment', NEW.comment,
            'customer_id', NEW.customer_id,
            'customer_name', c.name,
            'customer_email', c.email,
            'review_date', NEW.review_date
        ),
        NOW()
    FROM book_supply bs
    JOIN book b ON bs.book_id = b.book_id
    JOIN customer c ON NEW.customer_id = c.customer_id
    WHERE bs.book_id = NEW.book_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trigger_supplier_new_review
    AFTER INSERT ON review
    FOR EACH ROW
    EXECUTE FUNCTION notify_supplier_new_review();
    
    
    
    
CREATE OR REPLACE FUNCTION notify_supplier_review_deleted()
RETURNS TRIGGER AS $$
BEGIN
 
    INSERT INTO supplier_notifications (supplier_id, type, title, message, data, created_at)
    SELECT 
        bs.supplier_id,
        'review_deleted',
        'Review Deleted from Your Book',
        'A ' || OLD.rating || '-star review for "' || b.title || '" by ' || c.name || ' has been deleted.',
        jsonb_build_object(
            'book_id', OLD.book_id,
            'book_title', b.title,
            'review_id', OLD.review_id,
            'rating', OLD.rating,
            'comment', OLD.comment,
            'customer_id', OLD.customer_id,
            'customer_name', c.name,
            'customer_email', c.email,
            'deleted_date', NOW()
        ),
        NOW()
    FROM book_supply bs
    JOIN book b ON bs.book_id = b.book_id
    JOIN customer c ON OLD.customer_id = c.customer_id
    WHERE bs.book_id = OLD.book_id;
    
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;




CREATE TRIGGER trigger_supplier_review_deleted
    AFTER DELETE ON review
    FOR EACH ROW
    EXECUTE FUNCTION notify_supplier_review_deleted();
    
