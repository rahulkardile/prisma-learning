"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.post("/create", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email } = req.body;
        const user = yield prisma.user.create({
            data: {
                email,
                name
            }
        });
        res.status(201).json({
            success: true,
            message: `Welcome ${user.name}!`,
        });
    }
    catch (error) {
        next(error);
    }
}));
router.get("/get", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany({});
        res.status(200).json({
            success: true,
            data: users
        });
    }
    catch (error) {
        next(error);
    }
}));
router.get("/getUser", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id;
        const users = yield prisma.user.findUnique({ where: {
                id: Number(id)
            },
            include: {
                posts: true
            }
        });
        res.status(200).json({
            success: true,
            data: users
        });
    }
    catch (error) {
        next(error);
    }
}));
router.get("/advance", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resData = yield prisma.user.findMany({
            where: {
                email: {
                    endsWith: "gmail.com",
                },
                posts: {
                    some: {
                        published: true
                    }
                }
            },
            include: {
                posts: {
                    where: {
                        published: true
                    }
                }
            }
        });
        res.status(200).json({
            success: true,
            resData
        });
    }
    catch (error) {
        next(error);
    }
}));
router.put("/update", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id;
        const { email, name } = req.body;
        const updatedUser = yield prisma.user.update({
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
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
