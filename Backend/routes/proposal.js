const router = require("express").Router();
const { getProposals ,getProposalDetails,getVotingPeriodProposals} = require("../controllers/proposal");
const {getRecentBlock} = require("../controllers/block");
router.get('/', getProposals);
// router.get('/period', getVotingPeriodProposals);
router.get('/details', getProposalDetails);
module.exports = router;