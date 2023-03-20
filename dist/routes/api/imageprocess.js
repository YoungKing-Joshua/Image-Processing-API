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
const imageProcessing_1 = __importDefault(require("../../utilities/imageProcessing"));
const imageRouter = express_1.default.Router();
const validateImageDetail = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { filename, width, height } = query;
    if (!filename) {
        const availableImageNames = yield imageProcessing_1.default.getImageList();
        const formattedImageNames = availableImageNames.join(', ');
        return `Please provide a valid filename. Available names are: ${formattedImageNames}`;
    }
    if (!(yield imageProcessing_1.default.checkImageExistence(filename)))
        return `The image "${filename}" is not available`;
    if (width && isNaN(parseInt(width)))
        return `Please provide a valid numerical value for the width`;
    if (height && isNaN(parseInt(height)))
        return `Please provide a valid numerical value for the height`;
    return null;
});
const handleImageRequest = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const query = request.query;
    const validationMessage = yield validateImageDetail(query);
    if (validationMessage)
        return response.send(validationMessage);
    let error = '';
    if (!(yield imageProcessing_1.default.isThumbAvailable(query)))
        error = yield imageProcessing_1.default.generateThumb(query);
    if (error)
        return response.send(error);
    const path = yield imageProcessing_1.default.retrieveImagePath(query);
    if (path)
        return response.sendFile(path);
    response.send('An unknown error has occurred');
});
imageRouter.get('/', handleImageRequest);
exports.default = imageRouter;
