--- 1. What's the population of the world ?

select sum(Population) from country;
--- or 
select sum(DISTINCT Population) from country;

--- 2. What is the name and the population of the most populated city in India?

select name,count(name), Population  AS populatedcityIndia FROM city where CountryCode in (select CountryCode from country where name = 'India') GROUP BY name ,Population ORDER BY COUNT(name) DESC;

--- 3. Find which countries do not have a capital.

select Name from country where Capital = NULL;

--- 4.Which country has the lowest population? List all if more than one

select name, MIN(Population) AS 'lowest Populationfrom' FROM country GROUP BY name;

--- 5. What are the names of all the cities in Vietnam?

select name AS 'Names of all the cities in Vietnam' from city where CountryCode in (select code from country where name = 'Vietnam');

--- 6. Find the average life expectancy per continent.

select Continent, AVG(LifeExpectancy) AS 'Average life expectancy per continent' from country GROUP BY Continent;

--- 7.Find the name and population of each USA district.
---. (IT shows an Error:  ERROR 1055 (42000): Expression #1 of SELECT list is not in GROUP BY clause and contains nonaggregated column 'new_world.city.Name' which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by)

select Name,Population from city  where CountryCode = 'USA' group by District;

---8. Find the name of the cities that appear more than 2 times in the table.

select name, count(*) from city group by name having count(*)> 2 ;

--- 9. Find all the names of the districts in the Netherlands. (names should appear only once)

select District As ' District Name of Netherlands' from city where CountryCode in (select Code from country where name = 'Netherlands');
