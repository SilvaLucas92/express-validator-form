const express = require('express');
const app = express();

app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}));

//middleware
const userLoggedMd = require('./middleware/userLoggedMd.js');
app.use(userLoggedMd);

//archivos public
app.use(express.static("public"));
//session
const session = require('express-session');
app.use(session({
    secret:"it's a secret",
    resave: false,
    saveUninitialized: false
}));
//port
app.listen(3000, () => {
    console.log('localhost 3000')
});
//routes
const mainRoutes = require('./routes/main')
app.use('/', mainRoutes)