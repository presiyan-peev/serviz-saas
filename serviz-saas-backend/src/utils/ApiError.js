class ApiError extends Error {
  constructor(message, options) {
    super(message, options);
    this.internalCode = options.internalCode;
  }
}

exports.ApiError = ApiError;
