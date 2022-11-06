const router = require("express").Router();
const {
    getBlockHeight,
    getBlockInfoFromHeight,
    getRecentBlock
} = require("../controllers/block");


router.get('/', getBlockInfoFromHeight);
router.get('/blockHeight', getBlockHeight);
router.get('/recent', getRecentBlock);





module.exports = router;