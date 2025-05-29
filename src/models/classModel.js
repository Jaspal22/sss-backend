import mongoose from "mongoose";
const { Schema } = mongoose;

const classScheema = new Schema({
  className: {
    type: "String",
    required: true,
    trim: true,
  },
  inchargeName: {
    type: "String",
    required: true,
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
    // type: "String",
    // enum: ["Math", "Science", "English", "History", "Geography"],
    // required: true,
    // description: 'Reference to the Subject document',
  },
  subjectCount:{
    type: "Number"
  },
  sections: {
    type: "String",
    enum: ["A", "B", "C", "D"],
  }
}, { timestamps: true });


const classS = mongoose.model("class", classScheema); // Kept model name as 'classS'
export default classS;