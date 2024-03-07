require("dotenv").config();
const jwt = require("jsonwebtoken")
const Companies = require("../models/company");
const Employees = require("../models/employee");

const isAuthenticated = async (req, res, next) => {

    const { token } = req.cookies
    if (!token) {

        res.send("you must be logged in to access this route.")
        return
    }


    const decoded = jwt.verify(token, process.env.jwtSecret);

    const user = await Companies.findById(decoded.id) || await Employees.findById(decoded.id)


    if (!user) {
        res.status(404).json({
            status: "fail",
            message: "Can't find user with the specified token"
        })
        return

    }


    req.user = user;
    next()

}


const isAdmin = async (req, res, next) => {
    try {
        if (req.user.role !== "admin") {
            res.status(403).json({
                status: "failed",
                message: "Access denied. You are not an Admin"
            })

            return
        }

        next()

    } catch (error) {
        console.log(error);
        next(error)
    }
}

const isEmployee = async (req, res, next) => {
    try {
        if (req.user.role !== "employee" && req.user.role !== "admin") {
            res.status(403).json({
                status: "failed",
                message: "You have to be an employee to access this route"
            })

            return
        }

        next()

    } catch (error) {
        console.log(error);
        next(error)
    }
}


const isCompany = async (req, res, next) => {
    try {
        if (req.user.role !== "company" && req.user.role !== "admin") {
            res.status(403).json({
                status: "failed",
                message: "You have to be an EMPLOYER to access this route"
            })

            return
        }

        next()

    } catch (error) {
        console.log(error);
        next(error)
    }
}
module.exports = { isAuthenticated, isEmployee, isCompany, isAdmin }