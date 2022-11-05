const router = require("express").Router();
const {
    getBlockHeight,
    getBlockInfoFromHeight
} = require("../controllers/block");


router.get('/', getBlockInfoFromHeight);
router.get('/blockHeight', getBlockHeight);





module.exports = router;