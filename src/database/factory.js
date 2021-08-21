'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const RoleEnum = use('App/Enums/RoleEnum')
const Config = use('Config')

Factory.blueprint('App/Models/User', (faker) => {
  return {
    email: faker.email(),
    username: faker.username(),
    role: faker.pickone(RoleEnum.getArray('value')),
    password: Config.get('app.appKey'),
    avatar: faker.avatar()
  }
})
