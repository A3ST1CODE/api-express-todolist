/**
 * Sends a JSON response with a status code, message, and optional data.
 * @param {Object} res - The response object.
 * @param {number} status - The HTTP status code.
 * @param {string} message - The message to send back.
 * @param {Object} [data=null] - Optional data to send back.
 */
const sendResponse = (res, status, message, data = null) => {
    res.status(status).json({ status: status < 400, message, data });
};

/**
 * Sends a JSON error response with a status code and message.
 * @param {Object} res - The response object.
 * @param {number} status - The HTTP status code.
 * @param {string} message - The error message to send back.
 */
const sendError = (res, status, message) => {
    res.status(status).json({ status: false, error: message });
};

/**
 * Middleware to validate the 'id' parameter in the request.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function in the stack.
 */
const validateId = (req, res, next) => {
    const { id } = req.params;
    if (!id || isNaN(id)) {
        return sendError(res, 400, "Please provide a valid id");
    }
    next();
};

/**
 * Middleware to validate the 'title' query parameter in the request.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function in the stack.
 */
const validateTitle = (req, res, next) => {
    const { title } = req.query;
    if (!title) {
        return sendError(res, 400, "Title is required");
    }
    next();
};

let todos = [];
let lastId = 0;

/**
 * Retrieves all todos. Returns 404 if no todos are found.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @method GET /api/todos
 */
exports.getTodos = (req, res) => {
    if (todos.length > 0) {
        sendResponse(res, 200, "Data found", todos);
    } else {
        sendResponse(res, 404, "No data found");
    }
};

/**
 * Creates a new todo item with a title from the query parameter. Returns the created todo.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @method POST /api/todos?title=Title
 */
exports.createTodo = [validateTitle, (req, res) => {
    const { title } = req.query;
    const newTodo = { id: ++lastId, title };
    todos.push(newTodo);
    sendResponse(res, 201, "Todo created", newTodo);
}];

/**
 * Updates an existing todo item's title by its id. Validates both id and title. Returns the updated todo.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @method PUT /api/todos/:id?title=Title
 */
exports.updateTodo = [validateId, validateTitle, (req, res) => {
    const { id } = req.params;
    const { title } = req.query;
    const todo = todos.find(todo => todo.id === parseInt(id));

    if (!todo) {
        return sendError(res, 404, "Todo with the specified id not found");
    }

    todo.title = title;
    sendResponse(res, 200, "Todo updated", todo);
}];

/**
 * Deletes a todo item by its id. Validates the id before deletion. Returns a success message upon deletion.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @method DELETE /api/todos/:id
 */
exports.deleteTodo = [validateId, (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex(todo => todo.id === parseInt(id));

    if (todoIndex === -1) {
        return sendError(res, 404, "Todo with the specified id not found");
    }

    todos.splice(todoIndex, 1);
    sendResponse(res, 200, "Todo deleted");
}];