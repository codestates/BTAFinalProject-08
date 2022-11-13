const router = require("express").Router();
const { getDashboardData } = require("../controllers/dashboard");
router.get('/', getDashboardData);
module.exports = router;