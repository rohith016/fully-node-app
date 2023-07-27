const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Node 18.17.0 Development Server (http://127.0.0.1:${port}) started`);
});
