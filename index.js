'use strict'

require('dotenv').config()

const Hapi = require('hapi')
const Stripe = require('stripe')(process.env.stripeSecretKey)

const server = new Hapi.Server()
server.connection({ port: 3000 })

server.route({
  method: 'POST',
  path: '/api/monies',
  handler: function (req, res) {
    let token = req.payload.token
    let charge = Stripe.charges.create({
      amount: 2000,
      currency: 'usd',
      source: token,
      description: '2 widgets'
    }, (err, charge) => {
      if (err && err.type === 'StripeCardError') {
        console.log(err)
      } else {
        res({ message: 'Charged' }).code(201)
      }
    })
  }
})

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});
