const router = require("express").Router();
const { getRecentTransaction, getTransactionFromHash, getTransactionsFromAddress } = require("../controllers/transaction");
router.get('/details', getTransactionFromHash);
router.get('/recent', getRecentTransaction);
router.get('/address/:address', getTransactionsFromAddress);
module.exports = router;