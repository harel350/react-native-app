CREATE TABLE login(
	"userName" VARCHAR(100) UNIQUE,
	password VARCHAR(100),
	"IsSupplier" BOOLEAN DEFAULT false,
	"IsCustomer" BOOLEAN DEFAULT false,
	"supplierId" INTEGER,
	"customerId" INTEGER,
	status TEXT,
	FOREIGN KEY ("supplierId") REFERENCES suppliers("idSupplier"),
	FOREIGN KEY ("customerId") REFERENCES customers("idCustomer"),
	PRIMARY KEY("userName","password")
)