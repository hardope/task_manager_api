const Joi = require('joi')

function ValidateUser(user) {
    const User = Joi.object({
        id: Joi.number().min(0).required(),
        username: Joi.string().min(3).required(),
        first_name: Joi.string().min(3),
        last_name: Joi.string().min(3),
        age: Joi.number().min(0).required()
    })

    return User.validate(user)
}

exports.ValidateUser = ValidateUser;