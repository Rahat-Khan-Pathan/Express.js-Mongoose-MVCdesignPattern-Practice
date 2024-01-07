const express = require("express");
const router = express.Router();
const studentController = require("../Controllers/student");

router.get("/get_all_students", studentController.getAllStudents);

router.post("/add_student", studentController.addStudent);

router.get(
    "/get_student_by_roll_class/:roll/:studentClass",
    studentController.getStudentByRollAndClass
);

router.get("/get_student_by_id/:id", studentController.getStudentByID);

router.put("/update_student_by_id/:id", studentController.updateStudentByID);

router.delete("/delete_student_by_id/:id", studentController.deleteStudentByID);

router.delete(
    "/delete_student_by_roll_class/:roll/:studentClass",
    studentController.deleteStudentByRollAndClass
);

module.exports = router;
