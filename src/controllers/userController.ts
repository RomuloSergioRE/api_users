import { Prisma } from "@prisma/client";
import { UserService } from "../services/userService";
import { Request, Response } from "express";

const userService = new UserService();

export class UserController {
    handleUserByEmail = async (req: Request, res: Response) => {
       try {
            const {email} = req.params;
            const getUserByEmail = await userService.getUserByEmail(String(email));
            return res.status(200).json(getUserByEmail);
        } catch (error: any) {
            return res.status(400).json({error: error.message}) 
        }
    }
    handleUserId = async (req: Request, res: Response) => {
       try {
            const {id} = req.params;
            const getUserById = await userService.getUserById(Number(id));
            return res.status(200).json(getUserById);
        } catch (error: any) {
            return res.status(400).json({error: error.message}) 
        }
    }
    handleUpdateUser = async (req: Request, res: Response) => {
       try {
            const {id} = req.params;
            const data: Prisma.UserUpdateInput = req.body;
            const updateUser = await userService.updateUser(Number(id), data);
            const { password, ...userWithoutPassword } = updateUser as any;
            return res.status(200).json(userWithoutPassword);
        } catch (error: any) {
            return res.status(400).json({error: error.message}) 
        }
    }
    handleDeleteUser = async (req: Request, res: Response) => {
       try {
            const {id} = req.params;
            await userService.deleteUser(Number(id));
            return res.status(204).json();
        } catch (error: any) {
            return res.status(400).json({error: error.message}) 
        }
    }
    handleListAll = async (_req: Request, res: Response) => {
        try {
            const users = await userService.listAllUsers();
            const sanitizedUsers = users.map(user => ({
                id: user.id,
                name: user.name,
                role: user.role,
                status: user.status
            }));
            return res.json(sanitizedUsers);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    };
}