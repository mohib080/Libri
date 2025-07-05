/*
 Navicat Premium Dump SQL

 Source Server         : project
 Source Server Type    : PostgreSQL
 Source Server Version : 170005 (170005)
 Source Host           : localhost:5432
 Source Catalog        : postgres
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 170005 (170005)
 File Encoding         : 65001

 Date: 05/07/2025 12:51:10
*/


-- ----------------------------
-- Sequence structure for author_author_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."author_author_id_seq";
CREATE SEQUENCE "public"."author_author_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for book_book_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."book_book_id_seq";
CREATE SEQUENCE "public"."book_book_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for book_category_category_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."book_category_category_id_seq";
CREATE SEQUENCE "public"."book_category_category_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for cart_cart_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."cart_cart_id_seq";
CREATE SEQUENCE "public"."cart_cart_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for cart_item_cart_item_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."cart_item_cart_item_id_seq";
CREATE SEQUENCE "public"."cart_item_cart_item_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for chat_message_message_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."chat_message_message_id_seq";
CREATE SEQUENCE "public"."chat_message_message_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for chat_session_session_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."chat_session_session_id_seq";
CREATE SEQUENCE "public"."chat_session_session_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for customer_customer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."customer_customer_id_seq";
CREATE SEQUENCE "public"."customer_customer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for format_format_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."format_format_id_seq";
CREATE SEQUENCE "public"."format_format_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for inventory_inventory_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."inventory_inventory_id_seq";
CREATE SEQUENCE "public"."inventory_inventory_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for order_cancellation_cancellation_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."order_cancellation_cancellation_id_seq";
CREATE SEQUENCE "public"."order_cancellation_cancellation_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for order_item_order_item_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."order_item_order_item_id_seq";
CREATE SEQUENCE "public"."order_item_order_item_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for order_order_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."order_order_id_seq";
CREATE SEQUENCE "public"."order_order_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for payment_method_payment_method_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."payment_method_payment_method_id_seq";
CREATE SEQUENCE "public"."payment_method_payment_method_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for payment_payment_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."payment_payment_id_seq";
CREATE SEQUENCE "public"."payment_payment_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for recommendation_recommendation_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."recommendation_recommendation_id_seq";
CREATE SEQUENCE "public"."recommendation_recommendation_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for review_review_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."review_review_id_seq";
CREATE SEQUENCE "public"."review_review_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for shipping_shipping_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."shipping_shipping_id_seq";
CREATE SEQUENCE "public"."shipping_shipping_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sub_category_sub_category_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sub_category_sub_category_id_seq";
CREATE SEQUENCE "public"."sub_category_sub_category_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for supplier_supplier_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."supplier_supplier_id_seq";
CREATE SEQUENCE "public"."supplier_supplier_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for wishlist_item_wishlist_item_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."wishlist_item_wishlist_item_id_seq";
CREATE SEQUENCE "public"."wishlist_item_wishlist_item_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for wishlist_wishlist_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."wishlist_wishlist_id_seq";
CREATE SEQUENCE "public"."wishlist_wishlist_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Table structure for author
-- ----------------------------
DROP TABLE IF EXISTS "public"."author";
CREATE TABLE "public"."author" (
  "author_id" int4 NOT NULL DEFAULT nextval('author_author_id_seq'::regclass),
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "bibliography" text COLLATE "pg_catalog"."default",
  "profile_image_url" text COLLATE "pg_catalog"."default",
  "nationality" varchar(255) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of author
-- ----------------------------
INSERT INTO "public"."author" VALUES (1, 'B.A. Paris', 'British-French author known for psychological thrillers.', 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', 'British');
INSERT INTO "public"."author" VALUES (2, 'James Clear', 'American author and speaker focused on habits and decision-making.', 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', 'American');
INSERT INTO "public"."author" VALUES (3, 'Paulo Coelho', 'Brazilian lyricist and novelist.', 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', 'Brazilian');
INSERT INTO "public"."author" VALUES (4, 'Barack Obama', '44th President of the United States.', 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', 'American');
INSERT INTO "public"."author" VALUES (5, 'Héctor García', 'Spanish author of books on Japanese philosophy.', 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', 'Spanish');
INSERT INTO "public"."author" VALUES (6, 'Francesc Miralles', 'Spanish author and journalist.', 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', 'Spanish');
INSERT INTO "public"."author" VALUES (7, 'Robert Kiyosaki', 'American investor, businessman, and author.', 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', 'American');
INSERT INTO "public"."author" VALUES (8, 'Morgan Housel', 'Partner at The Collaborative Fund and author.', 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', 'American');
INSERT INTO "public"."author" VALUES (9, 'George Orwell', 'English novelist, essayist, journalist, and critic.', 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', 'British');
INSERT INTO "public"."author" VALUES (10, 'Yuval Noah Harari', 'Israeli public intellectual, historian and author.', 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', 'Israeli');
INSERT INTO "public"."author" VALUES (11, 'Harper Lee', 'American novelist.', 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', 'American');

-- ----------------------------
-- Table structure for book
-- ----------------------------
DROP TABLE IF EXISTS "public"."book";
CREATE TABLE "public"."book" (
  "book_id" int4 NOT NULL DEFAULT nextval('book_book_id_seq'::regclass),
  "format_id" int4,
  "title" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "description" text COLLATE "pg_catalog"."default",
  "image_url" text COLLATE "pg_catalog"."default",
  "price" numeric(10,2) NOT NULL,
  "is_active" bool DEFAULT true,
  "isbn" varchar(20) COLLATE "pg_catalog"."default",
  "publisher" varchar(255) COLLATE "pg_catalog"."default",
  "publication_date" timestamp(6),
  "language" varchar(50) COLLATE "pg_catalog"."default",
  "category_id" int4,
  "sub_category_id" int4,
  "is_featured" bool DEFAULT false
)
;

-- ----------------------------
-- Records of book
-- ----------------------------
INSERT INTO "public"."book" VALUES (10, 3, 'To Kill a Mockingbird', 'A novel about the serious issues of rape and racial inequality.', 'https://via.placeholder.com/180x260?text=Mockingbird', 12.99, 't', '9780061120084', 'Harper Perennial', '2006-05-23 00:00:00', 'English', NULL, NULL, 'f');
INSERT INTO "public"."book" VALUES (1, 1, 'The Silent Patient', 'A psychological thriller about a woman''s act of violence.', 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png', 13.99, 't', '9781250301697', 'Celadon Books', '2019-02-05 00:00:00', 'English', NULL, NULL, 'f');
INSERT INTO "public"."book" VALUES (2, 2, 'Atomic Habits', 'An easy & proven way to build good habits & break bad ones.', 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png', 16.49, 't', '9780735211292', 'Penguin Publishing', '2018-10-16 00:00:00', 'English', NULL, NULL, 'f');
INSERT INTO "public"."book" VALUES (3, 1, 'The Alchemist', 'A fable about following your dream.', 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png', 10.99, 't', '9780061122415', 'HarperOne', '1993-05-01 00:00:00', 'English', NULL, NULL, 'f');
INSERT INTO "public"."book" VALUES (4, 3, 'A Promised Land', 'Barack Obama’s presidential memoir.', 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png', 22.00, 't', '9781524763169', 'Crown Publishing', '2020-11-17 00:00:00', 'English', NULL, NULL, 'f');
INSERT INTO "public"."book" VALUES (5, 1, 'Ikigai', 'The Japanese secret to a long and happy life.', 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png', 11.99, 't', '9780143130727', 'Penguin Books', '2017-08-29 00:00:00', 'English', NULL, NULL, 'f');
INSERT INTO "public"."book" VALUES (6, 2, 'Rich Dad Poor Dad', 'What the rich teach their kids about money.', 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png', 9.49, 't', '9781612680194', 'Plata Publishing', '2011-04-01 00:00:00', 'English', NULL, NULL, 'f');
INSERT INTO "public"."book" VALUES (7, 3, 'The Psychology of Money', 'Timeless lessons on wealth, greed, and happiness.', 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png', 14.00, 't', '9780857197689', 'Harriman House', '2020-09-01 00:00:00', 'English', NULL, NULL, 'f');
INSERT INTO "public"."book" VALUES (8, 2, '1984', 'A dystopian social science fiction novel and cautionary tale.', 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png', 8.99, 't', '9780451524935', 'Signet Classic', '1950-07-01 00:00:00', 'English', NULL, NULL, 'f');
INSERT INTO "public"."book" VALUES (9, 1, 'Sapiens', 'A brief history of humankind.', 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png', 17.49, 't', '9780062316097', 'Harper', '2015-02-10 00:00:00', 'English', NULL, NULL, 'f');

-- ----------------------------
-- Table structure for book_author
-- ----------------------------
DROP TABLE IF EXISTS "public"."book_author";
CREATE TABLE "public"."book_author" (
  "book_id" int4 NOT NULL,
  "author_id" int4 NOT NULL
)
;

-- ----------------------------
-- Records of book_author
-- ----------------------------
INSERT INTO "public"."book_author" VALUES (1, 1);
INSERT INTO "public"."book_author" VALUES (2, 2);
INSERT INTO "public"."book_author" VALUES (3, 3);
INSERT INTO "public"."book_author" VALUES (4, 4);
INSERT INTO "public"."book_author" VALUES (5, 5);
INSERT INTO "public"."book_author" VALUES (5, 6);
INSERT INTO "public"."book_author" VALUES (6, 7);
INSERT INTO "public"."book_author" VALUES (7, 8);
INSERT INTO "public"."book_author" VALUES (8, 9);
INSERT INTO "public"."book_author" VALUES (9, 10);
INSERT INTO "public"."book_author" VALUES (10, 11);

-- ----------------------------
-- Table structure for book_category
-- ----------------------------
DROP TABLE IF EXISTS "public"."book_category";
CREATE TABLE "public"."book_category" (
  "category_id" int4 NOT NULL DEFAULT nextval('book_category_category_id_seq'::regclass),
  "category_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "description" text COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of book_category
-- ----------------------------
INSERT INTO "public"."book_category" VALUES (1, 'Fiction', 'Fictional stories and narratives.');
INSERT INTO "public"."book_category" VALUES (2, 'Non-Fiction', 'Books based on facts, real events, and real people.');
INSERT INTO "public"."book_category" VALUES (3, 'Science Fiction & Fantasy', 'Genre of speculative fiction.');
INSERT INTO "public"."book_category" VALUES (4, 'Biography & Memoir', 'Life stories of individuals.');
INSERT INTO "public"."book_category" VALUES (5, 'Self-Help', 'Books designed to help with self-improvement.');

-- ----------------------------
-- Table structure for book_recommendation
-- ----------------------------
DROP TABLE IF EXISTS "public"."book_recommendation";
CREATE TABLE "public"."book_recommendation" (
  "recommendation_id" int4 NOT NULL,
  "book_id" int4 NOT NULL
)
;

-- ----------------------------
-- Records of book_recommendation
-- ----------------------------

-- ----------------------------
-- Table structure for book_sub_category
-- ----------------------------
DROP TABLE IF EXISTS "public"."book_sub_category";
CREATE TABLE "public"."book_sub_category" (
  "book_id" int4 NOT NULL,
  "sub_category_id" int4 NOT NULL
)
;

-- ----------------------------
-- Records of book_sub_category
-- ----------------------------
INSERT INTO "public"."book_sub_category" VALUES (1, 101);
INSERT INTO "public"."book_sub_category" VALUES (2, 501);
INSERT INTO "public"."book_sub_category" VALUES (3, 102);
INSERT INTO "public"."book_sub_category" VALUES (4, 401);
INSERT INTO "public"."book_sub_category" VALUES (5, 501);
INSERT INTO "public"."book_sub_category" VALUES (6, 203);
INSERT INTO "public"."book_sub_category" VALUES (7, 202);
INSERT INTO "public"."book_sub_category" VALUES (8, 102);
INSERT INTO "public"."book_sub_category" VALUES (9, 201);
INSERT INTO "public"."book_sub_category" VALUES (10, 102);

-- ----------------------------
-- Table structure for book_supply
-- ----------------------------
DROP TABLE IF EXISTS "public"."book_supply";
CREATE TABLE "public"."book_supply" (
  "book_id" int4 NOT NULL,
  "supplier_id" int4 NOT NULL
)
;

-- ----------------------------
-- Records of book_supply
-- ----------------------------

-- ----------------------------
-- Table structure for cart
-- ----------------------------
DROP TABLE IF EXISTS "public"."cart";
CREATE TABLE "public"."cart" (
  "cart_id" int4 NOT NULL DEFAULT nextval('cart_cart_id_seq'::regclass),
  "customer_id" int4,
  "created_at" timestamp(6) DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(6) DEFAULT CURRENT_TIMESTAMP
)
;

-- ----------------------------
-- Records of cart
-- ----------------------------

-- ----------------------------
-- Table structure for cart_item
-- ----------------------------
DROP TABLE IF EXISTS "public"."cart_item";
CREATE TABLE "public"."cart_item" (
  "cart_item_id" int4 NOT NULL DEFAULT nextval('cart_item_cart_item_id_seq'::regclass),
  "cart_id" int4 NOT NULL,
  "book_id" int4 NOT NULL,
  "quantity" int4 NOT NULL
)
;

-- ----------------------------
-- Records of cart_item
-- ----------------------------

-- ----------------------------
-- Table structure for chat_message
-- ----------------------------
DROP TABLE IF EXISTS "public"."chat_message";
CREATE TABLE "public"."chat_message" (
  "message_id" int4 NOT NULL DEFAULT nextval('chat_message_message_id_seq'::regclass),
  "session_id" int4,
  "sender_type" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "message_text" text COLLATE "pg_catalog"."default" NOT NULL,
  "sent_at" timestamp(6) DEFAULT CURRENT_TIMESTAMP
)
;

-- ----------------------------
-- Records of chat_message
-- ----------------------------

-- ----------------------------
-- Table structure for chat_session
-- ----------------------------
DROP TABLE IF EXISTS "public"."chat_session";
CREATE TABLE "public"."chat_session" (
  "session_id" int4 NOT NULL DEFAULT nextval('chat_session_session_id_seq'::regclass),
  "customer_id" int4,
  "started_at" timestamp(6) DEFAULT CURRENT_TIMESTAMP,
  "ended_at" timestamp(6),
  "is_escalated" bool DEFAULT false
)
;

-- ----------------------------
-- Records of chat_session
-- ----------------------------

-- ----------------------------
-- Table structure for customer
-- ----------------------------
DROP TABLE IF EXISTS "public"."customer";
CREATE TABLE "public"."customer" (
  "customer_id" int4 NOT NULL DEFAULT nextval('customer_customer_id_seq'::regclass),
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "email" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "hashed_password" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "phone_number" varchar(255) COLLATE "pg_catalog"."default",
  "address" text COLLATE "pg_catalog"."default",
  "created_at" timestamp(6) DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(6) DEFAULT CURRENT_TIMESTAMP,
  "role" varchar(50) COLLATE "pg_catalog"."default" NOT NULL DEFAULT 'customer'::character varying,
  "last_login_at" timestamp(6),
  "is_verified" bool DEFAULT false
)
;

-- ----------------------------
-- Records of customer
-- ----------------------------
INSERT INTO "public"."customer" VALUES (1, 'John Doe', 'john.doe@example.com', 'dummy_hash', NULL, NULL, '2025-06-24 02:04:42.815147', '2025-06-24 02:04:42.815147', 'customer', NULL, 't');
INSERT INTO "public"."customer" VALUES (4, 'mohib080', 'mohibul.sawrav2004@gmail.com', '$2b$10$toBBByEj1LrBcRY4TILZkulC2cEjkvXDPxGDb9m46PilGjqQ1G2gK', NULL, NULL, '2025-07-01 22:56:45.063885', '2025-07-01 22:56:45.063885', 'customer', NULL, 'f');
INSERT INTO "public"."customer" VALUES (3, 'mohib080', '2205018@ugrad.cse.buet.ac.bd', '$2b$10$RfOVcY9RIcmrXJ3GZty4Oep21SVA3Kj2rY5wcYCen/6/SCF30hVki', NULL, NULL, '2025-07-01 22:53:03.887927', '2025-07-04 17:57:38.658515', 'customer', '2025-07-04 18:20:48.292125', 'f');

-- ----------------------------
-- Table structure for format
-- ----------------------------
DROP TABLE IF EXISTS "public"."format";
CREATE TABLE "public"."format" (
  "format_id" int4 NOT NULL DEFAULT nextval('format_format_id_seq'::regclass),
  "format_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL
)
;

-- ----------------------------
-- Records of format
-- ----------------------------
INSERT INTO "public"."format" VALUES (1, 'Paperback');
INSERT INTO "public"."format" VALUES (2, 'Hardcover');
INSERT INTO "public"."format" VALUES (3, 'eBook');

-- ----------------------------
-- Table structure for inventory
-- ----------------------------
DROP TABLE IF EXISTS "public"."inventory";
CREATE TABLE "public"."inventory" (
  "inventory_id" int4 NOT NULL DEFAULT nextval('inventory_inventory_id_seq'::regclass),
  "book_id" int4,
  "admin_id" int4,
  "quantity_in_stock" int4 NOT NULL DEFAULT 0,
  "quantity" int4,
  "last_update" timestamp(6) DEFAULT CURRENT_TIMESTAMP
)
;

-- ----------------------------
-- Records of inventory
-- ----------------------------

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS "public"."order";
CREATE TABLE "public"."order" (
  "order_id" int4 NOT NULL DEFAULT nextval('order_order_id_seq'::regclass),
  "customer_id" int4,
  "status" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "order_date" timestamp(6) DEFAULT CURRENT_TIMESTAMP,
  "total_amount" numeric(10,2) NOT NULL,
  "shipping_method" varchar(255) COLLATE "pg_catalog"."default",
  "tracking_number" varchar(255) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of order
-- ----------------------------

-- ----------------------------
-- Table structure for order_cancellation
-- ----------------------------
DROP TABLE IF EXISTS "public"."order_cancellation";
CREATE TABLE "public"."order_cancellation" (
  "cancellation_id" int4 NOT NULL DEFAULT nextval('order_cancellation_cancellation_id_seq'::regclass),
  "order_id" int4,
  "customer_id" int4,
  "cancelled_by" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "reason" text COLLATE "pg_catalog"."default",
  "status" varchar(50) COLLATE "pg_catalog"."default" NOT NULL
)
;

-- ----------------------------
-- Records of order_cancellation
-- ----------------------------

-- ----------------------------
-- Table structure for order_item
-- ----------------------------
DROP TABLE IF EXISTS "public"."order_item";
CREATE TABLE "public"."order_item" (
  "order_item_id" int4 NOT NULL DEFAULT nextval('order_item_order_item_id_seq'::regclass),
  "order_id" int4,
  "book_id" int4,
  "order_date" timestamp(6) DEFAULT CURRENT_TIMESTAMP,
  "quantity" int4 NOT NULL,
  "item_price" numeric(10,2) NOT NULL
)
;

-- ----------------------------
-- Records of order_item
-- ----------------------------

-- ----------------------------
-- Table structure for payment
-- ----------------------------
DROP TABLE IF EXISTS "public"."payment";
CREATE TABLE "public"."payment" (
  "payment_id" int4 NOT NULL DEFAULT nextval('payment_payment_id_seq'::regclass),
  "order_id" int4,
  "payment_method_id" int4,
  "amount" numeric(10,2) NOT NULL,
  "payment_date" timestamp(6) DEFAULT CURRENT_TIMESTAMP,
  "requested_at" timestamp(6) DEFAULT CURRENT_TIMESTAMP
)
;

-- ----------------------------
-- Records of payment
-- ----------------------------

-- ----------------------------
-- Table structure for payment_method
-- ----------------------------
DROP TABLE IF EXISTS "public"."payment_method";
CREATE TABLE "public"."payment_method" (
  "payment_method_id" int4 NOT NULL DEFAULT nextval('payment_method_payment_method_id_seq'::regclass),
  "method_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL
)
;

-- ----------------------------
-- Records of payment_method
-- ----------------------------

-- ----------------------------
-- Table structure for recommendation
-- ----------------------------
DROP TABLE IF EXISTS "public"."recommendation";
CREATE TABLE "public"."recommendation" (
  "recommendation_id" int4 NOT NULL DEFAULT nextval('recommendation_recommendation_id_seq'::regclass),
  "customer_id" int4,
  "book_id" int4,
  "source" varchar(255) COLLATE "pg_catalog"."default",
  "recommended_at" timestamp(6) DEFAULT CURRENT_TIMESTAMP
)
;

-- ----------------------------
-- Records of recommendation
-- ----------------------------

-- ----------------------------
-- Table structure for review
-- ----------------------------
DROP TABLE IF EXISTS "public"."review";
CREATE TABLE "public"."review" (
  "review_id" int4 NOT NULL DEFAULT nextval('review_review_id_seq'::regclass),
  "book_id" int4 NOT NULL,
  "customer_id" int4 NOT NULL,
  "rating" numeric(2,1) NOT NULL,
  "comment" text COLLATE "pg_catalog"."default",
  "review_date" timestamp(6) DEFAULT CURRENT_TIMESTAMP
)
;

-- ----------------------------
-- Records of review
-- ----------------------------
INSERT INTO "public"."review" VALUES (1, 1, 1, 4.5, 'Fantastic thriller, kept me on the edge of my seat!', '2025-06-24 02:04:59.873939');
INSERT INTO "public"."review" VALUES (2, 2, 1, 5.0, 'Life-changing book on habit formation. Highly recommend!', '2025-06-23 02:04:59.873939');
INSERT INTO "public"."review" VALUES (3, 3, 1, 4.0, 'A beautiful story about finding your destiny. A bit slow at times.', '2025-06-22 02:04:59.873939');
INSERT INTO "public"."review" VALUES (4, 1, 1, 3.0, 'It was okay, not my usual genre.', '2025-06-21 02:04:59.873939');

-- ----------------------------
-- Table structure for shipping
-- ----------------------------
DROP TABLE IF EXISTS "public"."shipping";
CREATE TABLE "public"."shipping" (
  "shipping_id" int4 NOT NULL DEFAULT nextval('shipping_shipping_id_seq'::regclass),
  "order_id" int4,
  "address" text COLLATE "pg_catalog"."default" NOT NULL,
  "city" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "postal_code" varchar(20) COLLATE "pg_catalog"."default",
  "country" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "shipped_date" timestamp(6),
  "delivery_estimate" timestamp(6)
)
;

-- ----------------------------
-- Records of shipping
-- ----------------------------

-- ----------------------------
-- Table structure for sub_category
-- ----------------------------
DROP TABLE IF EXISTS "public"."sub_category";
CREATE TABLE "public"."sub_category" (
  "sub_category_id" int4 NOT NULL DEFAULT nextval('sub_category_sub_category_id_seq'::regclass),
  "category_id" int4,
  "sub_category_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL
)
;

-- ----------------------------
-- Records of sub_category
-- ----------------------------
INSERT INTO "public"."sub_category" VALUES (101, 1, 'Thriller');
INSERT INTO "public"."sub_category" VALUES (102, 1, 'Classics');
INSERT INTO "public"."sub_category" VALUES (103, 1, 'Contemporary');
INSERT INTO "public"."sub_category" VALUES (201, 2, 'History');
INSERT INTO "public"."sub_category" VALUES (202, 2, 'Psychology');
INSERT INTO "public"."sub_category" VALUES (203, 2, 'Business & Finance');
INSERT INTO "public"."sub_category" VALUES (301, 3, 'Science Fiction');
INSERT INTO "public"."sub_category" VALUES (302, 3, 'Fantasy');
INSERT INTO "public"."sub_category" VALUES (401, 4, 'Autobiography');
INSERT INTO "public"."sub_category" VALUES (501, 5, 'Personal Development');

-- ----------------------------
-- Table structure for supplier
-- ----------------------------
DROP TABLE IF EXISTS "public"."supplier";
CREATE TABLE "public"."supplier" (
  "supplier_id" int4 NOT NULL DEFAULT nextval('supplier_supplier_id_seq'::regclass),
  "supplier_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "phone_number" varchar(255) COLLATE "pg_catalog"."default",
  "email" varchar(255) COLLATE "pg_catalog"."default",
  "address" text COLLATE "pg_catalog"."default",
  "payment_method" varchar(255) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of supplier
-- ----------------------------

-- ----------------------------
-- Table structure for wishlist
-- ----------------------------
DROP TABLE IF EXISTS "public"."wishlist";
CREATE TABLE "public"."wishlist" (
  "wishlist_id" int4 NOT NULL DEFAULT nextval('wishlist_wishlist_id_seq'::regclass),
  "customer_id" int4,
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "created_at" timestamp(6) DEFAULT CURRENT_TIMESTAMP
)
;

-- ----------------------------
-- Records of wishlist
-- ----------------------------

-- ----------------------------
-- Table structure for wishlist_item
-- ----------------------------
DROP TABLE IF EXISTS "public"."wishlist_item";
CREATE TABLE "public"."wishlist_item" (
  "wishlist_item_id" int4 NOT NULL DEFAULT nextval('wishlist_item_wishlist_item_id_seq'::regclass),
  "wishlist_id" int4 NOT NULL,
  "book_id" int4 NOT NULL,
  "created_at" timestamp(6) DEFAULT CURRENT_TIMESTAMP
)
;

-- ----------------------------
-- Records of wishlist_item
-- ----------------------------

-- ----------------------------
-- Function structure for remove_from_cart_on_order
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."remove_from_cart_on_order"();
CREATE FUNCTION "public"."remove_from_cart_on_order"()
  RETURNS "pg_catalog"."trigger" AS $BODY$
            BEGIN
                DELETE FROM cart_item
                WHERE book_id = NEW.book_id
                  AND cart_id IN (
                      SELECT cart_id FROM cart
                      WHERE customer_id = (
                          SELECT customer_id FROM "order" WHERE order_id = NEW.order_id
                      )
                  );
                RETURN NEW;
            END;
            $BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."author_author_id_seq"
OWNED BY "public"."author"."author_id";
SELECT setval('"public"."author_author_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."book_book_id_seq"
OWNED BY "public"."book"."book_id";
SELECT setval('"public"."book_book_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."book_category_category_id_seq"
OWNED BY "public"."book_category"."category_id";
SELECT setval('"public"."book_category_category_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."cart_cart_id_seq"
OWNED BY "public"."cart"."cart_id";
SELECT setval('"public"."cart_cart_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."cart_item_cart_item_id_seq"
OWNED BY "public"."cart_item"."cart_item_id";
SELECT setval('"public"."cart_item_cart_item_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."chat_message_message_id_seq"
OWNED BY "public"."chat_message"."message_id";
SELECT setval('"public"."chat_message_message_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."chat_session_session_id_seq"
OWNED BY "public"."chat_session"."session_id";
SELECT setval('"public"."chat_session_session_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."customer_customer_id_seq"
OWNED BY "public"."customer"."customer_id";
SELECT setval('"public"."customer_customer_id_seq"', 4, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."format_format_id_seq"
OWNED BY "public"."format"."format_id";
SELECT setval('"public"."format_format_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."inventory_inventory_id_seq"
OWNED BY "public"."inventory"."inventory_id";
SELECT setval('"public"."inventory_inventory_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."order_cancellation_cancellation_id_seq"
OWNED BY "public"."order_cancellation"."cancellation_id";
SELECT setval('"public"."order_cancellation_cancellation_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."order_item_order_item_id_seq"
OWNED BY "public"."order_item"."order_item_id";
SELECT setval('"public"."order_item_order_item_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."order_order_id_seq"
OWNED BY "public"."order"."order_id";
SELECT setval('"public"."order_order_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."payment_method_payment_method_id_seq"
OWNED BY "public"."payment_method"."payment_method_id";
SELECT setval('"public"."payment_method_payment_method_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."payment_payment_id_seq"
OWNED BY "public"."payment"."payment_id";
SELECT setval('"public"."payment_payment_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."recommendation_recommendation_id_seq"
OWNED BY "public"."recommendation"."recommendation_id";
SELECT setval('"public"."recommendation_recommendation_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."review_review_id_seq"
OWNED BY "public"."review"."review_id";
SELECT setval('"public"."review_review_id_seq"', 4, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."shipping_shipping_id_seq"
OWNED BY "public"."shipping"."shipping_id";
SELECT setval('"public"."shipping_shipping_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sub_category_sub_category_id_seq"
OWNED BY "public"."sub_category"."sub_category_id";
SELECT setval('"public"."sub_category_sub_category_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."supplier_supplier_id_seq"
OWNED BY "public"."supplier"."supplier_id";
SELECT setval('"public"."supplier_supplier_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."wishlist_item_wishlist_item_id_seq"
OWNED BY "public"."wishlist_item"."wishlist_item_id";
SELECT setval('"public"."wishlist_item_wishlist_item_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."wishlist_wishlist_id_seq"
OWNED BY "public"."wishlist"."wishlist_id";
SELECT setval('"public"."wishlist_wishlist_id_seq"', 1, false);

-- ----------------------------
-- Primary Key structure for table author
-- ----------------------------
ALTER TABLE "public"."author" ADD CONSTRAINT "author_pkey" PRIMARY KEY ("author_id");

-- ----------------------------
-- Uniques structure for table book
-- ----------------------------
ALTER TABLE "public"."book" ADD CONSTRAINT "book_isbn_key" UNIQUE ("isbn");

-- ----------------------------
-- Primary Key structure for table book
-- ----------------------------
ALTER TABLE "public"."book" ADD CONSTRAINT "book_pkey" PRIMARY KEY ("book_id");

-- ----------------------------
-- Primary Key structure for table book_author
-- ----------------------------
ALTER TABLE "public"."book_author" ADD CONSTRAINT "book_author_pkey" PRIMARY KEY ("book_id", "author_id");

-- ----------------------------
-- Uniques structure for table book_category
-- ----------------------------
ALTER TABLE "public"."book_category" ADD CONSTRAINT "book_category_category_name_key" UNIQUE ("category_name");

-- ----------------------------
-- Primary Key structure for table book_category
-- ----------------------------
ALTER TABLE "public"."book_category" ADD CONSTRAINT "book_category_pkey" PRIMARY KEY ("category_id");

-- ----------------------------
-- Primary Key structure for table book_recommendation
-- ----------------------------
ALTER TABLE "public"."book_recommendation" ADD CONSTRAINT "book_recommendation_pkey" PRIMARY KEY ("recommendation_id", "book_id");

-- ----------------------------
-- Primary Key structure for table book_sub_category
-- ----------------------------
ALTER TABLE "public"."book_sub_category" ADD CONSTRAINT "book_sub_category_pkey" PRIMARY KEY ("book_id", "sub_category_id");

-- ----------------------------
-- Primary Key structure for table book_supply
-- ----------------------------
ALTER TABLE "public"."book_supply" ADD CONSTRAINT "book_supply_pkey" PRIMARY KEY ("book_id", "supplier_id");

-- ----------------------------
-- Uniques structure for table cart
-- ----------------------------
ALTER TABLE "public"."cart" ADD CONSTRAINT "cart_customer_id_key" UNIQUE ("customer_id");

-- ----------------------------
-- Primary Key structure for table cart
-- ----------------------------
ALTER TABLE "public"."cart" ADD CONSTRAINT "cart_pkey" PRIMARY KEY ("cart_id");

-- ----------------------------
-- Uniques structure for table cart_item
-- ----------------------------
ALTER TABLE "public"."cart_item" ADD CONSTRAINT "cart_item_cart_id_book_id_key" UNIQUE ("cart_id", "book_id");

-- ----------------------------
-- Checks structure for table cart_item
-- ----------------------------
ALTER TABLE "public"."cart_item" ADD CONSTRAINT "cart_item_quantity_check" CHECK (quantity > 0);

-- ----------------------------
-- Primary Key structure for table cart_item
-- ----------------------------
ALTER TABLE "public"."cart_item" ADD CONSTRAINT "cart_item_pkey" PRIMARY KEY ("cart_item_id");

-- ----------------------------
-- Primary Key structure for table chat_message
-- ----------------------------
ALTER TABLE "public"."chat_message" ADD CONSTRAINT "chat_message_pkey" PRIMARY KEY ("message_id");

-- ----------------------------
-- Primary Key structure for table chat_session
-- ----------------------------
ALTER TABLE "public"."chat_session" ADD CONSTRAINT "chat_session_pkey" PRIMARY KEY ("session_id");

-- ----------------------------
-- Uniques structure for table customer
-- ----------------------------
ALTER TABLE "public"."customer" ADD CONSTRAINT "customer_email_key" UNIQUE ("email");

-- ----------------------------
-- Primary Key structure for table customer
-- ----------------------------
ALTER TABLE "public"."customer" ADD CONSTRAINT "customer_pkey" PRIMARY KEY ("customer_id");

-- ----------------------------
-- Primary Key structure for table format
-- ----------------------------
ALTER TABLE "public"."format" ADD CONSTRAINT "format_pkey" PRIMARY KEY ("format_id");

-- ----------------------------
-- Uniques structure for table inventory
-- ----------------------------
ALTER TABLE "public"."inventory" ADD CONSTRAINT "inventory_book_id_key" UNIQUE ("book_id");

-- ----------------------------
-- Checks structure for table inventory
-- ----------------------------
ALTER TABLE "public"."inventory" ADD CONSTRAINT "inventory_quantity_in_stock_check" CHECK (quantity_in_stock >= 0);

-- ----------------------------
-- Primary Key structure for table inventory
-- ----------------------------
ALTER TABLE "public"."inventory" ADD CONSTRAINT "inventory_pkey" PRIMARY KEY ("inventory_id");

-- ----------------------------
-- Primary Key structure for table order
-- ----------------------------
ALTER TABLE "public"."order" ADD CONSTRAINT "order_pkey" PRIMARY KEY ("order_id");

-- ----------------------------
-- Primary Key structure for table order_cancellation
-- ----------------------------
ALTER TABLE "public"."order_cancellation" ADD CONSTRAINT "order_cancellation_pkey" PRIMARY KEY ("cancellation_id");

-- ----------------------------
-- Triggers structure for table order_item
-- ----------------------------
CREATE TRIGGER "trg_remove_from_cart" AFTER INSERT ON "public"."order_item"
FOR EACH ROW
EXECUTE PROCEDURE "public"."remove_from_cart_on_order"();

-- ----------------------------
-- Checks structure for table order_item
-- ----------------------------
ALTER TABLE "public"."order_item" ADD CONSTRAINT "order_item_quantity_check" CHECK (quantity > 0);

-- ----------------------------
-- Primary Key structure for table order_item
-- ----------------------------
ALTER TABLE "public"."order_item" ADD CONSTRAINT "order_item_pkey" PRIMARY KEY ("order_item_id");

-- ----------------------------
-- Primary Key structure for table payment
-- ----------------------------
ALTER TABLE "public"."payment" ADD CONSTRAINT "payment_pkey" PRIMARY KEY ("payment_id");

-- ----------------------------
-- Primary Key structure for table payment_method
-- ----------------------------
ALTER TABLE "public"."payment_method" ADD CONSTRAINT "payment_method_pkey" PRIMARY KEY ("payment_method_id");

-- ----------------------------
-- Primary Key structure for table recommendation
-- ----------------------------
ALTER TABLE "public"."recommendation" ADD CONSTRAINT "recommendation_pkey" PRIMARY KEY ("recommendation_id");

-- ----------------------------
-- Checks structure for table review
-- ----------------------------
ALTER TABLE "public"."review" ADD CONSTRAINT "review_rating_check" CHECK (rating >= 1::numeric AND rating <= 5::numeric);

-- ----------------------------
-- Primary Key structure for table review
-- ----------------------------
ALTER TABLE "public"."review" ADD CONSTRAINT "review_pkey" PRIMARY KEY ("review_id");

-- ----------------------------
-- Primary Key structure for table shipping
-- ----------------------------
ALTER TABLE "public"."shipping" ADD CONSTRAINT "shipping_pkey" PRIMARY KEY ("shipping_id");

-- ----------------------------
-- Primary Key structure for table sub_category
-- ----------------------------
ALTER TABLE "public"."sub_category" ADD CONSTRAINT "sub_category_pkey" PRIMARY KEY ("sub_category_id");

-- ----------------------------
-- Primary Key structure for table supplier
-- ----------------------------
ALTER TABLE "public"."supplier" ADD CONSTRAINT "supplier_pkey" PRIMARY KEY ("supplier_id");

-- ----------------------------
-- Uniques structure for table wishlist
-- ----------------------------
ALTER TABLE "public"."wishlist" ADD CONSTRAINT "wishlist_customer_id_key" UNIQUE ("customer_id");

-- ----------------------------
-- Primary Key structure for table wishlist
-- ----------------------------
ALTER TABLE "public"."wishlist" ADD CONSTRAINT "wishlist_pkey" PRIMARY KEY ("wishlist_id");

-- ----------------------------
-- Uniques structure for table wishlist_item
-- ----------------------------
ALTER TABLE "public"."wishlist_item" ADD CONSTRAINT "wishlist_item_wishlist_id_book_id_key" UNIQUE ("wishlist_id", "book_id");

-- ----------------------------
-- Primary Key structure for table wishlist_item
-- ----------------------------
ALTER TABLE "public"."wishlist_item" ADD CONSTRAINT "wishlist_item_pkey" PRIMARY KEY ("wishlist_item_id");

-- ----------------------------
-- Foreign Keys structure for table book
-- ----------------------------
ALTER TABLE "public"."book" ADD CONSTRAINT "book_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."book_category" ("category_id") ON DELETE SET NULL ON UPDATE NO ACTION;
ALTER TABLE "public"."book" ADD CONSTRAINT "book_format_id_fkey" FOREIGN KEY ("format_id") REFERENCES "public"."format" ("format_id") ON DELETE SET NULL ON UPDATE NO ACTION;
ALTER TABLE "public"."book" ADD CONSTRAINT "book_sub_category_id_fkey" FOREIGN KEY ("sub_category_id") REFERENCES "public"."sub_category" ("sub_category_id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table book_author
-- ----------------------------
ALTER TABLE "public"."book_author" ADD CONSTRAINT "book_author_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "public"."author" ("author_id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "public"."book_author" ADD CONSTRAINT "book_author_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "public"."book" ("book_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table book_recommendation
-- ----------------------------
ALTER TABLE "public"."book_recommendation" ADD CONSTRAINT "book_recommendation_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "public"."book" ("book_id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "public"."book_recommendation" ADD CONSTRAINT "book_recommendation_recommendation_id_fkey" FOREIGN KEY ("recommendation_id") REFERENCES "public"."recommendation" ("recommendation_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table book_sub_category
-- ----------------------------
ALTER TABLE "public"."book_sub_category" ADD CONSTRAINT "book_sub_category_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "public"."book" ("book_id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "public"."book_sub_category" ADD CONSTRAINT "book_sub_category_sub_category_id_fkey" FOREIGN KEY ("sub_category_id") REFERENCES "public"."sub_category" ("sub_category_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table book_supply
-- ----------------------------
ALTER TABLE "public"."book_supply" ADD CONSTRAINT "book_supply_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "public"."book" ("book_id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "public"."book_supply" ADD CONSTRAINT "book_supply_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "public"."supplier" ("supplier_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table cart
-- ----------------------------
ALTER TABLE "public"."cart" ADD CONSTRAINT "cart_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."customer" ("customer_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table cart_item
-- ----------------------------
ALTER TABLE "public"."cart_item" ADD CONSTRAINT "cart_item_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "public"."book" ("book_id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "public"."cart_item" ADD CONSTRAINT "cart_item_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "public"."cart" ("cart_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table chat_message
-- ----------------------------
ALTER TABLE "public"."chat_message" ADD CONSTRAINT "chat_message_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "public"."chat_session" ("session_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table chat_session
-- ----------------------------
ALTER TABLE "public"."chat_session" ADD CONSTRAINT "chat_session_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."customer" ("customer_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table inventory
-- ----------------------------
ALTER TABLE "public"."inventory" ADD CONSTRAINT "inventory_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "public"."customer" ("customer_id") ON DELETE SET NULL ON UPDATE NO ACTION;
ALTER TABLE "public"."inventory" ADD CONSTRAINT "inventory_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "public"."book" ("book_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table order
-- ----------------------------
ALTER TABLE "public"."order" ADD CONSTRAINT "order_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."customer" ("customer_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table order_cancellation
-- ----------------------------
ALTER TABLE "public"."order_cancellation" ADD CONSTRAINT "order_cancellation_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."customer" ("customer_id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "public"."order_cancellation" ADD CONSTRAINT "order_cancellation_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."order" ("order_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table order_item
-- ----------------------------
ALTER TABLE "public"."order_item" ADD CONSTRAINT "order_item_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "public"."book" ("book_id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "public"."order_item" ADD CONSTRAINT "order_item_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."order" ("order_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table payment
-- ----------------------------
ALTER TABLE "public"."payment" ADD CONSTRAINT "payment_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."order" ("order_id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "public"."payment" ADD CONSTRAINT "payment_payment_method_id_fkey" FOREIGN KEY ("payment_method_id") REFERENCES "public"."payment_method" ("payment_method_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table recommendation
-- ----------------------------
ALTER TABLE "public"."recommendation" ADD CONSTRAINT "recommendation_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "public"."book" ("book_id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "public"."recommendation" ADD CONSTRAINT "recommendation_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."customer" ("customer_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table review
-- ----------------------------
ALTER TABLE "public"."review" ADD CONSTRAINT "review_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "public"."book" ("book_id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "public"."review" ADD CONSTRAINT "review_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."customer" ("customer_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table shipping
-- ----------------------------
ALTER TABLE "public"."shipping" ADD CONSTRAINT "shipping_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."order" ("order_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table sub_category
-- ----------------------------
ALTER TABLE "public"."sub_category" ADD CONSTRAINT "sub_category_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."book_category" ("category_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table wishlist
-- ----------------------------
ALTER TABLE "public"."wishlist" ADD CONSTRAINT "wishlist_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."customer" ("customer_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table wishlist_item
-- ----------------------------
ALTER TABLE "public"."wishlist_item" ADD CONSTRAINT "wishlist_item_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "public"."book" ("book_id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "public"."wishlist_item" ADD CONSTRAINT "wishlist_item_wishlist_id_fkey" FOREIGN KEY ("wishlist_id") REFERENCES "public"."wishlist" ("wishlist_id") ON DELETE CASCADE ON UPDATE NO ACTION;
