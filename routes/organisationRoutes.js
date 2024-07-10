const express = require('express');
const router = express.Router();
const organisationController = require('../controllers/organisationController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.get('/', organisationController.getOrganisations);
router.get('/:orgId', organisationController.getOrganisation);
router.post('/', organisationController.createOrganisation);
router.post('/:orgId/users', organisationController.addUserToOrganisation);

module.exports = router;