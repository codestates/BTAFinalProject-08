const router = require("express").Router();
const { getTxHashFromTxRaw, getTxInfoFromTxHash, getTxInfoFromTxRaw, getRecentTransaction,getTransaction} = require("../controllers/transaction");
const {getRecentBlock} = require("../controllers/block");




router.post('/hash', getTxHashFromTxRaw);
router.post('/info', getTxInfoFromTxRaw);
router.get('/', getTransaction);
router.get('/recent', getRecentTransaction);


module.exports = router;