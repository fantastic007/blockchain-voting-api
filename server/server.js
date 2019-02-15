const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded());

app.post('/test', async (req, res) => {
    console.log(req.body);
    res.send('hello');
});

app.listen(port, () => {
    console.log(`Started on port ${port}...`);
});
