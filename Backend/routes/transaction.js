import express from "express";
import {getTxHashFromTxRaw, getTxInfoFromTxHash, getTxInfoFromTxRaw} from "../controllers/transaction.js";

const router = express.Router();


router.post('/hash', getTxHashFromTxRaw);
router.post('/info', getTxInfoFromTxRaw);
router.get('/', getTxInfoFromTxHash);



export default router;