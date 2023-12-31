const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

router.post('/login', authController.loginUser);
router.get('/is-authenticated', authController.checkJwt);
router.post('/change-password', authController.changePassword);
router.post('/change-wallet-address', authController.changeWalletAddress);

module.exports = router;
