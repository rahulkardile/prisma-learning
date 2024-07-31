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
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
router.post("/create", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, autherId } = req.body;
        const createTodo = yield prisma.post.create({
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
    }
    catch (error) {
        next(error);
    }
}));
router.delete("/delete", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id;
        const find = yield prisma.post.findUnique({
            where: {
                id: Number(id)
            }
        });
        if (!(find === null || find === void 0 ? void 0 : find.id))
            return res.status(404).json({
                success: false,
                message: "todo not found"
            });
        const data = yield prisma.post.delete({
            where: {
                id: Number(id)
            }
        });
        res.status(200).json({
            success: true,
            data
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
