import classS from "../../models/classModel.js";
import ptStudentMark from "../../models/ptStudentMarkModel.js";

const ptMarksAdd = (req, res) => {
    const { studentName, marksScored , totalMarks, className, subjects , CI , GrandTotal, Percentage } = req.body;

    // Validate required fields
    if ( !studentName || !className || !subjects) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }


    const newSchedule = new ptStudentMark({
        studentName,
        marksScored,
        className,
        CI,
        GrandTotal,
        subjects,
        Percentage,
        totalMarks, // Save the subject count
    });

    newSchedule.save()
        .then(() => {
            res.status(201).json({
                message: "Marks created successfully",
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                message: "Error creating marks",
                error: err.message
            });
        });
}

export default ptMarksAdd;
