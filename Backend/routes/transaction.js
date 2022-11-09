const router = require("express").Router();
const { getRecentTransaction,getTransaction,getTransactionFromHeight} = require("../controllers/transaction");



router.get('/', getTransaction);
router.get('/recent', getRecentTransaction);
router.get('/transactions', getTransactionFromHeight);


module.exports = router;