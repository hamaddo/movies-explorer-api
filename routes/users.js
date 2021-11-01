const router = require('express').Router();
const {
  updateUser,
  getCurrentUser,
  signOut,
} = require('../controllers/users');

const {
  changeInformationValidation,
} = require('../middlewares/validation');

router.get('/me', getCurrentUser);
router.patch('/me', changeInformationValidation, updateUser);
router.get('/signout', signOut);

module.exports = router;
