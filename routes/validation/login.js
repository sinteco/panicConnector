const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatorLoginInput(data){
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    //email validator

    if(!Validator.isEmail(data.email)){
        errors.email = 'Email is not valid';
    }

    if(Validator.isEmpty(data.email)){
        errors.email = 'Email Field is required';
    }

    //password validator

    if(Validator.isEmpty(data.password)){
        errors.password = 'password Field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}