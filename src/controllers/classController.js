import schedule from "../models/scheduleModel.js";

export const GetDataByClass = async (req, res) => {
    try {
        // console.log("entered");
        
        const { className } = req.body;

        // console.log("Class Name:", className); // Log the class name for debugging

        if (!className) {
            return res.status(400).json({
                message: "Please provide Class Name",
            });
        }

        const allSchedules = await schedule.find({ className });

        if (allSchedules.length === 0) {
            return res.status(404).json({
                message: "No schedules found for this class",
            });
        }

        // console.log("allschedules");
        

        // Group schedules by teacher
        const teachersSchedule = {};
        allSchedules.forEach(schedule => {
            if (!teachersSchedule[schedule.teacherName]) {
                teachersSchedule[schedule.teacherName] = [];
            }
            teachersSchedule[schedule.teacherName].push(schedule);
        });

        // Convert the grouped schedules into an array
        const result = Object.entries(teachersSchedule).map(([teacherName, schedules]) => ({
            teacherName,
            schedules: schedules.sort((a, b) => a.period - b.period) // Sort periods for each teacher
        }));

        res.status(200).json({
            message: "Schedules fetched successfully",
            schedule: result
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching schedules",
            error: error.message
        });
    }
};

export const UpdateDataByClass = async (req, res) => {
    try {
        const { className, scheduleData } = req.body;

        if (!className) {
            return res.status(400).json({
                message: "Please provide class name",
            });
        }

        if (!scheduleData || !Array.isArray(scheduleData)) {
            return res.status(400).json({
                message: "Invalid schedule data provided. It must be a non-empty array.",
            });
        }

        // Iterate through the schedule data and update or create entries in the database
        for (const scheduleEntry of scheduleData) {
            const { dayOfWeek, period, teacherName, subject, _id } = scheduleEntry;

            //validation for the required fields
            if (!dayOfWeek || !period || !teacherName || !subject) {
                if (_id) {
                    // If an _id is provided, update the existing schedule entry
                    const existingSchedule = await schedule.findById(_id);

                    if (!existingSchedule) {
                        return res.status(404).json({
                            message: `Schedule with id ${_id} not found`,
                        });
                    }
                    await schedule.findByIdAndDelete(_id);
                }
                continue;
            }

            if (_id) {
                // If an _id is provided, update the existing schedule entry
                const existingSchedule = await schedule.findById(_id);

                if (!existingSchedule) {
                    return res.status(404).json({
                        message: `Schedule with id ${_id} not found`,
                    });
                }

                existingSchedule.className = className;
                existingSchedule.dayofweek = dayOfWeek;
                existingSchedule.period = period;
                existingSchedule.teacherName = teacherName;
                existingSchedule.subject = subject;
                await existingSchedule.save();
            } else {
                // If no _id is provided, create a new schedule entry
                const newSchedule = new schedule({
                    className,
                    dayofweek: dayOfWeek,
                    period,
                    teacherName,
                    subject,
                });
                await newSchedule.save();
            }
        }

        // After updating the data, fetch the updated schedule to send back to the UI
        const updatedSchedules = await schedule.find({ className });

        if (updatedSchedules.length === 0) {
            return res.status(404).json({
                message: "No schedules found for this class after update",
            });
        }

        // Group schedules by teacher
        const teachersSchedule = {};
        updatedSchedules.forEach(schedule => {
            if (!teachersSchedule[schedule.teacherName]) {
                teachersSchedule[schedule.teacherName] = [];
            }
            teachersSchedule[schedule.teacherName].push(schedule);
        });

        // Convert the grouped schedules into an array
        const result = Object.entries(teachersSchedule).map(([teacherName, schedules]) => ({
            teacherName,
            schedules: schedules.sort((a, b) => a.period - b.period) // Sort periods for each teacher
        }));


        res.status(200).json({
            message: "Schedule updated successfully",
            schedule: result,
        });
    } catch (error) {
        console.error("Error updating schedule:", error);
        res.status(500).json({
            message: "Error updating schedule",
            error: error.message,
        });
    }
};


export const UpdateDataByTeacherName = async (req, res) => {
    try {
        const { teacherName, scheduleData } = req.body;

        if (!teacherName) {
            return res.status(400).json({
                message: "Please provide teacher name",
            });
        }

        if (!scheduleData || !Array.isArray(scheduleData)) {
            return res.status(400).json({
                message: "Invalid schedule data provided. It must be a non-empty array.",
            });
        }

        // Iterate through the schedule data and update or create entries in the database
        for (const scheduleEntry of scheduleData) {
            const { className, dayOfWeek, period, subject, _id } = scheduleEntry;

            //validation for the required fields
            if (!dayOfWeek || !period || !className || !subject) {
                if (_id) {
                    // If an _id is provided, update the existing schedule entry
                    const existingSchedule = await schedule.findById(_id);

                    if (!existingSchedule) {
                        return res.status(404).json({
                            message: `Schedule with id ${_id} not found`,
                        });
                    }
                    await schedule.findByIdAndDelete(_id);
                }
                continue;
            }

            if (_id) {
                // If an _id is provided, update the existing schedule entry
                const existingSchedule = await schedule.findById(_id);

                if (!existingSchedule) {
                    return res.status(404).json({
                        message: `Schedule with id ${_id} not found`,
                    });
                }

                existingSchedule.className = className;
                existingSchedule.dayofweek = dayOfWeek;
                existingSchedule.period = period;
                existingSchedule.teacherName = teacherName;
                existingSchedule.subject = subject;
                await existingSchedule.save();
            } else {
                // If no _id is provided, create a new schedule entry
                const newSchedule = new schedule({
                    className,
                    dayofweek: dayOfWeek,
                    period,
                    teacherName,
                    subject,
                });
                await newSchedule.save();
            }
        }

        // After updating the data, fetch the updated schedule to send back to the UI
        const updatedSchedules = await schedule.find({ teacherName });

        if (updatedSchedules.length === 0) {
            return res.status(404).json({
                message: "No schedules found for this teacher after update",
            });
        }

        // Group schedules by class
        const classSchedule = {};
        updatedSchedules.forEach(schedule => {
            if (!classSchedule[schedule.className]) {
                classSchedule[schedule.className] = [];
            }
            classSchedule[schedule.className].push(schedule);
        });

        // Convert the grouped schedules into an array
        const result = Object.entries(classSchedule).map(([className, schedules]) => ({
            className,
            schedules: schedules.sort((a, b) => a.period - b.period) // Sort periods for each class
        }));


        res.status(200).json({
            message: "Schedule updated successfully",
            schedule: result,
        });
    } catch (error) {
        console.error("Error updating schedule:", error);
        res.status(500).json({
            message: "Error updating schedule",
            error: error.message,
        });
    }
};