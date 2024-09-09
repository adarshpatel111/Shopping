// import express from 'express';

// export const getWebhookRoute = express.Router();
// getWebhookRoute.post('/webhook', webhookController);





// routes.js
import express from 'express';
import { webhookController } from '../controllers/webhookController.js';

// Define the POST route for the webhook


export const getWebhookRoute = express.Router();
getWebhookRoute.post('/stripe/webhook', express.raw({ type: 'application/json' }), webhookController);


