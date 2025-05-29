import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import userRouter from './src/routes/userRouter.js';
import createRouter from './src/routes/createRouter.js';
import cors from 'cors';
import classRouter from './src/routes/classDataRoute.js';
import ptclasscreateRouter from './src/routes/ptMarksRoutes.js';

const app = express();

const corsOptions = {
    origin: process.env.ORIGIN,
};

// app.use(cors(
//     {
//         origin: process.env.FRONTEND_URL,
//         credentials: true
//     }
// ));
app.use(cors());

app.use(express.json());

app.use("/ping",(req,res) => {
    res.send("Pong");
});

app.use("/api/v1/user",userRouter);
app.use("/api/v1/create",createRouter);
app.use("/api/v1/class",classRouter);
app.use("/api/v1/pt",ptclasscreateRouter);

app.all("*",(req,res) => {
    res.send("404 Page Not Found ");
});

export default app;