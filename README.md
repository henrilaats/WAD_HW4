# WAD_HW4

Team members:
* Gloria Krieger,
* Henri Laats,
* Paule Leslie Kuipou

How to run:
1) Create database in Postgres
2) Create Table in Postgres Query Editor:
   

   CREATE TABLE posts (
   id SERIAL,
   title varchar(255) NOT NULL,
   body varchar(255) NOT NULL,
   likes int NOT NULL,
   author varchar(255) NOT NULL
   );


3) In database.js change password, database and username.