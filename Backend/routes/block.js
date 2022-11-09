const router = require("express").Router();
const {
    getRecentBlock, getBlock, getBlockDetailsFromHeight
} = require("../controllers/block");

router.get('/details', getBlockDetailsFromHeight);
router.get('/recent', getRecentBlock);
router.get('/', getBlock);





module.exports = router;