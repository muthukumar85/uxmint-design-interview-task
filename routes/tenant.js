const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getTenantConfig, getFeatureFlags } = require('../controllers/tenantController');

router.get('/config', getTenantConfig);
router.get('/features', authMiddleware, getFeatureFlags);

module.exports = router;
