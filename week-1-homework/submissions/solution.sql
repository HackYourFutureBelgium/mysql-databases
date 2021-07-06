--- 1.Which car has the highest accelerate value?

SELECT make
FROM car_names
WHERE id IN
    (SELECT id
     FROM cars_data
     WHERE accelerate IN
         (SELECT max(accelerate)
          FROM cars_data));

--- 2.List the weight of the cars made in the 1980s (1980 and later).

SELECT weight
FROM cars_data
WHERE YEAR BETWEEN 1980 AND 1990;

--- 3.List all the cars made by chevrolet (where the model is chevrolet).

SELECT *
FROM car_names
WHERE model="chevrolet";

--- 4.What is the full name of the maker of the plymouth model?

SELECT full_name
FROM car_makers
WHERE id IN
    (SELECT maker
     FROM models
     WHERE name="plymouth");

--- 5.Which continent is the Volvo car maker from?

SELECT continent
FROM continents
WHERE id IN
    (SELECT continent
     FROM countries
     WHERE id IN
         (SELECT country
          FROM car_makers
          WHERE maker= "volvo"));

--- 6.How many car models are audi?

SELECT count(*)
FROM car_names
WHERE model="audi";

--- 7.List all makers whose names start with s.

SELECT *
FROM car_makers
WHERE maker LIKE "s%";

--- 8.How many cars have a horsepower more than 100 but less than 200?

SELECT count(id)
FROM cars_data
WHERE horsepower BETWEEN 100 AND 200;

--- 9.List all car makers from australia.

SELECT full_name
FROM car_makers
WHERE country IN
    (SELECT id
     FROM countries
     WHERE name ="australia");

--- 10.List all car makers not from sweden, japan, france or germany.

SELECT maker
FROM car_makers
WHERE country IN
    (SELECT id
     FROM countries
     WHERE name NOT IN ('sweden',
                        'japan',
                        'france',
                        'germany'));

--- bonus 1.List all cars where the make starts with an a and ends with an r.

SELECT *
FROM car_names
WHERE make LIKE "a%r";

--- bonus 2.How many cars have more than 6 cylinders, weight less than 4000 but more than 3000, and was not made in the years 1970, 1975 or 1981.
