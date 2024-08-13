const express = require('express');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index'); 
require("./db/connection");
const app = express();

app.use(bodyParser.json()); 
app.use(indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});