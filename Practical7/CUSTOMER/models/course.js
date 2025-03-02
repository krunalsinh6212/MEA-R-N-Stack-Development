const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  coid: {
    type: Number,
    required: true,
    unique: true,
  },
  coname: {
    type: String,
    required: [true, "Course name should not be left blank"],
  },
  codescription: {
    type: String,
    required: [true, "Course description should not be left blank"],
  },
  cobranch: {
    type: String,
    required: [true, "Course branch should not be left blank"],
  },
  costdate: {
    type: Date,
    required: [true, "Course start date should not be left blank"],
  },
  coenddate: {
    type: Date,
    required: [true, "Course end date should not be left blank"],
  },
  coduration: {
    type: String,
    required: [true, "Course duration should not be left blank"],
  },
  coprice: {
    type: Number,
    required: [true, "Course price should not be left blank"],
  },
  coactive: {
    type: Boolean,
    required: [true, "Course active state should not be left blank"],
  },
  registered_date: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('Course', courseSchema);
