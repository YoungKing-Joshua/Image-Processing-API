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
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const imageProcessing_1 = __importDefault(require("../utilities/imageProcessing"));
describe('Verify image processing using sharp', () => {
    it('Returns error for invalid width value', () => __awaiter(void 0, void 0, void 0, function* () {
        const error = yield imageProcessing_1.default.generateThumb({
            filename: 'tot',
            width: '-150',
            height: '450'
        });
        expect(error).not.toBeNull();
    }));
    it('Returns error for non-existing filename', () => __awaiter(void 0, void 0, void 0, function* () {
        const error = yield imageProcessing_1.default.generateThumb({
            filename: 'tot',
            width: '150',
            height: '450'
        });
        expect(error).not.toBeNull();
    }));
    it('Writes resized thumb file correctly for valid file and size input', () => __awaiter(void 0, void 0, void 0, function* () {
        yield imageProcessing_1.default.generateThumb({ filename: 'fjord', width: '97', height: '97' });
        const newImageSizePath = (0, path_1.resolve)('thumbs', 'fjord-97x97.jpg');
        let imageError = '';
        try {
            yield fs_1.default.promises.access(newImageSizePath);
            imageError = null;
        }
        catch (_a) {
            imageError = 'Image was not generated';
        }
        expect(imageError).toBeNull();
    }));
});
