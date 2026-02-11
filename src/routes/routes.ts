import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { PostController } from '../controllers/postController';

const router = Router();
const userController = new UserController();
const postController = new PostController();

// user
router.post("/users", userController.handleCreate);
router.get("/users", userController.handleListAll);
router.get("/users/:id", userController.handleUserId);
router.get("/users/email/:email", userController.handleUserByEmail);
router.patch("/users/:id", userController.handleUpdateUser);
router.delete("/users/:id", userController.handleDeleteUser);

//post
router.post("/posts", postController.handleCreate);
router.get("/posts", postController.handleListAll);
router.get("/posts/:id", postController.handlePostId);
router.patch("/posts/:id", postController.handleUpdatePost);
router.delete("/posts/:id", postController.handleDeletePost);
export default router;