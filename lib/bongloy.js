'use strict';

const Stripe = require('stripe');

function Bongloy(key) {
  const bongloy = new Stripe(key , {
    host: 'api.bongloy.com'
  });

  return bongloy;
}

module.exports = Bongloy;

module.exports.Bongloy = Bongloy;

module.exports.default = Bongloy;
