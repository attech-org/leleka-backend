"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config({ path: "./config.env" });
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
//connect to db
(0, db_1.connectDB)();
app.use(express_1.default.json());
app.use("/api/auth", require("./routes/auth"));
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
process.on("unhandledRejection", (error, promise) => {
    console.log(`Logged Error: ${error}`);
    server.close(() => process.exit(1));
});
//# sourceMappingURL=server.js.map