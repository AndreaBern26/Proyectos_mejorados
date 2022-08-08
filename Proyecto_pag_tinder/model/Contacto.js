//Crear el esquema de contacto con Schema.
var mongoose = require('mongoose');
const {appConfig} = require('../config/config');

var Schema = mongoose.Schema; //cogemos el objeto Schema de la librería mongoose.

var contactoSchema = new Schema({
    nombre: {type: String, required: true, max:20}, //tipo, si es obligatorio (required), max de caracteres que puede tener 
    email: {type:String, required: true, max:50},
    telefono: {type: String, max:10},
    mensaje: {type:String, required: true, max:200}
});

module.exports = mongoose.model('Contacto', contactoSchema); //exporto el modelo de usuario que he descrito
//model (nombre que queramos dar al esquema, varaible de esquema)