import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./routes.js";

const app = express();


app.use(express.json());
app.use(cors());
app.use(router);
app.use(bodyParser.json());

app.listen(3001, ()=>{
    console.log("Aplicação rodando na porta:3001");    
})


// export default app;
