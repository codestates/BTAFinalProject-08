const router = require("express").Router();
const { getAccountDetails } = require("../controllers/account");

router.get('/details/:address', getAccountDetails);
module.exports = router;