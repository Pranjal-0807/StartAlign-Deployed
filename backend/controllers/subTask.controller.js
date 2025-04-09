const SubTask = require('../models/subTask.model');

exports.getAllSubTasks = async (req, res) => {
    try {
        const { projectId } = req.params;
        const subTasks = await SubTask
            .find({ projectId })
            .populate()
            .exec();

        res.status(200).json(subTasks);
    }
    catch (error) {
        console.error('Error getting subtasks:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.createNewSubTask = async (req, res) => {
    try {
        const { subTaskName, assignedTo, deadline, projectId } = req.body;

        if (!subTaskName || !assignedTo || !deadline || !projectId) {
            return res.status(500).json({ message: 'Title, description, and status are required.' });
        }

        const subTask = new SubTask({ subTaskName, assignedTo, deadline, projectId });
        const newSubTask = await subTask.save();

        res.status(201).json(newSubTask);
    } catch (error) {
        console.error('Error creating subtask:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.deleteSubTask = async (req, res) => {
    try {
        const { subTaskId } = req.params
        const deletedSubTask = await SubTask.findByIdAndDelete(subTaskId);

        if (!deletedSubTask) {
            return res.status(404).json({ message: 'SubTask not found' });
        }

        res.status(200).json(deletedSubTask._id);
    } catch (error) {
        console.error('Error deleting subtask:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};