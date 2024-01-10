import express from 'express'
import bodyParser from 'body-parser';
import { connection } from './database/connection'

import combineRouter from './routes/api';
import { PORT } from './config/config';

const app = express()

if(connection()){

    app.use(express.json());
    
    app.use(bodyParser.urlencoded({ extended: true }));
    
    app.use(bodyParser.json()); 

    //routes
    combineRouter(app)

    app.listen(PORT, () => console.log(`app listening on port ${PORT}`))
}else{
    console.error('database not connected')
}