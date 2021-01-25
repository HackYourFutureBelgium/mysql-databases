--- 1. What's the population of the world ?

select sum(population) from country;

--- 2. What is the name and the population of the most populated city in India?

select name as TheMostPopulatedCityInIndia, max(population) from city where CountryCode in 
  (select code from country where name = 'India');

--- 3. Find which countries do not have a capital.

select name as CountriesWithoutCapital from country where Capital IS NULL OR Capital = '';

--- 4. Which country has the lowest population? List all if more than one.

select name as CountriesWithLowestPopulation, min(population) from country;

--- 5. What are the names of all the cities in Vietnam?

select name as CitiesOfVietnam from city where CountryCode in
  (select code from country where name = 'Vietnam');

--- 6. Find the average life expectancy per continent.

select continent, AVG(LifeExpectancy) as AverageLifeExpectancyPerContinent from country group by continent;

--- 7. Find the name and population of each USA district.

select name, population from city as US_District where CountryCode in
  (select code from country where name = 'United States');

--- 8. Find the name of the cities that appear more than 2 times in the table.

select name, count(*) from city group by name having count(*) > 2;

--- 9. Find all the names of the districts in the Netherlands. (names should appear only once)

select District as DistrictsInNetherlands, count(*) from city where CountryCode in
  (select code from country where name = 'Netherlands') group by District;

