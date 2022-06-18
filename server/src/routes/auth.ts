import { checkAuth } from './../middleware/checkAuth';
import express from 'express'
import { UserController } from '../controllers/Auth';
const router = express.Router();

const User = new UserController();

router.post('/register', User.register);

router.post('/login', User.login);

router.get('/refreshToken', User.refreshToken);

router.get('/me', checkAuth, User.me);

router.get('/logout', checkAuth,User.logout);


export default router;