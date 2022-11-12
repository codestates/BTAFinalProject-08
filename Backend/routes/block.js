const router = require("express").Router();
const {
    getRecentBlock, getBlockDetailsFromHeight
} = require("../controllers/block");
router.get('/recent', getRecentBlock);
router.get('/details', getBlockDetailsFromHeight);
module.exports = router;