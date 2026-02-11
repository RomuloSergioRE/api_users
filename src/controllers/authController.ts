import { Request, Response } from "express";
import { UserService } from "../services/userService";

const userService = new UserService();

export class AuthController {
    handleSignUp = async (req: Request, res: Response) => {
        try {
            const user = await userService.signUp(req.body);
            const { password, ...userWithoutPassword } = user;
            return res.status(201).json(userWithoutPassword);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    handleSignIn = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const {user , token} = await userService.signIn(email, password);
            
            const userMinified = {
                id: user.id,
                name: user.name,
                role: user.role
            };
            
            return res.json({
                message: "Bem-vindo!",
                user: userMinified,
                token: token
            });
        } catch (error: any) {
            return res.status(401).json({ error: error.message });
        }
    }
}