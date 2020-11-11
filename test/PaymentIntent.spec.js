const expect = require('chai').expect;
const bongloy = require('./Bongloy');

describe('PaymentIntent', function(){
  it('creates a payment intent', () => {
    bongloy.paymentIntents
      .create({
        amount: 10000,
        currency: "USD",
        "payment_method_types[]": "qr_code"
      },
      function(err, paymentIntent) {        
        expect(paymentIntent.status).to.equal("requires_payment_method");
      });
  });

  it('shows a paymentIntent', async() => {
    bongloy.paymentIntents
      .create({
        amount: 10000,
        currency: "USD",
        "payment_method_types[]": "qr_code"
      },
      function(err, paymentIntent) {
        bongloy.paymentIntents.retrieve(paymentIntent.id, function(err, result){
          expect(result.id).to.equal(paymentIntent.id);
        });
      });
  });

  it('lists paymentIntents', async() => {
    bongloy.paymentIntents
      .create({
        amount: 10000,
        currency: "USD",
        "payment_method_types[]": "qr_code"
      },
      function(err, paymentIntent) {
        bongloy.paymentIntents.list(function(err, paymentIntents){
          expect(paymentIntents.data.map((pt) => pt.id)).to.include.members([paymentIntent.id]);
        })
      });
  });

  it('updates paymentIntent', async() => {
    bongloy.paymentIntents
      .create({
        amount: 10000,
        currency: "USD",
        "payment_method_types[]": "qr_code"
      },
      function(err, paymentIntent) {
        bongloy.paymentIntents.update(paymentIntent.id, {metadata: {key: "value"}}, function(error, result){
          expect(result.metadata.key).to.equal("value");
        });
      });
  });
});
