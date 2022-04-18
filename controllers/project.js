"use strict";
const project = require("../models/project");
var Project = require("../models/project");
var fs = require("fs");
const { exists } = require("../models/project");
const contact = require("../models/contact");
var Contact = require("../models/contact");
var path = require("path");

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

  //*******************************************************CONTACT********************************************************

  homeContact: function (req, res) {
    return res.status(200).send({
      message: "Soy la home del backend de contacto",
    });
  },
  saveContact: function (req, res) {
    var contact = new Contact();

    var params = req.body;
    contact.name = params.name;
    contact.email = params.email;
    contact.subject = params.subject;
    contact.message = params.message;

    //Guardar enb la base de datos
    contact.save((err, contactStored) => {
      if (err) {
        return res
          .status(500)
          .send({ message: "Error al guardar el contacto" });
      }
      if (!contactStored) {
        return res
          .status(404)
          .send({ message: "No se ha podido guardar el contacto" });
      }
      return res.status(200).send({ contact: contactStored });
    });

    /*Pueba en postman
        return res.status(200).send({
          //params: params,
          project: project,
          message: "Nuevo proyecto ok",
        });*/
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
    project.repository = params.repository;
    project.preview = params.preview;

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

  //---------------------------------------------Get Image--------------------------------------------------
  getImageFile: function (req, res) {
    var file = req.params.image;
    var path_file = "./uploads/" + file;

    fs.access(path_file, fs.constants.F_OK, err => {
      if (err) {
        return res.status(200).send({ message: "The image doesn't exist" });
      } else {
        return res.sendFile(path.resolve(path_file));
      }
    });
  },
};

module.exports = controller;
