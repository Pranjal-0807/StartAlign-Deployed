const Project = require('../models/project.model');
const User = require('../models/user.model');

exports.getAllProjects = async (req, res) => {
    try {
        let projects;
        if (req.user.role === 'Admin') {
            projects = await Project.find();
        }
        else {
            projects = await Project.find({ members: req.user.id });
        }
        res.status(200).json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.createNewProject = async (req, res) => {
    try {
        const { title, description, status, priority, due_date } = req.body;

        if (!title || !description || !status) {
            return res.status(500).json({ message: 'Title, description, and status are required.' });
        }

        const project = new Project({ title, description, status, priority, due_date });
        const newProject = await project.save();

        res.status(201).json(newProject);
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.projectId);

        if (!deletedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.status(200).json(deletedProject._id);
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.addMembersToProject = async (req, res) => {
    const { projectId } = req.params;
    const { userIds } = req.body;

    if (!projectId || !Array.isArray(userIds)) {
        return res.status(400).json({ message: 'Project ID and an array of User IDs are required' });
    }

    try {
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const validUsers = await User.find({ _id: { $in: userIds } });
        const validUserIds = validUsers.map(u => u._id.toString());

        const newMembers = validUserIds.filter(uid => !project.members.includes(uid));

        project.members.push(...newMembers);
        await project.save();

        res.status(200).json({
            message: `${newMembers.length} user(s) added to project ${projectId}`,
            addedUsers: newMembers
        });
    } catch (error) {
        console.error('Error adding members:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
