"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// import compression from 'compression';
require("dotenv/config");
// modules
const boardRouter_1 = __importDefault(require("./routers/boardRouter"));
const userRouter_1 = __importDefault(require("./routers/userRouter"));
const globalRouter_1 = __importDefault(require("./routers/globalRouter"));
const commentRouter_1 = __importDefault(require("./routers/commentRouter"));
const PORT = 4000;
const app = (0, express_1.default)();
const logger = (0, morgan_1.default)('dev');
// db connection
(0, typeorm_1.createConnection)()
    .then(() => {
    console.log('Database Connected :)');
})
    .catch((error) => console.log(error));
// middleware
app.use(express_1.default.json()); //body parser(json)
// app.use(express.urlencoded({extended:false})); //body parser(url)
app.use((0, cookie_parser_1.default)());
// app.use(express.urlencoded({extended:false}))
app.use(logger);
app.use((0, cors_1.default)({
    origin: true,
    credentials: true
}));
// route
app.get('/', (req, res) => {
    res.send('NewDe is running...');
});
app.use("/", globalRouter_1.default);
app.use("/users", userRouter_1.default);
app.use("/board", boardRouter_1.default);
app.use("/comment", commentRouter_1.default);
const handleListening = () => console.log(`Server Listening on port http://localhost:${PORT}`);
app.listen(PORT, handleListening);
//# sourceMappingURL=index.js.map