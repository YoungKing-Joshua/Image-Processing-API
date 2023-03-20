"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imageprocess_1 = __importDefault(require("./api/imageprocess"));
const router = express_1.default.Router();
router.use('/api/imageprocess', imageprocess_1.default);
router.get('/', (request, response) => {
    response.send(`<h1>Welcome to image-processing-api</h1>
      <p>Listening at <code><a href="/api/imageprocess">/api/imageprocess</a></code> for queries containing at least a valid filename. 
      Optionally use both width and height to set the size...</p>
      <p>Examples:
      <ul>
        <li><a href="/api/imageprocess?filename=fjord">/api/imageprocess?filename=fjord</a></li>
        <li><a href="/api/imageprocess?filename=fjord&width=100&height=100">/api/imageprocess?filename=fjord&width=100&height=100</a></li>
      </ul>
      </p>`);
});
exports.default = router;
