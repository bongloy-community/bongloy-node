# Bongloy Node.js Library

[![Version](https://img.shields.io/npm/v/bongloy.svg)](https://www.npmjs.org/package/bongloy)
![Build](https://github.com/bongloy-community/bongloy-node/workflows/Build/badge.svg)
[![Downloads](https://img.shields.io/npm/dm/bongloy.svg)](https://www.npmjs.com/package/bongloy)

This is the Unofficial Node library for [Bongloy Payment Gateway](https://www.bongloy.com/).

## Installation

Install the package with:

```sh
npm install bongloy --save
# or
yarn add bongloy
```

## Usage

The package needs to be configured with your account's secret key, which is
available in the [Bongloy Dashboard](https://sandbox.bongloy.com/dashboard/api_keys). Require it with the key's
value:
```js
const bongloy = require('bongloy')('sk_test_...');

bongloy.customers.create({
  email: 'customer@example.com',
})
  .then(customer => console.log(customer.id))
  .catch(error => console.error(error));
```
Or using ES modules and async/await:

```js
import Bongloy from 'bongloy';
const bongloy = new Bongloy('sk_test_...');

(async () => {
  const customer = await bongloy.customers.create({
    email: 'customer@example.com',
  });

  console.log(customer.id);
})();
```

## Features

#### Create a charge
Once you’ve securely collected and tokenized your customer's credit card you can charge the card immediately or save it for later
```js
bongloy.charges
  .create({
    amount: 1000,
    currency: "USD",
    source: "token_id"
  })
  .then(charge => console.log(charge.id))
  .catch(error => console.error(error));

```

#### Create a refund
Refund allow you to refund a charge that has previously been created but not yet refunded

```js
bongloy.refunds
  .create({
    amount: 6000,
    charge: "charge_id"
  })
  .then(refund => console.log(refund.id))
  .catch(error => console.error(error));

```

#### Create a customer
Create a customer for creating subscriptions or future one-off charges.

```js
bongloy.customers
  .create({
    email: 'user@example.com',
    description: 'Bongloy customer',
    source: "token_id"
  })
  .then(customer => console.log(customer.id))
  .catch(error => console.error(error));

```

#### Create a paymentIntent

```js
bongloy.paymentIntents
  .create({
    amount: 10000,
    currency: "USD",
    "payment_method_types[]": "qr_code"
  })
  .then(paymentIntent => console.log(paymentIntent.id))
  .catch(error => console.error(error));

```

## Documentation

See the [API docs](https://sandbox.bongloy.com/documentation).
