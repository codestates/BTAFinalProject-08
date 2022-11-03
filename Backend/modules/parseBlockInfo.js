export const parseBlock = (data) => {
    const blockInfo = JSON.parse(data);
    if (!blockInfo.result) return {};
    const {result: {block: {header: {chain_id: chainId, height, time, last_block_id: {hash}, proposer_address: proposerAddress}, data: {txs}, last_commit: {round}}}} = blockInfo;
    const res = {
        chainId,
        height,
        time,
        hash,
        numOfTx: txs.length,
        round,
        proposerAddress,
        txs
    }
    return res;
}

export const parseBlockFromSub = (data) => {
    const blockInfo = JSON.parse(data);
    if (!blockInfo.result.data) return {};
    const { result: { data: { value: { block: { header: { chain_id: chainId, height, time, proposer_address: proposerAddress, last_block_id: { hash } }, data: { txs }, last_commit: { round } } } } } } = blockInfo;
    const res = {
        chainId,
        height,
        time,
        hash,
        numOfTx: txs.length,
        round,
        proposerAddress,
        txs
    }
    return res;
}