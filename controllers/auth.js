const Employees = require("../models/employee");
const Companies = require("../models/company");
const signJwt = require("../utils/jwt");
const bcrypt = require("bcryptjs");
const BlacklistTokens = require("../models/tokenBlacklist");

// CREATE EMPLOYEE
const createEmployee = async (req, res, next) => {


    try {
        const user = await Employees.create(req.body)
        if (!user) {
            res.status(404).json({
                status: "Failed",
                message: "Unable to create employee."
            })
        }

        const token = await signJwt(user.id, user.email)

        res.status(201).json({
            status: "Success",
            token,
            user
        })


    } catch (error) {
        console.log(error);
        next(error)
    }

}

// create company
const createCompany = async (req, res, next) => {

    try {
        const user = await Companies.create(req.body);

        if (!user) {
            res.status(404).json({
                status: "Failed",
                message: "Unable to create company"
            })
        }

        const token = await signJwt(user.id, user.email)

        res.status(201).json({
            status: "Success",
            token,
            user
        })


    } catch (error) {
        console.log(error);
        next(error)
    }
}


// logout
const logout = async (req, res) => {
    const { token } = req.body;
    
    if (!token) {
        res.status(404).json({
            status: "fail",
            message: "Please supply token in request body",
        })
    }

    const blacklistedToken = await BlacklistTokens.create({ token })

    if (!blacklistedToken) {
        res.status(404).json({
            status: "fail",
            message: "Fail to blacklist token",
        })
    }

    res.status(200).json({
        status: "success",
        message: "Logout successful",
    })
}

// log any user in
const login = async (req, res, next) => {
    const { email, password } = req.body
    let user;
    if (!email || !password) {
        res.json({
            message: "Please complete the login form"
        })
    }

    try {
        user = await Employees.findOne({ email }).select("+password") || await Companies.findOne({ email }).select("+password")

        const correctPassword = user ? await bcrypt.compare(password, user.password) : ""
        

        if (!user || !correctPassword) {

            res.status(403).json({
                status: "failed",
                message: "Email or password is incorrect"
            })
            return
        } else {
            const token = await signJwt(user.id, email)

            res.status(200).json({
                status: "login success",
                token,
                user
            })
        }



    } catch (error) {
        next(error)
        console.log(error)
    }
}


module.exports = { createEmployee, createCompany, logout, login }