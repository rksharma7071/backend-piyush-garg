const express = require("express");
const { conntectMongoDb } = require('./connection')


const {logReqRes} = require('./middlewares')
const userRouter = require('./routers/user')

const app = express();
const PORT = 8000;

// connection
conntectMongoDb("mongodb://127.0.0.1:27017/users").then(()=> console.log("MongoDB Connected Successfully"))

// Middleware
app.use(express.urlencoded({ extended: false }));

// Router 
app.use('/users', userRouter);

// Start Server
app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));