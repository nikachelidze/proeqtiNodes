const db = './db';
require('dotenv').config();

const express = require('express');
//const bodyParser = require('body-parser')
const routres = require('./db');
const errorMiddleware = require('./middleware/error_middlewre')
const app = express();

app.use(json());
//app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser());
app.use(cors());
app.use('/api',routres);

app.use(routres);
app.listen(5001, () =>{
    try{
        console.log('server listens to port 5001')
    }
    catch(e){
        console.log(e);
    }
});
app.use(errorMiddleware);
