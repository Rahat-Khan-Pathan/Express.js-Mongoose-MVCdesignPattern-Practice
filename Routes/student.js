const express = require("express");
const router = express.Router();
const studentController = require("../Controllers/student");

router.get("/get_all_students", studentController.getAllStudents);
router.get(
    "/get_student_by_roll_class/:roll/:studentClass",
    studentController.getStudentByRollAndClass
);
router.get("/get_student_by_id/:id", studentController.getStudentByID);
router.get("/get_all_students_marks", studentController.getAllStudentsMarks);
router.get(
    "/get_student_marks_by_id/:id",
    studentController.getStudentMarksByID
);
router.get(
    "/get_student_marks_by_roll_class/:paramRoll/:paramClass",
    studentController.getStudentMarksByRollandClass
);

router.delete("/delete_student_by_id/:id", studentController.deleteStudentByID);
router.delete(
    "/delete_student_by_roll_class/:roll/:studentClass",
    studentController.deleteStudentByRollAndClass
);

router.post("/add_student", studentController.addStudent);
router.post("/add_marks", studentController.addMarks);

module.exports = router;
