'use strict';

const Stripe = require('stripe');

const DEFAULT_HOST = 'api.bongloy.com';

function Bongloy(key) {
  const bongloy = new Stripe(key , {
    host: DEFAULT_HOST
  });

  return bongloy;
}

module.exports = Bongloy;

module.exports.Bongloy = Bongloy;

module.exports.default = Bongloy;
