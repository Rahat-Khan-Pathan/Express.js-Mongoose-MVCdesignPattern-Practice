const Marks = require("../Models/marks");
const Student = require("../Models/student");
const StudentController = require("../Controllers/student");

const addMarks = async (req, res) => {
    try {
        const { studentRef, studentClass, studentRoll } = req.body;
        const studentData = await StudentController.getStudentByIDInternal(
            studentRef
        );
        if (studentData.student) {
            const { student } = studentData;
            if (
                student.roll !== studentRoll ||
                student.class !== studentClass
            ) {
                res.status(500).json({
                    error: "Student class and roll didn't match!",
                });
            } else {
                const newMarks = await Marks.create(req.body);
                student.marksRef.push(newMarks._id);
                await student.save();
                res.status(200).json({
                    message: "Marks added successfully!",
                    marks: newMarks,
                    message2: "Student updated successfully",
                    updatedStudent: student,
                });
            }
        } else {
            res.status(500).json({ error: "Student not found!" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteMarksByID = async (req, res) => {
    try {
        const { id } = req.params;
        const marks = await Marks.findOneAndDelete({ _id: id });
        if (marks) {
            const student = await Student.findOne({ _id: marks.studentRef });
            if (student) {
                const index = student.marksRef.indexOf(id);
                if (index !== -1) {
                    student.marksRef.splice(index, 1);
                }
                await student.save();
                res.status(200).json({
                    message: "Marks deleted successfully!",
                    marks: marks,
                    message2: "Student updated successfully",
                    updatedStudent: student,
                });
            } else {
                res.status(500).json({
                    error: "Student not found and could not remove marksRef",
                });
            }
        } else {
            res.status(500).json({ error: "Marks not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addMarks,
    deleteMarksByID,
};
