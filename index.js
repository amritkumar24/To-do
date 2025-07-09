const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from To Do app!');
});

app.listen(port, () =>{
    console.log(`Server is running on https://localhost:${port}`);
});
