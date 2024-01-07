const Student = require("../Models/student");

const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getStudentByRollAndClass = async (req, res) => {
    try {
        const { roll, studentClass } = req.params;
        const student = await Student.findOne({ roll, class: studentClass });
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getStudentByID = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findOne({ _id: id });
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addStudent = async (req, res) => {
    try {
        const newStudent = await Student.create(req.body);
        res.status(200).json({
            message: "Student created successfully!",
            student: newStudent,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateStudentByID = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedStudent = await Student.findOneAndUpdate(
            { _id: id },
            { ...updateData, updatedDate: Date.now() },
            {
                new: true,
                runValidators: true,
            }
        );
        if (updatedStudent) {
            res.status(200).json({
                message: "Student updated successfully!",
                updatedStudent: updatedStudent,
            });
        } else {
            res.status(404).json({ message: "Student not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const deleteStudentByRollAndClass = async (req, res) => {
    try {
        const { roll, studentClass } = req.params;
        const deletedStudent = await Student.findOneAndDelete({
            roll,
            class: studentClass,
        });

        if (deletedStudent) {
            res.status(200).json({
                message: "Student deleted successfully!",
                deletedStudent: deletedStudent,
            });
        } else {
            res.status(404).json({ message: "Student not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const deleteStudentByID = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedStudent = await Student.findOneAndDelete({ _id: id });

        if (deletedStudent) {
            res.status(200).json({
                message: "Student deleted successfully!",
                deletedStudent: deletedStudent,
            });
        } else {
            res.status(404).json({ message: "Student not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllStudents,
    addStudent,
    getStudentByRollAndClass,
    updateStudentByID,
    getStudentByID,
    deleteStudentByRollAndClass,
    deleteStudentByID,
};
