const router = require('express').Router();

const { sendMessage, getMessageById } = require('../controllers/message.controller');

router.post('/send/:id', sendMessage);
router.get('/:id', getMessageById);

module.exports = router;
