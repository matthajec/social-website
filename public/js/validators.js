let inputRuleSet = {};

// set rules to an empty object
$.fn.form.settings.rules = {};

// GENERAL RULES
// ===============================================================================


$.fn.form.settings.rules.empty = (value) => {
  return !validator.isEmpty(value);
};


// EMAIL RULES
// ===============================================================================

$.fn.form.settings.rules.email = (value) => {
  return validator.isEmail(value);
};

inputRuleSet.email = {
  rules: [
    {
      type: 'empty',
      prompt: 'Required'
    },
    {
      type: 'email',
      prompt: 'Please use a real email'
    }
  ]
};

// USERNAME RULES
// ===============================================================================

// enforces a username format
$.fn.form.settings.rules.usernameFormat = (value) => {
  // regex prevents a preceding or trailing '.', prevents multiple '.' in a row, only allows for '_', 'a'-'Z', '0'-'9', and '.', and requires a character [a-z]
  return validator.matches(value, /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]*[a-z]/ig);
};

// sets a minimum length for the username at 3 characters
$.fn.form.settings.rules.usernameMinLength = (value) => {
  return validator.isLength(value, { min: 3 });
};

// sets a maximum length for the username at 30 characters
$.fn.form.settings.rules.usernameMaxLength = (value) => {
  return validator.isLength(value, { max: 30 });
};

inputRuleSet.username = {
  rules: [
    {
      type: 'empty',
      prompt: 'Required'
    },
    {
      type: 'usernameMinLength',
      prompt: 'Can\'t be shorter than 3 characters'
    },
    {
      type: 'usernameMaxLength',
      prompt: 'Can\'t be longer than 30 characters'
    },
    {
      type: 'usernameFormat',
      prompt: 'Impropper format'
    },
  ]
};

// LEGAL NAME RULES
// ===============================================================================

$.fn.form.settings.rules.legalNameIsAlpha = (value) => {
  return validator.isAlpha(value);
};

$.fn.form.settings.rules.legalNameMaxLength = (value) => {
  return validator.isLength(value, { max: 30 });
};

inputRuleSet.legalName = {
  rules: [
    {
      type: 'empty',
      prompt: 'Required'
    },
    {
      type: 'legalNameMaxLength',
      prompt: 'Can\'t be longer than 30 characters'
    },
    {
      type: 'legalNameIsAlpha',
      prompt: 'Can only contain letters'
    }
  ]
};

// PASSWORD RULES
// ===============================================================================

$.fn.form.settings.rules.passwordMinLength = (value) => {
  return validator.isLength(value, { min: 8 });
};

$.fn.form.settings.rules.passwordStrong = (value) => {
  return validator.isStrongPassword(value);
};



inputRuleSet.password = {
  rules: [
    {
      type: 'empty',
      prompt: 'Required'
    },
    {
      type: 'passwordMinLength',
      prompt: 'Can\'t be shorter than 8 characters'
    }
  ]
};