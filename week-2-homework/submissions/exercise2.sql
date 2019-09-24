--- WORLD 
--- 1 What's the population of the world ?
SELECT sum(population) AS World_Population
FROM country;
--- result: '6078749450'  

--- 2 What is the name and the population of the most populated city in India? 
SELECT city.Name AS Most_Popolous_City_From_India,
       city.Population AS Population
FROM city
INNER JOIN country ON city.Countrycode = country.Code
WHERE city.Population =
    (SELECT max(city.Population)
     FROM city)
  AND country.Code =
    (SELECT country.Code
     FROM country
     WHERE country.Name = 'india');
--- result: 'Mumbai (Bombay)','10500000'

--- 3 Find which countries do not have a capital.
SELECT Name,
       Capital
FROM country
WHERE Capital IS NULL;
--- result: 7 row(s) returned

--- 4 Which country has the lowest population? List all if more than one
SELECT 
ROW_NUMBER() OVER ( ORDER BY Name ) List_Num, 
Name AS Country_Lowest_Population,
       Population
FROM country
WHERE population =
    (SELECT min(population)
     FROM country);
--- result: 7 row(s) returned with population 0.

--- 5 What are the names of all the cities in Vietnam?
SELECT 
city.Name AS City_of_Vietnam
FROM city
INNER JOIN country ON city.Countrycode = country.Code
WHERE country.Code =
    (SELECT country.Code
     FROM country
     WHERE country.Name = 'vietnam');
--- result: 22 row(s) returned

--- 6 Find the average life expectancy per continent.
SELECT continent,
       avg(LifeExpectancy) AS Life_Expectation
FROM country
GROUP BY continent
ORDER BY Life_Expectation DESC;
--- result: 7 row(s) returned.

--- 7 Find the name and population of each USA district. 
SELECT city.District,
       Sum(city.Population)
FROM city
INNER JOIN country ON city.Countrycode = country.Code
WHERE country.Code =
    (SELECT country.Code
     FROM country
     WHERE country.Name = 'United States')
GROUP BY city.District;
--- result: 45 row(s) returned.

--- 8 Find the name of the cities that appear more than 2 times in the table. 
SELECT CityName 
FROM
  (SELECT name AS CityName,
          count(name) AS Count
   FROM city
   GROUP BY name) AS SQ1
WHERE Count>=2 ;
--- result: 65 row(s) returned

--- 9 Find all the names of the districts in the Netherlands. (names should appear only once)
SELECT DISTINCT city.District
FROM city
INNER JOIN country ON city.Countrycode = country.Code
WHERE country.Code =
    (SELECT country.Code
     FROM country
     WHERE country.Name = 'Netherlands');
--- result: 10 row(s) returned


-- IMDB 
--- 1 Find the minimum and the maximum age of the actors per gender. 
SELECT gender,
       max(age) AS Max_Age,
       min(age) AS Min_Age
FROM actors
GROUP BY gender;
--- result: 2 row(s) returned

--- 2 Find how many actors are in their 20’s, 30’s, 40’s, 50’s etc (grouped by decade). 
SELECT Age,
       count(Age)
FROM
  (SELECT floor(age/10)*10 AS Age
   FROM actors) AS SQ1
GROUP BY Age
ORDER BY Age;
--- result: 6 row(s) returned

--- 3 Print the names and biographies of the actors in this format “ANNE HATHAWAY BIO: 1 golden globe” 
SELECT CONCAT(UPPER(fname), ' ', UPPER(lname), ' BIO: ', biography) AS ActorNameBiography
FROM actors ;
--- result: 9 row(s) returned

--- 4 Find the names of the directors who have more than 2 films in the database.
SELECT director
FROM
  (SELECT director,
          count(director) AS Movies
   FROM films
   GROUP BY director) AS SQ1
WHERE Movies >=2;