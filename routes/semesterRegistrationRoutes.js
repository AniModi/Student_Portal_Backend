const { Router } = require('express');
const semesterRegistrationController = require('../controllers/semesterRegistrationController');
const { requireAdmin } = require('../middleware/auth');

const router = Router();

router.post('/register', requireAdmin,semesterRegistrationController.register);
router.get('/get-registration-details/:username/:semester', requireAdmin,semesterRegistrationController.getRegistrationDetails);

module.exports = router;