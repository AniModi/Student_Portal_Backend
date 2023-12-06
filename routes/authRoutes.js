const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

router.post('/login', authController.loginUser);
router.get('/is-authenticated', authController.checkJwt);

module.exports = router;
