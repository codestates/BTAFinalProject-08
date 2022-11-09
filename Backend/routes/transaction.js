const router = require("express").Router();
const { getTxHashFromTxRaw, getTxInfoFromTxHash, getTxInfoFromTxRaw, getTxDetailsFromTxHash } = require("../controllers/transaction");




router.get('/details', getTxDetailsFromTxHash);
router.post('/hash', getTxHashFromTxRaw);
router.post('/info', getTxInfoFromTxRaw);
router.get('/', getTxInfoFromTxHash);


module.exports = router;