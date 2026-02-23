import { Post, Prisma, User } from "@prisma/client";
import { PostRepository } from "../repositories/postRepository";
import { UserRepository } from "../repositories/userRepository";

export class PostService {

    constructor(
        private postRepository = new PostRepository(),
        private userRepository = new UserRepository()
    ) {}

    async registerPost(data: Prisma.PostUncheckedCreateInput) {

        const author = await this.userRepository.findById(data.authorId);

        if(!author){
            throw new Error("Autor não encontrado.");
        }

        return await this.postRepository.create(data);
    }
    async getPostById(id: number) {
        const post = await this.postRepository.findById(id);

        if(!post){
            throw new Error("post não encontrado");
        }

        return post;
    }   
    async updatePost(id: number, data: Prisma.PostUpdateInput): Promise<Post> {
        const post = await this.postRepository.findById(id);

        if(!post){
            throw new Error("post não encontrado");
        }

        return await this.postRepository.update(id, data);
    }   
    async deletePost(id: number): Promise<Post> {
        const post = await this.postRepository.findById(id);

        if(!post){
            throw new Error("post não encontrado");
        }
        return await this.postRepository.delete(id);
    }

    async listPosts(): Promise<Post[]> {
        return await this.postRepository.findAll();
    }
}