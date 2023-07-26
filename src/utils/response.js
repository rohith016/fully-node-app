// utils/response.js

const successResponse = (message, data, statusCode = 200) => {
    return {
      status: 'success',
      statusCode: statusCode,
      message: message,
      data: data,
    };
  }
  
const errorResponse = (message, errors, statusCode = 400) => {
    return {
      status: 'error',
      statusCode: statusCode,
      message: message,
      errors: errors,
    };
}
  
module.exports = {
    successResponse,
    errorResponse,
};
  