import classS from "../../models/classModel.js";
import ptStudentMark from "../../models/ptStudentMarkModel.js";

export const fetchAllClasses = async (req, res) => {
    try {
        const classes = await classS.find({});
        res.status(200).json(classes);
    } catch (error) {
        console.error("Error fetching classes:", error);
        res.status(500).json({ message: "Failed to fetch classes", error: error.message });
    }
};

export const fetchClassData = async (req, res) => {
    try {
        const { className } = req.body;

        if (!className) {
            return res.status(400).json({ message: "Class Name is required in the request body" });
        }

        const classData = await classS.findOne({className});

        if (!classData) {
            return res.status(404).json({ message: "Class not found" });
        }

        res.status(200).json(classData);
    } catch (error) {
        console.error("Error fetching class data:", error);
        res.status(500).json({ message: "Failed to fetch class data", error: error.message });
    }
};

export const fetchAllClassStudents = async (req, res) => {
    try {
        const { className } = req.body;

        if (!className) {
            return res.status(400).json({ message: "Class Name is required in the request body" });
        }

        const students = await ptStudentMark.find({ className: className });

        if (!students || students.length === 0) {
            return res.status(404).json({ message: "No students found for this class" });
        }

        res.status(200).json(students);
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ message: "Failed to fetch students", error: error.message });
    }
}
