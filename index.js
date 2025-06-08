import express from 'express';
const app = express()
import Lab5 from "./Lab5/index.js";
import Hello from "./Hello.js"
Lab5(app);
Hello(app)
app.listen(process.env.PORT || 4000)
