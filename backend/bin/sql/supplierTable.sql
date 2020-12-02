CREATE TABLE supplier (
	"idSupplier" SERIAL PRIMARY KEY,
	"privateCompanyNumber" INTEGER DEFAULT 000000000,
	phone VARCHAR(40),
	"prefixNumber" INTEGER,
	email VARCHAR(255),
    "contactName" VARCHAR(30),
	"postalCode" INTEGER DEFAULT 0000000
)