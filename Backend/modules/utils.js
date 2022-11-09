const { sha256 } = require("@cosmjs/crypto");
const { Bech32, fromBase64, toHex } = require("@cosmjs/encoding");
const { encodeBech32Pubkey, decodeBech32Pubkey } = require("@cosmjs/launchpad");


const Cothi = Object.freeze({
    pubKey: "hSx2cwvzoi3dhRDnOpTZO6icB0ZImX+T5kZHWLSmD9U=",
    operatorAddress: "osmovaloper1w6k4anx2juthw8ka0zyxej26wvdlccwq09x0c6",
    address: "osmo1w6k4anx2juthw8ka0zyxej26wvdlccwq4jwv0a",
    hex: "FBA3AEF9CB504C662AED5C677EEF0C810E5BEEEE"
});

const Calvin = Object.freeze({
    pubKey: "/3802T/tAnDPqNbyNHQQLhMDM0dZDZ1yWFCEesAcM6Q=",
    operatorAddress: "osmovaloper1erhzfvsfhue4tz6cz9czrgucecxp3uddf3dds4",
    address: "osmo1erhzfvsfhue4tz6cz9czrgucecxp3uddnx9w8j",
    hex: "433AFC12BFA4E7A537629EB9580F8EA7ADE23FDC"
});

const CodemonkeyShin = Object.freeze({
    pubKey: "cVTM6Vw4f2uSpQKQNCyf5Fmj6N76E19MbbEVUtQPcT0=",
    operatorAddress: "osmovaloper1mhfgfenrp88d2p5dttyw59x8frfk7u9lujg49y",
    address: "osmo1mhfgfenrp88d2p5dttyw59x8frfk7u9lx9qkjr",
    hex: "5BDA2D761F5CE86F586870477937D42847F12F11"
});

const MonikerToAddressInfo = Object.freeze({
    calvin: Calvin,
    cothi: Cothi,
    codemonkeyshin: CodemonkeyShin
});

const HexAddressToMoniker = Object.freeze({
    "5BDA2D761F5CE86F586870477937D42847F12F11": "codemonkeyshin",
    "FBA3AEF9CB504C662AED5C677EEF0C810E5BEEEE": "cothi",
    "433AFC12BFA4E7A537629EB9580F8EA7ADE23FDC": "calvin",
});

const getAddressFromPubKey = (pubKeyEd25519) => {
    if (pubKeyEd25519 && pubKeyEd25519.type === "tendermint/PubKeyEd25519" && pubKeyEd25519.value) {
        const addressData = sha256(fromBase64(pubKeyEd25519.value)).slice(0, 20);
        const address = toHex(addressData).toUpperCase();
        return address;
    }
    return "";
}

const TxTypes = Object.freeze({
    SEND: "Send",
    CREATE_VALIDATOR: "CreateValidator",
    DELEGATE: "Delegate",
    WITHDRAW_DELEGATOR_REWARD: "WithdrawDelegationReward",
});

module.exports = { getAddressFromPubKey, MonikerToAddressInfo, TxTypes, HexAddressToMoniker };
