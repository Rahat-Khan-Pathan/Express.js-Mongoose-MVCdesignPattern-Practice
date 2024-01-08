const Student = require("../Models/student");

const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(500).json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllStudentsMarks = async (req, res) => {
    try {
        const students = await Student.find();
        for (let i = 0; i < students.length; i++) {
            const studentData = students[i];
            const { fullName, class: studentClass, roll } = studentData;
            const aggregatedMarks = studentData.marksArray.reduce(
                (result, mark) => {
                    const { term, subject, marks } = mark;
                    if (!result[term]) {
                        result[term] = {};
                    }
                    result[term][subject] = marks;
                    return result;
                },
                {}
            );
            const allSubjects = ["Bangla", "English", "Math"];
            const transformedMarks = {};
            const allTerms = ["First", "Second", "Final"];
            allTerms.forEach((term) => {
                transformedMarks[term] = {};
                allSubjects.forEach((subject) => {
                    transformedMarks[term][subject] =
                        aggregatedMarks[term]?.[subject] || "Not added";
                });
            });
            const transformedStudentData = {
                fullName,
                class: studentClass,
                roll,
                marks: transformedMarks,
                createdDate: studentData.createdDate,
                updatedDate: studentData.updatedDate,
            };
            students[i] = transformedStudentData;
        }
        res.status(500).json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getStudentMarksByID = async (req, res) => {
    try {
        const { id } = req.params;
        const studentData = await Student.findOne({ _id: id });
        const { fullName, class: studentClass, roll } = studentData;
        const aggregatedMarks = studentData.marksArray.reduce(
            (result, mark) => {
                const { term, subject, marks } = mark;
                if (!result[term]) {
                    result[term] = {};
                }
                result[term][subject] = marks;
                return result;
            },
            {}
        );
        const allSubjects = ["Bangla", "English", "Math"];
        const transformedMarks = {};
        const allTerms = ["First", "Second", "Final"];
        allTerms.forEach((term) => {
            transformedMarks[term] = {};
            allSubjects.forEach((subject) => {
                transformedMarks[term][subject] =
                    aggregatedMarks[term]?.[subject] || "Not added";
            });
        });
        const transformedStudentData = {
            fullName,
            class: studentClass,
            roll,
            marks: transformedMarks,
            createdDate: studentData.createdDate,
            updatedDate: studentData.updatedDate,
        };
        res.status(500).json(transformedStudentData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getStudentMarksByRollandClass = async (req, res) => {
    try {
        const { paramRoll, paramClass } = req.params;
        const studentData = await Student.findOne({
            roll: paramRoll,
            class: paramClass,
        });
        const { fullName, class: studentClass, roll } = studentData;
        const aggregatedMarks = studentData.marksArray.reduce(
            (result, mark) => {
                const { term, subject, marks } = mark;
                if (!result[term]) {
                    result[term] = {};
                }
                result[term][subject] = marks;
                return result;
            },
            {}
        );
        const allSubjects = ["Bangla", "English", "Math"];
        const transformedMarks = {};
        const allTerms = ["First", "Second", "Final"];
        allTerms.forEach((term) => {
            transformedMarks[term] = {};
            allSubjects.forEach((subject) => {
                transformedMarks[term][subject] =
                    aggregatedMarks[term]?.[subject] || "Not added";
            });
        });
        const transformedStudentData = {
            fullName,
            class: studentClass,
            roll,
            marks: transformedMarks,
            createdDate: studentData.createdDate,
            updatedDate: studentData.updatedDate,
        };
        res.status(500).json(transformedStudentData);
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

const getStudentByIDInternal = async (studentRef) => {
    try {
        const student = await Student.findOne({ _id: studentRef });
        return { student, error: null };
    } catch (error) {
        return { student: null, error };
    }
};
const getStudentByRollandClassInternal = async (studentRoll, studentClass) => {
    try {
        const student = await Student.findOne({
            roll: studentRoll,
            class: studentClass,
        });
        return { student, error: null };
    } catch (error) {
        return { student: null, error };
    }
};

const addStudent = async (req, res) => {
    try {
        const { student: duplicateStudent } =
            await getStudentByRollandClassInternal(
                req.body.roll,
                req.body.class
            );
        if (duplicateStudent) {
            res.status(500).json({
                error: "Duplicate student with same roll and class",
            });
        } else {
            const newStudent = await Student.create(req.body);
            res.status(200).json({
                message: "Student created successfully!",
                student: newStudent,
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addMarks = async (req, res) => {
    try {
        const data = req.body;
        if (typeof data.roll === "number" && typeof data.class === "number") {
            const { student } = await getStudentByRollandClassInternal(
                req.body.roll,
                req.body.class
            );
            if (student) {
                let found = false;
                for (let i = 0; i < student.marksArray.length; i++) {
                    if (
                        student.marksArray[i].term === data.term &&
                        student.marksArray[i].subject === data.subject
                    ) {
                        found = true;
                        break;
                    }
                }
                if (found) {
                    res.status(500).json({
                        error: "Student marks duplicated with same term and subject!",
                    });
                } else {
                    student.marksArray.push(data);
                    student.updatedDate = Date.now();
                    await student.save();
                    res.status(200).json({
                        message: "Marks added successfully!",
                        student: student,
                    });
                }
            } else {
                res.status(500).json({
                    error: "Student not found!",
                });
            }
        } else {
            res.status(500).json({
                error: "Invalid type of roll and class",
            });
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
    getStudentByID,
    deleteStudentByRollAndClass,
    deleteStudentByID,
    getStudentByIDInternal,
    getStudentByRollandClassInternal,
    addMarks,
    getAllStudentsMarks,
    getStudentMarksByID,
    getStudentMarksByRollandClass,
};
