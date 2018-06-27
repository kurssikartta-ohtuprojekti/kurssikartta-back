createdb kurssikartta
psql -c 'CREATE TABLE accounts (id SERIAL PRIMARY KEY, username text UNIQUE NOT NULL, passwordhash text NOT NULL, role text NOT NULL, courses text[] NOT NULL);' kurssikartta
psql -c "INSERT INTO accounts(username, passwordhash, role, courses) VALUES ('admin', '\$2b\$10\$uU73lUl5JQEV1xx567JcsuQsReqZsb8AKDvpRsyXREfnYFuD690uq', 'admin', '{}');" kurssikartta
