const router = require("express").Router();
const {
    getRecentBlock, getBlockDetailsFromHeight
} = require("../controllers/block");
const {test} = require("../controllers/proposal");
router.get('/recent', getRecentBlock);
router.get('/details', getBlockDetailsFromHeight);
module.exports = router;