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

 Date: 31/07/2025 22:01:41
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
-- Sequence structure for book_format_book_format_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."book_format_book_format_id_seq";
CREATE SEQUENCE "public"."book_format_book_format_id_seq" 
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
INSERT INTO "public"."admin" VALUES (1, 'mohibul.sawrav2004@gmail.com', '007018');

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
INSERT INTO "public"."admin_notifications" VALUES (1, NULL, 'new_signup', 'New User Registration', 'A new user "Messi" has registered with email: 2205888@ugrad.cse.buet.ac.bd', '{"customer_id": 10, "signup_date": "2025-07-24T02:39:54.913706", "customer_name": "Messi", "customer_email": "2205888@ugrad.cse.buet.ac.bd"}', 't', '2025-07-24 02:39:54.913706');
INSERT INTO "public"."admin_notifications" VALUES (9, NULL, 'new_signup', 'New User Registration', 'A new user "John Smith" has registered with email: john.smith@email.com', '{"customer_id": 51, "signup_date": "2025-07-30T13:33:40.7515", "customer_name": "John Smith", "customer_email": "john.smith@email.com"}', 't', '2025-07-30 13:33:40.7515');
INSERT INTO "public"."admin_notifications" VALUES (3, NULL, 'new_review', 'New Book Review', 'A new 5.0-star review has been submitted for "Atomic Habits" by Mohibul Islam Sawrav.', '{"rating": 5.0, "book_id": 2, "comment": "great book", "review_id": 19, "book_title": "Atomic Habits", "customer_id": 3, "review_date": "2025-07-30T00:17:11.266516", "customer_name": "Mohibul Islam Sawrav", "customer_email": "2205018@ugrad.cse.buet.ac.bd"}', 't', '2025-07-30 00:17:11.266516');
INSERT INTO "public"."admin_notifications" VALUES (2, NULL, 'new_signup', 'New User Registration', 'A new user "Neymar" has registered with email: 2205666@ugrad.cse.buet.ac.bd', '{"customer_id": 11, "signup_date": "2025-07-24T02:48:10.804728", "customer_name": "Neymar", "customer_email": "2205666@ugrad.cse.buet.ac.bd"}', 't', '2025-07-24 02:48:10.804728');
INSERT INTO "public"."admin_notifications" VALUES (4, NULL, 'review_deleted', 'Review Deleted', 'A 5.0-star review for "Atomic Habits" by Mohibul Islam Sawrav has been deleted.', '{"rating": 5.0, "book_id": 2, "comment": "great book", "review_id": 19, "book_title": "Atomic Habits", "customer_id": 3, "deleted_date": "2025-07-30T00:26:31.220061+06:00", "customer_name": "Mohibul Islam Sawrav", "customer_email": "2205018@ugrad.cse.buet.ac.bd"}', 't', '2025-07-30 00:26:31.220061');
INSERT INTO "public"."admin_notifications" VALUES (5, NULL, 'new_review', 'New Book Review', 'A new 5.0-star review has been submitted for "A Promised Land" by Mohibul Islam Sawrav.', '{"rating": 5.0, "book_id": 4, "comment": "great book", "review_id": 20, "book_title": "A Promised Land", "customer_id": 3, "review_date": "2025-07-30T00:31:51.624848", "customer_name": "Mohibul Islam Sawrav", "customer_email": "2205018@ugrad.cse.buet.ac.bd"}', 't', '2025-07-30 00:31:51.624848');
INSERT INTO "public"."admin_notifications" VALUES (6, NULL, 'review_deleted', 'Review Deleted', 'A 5.0-star review for "A Promised Land" by Mohibul Islam Sawrav has been deleted.', '{"rating": 5.0, "book_id": 4, "comment": "great book", "review_id": 20, "book_title": "A Promised Land", "customer_id": 3, "deleted_date": "2025-07-30T00:31:57.240357+06:00", "customer_name": "Mohibul Islam Sawrav", "customer_email": "2205018@ugrad.cse.buet.ac.bd"}', 't', '2025-07-30 00:31:57.240357');
INSERT INTO "public"."admin_notifications" VALUES (7, NULL, 'review_deleted', 'Review Deleted', 'A 5.0-star review for "Harry Potter" by Mohibul Islam Sawrav has been deleted.', '{"rating": 5.0, "book_id": 14, "comment": "Best Fantasy Book I have read ever!!", "review_id": 16, "book_title": "Harry Potter", "customer_id": 3, "deleted_date": "2025-07-30T01:21:42.595752+06:00", "customer_name": "Mohibul Islam Sawrav", "customer_email": "2205018@ugrad.cse.buet.ac.bd"}', 't', '2025-07-30 01:21:42.595752');
INSERT INTO "public"."admin_notifications" VALUES (8, NULL, 'payment_received', 'Payment Received', 'Received payment of $17.00 for Order #34 via Cash On Delivery from "Mohibul Islam Sawrav"', '{"amount": 17.00, "order_id": 34, "customer_id": 3, "payment_date": "2025-07-30T11:10:57.705865", "customer_name": "Mohibul Islam Sawrav", "customer_email": "2205018@ugrad.cse.buet.ac.bd", "payment_method": "Cash On Delivery"}', 't', '2025-07-30 11:10:57.705865');
INSERT INTO "public"."admin_notifications" VALUES (10, NULL, 'new_signup', 'New User Registration', 'A new user "Sarah Johnson" has registered with email: sarah.johnson@email.com', '{"customer_id": 52, "signup_date": "2025-07-30T13:33:40.7515", "customer_name": "Sarah Johnson", "customer_email": "sarah.johnson@email.com"}', 't', '2025-07-30 13:33:40.7515');
INSERT INTO "public"."admin_notifications" VALUES (11, NULL, 'new_signup', 'New User Registration', 'A new user "Michael Brown" has registered with email: michael.brown@email.com', '{"customer_id": 53, "signup_date": "2025-07-30T13:33:40.7515", "customer_name": "Michael Brown", "customer_email": "michael.brown@email.com"}', 't', '2025-07-30 13:33:40.7515');
INSERT INTO "public"."admin_notifications" VALUES (12, NULL, 'new_signup', 'New User Registration', 'A new user "Emily Davis" has registered with email: emily.davis@email.com', '{"customer_id": 54, "signup_date": "2025-07-30T13:33:40.7515", "customer_name": "Emily Davis", "customer_email": "emily.davis@email.com"}', 't', '2025-07-30 13:33:40.7515');
INSERT INTO "public"."admin_notifications" VALUES (13, NULL, 'new_signup', 'New User Registration', 'A new user "David Wilson" has registered with email: david.wilson@email.com', '{"customer_id": 55, "signup_date": "2025-07-30T13:33:40.7515", "customer_name": "David Wilson", "customer_email": "david.wilson@email.com"}', 't', '2025-07-30 13:33:40.7515');
INSERT INTO "public"."admin_notifications" VALUES (14, NULL, 'new_signup', 'New User Registration', 'A new user "Jessica Miller" has registered with email: jessica.miller@email.com', '{"customer_id": 56, "signup_date": "2025-07-30T13:33:40.7515", "customer_name": "Jessica Miller", "customer_email": "jessica.miller@email.com"}', 't', '2025-07-30 13:33:40.7515');
INSERT INTO "public"."admin_notifications" VALUES (15, NULL, 'new_signup', 'New User Registration', 'A new user "Christopher Garcia" has registered with email: christopher.garcia@email.com', '{"customer_id": 57, "signup_date": "2025-07-30T13:33:40.7515", "customer_name": "Christopher Garcia", "customer_email": "christopher.garcia@email.com"}', 't', '2025-07-30 13:33:40.7515');
INSERT INTO "public"."admin_notifications" VALUES (16, NULL, 'new_signup', 'New User Registration', 'A new user "Amanda Martinez" has registered with email: amanda.martinez@email.com', '{"customer_id": 58, "signup_date": "2025-07-30T13:33:40.7515", "customer_name": "Amanda Martinez", "customer_email": "amanda.martinez@email.com"}', 't', '2025-07-30 13:33:40.7515');
INSERT INTO "public"."admin_notifications" VALUES (17, NULL, 'new_signup', 'New User Registration', 'A new user "Matthew Rodriguez" has registered with email: matthew.rodriguez@email.com', '{"customer_id": 59, "signup_date": "2025-07-30T13:33:40.7515", "customer_name": "Matthew Rodriguez", "customer_email": "matthew.rodriguez@email.com"}', 't', '2025-07-30 13:33:40.7515');
INSERT INTO "public"."admin_notifications" VALUES (18, NULL, 'new_signup', 'New User Registration', 'A new user "Ashley Lopez" has registered with email: ashley.lopez@email.com', '{"customer_id": 60, "signup_date": "2025-07-30T13:33:40.7515", "customer_name": "Ashley Lopez", "customer_email": "ashley.lopez@email.com"}', 't', '2025-07-30 13:33:40.7515');
INSERT INTO "public"."admin_notifications" VALUES (19, NULL, 'new_signup', 'New User Registration', 'A new user "Joshua Gonzalez" has registered with email: joshua.gonzalez@email.com', '{"customer_id": 61, "signup_date": "2025-07-30T13:33:40.7515", "customer_name": "Joshua Gonzalez", "customer_email": "joshua.gonzalez@email.com"}', 't', '2025-07-30 13:33:40.7515');
INSERT INTO "public"."admin_notifications" VALUES (20, NULL, 'new_signup', 'New User Registration', 'A new user "Nicole Wilson" has registered with email: nicole.wilson@email.com', '{"customer_id": 62, "signup_date": "2025-07-30T13:33:40.7515", "customer_name": "Nicole Wilson", "customer_email": "nicole.wilson@email.com"}', 't', '2025-07-30 13:33:40.7515');
INSERT INTO "public"."admin_notifications" VALUES (21, NULL, 'new_signup', 'New User Registration', 'A new user "Daniel Anderson" has registered with email: daniel.anderson@email.com', '{"customer_id": 63, "signup_date": "2025-07-30T13:33:40.7515", "customer_name": "Daniel Anderson", "customer_email": "daniel.anderson@email.com"}', 't', '2025-07-30 13:33:40.7515');
INSERT INTO "public"."admin_notifications" VALUES (22, NULL, 'new_signup', 'New User Registration', 'A new user "Stephanie Thomas" has registered with email: stephanie.thomas@email.com', '{"customer_id": 64, "signup_date": "2025-07-30T13:33:40.7515", "customer_name": "Stephanie Thomas", "customer_email": "stephanie.thomas@email.com"}', 't', '2025-07-30 13:33:40.7515');
INSERT INTO "public"."admin_notifications" VALUES (23, NULL, 'new_signup', 'New User Registration', 'A new user "Ryan Jackson" has registered with email: ryan.jackson@email.com', '{"customer_id": 65, "signup_date": "2025-07-30T13:33:40.7515", "customer_name": "Ryan Jackson", "customer_email": "ryan.jackson@email.com"}', 't', '2025-07-30 13:33:40.7515');
INSERT INTO "public"."admin_notifications" VALUES (24, NULL, 'new_signup', 'New User Registration', 'A new user "Michelle White" has registered with email: michelle.white@email.com', '{"customer_id": 66, "signup_date": "2025-07-30T13:33:40.7515", "customer_name": "Michelle White", "customer_email": "michelle.white@email.com"}', 't', '2025-07-30 13:33:40.7515');
INSERT INTO "public"."admin_notifications" VALUES (25, NULL, 'new_signup', 'New User Registration', 'A new user "Kevin Harris" has registered with email: kevin.harris@email.com', '{"customer_id": 67, "signup_date": "2025-07-30T13:33:40.7515", "customer_name": "Kevin Harris", "customer_email": "kevin.harris@email.com"}', 't', '2025-07-30 13:33:40.7515');
INSERT INTO "public"."admin_notifications" VALUES (26, NULL, 'new_signup', 'New User Registration', 'A new user "Lisa Martin" has registered with email: lisa.martin@email.com', '{"customer_id": 68, "signup_date": "2025-07-30T13:33:40.7515", "customer_name": "Lisa Martin", "customer_email": "lisa.martin@email.com"}', 't', '2025-07-30 13:33:40.7515');
INSERT INTO "public"."admin_notifications" VALUES (27, NULL, 'new_signup', 'New User Registration', 'A new user "Jason Thompson" has registered with email: jason.thompson@email.com', '{"customer_id": 69, "signup_date": "2025-07-30T13:33:40.7515", "customer_name": "Jason Thompson", "customer_email": "jason.thompson@email.com"}', 't', '2025-07-30 13:33:40.7515');
INSERT INTO "public"."admin_notifications" VALUES (28, NULL, 'new_signup', 'New User Registration', 'A new user "Laura Garcia" has registered with email: laura.garcia@email.com', '{"customer_id": 70, "signup_date": "2025-07-30T13:33:40.7515", "customer_name": "Laura Garcia", "customer_email": "laura.garcia@email.com"}', 't', '2025-07-30 13:33:40.7515');
INSERT INTO "public"."admin_notifications" VALUES (29, NULL, 'new_signup', 'New User Registration', 'A new user "Andrew Martinez" has registered with email: andrew.martinez@email.com', '{"customer_id": 71, "signup_date": "2025-07-30T13:33:40.7515", "customer_name": "Andrew Martinez", "customer_email": "andrew.martinez@email.com"}', 't', '2025-07-30 13:33:40.7515');
INSERT INTO "public"."admin_notifications" VALUES (30, NULL, 'new_signup', 'New User Registration', 'A new user "Crystal Robinson" has registered with email: crystal.robinson@email.com', '{"customer_id": 72, "signup_date": "2025-07-30T13:33:40.7515", "customer_name": "Crystal Robinson", "customer_email": "crystal.robinson@email.com"}', 't', '2025-07-30 13:33:40.7515');
INSERT INTO "public"."admin_notifications" VALUES (31, NULL, 'new_signup', 'New User Registration', 'A new user "Brian Clark" has registered with email: brian.clark@email.com', '{"customer_id": 73, "signup_date": "2025-07-30T13:33:40.7515", "customer_name": "Brian Clark", "customer_email": "brian.clark@email.com"}', 't', '2025-07-30 13:33:40.7515');
INSERT INTO "public"."admin_notifications" VALUES (32, NULL, 'new_signup', 'New User Registration', 'A new user "Jennifer Rodriguez" has registered with email: jennifer.rodriguez@email.com', '{"customer_id": 74, "signup_date": "2025-07-30T13:33:40.7515", "customer_name": "Jennifer Rodriguez", "customer_email": "jennifer.rodriguez@email.com"}', 't', '2025-07-30 13:33:40.7515');
INSERT INTO "public"."admin_notifications" VALUES (33, NULL, 'new_signup', 'New User Registration', 'A new user "Tyler Lewis" has registered with email: tyler.lewis@email.com', '{"customer_id": 75, "signup_date": "2025-07-30T13:33:40.7515", "customer_name": "Tyler Lewis", "customer_email": "tyler.lewis@email.com"}', 't', '2025-07-30 13:33:40.7515');
INSERT INTO "public"."admin_notifications" VALUES (34, NULL, 'new_signup', 'New User Registration', 'A new user "Karen Lee" has registered with email: karen.lee@email.com', '{"customer_id": 76, "signup_date": "2025-07-30T13:33:40.7515", "customer_name": "Karen Lee", "customer_email": "karen.lee@email.com"}', 't', '2025-07-30 13:33:40.7515');
INSERT INTO "public"."admin_notifications" VALUES (35, NULL, 'new_signup', 'New User Registration', 'A new user "Adam Walker" has registered with email: adam.walker@email.com', '{"customer_id": 77, "signup_date": "2025-07-30T13:33:40.7515", "customer_name": "Adam Walker", "customer_email": "adam.walker@email.com"}', 't', '2025-07-30 13:33:40.7515');
INSERT INTO "public"."admin_notifications" VALUES (36, NULL, 'new_signup', 'New User Registration', 'A new user "Maria Hall" has registered with email: maria.hall@email.com', '{"customer_id": 78, "signup_date": "2025-07-30T13:33:40.7515", "customer_name": "Maria Hall", "customer_email": "maria.hall@email.com"}', 't', '2025-07-30 13:33:40.7515');
INSERT INTO "public"."admin_notifications" VALUES (37, NULL, 'new_signup', 'New User Registration', 'A new user "Mark Allen" has registered with email: mark.allen@email.com', '{"customer_id": 79, "signup_date": "2025-07-30T13:33:40.7515", "customer_name": "Mark Allen", "customer_email": "mark.allen@email.com"}', 't', '2025-07-30 13:33:40.7515');
INSERT INTO "public"."admin_notifications" VALUES (38, NULL, 'new_signup', 'New User Registration', 'A new user "Janet Young" has registered with email: janet.young@email.com', '{"customer_id": 80, "signup_date": "2025-07-30T13:33:40.7515", "customer_name": "Janet Young", "customer_email": "janet.young@email.com"}', 't', '2025-07-30 13:33:40.7515');
INSERT INTO "public"."admin_notifications" VALUES (39, NULL, 'new_signup', 'New User Registration', 'A new user "Scott King" has registered with email: scott.king@email.com', '{"customer_id": 81, "signup_date": "2025-07-30T13:33:40.7515", "customer_name": "Scott King", "customer_email": "scott.king@email.com"}', 't', '2025-07-30 13:33:40.7515');
INSERT INTO "public"."admin_notifications" VALUES (40, NULL, 'new_signup', 'New User Registration', 'A new user "Donna Wright" has registered with email: donna.wright@email.com', '{"customer_id": 82, "signup_date": "2025-07-30T13:33:40.7515", "customer_name": "Donna Wright", "customer_email": "donna.wright@email.com"}', 't', '2025-07-30 13:33:40.7515');
INSERT INTO "public"."admin_notifications" VALUES (41, NULL, 'new_signup', 'New User Registration', 'A new user "Gary Lopez" has registered with email: gary.lopez@email.com', '{"customer_id": 83, "signup_date": "2025-07-30T13:33:40.7515", "customer_name": "Gary Lopez", "customer_email": "gary.lopez@email.com"}', 't', '2025-07-30 13:33:40.7515');
INSERT INTO "public"."admin_notifications" VALUES (42, NULL, 'new_signup', 'New User Registration', 'A new user "Carolyn Hill" has registered with email: carolyn.hill@email.com', '{"customer_id": 84, "signup_date": "2025-07-30T13:33:40.7515", "customer_name": "Carolyn Hill", "customer_email": "carolyn.hill@email.com"}', 't', '2025-07-30 13:33:40.7515');
INSERT INTO "public"."admin_notifications" VALUES (43, NULL, 'new_signup', 'New User Registration', 'A new user "Timothy Green" has registered with email: timothy.green@email.com', '{"customer_id": 85, "signup_date": "2025-07-30T13:33:40.7515", "customer_name": "Timothy Green", "customer_email": "timothy.green@email.com"}', 't', '2025-07-30 13:33:40.7515');
INSERT INTO "public"."admin_notifications" VALUES (44, NULL, 'new_signup', 'New User Registration', 'A new user "Sharon Adams" has registered with email: sharon.adams@email.com', '{"customer_id": 86, "signup_date": "2025-07-30T13:33:40.7515", "customer_name": "Sharon Adams", "customer_email": "sharon.adams@email.com"}', 't', '2025-07-30 13:33:40.7515');
INSERT INTO "public"."admin_notifications" VALUES (45, NULL, 'new_signup', 'New User Registration', 'A new user "Steven Baker" has registered with email: steven.baker@email.com', '{"customer_id": 87, "signup_date": "2025-07-30T13:33:40.7515", "customer_name": "Steven Baker", "customer_email": "steven.baker@email.com"}', 't', '2025-07-30 13:33:40.7515');
INSERT INTO "public"."admin_notifications" VALUES (46, NULL, 'new_signup', 'New User Registration', 'A new user "Kimberly Gonzalez" has registered with email: kimberly.gonzalez@email.com', '{"customer_id": 88, "signup_date": "2025-07-30T13:33:40.7515", "customer_name": "Kimberly Gonzalez", "customer_email": "kimberly.gonzalez@email.com"}', 't', '2025-07-30 13:33:40.7515');
INSERT INTO "public"."admin_notifications" VALUES (47, NULL, 'new_signup', 'New User Registration', 'A new user "Anthony Nelson" has registered with email: anthony.nelson@email.com', '{"customer_id": 89, "signup_date": "2025-07-30T13:33:40.7515", "customer_name": "Anthony Nelson", "customer_email": "anthony.nelson@email.com"}', 't', '2025-07-30 13:33:40.7515');
INSERT INTO "public"."admin_notifications" VALUES (48, NULL, 'new_signup', 'New User Registration', 'A new user "Lisa Carter" has registered with email: lisa.carter@email.com', '{"customer_id": 90, "signup_date": "2025-07-30T13:33:40.7515", "customer_name": "Lisa Carter", "customer_email": "lisa.carter@email.com"}', 't', '2025-07-30 13:33:40.7515');
INSERT INTO "public"."admin_notifications" VALUES (49, NULL, 'new_signup', 'New User Registration', 'A new user "Paul Mitchell" has registered with email: paul.mitchell@email.com', '{"customer_id": 91, "signup_date": "2025-07-30T13:33:40.7515", "customer_name": "Paul Mitchell", "customer_email": "paul.mitchell@email.com"}', 't', '2025-07-30 13:33:40.7515');
INSERT INTO "public"."admin_notifications" VALUES (50, NULL, 'new_signup', 'New User Registration', 'A new user "Helen Perez" has registered with email: helen.perez@email.com', '{"customer_id": 92, "signup_date": "2025-07-30T13:33:40.7515", "customer_name": "Helen Perez", "customer_email": "helen.perez@email.com"}', 't', '2025-07-30 13:33:40.7515');
INSERT INTO "public"."admin_notifications" VALUES (51, NULL, 'new_signup', 'New User Registration', 'A new user "Kenneth Roberts" has registered with email: kenneth.roberts@email.com', '{"customer_id": 93, "signup_date": "2025-07-30T13:33:40.7515", "customer_name": "Kenneth Roberts", "customer_email": "kenneth.roberts@email.com"}', 't', '2025-07-30 13:33:40.7515');
INSERT INTO "public"."admin_notifications" VALUES (52, NULL, 'new_signup', 'New User Registration', 'A new user "Dorothy Turner" has registered with email: dorothy.turner@email.com', '{"customer_id": 94, "signup_date": "2025-07-30T13:33:40.7515", "customer_name": "Dorothy Turner", "customer_email": "dorothy.turner@email.com"}', 't', '2025-07-30 13:33:40.7515');
INSERT INTO "public"."admin_notifications" VALUES (53, NULL, 'new_signup', 'New User Registration', 'A new user "Edward Phillips" has registered with email: edward.phillips@email.com', '{"customer_id": 95, "signup_date": "2025-07-30T13:33:40.7515", "customer_name": "Edward Phillips", "customer_email": "edward.phillips@email.com"}', 't', '2025-07-30 13:33:40.7515');
INSERT INTO "public"."admin_notifications" VALUES (54, NULL, 'new_signup', 'New User Registration', 'A new user "Betty Campbell" has registered with email: betty.campbell@email.com', '{"customer_id": 96, "signup_date": "2025-07-30T13:33:40.7515", "customer_name": "Betty Campbell", "customer_email": "betty.campbell@email.com"}', 't', '2025-07-30 13:33:40.7515');
INSERT INTO "public"."admin_notifications" VALUES (55, NULL, 'new_signup', 'New User Registration', 'A new user "Ronald Parker" has registered with email: ronald.parker@email.com', '{"customer_id": 97, "signup_date": "2025-07-30T13:33:40.7515", "customer_name": "Ronald Parker", "customer_email": "ronald.parker@email.com"}', 't', '2025-07-30 13:33:40.7515');
INSERT INTO "public"."admin_notifications" VALUES (56, NULL, 'new_signup', 'New User Registration', 'A new user "Sandra Evans" has registered with email: sandra.evans@email.com', '{"customer_id": 98, "signup_date": "2025-07-30T13:33:40.7515", "customer_name": "Sandra Evans", "customer_email": "sandra.evans@email.com"}', 't', '2025-07-30 13:33:40.7515');
INSERT INTO "public"."admin_notifications" VALUES (57, NULL, 'new_signup', 'New User Registration', 'A new user "Jerry Edwards" has registered with email: jerry.edwards@email.com', '{"customer_id": 99, "signup_date": "2025-07-30T13:33:40.7515", "customer_name": "Jerry Edwards", "customer_email": "jerry.edwards@email.com"}', 't', '2025-07-30 13:33:40.7515');
INSERT INTO "public"."admin_notifications" VALUES (58, NULL, 'new_signup', 'New User Registration', 'A new user "Nancy Collins" has registered with email: nancy.collins@email.com', '{"customer_id": 100, "signup_date": "2025-07-30T13:33:40.7515", "customer_name": "Nancy Collins", "customer_email": "nancy.collins@email.com"}', 't', '2025-07-30 13:33:40.7515');
INSERT INTO "public"."admin_notifications" VALUES (59, NULL, 'new_review', 'New Book Review', 'A new 5.0-star review has been submitted for "The Night Circus" by John Smith.', '{"rating": 5.0, "book_id": 103, "comment": "Insightful and practical guide to habit formation. Changed my routine for the better!", "review_id": 24, "book_title": "The Night Circus", "customer_id": 51, "review_date": "2025-07-01T14:22:10", "customer_name": "John Smith", "customer_email": "john.smith@email.com"}', 't', '2025-07-30 13:34:08.369729');
INSERT INTO "public"."admin_notifications" VALUES (60, NULL, 'new_review', 'New Book Review', 'A new 4.0-star review has been submitted for "Where the Crawdads Sing" by Sarah Johnson.', '{"rating": 4.0, "book_id": 104, "comment": "Well written, easy to follow. Some repetitive sections though.", "review_id": 25, "book_title": "Where the Crawdads Sing", "customer_id": 52, "review_date": "2025-06-15T10:05:30", "customer_name": "Sarah Johnson", "customer_email": "sarah.johnson@email.com"}', 't', '2025-07-30 13:34:08.369729');
INSERT INTO "public"."admin_notifications" VALUES (61, NULL, 'new_review', 'New Book Review', 'A new 5.0-star review has been submitted for "Dune" by Michael Brown.', '{"rating": 5.0, "book_id": 105, "comment": "Life-changing book with actionable advice. Highly recommend!", "review_id": 26, "book_title": "Dune", "customer_id": 53, "review_date": "2025-07-22T09:30:45", "customer_name": "Michael Brown", "customer_email": "michael.brown@email.com"}', 't', '2025-07-30 13:34:08.369729');
INSERT INTO "public"."admin_notifications" VALUES (62, NULL, 'new_review', 'New Book Review', 'A new 4.0-star review has been submitted for "Dune" by Emily Davis.', '{"rating": 4.0, "book_id": 105, "comment": "Good introduction to personal finance, but a bit anecdotal.", "review_id": 27, "book_title": "Dune", "customer_id": 54, "review_date": "2025-05-12T16:45:00", "customer_name": "Emily Davis", "customer_email": "emily.davis@email.com"}', 't', '2025-07-30 13:34:08.398102');
INSERT INTO "public"."admin_notifications" VALUES (63, NULL, 'new_review', 'New Book Review', 'A new 5.0-star review has been submitted for "Thinking, Fast and Slow" by David Wilson.', '{"rating": 5.0, "book_id": 106, "comment": "Excellent concepts on money mindset. Inspired me to invest.", "review_id": 28, "book_title": "Thinking, Fast and Slow", "customer_id": 55, "review_date": "2025-07-10T11:20:00", "customer_name": "David Wilson", "customer_email": "david.wilson@email.com"}', 't', '2025-07-30 13:34:08.398102');
INSERT INTO "public"."admin_notifications" VALUES (64, NULL, 'new_review', 'New Book Review', 'A new 3.5-star review has been submitted for "Circe" by Christopher Garcia.', '{"rating": 3.5, "book_id": 108, "comment": "Valuable points but some ideas feel outdated.", "review_id": 29, "book_title": "Circe", "customer_id": 57, "review_date": "2025-07-25T18:35:20", "customer_name": "Christopher Garcia", "customer_email": "christopher.garcia@email.com"}', 't', '2025-07-30 13:34:08.398102');
INSERT INTO "public"."admin_notifications" VALUES (65, NULL, 'new_review', 'New Book Review', 'A new 5.0-star review has been submitted for "The Power of Habit" by Amanda Martinez.', '{"rating": 5.0, "book_id": 109, "comment": "Fascinating overview of human history. A must-read for everyone.", "review_id": 30, "book_title": "The Power of Habit", "customer_id": 58, "review_date": "2025-06-01T13:00:00", "customer_name": "Amanda Martinez", "customer_email": "amanda.martinez@email.com"}', 't', '2025-07-30 13:34:08.40678');
INSERT INTO "public"."admin_notifications" VALUES (66, NULL, 'new_review', 'New Book Review', 'A new 4.5-star review has been submitted for "The Power of Habit" by Matthew Rodriguez.', '{"rating": 4.5, "book_id": 109, "comment": "Very engaging and thought-provoking.", "review_id": 31, "book_title": "The Power of Habit", "customer_id": 59, "review_date": "2025-07-05T15:23:45", "customer_name": "Matthew Rodriguez", "customer_email": "matthew.rodriguez@email.com"}', 't', '2025-07-30 13:34:08.40678');
INSERT INTO "public"."admin_notifications" VALUES (67, NULL, 'new_review', 'New Book Review', 'A new 5.0-star review has been submitted for "The Power of Habit" by Ashley Lopez.', '{"rating": 5.0, "book_id": 109, "comment": "Eye-opening book with deep insights into our origins.", "review_id": 32, "book_title": "The Power of Habit", "customer_id": 60, "review_date": "2025-07-20T12:10:30", "customer_name": "Ashley Lopez", "customer_email": "ashley.lopez@email.com"}', 't', '2025-07-30 13:34:08.40678');
INSERT INTO "public"."admin_notifications" VALUES (68, NULL, 'new_review', 'New Book Review', 'A new 4.0-star review has been submitted for "The Subtle Art of Not Giving a F*ck" by Joshua Gonzalez.', '{"rating": 4.0, "book_id": 110, "comment": "Beautiful philosophy and inspiring stories; helped me find purpose.", "review_id": 33, "book_title": "The Subtle Art of Not Giving a F*ck", "customer_id": 61, "review_date": "2025-06-18T08:45:50", "customer_name": "Joshua Gonzalez", "customer_email": "joshua.gonzalez@email.com"}', 't', '2025-07-30 13:34:08.410052');
INSERT INTO "public"."admin_notifications" VALUES (69, NULL, 'new_review', 'New Book Review', 'A new 3.0-star review has been submitted for "The Subtle Art of Not Giving a F*ck" by Nicole Wilson.', '{"rating": 3.0, "book_id": 110, "comment": "Interesting cultural insights but some chapters felt slow.", "review_id": 34, "book_title": "The Subtle Art of Not Giving a F*ck", "customer_id": 62, "review_date": "2025-07-12T10:00:00", "customer_name": "Nicole Wilson", "customer_email": "nicole.wilson@email.com"}', 't', '2025-07-30 13:34:08.410052');
INSERT INTO "public"."admin_notifications" VALUES (70, NULL, 'new_review', 'New Book Review', 'A new 4.0-star review has been submitted for "The Subtle Art of Not Giving a F*ck" by Daniel Anderson.', '{"rating": 4.0, "book_id": 110, "comment": "A calming read that encourages mindfulness and joy.", "review_id": 35, "book_title": "The Subtle Art of Not Giving a F*ck", "customer_id": 63, "review_date": "2025-07-28T14:55:15", "customer_name": "Daniel Anderson", "customer_email": "daniel.anderson@email.com"}', 't', '2025-07-30 13:34:08.410052');
INSERT INTO "public"."admin_notifications" VALUES (71, NULL, 'new_review', 'New Book Review', 'A new 5.0-star review has been submitted for "Normal People" by Stephanie Thomas.', '{"rating": 5.0, "book_id": 111, "comment": "Excellent read on how money psychology affects financial decisions.", "review_id": 36, "book_title": "Normal People", "customer_id": 64, "review_date": "2025-07-01T14:00:00", "customer_name": "Stephanie Thomas", "customer_email": "stephanie.thomas@email.com"}', 't', '2025-07-30 13:34:08.414406');
INSERT INTO "public"."admin_notifications" VALUES (72, NULL, 'new_review', 'New Book Review', 'A new 5.0-star review has been submitted for "Normal People" by Ryan Jackson.', '{"rating": 5.0, "book_id": 111, "comment": "Practical lessons combined with engaging anecdotes.", "review_id": 37, "book_title": "Normal People", "customer_id": 65, "review_date": "2025-07-15T09:20:10", "customer_name": "Ryan Jackson", "customer_email": "ryan.jackson@email.com"}', 't', '2025-07-30 13:34:08.414406');
INSERT INTO "public"."admin_notifications" VALUES (73, NULL, 'new_review', 'New Book Review', 'A new 4.5-star review has been submitted for "Normal People" by Michelle White.', '{"rating": 4.5, "book_id": 111, "comment": "Made me rethink my approach to saving and investing.", "review_id": 38, "book_title": "Normal People", "customer_id": 66, "review_date": "2025-07-29T17:40:00", "customer_name": "Michelle White", "customer_email": "michelle.white@email.com"}', 't', '2025-07-30 13:34:08.414406');
INSERT INTO "public"."admin_notifications" VALUES (74, NULL, 'new_review', 'New Book Review', 'A new 5.0-star review has been submitted for "Born a Crime" by Kevin Harris.', '{"rating": 5.0, "book_id": 113, "comment": "The definitive guide for algorithms; dense but very thorough.", "review_id": 39, "book_title": "Born a Crime", "customer_id": 67, "review_date": "2025-06-05T13:30:00", "customer_name": "Kevin Harris", "customer_email": "kevin.harris@email.com"}', 't', '2025-07-30 13:34:08.418019');
INSERT INTO "public"."admin_notifications" VALUES (75, NULL, 'new_review', 'New Book Review', 'A new 4.5-star review has been submitted for "Born a Crime" by Lisa Martin.', '{"rating": 4.5, "book_id": 113, "comment": "Clear explanations and excellent examples for competitive programmers.", "review_id": 40, "book_title": "Born a Crime", "customer_id": 68, "review_date": "2025-07-09T11:00:00", "customer_name": "Lisa Martin", "customer_email": "lisa.martin@email.com"}', 't', '2025-07-30 13:34:08.418019');
INSERT INTO "public"."admin_notifications" VALUES (76, NULL, 'new_review', 'New Book Review', 'A new 5.0-star review has been submitted for "Born a Crime" by Jason Thompson.', '{"rating": 5.0, "book_id": 113, "comment": "A must-have reference book for computer science students.", "review_id": 41, "book_title": "Born a Crime", "customer_id": 69, "review_date": "2025-07-25T13:45:20", "customer_name": "Jason Thompson", "customer_email": "jason.thompson@email.com"}', 't', '2025-07-30 13:34:08.418019');
INSERT INTO "public"."admin_notifications" VALUES (77, NULL, 'payment_received', 'Payment Received', 'Received payment of $17.00 for Order #35 via Online Banking from "Mohibul Islam Sawrav"', '{"amount": 17.00, "order_id": 35, "customer_id": 3, "payment_date": "2025-07-30T14:49:22.31648", "customer_name": "Mohibul Islam Sawrav", "customer_email": "2205018@ugrad.cse.buet.ac.bd", "payment_method": "Online Banking"}', 't', '2025-07-30 14:49:22.31648');

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
INSERT INTO "public"."author" VALUES (15, 'William Shakespeare', NULL, NULL, NULL);
INSERT INTO "public"."author" VALUES (16, 'J.K. Rowling', NULL, NULL, NULL);
INSERT INTO "public"."author" VALUES (18, 'CLRS', NULL, NULL, NULL);

