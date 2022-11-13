const router = require("express").Router();
const { getProposals ,getProposalDetails} = require("../controllers/proposal");
router.get('/', getProposals);
router.get('/details', getProposalDetails);
module.exports = router;