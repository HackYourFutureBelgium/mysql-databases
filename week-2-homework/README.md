# Week 2 Homework

## Exercise 1: Build you own ER diagram

Create a new ERD based on the musicians database.
Include more entities like: Bands, Songs, Albums etc
Be careful to use the correct relationships between the entities and pay attention to cardinality & modality.
Keep it simple :)

You can use Lucidchart or draw.io to create the diagram. The final form should be submitted in pdf or with a link to Lucidchart.

## Exercise 2: Queries

### Loading the Data

You need to load `world.sql` and `imdb.sql` similarly to how you loaded the musicians and cars datasets last week.
In the case of `imdb` please source the file again, since the database has been updated with more data.

- For mac and linux users who can use mysql from the shell, remember to load it with the `< file.sql` technique.
- For windows users, copy paste into work bench and execute from there.

### Understand the data

After loading the 2 new databases and tables into mysql, take some time to familiarise with them. Use `show tables` and `describe tables` to study the structure of tables. Perform a few queries to get an idea of what sort of data exists in the tables (try `select * from <table-name> limit 5` on a few different tables).

In order to query properly, you must understand which tables have what kind of data so you know where to look.

### Write queries to retrieve data that answers the following questions:

WORLD:

1. What's the population of the world ?
1. What is the name and the population of the most populated city in India?
1. Find which countries do not have a capital.
1. Which country has the lowest population? List all if more than one
1. What are the names of all the cities in Vietnam?
1. Find the average life expectancy per continent.
1. Find the name and population of each USA district.
1. Find the name of the cities that appear more than 2 times in the table.
1. Find all the names of the districts in the Netherlands. (names should appear only once)

IMDB:

1. Find the minimum and the maximum age of the actors per gender.
1. Find how many actors are in their 20’s, 30’s, 40’s, 50’s etc (grouped by decade).
1. Print the names and biographies of the actors in this format “ANNE HATHAWAY BIO: 1 golden globe”
1. Find the names of the directors who have more than 2 films in the database.

## Clarifications

1. Some of you might encounter this error while trying to form your queries:

ERROR 1055 (42000): Expression #2 of SELECT list is not in GROUP BY clause and contains nonaggregated column 'mydb.t.address' which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by

In this case you can disable only_full_group_by with the following command:

SET SESSION sql_mode='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

More info here: https://dev.mysql.com/doc/refman/5.7/en/group-by-handling.html

2. For the question "Find how many actors are in their 20’s, 30’s, 40’s, 50’s etc":
   What is required here is to "change" the age of each person to simply their decade; for example, if someone is 53 ->50, if someone id 27->20. For this, you must use something that we have not actually seen: FLOOR(). This function basically rounds your number to the larger integer that is less than your number. In our case floor(age/10)\*10 will do the trick.

> For the next few exercises you'll be focusing on modifying the Todos server app from NodeJS week3 to use databases instead of files, as the storage medium. Use the todos app from https://github.com/HackYourFutureBelgium/databases/tree/master/week-2-lecture/todos-app as your starting point.

## Exercise 3: Create a database for the todos homework. Todos will now belong to a user.

The app can register _Users_, and _Todos_ are created against a user, not by themselves. So User `mark`, could have 3 todos, which are independent from user `amy`. A User will only list their own todos, and add, update and delete their own todos.

A _User_ has a `username`, a `description`, a `birthday`.
A _Todo_ has a `description` and flag to indicate if it's done.

Think of how you'd model this in a database. What tables would you create?

## Exercise 4: Use Primary Keys.

Each user should be uniquely identifiable, so should each todo. Think of what primary keys are needed.

## Exercise 5:Update the todos app to use a database.

Instead of saving the user and todos data to files, save them to the database you created.

## Submitting the Homework

Make a PR to this repo, similar branch naming and PR title format as you've been using so far.
Edit the `solution.sql` file.

First mention the task being solved (you can add comments in sql code with `---`). Then add all the sql statements, required, one line for each statement. Continue for the other tasks. Check the `example.sql` for how it's done.

For the coding homework, modify the code and send PR as you've already done so far.
