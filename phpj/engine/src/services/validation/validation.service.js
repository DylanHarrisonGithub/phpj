module.exports = {
  validate: (input, schema) => {
    let errors = [];
    for (let key in schema) {
      if (input.hasOwnProperty(key) && input[key]) {
        if (schema[key].hasOwnProperty('type')) {
          if (typeof schema[key]['type'] === 'object') {
            if (Array.isArray(input[key])) {
              for (let item of input[key]) {
                errors = errors.concat(phpj.services.validation.validate(item, schema[key]['type']));
              }
            } else {
              errors = errors.concat(phpj.services.validation.validate(input[key], schema[key]['type']));
            }
          } else {
            if (schema[key]['type'] === (typeof input[key])) {
              if (['number', 'string', 'boolean'].indexOf(typeof input[key]) > -1) {
                errors = errors.concat(phpj.services.validation._validateLeafNode(key, input[key], schema[key]));
              } else {
                errors.push({
                  key: key,
                  message: key + ' is not of a supported type'
                });
              }
            } else {
              if (Array.isArray(input[key])) {
                for (let item of input[key]) {
                  errors = errors.concat(phpj.services.validation._validateLeafNode(key, item, schema[key]));
                }
              } else {
                errors.push({
                  key: key,
                  message: key + ' does not match specified type.'
                });
              }
            }
          }
        }
      } else {
        if (schema[key].hasOwnProperty('required') && schema[key]['required']) {
          errors.push({
            key: key,
            message: key + ' is required.'
          });
        }
      }
    }
    return errors;
  },
  _validateLeafNode: (key, input, schema) => {

    let errors = [];

    if (schema.hasOwnProperty('minLength')) {
      if (input.length < schema['minLength']) {
        errors.push({ key: key, message: key + ' must be at least ' + schema['minLength'] + ' characters long.'});
      }
    }
    if (schema.hasOwnProperty('maxLength')) {
      if (input.length > schema['maxLength']) {
        errors.push({ key: key, message: key + ' cannot exceed ' + schema['maxLength'] + ' characters.'});
      }
    }
    if (schema.hasOwnProperty('isAlpha') && schema['isAlpha']) {
      if (!phpj.services.validation.regex.alpha.test(input)) {
        errors.push({ key: key, message: key + ' can only contain letters.' });
      }
    }
    if (schema.hasOwnProperty('isAlphaNumeric') && schema['isAlphaNumeric']) {
      if (!phpj.services.validation.regex.alphaNumeric.test(input)) {
        errors.push({ key: key, message: key + ' can only contain letters and numbers.' });
      }
    }
    if (schema.hasOwnProperty('isAlphaNumericSpaces') && schema['isAlphaNumericSpaces']) {
      if (!phpj.services.validation.regex.alphaNumericSpaces.test(input)) {
        errors.push({ key: key, message: key + ' can only contain letters, numbers and spaces.' });
      }
    }
    if (schema.hasOwnProperty('isCommonWriting') && schema['isCommonWriting']) {
      if (!phpj.services.validation.regex.commonWriting.test(input)) {
        errors.push({ key: key, message: key + ' can only contain letters, numbers, spaces and punctuation.' });
      }
    }
    if (schema.hasOwnProperty('isEmail') && schema['isEmail']) {
      if (!phpj.services.validation.regex.email.test(input)) {
        errors.push({ key: key, message: key + ' must be a valid email.' });
      }
    }
    if (schema.hasOwnProperty('isPassword') && schema['isPassword']) {
      if (!phpj.services.validation.regex.password.test(input)) {
        errors.push({ key: key, message: key + ' must contain at least one lowercase and uppercase letter, number, and special character.' });
      }
    }
    if (schema.hasOwnProperty('regex')) {
      if (!schema['regex'].test(input)) {
        errors.push({ key: key, message: key + ' does not match format.' });
      }
    }
    if (schema.hasOwnProperty('min')) {
      if (input < schema['min']) {
        errors.push({ key: key, message: key + ' must be at least ' + schema['min'] + '.'});
      }
    }
    if (schema.hasOwnProperty('max')) {
      if (input > schema['max']) {
        errors.push({ key: key, message: key + ' cannot exceed ' + schema['max'] + '.'});
      }
    }
    return errors;
  },
  _regex: {
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    alpha: /^[a-zA-Z]*$/,
    numeric: /^[0-9]*$/,
    alphaNumeric: /^[a-zA-Z0-9]*$/,
    alphaNumericSpaces: /^[a-zA-Z0-9 ]*$/,
    commonWriting: /^[A-Za-z0-9 \-_.,?!()"'/$&]*$/,
    password: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-+_!@#$%^&*.,?])/
  }
}