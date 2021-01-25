--- 1. Which car has the highest accelerate value?
use hyf_c5_w1_cars;
show tables;
select * from cars_data
select * from car_names;
select id, accelerate from cars_data order by accelerate desc limit 1;
select model from car_names where id = 307;

--- 2. List the weight of the cars made in the 1980s (1980 and later).
select id, weight, year from cars_data where year >= 1980;

--- 3. List all the cars made by chevrolet (where the model is chevrolet).
select * from car_names where model like "chevrolet";

--- 4. What is the full name of the maker of the plymouth model?
select * from car_makers;
select * from models;
select maker, name from models where name like "plymouth";
select full_name from car_makers where id = 6;

--- 5. Which continent is the Volvo car maker from?
select * from continents;
select * from countries;
select country from car_makers where maker like "volvo";
select continent from countries where id = 6;
select continent from continents where id = 2;

--- 6. How many car models are audi?
select count(model) from car_names where model like "audi";

--- 7. List all makers whose names start with s.
select * from car_makers where maker like "s%";

--- 8. How many cars have a horsepower more than 100 but less than 200?
select count(*) from cars_data where horsepower between 100 and 200;

--- 9. List all car makers from australia.
select * from car_makers where country = 11;

--- 10. List all car makers not from sweden, japan, france or germany.
select * from countries where name in("sweden", "japan", "france", "germany");
select * from car_makers where country not in(2, 3, 4, 6);
