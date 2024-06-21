import express from "express";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";

const app = express();

app.use(morgan("dev"));
app.use(compression());
app.use(helmet());

app.get("/", (req, res) => {
  return res.json({
    message: "Dockerized Node.js Application",
  });
});

app.listen(6969, () => {
  console.log("Server is running on port 6969");
});
