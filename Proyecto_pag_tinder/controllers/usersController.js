var mongoose = require('mongoose');
var userModel = require("../model/Usuario");

/*Creo el controlador*/
var usersController = {};

/*Control de rutas de usuarios*/

usersController.login = function(req,res,next){
    let email = req.body.email;
    let password = req.body.password;
  
    if (userModel.findOne(email)){
      console.log(email, password);
      res.render('user', {email:email, password:password});
    }else{
      usersController.createUser();
    }
    
  }
/*---------------------------------
          FUNCIONES CRUD
----------------------------------*/

usersController.obtenerUsuario = function (req,res){
  userModel.findOne("gabri094@gmail.com").exec(function(err, usuario){
    if ( err ){
       return false; //No se ha encontrado en la BD
    }else{
      console.log(usuario);
      res.render('../views/user',{usuario: usuario}); //Devuelve el usuario
    }
  });
}
/*----------------Listar usuarios------------------*/

usersController.list = function(req, res){
  userModel.find().exec(function(err, usuarios){
      if( err ){ console.log('Error: ', err); return; }
      console.log(usuarios);
      res.render('../views/users', {usuarios: usuarios}); 
  });
};

/*---------------Añadir un usuario a la BD----------------*/

usersController.createUser = async (nombre, fecha_nacimiento,telefono,ciudad,pais,sexo,orientacion_sexual,aficiones,email,password,imagen) =>{
    const user = new userModel({
        nombre: nombre,
        edad: getEdad(fecha_nacimiento),
        ciudad: ciudad,
        pais: pais,
        aficiones: aficiones,
        telefono: telefono,
        email: email,
        fecha_nacimiento: fecha_nacimiento,
        imagen: imagen,
        sexo: sexo,
        orientacion_sexual: orientacion_sexual,
        password: password
    });

    console.log(user);
    user.save();
}

/*Calcular la edad a partir de la fecha de nacimiento*/

function getEdad(dateString) {
  let hoy = new Date();
  let fechaNacimiento = new Date(dateString);
  let edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
  let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()
  if (
    diferenciaMeses < 0 ||
    (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
  ) {
    edad--;
  }
  return edad;
}

/*----------------Borrado de usuarios---------------- */

/*Elimina todos los usuarios que tengan el nombre Laura*/
const deleteUsers = async (req,res) => { 
  const result = await userModel.deleteMany({nombre: 'Laura'});
  console.log(result);
  res.send('Usuarios eliminados');
}


/*Elimina el primer dato que coincida con el nombre de Ana*/
const deleteAnElement = async () => { 
  const result = await userModel.deleteOne({nombre: 'Ana'});
  console.log(result);
  res.send('Usuario eliminado');
}

/*Busca un usuario en específico y lo elimina*/
const deleteElement = async (req,res) => { 
  const result = await userModel.findOneAndDelete({email: 'daniel26@gmail.com'});
  console.log(result);
  res.send('El usuario ' + userModel.nombre +  ' ha sido eliminado');
}

/*Busca un usuario por ID y lo elimina*/
usersController.deleteElementById = async () => { 
  const result = await userModel.findByIdAndDelete('62d93373534b1a3e7bd0ef79');
  console.log(result);
  res.send('El usuario ' + userModel.nombre + ' ha sido eliminado');
}


/*------------Actualizar los datos-----------*/
/*Hay varias formas*/

/*Función para actualizar un objeto.*/
usersController.updateUser = async function(){
  const user = await userModel.updateOne({email: 'evandro77@gmail.com'}, 
  {telefono: '468957539'});
  console.log(user);
  user.save();
  res.render('./views/user', {usuarios:user})
 }

/*Otro modo de actualizar los datos sin necesidad del método update*/
usersController.updateUser2 = async (req,res) =>{
  const user = await userModel.findOne({email: 'camilad8@gmail.com'});
  console.log(user);
  user.sexo = 'Hombre'
  user.save();
  res.render('./views/user', {usuarios:user})
}

usersController.updateUser3 = async () => {
  const user = await userModel.findOneAndUpdate({nombre: 'Jose'}, 
  {nombre: 'Nina Simone'},
  {new: true}) //new:true para que se actualice el dato.
  console.log(user);
}

module.exports = usersController;