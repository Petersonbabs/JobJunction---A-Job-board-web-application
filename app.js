require("dotenv").config()
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./errror/error");

// Imported Routers
const authRouter = require("./routes/auth");
const jobRouter = require("./routes/job");
const userRouter = require("./routes/users");
const companyRouter = require("./routes/company");
const categoryRouter = require("./routes/category");

const app = express()

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



// ENDPOINTS
app.get("/api/v1", (req, res)=>{res.send("welcome to jobjunction api version 1")})




// ROUTED ENDPOINTS
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/jobs", jobRouter);
app.use("/api/v1/employees", userRouter);
app.use("/api/v1/employee", userRouter);
app.use("/api/v1/companies", companyRouter)
app.use("/api/v1/company", companyRouter)
app.use("/api/v1/category", categoryRouter)
app.use("/api/v1/categories", categoryRouter)


app.all("*", (req, res)=>{
    res.json(`${req.method} ${req.originalUrl} is not an endpoint on this server`)
})

app.use("*", errorHandler)


module.exports = app

