import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { PostService } from "../services/postService";

const postService = new PostService();

export class PostController {

    handleCreate = async (req: Request, res: Response) =>{
        try {
            const data: Prisma.PostUncheckedCreateInput = req.body;
            const newPost = await postService.registerPost(data);
            return res.status(201).json(newPost);
        } catch (error: any) {
            return res.status(400).json({error: error.message})  
        }
    }
    handlePostId = async (req: Request, res: Response) => {
       try {
            const {id} = req.params;
            const getUserById = await postService.getPostById(Number(id));
            return res.status(200).json(getUserById);
        } catch (error: any) {
            return res.status(400).json({error: error.message}) 
        }
    }
    handleUpdatePost = async (req: Request, res: Response) => {
       try {
            const {id} = req.params;
            const data: Prisma.PostUpdateInput = req.body;
            const updataPost = await postService.updatePost(Number(id), data);
            return res.status(200).json(updataPost);
        } catch (error: any) {
            return res.status(400).json({error: error.message}) 
        }
    }
    handleDeletePost = async (req: Request, res: Response) => {
       try {
            const {id} = req.params;
            await postService.deletePost(Number(id));
            return res.status(204).json();
        } catch (error: any) {
            return res.status(400).json({error: error.message}) 
        }
    }
    handleListAll = async (_req: Request, res: Response) => {
        try {
            const posts = await postService.listPosts();
            return res.json(posts);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    };
}