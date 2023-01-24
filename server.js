const express = require('express');
const path = require('path');
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

// const api = require('./routes/index.js');

const PORT = process.env.port || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);

app.use(express.static('public'));

app.get("/api/notes", function(req,res){
  fs.readFile("./db/db.json", function(err,data){
    if(err) throw err
    res.json(JSON.parse(data))

  })
    
})
// GET Route for homepage
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET Route for feedback page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
