import classS from "../../models/classModel.js";

const classCreation = (req, res) => {
    const { inchargeName, className, subjects } = req.body;

    // Validate required fields
    if (!inchargeName || !className ) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    // Count the number of subjects
    const subjectCount = Object.keys(subjects).length;

    // Check if the class already exists for the given teacher and period
    classS.findOne({ className })
        .then(existingSchedule => {
            if (existingSchedule) {
                return res.status(409).json({
                    message: "Class already exists for this teacher and period"
                });
            }

            // Create a new schedule entry
            const newSchedule = new classS({
                inchargeName,
                className,
                subjects,
                subjectCount, // Save the subject count
            });

            return newSchedule.save();
        })
        .then(() => {
            res.status(201).json({
                message: "Class created successfully",
                // schedule: savedSchedule
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                message: "Error creating class",
                error: err.message
            });
        });
}

export default classCreation;