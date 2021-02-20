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
$.fn.form.settings.rules.usernameAlphanumeric = (value) => {
  return validator.isAlphanumeric(value);
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
      type: 'usernameAlphanumeric',
      prompt: 'Can only contain letters'
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

// VERIFY PASSWORD RULES


$.fn.form.settings.rules.verifyPasswordMatches = (value) => {
  return value === $('.ui.form').form('get value', 'pass');
};

inputRuleSet.verifyPassword = {
  rules: [
    {
      type: 'empty',
      prompt: 'Required'
    },
    {
      type: 'verifyPasswordMatches',
      prompt: 'Password do not match'
    }
  ]
};