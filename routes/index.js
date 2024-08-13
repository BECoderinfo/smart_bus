var express = require('express');
var indexRouter = express.Router();

const usersRouter = require('./users');

indexRouter.use('/users', usersRouter);

module.exports = indexRouter;
