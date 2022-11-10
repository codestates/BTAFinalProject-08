const router = require("express").Router();
const { getRecentTransaction,getTransaction,getTransactionFromHeight,getTransactionsFromAddress} = require("../controllers/transaction");



router.get('/', getTransaction);
router.get('/recent', getRecentTransaction);
router.get('/transactions', getTransactionFromHeight);
router.get('/address/:address', getTransactionsFromAddress);


module.exports = router;