import express from "express";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(morgan("dev"));
app.use(compression());
app.use(helmet());

let tasks = [];

app.get("/", (req, res) => {
  return res.json({
    message: "Dockerized Node.js Application",
  });
});

app.get("/tasks", (req, res) => {
  return res.json({
    tasks: tasks,
  });
});

app.post("/tasks", (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      message: "Task name is required",
    });
  }
  tasks.push(req.body.name);
  return res.json({
    task: req.body.name,
  });
});

app.delete("/tasks", (req, res) => {
  tasks = [];
  return res.json({
    message: "All tasks deleted successfully",
  });
});

app.put("/tasks/:task/:newTaskName", (req, res) => {
  const task = req.params.task;
  const newTaskName = req.params.newTaskName;
  const taskIndex = tasks.indexOf(task);
  if (taskIndex !== -1) {
    tasks[taskIndex] = newTaskName;
    return res.json({
      message: "Task updated successfully",
    });
  } else {
    return res.json({
      message: "Task not found",
    });
  }
});

app.listen(6969, () => {
  console.log("Server is running on port 6969");
});
