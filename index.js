"use strict";
//conexion entre la base de datos mongobd y la apirest de express
var mongoose = require("mongoose");

//llamo al servicio
var app = require("./app");
var port = 3700;

//mongoose.set("useFindAndModify", false);
mongoose.Promise = global.Promise;
//el path para conectar es mongodb: ip, puerto mongo y nombre de la base de datos

mongoose
  .connect("mongodb://127.0.0.1:27017/portfolio", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    //como el try-catch
    console.log("database conexion ok..");
    //creacion del servidor
    app.listen(port, function () {
      console.log("server is running... Url->127.0.0.1:3700");
    });
  })
  .catch(err => console.log(err));

//hay que lanzar en 'npm start' en la consola para conectar
