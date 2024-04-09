const express = require('express');
const router = express.Router();
const { adminLogin, sendLoginLink, adminSignup } = require('../controllers/admin_controller');
const Documents = require("../controllers/document_controller")



// ADMIN ROUTES
router.post('/admin-login', adminLogin);
router.post('/admin-signup', adminSignup);
router.post('/login-link', sendLoginLink);












// DOCUMENT ROUTES
router.post("/document-create", Documents.addDocument)
router.get("/document-getAll", Documents.getAllDocs)
router.get("/document-getSingle/:id", Documents.getDocById)
router.get("/", (req, res) => {
  res.send("Hello there! this is our project!");
});

module.exports = router;
