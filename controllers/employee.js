const Employees = require("../models/employee");
const fetchDocs = require("../middlewares/fetching");

// Get all employees
const getAllEmployees = async (req, res, next) => {




    try {

        const { data, currentPage,pages, numOfDocs } = await fetchDocs(req, Employees)

        const numOfEmployees = numOfDocs
        const employees = data

        if (!employees || employees.length == 0) {
            res.status(404).json({
                status: "failure",
                message: "Unable to fetch employees"
            })
            return
        }

        res.status(200).json({
            status: "success",
            pages,
            currentPage,
            numOfEmployees,
            employees
        })


    } catch (error) {
        console.log(error);
        next(error)
    }
}

//  get single Employee
const getSingleEmployee = async (req, res, next) => {

    try {
        const employee = await Employees.findById(req.params.id);

        if (!employee) {
            res.status(404).json({
                status: "failed",
                message: "Unable to get this user."
            })
            return
        }

        res.status(200).json({
            status: "success",
            employee
        })

    } catch (error) {
        console.log(error)
        next(error)
    }
}

// get Employee Dashboard
const getEmployeeDasboard = async (req, res, next) => {

    try {
        const dashboard = await Employees.findById(req.user.id);
        if (!dashboard) {
            res.status(200).json({
                status: "Failed",
                message: "Unable to get employee's dashboard"
            })

            return

        }

        res.status(200).json({
            success: "success",
            dashboard
        })

    } catch (error) {
        console.log(error)
        next(error)
    }
}


// Update employee
const updateEmployee = async (req, res, next) => {

    try {

        const employee = await Employees.findById(req.params.id)

        if (employee.id !== req.user.id) {
            res.status(403).json({
                status: "failed",
                message: "Access denied."
            })
            return
        }

        const updatedEmployee = await Employees.findByIdAndUpdate(req.user.id, req.body, { new: true, runValidators: true });
        

        if (!updatedEmployee) {
            res.status(404).json({
                status: "failed",
                message: "Unable to fetch Employee."
            })
            return
        }

        res.status(200).json({
            status: "success",
            user: updatedEmployee
        })
    } catch (error) {
        console.log(error);
        next(error)
    }

}

// Delete Employee
const deleteEmployee = async (req, res, next) => {
    // get logged in user's id


    try {
        // compare the user's id with the id on the profile

        const employee = await Employees.findById(req.params.id)

        if (employee.id !== req.user.id) {
            res.status(403).json({
                status: "failed",
                message: "Access denied."
            })
            return
        }

        const user = await Employees.findOne({ email: req.user.email })
        if (!user) {
            res.status(404).json({
                status: "failed",
                message: "Can't find this user"
            })
        }

        await Employees.findByIdAndDelete(user.id)

        res.status(204).json({
            status: "success",
            message: "Profile deleted"
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}


module.exports = { getAllEmployees, getEmployeeDasboard, getSingleEmployee, updateEmployee, deleteEmployee }