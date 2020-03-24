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

<!-- prettier-ignore -->
```js
const Bongloy = require('bongloy');

const bongloy = new Bongloy('sk_test_...');

bongloy.charges
  .create({
    amount: 1000,
    currency: "USD",
    source: "6b1ca112-add7-4bc6-b520-829e004c0580"
  },
  function(err, charge){
    console.log(charge);
  });

```

## Documentation

See the [API docs](https://sandbox.bongloy.com/documentation).
