/*
 Navicat Premium Dump SQL

 Source Server         : Database
 Source Server Type    : PostgreSQL
 Source Server Version : 170005 (170005)
 Source Host           : localhost:5432
 Source Catalog        : postgres
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 170005 (170005)
 File Encoding         : 65001

 Date: 30/07/2025 02:50:23
*/


-- ----------------------------
-- Sequence structure for admin_admin_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."admin_admin_id_seq";
CREATE SEQUENCE "public"."admin_admin_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for admin_notifications_notification_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."admin_notifications_notification_id_seq";
CREATE SEQUENCE "public"."admin_notifications_notification_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

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
MAXVALUE 9223372036854775807
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
-- Sequence structure for supplier_notifications_notification_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."supplier_notifications_notification_id_seq";
CREATE SEQUENCE "public"."supplier_notifications_notification_id_seq" 
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
-- Sequence structure for user_notifications_notification_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."user_notifications_notification_id_seq";
CREATE SEQUENCE "public"."user_notifications_notification_id_seq" 
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
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS "public"."admin";
CREATE TABLE "public"."admin" (
  "admin_id" int4 NOT NULL DEFAULT nextval('admin_admin_id_seq'::regclass),
  "email" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "secret_code" varchar(255) COLLATE "pg_catalog"."default" NOT NULL
)
;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO "public"."admin" VALUES (2, '2205007@ugrad.cse.buet.ac.bd', '7018');

-- ----------------------------
-- Table structure for admin_notifications
-- ----------------------------
DROP TABLE IF EXISTS "public"."admin_notifications";
CREATE TABLE "public"."admin_notifications" (
  "notification_id" int4 NOT NULL DEFAULT nextval('admin_notifications_notification_id_seq'::regclass),
  "admin_id" int4,
  "type" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "title" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "message" text COLLATE "pg_catalog"."default" NOT NULL,
  "data" jsonb,
  "is_read" bool DEFAULT false,
  "created_at" timestamp(6) DEFAULT now()
)
;

-- ----------------------------
-- Records of admin_notifications
-- ----------------------------
INSERT INTO "public"."admin_notifications" VALUES (1, NULL, 'new_signup', 'New User Registration', 'A new user "tahmid hossain" has registered with email: 2205009@ugrad.cse.buet.ac.bd', '{"customer_id": 10, "signup_date": "2025-07-24T17:58:23.867407", "customer_name": "tahmid hossain", "customer_email": "2205009@ugrad.cse.buet.ac.bd"}', 't', '2025-07-24 17:58:23.867407');
INSERT INTO "public"."admin_notifications" VALUES (2, NULL, 'new_review', 'New Book Review', 'A new 5.0-star review has been submitted for "To Kill a Mockingbird" by tahmid hossain.', '{"rating": 5.0, "book_id": 10, "comment": "this is a book anyone should read.", "review_id": 24, "book_title": "To Kill a Mockingbird", "customer_id": 10, "review_date": "2025-07-30T00:48:12.088535", "customer_name": "tahmid hossain", "customer_email": "2205009@ugrad.cse.buet.ac.bd"}', 't', '2025-07-30 00:48:12.088535');
INSERT INTO "public"."admin_notifications" VALUES (3, NULL, 'review_deleted', 'Review Deleted', 'A 5.0-star review for "To Kill a Mockingbird" by tahmid hossain has been deleted.', '{"rating": 5.0, "book_id": 10, "comment": "this is a book anyone should read.", "review_id": 24, "book_title": "To Kill a Mockingbird", "customer_id": 10, "deleted_date": "2025-07-30T00:48:15.693505+06:00", "customer_name": "tahmid hossain", "customer_email": "2205009@ugrad.cse.buet.ac.bd"}', 't', '2025-07-30 00:48:15.693505');

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
INSERT INTO "public"."author" VALUES (14, 'CLRS', NULL, NULL, NULL);

-- ----------------------------
-- Table structure for book
-- ----------------------------
DROP TABLE IF EXISTS "public"."book";
CREATE TABLE "public"."book" (
  "book_id" int4 NOT NULL DEFAULT nextval('book_book_id_seq'::regclass),
  "format_id" int4,
  "title" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "description" text COLLATE "pg_catalog"."default",
  "image_url" text COLLATE "pg_catalog"."default" DEFAULT 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png'::text,
  "price" numeric(10,2) NOT NULL,
  "is_active" bool DEFAULT true,
  "isbn" varchar(20) COLLATE "pg_catalog"."default",
  "publisher" varchar(255) COLLATE "pg_catalog"."default",
  "publication_date" timestamp(6),
  "language" varchar(50) COLLATE "pg_catalog"."default" DEFAULT 'English'::character varying,
  "category_id" int4,
  "sub_category_id" int4,
  "is_featured" bool DEFAULT false,
  "average_rating" numeric(3,2) DEFAULT 0.00,
  "review_count" int4 DEFAULT 0
)
;

