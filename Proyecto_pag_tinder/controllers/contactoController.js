var mongoose = require('mongoose');
var contactoModel = require("../model/Contacto");

/*Creo el controlador*/
var contactoController = {};

/*---------------Añadir un formulario de contacto a la BD----------------*/
contactoController.createContacto = async (nombre, email, telefono, mensaje) =>{
    const contacto = new contactoModel({
        nombre:nombre,
        email:email,
        telefono:telefono,
        mensaje: mensaje
    });
  
    console.log(contacto);
    contacto.save();
  }

module.exports = contactoController;
  