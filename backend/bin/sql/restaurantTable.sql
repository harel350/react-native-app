CREATE TABLE restaurant(
	"idRestaurant" SERIAL,
	"restaurantName" VARCHAR(200),
	"restaurantAddress" VARCHAR(255),
	"idMenu" INTEGER,
	"restaurantWebsite" TEXT,
	"imagePath" TEXT,
	seats INTEGER,
	"seatsTaken" INTEGER DEFAULT 0,
	"restaurantPhone" VARCHAR(30),
	"restaurantDeliveryPhone" VARCHAR(30),
	"contactName" VARCHAR(20),
	"restaurantEmail" VARCHAR(100),
	"restaurantCompanyNumber" VARCHAR(9),
	"orderTable" BOOLEAN DEFAULT TRUE,
	"takeAway" BOOLEAN DEFAULT TRUE,
	delivery BOOLEAN DEFAULT TRUE,
	description TEXT,
	
	"restaurantOpeningHour" VARCHAR(255)[],
	PRIMARY KEY("restaurantName","restaurantCompanyNumber")
)
INSERT INTO restaurant(
	"restaurantName",
	"restaurantAddress",
	
	"restaurantWebsite",
	"idMenu",
	"imagePath",
	seats,
	"restaurantPhone",
	"restaurantDeliveryPhone",
	"contactName",
	"restaurantEmail",
	"restaurantCompanyNumber" ,
	description,
	"restaurantOpeningHour")
VALUES ('BLACK','השחם 4,פתח תקווה','https://blackbarburger.co.il/',5,'images\\nfblack.jpg',20,'039315522',null,'moshe','black2@gmail.com',513839241,'evning night rest for family',
	   '{{A,10:00-21:00},{B,10:00-21:00},{C,10:00-21:00},{D,10:00-21:00},{E,10:00-21:00},{F,10:00-21:00}}')