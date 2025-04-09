const router = require('express').Router();

const { getAllProjects, createNewProject, deleteProject } = require('../controllers/project.controller');

router.get('/', getAllProjects);

router.post('/', createNewProject);

router.delete('/:projectId', deleteProject);

module.exports = router;