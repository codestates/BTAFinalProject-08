import {decodeTxRaw} from '@cosmjs/proto-signing';
import {SigningStargateClient, StargateClient} from'@cosmjs/stargate';
import { toHex} from "@cosmjs/encoding";
import { sha256 }from "@cosmjs/crypto";
import "dotenv/config"

const endPoint = process.env.END_POINT // 노드 주소
const signingClient = await SigningStargateClient.connect(endPoint)


export const getTxHashFromTxRaw = async (req, res) => { // txRaw로부터 해당 트랜잭션 해쉬 리턴
    try {
        let {txRaw} = req.body;
        console.log(txRaw)
        const txHash_signing = toHex(sha256(Buffer.from(txRaw,'base64')));
        res.status(200).json(txHash_signing);
    } catch(err) {
        res.status(400).json({message: err.message});
    }
}

export const getTxInfoFromTxRaw = async (req, res) => { // txRaw로부터 해당 트랜잭션 정보 리턴
    try {
        let {txRaw} = req.body;
        const txInfo_signing = decodeTxRaw(txRaw) ;
        res.status(200).json(txInfo_signing);
    } catch(err) {
        res.status(400).json({message: err.message});
    }
}

export const getTxInfoFromTxHash = async (req, res) => { // txHash로부터 해당 트랜잭션 정보 리턴
    try {
        let txHash = req.query.txhash;
        const tx_fromHash_signing = await signingClient.getTx(txHash)
        res.status(200).json(tx_fromHash_signing);
    } catch(err) {
        res.status(400).json({message: err.message});
    }
}