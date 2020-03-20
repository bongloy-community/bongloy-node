const expect = require('chai').expect;
const bongloy = require('./Bongloy');

describe('Charges', function(){
  function getToken(){
    return new Promise(function(resolve, reject) {
      bongloy.tokens.create({
          card: {
            number: '6200000000000005',
            exp_month: 3,
            exp_year: new Date().getFullYear() + 1,
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
        expect(charge.amount).to.equal(10000);
        expect(charge.currency).to.equal("USD");
        expect(charge.status).to.equal("succeeded");
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
          expect(result.id).to.equal( charge.id);
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
        bongloy.charges.list(function(err, charges){
          expect(charges.data.map((ch) => ch.id)).to.include.members([charge.id]);
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
          expect(result.captured).to.equal(true);
          expect(result.status).to.equal("succeeded");
          expect(result.amount).to.equal(10000);
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
          expect(result.captured).to.equal(true);
          expect(result.amount_refunded).to.equal(2000);
        });
      });
  });
});
