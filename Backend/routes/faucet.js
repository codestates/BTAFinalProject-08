const router = require("express").Router();
const { get1Osmo } = require("../controllers/faucet");
router.post('/', get1Osmo); // faucet 기능
module.exports = router;