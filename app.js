const express = require('express');
const app = express();

app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))

app.listen(3000, () => {
    console.log('localhost 3000')
});

const mainRoutes = require('./routes/main')
app.use('/', mainRoutes)