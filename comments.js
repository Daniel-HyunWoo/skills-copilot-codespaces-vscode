// Create web server with Express
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));

// Load comments from file
var comments = [];
fs.readFile('comments.json', 'utf8', function (err, data) {
  if (err) {
    console.log(err);
  } else {
    comments = JSON.parse(data);
  }
});

// Get comments
app.get('/comments', function (req, res) {
  res.end(JSON.stringify(comments));
});

// Post comments
app.post('/comments', urlencodedParser, function (req, res) {
  var newComment = req.body;
  comments.push(newComment);
  fs.writeFile('comments.json', JSON.stringify(comments), function (err) {
    if (err) {
      console.log(err);
    }
  });
  res.end('Comment added');
});

var server = app.listen(3000, function () {
  console.log('Server running at http://