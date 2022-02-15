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
// import compression from 'compression';
require("dotenv/config");
(0, typeorm_1.createConnection)()
    .then(() => {
    console.log('Database Connected :)');
})
    .catch((error) => console.log(error));
const PORT = 4000;
const app = (0, express_1.default)();
const logger = (0, morgan_1.default)('dev');
app.use(logger);
app.use((0, cors_1.default)({
    origin: true,
    credentials: true
}));
const handleListening = () => console.log(`Server Listening on port http://localhost:${PORT}`);
app.listen(PORT, handleListening);
//# sourceMappingURL=index.js.map