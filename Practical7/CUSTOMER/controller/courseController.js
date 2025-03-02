const courseModel = require("../models/course");

exports.createCourse = async (req, res) => {
  try {
    const { coid, coname, codescription, cobranch, costdate, coenddate, coduration, coprice, coactive } = req.body;
    if (!coid || !coname || !codescription || !cobranch || !costdate || !coenddate || !coduration || !coprice) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }
    const checkCourse = await courseModel.find({ coid });
    if (checkCourse.length !== 0) {
      return res.status(401).json({
        success: false,
        message: `CourseID => ${coid} already exists!`,
      });
    }
    await courseModel.create({
      coid,
      coname,
      codescription,
      cobranch,
      costdate,
      coenddate,
      coduration,
      coprice,
      coactive: coactive ?? true,
    });
    res.status(200).json({
      success: true,
      message: "Course successfully created!",
      data: req.body,
    });
  } catch (err) {
    res.status(403).json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const coid = req.params.coid;
    const course = await courseModel.findOne({ coid });
    if (!course) {
      return res.status(400).json({
        success: false,
        message: `CourseID => ${coid} doesn't exist!`,
      });
    }
    const updatedCourse = await courseModel.findOneAndUpdate({ coid }, req.body, { new: true });
    res.status(200).json({
      success: true,
      message: "Course updated successfully!",
      data: updatedCourse,
    });
  } catch (err) {
    res.status(403).json({
      success: false,
      message: err.message,
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const coid = req.params.coid;
    const course = await courseModel.findOne({ coid });
    if (!course) {
      return res.status(400).json({
        success: false,
        message: `CourseID => ${coid} doesn't exist!`,
      });
    }
    await courseModel.deleteOne({ coid });
    res.status(200).json({
      success: true,
      message: "Course deleted successfully!",
      data: course,
    });
  } catch (err) {
    res.status(403).json({
      success: false,
      message: err.message,
    });
  }
};

exports.showAllCourses = async (req, res) => {
  try {
    const courses = await courseModel.find({});
    res.status(200).json({
      success: true,
      message: "All courses retrieved successfully!",
      data: courses,
    });
  } catch (err) {
    res.status(403).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const coid = req.params.coid;
    const course = await courseModel.findOne({ coid });
    if (!course) {
      return res.status(400).json({
        success: false,
        message: `CourseID => ${coid} doesn't exist!`,
      });
    }
    res.status(200).json({
      success: true,
      message: "Course retrieved successfully!",
      data: course,
    });
  } catch (err) {
    res.status(403).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getCourseByBranch = async (req, res) => {
  try {
    const branch = req.params.branch;
    const courses = await courseModel.find({ cobranch: branch });
    res.status(200).json({
      success: true,
      message: `Courses in branch '${branch}' retrieved successfully!`,
      data: courses,
    });
  } catch (err) {
    res.status(403).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getCourseByFlag = async (req, res) => {
  try {
    const flag = req.params.flag.toLowerCase();
    if (flag !== "yes" && flag !== "no") {
      return res.status(400).json({
        success: false,
        message: "Invalid flag value! Use 'yes' or 'no'.",
      });
    }
    const isActive = flag === "yes"; // Set true for 'yes', false for 'no'
    const courses = await courseModel.find({ coactive: isActive });
    res.status(200).json({
      success: true,
      message: `Courses with active status '${flag}' retrieved successfully!`,
      data: courses,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getCourseByDate = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const courses = await courseModel.find({
      costdate: { $gte: new Date(startDate), $lte: new Date(endDate) },
    });
    res.status(200).json({
      success: true,
      message: `Courses between dates '${startDate}' and '${endDate}' retrieved successfully!`,
      data: courses,
    });
  } catch (err) {
    res.status(403).json({
      success: false,
      message: err.message,
    });
  }
};
