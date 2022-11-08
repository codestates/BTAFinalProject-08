const router = require("express").Router();
const { getTxHashFromTxRaw, getTxInfoFromTxHash, getTxInfoFromTxRaw } = require("../controllers/transaction");




router.post('/hash', getTxHashFromTxRaw);
router.post('/info', getTxInfoFromTxRaw);
router.get('/', getTxInfoFromTxHash);


module.exports = router;