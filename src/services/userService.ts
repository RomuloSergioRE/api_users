import { Prisma, User } from "@prisma/client";
import { UserRepository } from "../repositories/userRepository";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const repo = new UserRepository();

export class UserService {

    async signUp(data: Prisma.UserCreateInput) {
        const isExist = await repo.findByEmail(data.email);

        if(isExist){
            throw new Error("usuario ja tem um email cadastrado");
        }

        const hashedPassword = await bcrypt.hash(data.password, 10)

        const userData = {
            ...data,
            password: hashedPassword
        }

        return await repo.create(userData);
    }
    async signIn(email: string, password: string) {
        const user = await repo.findByEmail(email);
    
        if (!user) {
            throw new Error("E-mail ou senha incorretos.");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            throw new Error("E-mail ou senha incorretos.");
        }

        const secret = process.env.JWT_SECRET || 'chave_reserva_segura';
        const token = jwt.sign({ 
            id: user.id, 
            email: user.email },
            secret, 
            { expiresIn: '8h' }
        );

        return { user, token };
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
        if (data.password && typeof data.password === 'string') {
            data.password = await bcrypt.hash(data.password, 10);
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