# HackYourFuture Node.js Week 3 - Homework

Read through the existing code, make sure you understand the flow of the program. This service can create, update, delete users. Those users can view their *own* todos, create new ones for themselves, update and delete them.

Todos belong to Users (think of the *relationship* between them).

## First

Start the the app, make sure it's working (you should see it running on a port, and the database connection should be successful). Try out the following calls from Postman:

- `POST /users` to create a new user. Pay attention to the json required in the body. Read the code to understand what is needed. This will create a new user and give you back and `id`. Note it down.
- `PUT /users/:user_id` update your newly created user with a `description` and `birthday`.
- `DELETE /users/:user_id` careful; you'll have to make a new user to continue experimenting.

- `GET /users/:user_id/todos` get all the todos for a *single* users.
- `POST /users/:user_id/todos` create a todo for a single user.
- `PUT /users/:user_id/todos/:todo_id` you can guess what this does.
- `DELETE /users/:user_id/todos/:todo_id` again, guess what this does.

Once you've played around and made sure this works, you need to change it from using the filesystem to using a database. The database and tables should already exist from previous exercises.

> Remember to update the configuration to point to the database you've created.

At the end of the task, only databases should be used for storage. If invalid input is provided, return a sensible error message.
