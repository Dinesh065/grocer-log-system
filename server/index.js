import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config({});

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

//Connect database
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true,useUnifiedTopology: true})
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch(err => console.log(err))

app.get('/', (req,res) => {
    req.send('Api running')
})

app.listen(PORT, () => console.log(`Server running on ${PORT}`));