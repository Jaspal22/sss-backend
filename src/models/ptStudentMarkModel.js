import mongoose from "mongoose";
const { Schema } = mongoose;

const ptStudentMarkSchema = new Schema({
    studentName: {
        type: "String",
        required: true,

    },
    className: {
        type: "String",
        required: true,
    },
    CI:{
        type: "String",
        // default: "-",
    },
    GrandTotal: {
        type: "String",
        // default: "-",
    },
    Percentage: {
        type: "String",
    },
    marksScored: {
        subject1: {
            type: "String",
            default: "-",
        },
        subject2: {
            type: "String",
            default: "-",
        },
        subject3: {
            type: "String",
            default: "-",
        },
        subject4: {
            type: "String",
            default: "-",
        },
        subject5: {
            type: "String",
            default: "-",
        },
        subject6: {
            type: "String",
            default: "-",
        },
        subject7: {
            type: "String",
            default: "-",
        },
        subject8: {
            type: "String",
            default: "-",
        },
        subject9: {
            type: "String",
        },
        subject10: {
            type: "String",
        },
        // type: "Number",
        // required: true,
    },
    totalMarks: {
        subject1: {
            type: "String",
        },
        subject2: {
            type: "String",
        },
        subject3: {
            type: "String",
        },
        subject4: {
            type: "String",
        },
        subject5: {
            type: "String",
        },
        subject6: {
            type: "String",
        },
        subject7: {
            type: "String",
        },
        subject8: {
            type: "String",
        },
        subject9: {
            type: "String",
        },
        subject10: {
            type: "String",
        },
        // type: "Number",
        // required: true,
    },
    subjects: {
        subject1: {
            type: "String",
        },
        subject2: {
            type: "String",
        },
        subject3: {
            type: "String",
        },
        subject4: {
            type: "String",
        },
        subject5: {
            type: "String",
        },
        subject6: {
            type: "String",
        },
        subject7: {
            type: "String",
        },
        subject8: {
            type: "String",
        },
        subject9: {
            type: "String",
        },
        subject10: {
            type: "String",
        },
        // type: "Number",
        // required: true,
    },
    overallTotal: {
        type: "Number",
        // required: true,
    },
    overallPercentage: {
        type: "Number",
        // required: true,
    },
}, { timestamps: true });

const ptStudentMark = mongoose.model("ptStudentMark", ptStudentMarkSchema); // Kept model name as 'ptStudentMark'
export default ptStudentMark;
