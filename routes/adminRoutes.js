const { Router } = require('express');
const studentCreationController = require('../controllers/studentCreationController');
const { requireAdmin } = require("../middleware/auth");
const adminCreationController = require('../controllers/adminCreationController');


const router = Router();

router.post('/create-student',requireAdmin, studentCreationController.createStudent);
router.post('/create-admin',requireAdmin, adminCreationController.createAdmin);
router.get('/get-students',requireAdmin, studentCreationController.getStudents);
router.get('/get-student/:id',requireAdmin, studentCreationController.getStudent);


module.exports = router;