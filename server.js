const fs = require('fs');
const path = require('path');
const express = require('express');
const dbJSON = require('./db/db.json');
const {v4: uuidv4} = require('uuid');
const PORT = process.env.PORT || 3001;
const app = express();

// parse JSON data 
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

// request note send to HTML 
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    const notes = fs.readFileSync(path.join(__dirname, './db/db.json'), "utf-8");
    const notesParse = JSON.parse(notes);
    res.json(notesParse);
});

app.post('/api/notes', (req, res) => {
    const notes = fs.readFileSync(path.join(__dirname, './db/db.json'), "utf-8");
    const notesParse = JSON.parse(notes);
    req.body.id = uuidv4()
    notesParse.push(req.body);

    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(notesParse), "utf-8");
    res.json("notes generate")
});

// re-direct back to landing page
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// display 
app.listen(PORT, () => {
    console.log(`server listening at http://localhost:${PORT}`);
});