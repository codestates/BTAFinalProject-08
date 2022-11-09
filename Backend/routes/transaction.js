const router = require("express").Router();
const { getRecentTransaction,getTransaction} = require("../controllers/transaction");



router.get('/', getTransaction);
router.get('/recent', getRecentTransaction);


module.exports = router;