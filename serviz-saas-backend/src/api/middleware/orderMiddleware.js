const { body, validationResult } = require("express-validator");

exports.validateOrderInput = [
  body("orderNumber").notEmpty().withMessage("Order number is required"),
  body("value")
    .isFloat({ min: 0 })
    .withMessage("Value must be a positive number"),
  body("notes").optional().isString().withMessage("Notes must be a string"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.validateOrderUpdate = [
  body("orderNumber")
    .optional()
    .notEmpty()
    .withMessage("Order number cannot be empty"),
  body("value")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Value must be a positive number"),
  body("notes").optional().isString().withMessage("Notes must be a string"),
  (req, res, next) => {
    console.log("in validateOrderUpdate");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
