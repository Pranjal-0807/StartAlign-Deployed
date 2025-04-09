const Project = require('../models/project.model');

exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
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
