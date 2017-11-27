const express = require('express');
var bodyParser = require('body-parser');
var api = express.Router();
const fileUpload = require('express-fileupload');
const client = require('mongodb').MongoClient;
var path = require('path');

api.use(fileUpload());
api.use(bodyParser.urlencoded({
  extended: true
}));
api.use(bodyParser.json());

api.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var url = 'mongodb://localhost:27017/pinWork';
var db = null;

client.connect(url, (err, database) => {
  if (!err) {
    console.log('connected to database');
    db = database;
  }
});

api.get('/users', (req, res) => {
  db.collection('users')
    .find({})
    .toArray((err, users) => {
      if (!err) {
        res.json({
          mensaje: 'ok',
          users: users
        });
      } else {
        res.json({
          mensaje: 'No se pudieron cargar los post-its o no hay ninguno'
        });
      }
    })
});

api.get('/home', (req, res) => {
  db.collection('postits')
    .find({})
    .toArray((err, postits) => {
      if (!err) {
        res.json({
          mensaje: 'ok',
          posts: postits
        });
      } else {
        res.json({
          mensaje: 'No se pudieron cargar los post-its o no hay ninguno'
        });
      }
    })
});

api.post('/login', (req, res) => {
  db.collection('users').find({
    usuario: req.body.usuario,
    password: req.body.password
  }).toArray((err, user) => {
    if (err || user.length == 0) {
      res.json({
        mensaje: 'La informacion ingresado no coincide o el usuario no existe'
      });
    } else {
      res.json({
        mensaje: 'logged',
        user: user[0]
      });
    }
  })
});

api.post('/registro', (req, res) => {
  db.collection('users').find({
    correo: req.body.correo
  }).toArray((err, usuarios) => {
    if (!err && usuarios.length == 0) {
      db.collection('users').insert({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        cargo: req.body.cargo,
        usuario: req.body.usuario,
        correo: req.body.correo,
        password: req.body.password
      }, (err) => {
        if (!err) {
          res.json({
            mensaje: 'Se ha registrado el usuario'
          });
        } else {
          res.json({
            mensaje: 'No se pudo registrar usuario'
          });
        }
      });
    } else {
      res.json({
        mensaje: 'Los datos ingresados corresponden a un usuario que ya existe'
      })
    }
  })
});

module.exports = api;
