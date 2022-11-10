const router = require("express").Router();
const { getValidators, getValidatorDetails } = require("../controllers/validator");
router.get('/validators', getValidators);
router.get('/details', getValidatorDetails);
module.exports = router;
