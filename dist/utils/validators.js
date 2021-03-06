"use strict";

module.exports.validateRegisterInput = function (username, email, password, confirmPassword) {
  var errors = {};

  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }

  if (email.trim() === "") {
    errors.username = "email must not be empty";
  } else {
    var regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

    if (!email.match(regEx)) {
      errors.email = "Email must be a valid email address";
    }
  }

  if (password === "" || password.length < 6) {
    errors.password = "The password must be at least 6 characters long";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }

  return {
    errors: errors,
    valid: Object.keys(errors).length < 1
  };
};

module.exports.validateLoginInput = function (username, password) {
  var errors = {};

  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }

  if (password === "" || password.length < 6) {
    errors.password = "The password must be at least 6 characters long";
  }

  return {
    errors: errors,
    valid: Object.keys(errors).length < 1
  };
};