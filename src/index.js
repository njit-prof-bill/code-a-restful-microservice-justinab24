const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above
var users = []

app.post('/users', (req, res) => {
    const { name, email } = req.body;
    const randid = Math.floor(Math.random() * 1000);
    users.push({name, email, id: randid})
    res.status(201).json({ name: name, email: email, id: randid});
})

app.get('/users/:id', (req, res) => {
    const {id} = req.params;
    const foundUser = users.find(x => x.id == id);
    if (!foundUser) {
        res.status(404).send();
    }
    res.status(200).json({ id: Number(id), name: foundUser.name, email: foundUser.email })
})

app.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const foundUserIndex = users.findIndex(x => x.id == id);
    if (!foundUserIndex) {
        res.status(404).send();
    }
    users[foundUserIndex].name = name;
    users[foundUserIndex].email = email;
    res.status(200).json({ id: id, name: name, email: email });
})

app.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    try {
        users = users.filter(x => x.id != id);
    } catch (error) {
        res.status(404).send(error.message);
    }
    res.status(204).send();
})

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing