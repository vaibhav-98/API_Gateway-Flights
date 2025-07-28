const { StatusCodes } = require("http-status-codes");
const AppError = require('../utils/errors/app-error')

const { UserService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");


/**
 * POST : /Singup
 * req-body {email: "abc@abstract.com", password: "12546"}
 */

async function singup(req,res) {
     console.log(req.body);
     
    try {
        const user = await UserService.create({
            email:req.body.email,
            password: req.body.password
        })
        console.log("user >", user);
        
        SuccessResponse.data = user
        return res 
                  .status(StatusCodes.CREATED)
                  .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res 
                  .status(error.statusCode)
                  .json(ErrorResponse)
    }
}

module.exports = {
    singup
}
