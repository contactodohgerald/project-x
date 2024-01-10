import {Router} from "express";

const router = Router();

import controller from "../app/controllers/controller";
import register from "../app/controllers/register.controller";
import login from "../app/controllers/login.controller";

import authenticated from "../app/middleware/jwt";
import user from "../app/controllers/user.controller";
import { UserRole } from "../config/enum";
import { authorizationMiddleware } from "../app/middleware/authorization";


router.get('/health-check', controller.healthCheck)
router.post('/register', register.registerUser)
router.post('/login', login.loginUser)

router.use(authenticated);

router.post('/add-account', authorizationMiddleware([UserRole.super_admin, UserRole.admin]), user.addAccount)
router.get('/all-users', authorizationMiddleware([UserRole.super_admin, UserRole.admin]), user.fetchUsers)
router.get('/user/:id', authorizationMiddleware([UserRole.super_admin, UserRole.admin]), user.fetchUser)

const combineRouter = (app: any) => app.use('/api/v1/', router);

export default combineRouter;