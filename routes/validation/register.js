const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatorRegisterInput(data){
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.confpassword = !isEmpty(data.confpassword) ? data.confpassword : '';

    //name validator

    if(!Validator.isLength(data.name,{min:2,max:30})){
        errors.name = 'Name must be between 2 and 31 characters';
    }

    if(Validator.isEmpty(data.name)){
        errors.name = 'Name Field is required';
    }

    //email validator

    if(!Validator.isEmail(data.email)){
        errors.email = 'Email is not valid';
    }

    if(Validator.isEmpty(data.email)){
        errors.email = 'Email Field is required';
    }

    //password validator

    if(!Validator.isLength(data.password,{min:6,max:30})){
        errors.password = 'password must be at least 6 characters';
    }

    if(Validator.isEmpty(data.password)){
        errors.password = 'password Field is required';
    }

    //confirm password validator

    if(!Validator.equals(data.password, data.confpassword)){
        errors.confpassword = 'password must match';
    }

    if(Validator.isEmpty(data.confpassword)){
        errors.confpassword = 'confirm password Field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}