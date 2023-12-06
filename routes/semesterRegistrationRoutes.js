const { Router } = require('express');
const semesterRegistrationController = require('../controllers/semesterRegistrationController');
const { requireAdmin } = require('../middleware/auth');

const router = Router();

router.post('/register', requireAdmin,semesterRegistrationController.register);
router.get('/get-registration-details/:username/:semester', requireAdmin,semesterRegistrationController.getRegistrationDetails);
router.get('/get-all-students', requireAdmin,semesterRegistrationController.getAllStudents);
router.post('/approve-registration/:username/:semester', requireAdmin,semesterRegistrationController.approveRegistration);
router.get('/is-approved/:username/:semester', requireAdmin,semesterRegistrationController.isVerified);

module.exports = router;