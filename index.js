const express = require('express'),
      routes = require('./api/routes/index');
const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

app.use('/api', routes);

app.listen(3000, () => console.log('Example app listening on port 3000!'))
