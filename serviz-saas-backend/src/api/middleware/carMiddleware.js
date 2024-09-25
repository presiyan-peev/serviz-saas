const { body, validationResult } = require("express-validator");

const carValidationRules = [
  body("make").notEmpty().withMessage("Make is required"),
  body("model").notEmpty().withMessage("Model is required"),
  body("year")
    .isInt({ min: 1900, max: new Date().getFullYear() + 1 })
    .withMessage("Invalid year"),
  body("vin")
    .isLength({ min: 17, max: 17 })
    .withMessage("VIN must be 17 characters long"),
  body("licensePlate").optional(),
  body("power").optional(),
  body("fuel").optional(),
  body("cubicCapacity")
    .optional()
    .isFloat()
    .withMessage("Cubic capacity must be a number"),
  body("customerId").optional().isUUID().withMessage("Invalid customer ID"),
  body("tenantId")
    .optional()
    .isUUID()
    .withMessage("Invalid tenant ID")
    .custom((value, { req }) => {
      if (req.user.role !== "admin" && value !== req.user.tenantId) {
        throw new Error("Invalid tenant ID for non-admin user");
      }
      return true;
    }),
];

exports.validateCarInput = [
  ...carValidationRules,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.validateBulkCarInput = [
  body("items").isArray().withMessage("Cars must be an array"),
  body("items.*").custom((value, { req }) => {
    if (req.user.role === "admin" && !value.tenantId) {
      throw new Error("TenantId is required for admin users");
    }
    if (
      req.user.role !== "admin" &&
      value.tenantId &&
      value.tenantId !== req.user.tenantId
    ) {
      throw new Error("Invalid tenant ID for non-admin user");
    }
    return true;
  }),
  body("items.*.make").notEmpty().withMessage("Make is required"),
  body("items.*.model").notEmpty().withMessage("Model is required"),
  body("items.*.year")
    .isInt({ min: 1900, max: new Date().getFullYear() + 1 })
    .withMessage("Invalid year"),
  body("items.*.vin")
    .isLength({ min: 17, max: 17 })
    .withMessage("VIN must be 17 characters long"),
  body("items.*.licensePlate").optional(),
  body("items.*.power").optional(),
  body("items.*.fuel").optional(),
  body("items.*.cubicCapacity")
    .optional()
    .isFloat()
    .withMessage("Cubic capacity must be a number"),
  body("items.*.customerId")
    .optional()
    .isUUID()
    .withMessage("Invalid customer ID"),
  body("items.*.tenantId").optional().isUUID().withMessage("Invalid tenant ID"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.validateCarUpdateInput = [
  body("make").optional().notEmpty().withMessage("Make cannot be empty"),
  body("model").optional().notEmpty().withMessage("Model cannot be empty"),
  body("year")
    .optional()
    .isInt({ min: 1900, max: new Date().getFullYear() + 1 })
    .withMessage("Invalid year"),
  body("vin")
    .optional()
    .isLength({ min: 17, max: 17 })
    .withMessage("VIN must be 17 characters long"),
  body("licensePlate").optional(),
  body("power").optional(),
  body("fuel").optional(),
  body("cubicCapacity")
    .optional()
    .isFloat()
    .withMessage("Cubic capacity must be a number"),
  body("customerId").optional().isUUID().withMessage("Invalid customer ID"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
