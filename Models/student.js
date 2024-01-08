const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema(
    {
        fullName: { type: String, required: true },
        class: { type: Number, required: true },
        roll: { type: Number, required: true },
        section: { type: String, required: true },
        createdDate: { type: Date, default: Date.now },
        updatedDate: { type: Date, default: Date.now },
        marksRef: {
            type: [Schema.Types.ObjectId],
            default: [],
            validate: {
                validator: (array) =>
                    array.every((value) =>
                        mongoose.Types.ObjectId.isValid(value)
                    ),
                message: "Invalid ObjectId in the marksRef array.",
            },
        },
    },
    { versionKey: false }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
