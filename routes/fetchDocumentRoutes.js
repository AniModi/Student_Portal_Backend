const { Router } = require('express');
const fetchDocumentsController = require('../controllers/fetchDocumentController');
const {requireAdmin} = require('../middleware/auth');


const router = Router();

router.get('/:username/:semester', requireAdmin, fetchDocumentsController.fetchDocuments);

module.exports = router;