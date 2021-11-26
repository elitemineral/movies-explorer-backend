const router = require('express').Router();

const {
  me,
  setUserInfo,
} = require('../controllers/users');

const {
  userInfoValidator,
} = require('../middlewares/requestValidators');

router.get('/users/me', me);
router.patch('/users/me', userInfoValidator, setUserInfo);

module.exports = router;
