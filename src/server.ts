import "reflect-metadata";
import {createConnection} from "typeorm";

createConnection().then(connection => {
  console.log(connection)
}).catch(error => console.log(error));;

import express from 'express';

import routes from './routes'

const app = express();

app.use(express.json())
app.use(routes)

app.listen(3000, ()=>console.log('Running on port 3000'));
