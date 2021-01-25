--- 1.What's the population of the world ?

SELECT sum(population) AS world_population
FROM country;

---2.What is the name and the population of the most populated city in India?

SELECT city.name, MAX(city.population)
FROM city LEFT JOIN country ON city.countryCode=country.code
where country.name="india";

---3. Find which countries do not have a capital.

SELECT name, capital
FROM country
WHERE capital is NULL;

---4.Which country has the lowest population? List all if more than one

SELECT name, MIN(population)
FROM country;

--or

SELECT name, population
FROM country
ORDER BY population ASC LIMIT 7;
 
---5.What are the names of all the cities in Vietnam?

SELECT city.name , country.name 
FROM city INNER JOIN country ON city.countryCode=country.code 
WHERE country.name="Vietnam";

---6.Find the average life expectancy per continent.

SELECT continent, AVG(lifeExpectancy)
FROM country
GROUP BY continent;

---7.Find the name and population of each USA district.

SELECT city.district, city.population
FROM city INNER JOIN country ON city.countryCode=country.code
WHERE 
 country.code=(SELECT code
FROM country
WHERE name="United States");

---8.Find the name of the cities that appear more than 2 times in the table.

SELECT name, count(*)
FROM city
GROUP BY name
HAVING (COUNT(name)>1);

---9.Find all the names of the districts in the Netherlands. (names should appear only once)



--- IMDB ---



---1.Find the minimum and the maximum age of the actors per gender.

SELECT gender, MIN(age), MAX(age)
FROM actors
GROUP BY gender;

---2.Find how many actors are in their 20’s, 30’s, 40’s, 50’s etc (grouped by decade).

SELECT floor(age/10)*10 AS Ages, count(*)
FROM actors
GROUP BY floor(age/10)*10
ORDER BY age;

---3.Print the names and biographies of the actors in this format “ANNE HATHAWAY BIO: 1 golden globe”

SELECT CONCAT(UPPER(fname)," ",UPPER(lname)," ", "BIO:", " ",biography) actors_biography
FROM actors;

---4.Find the names of the directors who have more than 2 films in the database.

SELECT director
FROM films
GROUP BY director
HAVING (COUNT(title)>=2);
