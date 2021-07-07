---Which car has the highest *accelerate* value?
select car_names.model, cars_data.accelerate
from car_names inner join cars_data on car_names.id = cars_data.id
where accelerate = (select max(accelerate)
from cars_data);


---List the *weight* of the cars made in the 1980s (1980 and later).
select weight
from cars_data
where year >= 1980;


---List all the cars made by *chevrolet* (where the model is *chevrolet*).
select make
from car_names
where model="chevrolet";


---What is the *full name* of the *maker* of the *plymouth* model?
select car_makers.full_name
from car_makers inner join models on car_makers.id = models.maker
where models.name = "plymouth";


---Which continent is the *Volvo* car maker from??????

select continents.continent
from car_makers left join countries on car_makers.country = countries.id left join continents on countries.continent = continents.id
where car_makers.maker = "volvo";


---How many car models are *audi*?
select count(model)
from car_names
where model = "audi";

--- List all makers whose names start with *s*.
select distinct maker
from car_makers
where maker like 's%';
--We may not need distinct for this statement but it is useful to get rid of duplicate values. 

---How many cars have a *horsepower* more than *100* but less than *200*?
select count(horsepower)
from cars_data
where horsepower between 100 and 200;

---List all car makers from *australia*.
select car_makers.maker
from car_makers
  left join countries on car_makers.country = countries.id
  left join continents on countries.continent = continents.id
where continents.continent = "australia";
--Empty set (0.00 sec)

---List all car makers _not_ from *sweden*, *japan*, *france* or *germany*.

/*select car_makers.maker
from car_makers left join countries on car_makers.country = countries.id
where not countries.name = "sweden" and not countries.name = "japan" and not countries.name = "france" and not countries.name = "germany";*/

select car_makers.maker
from car_makers left join countries on car_makers.country = countries.id
where countries.name not in ("sweden", "japan", "france", "germany");


--- BONUS
---List all cars where the *make* starts with an *a* and ends with an *r*.
select distinct model
from car_names
where make like "a%r";

---How many cars have more than *6 cylinders*, weight *less than 4000* but *more than 3000*, and was *not* made in the years *1970*, *1975* or *1981*.
select count(cylinders)
from cars_data
where cylinders > 6 and weight > 3000 and weight < 4000 and year not in (1970, 1975, 1981);

