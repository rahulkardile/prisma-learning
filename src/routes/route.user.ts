import express, { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = express.Router();

router.post("/create", async(req: Request, res: Response, next: NextFunction)=>{
    try {
        
        const { name, email } = req.body;

        const newUser = await prisma.user.create({
            data: {
                email,
                name
            }
        });

        res.status(201).json({
            success: true,
            message: `Welcome ${newUser.name}!`,
        });

    } catch (error) {
        next(error);
    }
})

export default router;