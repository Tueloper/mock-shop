"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = exports.isValidInput = exports.inValidPassword = exports.inValidEmail = exports.inValidName = exports.magicTrimmer = void 0;

/**
 *
 * @description magicTrimmer removes leading and trailing spaces from a string
 *
 */
const magicTrimmer = payload => {
  const data = {};

  if (payload) {
    Object.keys(payload).forEach(key => {
      const value = payload[key];
      Object.assign(data, {
        [key]: value.trim()
      });
    });
    payload = data;
  }

  return payload;
};
/**
 *
 * @description inValidName is function which validates a name
 *
 * @param {name} name is the eniity you want to validate
 *
 * @param {value} value is the data yur want to validate
 *
 * @returns {boolean} return true or false
 */


exports.magicTrimmer = magicTrimmer;

const inValidName = (name, value) => {
  if (!value) return `${name} is required`;
  if (!/^[A-Z][a-z]+\s([A-Z][a-z]+\s)?[A-Z][a-z]+$/.test(value)) return `${name} is not valid`;
  return null;
};
/**
 * @description inValidEmail is a function that validates an email
 *
 * @param {email} email is the data you want to verify if its a valid email
 *
 * @returns {string} string is type of data thr function returns
 */


exports.inValidName = inValidName;

const inValidEmail = email => {
  if (!email) return 'email is required';
  email = email.toLowerCase();
  if (!/^[A-Za-z0-9.-_]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(email)) return 'email is not valid';
  return null;
};
/**
 *
 * @description inValidPassword is a function that validates a password
 *
 * @param {password} password is the data you want to validate whether it is alphanumeric
 *
 * @returns {string} string is the type of data the function returns
 */


exports.inValidEmail = inValidEmail;

const inValidPassword = password => {
  if (!password) return 'password is required';
  if (password.length < 8) return 'password should be at least eight characters';

  if (!password.match(/[a-z]/g) && !password.match(/[A-Z]/g) && !password.match(/[0-9]/g) && !password.match(/[^a-zA-Z\d]/g)) {
    return 'password should contain at least one Uppercase letter, one lowercase letter, and at least one digit';
  }

  return null;
};

exports.inValidPassword = inValidPassword;

const isValidInput = text => {
  if (!text) return 'Input invalid, field cannot be empty';
  if (!/^.{2,100}$/.test(text)) return 'Name should be minimum of 3 characters and maximum of 100';
};

exports.isValidInput = isValidInput;

const validate = obj => {
  const result = {};
  Object.keys(obj).forEach(key => {
    if (obj[key]) {
      result[key] = obj[key];
    }
  });

  if (Object.keys(result).length) {
    return result;
  }

  return null;
};

exports.validate = validate;