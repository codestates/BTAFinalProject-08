const { loadValidatorDetails, loadValidatorsInfo } = require("../modules/parseValidatorInfo");

module.exports = {
    getValidators: async (req, res) => {
        try {
            const validators = await loadValidatorsInfo();
            res.status(200).json(validators);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },
    getValidatorDetails: async (req, res) => {
        try {
            const operatorAddress = req.query.operatorAddress;
            let blockLimit = Number(req.query.blockLimit);
            if (blockLimit > 20 || blockLimit < 1) blockLimit = 1;
            const validatorDetails = await loadValidatorDetails(operatorAddress, blockLimit);
            res.status(200).json(validatorDetails);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
}
