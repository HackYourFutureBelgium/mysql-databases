--- 1. Find the minimum and the maximum age of the actors per gender.

select gender, min(age), max(age), count(*) from actors group by gender;

--- 2. Find how many actors are in their 20’s, 30’s, 40’s, 50’s etc (grouped by decade).

select floor(age/10)*10 decades, count(*) from actors group by decades order by decades;

--- 3. Print the names and biographies of the actors in this format “ANNE HATHAWAY BIO: 1 golden globe”

SELECT CONCAT ( upper(fname), ' ', upper(lname), ' BIO: ', biography) FROM actors;

--- 4. Find the names of the directors who have more than 2 films in the database.

select director, count(*) from films group by director having count(*) > 2;

