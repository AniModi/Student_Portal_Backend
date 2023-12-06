const { Router } = require('express');
const { requireAdmin } = require("../middleware/auth");
const commentController = require("../controllers/commentController");


const router = Router();

router.post("/finance", requireAdmin, commentController.financeComments);
router.post("/faculty", requireAdmin, commentController.facultyComments);
router.get("/:username/:semester", requireAdmin, commentController.getComments);



module.exports = router;