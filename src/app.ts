import express from 'express';
import { loadEnvFile } from 'node:process';

const app = express();
const port = 3000;

import { sendImage } from './controllers/imageGeneration.js';

app.get('/', (req, res) => {
  res.send('I am indeed alive!')
})

app.get('/getImage', sendImage);

app.listen(port, () => {
  try{
    loadEnvFile()
  } catch (e) {
    console.error(e)
    console.log('.env file not found');
  }

  console.log(`Now listening on ${port}`);
})