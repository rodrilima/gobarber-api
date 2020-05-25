import {createConnections} from "typeorm";

createConnections()
  .then(()=>console.log('Database connected'))
  .catch(error => console.log(error));
