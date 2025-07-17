const express = require('express');
const cors = require('cors');
const router = express.Router();
const {
  getMyPreferences,
  updateMyPreferences,
  resetMyPreferences
} = require('../controllers/preferencesController');

const verifyJWT = require('../middlewares/verifyJWT');


router.get('/me', verifyJWT, getMyPreferences);
router.put('/me', verifyJWT, updateMyPreferences);
router.post('/reset', verifyJWT, resetMyPreferences);

module.exports = router;
