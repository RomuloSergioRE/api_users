import { Post, Prisma, User } from "@prisma/client";
import { PostRepository } from "../repositories/postRepository";
import { UserRepository } from "../repositories/userRepository";

const repo = new PostRepository();
const userRepository = new UserRepository();

export class PostService {

    async registerPost(data: Prisma.PostUncheckedCreateInput) {

        const author = await userRepository.findById(data.authorId);

        if(!author){
            throw new Error("Autor não encontrado.");
        }

        return await repo.create(data);
    }
    async getPostById(id: number) {
        const post = await repo.findById(id);

        if(!post){
            throw new Error("post não encontrado");
        }

        return post;
    }   
    async updatePost(id: number, data: Prisma.PostUpdateInput): Promise<Post> {
        const post = await repo.findById(id);

        if(!post){
            throw new Error("post não encontrado");
        }

        return await repo.update(id, data);
    }   
    async deletePost(id: number): Promise<Post> {
        const post = await repo.findById(id);

        if(!post){
            throw new Error("post não encontrado");
        }
        return await repo.delete(id);
    }

    async listPosts(): Promise<Post[]> {
        return await repo.findAll();
    }
}