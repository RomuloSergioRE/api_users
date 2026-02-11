import { Prisma, Post } from "@prisma/client";
import { prisma } from "../lib/prisma";

export class PostRepository {
    async create(data: Prisma.PostUncheckedCreateInput): Promise<Post> {
        return await prisma.post.create({ data });
    }

    async findById(id: number): Promise<Post | null> {
        return await prisma.post.findUnique({
            where: { id },
            include:{
                author: true
            }
        });
    }
    async update(id: number, data: Prisma.PostUpdateInput): Promise<Post> {
        return await prisma.post.update({
            where: { id },
            data
        });
    }
    async delete(id: number){
        return await prisma.post.delete({
            where: { id }
        });
    }
    async findAll(): Promise<Post[]> {
        return await prisma.post.findMany({
            include: {
                author:{
                    select: {name: true , email: true}
                }
            }
        });
    }
}