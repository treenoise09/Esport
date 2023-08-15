const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const member = require('./routes/member')
const team = require('./routes/team')
const tournament = require('./routes/tournamets')
const match = require('./routes/match');
const schedule = require('./routes/schedule');
const register = require('./routes/register');

const app = express();
const port = 3000;

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'eSport Tournament API',
        version: '1.0.0',
        description: 'API documentation for the eSport Tournament application',
      },
      servers: [
        {
          url: 'http://localhost:3000',
        },
      ],
    },
    apis: ['./routes/*.js'], // Path to your route files
  };

const specs = swaggerJsdoc(options);

app.use(express.json()); // Middleware to parse JSON request bodies
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(member)
app.use('/teams',team)
app.use('/tournaments',tournament)
app.use('/matches', match);
app.use('/schedules', schedule);
app.use('/register', register);

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});