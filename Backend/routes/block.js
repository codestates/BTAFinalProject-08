import express from "express";
import {
    getBlockHeight,
    getBlockInfoFromHeight
} from '../controllers/block.js';
const router = express.Router();


router.get('/', getBlockInfoFromHeight);
router.get('/blockHeight', getBlockHeight);






export default router;