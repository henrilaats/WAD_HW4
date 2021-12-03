const express = require("express");
const pool = require("./database");
const cors = require("cors");

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

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
    res.render("posts", { posts: posts.rows });
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
app.get("/singlepost/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(req.params.id);
    console.log("get a single post request has arrived");
    const posts = await pool.query("SELECT * FROM posts WHERE id = $1", [
      id,
    ]);
    res.render("singlepost", { posts: posts.rows[0] });
  } catch (err) {
    console.error(err.message);
  }
});

app.delete('/posts/:id', async(req, res) => {
  try {
  console.log(req.params);
  const { id } = req.params;
  const post = req.body;
  console.log("delete a post request has arrived");
  const deletepost = await pool.query(
  "DELETE FROM posts WHERE id = $1", [id]
  );
  res.redirect('posts');
  } catch (err) {
  console.error(err.message);
  }
 });
 

app.use((req, res) => {
  res.render("404").render("404");
});
