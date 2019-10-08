

--WORLD:
---1 What's the population of the world ?
select sum(Population) as worldPopulation
from country;


---2 What is the name and the population of the most populated city in India?
select name, population
from city
where population = (select max(population)
from city
where countrycode = "IND");

---3 Find which countries do not have a capital.
select name
from country
where capital is null;

---4 Which country has the lowest population? List all if more than one
--- for the countries which has "0" population as lowest 
select name
from country
where Population =
(select min(Population)
from country);

--- for the countries of which population is lowest but not "0" 
select name
from country
where Population <> 0
order by population limit 1;

---5 What are the names of all the cities in Vietnam?
select a
.name as citiesinVietnam
from city a inner join country b on a.CountryCode = b.Code
where b.name = "Vietnam";


---6 Find the average life expectancy per continent.
select avg(LifeExpectancy), Continent
from country
group by Continent;


---7 Find the name and population of each USA district.
select District, sum(Population)
from city
where CountryCode = "USA"
group by District
order by District;


---8 Find the name of the cities that appear more than 2 times in the table.
select Name
from City
group by Name
having count(name) > 2;

---9 Find all the names of the districts in the Netherlands. (names should appear only once)

select distinct a .District as DistrictofNetherlands
from city a inner join country b on a.CountryCode = b.Code
where b.name = "Netherlands";


select a .District as DistrictofNetherlands
from city a inner join country b on a.CountryCode = b.Code
where b.name = "Netherlands"
group by District;

--IMDB:

---1 Find the minimum and the maximum age of the actors per gender.
select gender, max(age) as eldest, min(age) as youngest
from actors
group by gender;

---2 Find how many actors are in their 20’s, 30’s, 40’s, 50’s etc (grouped by decade).
/*select count(case when (age >= 20 and age <=29) then aid else null end) as "in20s",
  count(case when (age >= 30 and age <=39) then aid else null end) as "in30s",
  count(case when (age >= 40 and age <=49) then aid else null end) as "in40s",
  count(case when (age >= 50 and age <=59) then aid else null end) as "in50s",
  count(case when (age >= 60 and age <=69) then aid else null end) as "in60s",
  count(case when (age >= 70 and age <=79) then aid else null end) as "in70s",
  count(case when (age >= 80 and age <=89) then aid else null end) as "in80s"

from actors;*/

select floor(age/10)*10 as decades, count(aid) as numberofactors
from actors
group by decades;


---3 Print the names and biographies of the actors in this format “ANNE HATHAWAY BIO:1 golden globe”
select concat(upper(fname),' ', upper(lname), ' ', 'BIO:', biography) as names_biographies
from actors;

---4 Find the names of the directors who have more than 2 films in the database.
select director
from films
group by director
having count(director) > 2;