-- ----------------------------
-- Records of book
-- ----------------------------
INSERT INTO "public"."book" VALUES (3, 1, 'The Alchemist', 'A fable about following your dream.', 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png', 10.99, 't', '9780061122415', 'HarperOne', '1993-05-01 00:00:00', 'English', NULL, NULL, 'f', 0.00, 0);
INSERT INTO "public"."book" VALUES (1, 1, 'The Silent Patient', 'A psychological thriller about a woman''s act of violence.', 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png', 13.99, 't', '9781250301697', 'Celadon Books', '2019-02-05 00:00:00', 'English', NULL, NULL, 'f', 0.00, 0);
INSERT INTO "public"."book" VALUES (4, 3, 'A Promised Land', 'Barack Obama’s presidential memoir.', 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png', 22.00, 't', '9781524763169', 'Crown Publishing', '2020-11-17 00:00:00', 'English', NULL, NULL, 'f', 0.00, 0);
INSERT INTO "public"."book" VALUES (12, 2, 'Algorithms', 'Bible for computer science and engineering students, and also for competitive programmers. ', 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png', 20.00, 't', '142543523562', 'CLRS Publisher', '2000-07-29 00:00:00', 'English', NULL, NULL, 'f', 0.00, 0);
INSERT INTO "public"."book" VALUES (2, 2, 'Atomic Habits', 'An easy & proven way to build good habits & break bad ones.', 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png', 16.49, 't', '9780735211292', 'Penguin Publishing', '2018-10-16 00:00:00', 'English', NULL, NULL, 'f', 4.00, 1);
INSERT INTO "public"."book" VALUES (6, 2, 'Rich Dad Poor Dad', 'What the rich teach their kids about money.', 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png', 9.49, 't', '9781612680194', 'Plata Publishing', '2011-04-01 00:00:00', 'English', NULL, NULL, 'f', 5.00, 1);
INSERT INTO "public"."book" VALUES (9, 1, 'Sapiens', 'A brief history of humankind.', 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png', 17.49, 't', '9780062316097', 'Harper', '2015-02-10 00:00:00', 'English', NULL, NULL, 'f', 5.00, 1);
INSERT INTO "public"."book" VALUES (5, 1, 'Ikigai', 'The Japanese secret to a long and happy life.', 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png', 11.99, 't', '9780143130727', 'Penguin Books', '2017-08-29 00:00:00', 'English', NULL, NULL, 'f', 2.00, 1);
INSERT INTO "public"."book" VALUES (7, 3, 'The Psychology of Money', 'Timeless lessons on wealth, greed, and happiness.', 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png', 14.00, 't', '9780857197689', 'Harriman House', '2020-09-01 00:00:00', 'English', NULL, NULL, 'f', 5.00, 1);
INSERT INTO "public"."book" VALUES (14, 3, 'Algorithms 3rd Edition', 'Bible for computer science and engineering students, and also for competitive programmers. improved quality of examples.', 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png', 21.00, 't', '142543523563', 'CLRS Publisher', '2000-07-29 00:00:00', 'English', NULL, NULL, 'f', 5.00, 1);
INSERT INTO "public"."book" VALUES (10, 3, 'To Kill a Mockingbird', 'A novel about the serious issues of rape and racial inequality.', 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png', 12.99, 't', '9780061120084', 'Harper Perennial', '2006-05-23 00:00:00', 'English', NULL, NULL, 'f', 0.00, 0);
INSERT INTO "public"."book" VALUES (8, 2, '1984', 'A dystopian social science fiction novel and cautionary tale.', 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png', 8.99, 't', '9780451524935', 'Signet Classic', '1950-07-01 00:00:00', 'English', NULL, NULL, 'f', 0.00, 0);

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
INSERT INTO "public"."book_author" VALUES (12, 14);
INSERT INTO "public"."book_author" VALUES (14, 14);

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
INSERT INTO "public"."book_supply" VALUES (12, 1);
INSERT INTO "public"."book_supply" VALUES (14, 1);

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
INSERT INTO "public"."cart" VALUES (3, 6, '2025-07-15 20:59:54.891959', '2025-07-15 20:59:54.891959');
INSERT INTO "public"."cart" VALUES (4, 8, '2025-07-15 23:06:24.344894', '2025-07-15 23:06:24.344894');
INSERT INTO "public"."cart" VALUES (2, 7, '2025-07-13 15:30:18.952162', '2025-07-13 15:30:18.952162');
INSERT INTO "public"."cart" VALUES (60, NULL, '2025-07-30 02:42:53.386148', '2025-07-30 02:42:53.386148');
INSERT INTO "public"."cart" VALUES (61, NULL, '2025-07-30 02:42:53.424823', '2025-07-30 02:42:53.424823');
INSERT INTO "public"."cart" VALUES (5, 9, '2025-07-19 17:20:37.520056', '2025-07-19 17:51:55.181683');
INSERT INTO "public"."cart" VALUES (7, NULL, '2025-07-25 00:35:04.884153', '2025-07-25 00:35:04.884153');
INSERT INTO "public"."cart" VALUES (8, NULL, '2025-07-25 00:36:12.553298', '2025-07-25 00:36:12.553298');
INSERT INTO "public"."cart" VALUES (1, 3, '2025-07-05 18:32:03.173854', '2025-07-27 00:42:35.034877');
INSERT INTO "public"."cart" VALUES (9, NULL, '2025-07-29 17:39:09.428162', '2025-07-29 17:39:09.428162');
INSERT INTO "public"."cart" VALUES (10, NULL, '2025-07-29 17:39:12.15328', '2025-07-29 17:39:12.15328');
INSERT INTO "public"."cart" VALUES (11, NULL, '2025-07-29 17:39:15.290964', '2025-07-29 17:39:15.290964');
INSERT INTO "public"."cart" VALUES (12, NULL, '2025-07-29 20:33:47.976965', '2025-07-29 20:33:47.976965');
INSERT INTO "public"."cart" VALUES (13, NULL, '2025-07-29 20:33:48.009452', '2025-07-29 20:33:48.009452');
INSERT INTO "public"."cart" VALUES (14, NULL, '2025-07-29 20:43:05.714717', '2025-07-29 20:43:05.714717');
INSERT INTO "public"."cart" VALUES (15, NULL, '2025-07-29 20:43:05.737605', '2025-07-29 20:43:05.737605');
INSERT INTO "public"."cart" VALUES (16, NULL, '2025-07-29 20:43:10.458427', '2025-07-29 20:43:10.458427');
INSERT INTO "public"."cart" VALUES (17, NULL, '2025-07-29 20:43:10.491741', '2025-07-29 20:43:10.491741');
INSERT INTO "public"."cart" VALUES (18, NULL, '2025-07-29 20:43:11.222629', '2025-07-29 20:43:11.222629');
INSERT INTO "public"."cart" VALUES (19, NULL, '2025-07-29 20:43:17.104924', '2025-07-29 20:43:17.104924');
INSERT INTO "public"."cart" VALUES (20, NULL, '2025-07-29 20:43:17.118103', '2025-07-29 20:43:17.118103');
INSERT INTO "public"."cart" VALUES (21, NULL, '2025-07-29 20:43:18.612331', '2025-07-29 20:43:18.612331');
INSERT INTO "public"."cart" VALUES (22, NULL, '2025-07-29 20:43:20.989719', '2025-07-29 20:43:20.989719');
INSERT INTO "public"."cart" VALUES (23, NULL, '2025-07-29 20:43:26.898222', '2025-07-29 20:43:26.898222');
INSERT INTO "public"."cart" VALUES (24, NULL, '2025-07-29 20:43:26.929226', '2025-07-29 20:43:26.929226');
INSERT INTO "public"."cart" VALUES (25, NULL, '2025-07-29 20:43:27.248176', '2025-07-29 20:43:27.248176');
INSERT INTO "public"."cart" VALUES (26, NULL, '2025-07-29 20:43:27.260548', '2025-07-29 20:43:27.260548');
INSERT INTO "public"."cart" VALUES (27, NULL, '2025-07-29 20:43:27.357225', '2025-07-29 20:43:27.357225');
INSERT INTO "public"."cart" VALUES (28, NULL, '2025-07-29 20:43:27.413599', '2025-07-29 20:43:27.413599');
INSERT INTO "public"."cart" VALUES (29, NULL, '2025-07-29 20:43:27.52595', '2025-07-29 20:43:27.52595');
INSERT INTO "public"."cart" VALUES (30, NULL, '2025-07-29 20:43:27.568392', '2025-07-29 20:43:27.568392');
INSERT INTO "public"."cart" VALUES (31, NULL, '2025-07-29 20:43:27.862978', '2025-07-29 20:43:27.862978');
INSERT INTO "public"."cart" VALUES (32, NULL, '2025-07-29 20:43:27.921579', '2025-07-29 20:43:27.921579');
INSERT INTO "public"."cart" VALUES (33, NULL, '2025-07-29 20:43:28.02358', '2025-07-29 20:43:28.02358');
INSERT INTO "public"."cart" VALUES (34, NULL, '2025-07-29 20:43:30.376205', '2025-07-29 20:43:30.376205');
INSERT INTO "public"."cart" VALUES (35, NULL, '2025-07-29 20:43:30.390675', '2025-07-29 20:43:30.390675');
INSERT INTO "public"."cart" VALUES (36, NULL, '2025-07-29 20:43:31.425383', '2025-07-29 20:43:31.425383');
INSERT INTO "public"."cart" VALUES (37, NULL, '2025-07-29 20:43:34.6788', '2025-07-29 20:43:34.6788');
INSERT INTO "public"."cart" VALUES (38, NULL, '2025-07-29 20:43:34.689845', '2025-07-29 20:43:34.689845');
INSERT INTO "public"."cart" VALUES (39, NULL, '2025-07-29 20:43:35.588799', '2025-07-29 20:43:35.588799');
INSERT INTO "public"."cart" VALUES (40, NULL, '2025-07-29 20:43:35.601086', '2025-07-29 20:43:35.601086');
INSERT INTO "public"."cart" VALUES (41, NULL, '2025-07-29 20:43:36.592988', '2025-07-29 20:43:36.592988');
INSERT INTO "public"."cart" VALUES (42, NULL, '2025-07-29 20:43:36.604625', '2025-07-29 20:43:36.604625');
INSERT INTO "public"."cart" VALUES (43, NULL, '2025-07-29 20:43:37.797968', '2025-07-29 20:43:37.797968');
INSERT INTO "public"."cart" VALUES (44, NULL, '2025-07-29 20:43:37.846416', '2025-07-29 20:43:37.846416');
INSERT INTO "public"."cart" VALUES (45, NULL, '2025-07-29 20:43:39.960771', '2025-07-29 20:43:39.960771');
INSERT INTO "public"."cart" VALUES (46, NULL, '2025-07-29 20:43:54.774648', '2025-07-29 20:43:54.774648');
INSERT INTO "public"."cart" VALUES (47, NULL, '2025-07-29 20:43:54.795554', '2025-07-29 20:43:54.795554');
INSERT INTO "public"."cart" VALUES (48, NULL, '2025-07-29 20:43:57.548146', '2025-07-29 20:43:57.548146');
INSERT INTO "public"."cart" VALUES (49, NULL, '2025-07-29 20:43:57.58137', '2025-07-29 20:43:57.58137');
INSERT INTO "public"."cart" VALUES (50, NULL, '2025-07-29 20:47:17.892328', '2025-07-29 20:47:17.892328');
INSERT INTO "public"."cart" VALUES (51, NULL, '2025-07-29 20:47:26.680337', '2025-07-29 20:47:26.680337');
INSERT INTO "public"."cart" VALUES (52, NULL, '2025-07-29 20:47:32.63941', '2025-07-29 20:47:32.63941');
INSERT INTO "public"."cart" VALUES (53, NULL, '2025-07-29 20:57:42.104524', '2025-07-29 20:57:42.104524');
INSERT INTO "public"."cart" VALUES (54, NULL, '2025-07-29 20:57:42.127698', '2025-07-29 20:57:42.127698');
INSERT INTO "public"."cart" VALUES (55, NULL, '2025-07-29 23:59:35.205681', '2025-07-29 23:59:35.205681');
INSERT INTO "public"."cart" VALUES (56, NULL, '2025-07-29 23:59:44.752755', '2025-07-29 23:59:44.752755');
INSERT INTO "public"."cart" VALUES (57, NULL, '2025-07-29 23:59:44.795227', '2025-07-29 23:59:44.795227');
INSERT INTO "public"."cart" VALUES (58, NULL, '2025-07-29 23:59:47.431029', '2025-07-29 23:59:47.431029');
INSERT INTO "public"."cart" VALUES (59, NULL, '2025-07-29 23:59:54.319046', '2025-07-29 23:59:54.319046');
INSERT INTO "public"."cart" VALUES (6, 10, '2025-07-24 17:58:38.594839', '2025-07-30 00:54:10.158988');

-- ----------------------------
-- Table structure for cart_item
-- ----------------------------
DROP TABLE IF EXISTS "public"."cart_item";
CREATE TABLE "public"."cart_item" (
  "cart_item_id" int4 NOT NULL DEFAULT nextval('cart_item_cart_item_id_seq'::regclass),
  "cart_id" int4 NOT NULL,
  "book_id" int4 NOT NULL,
  "quantity" int4 NOT NULL,
  "format_id" int4
)
;

-- ----------------------------
-- Records of cart_item
-- ----------------------------
INSERT INTO "public"."cart_item" VALUES (83, 14, 12, 1, 2);
INSERT INTO "public"."cart_item" VALUES (84, 19, 12, 1, 2);
INSERT INTO "public"."cart_item" VALUES (85, 34, 12, 1, 2);
INSERT INTO "public"."cart_item" VALUES (86, 37, 1, 1, 2);
INSERT INTO "public"."cart_item" VALUES (87, 39, 10, 1, 2);
INSERT INTO "public"."cart_item" VALUES (88, 41, 7, 1, 2);
INSERT INTO "public"."cart_item" VALUES (89, 46, 5, 1, 2);

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
INSERT INTO "public"."chat_message" VALUES (1, 1, 'admin', 'hello', '2025-07-30 02:41:21.317528');
INSERT INTO "public"."chat_message" VALUES (2, 1, 'customer', 'hey i am tahmid', '2025-07-30 02:41:42.018946');
INSERT INTO "public"."chat_message" VALUES (3, 1, 'admin', 'ook', '2025-07-30 02:41:48.786059');

-- ----------------------------
-- Table structure for chat_session
-- ----------------------------
DROP TABLE IF EXISTS "public"."chat_session";
CREATE TABLE "public"."chat_session" (
  "session_id" int4 NOT NULL DEFAULT nextval('chat_session_session_id_seq'::regclass),
  "customer_id" int4,
  "started_at" timestamp(6) DEFAULT CURRENT_TIMESTAMP,
  "ended_at" timestamp(6)
)
;

-- ----------------------------
-- Records of chat_session
-- ----------------------------
INSERT INTO "public"."chat_session" VALUES (1, 10, '2025-07-30 02:40:52.052864', '2025-07-30 02:42:06.616781');

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
  "last_login_at" timestamp(6)
)
;

-- ----------------------------
-- Records of customer
-- ----------------------------
INSERT INTO "public"."customer" VALUES (4, 'mohib080', 'mohibul.sawrav2004@gmail.com', '$2b$10$toBBByEj1LrBcRY4TILZkulC2cEjkvXDPxGDb9m46PilGjqQ1G2gK', NULL, NULL, '2025-07-01 22:56:45.063885', '2025-07-01 22:56:45.063885', NULL);
INSERT INTO "public"."customer" VALUES (8, 'Cristiano Ronaldo', 'sawrav124@gmail.com', '$2b$10$9cdzyxT3Px56eTkJ4IuUUOs41b3bq0pBrVKZEO9D/Wi2gU2/5cU4m', NULL, NULL, '2025-07-15 23:06:22.116455', '2025-07-15 23:06:22.116455', NULL);
INSERT INTO "public"."customer" VALUES (5, 'r', '2205007@ugrad.cse.buet.ac.bd', '$2b$10$v76HTKVs2QtlHEip1iRk3esnbWlUtHLFOg6TrtOKxlnNOzPx4WO12', NULL, NULL, '2025-07-13 15:12:30.156238', '2025-07-13 15:12:30.156238', NULL);
INSERT INTO "public"."customer" VALUES (7, 'saber', '2205017@ugrad.cse.buet.ac.bd', '$2b$10$SGjls5kb.SzOFSRk3R3ywuY4lunIonf9mqUuEmL4UBI5r323XbM6K', NULL, NULL, '2025-07-13 15:30:02.152869', '2025-07-13 15:30:02.152869', '2025-07-13 15:30:17.314285');
INSERT INTO "public"."customer" VALUES (6, 'shafin', '2205001@ugrad.cse.buet.ac.bd', '$2b$10$VTUSxXumJnwlI8ptdABbIOj9eZX9GBlglShYL4WAtME.SIAFSoXmG', NULL, NULL, '2025-07-13 15:26:50.075573', '2025-07-13 15:26:50.075573', '2025-07-15 20:59:53.333532');
INSERT INTO "public"."customer" VALUES (10, 'tahmid hossain', '2205009@ugrad.cse.buet.ac.bd', '$2b$10$FcoIaIggoCNgiXPCibSvGeZjpLbuv6F/rDdQr4YNc/mdAuu8IFgN6', NULL, NULL, '2025-07-24 17:58:23.867407', '2025-07-24 17:58:23.867407', '2025-07-30 02:48:35.1779');
INSERT INTO "public"."customer" VALUES (9, 'Yunus Adullah Rubiyan', 'yunusabdullah407@gmail.com', '$2b$10$wnFztfpbIJj8Pw9mSQ91DekGjBVDx6Tr5vpBERlP.tDecdWZgwfLe', NULL, NULL, '2025-07-19 17:20:25.310647', '2025-07-19 17:20:25.310647', '2025-07-19 17:20:35.91451');
INSERT INTO "public"."customer" VALUES (3, 'Mohibul Sawrav', '2205018@ugrad.cse.buet.ac.bd', '$2b$10$RfOVcY9RIcmrXJ3GZty4Oep21SVA3Kj2rY5wcYCen/6/SCF30hVki', '+8801864316100', 'Dhaka, Bangladesh', '2025-07-01 22:53:03.887927', '2025-07-25 00:15:01.83417', '2025-07-27 01:23:18.503231');

-- ----------------------------
-- Table structure for format
-- ----------------------------
DROP TABLE IF EXISTS "public"."format";
CREATE TABLE "public"."format" (
  "format_id" int4 NOT NULL DEFAULT nextval('format_format_id_seq'::regclass),
  "format_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "factor" float8
)
;

-- ----------------------------
-- Records of format
-- ----------------------------
INSERT INTO "public"."format" VALUES (3, 'eBook', 0.3);
INSERT INTO "public"."format" VALUES (2, 'Hardcover', 1);
INSERT INTO "public"."format" VALUES (1, 'Paperback', 0.8);

-- ----------------------------
-- Table structure for inventory
-- ----------------------------
DROP TABLE IF EXISTS "public"."inventory";
CREATE TABLE "public"."inventory" (
  "inventory_id" int4 NOT NULL DEFAULT nextval('inventory_inventory_id_seq'::regclass),
  "book_id" int4,
  "quantity_in_stock" int4 NOT NULL DEFAULT 0,
  "last_update" timestamp(6) DEFAULT CURRENT_TIMESTAMP,
  "format_id" int4
)
;

-- ----------------------------
-- Records of inventory
-- ----------------------------
INSERT INTO "public"."inventory" VALUES (10, 10, 4, '2025-07-29 16:57:53.538679', 1);
INSERT INTO "public"."inventory" VALUES (4, 4, 0, '2025-07-29 23:51:05.548393', 1);
INSERT INTO "public"."inventory" VALUES (14, 4, 19, '2025-07-29 23:51:05.548393', 2);
INSERT INTO "public"."inventory" VALUES (17, 14, 148, '2025-07-30 00:36:03.646515', 3);
INSERT INTO "public"."inventory" VALUES (1, 1, 6, '2025-07-30 00:36:03.646515', 1);
INSERT INTO "public"."inventory" VALUES (11, 1, 48, '2025-07-30 00:36:03.646515', 2);
INSERT INTO "public"."inventory" VALUES (16, 12, 195, '2025-07-30 00:59:45.820979', 2);
INSERT INTO "public"."inventory" VALUES (3, 3, 8, '2025-07-19 17:21:22.7855', 1);
INSERT INTO "public"."inventory" VALUES (5, 5, 8, '2025-07-19 20:39:03.322376', 1);
INSERT INTO "public"."inventory" VALUES (6, 6, 6, '2025-07-19 20:39:03.322376', 1);
INSERT INTO "public"."inventory" VALUES (7, 7, 7, '2025-07-19 18:46:41.968402', 1);
INSERT INTO "public"."inventory" VALUES (9, 9, 6, '2025-07-19 20:39:03.322376', 1);
INSERT INTO "public"."inventory" VALUES (13, 3, 35, '2025-07-24 20:33:47.64756', 3);
INSERT INTO "public"."inventory" VALUES (15, 5, 13, '2025-07-24 20:35:08.147157', 3);
INSERT INTO "public"."inventory" VALUES (2, 2, 6, '2025-07-29 16:19:02.519917', 1);
INSERT INTO "public"."inventory" VALUES (12, 2, 29, '2025-07-29 16:19:02.519917', 2);
INSERT INTO "public"."inventory" VALUES (8, 8, 2, '2025-07-29 16:22:09.099949', 1);

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
INSERT INTO "public"."order" VALUES (2, 3, 'cancelled', '2025-07-19 16:49:25.738753', 8.99, 'standard', NULL);
INSERT INTO "public"."order" VALUES (3, 9, 'pending', '2025-07-19 17:21:22.7855', 87.94, 'standard', NULL);
INSERT INTO "public"."order" VALUES (5, 3, 'cancelled', '2025-07-19 18:42:33.241558', 16.49, 'standard', NULL);
INSERT INTO "public"."order" VALUES (11, 3, 'cancelled', '2025-07-20 00:52:14.384347', 22.00, 'standard', NULL);
INSERT INTO "public"."order" VALUES (10, 3, 'cancelled', '2025-07-19 21:53:04.581194', 16.49, 'standard', NULL);
INSERT INTO "public"."order" VALUES (9, 3, 'cancelled', '2025-07-19 21:51:21.411696', 8.99, 'standard', NULL);
INSERT INTO "public"."order" VALUES (8, 3, 'cancelled', '2025-07-19 20:39:03.322376', 61.45, 'standard', NULL);
INSERT INTO "public"."order" VALUES (6, 3, 'cancelled', '2025-07-19 18:43:13.048066', 17.49, 'standard', NULL);
INSERT INTO "public"."order" VALUES (7, 3, 'cancelled', '2025-07-19 18:46:41.968402', 14.00, 'standard', NULL);
INSERT INTO "public"."order" VALUES (1, 3, 'cancelled', '2025-07-19 16:47:01.459015', 138.42, 'standard', NULL);
INSERT INTO "public"."order" VALUES (12, 3, 'cancelled', '2025-07-24 01:38:27.218608', 8.90, 'standard', NULL);
INSERT INTO "public"."order" VALUES (13, 3, 'pending', '2025-07-24 17:11:36.702983', 7.70, 'standard', NULL);
INSERT INTO "public"."order" VALUES (15, 3, 'cancelled', '2025-07-27 00:42:51.394143', 7.70, 'standard', NULL);
INSERT INTO "public"."order" VALUES (16, 10, 'pending', '2025-07-29 15:20:56.9246', 8.90, 'standard', NULL);
INSERT INTO "public"."order" VALUES (17, 10, 'pending', '2025-07-29 16:19:02.519917', 27.18, 'standard', NULL);
INSERT INTO "public"."order" VALUES (14, 10, 'cancelled', '2025-07-25 01:40:37.592663', 11.60, 'standard', NULL);
INSERT INTO "public"."order" VALUES (20, 10, 'shipped', '2025-07-29 16:35:15.774541', 11.60, 'standard', NULL);
INSERT INTO "public"."order" VALUES (18, 10, 'shipped', '2025-07-29 16:22:09.099949', 12.19, 'standard', NULL);
INSERT INTO "public"."order" VALUES (21, 10, 'delivered', '2025-07-29 16:48:27.553498', 22.60, 'standard', NULL);
INSERT INTO "public"."order" VALUES (19, 10, 'shipped', '2025-07-29 16:33:23.731374', 22.60, 'standard', NULL);
INSERT INTO "public"."order" VALUES (4, 9, 'delivered', '2025-07-19 17:54:31.269747', 22.00, 'standard', NULL);
INSERT INTO "public"."order" VALUES (22, 10, 'processing', '2025-07-29 16:49:41.948426', 11.60, 'standard', NULL);
INSERT INTO "public"."order" VALUES (23, 10, 'shipped', '2025-07-29 16:57:53.538679', 26.50, 'standard', NULL);
INSERT INTO "public"."order" VALUES (24, 10, 'delivered', '2025-07-29 20:44:36.257324', 11.00, 'standard', NULL);
INSERT INTO "public"."order" VALUES (25, 10, 'delivered', '2025-07-29 20:48:14.99261', 26.00, 'standard', NULL);
INSERT INTO "public"."order" VALUES (26, 10, 'pending', '2025-07-29 23:23:31.358215', 11.00, 'standard', NULL);
INSERT INTO "public"."order" VALUES (27, 10, 'pending', '2025-07-29 23:25:32.153261', 21.00, 'standard', NULL);
INSERT INTO "public"."order" VALUES (28, 10, 'cancelled', '2025-07-29 23:37:15.103082', 11.00, 'standard', NULL);
INSERT INTO "public"."order" VALUES (29, 10, 'pending', '2025-07-29 23:51:05.548393', 22.60, 'standard', 'libri45e0a');
INSERT INTO "public"."order" VALUES (30, 10, 'processing', '2025-07-29 23:58:27.458338', 18.99, 'standard', 'LIBRI5a689');
INSERT INTO "public"."order" VALUES (31, 10, 'pending', '2025-07-30 00:16:04.600035', 11.00, 'standard', 'LIBRIcdac7');
INSERT INTO "public"."order" VALUES (32, 10, 'pending', '2025-07-30 00:36:03.646515', 39.99, 'standard', 'LIBRIab1e1');
INSERT INTO "public"."order" VALUES (33, 10, 'cancelled', '2025-07-30 00:54:49.249997', 205.00, 'standard', 'LIBRI7579a');

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
INSERT INTO "public"."order_cancellation" VALUES (1, 2, 3, 'customer', 'other: FJDH', 'approved');
INSERT INTO "public"."order_cancellation" VALUES (2, 5, 3, 'customer', 'other', 'approved');
INSERT INTO "public"."order_cancellation" VALUES (3, 11, 3, 'customer', 'found_better_price', 'approved');
INSERT INTO "public"."order_cancellation" VALUES (4, 10, 3, 'customer', 'found_better_price', 'approved');
INSERT INTO "public"."order_cancellation" VALUES (5, 9, 3, 'customer', 'shipping_delay', 'approved');
INSERT INTO "public"."order_cancellation" VALUES (6, 8, 3, 'customer', 'other', 'approved');
INSERT INTO "public"."order_cancellation" VALUES (7, 6, 3, 'customer', 'ordered_by_mistake', 'approved');
INSERT INTO "public"."order_cancellation" VALUES (8, 7, 3, 'customer', 'changed_mind', 'approved');
INSERT INTO "public"."order_cancellation" VALUES (9, 1, 3, 'customer', 'changed_mind', 'approved');
INSERT INTO "public"."order_cancellation" VALUES (10, 12, 3, 'customer', 'ordered_by_mistake', 'approved');
INSERT INTO "public"."order_cancellation" VALUES (11, 15, 3, 'customer', 'other', 'approved');
INSERT INTO "public"."order_cancellation" VALUES (12, 14, 10, 'customer', 'ordered_by_mistake', 'approved');
INSERT INTO "public"."order_cancellation" VALUES (13, 23, 10, 'customer', 'ordered_by_mistake: zfgndfgs', 'approved');
INSERT INTO "public"."order_cancellation" VALUES (14, 28, 10, 'customer', 'shipping_delay: dfszgbzsdfbv', 'approved');
INSERT INTO "public"."order_cancellation" VALUES (15, 33, 10, 'customer', 'shipping_delay: sdfg', 'approved');

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
  "item_price" numeric(10,2) NOT NULL,
  "format_id" int4
)
;

-- ----------------------------
-- Records of order_item
-- ----------------------------
INSERT INTO "public"."order_item" VALUES (1, 1, 2, '2025-07-19 16:47:01.459015', 1, 16.49, NULL);
INSERT INTO "public"."order_item" VALUES (2, 1, 3, '2025-07-19 16:47:01.459015', 1, 10.99, NULL);
INSERT INTO "public"."order_item" VALUES (3, 1, 1, '2025-07-19 16:47:01.459015', 1, 13.99, NULL);
INSERT INTO "public"."order_item" VALUES (4, 1, 4, '2025-07-19 16:47:01.459015', 1, 22.00, NULL);
INSERT INTO "public"."order_item" VALUES (5, 1, 5, '2025-07-19 16:47:01.459015', 1, 11.99, NULL);
INSERT INTO "public"."order_item" VALUES (6, 1, 6, '2025-07-19 16:47:01.459015', 1, 9.49, NULL);
INSERT INTO "public"."order_item" VALUES (7, 1, 7, '2025-07-19 16:47:01.459015', 1, 14.00, NULL);
INSERT INTO "public"."order_item" VALUES (8, 1, 8, '2025-07-19 16:47:01.459015', 1, 8.99, NULL);
INSERT INTO "public"."order_item" VALUES (9, 1, 9, '2025-07-19 16:47:01.459015', 1, 17.49, NULL);
INSERT INTO "public"."order_item" VALUES (10, 1, 10, '2025-07-19 16:47:01.459015', 1, 12.99, NULL);
INSERT INTO "public"."order_item" VALUES (11, 2, 8, '2025-07-19 16:49:25.738753', 1, 8.99, NULL);
INSERT INTO "public"."order_item" VALUES (12, 3, 3, '2025-07-19 17:21:22.7855', 1, 10.99, NULL);
INSERT INTO "public"."order_item" VALUES (13, 3, 1, '2025-07-19 17:21:22.7855', 1, 13.99, NULL);
INSERT INTO "public"."order_item" VALUES (14, 3, 6, '2025-07-19 17:21:22.7855', 1, 9.49, NULL);
INSERT INTO "public"."order_item" VALUES (15, 3, 7, '2025-07-19 17:21:22.7855', 1, 14.00, NULL);
INSERT INTO "public"."order_item" VALUES (16, 3, 8, '2025-07-19 17:21:22.7855', 1, 8.99, NULL);
INSERT INTO "public"."order_item" VALUES (17, 3, 9, '2025-07-19 17:21:22.7855', 1, 17.49, NULL);
INSERT INTO "public"."order_item" VALUES (18, 3, 10, '2025-07-19 17:21:22.7855', 1, 12.99, NULL);
INSERT INTO "public"."order_item" VALUES (19, 4, 4, '2025-07-19 17:54:31.269747', 1, 22.00, NULL);
INSERT INTO "public"."order_item" VALUES (20, 5, 2, '2025-07-19 18:42:33.241558', 1, 16.49, 2);
INSERT INTO "public"."order_item" VALUES (21, 6, 9, '2025-07-19 18:43:13.048066', 1, 17.49, 1);
INSERT INTO "public"."order_item" VALUES (22, 7, 7, '2025-07-19 18:46:41.968402', 1, 14.00, 3);
INSERT INTO "public"."order_item" VALUES (23, 8, 5, '2025-07-19 20:39:03.322376', 1, 11.99, 1);
INSERT INTO "public"."order_item" VALUES (24, 8, 6, '2025-07-19 20:39:03.322376', 2, 9.49, 2);
INSERT INTO "public"."order_item" VALUES (25, 8, 9, '2025-07-19 20:39:03.322376', 1, 17.49, 1);
INSERT INTO "public"."order_item" VALUES (26, 8, 10, '2025-07-19 20:39:03.322376', 1, 12.99, 3);
INSERT INTO "public"."order_item" VALUES (27, 9, 8, '2025-07-19 21:51:21.411696', 1, 8.99, 2);
INSERT INTO "public"."order_item" VALUES (28, 10, 2, '2025-07-19 21:53:04.581194', 1, 16.49, 2);
INSERT INTO "public"."order_item" VALUES (29, 11, 4, '2025-07-20 00:52:14.384347', 1, 22.00, NULL);
INSERT INTO "public"."order_item" VALUES (30, 12, 10, '2025-07-24 01:38:27.218608', 1, 3.90, NULL);
INSERT INTO "public"."order_item" VALUES (31, 13, 8, '2025-07-24 17:11:36.702983', 1, 2.70, 3);
INSERT INTO "public"."order_item" VALUES (32, 14, 4, '2025-07-25 01:40:37.592663', 1, 6.60, 3);
INSERT INTO "public"."order_item" VALUES (33, 15, 8, '2025-07-27 00:42:51.394143', 1, 2.70, 3);
INSERT INTO "public"."order_item" VALUES (34, 16, 10, '2025-07-29 15:20:56.9246', 1, 3.90, 3);
INSERT INTO "public"."order_item" VALUES (35, 17, 2, '2025-07-29 16:19:02.519917', 1, 13.19, 1);
INSERT INTO "public"."order_item" VALUES (36, 17, 8, '2025-07-29 16:19:02.519917', 1, 8.99, 2);
INSERT INTO "public"."order_item" VALUES (37, 18, 8, '2025-07-29 16:22:09.099949', 1, 7.19, 1);
INSERT INTO "public"."order_item" VALUES (38, 19, 4, '2025-07-29 16:33:23.731374', 1, 17.60, 1);
INSERT INTO "public"."order_item" VALUES (39, 20, 4, '2025-07-29 16:35:15.774541', 1, 6.60, 3);
INSERT INTO "public"."order_item" VALUES (40, 21, 4, '2025-07-29 16:48:27.553498', 1, 17.60, 1);
INSERT INTO "public"."order_item" VALUES (41, 22, 4, '2025-07-29 16:49:41.948426', 1, 6.60, 3);
INSERT INTO "public"."order_item" VALUES (42, 23, 10, '2025-07-29 16:57:53.538679', 1, 3.90, 3);
INSERT INTO "public"."order_item" VALUES (43, 23, 4, '2025-07-29 16:57:53.538679', 1, 17.60, 1);
INSERT INTO "public"."order_item" VALUES (44, 24, 12, '2025-07-29 20:44:36.257324', 1, 6.00, 3);
INSERT INTO "public"."order_item" VALUES (45, 25, 14, '2025-07-29 20:48:14.99261', 1, 21.00, 2);
INSERT INTO "public"."order_item" VALUES (46, 26, 12, '2025-07-29 23:23:31.358215', 1, 6.00, 3);
INSERT INTO "public"."order_item" VALUES (47, 27, 12, '2025-07-29 23:25:32.153261', 1, 16.00, 1);
INSERT INTO "public"."order_item" VALUES (48, 28, 12, '2025-07-29 23:37:15.103082', 1, 6.00, 3);
INSERT INTO "public"."order_item" VALUES (49, 29, 4, '2025-07-29 23:51:05.548393', 1, 17.60, 1);
INSERT INTO "public"."order_item" VALUES (50, 30, 1, '2025-07-29 23:58:27.458338', 1, 13.99, 2);
INSERT INTO "public"."order_item" VALUES (51, 31, 12, '2025-07-30 00:16:04.600035', 1, 6.00, 3);
INSERT INTO "public"."order_item" VALUES (52, 32, 14, '2025-07-30 00:36:03.646515', 1, 21.00, 2);
INSERT INTO "public"."order_item" VALUES (53, 32, 1, '2025-07-30 00:36:03.646515', 1, 13.99, 2);
INSERT INTO "public"."order_item" VALUES (54, 33, 12, '2025-07-30 00:54:49.249997', 10, 20.00, 2);

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
INSERT INTO "public"."payment" VALUES (1, 32, 3, 39.99, '2025-07-30 00:36:03.646515', '2025-07-30 00:36:03.646515');
INSERT INTO "public"."payment" VALUES (2, 33, 2, 205.00, '2025-07-30 00:54:49.249997', '2025-07-30 00:54:49.249997');

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
INSERT INTO "public"."payment_method" VALUES (1, 'Cash On Delivery');
INSERT INTO "public"."payment_method" VALUES (2, 'Online Banking');
INSERT INTO "public"."payment_method" VALUES (3, 'Debit/Credit Card');

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
INSERT INTO "public"."review" VALUES (15, 2, 3, 4.0, 'nice', '2025-07-15 20:59:18.291643');
INSERT INTO "public"."review" VALUES (17, 14, 10, 5.0, 'I am amazed how beautiful this book is for a peaceful death', '2025-07-29 18:52:40.807944');
INSERT INTO "public"."review" VALUES (18, 6, 10, 5.0, 'adsfgadsfgadfsg', '2025-07-29 19:12:29.479863');
INSERT INTO "public"."review" VALUES (20, 9, 10, 5.0, 'very nice book', '2025-07-29 19:19:46.397094');
INSERT INTO "public"."review" VALUES (21, 7, 10, 5.0, 'o my god', '2025-07-29 19:20:07.808555');
INSERT INTO "public"."review" VALUES (23, 5, 10, 2.0, 'horrible book for me.', '2025-07-30 00:42:16.103088');

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
INSERT INTO "public"."shipping" VALUES (1, 1, '123 Default St', 'Default City', '12345', 'USA', NULL, '2025-07-26 16:47:01.459015');
INSERT INTO "public"."shipping" VALUES (2, 2, '123 Default St', 'Default City', '12345', 'USA', NULL, '2025-07-26 16:49:25.738753');
INSERT INTO "public"."shipping" VALUES (3, 3, '123 Default St', 'Default City', '12345', 'USA', NULL, '2025-07-26 17:21:22.7855');
INSERT INTO "public"."shipping" VALUES (4, 4, 'Dr. MA Rashid Hall, Palashi, BUET', 'Dhaka', '1000', 'Bangladesh', NULL, '2025-07-26 17:54:31.269747');
INSERT INTO "public"."shipping" VALUES (5, 5, 'Dr. MA Rashid Hall, Palashi, BUET', 'Dhaka', '1000', 'Bangladesh', NULL, '2025-07-26 18:42:33.241558');
INSERT INTO "public"."shipping" VALUES (6, 6, 'Dr. MA Rashid Hall, Palashi, BUET', 'Dhaka', '1000', 'Bangladesh', NULL, '2025-07-26 18:43:13.048066');
INSERT INTO "public"."shipping" VALUES (7, 7, 'Dhaka, Bangladesh', '', '', 'USA', NULL, '2025-07-26 18:46:41.968402');
INSERT INTO "public"."shipping" VALUES (8, 8, 'Dr. MA Rashid Hall, Palashi, BUET', 'Dhaka', '1000', 'Bangladesh', NULL, '2025-07-26 20:39:03.322376');
INSERT INTO "public"."shipping" VALUES (9, 9, 'Dr. MA Rashid Hall, Palashi, BUET', 'Dhaka', '1000', 'Bangladesh', NULL, '2025-07-26 21:51:21.411696');
INSERT INTO "public"."shipping" VALUES (10, 10, 'Dhaka, Bangladesh', '', '', 'USA', NULL, '2025-07-26 21:53:04.581194');
INSERT INTO "public"."shipping" VALUES (11, 11, 'Dhaka, Bangladesh', '', '', 'USA', NULL, '2025-07-27 00:52:14.384347');
INSERT INTO "public"."shipping" VALUES (12, 12, 'Dr. MA Rashid Hall, Palashi, BUET', 'Dhaka', '1000', 'Bangladesh', NULL, '2025-07-31 01:38:27.218608');
INSERT INTO "public"."shipping" VALUES (13, 13, 'Dr. MA Rashid Hall, Palashi, BUET', 'Dhaka', '1000', 'Bangladesh', NULL, '2025-07-31 17:11:36.702983');
INSERT INTO "public"."shipping" VALUES (14, 14, 'Dr. MA Rashid Hall, Palashi, BUET', 'Dhaka', '1000', 'Bangladesh', NULL, '2025-08-01 01:40:37.592663');
INSERT INTO "public"."shipping" VALUES (15, 15, 'Dhaka, Bangladesh', '', '', 'USA', NULL, '2025-08-03 00:42:51.394143');
INSERT INTO "public"."shipping" VALUES (16, 16, '', '', '', 'USA', NULL, '2025-08-05 15:20:56.9246');
INSERT INTO "public"."shipping" VALUES (17, 17, '', '', '', 'USA', NULL, '2025-08-05 16:19:02.519917');
INSERT INTO "public"."shipping" VALUES (18, 18, 'Dr. MA Rashid Hall, Palashi, BUET', 'Dhaka', '1000', 'Bangladesh', NULL, '2025-08-05 16:22:09.099949');
INSERT INTO "public"."shipping" VALUES (19, 19, 'Dr. MA Rashid Hall, Palashi, BUET', 'Dhaka', '1000', 'Bangladesh', NULL, '2025-08-05 16:33:23.731374');
INSERT INTO "public"."shipping" VALUES (20, 20, 'Dr. MA Rashid Hall, Palashi, BUET', 'Dhaka', '1000', 'Bangladesh', NULL, '2025-08-05 16:35:15.774541');
INSERT INTO "public"."shipping" VALUES (21, 21, 'Dr. MA Rashid Hall, Palashi, BUET', 'Dhaka', '1000', 'Bangladesh', NULL, '2025-08-05 16:48:27.553498');
INSERT INTO "public"."shipping" VALUES (22, 22, 'Dr. MA Rashid Hall, Palashi, BUET', 'Dhaka', '1000', 'Bangladesh', NULL, '2025-08-05 16:49:41.948426');
INSERT INTO "public"."shipping" VALUES (23, 23, 'Dr. MA Rashid Hall, Palashi, BUET', 'Dhaka', '1000', 'Bangladesh', NULL, '2025-08-05 16:57:53.538679');
INSERT INTO "public"."shipping" VALUES (24, 24, 'sdg', 'Dhaka', '1000', 'Bangladesh', NULL, '2025-08-05 20:44:36.257324');
INSERT INTO "public"."shipping" VALUES (25, 25, 'Dr. MA Rashid Hall, Palashi, BUET', 'Dhaka', '1000', 'Bangladesh', NULL, '2025-08-05 20:48:14.99261');
INSERT INTO "public"."shipping" VALUES (26, 26, 'Dr. MA Rashid Hall, Palashi, BUET', 'Dhaka', '1000', 'Bangladesh', NULL, '2025-08-05 23:23:31.358215');
INSERT INTO "public"."shipping" VALUES (27, 27, 'sdg', 'Dhaka', '1000', 'Bangladesh', NULL, '2025-08-05 23:25:32.153261');
INSERT INTO "public"."shipping" VALUES (28, 28, 'Dr. MA Rashid Hall, Palashi, BUET', 'Dhaka', '1000', 'Bangladesh', NULL, '2025-08-05 23:37:15.103082');
INSERT INTO "public"."shipping" VALUES (29, 29, 'sdg', 'Dhaka', '1000', 'Bangladesh', NULL, '2025-08-05 23:51:05.548393');
INSERT INTO "public"."shipping" VALUES (30, 30, 'Dr. MA Rashid Hall, Palashi, BUET', 'Dhaka', '1000', 'Bangladesh', NULL, '2025-08-05 23:58:27.458338');
INSERT INTO "public"."shipping" VALUES (31, 31, 'Dr. MA Rashid Hall, Palashi, BUET', 'Dhaka', '1000', 'Bangladesh', NULL, '2025-08-06 00:16:04.600035');
INSERT INTO "public"."shipping" VALUES (32, 32, 'sdg', 'Dhaka', '1000', 'Bangladesh', NULL, '2025-08-06 00:36:03.646515');
INSERT INTO "public"."shipping" VALUES (33, 33, 'Dr. MA Rashid Hall, Palashi, BUET', 'Dhaka', '1000', 'Bangladesh', NULL, '2025-08-06 00:54:49.249997');

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
  "payment_method" varchar(255) COLLATE "pg_catalog"."default",
  "hashed_password" text COLLATE "pg_catalog"."default" NOT NULL
)
;

-- ----------------------------
-- Records of supplier
-- ----------------------------
INSERT INTO "public"."supplier" VALUES (1, 'Rubiyan', NULL, '2205007@ugrad.cse.buet.ac.bd', NULL, NULL, '$2b$10$2HYvg35ypn3Rk8Q0nYLhzuh3QvU5FW2Jkdu3QQmStIQ5Jk1oadBwm');

-- ----------------------------
-- Table structure for supplier_notifications
-- ----------------------------
DROP TABLE IF EXISTS "public"."supplier_notifications";
CREATE TABLE "public"."supplier_notifications" (
  "notification_id" int4 NOT NULL DEFAULT nextval('supplier_notifications_notification_id_seq'::regclass),
  "supplier_id" int4,
  "type" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "title" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "message" text COLLATE "pg_catalog"."default" NOT NULL,
  "data" jsonb,
  "is_read" bool DEFAULT false,
  "created_at" timestamp(6) DEFAULT now()
)
;

-- ----------------------------
-- Records of supplier_notifications
-- ----------------------------
INSERT INTO "public"."supplier_notifications" VALUES (1, 1, 'new_review', 'New Review on Your Book', 'A new 5.0-star review has been submitted for "Algorithms" by tahmid hossain.', '{"rating": 5.0, "book_id": 12, "comment": "adfgsfhsdghsfgjstjsgjsrthdfhfghgfdnfgfg\ndafbdfbfdbdfbfdbfdbdfb\nsdfb\nsdfb\n\nsdfb\ndfs\nbdfs\nbsdf\nbfd\nbdf", "review_id": 22, "book_title": "Algorithms", "customer_id": 10, "review_date": "2025-07-29T20:40:36.579136", "customer_name": "tahmid hossain", "customer_email": "2205009@ugrad.cse.buet.ac.bd"}', 't', '2025-07-29 20:40:36.579136');

-- ----------------------------
-- Table structure for user_notifications
-- ----------------------------
DROP TABLE IF EXISTS "public"."user_notifications";
CREATE TABLE "public"."user_notifications" (
  "notification_id" int4 NOT NULL DEFAULT nextval('user_notifications_notification_id_seq'::regclass),
  "customer_id" int4 NOT NULL,
  "type" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "title" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "message" text COLLATE "pg_catalog"."default" NOT NULL,
  "order_id" int4,
  "is_read" bool DEFAULT false,
  "created_at" timestamp(6) DEFAULT now()
)
;

-- ----------------------------
-- Records of user_notifications
-- ----------------------------
INSERT INTO "public"."user_notifications" VALUES (1, 3, 'order_status_update', 'Order Status Updated', 'Your order #15 status has been updated to: cancelled', 15, 't', '2025-07-27 00:43:04.415226');
INSERT INTO "public"."user_notifications" VALUES (9, 9, 'order_status_update', 'Order Status Updated', 'Your order #4 status has been updated to: delivered', 4, 'f', '2025-07-29 18:16:49.747538');
INSERT INTO "public"."user_notifications" VALUES (14, 10, 'order_status_update', 'Order Status Updated', 'Your order #25 status has been updated to: delivered', 25, 't', '2025-07-29 20:49:37.708806');
INSERT INTO "public"."user_notifications" VALUES (13, 10, 'order_status_update', 'Order Status Updated', 'Your order #24 status has been updated to: delivered', 24, 't', '2025-07-29 20:45:48.063019');
INSERT INTO "public"."user_notifications" VALUES (12, 10, 'order_status_update', 'Order Status Updated', 'Your order #23 status has been updated to: shipped', 23, 't', '2025-07-29 20:16:24.772444');
INSERT INTO "public"."user_notifications" VALUES (11, 10, 'order_status_update', 'Order Status Updated', 'Your order #23 status has been updated to: processing', 23, 't', '2025-07-29 18:46:56.066828');
INSERT INTO "public"."user_notifications" VALUES (10, 10, 'order_status_update', 'Order Status Updated', 'Your order #22 status has been updated to: processing', 22, 't', '2025-07-29 18:23:28.998319');
INSERT INTO "public"."user_notifications" VALUES (8, 10, 'order_status_update', 'Order Status Updated', 'Your order #23 status has been updated to: shipped', 23, 't', '2025-07-29 18:16:32.215664');
INSERT INTO "public"."user_notifications" VALUES (7, 10, 'order_status_update', 'Order Status Updated', 'Your order #19 status has been updated to: shipped', 19, 't', '2025-07-29 18:09:41.711184');
INSERT INTO "public"."user_notifications" VALUES (6, 10, 'order_status_update', 'Order Status Updated', 'Your order #21 status has been updated to: delivered', 21, 't', '2025-07-29 18:09:03.262361');
INSERT INTO "public"."user_notifications" VALUES (5, 10, 'order_status_update', 'Order Status Updated', 'Your order #18 status has been updated to: shipped', 18, 't', '2025-07-29 18:08:38.325397');
INSERT INTO "public"."user_notifications" VALUES (4, 10, 'order_status_update', 'Order Status Updated', 'Your order #20 status has been updated to: shipped', 20, 't', '2025-07-29 18:08:09.01359');
INSERT INTO "public"."user_notifications" VALUES (3, 10, 'order_status_update', 'Order Status Updated', 'Your order #23 status has been updated to: cancelled', 23, 't', '2025-07-29 16:58:02.044967');
INSERT INTO "public"."user_notifications" VALUES (2, 10, 'order_status_update', 'Order Status Updated', 'Your order #14 status has been updated to: cancelled', 14, 't', '2025-07-29 16:22:20.060042');
INSERT INTO "public"."user_notifications" VALUES (15, 10, 'order_status_update', 'Order Status Updated', 'Your order #28 status has been updated to: cancelled', 28, 't', '2025-07-29 23:43:05.687648');
INSERT INTO "public"."user_notifications" VALUES (16, 10, 'order_status_update', 'Order Status Updated', 'Your order #30 status has been updated to: processing', 30, 't', '2025-07-30 00:02:09.620861');
INSERT INTO "public"."user_notifications" VALUES (19, 10, 'order_status_update', 'Order Status Updated', 'Your order #33 status has been updated to: cancelled', 33, 't', '2025-07-30 00:59:45.820979');

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
INSERT INTO "public"."wishlist" VALUES (1, 3, NULL, '2025-07-12 20:47:22.521085');
INSERT INTO "public"."wishlist" VALUES (2, 7, NULL, '2025-07-13 15:30:18.956092');
INSERT INTO "public"."wishlist" VALUES (3, 6, NULL, '2025-07-15 20:59:54.895749');
INSERT INTO "public"."wishlist" VALUES (4, 8, NULL, '2025-07-15 23:06:24.347098');
INSERT INTO "public"."wishlist" VALUES (5, 9, NULL, '2025-07-19 17:20:37.714035');
INSERT INTO "public"."wishlist" VALUES (6, 10, NULL, '2025-07-24 17:58:38.378939');
INSERT INTO "public"."wishlist" VALUES (7, NULL, NULL, '2025-07-25 00:35:04.982253');
INSERT INTO "public"."wishlist" VALUES (8, NULL, NULL, '2025-07-29 17:39:09.525867');
INSERT INTO "public"."wishlist" VALUES (9, NULL, NULL, '2025-07-29 20:33:46.185292');
INSERT INTO "public"."wishlist" VALUES (10, NULL, NULL, '2025-07-29 20:33:47.884449');
INSERT INTO "public"."wishlist" VALUES (11, NULL, NULL, '2025-07-29 20:33:47.943994');
INSERT INTO "public"."wishlist" VALUES (12, NULL, NULL, '2025-07-29 20:43:10.502557');
INSERT INTO "public"."wishlist" VALUES (13, NULL, NULL, '2025-07-29 20:43:10.515624');
INSERT INTO "public"."wishlist" VALUES (14, NULL, NULL, '2025-07-29 20:43:26.769239');
INSERT INTO "public"."wishlist" VALUES (15, NULL, NULL, '2025-07-29 20:43:26.782176');
INSERT INTO "public"."wishlist" VALUES (16, NULL, NULL, '2025-07-29 20:43:27.248238');
INSERT INTO "public"."wishlist" VALUES (17, NULL, NULL, '2025-07-29 20:43:27.274235');
INSERT INTO "public"."wishlist" VALUES (18, NULL, NULL, '2025-07-29 20:43:27.364743');
INSERT INTO "public"."wishlist" VALUES (19, NULL, NULL, '2025-07-29 20:43:27.414128');
INSERT INTO "public"."wishlist" VALUES (20, NULL, NULL, '2025-07-29 20:43:27.527372');
INSERT INTO "public"."wishlist" VALUES (21, NULL, NULL, '2025-07-29 20:43:27.568746');
INSERT INTO "public"."wishlist" VALUES (22, NULL, NULL, '2025-07-29 20:43:27.760407');
INSERT INTO "public"."wishlist" VALUES (23, NULL, NULL, '2025-07-29 20:43:27.810818');
INSERT INTO "public"."wishlist" VALUES (24, NULL, NULL, '2025-07-29 20:43:27.862499');
INSERT INTO "public"."wishlist" VALUES (25, NULL, NULL, '2025-07-29 20:43:27.920611');
INSERT INTO "public"."wishlist" VALUES (26, NULL, NULL, '2025-07-29 20:43:37.803309');
INSERT INTO "public"."wishlist" VALUES (27, NULL, NULL, '2025-07-29 20:43:37.846769');
INSERT INTO "public"."wishlist" VALUES (28, NULL, NULL, '2025-07-29 20:43:57.40723');
INSERT INTO "public"."wishlist" VALUES (29, NULL, NULL, '2025-07-29 20:43:57.443273');
INSERT INTO "public"."wishlist" VALUES (30, NULL, NULL, '2025-07-29 20:57:42.140494');
INSERT INTO "public"."wishlist" VALUES (31, NULL, NULL, '2025-07-29 20:57:42.16651');
INSERT INTO "public"."wishlist" VALUES (32, NULL, NULL, '2025-07-29 23:59:44.771134');
INSERT INTO "public"."wishlist" VALUES (33, NULL, NULL, '2025-07-29 23:59:44.804791');
INSERT INTO "public"."wishlist" VALUES (34, NULL, NULL, '2025-07-30 02:42:53.558867');
INSERT INTO "public"."wishlist" VALUES (35, NULL, NULL, '2025-07-30 02:42:53.597595');

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
-- Function structure for notify_admin_new_review
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."notify_admin_new_review"();
CREATE FUNCTION "public"."notify_admin_new_review"()
  RETURNS "pg_catalog"."trigger" AS $BODY$
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
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

-- ----------------------------
-- Function structure for notify_admin_new_signup
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."notify_admin_new_signup"();
CREATE FUNCTION "public"."notify_admin_new_signup"()
  RETURNS "pg_catalog"."trigger" AS $BODY$
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
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

-- ----------------------------
-- Function structure for notify_admin_review_deleted
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."notify_admin_review_deleted"();
CREATE FUNCTION "public"."notify_admin_review_deleted"()
  RETURNS "pg_catalog"."trigger" AS $BODY$
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
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

-- ----------------------------
-- Function structure for notify_supplier_new_review
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."notify_supplier_new_review"();
CREATE FUNCTION "public"."notify_supplier_new_review"()
  RETURNS "pg_catalog"."trigger" AS $BODY$
BEGIN
    -- Insert notifications for all suppliers of the reviewed book
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
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

-- ----------------------------
-- Function structure for notify_supplier_review_deleted
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."notify_supplier_review_deleted"();
CREATE FUNCTION "public"."notify_supplier_review_deleted"()
  RETURNS "pg_catalog"."trigger" AS $BODY$
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
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

-- ----------------------------
-- Function structure for notify_user_order_status_change
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."notify_user_order_status_change"();
CREATE FUNCTION "public"."notify_user_order_status_change"()
  RETURNS "pg_catalog"."trigger" AS $BODY$
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
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

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
-- Function structure for update_book_ratings
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."update_book_ratings"();
CREATE FUNCTION "public"."update_book_ratings"()
  RETURNS "pg_catalog"."trigger" AS $BODY$
BEGIN
    UPDATE book 
    SET 
        average_rating = COALESCE(
            (SELECT AVG(rating) FROM review WHERE book_id = COALESCE(NEW.book_id, OLD.book_id)), 
            0.00
        ),
        review_count = COALESCE(
            (SELECT COUNT(*) FROM review WHERE book_id = COALESCE(NEW.book_id, OLD.book_id)), 
            0
        )
    WHERE book_id = COALESCE(NEW.book_id, OLD.book_id);
    
    RETURN COALESCE(NEW, OLD);
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."admin_admin_id_seq"
OWNED BY "public"."admin"."admin_id";
SELECT setval('"public"."admin_admin_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."admin_notifications_notification_id_seq"
OWNED BY "public"."admin_notifications"."notification_id";
SELECT setval('"public"."admin_notifications_notification_id_seq"', 3, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."author_author_id_seq"
OWNED BY "public"."author"."author_id";
SELECT setval('"public"."author_author_id_seq"', 14, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."book_book_id_seq"
OWNED BY "public"."book"."book_id";
SELECT setval('"public"."book_book_id_seq"', 14, true);

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
SELECT setval('"public"."cart_cart_id_seq"', 61, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."cart_item_cart_item_id_seq"
OWNED BY "public"."cart_item"."cart_item_id";
SELECT setval('"public"."cart_item_cart_item_id_seq"', 103, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."chat_message_message_id_seq"
OWNED BY "public"."chat_message"."message_id";
SELECT setval('"public"."chat_message_message_id_seq"', 3, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."chat_session_session_id_seq"
OWNED BY "public"."chat_session"."session_id";
SELECT setval('"public"."chat_session_session_id_seq"', 1, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."customer_customer_id_seq"
OWNED BY "public"."customer"."customer_id";
SELECT setval('"public"."customer_customer_id_seq"', 10, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."format_format_id_seq"
OWNED BY "public"."format"."format_id";
SELECT setval('"public"."format_format_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."inventory_inventory_id_seq"', 17, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."order_cancellation_cancellation_id_seq"
OWNED BY "public"."order_cancellation"."cancellation_id";
SELECT setval('"public"."order_cancellation_cancellation_id_seq"', 15, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."order_item_order_item_id_seq"
OWNED BY "public"."order_item"."order_item_id";
SELECT setval('"public"."order_item_order_item_id_seq"', 54, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."order_order_id_seq"
OWNED BY "public"."order"."order_id";
SELECT setval('"public"."order_order_id_seq"', 33, true);

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
SELECT setval('"public"."payment_payment_id_seq"', 2, true);

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
SELECT setval('"public"."review_review_id_seq"', 24, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."shipping_shipping_id_seq"
OWNED BY "public"."shipping"."shipping_id";
SELECT setval('"public"."shipping_shipping_id_seq"', 33, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sub_category_sub_category_id_seq"
OWNED BY "public"."sub_category"."sub_category_id";
SELECT setval('"public"."sub_category_sub_category_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."supplier_notifications_notification_id_seq"
OWNED BY "public"."supplier_notifications"."notification_id";
SELECT setval('"public"."supplier_notifications_notification_id_seq"', 1, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."supplier_supplier_id_seq"
OWNED BY "public"."supplier"."supplier_id";
SELECT setval('"public"."supplier_supplier_id_seq"', 1, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."user_notifications_notification_id_seq"
OWNED BY "public"."user_notifications"."notification_id";
SELECT setval('"public"."user_notifications_notification_id_seq"', 19, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."wishlist_item_wishlist_item_id_seq"
OWNED BY "public"."wishlist_item"."wishlist_item_id";
SELECT setval('"public"."wishlist_item_wishlist_item_id_seq"', 20, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."wishlist_wishlist_id_seq"
OWNED BY "public"."wishlist"."wishlist_id";
SELECT setval('"public"."wishlist_wishlist_id_seq"', 35, true);

-- ----------------------------
-- Uniques structure for table admin
-- ----------------------------
ALTER TABLE "public"."admin" ADD CONSTRAINT "admin_email_key" UNIQUE ("email");

-- ----------------------------
-- Primary Key structure for table admin
-- ----------------------------
ALTER TABLE "public"."admin" ADD CONSTRAINT "admin_pkey" PRIMARY KEY ("admin_id");

-- ----------------------------
-- Primary Key structure for table admin_notifications
-- ----------------------------
ALTER TABLE "public"."admin_notifications" ADD CONSTRAINT "admin_notifications_pkey" PRIMARY KEY ("notification_id");

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
-- Triggers structure for table customer
-- ----------------------------
CREATE TRIGGER "trigger_new_user_signup" AFTER INSERT ON "public"."customer"
FOR EACH ROW
EXECUTE PROCEDURE "public"."notify_admin_new_signup"();

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
-- Checks structure for table inventory
-- ----------------------------
ALTER TABLE "public"."inventory" ADD CONSTRAINT "inventory_quantity_in_stock_check" CHECK (quantity_in_stock >= 0);

-- ----------------------------
-- Primary Key structure for table inventory
-- ----------------------------
ALTER TABLE "public"."inventory" ADD CONSTRAINT "inventory_pkey" PRIMARY KEY ("inventory_id");

-- ----------------------------
-- Triggers structure for table order
-- ----------------------------
CREATE TRIGGER "trigger_order_status_update" AFTER UPDATE ON "public"."order"
FOR EACH ROW
EXECUTE PROCEDURE "public"."notify_user_order_status_change"();

-- ----------------------------
-- Primary Key structure for table order
-- ----------------------------
ALTER TABLE "public"."order" ADD CONSTRAINT "order_pkey" PRIMARY KEY ("order_id");

-- ----------------------------
-- Primary Key structure for table order_cancellation
-- ----------------------------
ALTER TABLE "public"."order_cancellation" ADD CONSTRAINT "order_cancellation_pkey" PRIMARY KEY ("cancellation_id");

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
-- Triggers structure for table review
-- ----------------------------
CREATE TRIGGER "trg_update_book_ratings_delete" AFTER DELETE ON "public"."review"
FOR EACH ROW
EXECUTE PROCEDURE "public"."update_book_ratings"();
CREATE TRIGGER "trg_update_book_ratings_insert" AFTER INSERT ON "public"."review"
FOR EACH ROW
EXECUTE PROCEDURE "public"."update_book_ratings"();
CREATE TRIGGER "trg_update_book_ratings_update" AFTER UPDATE ON "public"."review"
FOR EACH ROW
EXECUTE PROCEDURE "public"."update_book_ratings"();
CREATE TRIGGER "trigger_admin_new_review" AFTER INSERT ON "public"."review"
FOR EACH ROW
EXECUTE PROCEDURE "public"."notify_admin_new_review"();
CREATE TRIGGER "trigger_admin_review_deleted" AFTER DELETE ON "public"."review"
FOR EACH ROW
EXECUTE PROCEDURE "public"."notify_admin_review_deleted"();
CREATE TRIGGER "trigger_supplier_new_review" AFTER INSERT ON "public"."review"
FOR EACH ROW
EXECUTE PROCEDURE "public"."notify_supplier_new_review"();
CREATE TRIGGER "trigger_supplier_review_deleted" AFTER DELETE ON "public"."review"
FOR EACH ROW
EXECUTE PROCEDURE "public"."notify_supplier_review_deleted"();

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
-- Primary Key structure for table supplier_notifications
-- ----------------------------
ALTER TABLE "public"."supplier_notifications" ADD CONSTRAINT "supplier_notifications_pkey" PRIMARY KEY ("notification_id");

-- ----------------------------
-- Primary Key structure for table user_notifications
-- ----------------------------
ALTER TABLE "public"."user_notifications" ADD CONSTRAINT "user_notifications_pkey" PRIMARY KEY ("notification_id");

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
-- Foreign Keys structure for table admin_notifications
-- ----------------------------
ALTER TABLE "public"."admin_notifications" ADD CONSTRAINT "admin_notifications_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "public"."admin" ("admin_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

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
ALTER TABLE "public"."inventory" ADD CONSTRAINT "fk_inventory_format" FOREIGN KEY ("format_id") REFERENCES "public"."format" ("format_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
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
-- Foreign Keys structure for table supplier_notifications
-- ----------------------------
ALTER TABLE "public"."supplier_notifications" ADD CONSTRAINT "supplier_notifications_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "public"."supplier" ("supplier_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table user_notifications
-- ----------------------------
ALTER TABLE "public"."user_notifications" ADD CONSTRAINT "user_notifications_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."customer" ("customer_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."user_notifications" ADD CONSTRAINT "user_notifications_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."order" ("order_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table wishlist
-- ----------------------------
ALTER TABLE "public"."wishlist" ADD CONSTRAINT "wishlist_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."customer" ("customer_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table wishlist_item
-- ----------------------------
ALTER TABLE "public"."wishlist_item" ADD CONSTRAINT "wishlist_item_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "public"."book" ("book_id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "public"."wishlist_item" ADD CONSTRAINT "wishlist_item_wishlist_id_fkey" FOREIGN KEY ("wishlist_id") REFERENCES "public"."wishlist" ("wishlist_id") ON DELETE CASCADE ON UPDATE NO ACTION;
