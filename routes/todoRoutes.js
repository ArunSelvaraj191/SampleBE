const express = require("express");
const router = express.Router();

let todos = [
  { id: 1, title: "Learn Express" },
  { id: 2, title: "Build Todo App" },
];

router.get("/", (req, res) => {
  res.json(todos);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const todo = todos.find((ele) => ele.id === parseInt(id));
  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  } else {
    res.json(todo);
  }
});

router.post("/", (req, res) => {
  console.log("Boday data :::", req.body.title);
  const newTodo = {
    id: todos.length + 1,
    title: req.body.title,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const todo = todos.find((ele) => ele.id === parseInt(id));
  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  } else {
    // todo.title = req.body.title ? req.body.title : todo.title;
    todo.title = req.body.title ?? todo.title;
    res.json(todo);
  }
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const todo = todos.find((ele) => ele.id === parseInt(id));
  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  } else {
    console.log("todos ::::", todos);
    todos = todos.filter((ele) => ele.id !== parseInt(id));
    res.json(todos);
  }
});

module.exports = router;
