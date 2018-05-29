const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();
const { checkForSession } = require('./middlewares/checkForSession');
const { read } = require('./controllers/swag_controller');
const { login, register, signout, getUser } = require('./controllers/auth_controller');
const { add, remove, checkout} = require('./controllers/cart_controller');
const { search } = require('./controllers/search_controller');

const app = express();

app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(checkForSession);
app.use(express.static('./build'));

app.get('/api/swag', read);
app.post('/api/login', login);
app.post('/api/register', register);
app.post('/api/signout', signout);
app.get('/api/user', getUser);
app.post('/api/cart', add);
app.post('/api/cart/checkout', checkout);
app.delete('/api/cart', remove);
app.get('/api/search', search)

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Yo yo yo from port: ${PORT}`)
});