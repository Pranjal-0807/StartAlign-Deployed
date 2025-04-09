const router = require('express').Router();
const { authRole } = require('../middlewares/auth.middleware');

const { getAllSubTasks, createNewSubTask, deleteSubTask } = require('../controllers/subTask.controller');

router.get('/:projectId', getAllSubTasks);

router.post('/', authRole('Manager'), createNewSubTask);

router.delete('/:subTaskId', authRole('Manager'), deleteSubTask);

module.exports = router;
