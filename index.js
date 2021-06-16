const express = require('express')
const app = express()
const bodyParser = require('body-parser');

//import router
const router = require('./app/index.js');

// body parser
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }))
app.use(bodyParser.json({ limit: '100mb', extended: true }))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  if ('OPTIONS' === req.method) {
    //respond with 200
    res.send(200);
  }
  else {
    //move on
    next();
  }
});

app.get('/', (req, res) => {
  res.send("incorrect route");
})

//add routes
const base = '/api/v1/';
app.use(base, router);

app.listen(process.env.PORT || 3000, () => console.log('Running on port 3000!'));