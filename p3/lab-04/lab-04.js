// Require the Fastify framework and instantiate it
const fastify = require("fastify")();
// Handle GET verb for / route using Fastify
// Note use of "chain" dot notation syntax
fastify.get("/name", (request, reply) => {
  const { first, last } = request.query;
  const name = first && last ? `${first} ${last}` : "Guest";
  const content = `<h1>Hello, ${name}</h1>`;
  reply
    .code(200)
    .header("Content-Type", "text/html; charset=utf-8")
    .send(content);
});
// Start server and listen to requests using Fastify
const listenIP = "localhost";
const listenPort = 8080;
fastify.listen({ port: listenPort, host: listenIP }, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});

