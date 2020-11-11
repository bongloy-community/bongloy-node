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

```js
bongloy.charges
  .create({
    amount: 1000,
    currency: "USD",
    source: "token_id"
  },
  function(err, charge){
    console.log(charge);
  });

```

#### Create a refund

```js
bongloy.refunds
  .create({
    amount: 6000,
    charge: "charg_id"
  }, function(err, refund){
    console.log(refund)
  });

```

#### Create a customer

```js
bongloy.customers
  .create({
    email: 'user@example.com',
    description: 'Bongloy customer',
    source: "token_id"
  }, function(err, customer){
    console.log(customer)
  })

```

## Documentation

See the [API docs](https://sandbox.bongloy.com/documentation).
