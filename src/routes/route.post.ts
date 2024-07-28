import express, { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = express.Router();

router.post("/create", async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { title, content, autherId } = req.body;

        const createTodo = await prisma.post.create({
            data: {
                title,
                content,
                autherId
            }
        });

        console.log(createTodo);
        
        res.status(201).json({
            success: true,
            data: createTodo,
            message: "todo has been created!",
        });

    } catch (error) {
        next(error);
    }
})

export default router;