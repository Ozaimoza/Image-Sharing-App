const express = require("express");
const app = express();
const routers = require("./routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const port = process.env.PORT;

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    optionsSuccessStatus: 200,
  })
);
app.use(express.urlencoded({ extended: true }));

app.use(routers);

if (process.env.NODE_ENV != "test") {
  app.listen(port, () => {
    console.log(`App Started on http://localhost:${port}`);
  });
}

module.exports = app;
