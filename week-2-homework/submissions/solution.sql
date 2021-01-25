---WORLD:
select sum(population) from country;
select name from city where countrycode = (select code from country where name="india") order by population asc limit 1;
select name from country where capital is NULL;
select name from country where population = (select distinct population from country order by population asc limit 1);
select name from city where countrycode = (select code from country where name="vietnam");
select continent,avg(lifeexpectancy) from country group by continent;
select district, avg(population) from city where countrycode = "usa" group by district;
select name from city group by name having count(name) > 1;
select distinct district from city where countrycode = (select code from country where name = "Netherlands");

---IMDB:
select gender, min(age), max(age) from actors group by gender;
select case when age < 20 then '0-20' when age between 20 and 29 then '20-29' when age between 30 and 39 then '30-39' when age between 40 and 49 then '40-49' when age between 50 and 59 then '50-59' when age between 60 and 69 then '60-69' when age between 70 and 79 then '70-79' when age >= 80 then 'over 80' end as age_range, count(*) as count from actors group by age_range order by age_range;
select concat(Upper(fname),' ' ,Upper(lname),' ', 'BIO: ', biography) from actors;
select director from films group by director having count(director)>1;
