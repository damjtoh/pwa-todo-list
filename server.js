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

app.listen(process.env.PORT || 5000);
