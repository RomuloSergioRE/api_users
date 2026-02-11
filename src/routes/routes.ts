import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { UserController } from '../controllers/userController';
import { PostController } from '../controllers/postController';
import { AuthController } from '../controllers/authController';

const router = Router();
const userController = new UserController();
const postController = new PostController();
const authController = new AuthController();


//signup e signin
router.post("/auth/signup", authController.handleSignUp);
router.post("/auth/signin", authController.handleSignIn);

// user
router.get("/users",authMiddleware, userController.handleListAll);
router.get("/users/:id", authMiddleware, userController.handleUserId);
router.get("/users/email/:email", authMiddleware, userController.handleUserByEmail);
router.patch("/users/:id", authMiddleware, userController.handleUpdateUser);
router.delete("/users/:id", authMiddleware, userController.handleDeleteUser);

//post
router.post("/posts", authMiddleware, postController.handleCreate);
router.get("/posts", authMiddleware, postController.handleListAll);
router.get("/posts/:id", authMiddleware, postController.handlePostId);
router.patch("/posts/:id", authMiddleware, postController.handleUpdatePost);
router.delete("/posts/:id", authMiddleware, postController.handleDeletePost);
export default router;