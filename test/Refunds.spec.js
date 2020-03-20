const expect = require('chai').expect;
const bongloy = require('./Bongloy');

describe('Refunds', function(){
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

  it('creates a refund', async() => {
    var token = await getToken();

    bongloy.charges
      .create({
        amount: 10000,
        currency: "USD",
        source: token.id
      },
      function(err, charge) {
        bongloy.refunds.create({charge: charge.id}, function(err, refund){
          expect(refund.amount).to.equal(10000);
          expect(refund.charge).to.equal(charge.id);
        });
      });
  });

  it('creates a partial refund', async() => {
    var token = await getToken();

    bongloy.charges
      .create({
        amount: 10000,
        currency: "USD",
        source: token.id
      }, function(err, charge) {
        bongloy.refunds.create({
          amount: 6000,
          charge: charge.id
        }, function(err, refund){
          expect(refund.amount).to.equal(6000);
        });
      });
  });

  it('shows a refund', async() => {
    var token = await getToken();

    bongloy.charges
      .create({
        amount: 10000,
        currency: "USD",
        source: token.id
      },
      function(err, charge) {
        bongloy.refunds.create({
          charge: charge.id
        }, function(err, refund){
          bongloy.refunds.retrieve(refund.id, function(err, result){
            expect(result.id).to.equal(refund.id);
          });
        });
      });
  });

  it('lists a refund', async() => {
    var token = await getToken();

    bongloy.charges
      .create({
        amount: 10000,
        currency: "USD",
        source: token.id
      },
      function(err, charge) {
        bongloy.refunds.create({
          charge: charge.id
        }, function(err, refund){
          bongloy.refunds.list(function(err, refunds){
            expect(refunds.data.map((ref)=>ref.id)).to.include.members([refund.id]);
          });
        });
      });
  });
});
