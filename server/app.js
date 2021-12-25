
import express from "express";
import mongoose from "mongoose";
import { appconfig, dbconfig } from './src/config/config.js';
import { routes } from "./src/routes/route-index.js";

export const app = express();

routes(app);

// database connection string 
const connectWithRetry = () => {
    
    const {
        mongo_username,
        mongo_password,
        mongo_host_ip,
        mongodb_port,
        mongodb_name
    } = dbconfig;
    
    let mongoURL = `mongodb://${mongo_host_ip}:${mongodb_port}/${mongodb_name}`
    // connection = connection.replace('localhost','mongo');
    mongoose.connect(mongoURL,
        {
            useNewUrlParser:true, 
            useUnifiedTopology:true,
        }).then(()=> console.log(`${new Date().toISOString()} [info] Connected to DB @ ${mongoURL}`))
        .catch((e) => {
        
        console.log(e);
        setTimeout(connectWithRetry,5000);
    
    });
};

//express app listener
const startApp = () =>{
    connectWithRetry();
    const {app_port, app_host_ip} = appconfig
    app.listen(
        app_port,
        ()=> console.log(`${new Date().toISOString()} [info] Running On Port ${app_host_ip}`)
    );
};

startApp();