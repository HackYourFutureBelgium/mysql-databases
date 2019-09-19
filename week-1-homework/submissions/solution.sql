--- 1. Which car has the highest accelerate value?

SELECT model FROM car_names WHERE id = (SELECT id FROM cars_data ORDER BY accelerate DESC LIMIT 1);

--- 2. List the weight of the cars made in the 1980s (1980 and later).

SELECT weight From cars_data WHERE year <= 1980;

--- 3.List all the cars made by chevrolet (where the model is chevrolet).

SELECT model, maker FROM car_names,car_makers WHERE car_names.model = 'chevrolet' AND car_makers.maker ='chevrolet';

--- 4. What is the full name of the maker of the plymouth model?

SELECT full_name FROM car_makers , models WHERE models.name = 'plymouth';  
---or
SELECT full_name FROM car_makers , car_names WHERE car_names.model = 'plymouth';

--- 5.Which continent is the Volvo car maker from?

SELECT continent FROM continents WHERE id =(SELECT continent FROM countries WHERE id = (SELECT country FROM car_makers WHERE maker = 'Volvo'));

--- 6. How many car models are audi?

SELECT count(*) FROM car_names WHERE model= 'audi';

--- 7. List all makers whose names start with s.

select * from car_makers where full_name like 's%';

--- 8. How many cars have a horsepower more than 100 but less than 200?

select count(*) from cars_data where horsepower BETWEEN 100 AND 200;

---9. List all car makers from australia.
SELECT maker FROM car_makers WHERE country = (SELECT id FROM countries  WHERE name = 'australia');

---10. List all car makers not from sweden, japan, france or germany.

SELECT maker FROM car_makers WHERE (country <>(SELECT id FROM countries  WHERE name  = 'sweden')) AND (country <>(SELECT id FROM countries  WHERE name  = 'japan')) AND (country <>(SELECT id FROM countries  WHERE name  = 'france')) AND (country <>(SELECT id FROM countries  WHERE name  = 'germany'))


