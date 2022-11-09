const router = require("express").Router();
const {
    getRecentBlock, getBlock
} = require("../controllers/block");

router.get('/recent', getRecentBlock);
router.get('/', getBlock);





module.exports = router;