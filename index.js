const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.listen(3000);
app.use(express.static('Public'));

app.use((req, res, next) => {
    console.log('a new request was made');
    next();
});

app.get('/', (req, res) => {
    let posts = [
        {id:1, title: "books titles", body: "description of the book"},
        {id:2, title: "books title 2", body: "descript scksdnkdc k"}
    ];
    res.render('posts', {posts: posts})
});

app.get('/addnewpost', (reg, res) => {
    res.render('addnewpost')
})

app.get('/singlepost', (reg, res) => {
    res.render('singlepost')
})

app.use((req, res) => {
 res.render('404').render('404');
});