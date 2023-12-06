const { Router } = require('express');
const verifyFeesController = require('../controllers/verifyFeesController');
const { requireAdmin } = require('../middleware/auth');

const router = Router();

router.post('/upload', requireAdmin, verifyFeesController.uploadFeeReferences);
router.get('/get', requireAdmin, verifyFeesController.fetchAllReferences);
router.get('/get/:username/:semester', requireAdmin, verifyFeesController.fetchReferences);
router.post("/verify", requireAdmin, verifyFeesController.verifyFees);
router.post("/upload-receipts", requireAdmin, verifyFeesController.upload);

module.exports = router;
