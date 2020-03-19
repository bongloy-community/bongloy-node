const Bongloy = require('../lib/bongloy');

require('dotenv').config()

const bongloy = new Bongloy(process.env.BONGLOY_SECRET_KEY);

module.exports = bongloy;
