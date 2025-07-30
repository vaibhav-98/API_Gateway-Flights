
const { UserRepository} = require('../repositories')
const  AppError = require('../utils/errors/app-error')
const {StatusCodes} = require('http-status-codes')

const userRepo = new UserRepository()

async function create(data) {
    try {
        const user = await userRepo.create(data);
       // console.log("user", user);
        
        //const role = await roleRepo.getRoleByName(Enums.USER_ROLES_ENUMS.CUSTOMER);
        //user.addRole(role);
        return user;
    } catch(error) {
       // console.log(error.name);
        if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new user object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

 module.exports = {
    create
 }