const { body, validationResult } = require("express-validator");

exports.validateCustomerInput = [
  body("name").isLength({ min: 2 }).trim().escape(),
  body("email").isEmail().normalizeEmail(),
  body("phone").optional().isMobilePhone(),
  body("facebook").optional().isURL(),
  body("notes").optional().trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      throw new Error("Validation failed", { cause: 400 });
    }
    next();
  },
];
