 
--Which car has the highest accelerate value?
1.select cars_data.accelerate,car_names.model
    -> from cars_data
    -> inner join car_names
    -> on cars_data.id = car_names.id;

--What is the full name of the maker of the plymouth model?
4.select car_makers.full_name, car_names.model
    -> from car_makers
    -> inner join car_names
    -> on car_makers.id = car_names.id;
--How many car models are audi?
6.select * from models where name = 'audi';

--List all makers whose names start with s
 7.select * from car_makers where maker like 's%';

--How many cars have a horsepower more than 100 but less than 200?
 8.select * from cars_data where horsepower > 100;

 --bonus
 11.select * from car_names where make like 'a%,%r';
 
 
 
 
 
--solutions homework2

--What is the name and the population of the most populated city in India

2.SELECT Name, Population FROM city 
                                           
WHERE Population = (SELECT Max(Population) FROM city);

-- Find which countries do not have a capital.

 3.SELECT Name, Population FROM country WHERE Population = (SELECT Population FROM country WHERE

   Population IS NOT NULL ORDER BY Population ASC LIMIT 1);


--Which country has the lowest population? List all if more than one
4. SELECT Name, Population FROM city

   ORDER BY Population ASC LIMIT 5;

--What are the names of all the cities in Vietnam?

 5.select * from city where countrycode = 'vtn';

--Find all the names of the districts in the Netherlands.

9. SELECT DISTINCT district FROM city WHERE countrycode = "NLD";



imdb
select min(age) from actors where gender = 'f';
select min(age) from actors where gender = 'm';
select max(age) from actors where gender = 'm';
select max(age) from actors where gender = 'f';


 

 
