"use strict";

const Stripe = require("stripe");
const DEFAULT_HOST = "api.bongloy.com";

function Bongloy(key, config = {}) {
  return new Stripe(key, {
    ...{ host: DEFAULT_HOST },
    ...config
  });
};

module.exports = Bongloy;
module.exports.default = Bongloy;
