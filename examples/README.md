### Bongloy demo node js

To run this demo, first you have to install package
```
npm install
```

then you can change some configurations

```js
// server.js
const bongloy = new Bongloy("your bongloy secret key");
```

```js
// card.js
Bongloy.setPublishableKey('your bongloy publishable key')
```
and then run the project 
```
node server.js
```

That's all!!
