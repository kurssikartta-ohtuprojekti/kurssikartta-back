createdb kurssikartta
psql -c 'CREATE TABLE accounts (id SERIAL PRIMARY KEY, username text UNIQUE NOT NULL, passwordhash text NOT NULL, role text NOT NULL, courses text[]);' kurssikartta
psql -c "INSERT INTO accounts VALUES (DEFAULT, 'admin', '\$2b\$10\$4tWSs8g8yKlEW0m0dJVnXe.vqNLAiPanrhUv8ekT.TqmNUN4CXnae', 'admin');" kurssikartta
