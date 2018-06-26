createdb kurssikartta
psql -c 'CREATE TABLE accounts (id SERIAL PRIMARY KEY, username text UNIQUE NOT NULL, passwordhash text NOT NULL, role text NOT NULL, courses text[]);' kurssikartta
psql -c "INSERT INTO accounts(username, passwordhash, role) VALUES ('admin', '\$2b\$10\$HVRrOciJcxECI.D7Nkgd4Obnb8LY.0uWYNd8EhSvygDiAFWYzwlw6', 'admin');" kurssikartta
