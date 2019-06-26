var express = require("express");
var cors = require("cors");
var proxy = require("http-proxy-middleware");
var app = express();

app.use(cors());
app.use(express.static(__dirname + "./build/")); //serves the index.html
app.use(
  "/todos",
  proxy({
    target: "https://todos-restful-api.herokuapp.com/api",
    changeOrigin: true
  })
);

app.listen(5000); //listens on port 3000 -> http://localhost:3000/
