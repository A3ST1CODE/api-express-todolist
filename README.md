# Todo List API

A simple Express API for managing a todo list, with support for creating, updating, and deleting todos.

## Installation

1. Clone this repository.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.

## Running the Server

Execute `node index.js` to start the server. The API will be accessible at `http://localhost:3000/api/todos`.

## API Endpoints

-   `GET /api/todos`: Get all todos.
-   `POST /api/todos`: Create a new todo. Use the query parameter `title` to specify the title of the new todo.
-   `PUT /api/todos/:id`: Update a todo. Replace `:id` with the ID of the todo to update. Use the query parameter `title` to specify the new title.
-   `DELETE /api/todos/:id`: Delete a todo.

## Using the API with Postman

1. **Get All Todos**: Send a GET request to `http://localhost:3000/api/todos`.
2. **Create a Todo**: Send a POST request to `http://localhost:3000/api/todos?title=NewTodo`. Replace `NewTodo` with the desired title.
3. **Update a Todo**: Send a PUT request to `http://localhost:3000/api/todos/:id?title=UpdatedTodo`. Replace `:id` with the ID of the todo to update and `UpdatedTodo` with the desired title.
4. **Delete a Todo**: Send a DELETE request to `http://localhost:3000/api/todos/:id`. Replace `:id` with the ID of the todo to delete.

## License

This project is open source and available under the MIT License.
