CREATE OR REPLACE FUNCTION update_book_recommendations_fn()
RETURNS TRIGGER AS $$
BEGIN

    IF OLD.rating IS DISTINCT FROM NEW.rating THEN
        DELETE FROM book_recommendation;
        INSERT INTO book_recommendation (recommendation_id, book_id)
        SELECT 
            row_number() OVER (ORDER BY rating DESC, publication_date DESC, book_id ASC) AS recommendation_id,
            book_id
        FROM book
        WHERE is_active = TRUE AND rating IS NOT NULL
        ORDER BY rating DESC, publication_date DESC, book_id ASC
        LIMIT 10;

    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;
