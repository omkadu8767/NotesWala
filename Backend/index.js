require('dotenv').config({ path: __dirname + '/.env' });
const path = require("path");


const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')
connectToMongo();

const app = express()
const port = 5000

app.use(express.json());
app.use(cors())


//Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

const __dirname2 = path.resolve();

app.use(express.static(path.join(__dirname2, "../dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname2, "../dist/index.html"));
});

app.get('/', (req, res) => {
  res.send("Hello, World!");
})


app.listen(port, () => {
  console.log(`NotesWala Backend listening at http://localhost:${port}`)
})