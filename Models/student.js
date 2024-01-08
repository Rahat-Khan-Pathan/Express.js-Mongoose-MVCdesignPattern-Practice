const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define marksSchema with validation
const marksSchema = new Schema(
    {
        marks: { type: Number, min: 0, max: 100, required: true },
        term: { type: String, enum: ["First", "Second", "Final"] },
        subject: { type: String, enum: ["Bangla", "English", "Math"] },
    },
    { versionKey: false, _id: false }
);

// Define studentSchema with marks array
const studentSchema = new Schema(
    {
        fullName: { type: String, required: true },
        class: { type: Number, required: true },
        roll: { type: Number, required: true },
        section: { type: String, required: true },
        createdDate: { type: Date, default: Date.now },
        updatedDate: { type: Date, default: Date.now },
        marksArray: {
            type: [marksSchema],
            default: [],
        },
    },
    { versionKey: false }
);

studentSchema.pre("save", function (next) {
    const marksArray = this.marks;
    if (!marksArray) return next();
    const isValidMarksArray = marksArray.every((mark) => {
        return (
            mark.marks >= 0 &&
            mark.marks <= 100 &&
            typeof mark.term === "string" &&
            ["First", "Second", "Final"].includes(mark.term) &&
            typeof mark.subject === "string" &&
            ["Bangla", "English", "Math"].includes(mark.subject)
        );
    });

    if (!isValidMarksArray) {
        return next(new Error("Invalid data in the marks array"));
    }
    next();
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
