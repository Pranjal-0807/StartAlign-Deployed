const router = require('express').Router();

const { authRole } = require('../middlewares/auth.middleware');

const { getAllProjects, createNewProject, deleteProject, addMembersToProject } = require('../controllers/project.controller');

router.get('/', getAllProjects);

router.post('/', authRole('Admin'), createNewProject);

router.delete('/:projectId', authRole('Admin'), deleteProject);

router.post('/addMembers/:projectId', authRole('Admin', 'Manager'), addMembersToProject);

module.exports = router;
