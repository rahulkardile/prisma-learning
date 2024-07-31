import express, { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/create", async(req: Request, res: Response, next: NextFunction)=>{
    try {
        
        const { name, email } = req.body;

       const user = await prisma.user.create({
            data: {
                email,
                name
            }
        });

        res.status(201).json({
            success: true,
            message: `Welcome ${user.name}!`,
        });

    } catch (error) {
        next(error);
    }
})

router.get("/get", async (req, res, next) => {
    try {

        const users = await prisma.user.findMany({});
        res.status(200).json({
            success: true,
            data: users
        });

    } catch (error) {
        next(error);
    }
})

router.get("/getUser", async (req, res, next) => {
    try {
        const id  = req.query.id;

        const users = await prisma.user.findUnique({ where: {
            id: Number(id)
        },
        include: {
            posts: true
        }
    });

        res.status(200).json({
            success: true,
            data: users
        })

    } catch (error) {
        next(error);
    }
})

router.put("/update", async(req, res, next)=>{
    try {
        
        const id = req.query.id;
        const { email, name } = req.body;

        const updatedUser = await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: {
                email: email,
                name: name
            }
        });

        res.status(200).json({
            success: true,
            data: updatedUser
        });

    } catch (error) {
        next(error);
    }
})

export default router;

