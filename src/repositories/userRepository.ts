import { Prisma, User } from "@prisma/client";
import { prisma } from "../lib/prisma";

export class UserRepository {
    async create(data: Prisma.UserCreateInput): Promise<User> {
        return await prisma.user.create({ data });
    }

    async findByEmail(email: string): Promise<User | null> {
        return await prisma.user.findUnique({
            where: { email }
        });
    }

    async findById(id: number): Promise<User | null> {
        return await prisma.user.findUnique({
            where: { id }
        });
    }
    async update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
        return await prisma.user.update({
            where: { id },
            data
        });
    }
    async delete(id: number){
        return await prisma.user.delete({
            where: { id }
        });
    }
    async findAll(): Promise<User[]> {
        return await prisma.user.findMany();
    }
}