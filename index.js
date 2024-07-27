import "dotenv/config";
import "./database/connectdb.js";
import express from 'express';
import authRouter from './routes/auth.route.js';
import cookieParser from "cookie-parser";

const app = express();

/* app.get('/', (req,res) => {
    res.json({ok:true});
}); */
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1', authRouter);

//Solo para ejemplo de login/token
app.use(express.static("public"))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("🔥🔥🔥 http://localhost:"+PORT));