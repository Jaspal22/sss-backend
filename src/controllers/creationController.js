import schedule from "../models/scheduleModel.js";

export const AddByTeacher = async (req, res) => {
    try {
        const scheduleDataArray = req.body;

        if (!Array.isArray(scheduleDataArray)) {
            return res.status(400).json({ message: "Invalid request: Expected an array of schedule data" });
        }

        if (scheduleDataArray.length === 0) {
            return res.status(400).json({ message: "No schedule data provided" });
        }

        const createdSchedules = [];

        for (const scheduleData of scheduleDataArray) {
            const { teacherName, className, subject, period, dayofweek } = scheduleData;

            // Input Validation for each schedule item
            if (!teacherName || typeof teacherName !== 'string' || teacherName.trim() === '') {
                return res.status(400).json({ message: "Please provide a valid Teacher Name" });
            }

            if (!className || typeof className !== 'string' || className.trim() === '') {
                return res.status(400).json({ message: "Please provide a valid Class Name" });
            }

            if (!subject || typeof subject !== 'string' || subject.trim() === '') {
                return res.status(400).json({ message: "Please provide a valid Subject" });
            }

            if (!period || typeof period !== 'number' || period < 1 || period > 8) {
                return res.status(400).json({ message: "Please provide a valid Period (1-8)" });
            }

            if (!dayofweek || typeof dayofweek !== 'string' || !['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].includes(dayofweek)) {
                return res.status(400).json({ message: "Please provide a valid Day of the Week" });
            }

            // Function to generate a unique serial number
            function generateUniqueSerial() {
                const timestamp = Date.now().toString(36); // Convert current timestamp to base36 string
                const random = Math.random().toString(36).substring(2, 8); // Add a random string
                return timestamp + random; // Combine timestamp and random string for uniqueness
            }

            const newSchedule = new schedule({
                teacherName,
                className,
                serial: generateUniqueSerial(), // if serial is not auto-generated
                subject,
                period,
                dayofweek,
            });

            try {
                await newSchedule.save();
                createdSchedules.push(newSchedule);
            } catch (err) {
                // console.error("Error creating schedule:", err); // Log the error for debugging
                return res.status(500).json({
                    message: "Error creating schedule",
                    error: err.message
                });
            }
        }

        res.status(201).json({
            message: "Schedules created successfully",
            schedules: createdSchedules
        });

    } catch (err) {
        // console.error("Error processing schedule data:", err);
        res.status(500).json({
            message: "Error processing schedule data",
            error: err.message
        });
    }
};


export const AddData = async (req, res) => {
    const { teacherName, className, subject, period, dayofweek } = req.body;

    if (!teacherName) {
        return res.status(401).json({
            message: "Please provide Teacher Name",
        });
    }
    if (!subject) {
        return res.status(401).json({
            message: "Please provide Subject Name",
        });
    }
    if (!period) {
        return res.status(401).json({
            message: "Please provide Period",
        });
    }

    // Function to generate a unique serial number
    function generateUniqueSerial() {
        const timestamp = Date.now().toString(36); // Convert current timestamp to base36 string
        const random = Math.random().toString(36).substring(2, 8); // Add a random string
        return timestamp + random; // Combine timestamp and random string for uniqueness
    }

    console.log(
        teacherName,
        className,
        subject,
        period,
        dayofweek,);


    const newSchedule = new schedule({
        teacherName,
        className,
        serial: generateUniqueSerial(), // if serial is not auto-generated
        subject,
        period,
        dayofweek,
    });

    try {
        await newSchedule.save();
        res.status(201).json({
            message: "Schedule created successfully",
            schedule: newSchedule
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error creating schedule",
            error: err.message
        });
    }


};



export const GetData = async (req, res) => {
    try {
        // console.log("entered" , req.body);

        const { teacherName } = req.body;
    
        // console.log("Teacher Name: ", teacherName);

        const allSchedules = await schedule.find({ teacherName });
        // console.log("All schedules ",allSchedules);
        allSchedules.sort((a, b) => a.period - b.period)
        // console.log("All Periods ",allSchedules.map((schedule) => schedule.serial));
        // console.log("All teacher ",allSchedules.map((schedule) => schedule.teacherName));
        // console.log("All subjects ",allSchedules.map((schedule) => schedule.subject));
        if (allSchedules.length === 0) {
            return res.status(404).json({
                message: "No schedules found for this teacher",
            });
        }


        res.status(200).json({
            message: "Schedules fetched successfully",
            schedule: allSchedules
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching schedules",
            error: error.message
        });
    }
}
export const UpdateData = async (req, res) => { }
export const DeleteData = async (req, res) => { }