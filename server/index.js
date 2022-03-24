const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
var path = require("path");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("This works too");
});

app.post("/posts", async (req, res) => {
  try {
    const { title, content, author, updated } = req.body;
    const newPost = await pool.query(
      "INSERT INTO blog (title, content,author, updated) VALUES($1, $2, $3, $4) RETURNING *",
      [title, content, author, updated]
    );
    res.json(newPost.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/posts", async (req, res) => {
  try {
    const allPosts = await pool.query("SELECT * FROM blog");
    res.json(allPosts.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// app.put("/posts/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const { is_completed } = req.body;
//     console.log(is_completed);
//     const allTodos = await pool.query(
//       "UPDATE todo SET is_completed = $1 WHERE post_id=$2",
//       [is_completed, id]
//     );
//     res.json("Todo was updated");
//   } catch (error) {
//     console.log(error.message);
//   }
// });

app.get("/posts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const onePost = await pool.query("SELECT * FROM blog WHERE post_id = $1", [
      id,
    ]);
    res.json(onePost.rows[0]);
  } catch (error) {
    console.log(error.messagegg);
  }
});

app.put("/posts/:id/edit", async (req, res) => {
  try {
    const id = req.params.id;
    const { title, content, author, updated } = req.body;
    const updatePost = await pool.query(
      "UPDATE blog SET title = $1, content = $2, author=$3, updated=$4 WHERE post_id=$5",
      [title, content, author, updated, id]
    );
    res.json("Post was updated");
  } catch (error) {
    console.log(error.message);
  }
});

app.delete("/posts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletePost = await pool.query("DELETE FROM blog WHERE post_id=$1", [
      id,
    ]);
    res.json("Post was deleted");
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(5050, () => {
  console.log("listening on port 5050");
});
