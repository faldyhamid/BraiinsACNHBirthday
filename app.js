import express from 'express';
const app = express()
const port = 3000

import { sendImage } from './controllers/imageGeneration.js';

app.get('/', (req, res) => {
  res.send('I am indeed alive!')
})

app.get('/getImage', sendImage);

app.listen(port, () => {
  console.log(`Now listening on ${port}`);
})