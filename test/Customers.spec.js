const expect = require('chai').expect;
const bongloy = require('./Bongloy');

describe('Customers', function(){
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

  it('creates a customer', async()=> {
    var token = await getToken();

    bongloy.customers.create({
      email: 'user@example.com',
      description: 'Bongloy customer',
      source: token.id
    }, function(err, customer){
      expect(customer.email).to.equal('user@example.com');
      expect(customer.description).to.equal('Bongloy customer');
    });
  });

  it('shows a customer', async()=> {
    var token = await getToken();

    bongloy.customers.create({
      email: 'user@example.com',
      description: 'Bongloy customer',
      source: token.id
    }, function(err, customer){
      bongloy.customers.retrieve(customer.id, function(err, result){
        expect(result.id).to.equal(customer.id);
      });
    });
  });

  it('lists customers', async()=> {
    var token = await getToken();

    bongloy.customers.create({
      email: 'user@example.com',
      description: 'Bongloy customer',
      source: token.id
    }, function(err, customer){
      bongloy.customers.list(function(err, customers){
        expect(customers.data.map((cust)=> cust.id)).to.include.members([customer.id]);
      });
    });
  });
});

