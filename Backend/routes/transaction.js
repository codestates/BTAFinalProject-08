const router = require("express").Router();
const { getTxHashFromTxRaw, getTxInfoFromTxHash, getTxInfoFromTxRaw, getTxDetailsFromTxHash, getRecentTxs } = require("../controllers/transaction");




router.get('/recent', getRecentTxs);
router.get('/details', getTxDetailsFromTxHash);
router.post('/hash', getTxHashFromTxRaw);
router.post('/info', getTxInfoFromTxRaw);
router.get('/', getTxInfoFromTxHash);


module.exports = router;