-- ----------------------------
-- Table structure for book
-- ----------------------------
DROP TABLE IF EXISTS "public"."book";
CREATE TABLE "public"."book" (
  "book_id" int4 NOT NULL DEFAULT nextval('book_book_id_seq'::regclass),
  "title" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "description" text COLLATE "pg_catalog"."default",
  "image_url" text COLLATE "pg_catalog"."default" DEFAULT 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png'::text,
  "is_active" bool DEFAULT true,
  "isbn" varchar(20) COLLATE "pg_catalog"."default",
  "publisher" varchar(255) COLLATE "pg_catalog"."default",
  "publication_date" timestamp(6),
  "language" varchar(50) COLLATE "pg_catalog"."default" DEFAULT 'English'::character varying,
  "category_id" int4,
  "sub_category_id" int4,
  "is_featured" bool DEFAULT false,
  "average_rating" numeric(3,2) DEFAULT 0.00,
  "review_count" int4 DEFAULT 0,
  "price" numeric(10,2)
)
;

-- ----------------------------
-- Records of book
-- ----------------------------
INSERT INTO "public"."book" VALUES (1, 'The Silent Patient', 'A psychological thriller about a woman''s act of violence.', 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png', 't', '9781250301697', 'Celadon Books', '2019-02-05 00:00:00', 'English', NULL, NULL, 'f', 0.00, 0, 14.99);
INSERT INTO "public"."book" VALUES (3, 'The Alchemist', 'A fable about following your dream.', 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png', 't', '9780061122415', 'HarperOne', '1993-05-01 00:00:00', 'English', NULL, NULL, 'f', 0.00, 0, 12.50);
INSERT INTO "public"."book" VALUES (2, 'Atomic Habits', 'An easy & proven way to build good habits & break bad ones.', 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png', 't', '9780735211292', 'Penguin Publishing', '2018-10-16 00:00:00', 'English', NULL, NULL, 'f', 0.00, 0, 20.00);
INSERT INTO "public"."book" VALUES (4, 'A Promised Land', 'Barack Obama’s presidential memoir.', 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png', 't', '9781524763169', 'Crown Publishing', '2020-11-17 00:00:00', 'English', NULL, NULL, 'f', 0.00, 0, 35.00);
INSERT INTO "public"."book" VALUES (5, 'Ikigai', 'The Japanese secret to a long and happy life.', 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png', 't', '9780143130727', 'Penguin Books', '2017-08-29 00:00:00', 'English', NULL, NULL, 'f', 0.00, 0, 11.99);
INSERT INTO "public"."book" VALUES (6, 'Rich Dad Poor Dad', 'What the rich teach their kids about money.', 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png', 't', '9781612680194', 'Plata Publishing', '2011-04-01 00:00:00', 'English', NULL, NULL, 'f', 0.00, 0, 15.00);
INSERT INTO "public"."book" VALUES (7, 'The Psychology of Money', 'Timeless lessons on wealth, greed, and happiness.', 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png', 't', '9780857197689', 'Harriman House', '2020-09-01 00:00:00', 'English', NULL, NULL, 'f', 0.00, 0, 16.50);
INSERT INTO "public"."book" VALUES (8, '1984', 'A dystopian social science fiction novel and cautionary tale.', 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png', 't', '9780451524935', 'Signet Classic', '1950-07-01 00:00:00', 'English', NULL, NULL, 'f', 0.00, 0, 9.99);
INSERT INTO "public"."book" VALUES (9, 'Sapiens', 'A brief history of humankind.', 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png', 't', '9780062316097', 'Harper', '2015-02-10 00:00:00', 'English', NULL, NULL, 'f', 0.00, 0, 22.00);
INSERT INTO "public"."book" VALUES (10, 'To Kill a Mockingbird', 'A novel about the serious issues of rape and racial inequality.', 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png', 't', '9780061120084', 'Harper Perennial', '2006-05-23 00:00:00', 'English', NULL, NULL, 'f', 0.00, 0, 10.00);
INSERT INTO "public"."book" VALUES (103, 'The Night Circus', 'A fantasy novel centered on a magical competition between two young illusionists.', 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png', 't', '9780307744432', 'Anchor', '2011-09-13 00:00:00', 'English', 1, 302, 'f', 5.00, 1, 14.99);
INSERT INTO "public"."book" VALUES (104, 'Where the Crawdads Sing', 'A coming-of-age murder mystery set in the marshes of North Carolina.', 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png', 't', '9780735219090', 'G.P. Putnam''s Sons', '2018-08-14 00:00:00', 'English', 1, 103, 'f', 4.00, 1, 16.50);
INSERT INTO "public"."book" VALUES (105, 'Dune', 'Epic science fiction novel about politics and power on a desert planet.', 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png', 't', '9780441013593', 'Ace', '2005-08-02 00:00:00', 'English', 3, 301, 'f', 4.50, 2, 22.00);
INSERT INTO "public"."book" VALUES (13, 'Hamlet', 'Hamlet is a tragic play by Shakespeare that follows a prince’s quest for revenge against his father’s murderer, exploring themes of madness, betrayal, and mortality.', 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png', 't', '3425654365343', 'Penguin Publications', '2019-07-01 00:00:00', 'English', NULL, NULL, 'f', 0.00, 0, 19.99);
INSERT INTO "public"."book" VALUES (14, 'Harry Potter', 'Fantasy Fiction book', 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png', 't', '34256547363756', 'Bloomsburry Publishing Ltd.', '2010-08-01 00:00:00', 'English', NULL, NULL, 'f', 4.50, 2, 15.00);
INSERT INTO "public"."book" VALUES (15, 'Introduction to Algorithms', 'Bible for computer science students', 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png', 't', '7456745789734657', 'CLRS publications', '2015-10-10 00:00:00', 'English', 6, 502, 'f', 0.00, 0, 18.00);
INSERT INTO "public"."book" VALUES (17, 'Introduction to Algorithms', 'Bible for computer  science students', 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png', 't', '654376583563856', 'CLRS publications', '2015-10-10 00:00:00', 'English', 6, 502, 'f', 0.00, 0, 18.00);
INSERT INTO "public"."book" VALUES (102, 'Becoming', 'Michelle Obama''s memoir of her life story in the White House and beyond.', 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png', 't', '9781524763138', 'Crown Publishing', '2018-11-13 00:00:00', 'English', 4, 401, 'f', 0.00, 0, 18.00);
INSERT INTO "public"."book" VALUES (112, 'The Martian', 'A sci-fi novel about an astronaut stranded on Mars.', 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png', 't', '9780553418026', 'Crown Publishing', '2014-02-11 00:00:00', 'English', 3, 301, 'f', 0.00, 0, 15.00);
INSERT INTO "public"."book" VALUES (114, 'Gone Girl', 'A thriller revolving around a missing woman and secrets.', 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png', 't', '9780307588371', 'Crown Publishing', '2012-06-05 00:00:00', 'English', 1, 101, 'f', 0.00, 0, 12.89);
INSERT INTO "public"."book" VALUES (115, 'The Book Thief', 'Historical novel narrated by Death during WWII.', 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png', 't', '9780375842207', 'Knopf Books', '2005-03-14 00:00:00', 'English', 1, 103, 'f', 0.00, 0, 12.50);
INSERT INTO "public"."book" VALUES (116, 'The 5 Love Languages', 'A guide to improving relationships by understanding love languages.', 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png', 't', '9780802412706', 'Northfield Publishing', '1995-01-01 00:00:00', 'English', 5, 501, 'f', 0.00, 0, 10.99);
INSERT INTO "public"."book" VALUES (118, 'Project Hail Mary', 'A lone astronaut must save Earth from disaster in this sci-fi thriller.', 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png', 't', '9780593135204', 'Ballantine Books', '2021-05-04 00:00:00', 'English', 3, 301, 'f', 0.00, 0, 18.20);
INSERT INTO "public"."book" VALUES (119, 'Educated', 'Memoir of resilience and education against all odds.', 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png', 't', '9780399590504', 'Random House', '2018-02-20 00:00:00', 'English', 4, 501, 'f', 0.00, 0, 15.99);
INSERT INTO "public"."book" VALUES (120, 'The Midnight Library', 'Between life and death, a woman explores alternate lives.', 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png', 't', '9780525559474', 'Viking', '2020-09-29 00:00:00', 'English', 1, 103, 'f', 0.00, 0, 14.95);
INSERT INTO "public"."book" VALUES (106, 'Thinking, Fast and Slow', 'A book exploring cognitive biases and decision-making.', 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png', 't', '9780374533557', 'Farrar, Straus and Giroux', '2011-10-25 00:00:00', 'English', 2, 202, 'f', 5.00, 1, 12.75);
INSERT INTO "public"."book" VALUES (108, 'Circe', 'Mythological fantasy novel about the enchantress Circe.', 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png', 't', '9780316556347', 'Little, Brown and Company', '2018-04-10 00:00:00', 'English', 1, 302, 'f', 3.50, 1, 14.25);
INSERT INTO "public"."book" VALUES (109, 'The Power of Habit', 'Explains how habits work and how to change them.', 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png', 't', '9780812981605', 'Random House', '2012-02-28 00:00:00', 'English', 5, 501, 'f', 4.83, 3, 13.50);
INSERT INTO "public"."book" VALUES (110, 'The Subtle Art of Not Giving a F*ck', 'A self-help guide about focusing on what matters.', 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png', 't', '9780062457714', 'HarperOne', '2016-09-13 00:00:00', 'English', 5, 501, 'f', 3.67, 3, 16.00);
INSERT INTO "public"."book" VALUES (111, 'Normal People', 'A novel exploring complex relationships and personal growth.', 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png', 't', '9780571334650', 'Faber & Faber', '2018-08-28 00:00:00', 'English', 1, 103, 'f', 4.83, 3, 13.75);
INSERT INTO "public"."book" VALUES (113, 'Born a Crime', 'Trevor Noah''s memoir about growing up in South Africa.', 'https://cdn-icons-png.flaticon.com/512/5402/5402751.png', 't', '9780399588198', 'Spiegel & Grau', '2016-11-15 00:00:00', 'English', 4, 401, 'f', 4.83, 3, 14.25);

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
INSERT INTO "public"."book_author" VALUES (13, 15);
INSERT INTO "public"."book_author" VALUES (14, 16);
INSERT INTO "public"."book_author" VALUES (15, 18);
INSERT INTO "public"."book_author" VALUES (17, 18);

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
INSERT INTO "public"."book_category" VALUES (6, 'Science and Technology', NULL);

-- ----------------------------
-- Table structure for book_format
-- ----------------------------
DROP TABLE IF EXISTS "public"."book_format";
CREATE TABLE "public"."book_format" (
  "book_format_id" int4 NOT NULL DEFAULT nextval('book_format_book_format_id_seq'::regclass),
  "book_id" int4 NOT NULL,
  "format_id" int4 NOT NULL
)
;

-- ----------------------------
-- Records of book_format
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
INSERT INTO "public"."book_sub_category" VALUES (15, 502);
INSERT INTO "public"."book_sub_category" VALUES (17, 502);

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
INSERT INTO "public"."book_supply" VALUES (13, 1);
INSERT INTO "public"."book_supply" VALUES (14, 1);
INSERT INTO "public"."book_supply" VALUES (15, 1);
INSERT INTO "public"."book_supply" VALUES (17, 1);

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
INSERT INTO "public"."cart" VALUES (16, NULL, '2025-07-30 11:12:06.905636', '2025-07-30 11:12:06.905636');
INSERT INTO "public"."cart" VALUES (17, NULL, '2025-07-30 11:12:07.17136', '2025-07-30 11:12:07.17136');
INSERT INTO "public"."cart" VALUES (18, NULL, '2025-07-30 11:12:10.870928', '2025-07-30 11:12:10.870928');
INSERT INTO "public"."cart" VALUES (19, NULL, '2025-07-30 11:12:11.125989', '2025-07-30 11:12:11.125989');
INSERT INTO "public"."cart" VALUES (20, NULL, '2025-07-30 11:12:18.647207', '2025-07-30 11:12:18.647207');
INSERT INTO "public"."cart" VALUES (21, NULL, '2025-07-30 11:12:18.915917', '2025-07-30 11:12:18.915917');
INSERT INTO "public"."cart" VALUES (22, NULL, '2025-07-30 11:13:51.101115', '2025-07-30 11:13:51.101115');
INSERT INTO "public"."cart" VALUES (23, NULL, '2025-07-30 11:13:51.241716', '2025-07-30 11:13:51.241716');
INSERT INTO "public"."cart" VALUES (1, 3, '2025-07-05 18:32:03.173854', '2025-07-30 14:49:03.37065');
INSERT INTO "public"."cart" VALUES (3, 6, '2025-07-15 20:59:54.891959', '2025-07-15 20:59:54.891959');
INSERT INTO "public"."cart" VALUES (5, 9, '2025-07-23 13:49:44.794863', '2025-07-23 13:49:44.794863');
INSERT INTO "public"."cart" VALUES (6, 10, '2025-07-24 02:40:22.280713', '2025-07-24 02:40:22.280713');
INSERT INTO "public"."cart" VALUES (4, 8, '2025-07-15 23:06:24.344894', '2025-07-15 23:06:24.344894');
INSERT INTO "public"."cart" VALUES (2, 7, '2025-07-13 15:30:18.952162', '2025-07-13 15:30:18.952162');
INSERT INTO "public"."cart" VALUES (7, NULL, '2025-07-29 20:52:34.362473', '2025-07-29 20:52:34.362473');
INSERT INTO "public"."cart" VALUES (8, NULL, '2025-07-29 20:52:35.107277', '2025-07-29 20:52:35.107277');
INSERT INTO "public"."cart" VALUES (9, NULL, '2025-07-29 20:52:42.205863', '2025-07-29 20:52:42.205863');
INSERT INTO "public"."cart" VALUES (10, NULL, '2025-07-29 20:52:42.224516', '2025-07-29 20:52:42.224516');
INSERT INTO "public"."cart" VALUES (11, NULL, '2025-07-29 20:52:45.950922', '2025-07-29 20:52:45.950922');
INSERT INTO "public"."cart" VALUES (12, NULL, '2025-07-29 20:52:46.133539', '2025-07-29 20:52:46.133539');
INSERT INTO "public"."cart" VALUES (13, NULL, '2025-07-29 20:52:48.553581', '2025-07-29 20:52:48.553581');
INSERT INTO "public"."cart" VALUES (14, NULL, '2025-07-29 20:52:48.574858', '2025-07-29 20:52:48.574858');
INSERT INTO "public"."cart" VALUES (15, NULL, '2025-07-29 20:52:50.444724', '2025-07-29 20:52:50.444724');

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
INSERT INTO "public"."cart_item" VALUES (80, 9, 14, 1, 2);
INSERT INTO "public"."cart_item" VALUES (81, 13, 14, 1, 2);

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
INSERT INTO "public"."chat_message" VALUES (1, 1, 'customer', 'Hello', '2025-07-30 02:15:23.899309');
INSERT INTO "public"."chat_message" VALUES (2, 1, 'admin', 'Hi', '2025-07-30 02:15:35.488683');
INSERT INTO "public"."chat_message" VALUES (3, 2, 'admin', 'How can I help you?', '2025-07-30 02:32:46.547976');
INSERT INTO "public"."chat_message" VALUES (4, 2, 'admin', 'Hello', '2025-07-30 02:33:16.26839');

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
INSERT INTO "public"."chat_session" VALUES (1, 3, '2025-07-30 02:14:29.508227', '2025-07-30 02:16:39.603761');
INSERT INTO "public"."chat_session" VALUES (2, 3, '2025-07-30 02:32:06.724424', '2025-07-30 02:33:04.797094');

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
  "last_login_at" timestamp(6),
  "role" varchar(20) COLLATE "pg_catalog"."default" DEFAULT 'customer'::character varying,
  "is_verified" varchar(20) COLLATE "pg_catalog"."default" DEFAULT 't'::character varying
)
;

-- ----------------------------
-- Records of customer
-- ----------------------------
INSERT INTO "public"."customer" VALUES (3, 'Mohibul Islam Sawrav', '2205018@ugrad.cse.buet.ac.bd', '$2b$10$RfOVcY9RIcmrXJ3GZty4Oep21SVA3Kj2rY5wcYCen/6/SCF30hVki', '+8801864316100', 'Dhaka, Bangladesh', '2025-07-01 22:53:03.887927', '2025-07-27 01:12:39.477666', '2025-07-31 21:58:43.25025', 'customer', 't');
INSERT INTO "public"."customer" VALUES (51, 'John Smith', 'john.smith@email.com', '$2b$10$aB3cD4eF5gH6iJ7kL8mN9oP0qR1sT2uV3wX4yZ5', '+1234567890', '123 Main St, New York, NY 10001', '2025-07-30 13:33:40.7515', '2025-07-30 13:33:40.7515', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (52, 'Sarah Johnson', 'sarah.johnson@email.com', '$2b$10$bC4dE5fG6hI7jK8lM9nO0pQ1rS2tU3vW4xY5zA6', '+1234567891', '456 Oak Ave, Los Angeles, CA 90210', '2025-07-30 13:33:40.7515', '2025-07-30 13:33:40.7515', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (53, 'Michael Brown', 'michael.brown@email.com', '$2b$10$cD5eF6gH7iJ8kL9mN0oP1qR2sT3uV4wX5yZ6aB7', '+1234567892', '789 Pine Rd, Chicago, IL 60601', '2025-07-30 13:33:40.7515', '2025-07-30 13:33:40.7515', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (4, 'mohib080', 'mohibul.sawrav2004@gmail.com', '$2b$10$toBBByEj1LrBcRY4TILZkulC2cEjkvXDPxGDb9m46PilGjqQ1G2gK', NULL, NULL, '2025-07-01 22:56:45.063885', '2025-07-01 22:56:45.063885', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (8, 'Cristiano Ronaldo', 'sawrav124@gmail.com', '$2b$10$9cdzyxT3Px56eTkJ4IuUUOs41b3bq0pBrVKZEO9D/Wi2gU2/5cU4m', NULL, NULL, '2025-07-15 23:06:22.116455', '2025-07-15 23:06:22.116455', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (54, 'Emily Davis', 'emily.davis@email.com', '$2b$10$dE6fG7hI8jK9lM0nO1pQ2rS3tU4vW5xY6zA7bC8', '+1234567893', '321 Elm St, Houston, TX 77001', '2025-07-30 13:33:40.7515', '2025-07-30 13:33:40.7515', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (55, 'David Wilson', 'david.wilson@email.com', '$2b$10$eF7gH8iJ9kL0mN1oP2qR3sT4uV5wX6yZ7aB8cD9', '+1234567894', '654 Maple Dr, Phoenix, AZ 85001', '2025-07-30 13:33:40.7515', '2025-07-30 13:33:40.7515', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (5, 'r', '2205007@ugrad.cse.buet.ac.bd', '$2b$10$v76HTKVs2QtlHEip1iRk3esnbWlUtHLFOg6TrtOKxlnNOzPx4WO12', NULL, NULL, '2025-07-13 15:12:30.156238', '2025-07-13 15:12:30.156238', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (9, 'Mr.A', '2205999@ugrad.cse.buet.ac.bd', '$2b$10$2yzWS7tY3eOMU0vobYy3IeFsI9pWQGg1LO/851GjvR1EELhx3YWoW', NULL, NULL, '2025-07-23 13:49:27.52812', '2025-07-23 13:49:27.52812', '2025-07-23 13:49:42.936612', 'customer', 't');
INSERT INTO "public"."customer" VALUES (10, 'Messi', '2205888@ugrad.cse.buet.ac.bd', '$2b$10$jTS27dNp4uqLYo41JFO/B.hnQ6/7xOuyfelLpHFicIHSPYPN/pTYa', NULL, NULL, '2025-07-24 02:39:54.913706', '2025-07-24 02:39:54.913706', '2025-07-24 02:40:20.280903', 'customer', 't');
INSERT INTO "public"."customer" VALUES (56, 'Jessica Miller', 'jessica.miller@email.com', '$2b$10$fG8hI9jK0lM1nO2pQ3rS4tU5vW6xY7zA8bC9dE0', '+1234567895', '987 Cedar Ln, Philadelphia, PA 19101', '2025-07-30 13:33:40.7515', '2025-07-30 13:33:40.7515', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (11, 'Neymar', '2205666@ugrad.cse.buet.ac.bd', '$2b$10$pDpLCQfsX8KMArdE/ObdnOkXACtI1PLc43NzS.tph8VIo/hV1WayO', NULL, NULL, '2025-07-24 02:48:10.804728', '2025-07-24 02:48:10.804728', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (57, 'Christopher Garcia', 'christopher.garcia@email.com', '$2b$10$gH9iJ0kL1mN2oP3qR4sT5uV6wX7yZ8aB9cD0eF1', '+1234567896', '147 Birch Ave, San Antonio, TX 78201', '2025-07-30 13:33:40.7515', '2025-07-30 13:33:40.7515', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (58, 'Amanda Martinez', 'amanda.martinez@email.com', '$2b$10$hI0jK1lM2nO3pQ4rS5tU6vW7xY8zA9bC0dE1fG2', '+1234567897', '258 Spruce St, San Diego, CA 92101', '2025-07-30 13:33:40.7515', '2025-07-30 13:33:40.7515', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (59, 'Matthew Rodriguez', 'matthew.rodriguez@email.com', '$2b$10$iJ1kL2mN3oP4qR5sT6uV7wX8yZ9aB0cD1eF2gH3', '+1234567898', '369 Willow Rd, Dallas, TX 75201', '2025-07-30 13:33:40.7515', '2025-07-30 13:33:40.7515', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (60, 'Ashley Lopez', 'ashley.lopez@email.com', '$2b$10$jK2lM3nO4pQ5rS6tU7vW8xY9zA0bC1dE2fG3hI4', '+1234567899', '741 Ash Dr, San Jose, CA 95101', '2025-07-30 13:33:40.7515', '2025-07-30 13:33:40.7515', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (61, 'Joshua Gonzalez', 'joshua.gonzalez@email.com', '$2b$10$kL3mN4oP5qR6sT7uV8wX9yZ0aB1cD2eF3gH4iJ5', '+1234567800', '852 Cherry Ln, Austin, TX 73301', '2025-07-30 13:33:40.7515', '2025-07-30 13:33:40.7515', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (62, 'Nicole Wilson', 'nicole.wilson@email.com', '$2b$10$lM4nO5pQ6rS7tU8vW9xY0zA1bC2dE3fG4hI5jK6', '+1234567801', '963 Poplar Ave, Indianapolis, IN 46201', '2025-07-30 13:33:40.7515', '2025-07-30 13:33:40.7515', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (63, 'Daniel Anderson', 'daniel.anderson@email.com', '$2b$10$mN5oP6qR7sT8uV9wX0yZ1aB2cD3eF4gH5iJ6kL7', '+1234567802', '159 Walnut St, Jacksonville, FL 32201', '2025-07-30 13:33:40.7515', '2025-07-30 13:33:40.7515', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (64, 'Stephanie Thomas', 'stephanie.thomas@email.com', '$2b$10$nO6pQ7rS8tU9vW0xY1zA2bC3dE4fG5hI6jK7lM8', '+1234567803', '357 Hickory Rd, San Francisco, CA 94101', '2025-07-30 13:33:40.7515', '2025-07-30 13:33:40.7515', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (65, 'Ryan Jackson', 'ryan.jackson@email.com', '$2b$10$oP7qR8sT9uV0wX1yZ2aB3cD4eF5gH6iJ7kL8mN9', '+1234567804', '468 Dogwood Dr, Columbus, OH 43201', '2025-07-30 13:33:40.7515', '2025-07-30 13:33:40.7515', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (66, 'Michelle White', 'michelle.white@email.com', '$2b$10$pQ8rS9tU0vW1xY2zA3bC4dE5fG6hI7jK8lM9nO0', '+1234567805', '579 Magnolia Ln, Fort Worth, TX 76101', '2025-07-30 13:33:40.7515', '2025-07-30 13:33:40.7515', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (67, 'Kevin Harris', 'kevin.harris@email.com', '$2b$10$qR9sT0uV1wX2yZ3aB4cD5eF6gH7iJ8kL9mN0oP1', '+1234567806', '680 Sycamore Ave, Charlotte, NC 28201', '2025-07-30 13:33:40.7515', '2025-07-30 13:33:40.7515', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (68, 'Lisa Martin', 'lisa.martin@email.com', '$2b$10$rS0tU1vW2xY3zA4bC5dE6fG7hI8jK9lM0nO1pQ2', '+1234567807', '791 Redwood St, Detroit, MI 48201', '2025-07-30 13:33:40.7515', '2025-07-30 13:33:40.7515', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (69, 'Jason Thompson', 'jason.thompson@email.com', '$2b$10$sT1uV2wX3yZ4aB5cD6eF7gH8iJ9kL0mN1oP2qR3', '+1234567808', '802 Sequoia Rd, El Paso, TX 79901', '2025-07-30 13:33:40.7515', '2025-07-30 13:33:40.7515', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (70, 'Laura Garcia', 'laura.garcia@email.com', '$2b$10$tU2vW3xY4zA5bC6dE7fG8hI9jK0lM1nO2pQ3rS4', '+1234567809', '913 Juniper Dr, Memphis, TN 38101', '2025-07-30 13:33:40.7515', '2025-07-30 13:33:40.7515', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (71, 'Andrew Martinez', 'andrew.martinez@email.com', '$2b$10$uV3wX4yZ5aB6cD7eF8gH9iJ0kL1mN2oP3qR4sT5', '+1234567810', '124 Fir Ln, Denver, CO 80201', '2025-07-30 13:33:40.7515', '2025-07-30 13:33:40.7515', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (6, 'shafin', '2205001@ugrad.cse.buet.ac.bd', '$2b$10$VTUSxXumJnwlI8ptdABbIOj9eZX9GBlglShYL4WAtME.SIAFSoXmG', NULL, NULL, '2025-07-13 15:26:50.075573', '2025-07-13 15:26:50.075573', '2025-07-29 19:41:35.536505', 'customer', 't');
INSERT INTO "public"."customer" VALUES (7, 'saber', '2205017@ugrad.cse.buet.ac.bd', '$2b$10$SGjls5kb.SzOFSRk3R3ywuY4lunIonf9mqUuEmL4UBI5r323XbM6K', NULL, NULL, '2025-07-13 15:30:02.152869', '2025-07-13 15:30:02.152869', '2025-07-29 19:43:06.057793', 'customer', 't');
INSERT INTO "public"."customer" VALUES (72, 'Crystal Robinson', 'crystal.robinson@email.com', '$2b$10$vW4xY5zA6bC7dE8fG9hI0jK1lM2nO3pQ4rS5tU6', '+1234567811', '235 Cypress Ave, Seattle, WA 98101', '2025-07-30 13:33:40.7515', '2025-07-30 13:33:40.7515', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (73, 'Brian Clark', 'brian.clark@email.com', '$2b$10$wX5yZ6aB7cD8eF9gH0iJ1kL2mN3oP4qR5sT6uV7', '+1234567812', '346 Palm St, Boston, MA 02101', '2025-07-30 13:33:40.7515', '2025-07-30 13:33:40.7515', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (74, 'Jennifer Rodriguez', 'jennifer.rodriguez@email.com', '$2b$10$xY6zA7bC8dE9fG0hI1jK2lM3nO4pQ5rS6tU7vW8', '+1234567813', '457 Bamboo Rd, Nashville, TN 37201', '2025-07-30 13:33:40.7515', '2025-07-30 13:33:40.7515', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (75, 'Tyler Lewis', 'tyler.lewis@email.com', '$2b$10$yZ7aB8cD9eF0gH1iJ2kL3mN4oP5qR6sT7uV8wX9', '+1234567814', '568 Peach Dr, Baltimore, MD 21201', '2025-07-30 13:33:40.7515', '2025-07-30 13:33:40.7515', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (76, 'Karen Lee', 'karen.lee@email.com', '$2b$10$zA8bC9dE0fG1hI2jK3lM4nO5pQ6rS7tU8vW9xY0', '+1234567815', '679 Orange Ln, Louisville, KY 40201', '2025-07-30 13:33:40.7515', '2025-07-30 13:33:40.7515', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (77, 'Adam Walker', 'adam.walker@email.com', '$2b$10$aB9cD0eF1gH2iJ3kL4mN5oP6qR7sT8uV9wX0yZ1', '+1234567816', '780 Apple Ave, Portland, OR 97201', '2025-07-30 13:33:40.7515', '2025-07-30 13:33:40.7515', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (78, 'Maria Hall', 'maria.hall@email.com', '$2b$10$bC0dE1fG2hI3jK4lM5nO6pQ7rS8tU9vW0xY1zA2', '+1234567817', '891 Grape St, Oklahoma City, OK 73101', '2025-07-30 13:33:40.7515', '2025-07-30 13:33:40.7515', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (79, 'Mark Allen', 'mark.allen@email.com', '$2b$10$cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV0wX1yZ2aB3', '+1234567818', '902 Berry Rd, Milwaukee, WI 53201', '2025-07-30 13:33:40.7515', '2025-07-30 13:33:40.7515', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (80, 'Janet Young', 'janet.young@email.com', '$2b$10$dE2fG3hI4jK5lM6nO7pQ8rS9tU0vW1xY2zA3bC4', '+1234567819', '113 Lemon Dr, Albuquerque, NM 87101', '2025-07-30 13:33:40.7515', '2025-07-30 13:33:40.7515', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (81, 'Scott King', 'scott.king@email.com', '$2b$10$eF3gH4iJ5kL6mN7oP8qR9sT0uV1wX2yZ3aB4cD5', '+1234567820', '224 Lime Ln, Tucson, AZ 85701', '2025-07-30 13:33:40.7515', '2025-07-30 13:33:40.7515', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (82, 'Donna Wright', 'donna.wright@email.com', '$2b$10$fG4hI5jK6lM7nO8pQ9rS0tU1vW2xY3zA4bC5dE6', '+1234567821', '335 Coconut Ave, Fresno, CA 93701', '2025-07-30 13:33:40.7515', '2025-07-30 13:33:40.7515', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (83, 'Gary Lopez', 'gary.lopez@email.com', '$2b$10$gH5iJ6kL7mN8oP9qR0sT1uV2wX3yZ4aB5cD6eF7', '+1234567822', '446 Pineapple St, Sacramento, CA 95801', '2025-07-30 13:33:40.7515', '2025-07-30 13:33:40.7515', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (84, 'Carolyn Hill', 'carolyn.hill@email.com', '$2b$10$hI6jK7lM8nO9pQ0rS1tU2vW3xY4zA5bC6dE7fG8', '+1234567823', '557 Mango Rd, Long Beach, CA 90801', '2025-07-30 13:33:40.7515', '2025-07-30 13:33:40.7515', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (85, 'Timothy Green', 'timothy.green@email.com', '$2b$10$iJ7kL8mN9oP0qR1sT2uV3wX4yZ5aB6cD7eF8gH9', '+1234567824', '668 Papaya Dr, Kansas City, MO 64101', '2025-07-30 13:33:40.7515', '2025-07-30 13:33:40.7515', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (86, 'Sharon Adams', 'sharon.adams@email.com', '$2b$10$jK8lM9nO0pQ1rS2tU3vW4xY5zA6bC7dE8fG9hI0', '+1234567825', '779 Kiwi Ln, Mesa, AZ 85201', '2025-07-30 13:33:40.7515', '2025-07-30 13:33:40.7515', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (87, 'Steven Baker', 'steven.baker@email.com', '$2b$10$kL9mN0oP1qR2sT3uV4wX5yZ6aB7cD8eF9gH0iJ1', '+1234567826', '880 Strawberry Ave, Virginia Beach, VA 23401', '2025-07-30 13:33:40.7515', '2025-07-30 13:33:40.7515', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (88, 'Kimberly Gonzalez', 'kimberly.gonzalez@email.com', '$2b$10$lM0nO1pQ2rS3tU4vW5xY6zA7bC8dE9fG0hI1jK2', '+1234567827', '991 Blueberry St, Atlanta, GA 30301', '2025-07-30 13:33:40.7515', '2025-07-30 13:33:40.7515', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (89, 'Anthony Nelson', 'anthony.nelson@email.com', '$2b$10$mN1oP2qR3sT4uV5wX6yZ7aB8cD9eF0gH1iJ2kL3', '+1234567828', '102 Raspberry Rd, Colorado Springs, CO 80901', '2025-07-30 13:33:40.7515', '2025-07-30 13:33:40.7515', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (90, 'Lisa Carter', 'lisa.carter@email.com', '$2b$10$nO2pQ3rS4tU5vW6xY7zA8bC9dE0fG1hI2jK3lM4', '+1234567829', '213 Blackberry Dr, Raleigh, NC 27601', '2025-07-30 13:33:40.7515', '2025-07-30 13:33:40.7515', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (91, 'Paul Mitchell', 'paul.mitchell@email.com', '$2b$10$oP3qR4sT5uV6wX7yZ8aB9cD0eF1gH2iJ3kL4mN5', '+1234567830', '324 Cranberry Ln, Omaha, NE 68101', '2025-07-30 13:33:40.7515', '2025-07-30 13:33:40.7515', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (92, 'Helen Perez', 'helen.perez@email.com', '$2b$10$pQ4rS5tU6vW7xY8zA9bC0dE1fG2hI3jK4lM5nO6', '+1234567831', '435 Gooseberry Ave, Miami, FL 33101', '2025-07-30 13:33:40.7515', '2025-07-30 13:33:40.7515', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (93, 'Kenneth Roberts', 'kenneth.roberts@email.com', '$2b$10$qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5mN6oP7', '+1234567832', '546 Elderberry St, Oakland, CA 94601', '2025-07-30 13:33:40.7515', '2025-07-30 13:33:40.7515', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (94, 'Dorothy Turner', 'dorothy.turner@email.com', '$2b$10$rS6tU7vW8xY9zA0bC1dE2fG3hI4jK5lM6nO7pQ8', '+1234567833', '657 Mulberry Rd, Minneapolis, MN 55401', '2025-07-30 13:33:40.7515', '2025-07-30 13:33:40.7515', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (95, 'Edward Phillips', 'edward.phillips@email.com', '$2b$10$sT7uV8wX9yZ0aB1cD2eF3gH4iJ5kL6mN7oP8qR9', '+1234567834', '768 Huckleberry Dr, Tulsa, OK 74101', '2025-07-30 13:33:40.7515', '2025-07-30 13:33:40.7515', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (96, 'Betty Campbell', 'betty.campbell@email.com', '$2b$10$tU8vW9xY0zA1bC2dE3fG4hI5jK6lM7nO8pQ9rS0', '+1234567835', '879 Boysenberry Ln, Cleveland, OH 44101', '2025-07-30 13:33:40.7515', '2025-07-30 13:33:40.7515', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (97, 'Ronald Parker', 'ronald.parker@email.com', '$2b$10$uV9wX0yZ1aB2cD3eF4gH5iJ6kL7mN8oP9qR0sT1', '+1234567836', '980 Loganberry Ave, Wichita, KS 67201', '2025-07-30 13:33:40.7515', '2025-07-30 13:33:40.7515', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (98, 'Sandra Evans', 'sandra.evans@email.com', '$2b$10$vW0xY1zA2bC3dE4fG5hI6jK7lM8nO9pQ0rS1tU2', '+1234567837', '191 Dewberry St, Arlington, TX 76001', '2025-07-30 13:33:40.7515', '2025-07-30 13:33:40.7515', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (99, 'Jerry Edwards', 'jerry.edwards@email.com', '$2b$10$wX1yZ2aB3cD4eF5gH6iJ7kL8mN9oP0qR1sT2uV3', '+1234567838', '292 Serviceberry Rd, New Orleans, LA 70112', '2025-07-30 13:33:40.7515', '2025-07-30 13:33:40.7515', NULL, 'customer', 't');
INSERT INTO "public"."customer" VALUES (100, 'Nancy Collins', 'nancy.collins@email.com', '$2b$10$xY2zA3bC4dE5fG6hI7jK8lM9nO0pQ1rS2tU3vW4', '+1234567839', '393 Cloudberry Dr, Tampa, FL 33601', '2025-07-30 13:33:40.7515', '2025-07-30 13:33:40.7515', NULL, 'customer', 't');

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
INSERT INTO "public"."format" VALUES (1, 'Paperback', 0.8);
INSERT INTO "public"."format" VALUES (2, 'Hardcover', 1);

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
INSERT INTO "public"."inventory" VALUES (3, 3, 10, '2025-07-19 16:10:13.167177', 1);
INSERT INTO "public"."inventory" VALUES (7, 7, 10, '2025-07-19 16:10:13.174217', 1);
INSERT INTO "public"."inventory" VALUES (9, 9, 9, '2025-07-20 00:40:31.460748', 1);
INSERT INTO "public"."inventory" VALUES (10, 10, 10, '2025-07-19 16:10:13.175947', 1);
INSERT INTO "public"."inventory" VALUES (1, 1, 9, '2025-07-19 17:30:03.288688', 2);
INSERT INTO "public"."inventory" VALUES (2, 2, 0, '2025-07-24 16:24:33.672447', 2);
INSERT INTO "public"."inventory" VALUES (12, 13, 9, '2025-07-24 16:24:33.672447', 2);
INSERT INTO "public"."inventory" VALUES (8, 8, 8, '2025-07-24 16:55:59.814843', 3);
INSERT INTO "public"."inventory" VALUES (6, 6, 8, '2025-07-27 02:16:26.976339', 1);
INSERT INTO "public"."inventory" VALUES (4, 4, 2, '2025-07-29 16:15:33.136326', 3);
INSERT INTO "public"."inventory" VALUES (5, 5, 9, '2025-07-29 16:15:33.136326', 2);
INSERT INTO "public"."inventory" VALUES (14, 15, 100, '2025-07-30 12:01:44.406042', 1);
INSERT INTO "public"."inventory" VALUES (15, 17, 100, '2025-07-30 12:06:17.444785', 1);
INSERT INTO "public"."inventory" VALUES (18, 1, 30, '2025-07-12 13:00:00', 1);
INSERT INTO "public"."inventory" VALUES (19, 1, 30, '2025-07-30 13:00:00', 2);
INSERT INTO "public"."inventory" VALUES (20, 1, 30, '2025-07-30 13:00:00', 3);
INSERT INTO "public"."inventory" VALUES (21, 2, 30, '2025-07-30 13:00:00', 1);
INSERT INTO "public"."inventory" VALUES (22, 2, 30, '2025-07-30 13:00:00', 2);
INSERT INTO "public"."inventory" VALUES (23, 2, 30, '2025-07-30 13:00:00', 3);
INSERT INTO "public"."inventory" VALUES (24, 3, 30, '2025-07-30 13:00:00', 1);
INSERT INTO "public"."inventory" VALUES (25, 3, 30, '2025-07-30 13:00:00', 2);
INSERT INTO "public"."inventory" VALUES (26, 3, 30, '2025-07-30 13:00:00', 3);
INSERT INTO "public"."inventory" VALUES (27, 4, 30, '2025-07-30 13:00:00', 1);
INSERT INTO "public"."inventory" VALUES (28, 4, 30, '2025-07-30 13:00:00', 2);
INSERT INTO "public"."inventory" VALUES (29, 4, 30, '2025-07-30 13:00:00', 3);
INSERT INTO "public"."inventory" VALUES (30, 5, 30, '2025-07-30 13:00:00', 1);
INSERT INTO "public"."inventory" VALUES (31, 5, 30, '2025-07-30 13:00:00', 2);
INSERT INTO "public"."inventory" VALUES (32, 5, 30, '2025-07-30 13:00:00', 3);
INSERT INTO "public"."inventory" VALUES (33, 6, 30, '2025-07-30 13:00:00', 1);
INSERT INTO "public"."inventory" VALUES (34, 6, 30, '2025-07-30 13:00:00', 2);
INSERT INTO "public"."inventory" VALUES (35, 6, 30, '2025-07-30 13:00:00', 3);
INSERT INTO "public"."inventory" VALUES (36, 7, 30, '2025-07-30 13:00:00', 1);
INSERT INTO "public"."inventory" VALUES (37, 7, 30, '2025-07-30 13:00:00', 2);
INSERT INTO "public"."inventory" VALUES (38, 7, 30, '2025-07-30 13:00:00', 3);
INSERT INTO "public"."inventory" VALUES (39, 8, 30, '2025-07-30 13:00:00', 1);
INSERT INTO "public"."inventory" VALUES (40, 8, 30, '2025-07-30 13:00:00', 2);
INSERT INTO "public"."inventory" VALUES (41, 8, 30, '2025-07-30 13:00:00', 3);
INSERT INTO "public"."inventory" VALUES (42, 9, 30, '2025-07-30 13:00:00', 1);
INSERT INTO "public"."inventory" VALUES (43, 9, 30, '2025-07-30 13:00:00', 2);
INSERT INTO "public"."inventory" VALUES (44, 9, 30, '2025-07-30 13:00:00', 3);
INSERT INTO "public"."inventory" VALUES (45, 10, 30, '2025-07-30 13:00:00', 1);
INSERT INTO "public"."inventory" VALUES (46, 10, 30, '2025-07-30 13:00:00', 2);
INSERT INTO "public"."inventory" VALUES (47, 10, 30, '2025-07-30 13:00:00', 3);
INSERT INTO "public"."inventory" VALUES (54, 102, 71, '2025-07-30 13:00:00', 1);
INSERT INTO "public"."inventory" VALUES (55, 102, 32, '2025-07-30 13:00:00', 2);
INSERT INTO "public"."inventory" VALUES (56, 102, 102, '2025-07-30 13:00:00', 3);
INSERT INTO "public"."inventory" VALUES (13, 14, 95, '2025-07-30 14:49:22.31648', 1);
INSERT INTO "public"."inventory" VALUES (51, 14, 29, '2025-07-30 14:49:22.31648', 1);
INSERT INTO "public"."inventory" VALUES (52, 14, 29, '2025-07-30 14:49:22.31648', 2);
INSERT INTO "public"."inventory" VALUES (53, 14, 29, '2025-07-30 14:49:22.31648', 3);

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
INSERT INTO "public"."order" VALUES (1, 3, 'cancelled', '2025-07-19 16:41:53.370525', 20.00, 'standard', NULL);
INSERT INTO "public"."order" VALUES (12, 3, 'cancelled', '2025-07-20 00:47:29.859351', 10.50, 'standard', NULL);
INSERT INTO "public"."order" VALUES (11, 3, 'cancelled', '2025-07-20 00:40:31.460748', 17.60, 'standard', NULL);
INSERT INTO "public"."order" VALUES (10, 3, 'cancelled', '2025-07-20 00:39:28.275277', 3.00, 'standard', NULL);
INSERT INTO "public"."order" VALUES (9, 3, 'cancelled', '2025-07-20 00:08:53.270913', 20.00, 'standard', NULL);
INSERT INTO "public"."order" VALUES (8, 3, 'cancelled', '2025-07-19 17:39:19.866763', 35.00, 'standard', NULL);
INSERT INTO "public"."order" VALUES (6, 3, 'cancelled', '2025-07-19 17:31:51.67231', 35.00, 'standard', NULL);
INSERT INTO "public"."order" VALUES (5, 3, 'cancelled', '2025-07-19 17:30:03.288688', 14.99, 'standard', NULL);
INSERT INTO "public"."order" VALUES (4, 3, 'cancelled', '2025-07-19 17:26:33.608038', 20.00, 'standard', NULL);
INSERT INTO "public"."order" VALUES (3, 3, 'cancelled', '2025-07-19 17:15:19.301405', 35.00, 'standard', NULL);
INSERT INTO "public"."order" VALUES (2, 3, 'cancelled', '2025-07-19 16:55:41.083519', 20.00, 'standard', NULL);
INSERT INTO "public"."order" VALUES (13, 3, 'pending', '2025-07-20 00:58:15.487039', 6.00, 'standard', NULL);
INSERT INTO "public"."order" VALUES (15, 3, 'pending', '2025-07-22 00:00:00.539189', 28.00, 'standard', NULL);
INSERT INTO "public"."order" VALUES (16, 3, 'cancelled', '2025-07-22 00:10:44.242339', 10.50, 'standard', NULL);
INSERT INTO "public"."order" VALUES (17, 3, 'pending', '2025-07-22 00:15:45.625922', 6.00, 'standard', NULL);
INSERT INTO "public"."order" VALUES (18, 3, 'pending', '2025-07-22 00:19:40.318759', 11.00, 'standard', NULL);
INSERT INTO "public"."order" VALUES (19, 3, 'pending', '2025-07-22 23:43:44.2144', 11.00, 'standard', NULL);
INSERT INTO "public"."order" VALUES (20, 3, 'pending', '2025-07-24 16:24:33.672447', 17.00, 'standard', NULL);
INSERT INTO "public"."order" VALUES (21, 3, 'pending', '2025-07-24 16:55:59.814843', 40.99, 'standard', NULL);
INSERT INTO "public"."order" VALUES (22, 3, 'pending', '2025-07-27 02:16:26.976339', 12.00, NULL, NULL);
INSERT INTO "public"."order" VALUES (30, 3, 'cancelled', '2025-07-29 16:15:33.136326', 25.09, 'standard', NULL);
INSERT INTO "public"."order" VALUES (31, 3, 'Delivered', '2025-07-29 17:38:14.805835', 20.00, 'standard', NULL);
INSERT INTO "public"."order" VALUES (32, 3, 'delivered', '2025-07-29 20:54:02.713491', 29.00, 'standard', NULL);
INSERT INTO "public"."order" VALUES (14, 3, 'delivered', '2025-07-21 23:55:40.249489', 31.00, 'standard', NULL);
INSERT INTO "public"."order" VALUES (34, 3, 'shipped', '2025-07-30 11:10:57.705865', 17.00, 'standard', 'LIBRI46d18');
INSERT INTO "public"."order" VALUES (35, 3, 'delivered', '2025-07-30 14:49:22.31648', 17.00, 'standard', 'LIBRI31096');

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
INSERT INTO "public"."order_cancellation" VALUES (1, 1, 3, 'customer', 'changed_mind: oiknjikonjklln', 'approved');
INSERT INTO "public"."order_cancellation" VALUES (2, 12, 3, 'customer', 'changed_mind', 'approved');
INSERT INTO "public"."order_cancellation" VALUES (3, 11, 3, 'customer', 'changed_mind', 'approved');
INSERT INTO "public"."order_cancellation" VALUES (4, 10, 3, 'customer', 'changed_mind', 'approved');
INSERT INTO "public"."order_cancellation" VALUES (5, 9, 3, 'customer', 'changed_mind', 'approved');
INSERT INTO "public"."order_cancellation" VALUES (6, 8, 3, 'customer', 'changed_mind', 'approved');
INSERT INTO "public"."order_cancellation" VALUES (7, 6, 3, 'customer', 'changed_mind', 'approved');
INSERT INTO "public"."order_cancellation" VALUES (8, 5, 3, 'customer', 'changed_mind', 'approved');
INSERT INTO "public"."order_cancellation" VALUES (9, 4, 3, 'customer', 'changed_mind', 'approved');
INSERT INTO "public"."order_cancellation" VALUES (10, 3, 3, 'customer', 'found_better_price', 'approved');
INSERT INTO "public"."order_cancellation" VALUES (11, 2, 3, 'customer', 'shipping_delay', 'approved');
INSERT INTO "public"."order_cancellation" VALUES (12, 16, 3, 'customer', 'found_better_price', 'approved');
INSERT INTO "public"."order_cancellation" VALUES (13, 30, 3, 'customer', 'changed_mind: dfhjrefg', 'approved');

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
INSERT INTO "public"."order_item" VALUES (1, 1, 2, '2025-07-19 16:41:53.370525', 1, 20.00, NULL);
INSERT INTO "public"."order_item" VALUES (2, 2, 2, '2025-07-19 16:55:41.083519', 1, 20.00, NULL);
INSERT INTO "public"."order_item" VALUES (3, 3, 4, '2025-07-19 17:15:19.301405', 1, 35.00, NULL);
INSERT INTO "public"."order_item" VALUES (4, 4, 2, '2025-07-19 17:26:33.608038', 1, 20.00, NULL);
INSERT INTO "public"."order_item" VALUES (5, 5, 1, '2025-07-19 17:30:03.288688', 1, 14.99, NULL);
INSERT INTO "public"."order_item" VALUES (6, 6, 4, '2025-07-19 17:31:51.67231', 1, 35.00, NULL);
INSERT INTO "public"."order_item" VALUES (7, 8, 4, '2025-07-19 17:39:19.866763', 1, 35.00, NULL);
INSERT INTO "public"."order_item" VALUES (8, 9, 2, '2025-07-20 00:08:53.270913', 1, 20.00, NULL);
INSERT INTO "public"."order_item" VALUES (9, 10, 8, '2025-07-20 00:39:28.275277', 1, 3.00, NULL);
INSERT INTO "public"."order_item" VALUES (10, 11, 9, '2025-07-20 00:40:31.460748', 1, 17.60, NULL);
INSERT INTO "public"."order_item" VALUES (11, 12, 4, '2025-07-20 00:47:29.859351', 1, 10.50, NULL);
INSERT INTO "public"."order_item" VALUES (12, 13, 2, '2025-07-20 00:58:15.487039', 1, 6.00, NULL);
INSERT INTO "public"."order_item" VALUES (14, 1, 2, '2025-07-20 13:27:31.670476', 3, 4.00, 2);
INSERT INTO "public"."order_item" VALUES (15, 14, 2, '2025-07-21 23:55:40.249489', 1, 16.00, NULL);
INSERT INTO "public"."order_item" VALUES (16, 14, 6, '2025-07-21 23:55:40.249489', 1, 15.00, NULL);
INSERT INTO "public"."order_item" VALUES (17, 15, 4, '2025-07-22 00:00:00.539189', 1, 28.00, NULL);
INSERT INTO "public"."order_item" VALUES (18, 16, 4, '2025-07-22 00:10:44.242339', 1, 10.50, NULL);
INSERT INTO "public"."order_item" VALUES (19, 17, 2, '2025-07-22 00:15:45.625922', 1, 6.00, NULL);
INSERT INTO "public"."order_item" VALUES (20, 18, 2, '2025-07-22 00:19:40.318759', 1, 6.00, NULL);
INSERT INTO "public"."order_item" VALUES (21, 19, 2, '2025-07-22 23:43:44.2144', 1, 6.00, NULL);
INSERT INTO "public"."order_item" VALUES (22, 20, 2, '2025-07-24 16:24:33.672447', 1, 6.00, NULL);
INSERT INTO "public"."order_item" VALUES (23, 20, 13, '2025-07-24 16:24:33.672447', 1, 6.00, NULL);
INSERT INTO "public"."order_item" VALUES (24, 21, 8, '2025-07-24 16:55:59.814843', 1, 7.99, 1);
INSERT INTO "public"."order_item" VALUES (25, 21, 4, '2025-07-24 16:55:59.814843', 1, 28.00, 1);
INSERT INTO "public"."order_item" VALUES (26, 22, 6, '2025-07-27 02:16:26.976339', 1, 12.00, 1);
INSERT INTO "public"."order_item" VALUES (34, 30, 4, '2025-07-29 16:15:33.136326', 1, 10.50, 3);
INSERT INTO "public"."order_item" VALUES (35, 30, 5, '2025-07-29 16:15:33.136326', 1, 9.59, 1);
INSERT INTO "public"."order_item" VALUES (36, 31, 14, '2025-07-29 17:38:14.805835', 1, 15.00, 2);
INSERT INTO "public"."order_item" VALUES (37, 32, 14, '2025-07-29 20:54:02.713491', 2, 12.00, 1);
INSERT INTO "public"."order_item" VALUES (40, 34, 14, '2025-07-30 11:10:57.705865', 1, 12.00, 1);
INSERT INTO "public"."order_item" VALUES (41, 35, 14, '2025-07-30 14:49:22.31648', 1, 12.00, 1);

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
INSERT INTO "public"."payment" VALUES (1, 34, 1, 17.00, '2025-07-30 11:10:57.705865', '2025-07-30 11:10:57.705865');
INSERT INTO "public"."payment" VALUES (2, 35, 2, 17.00, '2025-07-30 14:49:22.31648', '2025-07-30 14:49:22.31648');

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
INSERT INTO "public"."review" VALUES (17, 14, 6, 4.0, 'Nice Book', '2025-07-29 19:42:03.464287');
INSERT INTO "public"."review" VALUES (18, 14, 7, 5.0, 'Damn! One of the Best Books!!', '2025-07-29 19:43:40.258937');
INSERT INTO "public"."review" VALUES (24, 103, 51, 5.0, 'Insightful and practical guide to habit formation. Changed my routine for the better!', '2025-07-01 14:22:10');
INSERT INTO "public"."review" VALUES (25, 104, 52, 4.0, 'Well written, easy to follow. Some repetitive sections though.', '2025-06-15 10:05:30');
INSERT INTO "public"."review" VALUES (26, 105, 53, 5.0, 'Life-changing book with actionable advice. Highly recommend!', '2025-07-22 09:30:45');
INSERT INTO "public"."review" VALUES (27, 105, 54, 4.0, 'Good introduction to personal finance, but a bit anecdotal.', '2025-05-12 16:45:00');
INSERT INTO "public"."review" VALUES (28, 106, 55, 5.0, 'Excellent concepts on money mindset. Inspired me to invest.', '2025-07-10 11:20:00');
INSERT INTO "public"."review" VALUES (29, 108, 57, 3.5, 'Valuable points but some ideas feel outdated.', '2025-07-25 18:35:20');
INSERT INTO "public"."review" VALUES (30, 109, 58, 5.0, 'Fascinating overview of human history. A must-read for everyone.', '2025-06-01 13:00:00');
INSERT INTO "public"."review" VALUES (31, 109, 59, 4.5, 'Very engaging and thought-provoking.', '2025-07-05 15:23:45');
INSERT INTO "public"."review" VALUES (32, 109, 60, 5.0, 'Eye-opening book with deep insights into our origins.', '2025-07-20 12:10:30');
INSERT INTO "public"."review" VALUES (33, 110, 61, 4.0, 'Beautiful philosophy and inspiring stories; helped me find purpose.', '2025-06-18 08:45:50');
INSERT INTO "public"."review" VALUES (34, 110, 62, 3.0, 'Interesting cultural insights but some chapters felt slow.', '2025-07-12 10:00:00');
INSERT INTO "public"."review" VALUES (35, 110, 63, 4.0, 'A calming read that encourages mindfulness and joy.', '2025-07-28 14:55:15');
INSERT INTO "public"."review" VALUES (36, 111, 64, 5.0, 'Excellent read on how money psychology affects financial decisions.', '2025-07-01 14:00:00');
INSERT INTO "public"."review" VALUES (37, 111, 65, 5.0, 'Practical lessons combined with engaging anecdotes.', '2025-07-15 09:20:10');
INSERT INTO "public"."review" VALUES (38, 111, 66, 4.5, 'Made me rethink my approach to saving and investing.', '2025-07-29 17:40:00');
INSERT INTO "public"."review" VALUES (39, 113, 67, 5.0, 'The definitive guide for algorithms; dense but very thorough.', '2025-06-05 13:30:00');
INSERT INTO "public"."review" VALUES (40, 113, 68, 4.5, 'Clear explanations and excellent examples for competitive programmers.', '2025-07-09 11:00:00');
INSERT INTO "public"."review" VALUES (41, 113, 69, 5.0, 'A must-have reference book for computer science students.', '2025-07-25 13:45:20');

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
INSERT INTO "public"."shipping" VALUES (1, 1, '123 Default St', 'Default City', '12345', 'USA', NULL, '2025-07-26 16:41:53.370525');
INSERT INTO "public"."shipping" VALUES (2, 2, '123 Default St', 'Default City', '12345', 'USA', NULL, '2025-07-26 16:55:41.083519');
INSERT INTO "public"."shipping" VALUES (3, 3, '123 Default St', 'Default City', '12345', 'USA', NULL, '2025-07-26 17:15:19.301405');
INSERT INTO "public"."shipping" VALUES (4, 4, 'Dhaka, Bangladesh', 'Dhaka', '1000', 'Bangladesh', NULL, '2025-07-26 17:26:33.608038');
INSERT INTO "public"."shipping" VALUES (5, 5, 'Dhaka, Bangladesh', 'Lisbon', '287328', 'Portugal', NULL, '2025-07-26 17:30:03.288688');
INSERT INTO "public"."shipping" VALUES (6, 6, 'Rashid Hall, BUET', 'Dhaka', '1000', 'Bangladesh', NULL, '2025-07-26 17:31:51.67231');
INSERT INTO "public"."shipping" VALUES (7, 8, 'Dhaka, Bangladesh', 'Dhaka', '1000', 'Bangladesh', NULL, '2025-07-26 17:39:19.866763');
INSERT INTO "public"."shipping" VALUES (8, 9, 'Rashid Hall, BUET', 'Dhaka', '1000', 'Bangladesh', NULL, '2025-07-27 00:08:53.270913');
INSERT INTO "public"."shipping" VALUES (9, 10, 'Dhaka, Bangladesh', '', '', 'USA', NULL, '2025-07-27 00:39:28.275277');
INSERT INTO "public"."shipping" VALUES (10, 11, 'Dhaka, Bangladesh', 'Dhaka', '1000', 'Bangladesh', NULL, '2025-07-27 00:40:31.460748');
INSERT INTO "public"."shipping" VALUES (11, 12, 'Dhaka, Bangladesh', '', '', 'USA', NULL, '2025-07-27 00:47:29.859351');
INSERT INTO "public"."shipping" VALUES (12, 13, 'Dhaka, Bangladesh', '', '', 'USA', NULL, '2025-07-27 00:58:15.487039');
INSERT INTO "public"."shipping" VALUES (13, 14, 'Dhaka, Bangladesh', 'Dhaka', '1000', 'Bangladesh', NULL, '2025-07-28 23:55:40.249489');
INSERT INTO "public"."shipping" VALUES (14, 15, 'Dhaka, Bangladesh', '', '', 'USA', NULL, '2025-07-29 00:00:00.539189');
INSERT INTO "public"."shipping" VALUES (15, 16, 'Dhaka, Bangladesh', '', '', 'USA', NULL, '2025-07-29 00:10:44.242339');
INSERT INTO "public"."shipping" VALUES (16, 17, 'Dhaka, Bangladesh', '', '', 'USA', NULL, '2025-07-29 00:15:45.625922');
INSERT INTO "public"."shipping" VALUES (17, 18, 'Dhaka, Bangladesh', '', '', 'USA', NULL, '2025-07-29 00:19:40.318759');
INSERT INTO "public"."shipping" VALUES (18, 19, 'Dhaka, Bangladesh', '', '', 'USA', NULL, '2025-07-29 23:43:44.2144');
INSERT INTO "public"."shipping" VALUES (19, 20, 'Dhaka, Bangladesh', 'Dhaka', '1000', 'Bangladesh', NULL, '2025-07-31 16:24:33.672447');
INSERT INTO "public"."shipping" VALUES (20, 21, 'Dhaka, Bangladesh', 'Dhaka', '1000', 'Bangladesh', NULL, '2025-07-31 16:55:59.814843');
INSERT INTO "public"."shipping" VALUES (21, 30, 'Dhaka, Bangladesh', 'Dhaka', '1000', 'Bangladesh', NULL, '2025-08-05 16:15:33.136326');
INSERT INTO "public"."shipping" VALUES (22, 31, 'Dhaka, Bangladesh', 'Dhaka', '1000', 'Bangladesh', NULL, '2025-08-05 17:38:14.805835');
INSERT INTO "public"."shipping" VALUES (23, 32, 'Dhaka, Bangladesh', 'Dhaka', '1000', 'Bangladesh', NULL, '2025-08-05 20:54:02.713491');
INSERT INTO "public"."shipping" VALUES (24, 34, 'Suhrawardy Hall, BUET', 'Dhaka', '1000', 'Bangladesh', NULL, '2025-08-06 11:10:57.705865');
INSERT INTO "public"."shipping" VALUES (25, 35, 'Dhaka, Bangladesh', 'Dhaka', '1000', 'Bangladesh', NULL, '2025-08-06 14:49:22.31648');

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
INSERT INTO "public"."sub_category" VALUES (502, 6, 'Computer Science');

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
  "hashed_password" varchar(255) COLLATE "pg_catalog"."default" NOT NULL
)
;

-- ----------------------------
-- Records of supplier
-- ----------------------------
INSERT INTO "public"."supplier" VALUES (1, 'Mohibul Sawrav', '+8801864316100', '2205018@ugrad.cse.buet.ac.bd', 'Dhaka, Bangladesh', NULL, '$2b$10$k85fI7OASs3g4QHrdi4Ug.u8mZ9u.5MoWFE1HwmrsVxWkJq.6Maze');
INSERT INTO "public"."supplier" VALUES (2, 'Rubiyan', NULL, '2205007@ugrad.cse.buet.ac.bd', NULL, NULL, '$2b$10$HYAkJJkjIKtUNkf/Ir/6VOrEYXSG2vSWvlKCNLpRzCChMsBqai8he');

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
INSERT INTO "public"."supplier_notifications" VALUES (1, 1, 'new_review', 'New Review on Your Book', 'A new 5.0-star review has been submitted for "Harry Potter" by Mohibul Islam Sawrav.', '{"rating": 5.0, "book_id": 14, "comment": "Best Fantasy Book I have read ever!!", "review_id": 16, "book_title": "Harry Potter", "customer_id": 3, "review_date": "2025-07-29T19:28:26.849296", "customer_name": "Mohibul Islam Sawrav", "customer_email": "2205018@ugrad.cse.buet.ac.bd"}', 't', '2025-07-29 19:28:26.849296');
INSERT INTO "public"."supplier_notifications" VALUES (2, 1, 'new_review', 'New Review on Your Book', 'A new 4.0-star review has been submitted for "Harry Potter" by shafin.', '{"rating": 4.0, "book_id": 14, "comment": "Nice Book", "review_id": 17, "book_title": "Harry Potter", "customer_id": 6, "review_date": "2025-07-29T19:42:03.464287", "customer_name": "shafin", "customer_email": "2205001@ugrad.cse.buet.ac.bd"}', 't', '2025-07-29 19:42:03.464287');
INSERT INTO "public"."supplier_notifications" VALUES (3, 1, 'new_review', 'New Review on Your Book', 'A new 5.0-star review has been submitted for "Harry Potter" by saber.', '{"rating": 5.0, "book_id": 14, "comment": "Damn! One of the Best Books!!", "review_id": 18, "book_title": "Harry Potter", "customer_id": 7, "review_date": "2025-07-29T19:43:40.258937", "customer_name": "saber", "customer_email": "2205017@ugrad.cse.buet.ac.bd"}', 't', '2025-07-29 19:43:40.258937');
INSERT INTO "public"."supplier_notifications" VALUES (4, 1, 'review_deleted', 'Review Deleted from Your Book', 'A 5.0-star review for "Harry Potter" by Mohibul Islam Sawrav has been deleted.', '{"rating": 5.0, "book_id": 14, "comment": "Best Fantasy Book I have read ever!!", "review_id": 16, "book_title": "Harry Potter", "customer_id": 3, "deleted_date": "2025-07-30T01:21:42.595752+06:00", "customer_name": "Mohibul Islam Sawrav", "customer_email": "2205018@ugrad.cse.buet.ac.bd"}', 't', '2025-07-30 01:21:42.595752');

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
INSERT INTO "public"."user_notifications" VALUES (1, 3, 'order_status_update', 'Order Status Updated', 'Your order #14 status has been updated to: completed', 14, 't', '2025-07-24 03:19:24.059767');
INSERT INTO "public"."user_notifications" VALUES (2, 3, 'order_status_update', 'Order Status Updated', 'Your order #30 status has been updated to: cancelled', 30, 't', '2025-07-29 16:16:26.11639');
INSERT INTO "public"."user_notifications" VALUES (3, 3, 'order_status_update', 'Order Status Updated', 'Your order #31 status has been updated to: Delivered', 31, 'f', '2025-07-29 17:40:30.134152');
INSERT INTO "public"."user_notifications" VALUES (4, 3, 'order_status_update', 'Order Status Updated', 'Your order #32 status has been updated to: delivered', 32, 'f', '2025-07-29 20:54:51.127006');
INSERT INTO "public"."user_notifications" VALUES (5, 3, 'order_status_update', 'Order Status Updated', 'Your order #14 status has been updated to: delivered', 14, 'f', '2025-07-29 21:07:00.980868');
INSERT INTO "public"."user_notifications" VALUES (6, 3, 'order_status_update', 'Order Status Updated', 'Your order #34 status has been updated to: processing', 34, 'f', '2025-07-30 11:12:02.487853');
INSERT INTO "public"."user_notifications" VALUES (7, 3, 'order_status_update', 'Order Status Updated', 'Your order #34 status has been updated to: shipped', 34, 'f', '2025-07-30 11:13:45.978494');
INSERT INTO "public"."user_notifications" VALUES (8, 3, 'order_status_update', 'Order Status Updated', 'Your order #35 status has been updated to: delivered', 35, 'f', '2025-07-30 14:50:09.762496');

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
INSERT INTO "public"."wishlist" VALUES (5, 9, NULL, '2025-07-23 13:49:44.809874');
INSERT INTO "public"."wishlist" VALUES (6, 10, NULL, '2025-07-24 02:40:22.408042');
INSERT INTO "public"."wishlist" VALUES (7, NULL, NULL, '2025-07-29 20:52:34.39425');
INSERT INTO "public"."wishlist" VALUES (8, NULL, NULL, '2025-07-29 20:52:35.105286');
INSERT INTO "public"."wishlist" VALUES (9, NULL, NULL, '2025-07-29 20:52:46.18707');
INSERT INTO "public"."wishlist" VALUES (10, NULL, NULL, '2025-07-29 20:52:46.218569');
INSERT INTO "public"."wishlist" VALUES (11, NULL, NULL, '2025-07-30 11:12:06.857182');
INSERT INTO "public"."wishlist" VALUES (12, NULL, NULL, '2025-07-30 11:12:07.176383');
INSERT INTO "public"."wishlist" VALUES (13, NULL, NULL, '2025-07-30 11:12:10.869543');
INSERT INTO "public"."wishlist" VALUES (14, NULL, NULL, '2025-07-30 11:12:11.138738');
INSERT INTO "public"."wishlist" VALUES (15, NULL, NULL, '2025-07-30 11:12:18.658976');
INSERT INTO "public"."wishlist" VALUES (16, NULL, NULL, '2025-07-30 11:12:18.918366');
INSERT INTO "public"."wishlist" VALUES (17, NULL, NULL, '2025-07-30 11:13:50.873595');
INSERT INTO "public"."wishlist" VALUES (18, NULL, NULL, '2025-07-30 11:13:51.144893');

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
INSERT INTO "public"."wishlist_item" VALUES (21, 1, 3, '2025-07-29 14:55:13.530041');
INSERT INTO "public"."wishlist_item" VALUES (22, 1, 13, '2025-07-29 15:15:33.772547');

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
    -- Insert notification for all admins
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
-- Function structure for notify_admin_payment_received
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."notify_admin_payment_received"();
CREATE FUNCTION "public"."notify_admin_payment_received"()
  RETURNS "pg_catalog"."trigger" AS $BODY$
DECLARE
    customer_id INTEGER;
    customer_name VARCHAR;
    customer_email VARCHAR;
    payment_method VARCHAR;
BEGIN
    -- Get customer details for the order
    SELECT o.customer_id, c.name, c.email
      INTO customer_id, customer_name, customer_email
      FROM "order" o
      JOIN customer c ON o.customer_id = c.customer_id
     WHERE o.order_id = NEW.order_id;

    -- Get payment method name
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
    -- Insert notifications for all suppliers of the book whose review was deleted
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
    -- Only create notification if status actually changed
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
-- Function structure for update_book_recommendations
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."update_book_recommendations"();
CREATE FUNCTION "public"."update_book_recommendations"()
  RETURNS "pg_catalog"."trigger" AS $BODY$
BEGIN
    IF OLD.average_rating IS DISTINCT FROM NEW.average_rating THEN
        DELETE FROM book_recommendation;
        
        INSERT INTO book_recommendation (recommendation_id, book_id)
        SELECT 
            ROW_NUMBER() OVER (ORDER BY average_rating DESC, publication_date DESC, book_id ASC) as recommendation_id,
            book_id
        FROM book 
        WHERE is_active = true 
          AND average_rating IS NOT NULL
          AND average_rating > 0
        ORDER BY average_rating DESC, publication_date DESC, book_id ASC
        LIMIT 10;
    END IF;
    
    RETURN NEW;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

-- ----------------------------
-- Function structure for update_book_recommendations_fn
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."update_book_recommendations_fn"();
CREATE FUNCTION "public"."update_book_recommendations_fn"()
  RETURNS "pg_catalog"."trigger" AS $BODY$
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
SELECT setval('"public"."admin_notifications_notification_id_seq"', 77, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."author_author_id_seq"
OWNED BY "public"."author"."author_id";
SELECT setval('"public"."author_author_id_seq"', 18, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."book_book_id_seq"
OWNED BY "public"."book"."book_id";
SELECT setval('"public"."book_book_id_seq"', 17, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."book_category_category_id_seq"
OWNED BY "public"."book_category"."category_id";
SELECT setval('"public"."book_category_category_id_seq"', 6, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."book_format_book_format_id_seq"
OWNED BY "public"."book_format"."book_format_id";
SELECT setval('"public"."book_format_book_format_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."cart_cart_id_seq"
OWNED BY "public"."cart"."cart_id";
SELECT setval('"public"."cart_cart_id_seq"', 23, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."cart_item_cart_item_id_seq"
OWNED BY "public"."cart_item"."cart_item_id";
SELECT setval('"public"."cart_item_cart_item_id_seq"', 87, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."chat_message_message_id_seq"
OWNED BY "public"."chat_message"."message_id";
SELECT setval('"public"."chat_message_message_id_seq"', 4, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."chat_session_session_id_seq"
OWNED BY "public"."chat_session"."session_id";
SELECT setval('"public"."chat_session_session_id_seq"', 2, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."customer_customer_id_seq"
OWNED BY "public"."customer"."customer_id";
SELECT setval('"public"."customer_customer_id_seq"', 11, true);

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
SELECT setval('"public"."inventory_inventory_id_seq"', 15, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."order_cancellation_cancellation_id_seq"
OWNED BY "public"."order_cancellation"."cancellation_id";
SELECT setval('"public"."order_cancellation_cancellation_id_seq"', 13, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."order_item_order_item_id_seq"
OWNED BY "public"."order_item"."order_item_id";
SELECT setval('"public"."order_item_order_item_id_seq"', 41, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."order_order_id_seq"
OWNED BY "public"."order"."order_id";
SELECT setval('"public"."order_order_id_seq"', 35, true);

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
ALTER SEQUENCE "public"."review_review_id_seq"
OWNED BY "public"."review"."review_id";
SELECT setval('"public"."review_review_id_seq"', 42, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."shipping_shipping_id_seq"
OWNED BY "public"."shipping"."shipping_id";
SELECT setval('"public"."shipping_shipping_id_seq"', 25, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sub_category_sub_category_id_seq"
OWNED BY "public"."sub_category"."sub_category_id";
SELECT setval('"public"."sub_category_sub_category_id_seq"', 502, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."supplier_notifications_notification_id_seq"
OWNED BY "public"."supplier_notifications"."notification_id";
SELECT setval('"public"."supplier_notifications_notification_id_seq"', 4, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."supplier_supplier_id_seq"
OWNED BY "public"."supplier"."supplier_id";
SELECT setval('"public"."supplier_supplier_id_seq"', 2, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."user_notifications_notification_id_seq"
OWNED BY "public"."user_notifications"."notification_id";
SELECT setval('"public"."user_notifications_notification_id_seq"', 8, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."wishlist_item_wishlist_item_id_seq"
OWNED BY "public"."wishlist_item"."wishlist_item_id";
SELECT setval('"public"."wishlist_item_wishlist_item_id_seq"', 22, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."wishlist_wishlist_id_seq"
OWNED BY "public"."wishlist"."wishlist_id";
SELECT setval('"public"."wishlist_wishlist_id_seq"', 18, true);

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
-- Triggers structure for table book
-- ----------------------------
CREATE TRIGGER "update_book_recommendations" AFTER UPDATE ON "public"."book"
FOR EACH ROW
EXECUTE PROCEDURE "public"."update_book_recommendations_fn"();
CREATE TRIGGER "update_book_recommendations_trigger" AFTER UPDATE ON "public"."book"
FOR EACH ROW
EXECUTE PROCEDURE "public"."update_book_recommendations"();

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
-- Uniques structure for table book_format
-- ----------------------------
ALTER TABLE "public"."book_format" ADD CONSTRAINT "book_format_book_id_format_id_key" UNIQUE ("book_id", "format_id");

-- ----------------------------
-- Primary Key structure for table book_format
-- ----------------------------
ALTER TABLE "public"."book_format" ADD CONSTRAINT "book_format_pkey" PRIMARY KEY ("book_format_id");

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
-- Triggers structure for table payment
-- ----------------------------
CREATE TRIGGER "trigger_admin_payment_received" AFTER INSERT ON "public"."payment"
FOR EACH ROW
EXECUTE PROCEDURE "public"."notify_admin_payment_received"();

-- ----------------------------
-- Primary Key structure for table payment
-- ----------------------------
ALTER TABLE "public"."payment" ADD CONSTRAINT "payment_pkey" PRIMARY KEY ("payment_id");

-- ----------------------------
-- Primary Key structure for table payment_method
-- ----------------------------
ALTER TABLE "public"."payment_method" ADD CONSTRAINT "payment_method_pkey" PRIMARY KEY ("payment_method_id");

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
ALTER TABLE "public"."book" ADD CONSTRAINT "book_sub_category_id_fkey" FOREIGN KEY ("sub_category_id") REFERENCES "public"."sub_category" ("sub_category_id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table book_author
-- ----------------------------
ALTER TABLE "public"."book_author" ADD CONSTRAINT "book_author_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "public"."author" ("author_id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "public"."book_author" ADD CONSTRAINT "book_author_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "public"."book" ("book_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table book_format
-- ----------------------------
ALTER TABLE "public"."book_format" ADD CONSTRAINT "book_format_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "public"."book" ("book_id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "public"."book_format" ADD CONSTRAINT "book_format_format_id_fkey" FOREIGN KEY ("format_id") REFERENCES "public"."format" ("format_id") ON DELETE CASCADE ON UPDATE NO ACTION;

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
ALTER TABLE "public"."order_item" ADD CONSTRAINT "order_item_format_id_fkey" FOREIGN KEY ("format_id") REFERENCES "public"."format" ("format_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."order_item" ADD CONSTRAINT "order_item_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."order" ("order_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table payment
-- ----------------------------
ALTER TABLE "public"."payment" ADD CONSTRAINT "payment_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."order" ("order_id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "public"."payment" ADD CONSTRAINT "payment_payment_method_id_fkey" FOREIGN KEY ("payment_method_id") REFERENCES "public"."payment_method" ("payment_method_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

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
