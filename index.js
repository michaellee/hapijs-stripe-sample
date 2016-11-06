'use strict'

const Hapi = require('hapi')

const server = new Hapi.Server()
server.connection({ port: 3000 })

server.route({
  method: 'POST',
  path: '/monies',
  handler: function (req, res) {
    res(req.payload.test)
  }
})

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});
