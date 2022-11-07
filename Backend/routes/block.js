const router = require("express").Router();
const {
    getBlockHeight,
    getBlockInfoFromHeight,
    getRecentBlock, getBlock
} = require("../controllers/block");


router.get('/', getBlockInfoFromHeight);
router.get('/blockHeight', getBlockHeight);
router.get('/recent', getRecentBlock);
router.get('/height', getBlock); /// 임시로 이렇게 씁시다...





module.exports = router;