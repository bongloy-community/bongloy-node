const expect = require('chai').expect;
const bongloy = require('./Bongloy');

describe('Cards', function(){
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

  it('creates a card', async() => {
    var token = await getToken();

    bongloy.customers.create({
      email: 'user@example.com',
      description: 'Bongloy customer',
      source: token.id
    }, async(err, customer) => {
      var token = await getToken();

      bongloy.customers.createSource(
        customer.id, {source: token.id},
        function(err, card) {
          expect(card.customer).to.equal(customer.id);
        }
      )
    });
  });

  it('shows a card', async() => {
    var token = await getToken();

    bongloy.customers.create({
      email: 'user@example.com',
      description: 'Bongloy customer',
      source: token.id
    }, async(err, customer) => {
      var token = await getToken();

      bongloy.customers.createSource(
        customer.id, {source: token.id},
        function(err, card) {
          bongloy.customers.retrieveSource(
            customer.id, card.id,
            function(err, result){
              expect(result.id).to.equal(card.id)
            }
          )
        }
      )
    });
  });

  it('lists cards', async() => {
    var token = await getToken();

    bongloy.customers.create({
      email: 'user@example.com',
      description: 'Bongloy customer',
      source: token.id
    }, async(err, customer) => {
      var token = await getToken();

      bongloy.customers.createSource(
        customer.id, {source: token.id},
        function(err, card) {
          bongloy.customers.listSources(
            customer.id,
            function(err, cards){
              expect(cards.data.map((ca) => ca.id)).to.include.members([card.id])
            }
          )
        }
      )
    });
  });

  it.skip('deletes a card', async() => {
    var token = await getToken();

    bongloy.customers.create({
      email: 'user@example.com',
      description: 'Bongloy customer',
      source: token.id
    }, async(err, customer) => {
      var token = await getToken();

      bongloy.customers.createSource(
        customer.id, {source: token.id},
        function(err, card) {
          bongloy.customers.deleteSource(
            customer.id, card.id,
            function(err, result){
              expect(result.deleted).to.equal(true)
            }
          )
        }
      )
    });
  });
});

