const router = require('express').Router();

const { getAllConversation, createPrivateConversation } = require('../controllers/conversation.controller');


router.post('/new', createPrivateConversation);
router.get('/:userId', getAllConversation);

module.exports = router;
