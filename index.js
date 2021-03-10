const express = require("express");
const http = require("http");
const morgan = require("morgan");

const db = require("./database");

const app = express();

const server = http.createServer(app);


const routes = require("./src/routes");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }) );

app.get("/", (req, res, next) =>{
  res.status(200).json({ message: "success "});
});


app.use(routes);

const PORT = 9000;
  
  server.listen( PORT ,() => {
    console.log(`Server listen on PORT ${PORT}`);
  });
  
