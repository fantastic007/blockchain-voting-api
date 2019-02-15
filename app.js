const express = require('express');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');

const app = express();
const port = process.env.PORT || 3000;

/* ---------- Parser setup ---------- */
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


/* ----------- Routes ------------- */
// authentication routes
app.use('/auth', authRoutes);


/* ---------- Server Settings ------------ */
app.listen(port, () => {
    console.log(`Started on port ${port}...`);
});