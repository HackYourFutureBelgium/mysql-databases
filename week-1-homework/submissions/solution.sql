-- 1. Which car has the highest accelerate value?.

SELECT id
FROM cars_data
ORDER BY accelerate DESC
LIMIT 1;


SELECT model
FROM car_names
WHERE id = 307;

-- 2.List the weight of the cars made in the 1980s (1980 and later).

SELECT weight
FROM cars_data
WHERE YEAR >= 1980;

-- 3.List all the cars made by chevrolet (where the model is chevrolet).

SELECT *
FROM car_names
WHERE model = 'chevrolet';

-- 4. What is the full name of the maker of the plymouth model?

SELECT maker
FROM models
WHERE name = 'plymouth';


SELECT full_name
FROM car_makers
WHERE id ="6";

-- 5.Which continent is the Volvo car maker from?

SELECT country
FROM car_makers
WHERE maker = 'Volvo';


SELECT continent
FROM countries
WHERE id =6;


SELECT continent
FROM continents
WHERE id =2;

-- 6. How many car models are audi?

SELECT count(*)
FROM car_names
WHERE model = 'audi';

-- 7. List all makers whose names start with s.

SELECT maker
FROM car_makers
WHERE full_name LIKE 's%';

-- 8. How many cars have a horsepower more than 100 but less than 200?

SELECT COUNT(*)
FROM cars_data
WHERE horsepower BETWEEN 100 AND 200;

-- 9. List all car makers from australia.

SELECT id
FROM countries
WHERE name = 'australia';


SELECT maker
FROM car_makers
WHERE country = '11';

-- 10. List all car makers not from sweden, japan, france or germany.

SELECT id
FROM countries
WHERE name IN ('sweden',
               'japan',
               'france',
               'germany');


SELECT maker
FROM car_makers
WHERE country NOT IN (2,
                      3,
                      4,
                      6);

-- 1. List all cars where the make starts with an a and ends with an r.

SELECT *
FROM car_makers
WHERE maker LIKE 'a%r';

-- 2. How many cars have more than 6 cylinders, weight less than 4000 but more than 3000,
-- and was not made in the years 1970, 1975 or 1981.

SELECT COUNT(*)
FROM cars_data
WHERE cylinders > 6
  AND weight BETWEEN 3000 AND 4000
  AND YEAR NOT IN(1970,
                  1975,
                  1981);