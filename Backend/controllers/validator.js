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
            const validatorDetails = await loadValidatorDetails(operatorAddress);
            res.status(200).json(validatorDetails);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
}
