CREATE TABLE FORM (
	idform SERIAL PRIMARY KEY,
	"nameField" VARCHAR(50) NOT NULL,
	keyboard VARCHAR(30) DEFAULT 'default',
	"messageError" TEXT DEFAULT 'input not valid',
	required BOOLEAN DEFAULT true,
	"formCode" VARCHAR(20) NOT NULL,
	/*formkey VARCHAR(50)[];*/
)