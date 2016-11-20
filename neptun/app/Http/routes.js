'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

//Route.on('/').render('welcome')

Route.get('/', 'SubjectController.index')
Route.get('/ownSubjects', 'SubjectController.ownList').middleware('auth')
Route.get('/subjects/create', 'SubjectController.create').middleware('auth')
Route.get('/search', 'SubjectController.search').middleware('auth')
Route.post('/subjects/create', 'SubjectController.doCreate').middleware('auth')
Route.get('/subjects/:id/edit', 'SubjectController.edit').middleware('auth')
Route.post('/subjects/:id/edit', 'SubjectController.doEdit').middleware('auth')
Route.get('/subjects/:id/delete', 'SubjectController.doDelete').middleware('auth')
Route.get('/subjects/:id', 'SubjectController.show')

Route.get('/users/list', 'UserController.listUsers').middleware('auth')
Route.get('/users/:id', 'UserController.show')
Route.get('/users/:id/edit', 'UserController.edit').middleware('auth')
Route.post('/users/:id/edit', 'UserController.doEdit').middleware('auth')
Route.get('/users/:id/delete', 'UserController.doDelete').middleware('auth')


Route.get('/register', 'UserController.register')
Route.get('/login', 'UserController.login')
Route.post('/register', 'UserController.doRegister')
Route.post('/login', 'UserController.doLogin')
Route.get('/logout', 'UserController.doLogout')