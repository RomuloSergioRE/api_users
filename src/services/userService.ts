import { Prisma, User } from "@prisma/client";
import { UserRepository } from "../repositories/userRepository";

const repo = new UserRepository();

export class UserService {

    async registerUser(userData: Prisma.UserCreateInput) {
        const isExist = await repo.findByEmail(userData.email);

        if(isExist){
            throw new Error("usuario ja cadastrado");
        }

        return await repo.create(userData);
    }

    async getUserByEmail(email: string) {
        const user = await repo.findByEmail(email);

        if(!user){
            throw new Error("usuario não esta cadastrado");
        }

        return user;
    }   

    async getUserById(id: number) {
        const user = await repo.findById(id);

        if(!user){
            throw new Error("usuario não encontrado");
        }

        return user;
    }   
    async updateUser(id: number, data: Prisma.UserUpdateInput): Promise<User> {
        const user = await repo.findById(id);

        if(!user){
            throw new Error("usuario não encontrado");
        }

        return await repo.update(id, data);
    }   
    async deleteUser(id: number): Promise<User> {
        const user = await repo.findById(id);

        if(!user){
            throw new Error("usuario não encontrado");
        }
        return await repo.delete(id);
    }

    async listAllUsers(): Promise<User[]> {
        return await repo.findAll();
    }
}