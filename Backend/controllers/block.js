import {osmosis, getSigningOsmosisClient, cosmos} from "osmojs";
import {SigningStargateClient, StargateClient} from'@cosmjs/stargate';
import axios from 'axios'
import "dotenv/config"
import { extractBlockInfo } from "../modules/parseBlockInfo.js";


const endPoint = process.env.END_POINT // 노드 주소
const {createRPCQueryClient} = osmosis.ClientFactory;
const rpcClient = await createRPCQueryClient({rpcEndpoint: endPoint});
const signingClient = await SigningStargateClient.connect(endPoint);
const tendermintClient = await StargateClient.connect(endPoint);


export const getBlockHeight = async (req, res) => { // 블록 높이 리턴
    try {
        const height_signing = await signingClient.getHeight();
        res.status(200).json(height_signing);
    } catch(err) {
        res.status(400).json({message: err.message});
    }
}

export const getBlockInfoFromHeight = async (req, res) => { //  해당 height 의 블록 정보 리턴
    try {
        const height = Number(req.query.height);
        // console.log(typeof height);
        const block = await axios.get(process.env.END_POINT + "block?height=" + height);
        const extractedBlock = await extractBlockInfo(block.data);
        if (!extractedBlock) "Parsed block is null!";
        // console.log(parsedBlock);
        // const block_signing = await signingClient.getBlock(height);
        res.status(200).json(extractedBlock);
    } catch(err) {
        res.status(400).json({message: err.message});
    }
}

