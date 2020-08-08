const userRouter = require('express').Router();
const { getUserMe } = require('../controllers/user');
// const { userIdValidation } = require('../middlewares/user-validation');

userRouter.get('/me', getUserMe);
module.exports = userRouter;
