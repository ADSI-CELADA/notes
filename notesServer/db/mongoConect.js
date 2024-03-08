import mongoose from "mongoose";
import { URIMGDB } from "../config/config.js"

export const conect = mongoose.connect(URIMGDB).then(() => {
    console.log('Conect MongoDB!');
}).catch((error) => {
    console.log(error);
})