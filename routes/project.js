"use strict";

var express = require("express");
var ProjectController = require("../controllers/project");

var router = express.Router();

//Para poder subir imagenes
var multipart = require("connect-multiparty");
var multipartMiddlewere = multipart({ uploadDir: "./uploads" });

router.get("/home", ProjectController.home);
router.post("/test", ProjectController.test);
router.post("/save-project", ProjectController.saveProject);
router.get("/project/:id?", ProjectController.getProject);
router.get("/projects", ProjectController.getProjects);
router.put("/project/:id", ProjectController.updateProject);
router.delete("/project/:id", ProjectController.deleteProject);
router.post(
  "/uploadImage/:id",
  multipartMiddlewere,
  ProjectController.uploadImg
);

module.exports = router;
