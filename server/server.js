//when i go to localhost:5000/tasks I should see my array of tasks from my database.

var express = require('express');
var bodyParser = require('body-parser');

var tasks = require('./routes/tasks')

var app = express();
var port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));


app.use ('/tasks', tasks)

app.listen(port, function () {
    console.log('listening on port', port);
})