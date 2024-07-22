import express from "express";
import cors from "cors";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(cors());

const todoSchema = mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    default: 0,
  },
});

todoSchema.index({ order: 1 });
todoSchema.index({ completed: 1 });

const Todo = mongoose.model("Todo", todoSchema);

app.get("/", async (req, res) => {
  try {
    const todos = await Todo.find({}).sort({ order: 1 }).lean();
    res.json(todos);
  } catch (err) {
    console.error("Error fetching todos:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/", async (req, res) => {
  const newTodo = req.body;
  try {
    const maxOrderTodo = await Todo.findOne().sort({ order: -1 }).exec();
    const newOrder = maxOrderTodo ? maxOrderTodo.order + 1 : 1;
    const createdTodo = await Todo.create({ ...newTodo, order: newOrder });
    res.status(201).json(createdTodo);
  } catch (err) {
    console.error("Error adding todo:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { completed },
      { new: true },
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(updatedTodo);
  } catch (err) {
    console.error("Error updating todo:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { order } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { order },
      { new: true },
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(updatedTodo);
  } catch (err) {
    console.error("Error updating todo:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/completed", async (req, res) => {
  try {
    const result = await Todo.deleteMany({ completed: true });
    res.json({ message: `${result.deletedCount} completed todos deleted` });
  } catch (err) {
    console.error("Error deleting completed todos:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

mongoose
  .connect(mongoDBURL, options)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
