import { Router } from 'express';
import { UserController } from '../controllers/userController';

const router = Router();
const userController = new UserController();

router.post("/users", userController.handleCreate);
router.get("/users", userController.handleListAll);
router.get("/users/:id", userController.handleUserId);
router.get("/users/email/:email", userController.handleUserByEmail);
router.patch("/users/:id", userController.handleUpdateUser);
router.delete("/users/:id", userController.handleDeleteUser);

export default router;