const express = require('express');
const pool = require('./database');
const cors = require('cors');
const uuid = require("uuid");

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());
app.use(express.static('Public'));

/*
app.get('/', (req, res) => {
    let posts = [
        {id:1, title: "books titles", body: "description of the book"},
        {id:2, title: "books title 2", body: "descript scksdnkdc k"}
    ];
    res.render('posts', {posts: posts})
});*/


// List of all posts in database
app.get('/', async(req, res) => {
    try {
        console.log("get posts request has arrived");
        const posts = await pool.query("SELECT * FROM posts");
        res.render('posts', {posts: posts.rows});
        /*res.json(posts.rows);*/
    } catch (err) {
        console.error(err.message);
    }
});
  
// Add a new post
app.get('/addnewpost', (reg, res) => {
    res.render('addnewpost')
});

// Insert a new post in database
app.post('/addnewpost', (req, res) => {
    try {
        console.log("Adding a post in database");
        var title = req.body.title;
        var author = req.body.author;
        var content = req.body.content;
        var link = req.body.link;
        var params = [title, author, content, link];

        var queryString = `INSERT INTO posts (title, content, 
            author, link) VALUES ($1, $2, $3, $4)`;

        // Querying the database
        pool.connect(function(err, client){
            if(err) {
                console.log(err.message);
                return res.send('error');
            }
            client.query(queryString, params, function(err) {
                if (err) {
                    console.log(err.message);
                } else {
                    console.log(res.body);
                    // Once the query is done, redirect to the list
                    // of posts to see the changes
                    res.redirect('/');
                }
            });
        });
    } catch (err) {
        console.log(err.message);
    }
});

// Render a single post based on its ID
app.get('/post/:id', async (req, res) => {
    try {
        console.log("Get single post request has arrived");
        postId = req.params.id;
        const post = await pool.query("SELECT * FROM posts WHERE id = "+postId);
        //console.log(post.rows);
        res.render('singlepost', {post: post.rows[0]});
    } catch (err) {
        console.error(err.message);
    }
});

// Delete a post based on its ID
app.get('/delete/:id', (req, res) => {
    try {
        postId = req.params.id;
        console.log("Delete post with ID : " + postId);
        pool.query("DELETE FROM posts WHERE id = "+postId);
        res.redirect('/');
    } catch (err) {
        console.error(err.message);
    }
});

// Add a like on a post based on its ID
app.post('/addlike/:id', (req, res) => {
    try {
        console.log("Add like on post request has arrived");
        postId = req.params.id;
        like = req.body.like;
        pool.query("UPDATE posts SET likes = "+ like +" WHERE id = "+postId);
    } catch (err) {
        console.error(err.message);
    }
});

// Error page (404)
app.use((req, res) => {
    res.render('404');
});

app.listen(3000, () => {
    console.log("Server is listening to port 3000")
});