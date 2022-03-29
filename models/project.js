"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var projectSchema = Schema({
  name: String,
  description: String,
  category: String,
  langs: String,
  image: String,
  repository: String,
  preview: String,
});

//los dos parametros que se le pasan son el nombre en la base de dato y y nombre de la clase Schema
//En la base de datos se llama: 'projects', pero mongoose lo prulariza y le pasa a minusculas
//Y si estubiera erroneo crea uno con este nombre
module.exports = mongoose.model("Project", projectSchema);
