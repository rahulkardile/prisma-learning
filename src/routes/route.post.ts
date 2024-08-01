import express, { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
log: ["info", "query"]
});

const router = express.Router();

router.get("/get", async (req, res, next) => {
    try {

        const data = await prisma.post.findMany({});

        res.status(200).json({
            succuss: true,
            data
        })

    } catch (error) {
        next(error);
    }
})

router.post("/create", async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { title, content, autherId } = req.body;

        const createTodo = await prisma.post.create({
            data: {
                title,
                content,
                autherId
            }
        }).then(() => {
            prisma.$disconnect();
        }).catch(err => {
            console.log("Got Err");
            prisma.$disconnect();
        }).finally(() => prisma.$disconnect());

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

router.put("/update-published", async (req, res, next) => {
    try {

        const id = req.query.id;

        const post = await prisma.post.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (post?.published === true) {
            const data = await prisma.post.update({
                where: {
                    id: Number(id)
                },
                data: {
                    published: false
                }
            })

            res.status(200).json({
                success: true,
                data
            })

        } else {
            const data = await prisma.post.update({
                where: {
                    id: Number(id)
                },
                data: {
                    published: true
                }
            })

            res.status(200).json({
                success: true,
                data
            })

        }

    } catch (error) {
        next(error);
    }
})

router.get("/pagination", async(req,res, next)=> {
    try {
        
        const resData = await prisma.post.findMany({
            // how much content page should take
            take: 2,
            //page
            skip: 0
        })

        res.status(200).json({
            success: true,
            resData
        })

    } catch (error) {
        next(error);
    }
})

router.delete("/delete", async (req, res, next) => {
    try {

        const id = req.query.id;

        const find = await prisma.post.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!find?.id) return res.status(404).json({
            success: false,
            message: "todo not found"
        });

        const data = await prisma.post.delete({
            where: {
                id: Number(id)
            }
        });

        res.status(200).json({
            success: true,
            data
        });

    } catch (error) {
        next(error);
    }
});

export default router;