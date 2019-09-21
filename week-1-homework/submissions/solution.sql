--- 1. Which car has the highest accelerate value?

select make from car_names where id in 
  (select id from cars_data where accelerate in 
    (select max(accelerate) from cars_data)
  );

--- 2. List the weight of the cars made in the 1980s (1980 and later).

select id, weight from cars_data where year between 1980 and 1989;

--- 3. List all the cars made by chevrolet (where the model is chevrolet).

select id, make from car_names where model = "chevrolet";

--- 4. What is the full name of the maker of the plymouth model?

select full_name from car_makers where id in 
  (select maker from models where name = "plymouth");

--- 5. Which continent is the Volvo car maker from?

select continent from continents where id in 
  (select continent from countries where id in 
    (select country from car_makers where maker = "volvo")
  );

--- 6. How many car models are audi?

select count(*) from car_names where model = "audi";

--- 7. List all makers whose names start with s.

select * from car_makers where maker like "s%";

--- 8. How many cars have a horsepower more than 100 but less than 200?

select count(*) from cars_data where horsepower > 100 and horsepower < 200;

--- 9. List all car makers from australia.

select * from car_makers where country in 
  (select id from countries where continent in 
    (select id from continents where continent = "australia")
  );   --- returns an empty set

--- 10. List all car makers not from sweden, japan, france or germany.

select * from car_makers where country not in 
  (select id from countries where name = "sweden" or name = "japan" or name = "france" or name = "germany");












