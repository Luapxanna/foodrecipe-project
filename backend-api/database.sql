CREATE DATABASE FOOD_RECIPE;
USE FOOD_RECIPE;

-- TABLE FOR USERS
CREATE TABLE USERS (
	USER_ID INT auto_increment PRIMARY KEY,
    USER_NAME varchar(100) not null,
    USER_EMAIL varchar(100) NOT NULL UNIQUE,
    PASSWORD_HASH VARCHAR(255) NOT NULL,
    USER_BIRTHDATE date,
    PROFILE_PIC varchar(255),
    USER_CREATE_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);

-- TABLE FOR RECIPE
CREATE TABLE RECIPES (
	RECIPE_ID INT auto_increment PRIMARY KEY,
    USER_ID INT,
    TITTLE VARCHAR(255) NOT NULL,
    DESCRIPTION TEXT, -- THÔNG TIN + NGUYÊN LIỆU
    TAGS TEXT, -- CÁC THẺ CỦA CÔNG THỨC
    PREP_TIME INT, -- THỜI GIAN CHUẨN BỊ(m)
    COOK_TIME INT, -- THỜI GIAN NẤU (m)
    SERVINGS INT, -- CHO MẤY NGƯỜI
    INSTRUCTION TEXT, -- CÁC BƯỚC THỰC HIỆN
    RECIPE_CREATE_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    NOTE TEXT, -- GHI CHÚ NẾU CÓ
    IMG_URL VARCHAR(255),
    foreign key (USER_ID) REFERENCES USERS(USER_ID) ON DELETE CASCADE
	);
    
-- TABLE FOR REVIEW
CREATE TABLE REVIEWS (
	REVIEW_ID INT auto_increment PRIMARY KEY,
    RECIPE_ID INT,
    USER_ID INT,
    RATE INT CHECK (RATE >= 1 AND RATE <= 5),
    COMMENT TEXT,
    REVIEW_CREATE_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (RECIPE_ID) REFERENCES RECIPES(RECIPE_ID) ON DELETE CASCADE,
    FOREIGN KEY (USER_ID) REFERENCES USERS(USER_ID) ON DELETE CASCADE
    );
    
-- TABLE FOR FAVORITE RECIPE
CREATE TABLE FAVORITE(
    FAVORITE_ID INT auto_increment primary key,
	USER_ID INT,
    RECIPE_ID INT,
    FAVORITE_CREATED_AT TIMESTAMP DEFAULT current_timestamp,
    FOREIGN KEY (USER_ID) REFERENCES USERS(USER_ID) ON DELETE CASCADE,
    FOREIGN KEY (RECIPE_ID) REFERENCES RECIPES(RECIPE_ID) ON DELETE CASCADE
    );
