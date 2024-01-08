const mongoose = require("mongoose");
const { Schema } = mongoose;

const marksSchema = new Schema(
    {
        marks: { type: Number, min: 0, max: 100, required: true },
        term: { type: String, enum: ["First", "Second", "Final"] },
        subject: { type: String, enum: ["Math", "English", "Bangla"] },
        studentClass: { type: Number, required: true },
        studentRoll: { type: Number, required: true },
        studentRef: { type: Schema.Types.ObjectId, required: true },
    },
    { versionKey: false }
);

const Marks = mongoose.model("Marks", marksSchema);

module.exports = Marks;
