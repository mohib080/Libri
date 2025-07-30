CREATE TABLE user_notifications (
    notification_id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    order_id INTEGER,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id),
    FOREIGN KEY (order_id) REFERENCES "order"(order_id)
);



CREATE OR REPLACE FUNCTION notify_user_order_status_change()
RETURNS TRIGGER AS $$
BEGIN
   
    IF OLD.status IS DISTINCT FROM NEW.status THEN
        INSERT INTO user_notifications (customer_id, type, title, message, order_id, created_at)
        VALUES (
            NEW.customer_id,
            'order_status_update',
            'Order Status Updated',
            'Your order #' || NEW.order_id || ' status has been updated to: ' || NEW.status,
            NEW.order_id,
            NOW()
        );
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trigger_order_status_update
    AFTER UPDATE ON "order"
    FOR EACH ROW
    EXECUTE FUNCTION notify_user_order_status_change();

