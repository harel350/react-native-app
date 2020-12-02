CREATE TABLE Customers(
	idCustomer SERIAL PRIMARY KEY,
	userName VARCHAR(40) NOT NULL UNIQUE,
	password VARCHAR(30) NOT NULL,
	email  VARCHAR(100) NOT NULL UNIQUE,
	countryCode INTEGER,
	city VARCHAR(255),
	street VARCHAR(255),
	houseNumber VARCHAR(20),
	phone VARCHAR(40),
	FOREIGN KEY (countryCode) REFERENCES CountryCode(idCountryCode)
	
)