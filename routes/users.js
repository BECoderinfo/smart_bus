var express = require('express');
const { SignUp , login } = require('../api/Registr');
var usersRouter = express.Router();

usersRouter.post('/register', SignUp);
usersRouter.get('/login', login);

module.exports = usersRouter;