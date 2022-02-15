"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
require("reflect-metadata");
var typeorm_1 = require("typeorm");
//import compression from 'compression';
require("dotenv/config");
(0, typeorm_1.createConnection)()
    .then(function (res) {
    //console.log(res);
})
    .catch(function (err) {
    console.log(err);
});
var PORT = 4000;
var app = (0, express_1.default)();
var logger = (0, morgan_1.default)('dev');
app.use(logger);
app.use((0, cors_1.default)({
    origin: true,
    credentials: true
}));
var handleListening = function () { return console.log("Server Listening on port http://localhost:".concat(PORT)); };
app.listen(PORT, handleListening);
//# sourceMappingURL=index.js.map