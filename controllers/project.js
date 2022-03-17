"use strict";
const project = require("../models/project");
var Project = require("../models/project");
var fs = require("fs");

var controller = {
  home: function (req, res) {
    return res.status(200).send({
      message: "Soy la home",
    });
  },
  test: function (req, res) {
    return res.status(200).send({
      message: "Soy el metodo o accion test del controlador Project",
    });
  },

  //*******************************************************CRUD********************************************************

  //--------------------Create---------------------------------------------------------------------------------------
  saveProject: function (req, res) {
    var project = new Project();

    var params = req.body;
    project.name = params.name;
    project.description = params.description;
    project.category = params.category;
    project.langs = params.langs;
    project.image = null;

    //Guardar enb la base de datos
    project.save((err, projectStored) => {
      if (err) {
        return res
          .status(500)
          .send({ message: "Error al guardar el documento" });
      }
      if (!projectStored) {
        return res
          .status(404)
          .send({ message: "No se ha podido guardar el proyecto" });
      }
      return res.status(200).send({ project: projectStored });
    });

    /*Pueba en postman
    return res.status(200).send({
      //params: params,
      project: project,
      message: "Nuevo proyecto ok",
    });*/
  },

  //---------------------------------------------Read--------------------------------------------------
  getProject: function (req, res) {
    var projectId = req.params.id;
    if (projectId == null)
      return res
        .status(404)
        .send({ message: "No se ha podido obtener el proyecto" });

    Project.findById(projectId, (err, project) => {
      if (err) {
        return res
          .status(500)
          .send({ message: "Error al obtener el documento" });
      }
      if (!project) {
        return res
          .status(404)
          .send({ message: "No se ha podido obtener el proyecto" });
      }
      return res.status(200).send({ project });
    });
  },

  getProjects: function (req, res) {
    Project.find({
      /*filtrar buqueda, parametro aqui, como un WHERE*/
    }).exec((err, projects) => {
      if (err) {
        return res
          .status(500)
          .send({ message: "Error al listar el documento" });
      }
      if (!project) {
        return res
          .status(404)
          .send({ message: "No se ha listado  el proyecto" });
      }
      return res.status(200).send({ projects });
    });
  },

  //---------------------------------------------Update--------------------------------------------------
  updateProject: function (req, res) {
    var projectId = req.params.id;
    var update = req.body; //Recojo el body del la peticion

    Project.findByIdAndUpdate(
      projectId,
      update,
      { new: true },
      (err, projectUpdated) => {
        if (err) {
          return res
            .status(500)
            .send({ message: "Error al actualizar el documento" });
        }
        if (!project) {
          return res
            .status(404)
            .send({ message: "No se ha podido actualizar el proyecto" });
        }
        return res.status(200).send({ projectUpdated });
      }
    );
  },

  //---------------------------------------------Delete--------------------------------------------------
  deleteProject: function (req, res) {
    var projectId = req.params.id;

    Project.findByIdAndRemove(projectId, (err, projectRemoved) => {
      if (err) {
        return res.status(500).send({ message: "Error al borra el documento" });
      }
      if (!project) {
        return res
          .status(404)
          .send({ message: "No se ha borrar actualizar el proyecto" });
      }
      return res.status(200).send({ project: projectRemoved });
    });
  },

  //---------------------------------------------Imgs--------------------------------------------------
  uploadImg: function (req, res) {
    var projectId = req.params.id;
    var fileName = "imagen no subida";

    if (req.files) {
      //console.log(req.files)

      var filePath = req.files.image.path;
      var fileSplit = filePath.split("\\");
      var fileName = fileSplit[1];
      var extSplit = fileName.split(".");
      var fileExt = extSplit[1];

      if (
        fileExt == "png" ||
        fileExt == "jpg" ||
        fileExt == "jpeg" ||
        fileExt == "gif"
      ) {
        Project.findByIdAndUpdate(
          projectId,
          { image: fileName },
          { new: true },
          (err, projectUpdated) => {
            if (err) {
              return res
                .status(500)
                .send({ message: "Error al subir la imagen" });
            }
            if (!projectUpdated) {
              return res
                .status(404)
                .send({ message: "No se ha subido la imagen" });
            }
            return res.status(200).send({ project: projectUpdated });
          }
        );
      } else {
        fs.unlink(filePath, err => {
          return res.status(200).send({ message: "La extensión no es valida" });
        });
      }
    } else {
      return res.status(200).send({ message: fileName });
    }
  },
};

module.exports = controller;
