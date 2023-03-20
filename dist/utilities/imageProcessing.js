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
const path_1 = require("path");
const fs_1 = require("fs");
const sharp_1 = __importDefault(require("sharp"));
const resizeImage = (inputs) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, sharp_1.default)(inputs.source)
            .resize(inputs.width, inputs.height)
            .toFormat('jpeg')
            .toFile(inputs.target);
        return null;
    }
    catch (_a) {
        return 'Image could not be resized.';
    }
});
class Image {
    static retrieveImagePath({ filename, width, height }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!filename) {
                return null;
            }
            const requestedImagePath = width && height
                ? (0, path_1.resolve)(Image.thumbImagesPath, `${filename}-${width}x${height}.jpg`)
                : (0, path_1.resolve)(Image.fullImagesPath, `${filename}.jpg`);
            // Check file existence
            try {
                yield fs_1.promises.access(requestedImagePath);
                return requestedImagePath;
            }
            catch (_a) {
                return null;
            }
        });
    }
    static checkImageExistence(filename = '') {
        return __awaiter(this, void 0, void 0, function* () {
            if (!filename)
                return false;
            return fs_1.promises
                .readdir(Image.fullImagesPath)
                .then(filenames => filenames.includes(`${filename}.jpg`));
        });
    }
    static getImageList() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filenames = yield fs_1.promises.readdir(Image.fullImagesPath);
                return filenames.map(filename => filename.split('.')[0]);
            }
            catch (_a) {
                return [];
            }
        });
    }
    static isThumbAvailable({ filename, width, height }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!filename || !width || !height)
                return false;
            return fs_1.promises
                .access((0, path_1.resolve)(Image.thumbImagesPath, `${filename}-${width}x${height}.jpg`))
                .then(() => true, () => false);
        });
    }
    static generateThumbPath() {
        return __awaiter(this, void 0, void 0, function* () {
            return fs_1.promises.mkdir(Image.thumbImagesPath, { recursive: true });
        });
    }
    static generateThumb({ filename, width, height }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!filename || !width || !height)
                return null;
            const fullImagePath = (0, path_1.resolve)(Image.fullImagesPath, `${filename}.jpg`);
            const thumbImagePath = (0, path_1.resolve)(Image.thumbImagesPath, `${filename}-${width}x${height}.jpg`);
            console.log(`Creating thumb ${thumbImagePath}`);
            return resizeImage({
                source: fullImagePath,
                target: thumbImagePath,
                width: parseInt(width),
                height: parseInt(height)
            });
        });
    }
}
Image.fullImagesPath = (0, path_1.resolve)(__dirname, '../../resource/images/full');
Image.thumbImagesPath = (0, path_1.resolve)(__dirname, '../../resource/images/thumb');
exports.default = Image;
