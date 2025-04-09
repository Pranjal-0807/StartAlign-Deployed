const router = require('express').Router();

const { getAllSubTasks, createNewSubTask, deleteSubTask } = require('../controllers/subTask.controller');

router.get('/:projectId', getAllSubTasks);

router.post('/', createNewSubTask);

router.delete('/:subTaskId', deleteSubTask);

module.exports = router;