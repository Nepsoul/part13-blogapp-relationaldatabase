CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    title text NOT NULL,
    url text NOT NULL,
    author text NOT NULL,
    likes integer NULL
   );