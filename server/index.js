const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes

//create todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    console.log(description);
    const newTodo = await pool.query(
      "insert into todo(description) values($1) returning *",
      [description]
    );

    res.json(newTodo.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});
//get all todo
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("select * from todo");
    res.json(allTodos.rows);
  } catch (error) {
    console.log(error);
  }
});

//get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("select * from todo where todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
    // res.json(allTodos.rows);
  } catch (error) {
    console.log(error);
  }
});

//update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "Update todo set description = $1 where todo_id = $2",
      [description, id]
    );
    res.json("todo was updated");
    // res.json(allTodos.rows);
  } catch (error) {
    console.log(error);
  }
});
//delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("delete from todo where todo_id = $1", [
      id,
    ]);
    res.json("Todo was deleted");
  } catch (error) {
    console.log(error);
  }
});

app.listen(5000, () => {
  console.log("server has started on port 5000...");
});
