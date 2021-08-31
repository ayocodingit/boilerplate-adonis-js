'use strict'

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

Route.get('/', 'HomeController.index')
Route.get('/api', 'HomeController.index')

// Authentication User
Route.group(() => {
  Route.post('login-with-google', 'OauthController.signInWithGoogle').validator('GoogleRequest')
  Route.post('signup-with-google', 'OauthController.signUpWithGoogle').validator(['GoogleRequest', 'SignUpRequest'])
  Route.post('login', 'AuthController.login').middleware('guest').validator('LoginRequest')
  Route.get('user', 'AuthController.user').middleware('jwt')
  Route.post('refresh-token', 'AuthController.refreshToken').middleware('jwt').validator('RefreshTokenRequest')
  Route.post('logout', 'AuthController.logout').middleware('jwt').validator('RefreshTokenRequest')
  Route.post('update-password', 'SettingController.updatePassword').middleware('jwt').validator('UpdatePasswordRequest')
}).prefix('api')
