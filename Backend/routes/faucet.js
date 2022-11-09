const router = require("express").Router();
const { getOsmo} = require("../controllers/faucet");
router.post('/', getOsmo); // faucet 기능
module.exports = router;