"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const route_user_1 = __importDefault(require("./routes/route.user"));
const route_post_1 = __importDefault(require("./routes/route.post"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
app.get("/", (req, res, next) => {
    try {
        res.send("running fine!");
    }
    catch (error) {
        next(error);
    }
});
app.use("/api/user", route_user_1.default);
app.use("/api/todo", route_post_1.default);
app.use("*", (req, res, next) => {
    try {
        res.status(404).json({
            success: true,
            message: "route not found!"
        });
    }
    catch (error) {
        next(error);
    }
});
app.listen(PORT, () => console.log(`server is running at ${PORT} . . .`));
