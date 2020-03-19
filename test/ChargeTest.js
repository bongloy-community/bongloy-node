const assert = require('chai').assert;
const bongloy = require('./Bongloy');

describe('Charge', function(){
  function getToken(){
    return new Promise(function(resolve, reject) {
      bongloy.tokens.create({
          card: {
            number: '6200000000000005',
            exp_month: 3,
            exp_year: 2021,
            cvc: '123',
          },
        },function(err, token) {
          resolve(token);
        });
    });
  };

  it('creates a charge', async() => {
    var token = await getToken();

    bongloy.charges
      .create({
        amount: 10000,
        currency: "USD",
        source: token.id
      },
      function(err, charge) {
        assert.equal(charge.amount, 10000);
        assert.equal(charge.currency, "USD");
        assert.equal(charge.status, "succeeded");
      });
  });

  it('shows a charge', async() => {
    var token = await getToken();

    bongloy.charges
      .create({
        amount: 10000,
        currency: "USD",
        source: token.id
      },
      function(err, charge) {
        bongloy.charges.retrieve(charge.id, function(err, result){
          assert.equal(result.id, charge.id);
        })
      });
  });

  it('lists charges', async() => {
    var token = await getToken();

    bongloy.charges
      .create({
        amount: 10000,
        currency: "USD",
        source: token.id
      },
      function(err, charge) {
        bongloy.charges.list({limit: 3}, function(err, charges){
          assert.equal(charges.data[0].id, charge.id);
        })
      });
  });

  it('captures a charge', async() => {
    var token = await getToken();

    bongloy.charges
      .create({
        amount: 10000,
        currency: "USD",
        source: token.id,
        capture: false
      },
      function(err, charge) {
        bongloy.charges.capture(charge.id, function(error, result){
          assert.equal(result.captured, true);
          assert.equal(result.status, "succeeded");
          assert.equal(result.amount, 10000);
        });
      });
  });

  it('partially captures a charge', async() => {
    var token = await getToken();

    bongloy.charges
      .create({
        amount: 10000,
        currency: "USD",
        source: token.id,
        capture: false
      },
      function(err, charge) {
        bongloy.charges.capture(charge.id, {amount: 8000}, function(error, result){
          assert.equal(result.captured, true);
          assert.equal(result.amount_refunded, 2000);
        });
      });
  });
});
