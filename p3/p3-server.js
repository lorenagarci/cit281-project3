const fastify = require('fastify')();
const fs = require('fs');
const p3Module = require('./p3-module');
const coinCount = p3Module.coinCount;

//const { coinCount } = require('./p3-module');

fastify.get('/', (request, reply) => {
    fs.readFile(__dirname + '/index.html', (err, data) => {
      if (err) {
        reply.code(500).send('Error loading index.html');
      } else {
        reply
          .code(200)
          .header('Content-Type', 'text/html')
          .send(data);
      }
    });
  });

  fastify.get('/coins', (request, reply) => {
    const { option } = request.query;
    let coinValue = 0;
    switch (parseInt(option)) {
      case 1:
        coinValue = coinCount({ denom: 5, count: 3 }, { denom: 10, count: 2 });
        break;
      case 2:
        const coins = [
          { denom: 25, count: 2 },
          { denom: 1, count: 7 },
        ];
        coinValue = coinCount(...coins);
        break;
      case 3:
        const coinsArray = [
          { denom: 25, count: 2 },
          { denom: 1, count: 7 },
        ];
        coinValue = coinCount(coinsArray);
        break;
      default:
        break;
    }
    const responseString = `<h2>Option ${option} value is ${coinValue}</h2><br /><a href="/">Home</a>`;
    reply
      .code(200)
      .header('Content-Type', 'text/html')
      .send(responseString);
  });

fastify.get('/coin', (request, reply) => {
  const { denom = 0, count = 0 } = request.query;
  const denomInt = parseInt(denom);
  const countInt = parseInt(count);
  const coinValue = coinCount({ denom: denomInt, count: countInt });
  const responseString = `<h2>Value of ${countInt} of ${denomInt} is ${coinValue}</h2><br /><a href="/">Home</a>`;
  reply
    .code(200)
    .header('Content-Type', 'text/html')
    .send(responseString);
});


fastify.listen(8080, 'localhost', (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening on ${address}`);
  });