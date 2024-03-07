const Employees = require("../models/employee");
const Companies = require("../models/company");
const signJwt = require("../utils/jwt");
const bcrypt = require("bcryptjs");

// CREATE EMPLOYEE
const createEmployee = async (req, res, next) => {


    try {
        const employee = await Employees.create(req.body);
        if (!employee) {
            res.status(404).json({
                status: "Failed",
                message: "Unable to create employee."
            })
        }

        const token = await signJwt(employee.id, employee.email)

        res.status(201).cookie("token", token, { maxAge: 60 * 60 * 1000, httpOnly: true }).json({
            status: "Success",
            employee
        })


    } catch (error) {
        console.log(error);
        next(error)
    }

}

// create company
const createCompany = async (req, res, next) => {
    try {
        const company = await Companies.create(req.body);

        if (!company) {
            res.status(404).json({
                status: "Failed",
                message: "Unable to create company"
            })
        }

        const token = await signJwt(company.id, company.email)

        res.status(201).cookie("token", token, { maxAge: 60 * 60 * 1000, httpOnly: true }).json({
            status: "Success",
            company
        })


    } catch (error) {
        console.log(error);
        next(error)
    }
}


// logout
const logout = (req, res, next) => {

    res.clearCookie("token")
    res.status(200).json({
        status: "success",
        message: "logout successful!"
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

        console.log(correctPassword);

        if (!user || !correctPassword) {

            res.status(403).json({
                status: "failed",
                message: "Email or password is incorrect"
            })
            return
        } else {
            const token = await signJwt(user.id, email)

            res.status(200).cookie("token", token, { maxAge: 60 * 60 * 1000, httpOnly: true }).json({
                status: "login success",
            })
        }



    } catch (error) {
        next(error)
    }
}


module.exports = { createEmployee, createCompany, logout, login }