import express from 'express';
import { log } from './utils/logger';

const app = express();

// Hook up our routes
app.use('/', require('./routes'));

const port = 3000;

// Start the server listening
const server = app.listen(port, () => {
  log.info(`Demonstration API Running on port ${port}`);
});

// Handle Errors
app.use((err, req, res, next) => {
  // Log the request with error noted
  log.error('ERROR - %s, %s', req.method, req.url);

  // Log the Error
  log.error(err.stack);

  // Return 500 error code
  res.status(500).send({ message: 'Error' });
});

// Handle 404s
app.use((req, res, next) => {
  res.status(404).send({
    message: "Houston, we've had a problem here",
    urlRequested: `${req.method} ${req.url}`,
  });
});