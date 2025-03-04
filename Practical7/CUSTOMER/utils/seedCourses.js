const mongoose = require('mongoose');
require('dotenv').config();
const Course = require('../models/course');

const sampleCourses = [
  {
    coid: 1001,
    coname: "Web Development Fundamentals",
    codescription: "Learn HTML, CSS, and JavaScript basics",
    cobranch: "Web Development",
    costdate: new Date('2024-04-01'),
    coenddate: new Date('2024-06-30'),
    coduration: "3 months",
    coprice: 299,
    coactive: true
  },
  {
    coid: 1002,
    coname: "Advanced JavaScript",
    codescription: "Master modern JavaScript features and frameworks",
    cobranch: "Web Development",
    costdate: new Date('2024-04-15'),
    coenddate: new Date('2024-07-15'),
    coduration: "3 months",
    coprice: 399,
    coactive: true
  },
  {
    coid: 1003,
    coname: "Python Programming",
    codescription: "Learn Python from basics to advanced concepts",
    cobranch: "Programming",
    costdate: new Date('2024-04-01'),
    coenddate: new Date('2024-06-30'),
    coduration: "3 months",
    coprice: 349,
    coactive: true
  }
];

const seedCourses = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('Connected to database');

    // Clear existing courses
    await Course.deleteMany({});
    console.log('Cleared existing courses');

    // Add new courses
    await Course.insertMany(sampleCourses);
    console.log('Added sample courses');

    console.log('Database seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedCourses(); 