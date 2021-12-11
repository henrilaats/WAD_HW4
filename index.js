const express = require("express");
const pool = require("./database");
const cors = require("cors");

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}));

app.use(express.json());
app.use(cors());
app.use(express.static("Public"));

app.listen(3000, () => {
    console.log("Server is listening to port 3000");
});

app.use((req, res, next) => {
    console.log("a new request was made");
    next();
});

/*
app.get('/', (req, res) => {
    let posts = [
        {id:1, title: "books titles", body: "description of the book"},
        {id:2, title: "books title 2", body: "descript scksdnkdc k"}
    ];
    res.render('posts', {posts: posts})
});*/

app.get("/", async (req, res) => {
    try {
        console.log("get posts request has arrived");
        const posts = await pool.query("SELECT * FROM posts");
        res.render("posts", {posts: posts.rows});
        /*res.json(posts.rows);*/
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/addnewpost", (reg, res) => {
    res.render("addnewpost");
});
/*
app.get("/singlepost", (reg, res) => {
  res.render("singlepost");
});*/
app.get('/post/:id', async (req, res) => {
    try {
        console.log("Get single post request has arrived");
        postId = req.params.id;
        const post = await pool.query("SELECT * FROM posts WHERE id = " + postId);
        //console.log(post.rows);
        res.render('singlepost', {post: post.rows[0]});
    } catch (err) {
        console.error(err.message);
    }
})

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

app.post('/', async (req, res) => {
    try {
        const post = req.body;
        console.log("POST title: " + post.title + "post body " + post.body + "auth " + post.author);
        const newpost = await pool.query(
            "INSERT INTO posts(title, body, likes, author) values ($1, $2, $3, $4) RETURNING*", [post.title, post.body, 0, post.author]
        );
        res.redirect('/');
    } catch (err) {
        console.error(err.message)
    }
});

app.post('/addlike/:id', (req, res) => {
    try {
        console.log("Add like on post request has arrived");
        postId = req.params.id;
        like = req.body.like;
        pool.query("UPDATE posts SET likes = " + like + " WHERE id = " + postId);
    } catch (err) {
        console.error(err.message);
    }
});


app.use((req, res) => {
    console.log("always here?")
    res.render("404").render("404");
});