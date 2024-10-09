const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 4000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));



// Route to display the form
app.get('/', (req, res) => {
    res.render('index');
});

// Route to handle form submission
app.post('/submit', (req, res) => {
    const { name, email } = req.body;
    res.render('result', { name, email });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});