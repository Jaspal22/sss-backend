import mongoose from "mongoose";
const { Schema } = mongoose;

const scheduleScheema = new Schema({
  teacherName: {
    type: "String",
    required: true,
    description: 'Reference to the Teacher document',
  },
  className: {
    type: "String",
    required: true,
    description: 'Reference to the Class document',
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
  serial: {
    type: String,
    // unique: true,
    description: "Unique serial number for each schedule entry",
  },
}, { timestamps: true });


const schedule = mongoose.model("schedule", scheduleScheema); // Kept model name as 'schedule'
export default schedule;




// #################


// import mongoose from "mongoose";
// const { Schema } = mongoose;

// const scheduleScheema = new Schema({
//   teacherName: {
//     type: "String",
//     ref: 'Teacher', // Assuming you have a 'Teacher' model
//     required: true,
//     description: 'Reference to the Teacher document',
//   },
//   className: {
//     type: "String",
//     ref: 'Class', // Assuming you have a 'Class' model
//     required: true,
//     description: 'Reference to the Class document',
//   },
//   subject: {
//     type: "String",
//     ref: 'Subject', // Assuming you have a 'Subject' model
//     required: true,
//     description: 'Reference to the Subject document',
//   },
//   period: {
//     type: "String",
//     enum: ["1", "2", "3", "4", "5", "6", "7", "8"],
//     required: true,
//     description: "Period number for this schedule entry",
//   },
//   dayofweek: {
//     type: "String",
//     enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
//     required: true,
//     description: "Day of the week for this session",
//   },
// }, { timestamps: true });

// // Create indexes for efficient querying and to prevent conflicts
// scheduleScheema.index({ teacher: 1, dayofweek: 1, periodNumber: 1 }, { unique: true });
// scheduleScheema.index({ class: 1, dayofweek: 1, periodNumber: 1 });

// const schedule = mongoose.model("Schedule", scheduleScheema); // Capitalized model name convention
// export default schedule;






// ########################################



// import mongoose from "mongoose";
// import { Schema } from "mongoose";

// const scheduleScheema = new Schema({


//   teacherName: {
//     "type": "String",
//     "required": true,
//     unique: true,
//     "description": "Name of the teacher for easy display",
    
//   },
//   period: {
//       period1: {
//         perd:{
//           type: "String",
//           enum: ["1", "2", "3", "4", "5", "6", "7", "8"],
//           required: true,
//           description: "Period number for the schedule entry"
//         },
//         cls: {
//           "type": "String",
//           required: true,
//           lowercase: true,
//           trim: true,
//           "description": "class of the teacher"
//         }
//       },
//       period2: {perd:{
//         type: "String",
//         enum: ["1", "2", "3", "4", "5", "6", "7", "8"],
//         required: true,
//         description: "Period number for the schedule entry"
//       },
//       cls: {
//         "type": "String",
//         required: true,
//         lowercase: true,
//         trim: true,
//         "description": "class of the teacher"
//       }},
//       period3: {perd:{
//         type: "String",
//         enum: ["1", "2", "3", "4", "5", "6", "7", "8"],
//         required: true,
//         description: "Period number for the schedule entry"
//       },
//       cls: {
//         "type": "String",
//         required: true,
//         lowercase: true,
//         trim: true,
//         "description": "class of the teacher"
//       }},
//       period4: {perd:{
//         type: "String",
//         enum: ["1", "2", "3", "4", "5", "6", "7", "8"],
//         required: true,
//         description: "Period number for the schedule entry"
//       },
//       cls: {
//         "type": "String",
//         required: true,
//         lowercase: true,
//         trim: true,
//         "description": "class of the teacher"
//       }},
//       period5: {perd:{
//         type: "String",
//         enum: ["1", "2", "3", "4", "5", "6", "7", "8"],
//         required: true,
//         description: "Period number for the schedule entry"
//       },
//       cls: {
//         "type": "String",
//         required: true,
//         lowercase: true,
//         trim: true,
//         "description": "class of the teacher"
//       }},
//       period6: {perd:{
//         type: "String",
//         enum: ["1", "2", "3", "4", "5", "6", "7", "8"],
//         required: true,
//         description: "Period number for the schedule entry"
//       },
//       cls: {
//         "type": "String",
//         required: true,
//         lowercase: true,
//         trim: true,
//         "description": "class of the teacher"
//       }},
//       period7: {perd:{
//         type: "String",
//         enum: ["1", "2", "3", "4", "5", "6", "7", "8"],
//         required: true,
//         description: "Period number for the schedule entry"
//       },
//       cls: {
//         "type": "String",
//         required: true,
//         lowercase: true,
//         trim: true,
//         "description": "class of the teacher"
//       }},
//       period8: {perd:{
//         type: "String",
//         enum: ["1", "2", "3", "4", "5", "6", "7", "8"],
//         required: true,
//         description: "Period number for the schedule entry"
//       },
//       cls: {
//         "type": "String",
//         required: true,
//         lowercase: true,
//         trim: true,
//         "description": "class of the teacher"
//       }},
//     },
 
//   subject: {
//     "type": "String",
//     "description": "Name of the subject (e.g., 'Mathematics', 'Science')"
//   },
//   dayofweek: {
//     "type": "String",
//     "enum": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
//     "required": true,
//     "description": "Day of the week for this session"
//   },
//   serial: {
//     "type": "String",
//     "description": "Unique serial number for each schedule entry"
//   },

// }, {
//     timestamps: true
// });

// const schedule = mongoose.model("schedule", scheduleScheema);
// export default schedule;