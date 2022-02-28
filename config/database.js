import dotenv  from "dotenv"
import path from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({path:path.resolve(__dirname, '..')+'/.env'});

import mongoose from 'mongoose';
const url = process.env.MONGO_URL;


const connection = mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true});

mongoose.connection.on('connected', ()=> {
    console.log('[Mongoose] - connected in:', url)
})

mongoose.connection.on('error', (err)=> {
    console.log('[Mongoose] - error:', err)
})

export default connection;