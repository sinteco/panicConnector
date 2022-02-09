const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatorEducationInput(data){
    let errors = {};

    data.school = !isEmpty(data.school) ? data.school : '';
    data.degree = !isEmpty(data.degree) ? data.degree : '';
    data.filedofstudy = !isEmpty(data.filedofstudy) ? data.filedofstudy : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    if(Validator.isEmpty(data.school)){
        errors.school = 'School Field is required';
    }
    if(Validator.isEmpty(data.degree)){
        errors.degree = 'Segree Field is required';
    }
    if(Validator.isEmpty(data.filedofstudy)){
        errors.filedofstudy = 'Field of study Field is required';
    }
    if(Validator.isEmpty(data.from)){
        errors.from = 'From date Field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}