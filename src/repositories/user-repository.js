const CrudeRepository = require('./crud-repository')
const { User } = require('../models')


class UserRepository extends CrudeRepository {
    constructor() {
        super(User)
    }
}


module.exports = UserRepository