import express, { json } from "express";
import bodyParser from "body-parser";
import cors from "cors"
import device from "express-device";
import { PORT } from "./config/config.js";
import { userRouter } from "./routers/auth.routing.js";
import { tasksRouter } from "./routers/tasks.routing.js";

const app = express()


// Routes -> 



// app.use((req, res, next) => {
//     if (req.url !== '/') {
//         res.append('Access-Control-Allow-Origin', '*');
//         res.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
//         res.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//         res.append('Access-Control-Allow-Credentials', 'true');
//     }
//     if (req.method !== 'OPTIONS') {
//         res.append('content-type', 'application/json; charset=utf-8');
//     }
//     next();
// })

app.use(cors())
app.use(json())
app.use(userRouter)
app.use(tasksRouter)
app.use(device.capture())


app.listen(PORT, () => {
    console.log(`Server running! ${PORT}`);
})