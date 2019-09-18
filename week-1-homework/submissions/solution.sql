--- 1. Which car has the highest accelerate value?
SELECT make
FROM car_names
WHERE id IN
    (SELECT id
     FROM cars_data
     WHERE accelerate IN
         (SELECT Max(accelerate)
          FROM cars_data));
--- result: 'peugeot 504' & 'vw pickup'

--- 2. List the weight of the cars made in the 1980s (1980 and later).
SELECT weight 
FROM   cars_data 
WHERE  year >= 1980;
--- result: 90 rows returned

--- 3. List all the cars made by chevrolet (where the model is chevrolet).
SELECT make 
FROM   car_names 
WHERE  model = 'chevrolet'; 
--- result: 48 rows returned

--- 4. What is the full name of the maker of the plymouth model?
SELECT full_name
FROM car_makers
WHERE id IN
    (SELECT maker
     FROM models
     WHERE name = 'plymouth');
---  result:  'Chrysler'

--- 5. Which continent is the Volvo car maker from?
SELECT continent
FROM continents
WHERE id IN
    (SELECT continent
     FROM countries
     WHERE id IN
         (SELECT country
          FROM car_makers
          WHERE id IN
              (SELECT maker
               FROM models
               WHERE name = 'volvo')));
--- result: 'europe'

--- 6. How many car models are audi?
SELECT count(id)
FROM car_names
WHERE model LIKE '%audi%';
 --- result: 7

--- 7. List all makers whose names start with s.
SELECT maker
FROM car_makers
WHERE maker LIKE 's%';
--- result: 'saab' ,'subaru'

--- 8. How many cars have a horsepower more than 100 but less than 200?
SELECT COUNT(id)
FROM cars_data
WHERE horsepower BETWEEN 100 AND 200;
--- result: 164 rows returned

--- 9. List all car makers from australia.
SELECT maker
FROM car_makers
WHERE country IN
    (SELECT id
     FROM countries
     WHERE name = 'australia');
--- result: 0 rows returned

--- 10. List all car makers not from sweden, japan, france or germany.
SELECT maker
FROM car_makers
WHERE country IN
    (SELECT id
     FROM countries
     WHERE name NOT IN ('sweden',
                        'japan',
                        'france',
                        'germany'));
--- result: 'amc','gm','ford','chrysler','fiat','triumph','kia','hyundai'

--- 11. List all cars where the make starts with an a and ends with an r.
SELECT *
FROM car_names
WHERE make LIKE 'a%r'
--- result: ['45', 'amc', 'amc matador'], ['94', 'amc', 'amc matador'], ['142', 'amc', 'amc matador'],
---         ['170', 'amc', 'amc matador'], ['184', 'amc', 'amc pacer'], ['197', 'amc', 'amc matador']

--- 12. How many cars have more than 6 cylinders, weight less than 4000 but more than 3000, and was not made in the years 1970, 1975 or 1981.
SELECT *
FROM cars_data
WHERE cylinders > 6
  AND weight > 3000 AND weight < 4000  
  AND YEAR NOT IN (1970,
                   1975,
                   1981) ;
--- result: 26 rows returned.