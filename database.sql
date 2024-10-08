CREATE DATABASE FOOD_RECIPE;
USE FOOD_RECIPE;

-- TABLE FOR USERS
CREATE TABLE USERS (
	USER_ID INT auto_increment PRIMARY KEY,
    USER_FIRST_NAME varchar(100) not null,
    USER_LAST_NAME varchar(100) NOT NULL,
    USER_EMAIL varchar(100) NOT NULL UNIQUE,
    USER_BIRTHDATE date,
    PROFILE_PIC varchar(255),
    GOOGLE_ID varchar(100) NOT NULL unique, -- id được cấp bởi google (?)
    USER_CREATE_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);

-- TOKEN FOR GOOGLE AUTHENTICATION
CREATE TABLE OAUTH_TOKENS (
	TOKEN_ID INT auto_increment PRIMARY KEY,
    USER_ID INT,
    ACCESS_TOKEN varchar(255) NOT NULL,
    REFRESH_TOKEN VARCHAR(255),
    EXPIRES INT, -- THỜI GIAN HẾT HẠN TOKEN (s)
	foreign key (USER_ID) REFERENCES USERS(USER_ID) ON DELETE CASCADE
    );

-- TABLE FOR RECIPE
CREATE TABLE RECIPES (
	RECIPE_ID INT auto_increment PRIMARY KEY,
    USER_ID INT,
    TITTLE VARCHAR(255) NOT NULL,
    DESCRIPTION TEXT,
    PREP_TIME INT, -- THỜI GIAN CHUẨN BỊ(m)
    COOK_TIME INT, -- THỜI GIAN NẤU (m)
    SERVINGS INT, -- CHO MẤY NGƯỜI
    VIDEO_PATH VARCHAR(255), -- MỖI CÔNG THỨC CÓ 1 VIDEO
    RECIPE_CREATE_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    NOTE TEXT, -- GHI CHÚ NẾU CÓ
    foreign key (USER_ID) REFERENCES USERS(USER_ID) ON DELETE CASCADE
	);

-- TABLE FOR INGREDIENTS
CREATE TABLE INGREDIENTS (
	INGREDIENT_ID INT auto_increment PRIMARY KEY,
    INGREDIENT_NAME VARCHAR(100) NOT NULL
    );
    
-- LINK TABLE BETWEEN RECIPE AND INGREDIENTS
CREATE TABLE RECIPE_INGREDIENTS (
	RECIPE_ID INT,
    INGREDIENT_ID INT,
    QUANTITY decimal(5,2),
    UNIT VARCHAR(30), -- ĐƠN VỊ (MUỖNG, GAM,...)
	PRIMARY KEY (RECIPE_ID, INGREDIENT_ID),
    FOREIGN KEY (RECIPE_ID) REFERENCES RECIPES(RECIPE_ID) ON DELETE CASCADE,
    FOREIGN KEY (INGREDIENT_ID) REFERENCES INGREDIENTS(INGREDIENT_ID) ON DELETE CASCADE
    );

-- TABLE FOR RECIPE STEPS
CREATE TABLE STEPS(
	STEP_ID INT auto_increment PRIMARY KEY,
    RECIPE_ID INT,
    STEP_NUMBER INT NOT NULL,
    INSTRUCTION TEXT NOT NULL,
    FOREIGN KEY (RECIPE_ID) REFERENCES RECIPES(RECIPE_ID) ON DELETE CASCADE
    );
    
-- TABLE FOR RECIPE IMAGE
CREATE TABLE IMAGE(
	IMG_ID INT auto_increment PRIMARY KEY,
    RECIPE_ID INT,
    IMG_URL VARCHAR(255),
    foreign key (RECIPE_ID) REFERENCES RECIPES(RECIPES_ID) ON DELETE CASCADE
	);
    
-- TABLE FOR TAGS (EX: MÓN CHAY, MÓN CÁ, BÁNH NGỌT,...)
CREATE TABLE TAGS(
	TAG_ID INT auto_increment PRIMARY KEY,
    TAG_NAME VARCHAR(50) NOT NULL UNIQUE
    );
    
-- LINK TABLE BETWEEN RECIPE AND TAGS
CREATE TABLE RECIPE_TAG(
	TAG_ID INT,
    RECIPE_ID INT,
    PRIMARY KEY (TAG_ID, RECIPE_ID),
    foreign key (TAG_ID) references TAGS(TAG_ID) ON DELETE CASCADE, 
    foreign key (RECIPE_ID) REFERENCES RECIPES(RECIPE_ID) ON DELETE CASCADE
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
    FOREIGN KEY (USER_ID) REFERENCES USER(USER_ID) ON DELETE CASCADE
    );
    
-- TABLE FOR FAVORITE RECIPE
CREATE TABLE FAVORITE(
	USER_ID INT,
    RECIPE_ID INT,
    FAVORITE_CREATED_AT TIMESTAMP DEFAULT current_timestamp,
    PRIMARY KEY (USER_ID, RECIPE_ID),
    FOREIGN KEY (USER_ID) REFERENCES USERS(USER_ID) ON DELETE CASCADE,
    FOREIGN KEY (RECIPE_ID) REFERENCES RECIPES(REIPCE_ID) ON DELETE CASCADE
    );