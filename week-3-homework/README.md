## How to use the todo app
### 1. to get todo item by id 
get ```http://localhost:4000/<todo item id >```
### 2. to post todo item
post - http://localhost:4000
```js
{
  "todo": {
	"description": "your description",
	"id": user id
 }
}
```
### 3. to update todo item
patch -  http://localhost:4000
```js
{
  "todo": {
	"description": "your description",
	"id": todo id
 }
}
```
### 4. to delete todo item
delete - http://localhost:4000
```js
{
  "todo": {
	"id": todo id
 }
}
```
### 5. to tagTodoItem
post -http://localhost:4000/tagTodoItem
```js
{
  "tag_todo_item": {
	"item_id": todo id,
	"tag_id": tag_id
 }
}
```
### 6. to untagTodoItem

delete -http://localhost:4000/untagTodoItem

```js
{
  "tag_todo_item": {
	"item_id": todo id,
	"tag_id": tag_id
 }
}
```
### 7. to mark as completed

patch -http://localhost:4000/markCompleted
```js
{
  "todo": {
	"id": todo id
 }
}
```