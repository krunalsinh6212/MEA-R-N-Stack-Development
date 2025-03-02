const express = require('express');
const router = express.Router();

const courseController = require('../controller/courseController');

router.post('/createCourse', courseController.createCourse);
router.get('/showAllCourses', courseController.showAllCourses);
router.get('/getCourse/:coid', courseController.getCourse);
router.delete('/deleteCourse/:coid', courseController.deleteCourse);
router.put('/updateCourse/:coid', courseController.updateCourse);
router.get('/getCourseByBranch/:branch', courseController.getCourseByBranch);
router.get('/getCourseByFlag/:flag', courseController.getCourseByFlag);
router.get('/getCourseByDate', courseController.getCourseByDate);

module.exports = router;
