'use strict'

const Config = use('Config')

class HomeController {
  index ({ response, request }) {
    return response.json({
      app: Config.get('app.name'),
      server: request.hostname()
    })
  }
}

module.exports = HomeController
