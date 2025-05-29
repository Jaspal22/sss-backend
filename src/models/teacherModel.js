import mongoose from "mongoose";
const { Schema } = mongoose;

const teacherScheema = new Schema({
  teacherName: {
    type: "String",
    required: true,
    description: 'Reference to the Teacher document',
  },
  isIncharge: {
    type: "String",
    enum: ["Yes", "No"],
    // required: true,
    description: 'Reference to the Class document',
  },
  assignedClass: {
        type: "String",
  },
  subject: {
    type: "String",
    // required: true,
    description: 'Reference to the Subject document',
  },
  period: {
    type: String,
    enum: ["1", "2", "3", "4", "5", "6", "7", "8"],
    // required: true,
    description: "Period number for this schedule entry",
  },
  dayofweek: {
    type: String,
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    // required: true,
    description: "Day of the week for this session",
  },
  
}, { timestamps: true });


const teacher = mongoose.model("teacher", teacherScheema); // Kept model name as 'schedule'
export default teacher;