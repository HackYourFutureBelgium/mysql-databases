-- ======================= WORLD ========================================
-- 1. What's the population of the world ?

SELECT sum(population) AS Population_of_world
FROM Country;

-- 2. What is the name and the population of the most populated city in India?

SELECT Name,
       max(population) AS population
FROM city
WHERE CountryCode IN
    (SELECT Code
     FROM Country
     WHERE name = 'india');

     --OR
SELECT city.Name, max(city.population) AS population
FROM city
JOIN country on country.code = city.CountryCode
WHERE country.name = 'india';

-- 3. Find which countries do not have a capital.

SELECT name,
       continent
FROM Country
WHERE Capital IS NULL;

-- 4. Which country has the lowest population? List all if more than one

SELECT name,
       population
FROM country
WHERE population =
    (SELECT min(population)
     FROM country);

-- 5. What are the names of all the cities in Vietnam?

SELECT city.name AS 'Citys in vietnam'
FROM city
JOIN country ON country.code = city.CountryCode
WHERE Country.name = 'Vietnam';

-- 6. Find the average life expectancy per continent.

SELECT continent,
       avg(lifeExpectancy) AS 'Life Expectancy'
FROM country
GROUP BY continent;

-- 7. Find the name and population of each USA district.

SELECT District,
       SUM(Population),
       countrycode
FROM city
GROUP BY district
HAVING countrycode = "USA";

-- 8. Find the name of the cities that appear more than 2 times in the table.

SELECT name,
       count(*)
FROM city
GROUP BY name
HAVING count(*) > 2;

-- 9. Find all the names of the districts in the Netherlands. (names should appear only once)

SELECT DISTINCT city.district
FROM city
JOIN country ON country.code = city.CountryCode
WHERE country.name = 'Netherlands' ;

--========================================= IMDB:==================================
 -- 1. Find the minimum and the maximum age of the actors per gender.

SELECT gender,
       min(age),
       max(age)
FROM actors
GROUP BY gender;

-- 2. Find how many actors are in their 20’s, 30’s, 40’s, 50’s etc (grouped by decade).

SELECT concat (floor(age/10)*10, "'s") AS Ages,
       count(*) AS 'Number of actors'
FROM actors
GROUP BY floor(age/10)*10
ORDER BY age;

-- 3. Print the names and biographies of the actors in this format “ANNE HATHAWAY BIO: 1 golden globe”

SELECT CONCAT (UPPER(fname), ' ', UPPER (lname),' BIO: ', biography)
FROM actors;

-- 4. Find the names of the directors who have more than 2 films in the database.

SELECT director,
       count(*) AS 'Number of films'
FROM films
GROUP BY director
HAVING count(*) > 2;