'use strict'

const { route } = require('@adonisjs/framework/src/Route/Manager')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() =>{
  //RUTAS USUARIO
  Route.post('usuarios/registro','UserController.store');
  Route.post('usuarios/login','UserController.login');
  ///RUTAS DE PROYECTOS
  Route.get('/proyectos','ProyectoController.index').middleware('auth');
  Route.post('/proyectos/create','ProyectoController.create').middleware('auth');
  Route.delete('/proyectos/delete/:id','ProyectoController.destroy').middleware('auth');
  Route.patch('/proyectos/update/:id','ProyectoController.update').middleware('auth');
  //RUTA TAREAS
  Route.post('/proyectos/:id/tareas','TareaController.create').middleware('auth');
  Route.get('/proyectos/:id/tareas','TareaController.index').middleware('auth');
  Route.patch('tareas/:id','TareaController.update').middleware('auth');
  Route.delete('tareas/:id','TareaController.destroy').middleware('auth');
}).prefix('api/v1/');



//adonis make:controller User